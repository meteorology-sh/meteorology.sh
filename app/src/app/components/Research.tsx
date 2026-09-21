// Assets
import weatherman from "@/app/assets/weatherman.png";
import neural from "@/app/assets/network.svg";
import hyades from "@/app/assets/hyades.png";

export const Research = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="statement">Research</h1>
        <p className="t-body max-w-[62ch] text-ink-muted">
          Petrichor develops bespoke cloud seeding technology in both software
          and hardware.
        </p>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Weatherman</h2>
          <span className="t-coord text-ink-faint">SOFTWARE</span>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="t-heading">Decision Science</h3>
            <p className="t-body max-w-[62ch] text-ink-muted">
              Weatherman is a decision science and evaluation platform. It
              sources meteorological criteria from literature and stacks
              geospatial data on a map. The data paints cloud formations whose
              physics are optimal targets for cloud seeding.
              <br />
              <br />
              Weatherman collates metadata from a combination of NOAA data
              sources, including both modeled and measured quantities.
              <br />
              <br />
              The software is interrogated and replicates the meteorological
              decision science in historical cloud seeding operations across
              Texas.
              <br />
              <br />A publication is forthcoming and under peer review.
            </p>
          </div>

          <div className="mockup-window rounded-md border border-hairline bg-base-200 pt-2.5 before:mb-2 before:h-2 before:shadow-[0.875rem_0_0_currentColor,1.75rem_0_0_currentColor,2.625rem_0_0_currentColor]">
            <img
              src={weatherman}
              alt="weatherman dashboard showing radar, cloud, and environment readings beside a map"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Automata</h2>
          <span className="t-coord text-ink-faint">NEURAL NETWORKS</span>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="t-heading">Reinforcement Learning</h3>
            <p className="t-body max-w-[62ch] text-ink-muted">
              Automata is a reinforcement learning harness conceptualizes the
              mission space and physics of cloud formations.
              <br />
              <br />
              Automata refines a terminal destination policy, leveraging a suite
              of onboard sensors to explore the atmosphere for supercooled
              liquid water.
              <br />
              <br />A publication is forthcoming and in literature review.
            </p>
          </div>

          <div className="mockup-window rounded-md border border-hairline bg-base-200 pt-2.5 before:mb-2 before:h-2 before:shadow-[0.875rem_0_0_currentColor,1.75rem_0_0_currentColor,2.625rem_0_0_currentColor]">
            <div className="flex min-h-64 items-center justify-center p-8">
              <img
                src={neural}
                alt="a neural network of six nodes joined by weighted edges"
                className="w-full max-w-56"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Hyades</h2>
          <span className="t-coord text-ink-faint">DRONES</span>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="t-heading">Aircraft</h3>
            <p className="t-body max-w-[62ch] text-ink-muted">
              The Hyades are a mythological sisterhood whose presence precedes
              rain.
              <br />
              <br />
              Each aircraft in the Hyades fleet is an NDAA compliant quadcopter,
              with a prototype under development.
            </p>
          </div>

          <div className="mockup-window rounded-md border border-hairline bg-base-200 pt-2.5 before:mb-2 before:h-2 before:shadow-[0.875rem_0_0_currentColor,1.75rem_0_0_currentColor,2.625rem_0_0_currentColor]">
            <img
              src={hyades}
              alt="a hyades quadcopter render"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};
