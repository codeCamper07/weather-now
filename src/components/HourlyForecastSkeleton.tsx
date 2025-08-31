export default function HourlyForecastSkeleton() {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse'>
      <div className='h-6 w-44 bg-gray-200 rounded mb-6'></div>
      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-col items-center space-y-2 min-w-[80px] p-3 rounded-lg'>
            <div className='h-4 w-12 bg-gray-200 rounded'></div>
            <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
            <div className='h-4 w-10 bg-gray-200 rounded'></div>
            <div className='h-3 w-16 bg-gray-200 rounded'></div>
          </div>
        ))}
      </div>
    </div>
  )
}
