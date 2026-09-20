// Store
import { useAppSelector } from "@/lib/store/hooks";

export const About = () => {
  const string: string | undefined = useAppSelector(
    (state) => state.data.string
  );

  return (
    <>
      <section className="ptr-hero">
        <div>
          <h1 className="ptr-hero__statement">
            A small lab that would rather be checked than believed.
          </h1>
          <p className="ptr-hero__lede t-body" style={{ marginTop: "var(--space-5)" }}>
            Cloud seeding has a long history of overstatement. Our advantage is
            that we do not do it. Petrichor runs randomised cases over Texas,
            reports the intervals, and publishes the results whether or not they
            favour us.
          </p>
        </div>
      </section>

      <section className="ptr-section">
        <div className="ptr-section__head">
          <h2 className="ptr-section__title t-subheading">The lab</h2>
        </div>
        <div className="ptr-rows">
          <article className="ptr-row">
            <p className="ptr-row__index t-label">Where</p>
            <h3 className="ptr-row__title t-heading">Austin, Texas</h3>
            <p className="ptr-row__body t-body">
              Headquartered in Austin. Operations run over the Edwards Plateau and
              the Hill Country, where warm-cloud depth is deep enough for
              hygroscopic seeding to do measurable work.
            </p>
          </article>
          <article className="ptr-row">
            <p className="ptr-row__index t-label">What</p>
            <h3 className="ptr-row__title t-heading">
              Unmanned aircraft, and the software that flies them
            </h3>
            <p className="ptr-row__body t-body">
              We build the airframes and we write the decision software. Nothing
              about the stack is off the shelf, because nothing off the shelf was
              built to put a flare inside a growing cell on a model's schedule.
            </p>
          </article>
          <article className="ptr-row">
            <p className="ptr-row__index t-label">Not</p>
            <h3 className="ptr-row__title t-heading">
              This is not geoengineering
            </h3>
            <p className="ptr-row__body t-body">
              We enhance rainfall in a defined airspace under a state licence,
              filing every operation with the TDLR. That is a different activity
              from climate intervention and the distinction matters. Ask us about
              it directly — we will answer plainly.
            </p>
          </article>
        </div>
      </section>

      <section className="ptr-section">
        <div className="ptr-section__head">
          <h2 className="ptr-section__title t-subheading">Contact</h2>
        </div>
        <div className="ptr-panel" style={{ marginTop: "var(--space-5)" }}>
          <div className="ptr-readout">
            <span className="ptr-readout__label t-body">Operations</span>
            <span className="ptr-readout__value t-data">hello@meteorology.sh</span>
          </div>
          <div className="ptr-readout">
            <span className="ptr-readout__label t-body">Research</span>
            <span className="ptr-readout__value t-data">hello@meteorology.sh</span>
          </div>
          <div className="ptr-readout" style={{ borderBottom: "none" }}>
            <span className="ptr-readout__label t-body">Build</span>
            <span className="ptr-readout__value t-data">{string ?? "—"}</span>
          </div>
        </div>
      </section>
    </>
  );
};
