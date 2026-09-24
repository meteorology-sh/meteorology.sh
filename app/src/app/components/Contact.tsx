const X = "https://x.com/meteorologyxsh";

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

export const Contact = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="statement">Contact</h1>
        <p className="t-body max-w-[62ch] text-ink-muted">
          Petrichor works from Austin, Texas. The lab posts its research on X.
        </p>
      </section>

      <section className="mt-16">
        <div className="card max-w-md border border-hairline bg-base-200">
          <div className="card-body gap-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="t-heading">Follow the lab</h2>
              <span className="t-coord text-accent">X</span>
            </div>
            <p className="t-body text-ink-muted">
              Flight reports, storm days, and the state of the research.
            </p>
            <div className="card-actions">
              <a
                href={X}
                target="_blank"
                rel="noreferrer"
                className="btn gap-2"
                aria-label="Petrichor on X"
              >
                <XMark />
                @meteorologyxsh
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
