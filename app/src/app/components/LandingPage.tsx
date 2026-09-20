// Components
import { Conditions } from "./Conditions";

const disciplines = [
  {
    label: "Aircraft",
    title: "Quadcopters built for seeding runs.",
    body: "Our airframes climb to cloud base, hold station in updraft, and release flares on schedule. We build them in Austin.",
  },
  {
    label: "Software",
    title: "The sounding picks the target.",
    body: "We read the model sounding and the radar volume. The software finds the band where seeding works and clears the aircraft. Every decision is logged.",
  },
  {
    label: "Research",
    title: "Randomised cases, published in full.",
    body: "We assign seeded and control cells at random. We report rainfall with confidence intervals. We publish every result.",
  },
];

const notes = [
  {
    id: "PTN-004",
    title: "Hygroscopic seeding yield over the Edwards Plateau",
    meta: "41 randomised cases. Preprint.",
  },
  {
    id: "PTN-003",
    title: "Warm-cloud depth as a go threshold",
    meta: "Method note. Data and code published.",
  },
];

export const LandingPage = () => {
  return (
    <>
      <section className="flex flex-col gap-12">
        <div>
          <h1 className="wordmark-hero">Petrichor</h1>
          <p className="t-body-sm mt-4 text-ink-muted">the smell of rain</p>
        </div>

        <div className="grid h-24 grid-cols-4 gap-4" aria-hidden="true">
          <span className="col-span-2 bg-primary"></span>
          <span className="bg-secondary"></span>
          <span className="bg-accent"></span>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="statement">
            Rain enhancement research for Texas storms
          </h2>
          <p className="t-body max-w-1/2 text-ink-muted">
            Petrichor is a small laboratory founded in Austin, Texas. We develop
            research in open source software and aeronautics for meteorologists.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary t-label" href="#research">
              Read the research
            </a>
            <a className="btn t-label" href="mailto:hello@meteorology.sh">
              Talk to us
            </a>
          </div>
        </div>

        <Conditions />
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">What we do</h2>
          <span className="t-coord text-ink-faint">THREE DISCIPLINES</span>
        </div>
        <ul className="list">
          {disciplines.map((discipline) => (
            <li
              key={discipline.label}
              className="list-row grid gap-2 border-b border-hairline px-0 py-6 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-6"
            >
              <p className="t-label text-secondary">{discipline.label}</p>
              <h3 className="t-heading">{discipline.title}</h3>
              <p className="t-body max-w-[62ch] text-ink-muted">
                {discipline.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" id="research">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Technical notes</h2>
          <span className="t-coord text-ink-faint">
            PETRICHOR TECHNICAL NOTES
          </span>
        </div>
        <ul className="list">
          {notes.map((note) => (
            <li
              key={note.id}
              className="list-row grid gap-2 border-b border-hairline px-0 py-6"
            >
              <p className="t-coord text-secondary">{note.id}</p>
              <h3 className="t-display-m">{note.title}</h3>
              <p className="t-body-sm text-ink-faint">{note.meta}</p>
            </li>
          ))}
        </ul>
        <p className="t-body mt-6 max-w-[62ch] text-ink-muted">
          Each note carries the question, the method, the result with an
          interval, and a link to the data.{" "}
          <a className="link text-accent" href="mailto:hello@meteorology.sh">
            Ask for a copy
          </a>
          .
        </p>
      </section>
    </>
  );
};
