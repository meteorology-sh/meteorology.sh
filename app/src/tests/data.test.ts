import reducer, { dataActions } from "@/lib/store/features/data";
import type { ConditionsT } from "@/lib/types/data";

const initialState = {
  string: "PETRICHOR",
  conditions: undefined,
};

const conditions: ConditionsT = {
  time: "2026-09-20T22:00",
  interval: 900,
  temperature_2m: 36.2,
  relative_humidity_2m: 37,
  dew_point_2m: 19.2,
  apparent_temperature: 38.1,
  precipitation: 0,
  cloud_cover: 100,
  pressure_msl: 1009.6,
  wind_speed_10m: 7,
  wind_direction_10m: 153,
  freezing_level_height: 16568.242,
  cape: 1140,
};

describe("data slice", () => {
  it("returns the initial state", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("sets the string value", () => {
    const state = reducer(initialState, dataActions.string("hello"));
    expect(state.string).toBe("hello");
    expect(state.conditions).toBeUndefined();
  });

  it("sets the current conditions", () => {
    const state = reducer(initialState, dataActions.conditions(conditions));
    expect(state.conditions).toEqual(conditions);
    expect(state.string).toBe("PETRICHOR");
  });

  it("does not lose existing state on partial updates", () => {
    const withConditions = reducer(
      initialState,
      dataActions.conditions(conditions)
    );
    const withBoth = reducer(withConditions, dataActions.string("updated"));
    expect(withBoth).toEqual({ string: "updated", conditions });
  });
});
