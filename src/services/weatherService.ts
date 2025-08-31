import { 
  OpenMeteoResponse, 
  CurrentWeather, 
  ForecastItem, 
  HourlyItem, 
  HighlightItem,
  LocationInfo 
} from '@/types/weather';
import { getWeatherInfo, getWeatherEmoji, isNightTime } from '@/utils/weatherCodes';

export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  async fetchWeatherData(location: LocationInfo): Promise<{
    current: CurrentWeather;
    forecast: ForecastItem[];
    hourly: HourlyItem[];
    highlights: HighlightItem[];
  }> {
    try {
      const params = new URLSearchParams({
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        current: [
          'temperature_2m',
          'relative_humidity_2m', 
          'apparent_temperature',
          'is_day',
          'precipitation',
          'rain',
          'showers',
          'snowfall',
          'weather_code',
          'cloud_cover',
          'pressure_msl',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m'
        ].join(','),
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'precipitation_probability',
          'precipitation',
          'weather_code',
          'pressure_msl',
          'cloud_cover',
          'visibility',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m'
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'apparent_temperature_min',
          'sunrise',
          'sunset',
          'uv_index_max',
          'precipitation_sum',
          'rain_sum',
          'showers_sum',
          'snowfall_sum',
          'precipitation_hours',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'wind_gusts_10m_max',
          'wind_direction_10m_dominant'
        ].join(','),
        timezone: 'auto',
        forecast_days: '7'
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Weather API request failed: ${response.status}`);
      }

      const data: OpenMeteoResponse = await response.json();
      
      return {
        current: this.transformCurrentWeather(data, location),
        forecast: this.transformForecast(data),
        hourly: this.transformHourlyWeather(data),
        highlights: this.transformHighlights(data)
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async searchLocations(query: string): Promise<LocationInfo[]> {
    try {
      const params = new URLSearchParams({
        name: query,
        count: '10',
        language: 'en',
        format: 'json'
      });

      const response = await fetch(`${this.geocodingUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Geocoding API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return (data.results || []).map((result: any) => ({
        id: result.id,
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        admin1: result.admin1,
        timezone: result.timezone
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    }
  }

  private transformCurrentWeather(data: OpenMeteoResponse, location: LocationInfo): CurrentWeather {
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code);
    const isNight = current.is_day === 0;

    return {
      location: `${location.name}${location.country ? `, ${location.country}` : ''}`,
      temperature: Math.round(current.temperature_2m),
      condition: weatherInfo.condition,
      description: weatherInfo.description,
      icon: getWeatherEmoji(current.weather_code, isNight),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      weatherCode: current.weather_code
    };
  }

  private transformForecast(data: OpenMeteoResponse): ForecastItem[] {
    const daily = data.daily;
    const today = new Date();
    
    return daily.time.slice(0, 7).map((dateString, index) => {
      const date = new Date(dateString);
      const weatherInfo = getWeatherInfo(daily.weather_code[index]);
      
      let dayName: string;
      if (index === 0) {
        dayName = 'Today';
      } else if (index === 1) {
        dayName = 'Tomorrow';
      } else {
        dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      }

      return {
        day: dayName,
        icon: weatherInfo.emoji,
        high: Math.round(daily.temperature_2m_max[index]),
        low: Math.round(daily.temperature_2m_min[index]),
        condition: weatherInfo.condition,
        weatherCode: daily.weather_code[index],
        date: dateString
      };
    });
  }

  private transformHourlyWeather(data: OpenMeteoResponse): HourlyItem[] {
    const hourly = data.hourly;
    const now = new Date();
    const currentHour = now.getHours();
    
    // Get next 24 hours of data
    return hourly.time.slice(0, 24).map((timeString, index) => {
      const time = new Date(timeString);
      const weatherInfo = getWeatherInfo(hourly.weather_code[index]);
      const isNight = isNightTime(timeString);
      
      let timeLabel: string;
      if (index === 0) {
        timeLabel = 'Now';
      } else {
        timeLabel = time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        });
      }

      return {
        time: timeLabel,
        temperature: Math.round(hourly.temperature_2m[index]),
        icon: getWeatherEmoji(hourly.weather_code[index], isNight),
        condition: weatherInfo.condition,
        weatherCode: hourly.weather_code[index],
        humidity: Math.round(hourly.relative_humidity_2m[index]),
        windSpeed: Math.round(hourly.wind_speed_10m[index])
      };
    });
  }

  private transformHighlights(data: OpenMeteoResponse): HighlightItem[] {
    const current = data.current;
    const daily = data.daily;
    
    // Find today's UV index
    const todayUvIndex = daily.uv_index_max[0] || 0;
    
    // Find today's sunrise/sunset
    const todaySunrise = daily.sunrise[0] ? new Date(daily.sunrise[0]) : null;
    const todaySunset = daily.sunset[0] ? new Date(daily.sunset[0]) : null;

    const highlights: HighlightItem[] = [
      {
        title: "UV Index",
        value: Math.round(todayUvIndex).toString(),
        unit: "",
        icon: "☀️",
        description: this.getUvDescription(todayUvIndex)
      },
      {
        title: "Pressure",
        value: Math.round(current.pressure_msl).toString(),
        unit: "hPa",
        icon: "🌡️",
        description: this.getPressureDescription(current.pressure_msl)
      },
      {
        title: "Cloud Cover",
        value: Math.round(current.cloud_cover).toString(),
        unit: "%",
        icon: "☁️",
        description: this.getCloudCoverDescription(current.cloud_cover)
      },
      {
        title: "Wind Gusts",
        value: Math.round(current.wind_gusts_10m).toString(),
        unit: "km/h",
        icon: "💨",
        description: this.getWindDescription(current.wind_gusts_10m)
      }
    ];

    if (todaySunrise) {
      highlights.push({
        title: "Sunrise",
        value: todaySunrise.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        unit: "",
        icon: "🌅",
        description: "Start of the day"
      });
    }

    if (todaySunset) {
      highlights.push({
        title: "Sunset",
        value: todaySunset.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        unit: "",
        icon: "🌇",
        description: "End of the day"
      });
    }

    return highlights;
  }

  private getUvDescription(uvIndex: number): string {
    if (uvIndex <= 2) return "Low - minimal protection needed";
    if (uvIndex <= 5) return "Moderate - wear sunscreen";
    if (uvIndex <= 7) return "High - protection required";
    if (uvIndex <= 10) return "Very high - extra protection needed";
    return "Extreme - avoid sun exposure";
  }

  private getPressureDescription(pressure: number): string {
    if (pressure < 1000) return "Low pressure - stormy weather possible";
    if (pressure > 1020) return "High pressure - stable weather";
    return "Normal atmospheric pressure";
  }

  private getCloudCoverDescription(cloudCover: number): string {
    if (cloudCover <= 10) return "Clear sky";
    if (cloudCover <= 50) return "Partly cloudy";
    if (cloudCover <= 90) return "Mostly cloudy";
    return "Overcast";
  }

  private getWindDescription(windSpeed: number): string {
    if (windSpeed < 12) return "Light winds";
    if (windSpeed < 25) return "Moderate winds";
    if (windSpeed < 39) return "Strong winds";
    return "Very strong winds";
  }
}

export const weatherService = new WeatherService();
