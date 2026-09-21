// Router
import { NavLink } from "react-router";

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
            <NavLink className="btn btn-primary t-label" to="/research">
              Research
            </NavLink>
          </div>
        </div>

        <Conditions />
      </section>
    </>
  );
};
