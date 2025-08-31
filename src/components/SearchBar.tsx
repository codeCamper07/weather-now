'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (location: string) => void
  placeholder?: string
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search for cities or towns...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.target.value)
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)
  }

  return (
    <div className='relative w-full max-w-md'>
      <div className='relative'>
        <input
          type='text'
          value={query}
          onChange={handleSubmit}
          placeholder={placeholder}
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
      <div></div>
    </div>
  )
}
