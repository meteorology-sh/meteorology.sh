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
          Petrichor develops bespoke cloud seeding technology, and the products
          of this research are shared with the public.
        </p>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Weatherman</h2>
          <span className="t-coord text-accent">SOFTWARE</span>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="t-heading">Decision Science</h3>
            <p className="t-body max-w-[62ch] text-ink-muted">
              Weatherman is a decision science platform. It reads meteorological
              data and stacks spatial layers on a map. These data highlight
              cloud formations whose physics are optimal candidates for cloud
              seeding.
              <br />
              <br />
              Weatherman collates metadata from a combination of NOAA data
              sources, including national radar mosaics, satellites, and
              advanced models.
              <br />
              <br />
              The software is evaluated and found to have an 86.6% concordance
              with meteorological decision science in historical cloud seeding
              operations across Texas.
              <br />
              <br />A publication is forthcoming and under peer review.
            </p>
          </div>

          <div className="mockup-window rounded-md border border-hairline bg-base-200 pt-2.5 before:mb-2 before:h-2 before:shadow-[0.875rem_0_0_currentColor,1.75rem_0_0_currentColor,2.625rem_0_0_currentColor]">
            <img
              src={weatherman}
              width={1910}
              height={949}
              alt="weatherman dashboard showing radar, cloud, and environment readings beside a map"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Automata</h2>
          <span className="t-coord text-accent">NEURAL NETWORKS</span>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="t-heading">Reinforcement Learning</h3>
            <p className="t-body max-w-[62ch] text-ink-muted">
              Automata is a reinforcement learning harness. The harness designs
              a model policy and runtime, and learns the physics that accrue
              rewards. It ships a checkpoint small enough to run on a flight
              computer.
              <br />
              <br />
              Automata refines a terminal destination policy, reading synthetic
              data through a suite of onboard sensors to explore the atmosphere
              for supercooled liquid water.
              <br />
              <br />A publication is forthcoming and in literature review.
            </p>
          </div>

          <div className="mockup-window rounded-md border border-hairline bg-base-200 pt-2.5 before:mb-2 before:h-2 before:shadow-[0.875rem_0_0_currentColor,1.75rem_0_0_currentColor,2.625rem_0_0_currentColor]">
            <div className="flex min-h-64 items-center justify-center p-8">
              <img
                src={neural}
                width={256}
                height={192}
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
          <span className="t-coord text-accent">DRONES</span>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="flex flex-col gap-4">
            <h3 className="t-heading">Aircraft</h3>
            <p className="t-body max-w-[62ch] text-ink-muted">
              The Hyades are a mythological sisterhood whose arrival precedes
              rain.
              <br />
              <br />
              Each aircraft in the Hyades fleet is an NDAA compliant quadcopter,
              with a prototype under development. The aircraft is designed to a
              spec defined by the average Texas cloud seeding sortie. It
              delivers a 1.5 kg reagent to 18,000 ft in a 40 minute mission.
              <br />
              <br />
              Petrichor develops an aircraft for $2800.
            </p>
          </div>

          <div className="mockup-window rounded-md border border-hairline bg-base-200 pt-2.5 before:mb-2 before:h-2 before:shadow-[0.875rem_0_0_currentColor,1.75rem_0_0_currentColor,2.625rem_0_0_currentColor]">
            <img
              src={hyades}
              width={1134}
              height={766}
              alt="a hyades quadcopter render"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};
