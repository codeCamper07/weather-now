'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import CurrentWeatherSkeleton from '@/components/CurrentWeatherSkeleton'
import ForecastCardSkeleton from '@/components/ForecastSkeleton'
import WeatherHighlightsSkeleton from '@/components/WeatherHighlightsSkeleton'
import HourlyForecastSkeleton from '@/components/HourlyForecastSkeleton'
import { weatherService } from '@/services/weatherService'
import {
  CurrentWeather,
  ForecastItem,
  HourlyItem,
  HighlightItem,
  LocationInfo,
} from '@/types/weather'

const CurrentWeatherCard = dynamic(
  () => import('@/components/CurrentWeatherCard'),
  {
    loading: () => CurrentWeatherSkeleton(),
  },
)
const ForecastCard = dynamic(() => import('@/components/ForecastCard'), {
  loading: () => ForecastCardSkeleton(),
})
const WeatherHighlights = dynamic(
  () => import('@/components/WeatherHighlights'),
  {
    loading: () => WeatherHighlightsSkeleton(),
  },
)
const HourlyForecast = dynamic(() => import('@/components/HourlyForecast'), {
  loading: () => HourlyForecastSkeleton(),
})

const Home = () => {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<LocationInfo | null>(null)
  const [suggestions, setSuggestions] = useState<LocationInfo[]>([])
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  )
  const [forecast, setForecast] = useState<ForecastItem[]>([])
  const [hourlyData, setHourlyData] = useState<HourlyItem[]>([])
  const [highlights, setHighlights] = useState<HighlightItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) {
        // Default to New York if no location selected
        const defaultLocation: LocationInfo = {
          name: 'New York',
          latitude: 40.7128,
          longitude: -74.006,
          country: 'United States',
        }
        setLocation(defaultLocation)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const weatherData = await weatherService.fetchWeatherData(location)
        setCurrentWeather(weatherData.current)
        setForecast(weatherData.forecast)
        setHourlyData(weatherData.hourly)
        setHighlights(weatherData.highlights)
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [location])

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 2) {
      try {
        const results = await weatherService.searchLocations(value)
        setSuggestions(results)
      } catch (error) {
        console.error('Search error:', error)
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }

  const handleLocationSelect = (selectedLocation: LocationInfo) => {
    setLocation(selectedLocation)
    setQuery(selectedLocation.name)
    setSuggestions([])
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100'>
      {/* Header with Search */}
      <header className='sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <span className='text-2xl'>🌤️</span>
              <h1 className='text-2xl font-bold text-gray-800'>Weather Now</h1>
            </div>
            <div className='flex-1 max-w-md ml-8'>
              <div className='relative w-full max-w-md'>
                <div className='relative'>
                  <input
                    type='text'
                    value={query}
                    onChange={handleInputChange}
                    placeholder={'Search for cities or towns...'}
                    className='w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md'
                  />
                  <button
                    type='submit'
                    className='absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  {suggestions.length > 0 && (
                    <ul className='absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-auto'>
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id || suggestion.name}
                          className='px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors'
                          onClick={() => handleLocationSelect(suggestion)}>
                          <div className='flex flex-col'>
                            <span className='font-medium text-gray-800'>
                              {suggestion.name}
                            </span>
                            {suggestion.country && (
                              <span className='text-xs text-gray-500'>
                                {suggestion.admin1
                                  ? `${suggestion.admin1}, `
                                  : ''}
                                {suggestion.country}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {error && (
          <div className='mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700'>
            {error}
          </div>
        )}

        <div className='flex flex-col gap-3'>
          {/* Current Weather*/}
          <div className='flex flex-col lg:flex-row gap-3'>
            <div className='lg:w-1/2 lg:h-[300px]'>
              {loading || !currentWeather ? (
                <CurrentWeatherSkeleton />
              ) : (
                <CurrentWeatherCard
                  location={currentWeather.location}
                  temperature={currentWeather.temperature}
                  condition={currentWeather.condition}
                  description={currentWeather.description}
                  icon={currentWeather.icon}
                  feelsLike={currentWeather.feelsLike}
                  humidity={currentWeather.humidity}
                  windSpeed={currentWeather.windSpeed}
                />
              )}
            </div>

            {/* 7-Day Forecast*/}
            <div className='lg:w-1/2 lg:h-[264px] overflow-scroll rounded-2xl'>
              {loading || forecast.length === 0 ? (
                <ForecastCardSkeleton />
              ) : (
                <ForecastCard forecast={forecast} />
              )}
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className='mt-6'>
          {loading || hourlyData.length === 0 ? (
            <HourlyForecastSkeleton />
          ) : (
            <HourlyForecast hourlyData={hourlyData} />
          )}
        </div>

        {/* Weather Highlights */}
        <div className='mt-6'>
          {loading || highlights.length === 0 ? (
            <WeatherHighlightsSkeleton />
          ) : (
            <WeatherHighlights highlights={highlights} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className='mt-12 py-8 border-t border-gray-200 bg-white/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-gray-600'>
            Built with Next.js and Tailwind CSS • Weather data for demonstration
            purposes
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
