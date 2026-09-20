// Types
import { type WeatherT } from "../types/data";

export const FetchWeather = async (): Promise<WeatherT> => {
  /**
   * Returns the current conditions over Austin.
   *
   * One read covers the whole card: the surface, the wind, and the freezing
   * level the seeding band is measured from.
   */

  const params = new URLSearchParams({
    latitude: "30.26715",
    longitude: "-97.74306",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "dew_point_2m",
      "apparent_temperature",
      "precipitation",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "freezing_level_height",
      "cape",
    ].join(","),
    temperature_unit: "celsius",
    wind_speed_unit: "kn",
    precipitation_unit: "inch",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) console.error(await response.text());

  const data: WeatherT = await response.json();
  return data;
};
