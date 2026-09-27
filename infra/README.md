# infra

## Mail

The lab's mail runs on Amazon SES in `us-east-1`. Addresses are read from `infra/.env`.
Git ignores that file.

- **Receive.** SES accepts mail for `SEND_ADDRESS`, `DMARC_ADDRESS`, and
  `hello@meteorology.sh`, saves it to S3 for 90 days, and a Lambda forwards it to
  `NATHAN_EMAIL`. The forward comes from `FORWARD_ADDRESS` as "Sender via meteorology.sh",
  and replies go to the sender.
- **Send.** Gmail sends as `SEND_ADDRESS` through SES SMTP. The SMTP login can only send as
  that address.
- **Watch.** Every send goes through a configuration set, which is the identity default, so
  SMTP cannot bypass it. Bounces, complaints, rejects, delays, and rendering failures
  publish to an SNS topic that the inbox subscribes to, and two CloudWatch alarms on the
  account's bounce and complaint rates notify the same topic at 5% and 0.1%. The
  account-level suppression list is on for bounce and complaint.

DMARC is published at `p=quarantine` with aggregate reports going to `DMARC_ADDRESS`.

`mail.yaml` is the CloudFormation stack: the SES identity with DKIM, the DNS records, the
bucket, the forwarder, the receipt rule, and the SMTP user. `mail.sh` wraps it:

```bash
infra/mail.sh deploy    # create or update the stack, activate the rule set, publish root SPF
infra/mail.sh smtp      # make an SMTP login and store it in SSM Parameter Store
```

On the first deploy after the monitoring was added, SNS emails the inbox a subscription
confirmation. The topic delivers nothing until that link is clicked.

`deploy` reads `NATHAN_EMAIL`, `SEND_ADDRESS`, `FORWARD_ADDRESS`, and `DMARC_ADDRESS`
from `infra/.env`. `NATHAN_EMAIL` is the inbox that receives the forwarded mail. The other
three are addresses on the lab's domain.

The root TXT record also holds Google site verification, so `mail.sh` writes it and the
stack leaves it alone.
