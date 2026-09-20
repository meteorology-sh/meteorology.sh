// Store
import { useAppSelector } from "@/lib/store/hooks";

const disciplines = [
  {
    label: "Aircraft",
    title: "Quadcopters that fly into growing convective cells.",
    body: "Airframes built in-house for the one job seeding actually needs — reaching cloud base fast, holding station in updraft, and releasing flares on a schedule the model picked. No pilot in the weather.",
  },
  {
    label: "Software",
    title: "The sounding decides, not the operator's instinct.",
    body: "We read the model sounding and the radar volume, find the band where seeding can do work, and clear the aircraft only when the cell qualifies. Every decision is logged against the case it was made from.",
  },
  {
    label: "Research",
    title: "Randomised cases, published either way.",
    body: "Seeded and control cells assigned at random, gauge and radar-estimated rainfall reported with intervals. We publish the nulls. The field's credibility problem is our inheritance and this is the way out of it.",
  },
];

const notes = [
  {
    id: "PTN-004",
    title: "Hygroscopic seeding yield over the Edwards Plateau",
    meta: "41 randomised cases · Preprint, not yet peer reviewed",
  },
  {
    id: "PTN-003",
    title: "Warm-cloud depth as an operational go/no-go threshold",
    meta: "Method note · Data and code published",
  },
];

export const LandingPage = () => {
  const temperature: number | undefined = useAppSelector(
    (state) => state.data.temperature
  );

  return (
    <>
      <section className="ptr-hero">
        <div>
          <h1 className="ptr-hero__name">Petrichor</h1>
          <p className="t-body-sm" style={{ color: "var(--ink-muted)", marginTop: "var(--space-4)" }}>
            Rain enhancement, instrumented.
          </p>
        </div>

        <div className="ptr-bands" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <h2 className="ptr-hero__statement">We fly the clouds that make rain.</h2>
          <p className="ptr-hero__lede t-body">
            Petrichor is a rain enhancement laboratory in Austin, Texas. We build
            unmanned aircraft and the software that decides where to fly them, we
            operate under a Texas weather modification licence, and we publish what
            we measure — including the cases where seeding did nothing.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
            <a className="ptr-btn ptr-btn--primary" href="#research">
              Read the research
            </a>
            <a className="ptr-btn ptr-btn--secondary" href="mailto:hello@meteorology.sh">
              Talk to us
            </a>
          </div>
        </div>

        <div className="ptr-panel">
          <div className="ptr-panel__head">
            <h3 className="t-heading" style={{ margin: 0 }}>
              Austin, Texas
            </h3>
            <span className="ptr-panel__coord t-coord">
              N30°16.03'&nbsp;&nbsp;W97°44.58'
            </span>
          </div>
          <div className="ptr-readout">
            <span className="ptr-readout__label t-body">Ambient Temperature</span>
            <span className="ptr-readout__value ptr-readout__value--accent t-data">
              {temperature === undefined ? "—" : temperature.toFixed(1)}{" "}
              <span className="ptr-readout__unit">°F</span>
            </span>
          </div>
          <div className="ptr-readout" style={{ borderBottom: "none" }}>
            <span className="ptr-readout__label t-body">Source</span>
            <span className="ptr-readout__value t-data">
              Open-Meteo <span className="ptr-readout__unit">surface analysis</span>
            </span>
          </div>
        </div>
      </section>

      <section className="ptr-section">
        <div className="ptr-section__head">
          <h2 className="ptr-section__title t-subheading">What we do</h2>
          <span className="t-coord" style={{ color: "var(--ink-faint)" }}>
            THREE DISCIPLINES
          </span>
        </div>
        <div className="ptr-rows">
          {disciplines.map((discipline) => (
            <article className="ptr-row" key={discipline.label}>
              <p className="ptr-row__index t-label">{discipline.label}</p>
              <h3 className="ptr-row__title t-heading">{discipline.title}</h3>
              <p className="ptr-row__body t-body">{discipline.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ptr-section" id="research">
        <div className="ptr-section__head">
          <h2 className="ptr-section__title t-subheading">Technical notes</h2>
          <span className="t-coord" style={{ color: "var(--ink-faint)" }}>
            PETRICHOR TECHNICAL NOTES
          </span>
        </div>
        <div>
          {notes.map((note) => (
            <article className="ptr-note" key={note.id}>
              <p className="ptr-note__id t-coord">{note.id}</p>
              <h3 className="ptr-note__title t-research-title">{note.title}</h3>
              <p className="ptr-note__meta t-research-note">{note.meta}</p>
            </article>
          ))}
        </div>
        <p className="t-body" style={{ color: "var(--ink-muted)", marginTop: "var(--space-5)" }}>
          Every note carries the question, the method, the result with an interval,
          what would falsify it, and a link to the data.{" "}
          <a className="ptr-link" href="mailto:hello@meteorology.sh">
            Ask for a copy
          </a>
          .
        </p>
      </section>
    </>
  );
};
