#!/usr/bin/env bash
# Mail for meteorology.sh. See infra/README.md.
#
#   infra/mail.sh deploy    create or update the stack, activate the rule set, publish root SPF
#   infra/mail.sh smtp      make an SMTP login for Gmail and store it in SSM Parameter Store
#   infra/mail.sh sandbox   ask AWS to lift the SES sandbox so replies reach anyone
set -euo pipefail

REGION=us-east-1
STACK=meteorology-sh-mail
DOMAIN=meteorology.sh
ZONE=Z0202560SZO07XGZ5YOJ
SMTP_USER=meteorology-sh-smtp
PARAM=/meteorology-sh/smtp
DIR=$(cd "$(dirname "$0")" && pwd)

output() {
  aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}

deploy() {
  aws cloudformation deploy --region "$REGION" --stack-name "$STACK" \
    --template-file "$DIR/mail.yaml" --capabilities CAPABILITY_NAMED_IAM

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

sandbox() {
  aws sesv2 put-account-details --region "$REGION" \
    --mail-type TRANSACTIONAL \
    --website-url "https://$DOMAIN" \
    --contact-language EN \
    --use-case-description "Personal correspondence for one address, the lab address, at a small research lab. Mail is sent by hand from Gmail through SES SMTP, only to people who wrote first or whom we contact directly. No lists, no marketing, no bulk sending. Bounces and complaints are watched in the SES console." \
    --production-access-enabled
  echo "Request sent. AWS usually answers within a day by email."
}

case "${1:-}" in
  deploy|smtp|sandbox) "$1" ;;
  *) echo "usage: infra/mail.sh deploy|smtp|sandbox" >&2; exit 1 ;;
esac
