// WMO Weather Code mapping
// Based on World Meteorological Organization codes used by Open Meteo

export interface WeatherCodeInfo {
  description: string;
  emoji: string;
  condition: string;
}

export const weatherCodes: Record<number, WeatherCodeInfo> = {
  0: {
    description: "Clear sky",
    emoji: "☀️",
    condition: "sunny"
  },
  1: {
    description: "Mainly clear",
    emoji: "🌤️",
    condition: "mostly sunny"
  },
  2: {
    description: "Partly cloudy",
    emoji: "⛅",
    condition: "partly cloudy"
  },
  3: {
    description: "Overcast",
    emoji: "☁️",
    condition: "cloudy"
  },
  45: {
    description: "Fog",
    emoji: "🌫️",
    condition: "foggy"
  },
  48: {
    description: "Depositing rime fog",
    emoji: "🌫️",
    condition: "foggy"
  },
  51: {
    description: "Light drizzle",
    emoji: "🌦️",
    condition: "drizzle"
  },
  53: {
    description: "Moderate drizzle",
    emoji: "🌦️",
    condition: "drizzle"
  },
  55: {
    description: "Dense drizzle",
    emoji: "🌦️",
    condition: "drizzle"
  },
  56: {
    description: "Light freezing drizzle",
    emoji: "🌧️",
    condition: "freezing drizzle"
  },
  57: {
    description: "Dense freezing drizzle",
    emoji: "🌧️",
    condition: "freezing drizzle"
  },
  61: {
    description: "Slight rain",
    emoji: "🌧️",
    condition: "light rain"
  },
  63: {
    description: "Moderate rain",
    emoji: "🌧️",
    condition: "rain"
  },
  65: {
    description: "Heavy rain",
    emoji: "🌧️",
    condition: "heavy rain"
  },
  66: {
    description: "Light freezing rain",
    emoji: "🧊",
    condition: "freezing rain"
  },
  67: {
    description: "Heavy freezing rain",
    emoji: "🧊",
    condition: "freezing rain"
  },
  71: {
    description: "Slight snow fall",
    emoji: "🌨️",
    condition: "light snow"
  },
  73: {
    description: "Moderate snow fall",
    emoji: "🌨️",
    condition: "snow"
  },
  75: {
    description: "Heavy snow fall",
    emoji: "❄️",
    condition: "heavy snow"
  },
  77: {
    description: "Snow grains",
    emoji: "🌨️",
    condition: "snow"
  },
  80: {
    description: "Slight rain showers",
    emoji: "🌦️",
    condition: "rain showers"
  },
  81: {
    description: "Moderate rain showers",
    emoji: "🌦️",
    condition: "rain showers"
  },
  82: {
    description: "Violent rain showers",
    emoji: "⛈️",
    condition: "heavy rain showers"
  },
  85: {
    description: "Slight snow showers",
    emoji: "🌨️",
    condition: "snow showers"
  },
  86: {
    description: "Heavy snow showers",
    emoji: "❄️",
    condition: "heavy snow showers"
  },
  95: {
    description: "Thunderstorm",
    emoji: "⛈️",
    condition: "thunderstorm"
  },
  96: {
    description: "Thunderstorm with slight hail",
    emoji: "⛈️",
    condition: "thunderstorm with hail"
  },
  99: {
    description: "Thunderstorm with heavy hail",
    emoji: "⛈️",
    condition: "thunderstorm with hail"
  }
};

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return weatherCodes[code] || {
    description: "Unknown weather condition",
    emoji: "❓",
    condition: "unknown"
  };
}

export function isNightTime(timeString: string): boolean {
  const hour = new Date(timeString).getHours();
  return hour < 6 || hour > 18;
}

export function getWeatherEmoji(code: number, isNight: boolean = false): string {
  const weatherInfo = getWeatherInfo(code);
  
  // For clear/sunny conditions at night, use moon emoji
  if (isNight && (code === 0 || code === 1)) {
    return code === 0 ? "🌙" : "🌙";
  }
  
  return weatherInfo.emoji;
}
