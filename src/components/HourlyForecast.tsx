interface HourlyItem {
  time: string
  temperature: number
  icon: string
  condition: string
  weatherCode: number
  humidity: number
  windSpeed: number
}

interface HourlyForecastProps {
  hourlyData: HourlyItem[]
}

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <h3 className='text-xl font-bold text-gray-800 mb-6'>24-Hour Forecast</h3>
      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center space-y-2 min-w-[80px] p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
            <p className='text-sm font-medium text-gray-600'>{item.time}</p>
            <span className='text-2xl'>{item.icon}</span>
            <p className='text-lg font-semibold text-gray-800'>
              {item.temperature}°
            </p>
            <p className='text-xs text-gray-500 text-center capitalize'>
              {item.condition}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
