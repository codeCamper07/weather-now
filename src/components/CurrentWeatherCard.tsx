interface CurrentWeatherCardProps {
  location: string
  temperature: number
  condition: string
  description: string
  icon: string
  feelsLike: number
  humidity: number
  windSpeed: number
}

export default function CurrentWeatherCard({
  location,
  temperature,
  condition,
  description,
  icon,
  feelsLike,
  humidity,
  windSpeed,
}: CurrentWeatherCardProps) {
  return (
    <div className='bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h2 className='text-2xl font-bold mb-1'>{location}</h2>
          <p className='text-blue-100 capitalize'>{description}</p>
        </div>
        <div className='text-6xl'>{icon}</div>
      </div>

      <div className='flex items-end mb-6'>
        <span className='text-6xl font-light'>{temperature}°</span>
        <span className='text-xl ml-2 mb-2'>C</span>
      </div>

      <div className='flex justify-between items-end gap-2'>
        <div className='text-center'>
          <p className='text-blue-100 text-sm'>Feels like</p>
          <p className='text-xl font-semibold'>{feelsLike}°</p>
        </div>
        <div className='text-center'>
          <p className='text-blue-100 text-sm'>Humidity</p>
          <p className='text-xl font-semibold'>{humidity}%</p>
        </div>
        <div className='text-center'>
          <p className='text-blue-100 text-sm'>Wind</p>
          <p className='text-xl font-semibold'>{windSpeed} km/h</p>
        </div>
      </div>
    </div>
  )
}
