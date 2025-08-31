interface ForecastItem {
  day: string
  icon: string
  high: number
  low: number
  condition: string
  weatherCode: number
  date: string
}

interface ForecastCardProps {
  forecast: ForecastItem[]
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className='bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <h3 className='text-xl font-bold text-gray-800 mb-6'>7-Day Forecast</h3>
      <div className='space-y-4'>
        {forecast.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
            <div className='flex items-center space-x-4 flex-1'>
              <span className='text-2xl'>{item.icon}</span>
              <div>
                <p className='font-semibold text-gray-800'>{item.day}</p>
                <p className='text-sm text-gray-500 capitalize'>
                  {item.condition}
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <span className='text-lg font-semibold text-gray-800'>
                {item.high}°
              </span>
              <span className='text-lg text-gray-500'>{item.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
