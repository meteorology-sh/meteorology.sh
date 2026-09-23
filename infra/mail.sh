#!/usr/bin/env bash
# Mail for meteorology.sh. See infra/README.md.
#
#   infra/mail.sh deploy    create or update the stack, activate the rule set, publish root SPF
#   infra/mail.sh smtp      make an SMTP login for Gmail and store it in SSM Parameter Store
set -euo pipefail

REGION=us-east-1
STACK=meteorology-sh-mail
DOMAIN=meteorology.sh
ZONE=Z0202560SZO07XGZ5YOJ
SMTP_USER=meteorology-sh-smtp
PARAM=/meteorology-sh/smtp
DIR=$(cd "$(dirname "$0")" && pwd)

# The inbox that receives the forwarded mail. It stays out of git: put
# NATHAN_EMAIL=the inbox in infra/.env, or set it in the environment.
[ -f "$DIR/.env" ] && . "$DIR/.env"

output() {
  aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}

deploy() {
  : "${NATHAN_EMAIL:?set NATHAN_EMAIL in infra/.env — the inbox that receives the mail}"

  aws cloudformation deploy --region "$REGION" --stack-name "$STACK" \
    --template-file "$DIR/mail.yaml" --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides "ForwardTo=$NATHAN_EMAIL"

  aws ses set-active-receipt-rule-set --region "$REGION" --rule-set-name "$(output RuleSetName)"

  # The root TXT record also holds Google site verification, so it lives outside the stack.
  aws route53 change-resource-record-sets --hosted-zone-id "$ZONE" --change-batch "$(cat <<EOF
{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"$DOMAIN","Type":"TXT","TTL":300,
"ResourceRecords":[
  {"Value":"\"google-site-verification=xfBMeSsmMCPH8ABVEQwEeXC8X5aI6xFEq3cmc1Qi2k0\""},
  {"Value":"\"v=spf1 include:amazonses.com ~all\""}]}}]}
EOF
)" >/dev/null
  echo "Deployed. On a first deploy, AWS emails the Gmail inbox a verification link to click."
}

# SES SMTP passwords are derived from an IAM secret key. The secret goes straight into
# SSM and is never printed.
smtp() {
  local key id secret password
  key=$(aws iam create-access-key --user-name "$SMTP_USER" --query 'AccessKey.[AccessKeyId,SecretAccessKey]' --output text)
  id=$(cut -f1 <<<"$key")
  secret=$(cut -f2 <<<"$key")
  password=$(SECRET="$secret" REGION="$REGION" node -e '
    const { createHmac } = require("crypto");
    const sign = (key, msg) => createHmac("sha256", key).update(msg).digest();
    let k = sign("AWS4" + process.env.SECRET, "11111111");
    for (const m of [process.env.REGION, "ses", "aws4_request", "SendRawEmail"]) k = sign(k, m);
    process.stdout.write(Buffer.concat([Buffer.from([4]), k]).toString("base64"));
  ')
  aws ssm put-parameter --region "$REGION" --name "$PARAM/username" --type String --value "$id" --overwrite >/dev/null
  aws ssm put-parameter --region "$REGION" --name "$PARAM/password" --type SecureString --value "$password" --overwrite >/dev/null
  echo "SMTP login stored in SSM Parameter Store ($REGION): $PARAM/username and $PARAM/password"
}

case "${1:-}" in
  deploy|smtp) "$1" ;;
  *) echo "usage: infra/mail.sh deploy|smtp" >&2; exit 1 ;;
esac
