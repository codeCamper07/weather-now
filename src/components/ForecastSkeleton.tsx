export default function ForecastCardSkeleton() {
  return (
    <div className='bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse'>
      <div className='h-6 w-40 bg-gray-200 rounded mb-6'></div>
      <div className='space-y-4'>
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className='flex items-center justify-between py-3 px-2 rounded-lg'>
            <div className='flex items-center space-x-4 flex-1'>
              <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
              <div>
                <div className='h-4 w-20 bg-gray-200 rounded mb-2'></div>
                <div className='h-3 w-16 bg-gray-200 rounded'></div>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='h-4 w-8 bg-gray-200 rounded'></div>
              <div className='h-4 w-8 bg-gray-200 rounded'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
