export default function WeatherHighlightsSkeleton() {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse'>
      <div className='h-6 w-44 bg-gray-200 rounded mb-6'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='bg-gray-50 rounded-xl p-4'>
            <div className='flex items-center justify-between mb-3'>
              <div className='h-4 w-24 bg-gray-200 rounded'></div>
              <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
            </div>
            <div className='flex items-end space-x-1'>
              <div className='h-6 w-12 bg-gray-200 rounded'></div>
              <div className='h-4 w-8 bg-gray-200 rounded mb-1'></div>
            </div>
            <div className='h-3 w-32 bg-gray-200 rounded mt-2'></div>
          </div>
        ))}
      </div>
    </div>
  )
}
