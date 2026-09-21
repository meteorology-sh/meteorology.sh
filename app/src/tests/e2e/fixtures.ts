import { test as base, expect } from "@playwright/test";

// Types
import type { WeatherT } from "@/lib/types/data";

const weather: Pick<WeatherT, "current"> = {
  current: {
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
    freezing_level_height: 4520,
    cape: 1250,
  },
};

/**
 * Every page gets a stubbed Open-Meteo response, so the tests never reach
 * the network and the conditions card always renders the same numbers.
 */
export const test = base.extend<{ stubWeather: void }>({
  stubWeather: [
    async ({ page }, use) => {
      await page.route("https://api.open-meteo.com/**", (route) =>
        route.fulfill({ json: weather })
      );
      await use();
    },
    { auto: true },
  ],
});

/** Below daisyUI's md breakpoint the header links give way to the drawer. */
export const isNarrow = (width: number | undefined) => (width ?? 0) < 768;

export { expect };
