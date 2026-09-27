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

const Octocat = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
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
    tag: "GITHUB",
    title: "Code",
    body: "Open Source Software and Research Code",
    href: "https://github.com/meteorology-sh",
    action: "meteorology-sh",
    label: "Petrichor on GitHub",
    external: true,
    icon: <Octocat />,
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
];

export const Contact = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="statement">Contact</h1>
        <p className="t-body max-w-[62ch] text-ink-muted">
          Contact Petrichor for research and business inquiries. Read the source
          code, send an email, or follow on social media.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
