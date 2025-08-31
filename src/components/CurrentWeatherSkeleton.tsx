export default function CurrentWeatherSkeleton() {
  return (
    <div className='bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <div className='h-6 w-32 bg-blue-300 rounded mb-2'></div>
          <div className='h-4 w-20 bg-blue-300 rounded'></div>
        </div>
        <div className='h-16 w-16 bg-blue-300 rounded-full'></div>
      </div>

      <div className='flex items-end mb-6'>
        <div className='h-14 w-14 bg-blue-300 rounded'></div>
        <div className='h-6 w-6 bg-blue-300 rounded ml-2 mb-2'></div>
      </div>

      <div className='flex justify-between items-end gap-2'>
        <div className='text-center'>
          <div className='h-4 w-16 bg-blue-300 rounded mb-2 mx-auto'></div>
          <div className='h-6 w-8 bg-blue-300 rounded mx-auto'></div>
        </div>
        <div className='text-center'>
          <div className='h-4 w-16 bg-blue-300 rounded mb-2 mx-auto'></div>
          <div className='h-6 w-8 bg-blue-300 rounded mx-auto'></div>
        </div>
        <div className='text-center'>
          <div className='h-4 w-16 bg-blue-300 rounded mb-2 mx-auto'></div>
          <div className='h-6 w-8 bg-blue-300 rounded mx-auto'></div>
        </div>
      </div>
    </div>
  )
}
