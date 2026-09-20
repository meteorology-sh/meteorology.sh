// Store
import { useAppSelector } from "@/lib/store/hooks";

const facts = [
  {
    label: "Where",
    title: "Austin, Texas",
    body: "We operate over the Edwards Plateau and the Hill Country. Warm-cloud depth there supports hygroscopic seeding.",
  },
  {
    label: "What",
    title: "Aircraft and software, both built here.",
    body: "We build the airframes and write the decision software in Austin.",
  },
  {
    label: "Licence",
    title: "We hold a Texas weather modification licence.",
    body: "We file every operation with the TDLR and fly under FAA authorisation.",
  },
];

export const About = () => {
  const string: string | undefined = useAppSelector((state) => state.data.string);

  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="statement">We publish our data so you can check it.</h1>
        <p className="t-body max-w-[62ch] text-ink-muted">
          Petrichor runs randomised seeding missions over Texas. We measure the rainfall,
          report the intervals, and publish every result.
        </p>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">The lab</h2>
        </div>
        <ul className="list">
          {facts.map((fact) => (
            <li
              key={fact.label}
              className="list-row grid gap-2 border-b border-hairline px-0 py-6 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-6"
            >
              <p className="t-label text-secondary">{fact.label}</p>
              <h3 className="t-heading">{fact.title}</h3>
              <p className="t-body max-w-[62ch] text-ink-muted">{fact.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <h2 className="t-subheading text-ink-muted">Contact</h2>
        </div>
        <div className="card mt-6 border border-hairline bg-base-200">
          <div className="card-body p-6">
            <table className="table">
              <tbody>
                <tr className="border-hairline">
                  <td className="t-body px-0 text-ink-muted">Operations</td>
                  <td className="t-data px-0 text-right">hello@meteorology.sh</td>
                </tr>
                <tr className="border-hairline">
                  <td className="t-body px-0 text-ink-muted">Research</td>
                  <td className="t-data px-0 text-right">hello@meteorology.sh</td>
                </tr>
                <tr className="border-hairline">
                  <td className="t-body px-0 text-ink-muted">Build</td>
                  <td className="t-data px-0 text-right">{string ?? "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
