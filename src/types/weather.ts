// Open Meteo API Response Types
export interface OpenMeteoCurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface OpenMeteoUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  weather_code: string;
  cloud_cover: string;
  pressure_msl: string;
  surface_pressure: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
}

export interface OpenMeteoDailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface OpenMeteoHourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  showers: number[];
  snowfall: number[];
  snow_depth: number[];
  weather_code: number[];
  pressure_msl: number[];
  surface_pressure: number[];
  cloud_cover: number[];
  visibility: number[];
  evapotranspiration: number[];
  et0_fao_evapotranspiration: number[];
  vapour_pressure_deficit: number[];
  wind_speed_10m: number[];
  wind_speed_80m: number[];
  wind_speed_120m: number[];
  wind_speed_180m: number[];
  wind_direction_10m: number[];
  wind_direction_80m: number[];
  wind_direction_120m: number[];
  wind_direction_180m: number[];
  wind_gusts_10m: number[];
  temperature_80m: number[];
  temperature_120m: number[];
  temperature_180m: number[];
  soil_temperature_0cm: number[];
  soil_temperature_6cm: number[];
  soil_temperature_18cm: number[];
  soil_temperature_54cm: number[];
  soil_moisture_0_1cm: number[];
  soil_moisture_1_3cm: number[];
  soil_moisture_3_9cm: number[];
  soil_moisture_9_27cm: number[];
  soil_moisture_27_81cm: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: OpenMeteoUnits;
  current: OpenMeteoCurrentWeather;
  hourly_units: Record<string, string>;
  hourly: OpenMeteoHourlyWeather;
  daily_units: Record<string, string>;
  daily: OpenMeteoDailyWeather;
}

// Internal App Types
export interface CurrentWeather {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export interface ForecastItem {
  day: string;
  icon: string;
  high: number;
  low: number;
  condition: string;
  weatherCode: number;
  date: string;
}

export interface HourlyItem {
  time: string;
  temperature: number;
  icon: string;
  condition: string;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
}

export interface HighlightItem {
  title: string;
  value: string;
  unit: string;
  icon: string;
  description?: string;
}

export interface LocationInfo {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}
