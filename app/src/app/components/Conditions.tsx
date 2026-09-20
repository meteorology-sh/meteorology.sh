// Store
import { useAppSelector } from "@/lib/store/hooks";

// Types
import { type ConditionsT } from "@/lib/types/data";

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const tenths = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const hundredths = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const DASH = "—";

/** Wind direction the way a METAR carries it: three digits, nearest ten. */
const heading = (degrees: number): string =>
  `${Math.round(degrees / 10) * 10 || 360}`.padStart(3, "0");

type ReadingT = { label: string; value: string; unit: string };

/**
 * The surface, the wind, and the height the seeding band is measured from.
 * Every row reads the same fetch, so no row can be newer than another.
 */
const readings = (conditions: ConditionsT | undefined): ReadingT[] => [
  {
    label: "temperature",
    value: conditions ? tenths.format(conditions.temperature_2m) : DASH,
    unit: "°C",
  },
  {
    label: "wind",
    value: conditions
      ? `${heading(conditions.wind_direction_10m)}° ${whole.format(conditions.wind_speed_10m)}`
      : DASH,
    unit: "kt",
  },
  {
    label: "precipitation",
    value: conditions ? hundredths.format(conditions.precipitation) : DASH,
    unit: "in",
  },
  {
    label: "cloud cover",
    value: conditions ? whole.format(conditions.cloud_cover) : DASH,
    unit: "%",
  },
  {
    label: "zero degree isotherm",
    value: conditions ? whole.format(conditions.freezing_level_height) : DASH,
    unit: "ft MSL",
  },
  {
    label: "convective available potential energy",
    value: conditions ? whole.format(conditions.cape) : DASH,
    unit: "J/kg",
  },
];

/** The current conditions over the laboratory, read once on load. */
export const Conditions = () => {
  const conditions: ConditionsT | undefined = useAppSelector(
    (state) => state.data.conditions
  );

  return (
    <div className="card border border-hairline bg-base-200">
      <div className="card-body gap-0 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline pb-3">
          <h3 className="card-title t-heading">Austin, Texas</h3>
          <span className="t-coord text-ink-muted">N30°16.03' W97°44.58'</span>
        </div>
        <table className="table">
          <tbody>
            {readings(conditions).map((reading, index) => (
              <tr key={reading.label} className="border-hairline">
                <td className="t-body px-0 text-ink-muted">{reading.label}</td>
                <td
                  className={`t-data px-0 text-right ${index === 0 ? "text-accent" : ""}`}
                >
                  {reading.value}{" "}
                  <span className="text-ink-faint">{reading.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
