export type WeatherT = {
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    dew_point_2m: number;
    apparent_temperature: number;
    precipitation: number;
    cloud_cover: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    freezing_level_height: number;
    cape: number;
  };
  current_units: {
    time: string;
    interval: "seconds" | "minutes" | "hours";
    temperature_2m: "°F" | "°C";
    relative_humidity_2m: "%";
    dew_point_2m: "°F" | "°C";
    apparent_temperature: "°F" | "°C";
    precipitation: "inch" | "mm";
    cloud_cover: "%";
    pressure_msl: "hPa";
    wind_speed_10m: "kn" | "mph" | "km/h" | "m/s";
    wind_direction_10m: "°";
    freezing_level_height: "ft" | "m";
    cape: "J/kg";
  };
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
};

/** The current conditions, as the readout shows them. */
export type ConditionsT = WeatherT["current"];
