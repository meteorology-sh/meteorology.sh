// React
import type { ReactElement } from "react";

const XMark = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* Drawn square to match the menu icon in the header. */
const Envelope = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    <path d="M2.75 5.25h18.5v13.5H2.75z" />
    <path d="m2.75 5.25 9.25 7.5 9.25-7.5" />
  </svg>
);

type ChannelT = {
  tag: string;
  title: string;
  body: string;
  href: string;
  action: string;
  label: string;
  external: boolean;
  icon: ReactElement;
};

const channels: ChannelT[] = [
  {
    tag: "X",
    title: "Follow",
    body: "Articles and Updates",
    href: "https://x.com/meteorologyxsh",
    action: "@meteorologyxsh",
    label: "Petrichor on X",
    external: true,
    icon: <XMark />,
  },
  {
    tag: "EMAIL",
    title: "Write",
    body: "Business Development and Communications",
    href: "mailto:hello@meteorology.sh",
    action: "hello@meteorology.sh",
    label: "Email Petrichor",
    external: false,
    icon: <Envelope />,
  },
];

export const Contact = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="statement">Contact</h1>
        <p className="t-body max-w-[62ch] text-ink-muted">
          Contact Petrichor for research and business inquiries. Follow on
          social media or send an email.
        </p>
      </section>

      <section className="mt-16 grid max-w-3xl gap-6 md:grid-cols-2">
        {channels.map((channel) => (
          <div
            key={channel.tag}
            className="card border border-hairline bg-base-200"
          >
            <div className="card-body gap-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="t-heading">{channel.title}</h2>
                <span className="t-coord text-accent">{channel.tag}</span>
              </div>
              <p className="t-body text-ink-muted">{channel.body}</p>
              <div className="card-actions mt-auto">
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                  className="btn gap-2"
                  aria-label={channel.label}
                >
                  {channel.icon}
                  {channel.action}
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
