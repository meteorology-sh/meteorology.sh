const facts = [
  {
    label: "Who",
    title: "The Engineers",
    body: "Engineers in hardware and software research",
  },
  {
    label: "What",
    title: "Cloud Seeding",
    body: "Enhanced rainfall output of convective storms in the state of Texas",
  },
  {
    label: "Why",
    title: "Natural Resources",
    body: "For the benefit of Texas resevoirs, aquifers, and natural resource economy",
  },
];

export const About = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="statement flex">
          meteorology<div className="text-accent">.sh</div>
        </h1>
        <p className="t-body max-w-[62ch] text-ink-muted">
          Petrichor is a small laboratory working towards the benefit of natural
          resources in the state of Texas.
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
              className="list-row grid grid-flow-row grid-cols-1 gap-2 *:row-start-auto after:hidden border-b border-hairline px-0 py-6 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-6"
            >
              <p className="t-label text-accent">{fact.label}</p>
              <h3 className="t-heading items-center">{fact.title}</h3>
              <p className="t-body max-w-[62ch] text-ink-muted">{fact.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
