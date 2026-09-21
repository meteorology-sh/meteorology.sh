const facts = [
  {
    label: "Who",
    title: "The Engineers",
    body: "Developed by engineers in hardware and software research, based in Austin.",
  },
  {
    label: "What",
    title: "Cloud Seeding",
    body: "In the 1940s, American research in aeronautics led investigators to study the physics of condensation in the cold, higher altitudes of the atmosphere. In discovering a methodology through which supercooled liquid water droplets could be coaxed together into precipitation, early research culminated in a technological advancement, cloud seeding, the technology of making rain. A cloud is seeded by various materials in the form of crystalline dust, which nucleate supercooled liquid water and precipitate from the sky.",
  },
  {
    label: "Why",
    title: "Natural Resources",
    body: "The state of Texas has enormous water reserves in the form of surface level reservoirs, and groundwater aquifers. These water sources are commonly replenished throughout biannual rainy seasons, which present as dramatic storms, but because of its advanced economy, and very hot climate, the state is subject to drought pressure in the dry seasons.",
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
          resources in the state of Texas. The software is open-source, and the
          research methodology contributes to a canon of open access scientific
          literature.
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
