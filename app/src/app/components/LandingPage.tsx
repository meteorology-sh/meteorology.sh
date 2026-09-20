// Store
import { useAppSelector } from "@/lib/store/hooks";

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
  const temperature: number | undefined = useAppSelector(
    (state) => state.data.temperature
  );

  return (
    <>
      <section className="flex flex-col gap-12">
        <div>
          <h1 className="wordmark-hero">Petrichor</h1>
          <p className="t-body-sm mt-4 text-ink-muted">Rain enhancement, instrumented.</p>
        </div>

        <div className="grid h-24 grid-cols-4 gap-4" aria-hidden="true">
          <span className="col-span-2 bg-primary"></span>
          <span className="bg-secondary"></span>
          <span className="bg-accent"></span>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="statement">We fly the clouds that make rain.</h2>
          <p className="t-body max-w-[62ch] text-ink-muted">
            Petrichor is a rain enhancement laboratory in Austin, Texas. We build
            unmanned aircraft. We write the software that picks the targets. We publish
            our measurements.
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

        <div className="card border border-hairline bg-base-200">
          <div className="card-body gap-0 p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline pb-3">
              <h3 className="card-title t-heading">Austin, Texas</h3>
              <span className="t-coord text-ink-muted">N30°16.03' W97°44.58'</span>
            </div>
            <table className="table">
              <tbody>
                <tr className="border-hairline">
                  <td className="t-body px-0 text-ink-muted">Ambient temperature</td>
                  <td className="t-data px-0 text-right text-accent">
                    {temperature === undefined ? "—" : temperature.toFixed(1)}{" "}
                    <span className="text-ink-faint">°F</span>
                  </td>
                </tr>
                <tr className="border-hairline">
                  <td className="t-body px-0 text-ink-muted">Source</td>
                  <td className="t-data px-0 text-right">
                    Open-Meteo <span className="text-ink-faint">surface analysis</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
              <p className="t-body max-w-[62ch] text-ink-muted">{discipline.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" id="research">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Technical notes</h2>
          <span className="t-coord text-ink-faint">PETRICHOR TECHNICAL NOTES</span>
        </div>
        <ul className="list">
          {notes.map((note) => (
            <li key={note.id} className="list-row grid gap-2 border-b border-hairline px-0 py-6">
              <p className="t-coord text-secondary">{note.id}</p>
              <h3 className="t-display-m">{note.title}</h3>
              <p className="t-body-sm text-ink-faint">{note.meta}</p>
            </li>
          ))}
        </ul>
        <p className="t-body mt-6 max-w-[62ch] text-ink-muted">
          Each note carries the question, the method, the result with an interval, and a
          link to the data.{" "}
          <a className="link text-accent" href="mailto:hello@meteorology.sh">
            Ask for a copy
          </a>
          .
        </p>
      </section>
    </>
  );
};
