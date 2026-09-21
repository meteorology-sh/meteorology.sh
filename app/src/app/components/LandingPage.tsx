// Router
import { NavLink } from "react-router";

// Components
import { Conditions } from "./Conditions";

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
          <p className="t-body min-w-1/2 text-ink-muted">
            Petrichor is a small laboratory founded in Austin, Texas. We develop
            research in open source software and aeronautics for meteorologists.
          </p>
          <div className="flex flex-wrap gap-3">
            <NavLink className="btn btn-primary t-label" to="/about">
              About
            </NavLink>
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
