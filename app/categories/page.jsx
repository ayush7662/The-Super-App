'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'

const CATEGORIES = ['Action', 'Comedy', 'Drama', 'Music', 'Sports', 'Thriller', 'Fantasy', 'Romance', 'Horror']

const categoryColors = {
  Action: 'from-red-500 to-orange-500',
  Comedy: 'from-yellow-400 to-orange-400',
  Drama: 'from-blue-500 to-purple-500',
  Music: 'from-pink-500 to-rose-500',
  Sports: 'from-green-500 to-emerald-500',
  Thriller: 'from-gray-700 to-gray-900',
  Fantasy: 'from-purple-500 to-indigo-500',
  Romance: 'from-pink-400 to-red-400',
  Horror: 'from-red-900 to-black',
}

const categoryIcons = {
  Action: '⚡',
  Comedy: '😂',
  Drama: '🎭',
  Music: '🎵',
  Sports: '⚽',
  Thriller: '🔪',
  Fantasy: '🧙',
  Romance: '❤️',
}

export default function Categories() {
  const router = useRouter()
  const { setCategories } = useStore()
  const [selectedCategories, setSelectedCategories] = useState([])

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleContinue = () => {
    if (selectedCategories.length >= 3) {
      setCategories(selectedCategories)
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen p-8 lg:p-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 
            className="text-[#72DB73]"
            style={{
              fontFamily: 'Single Day, cursive, sans-serif',
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '47.33px',
              lineHeight: '140%',
              letterSpacing: '0%'
            }}
          >
            Super app
          </h2>
        </div>

        {/* Main Layout: Text Left, Grid Right */}
        <div className="flex gap-12">
          {/* Left Side - Text */}
          <div className="w-1/3 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Choose your entertainment category</h1>
            <p className="text-gray-400 mb-6">Select at least 3 categories to continue</p>

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-full text-white font-medium"
                  >
                    {category}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="hover:bg-green-700 rounded-full w-6 h-6 flex items-center justify-center transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Validation Message */}
            {selectedCategories.length > 0 && selectedCategories.length < 3 && (
              <p className="text-red-500 mb-6 font-medium">
                Minimum 3 category required
              </p>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={selectedCategories.length < 3}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-fit"
            >
              Next Page
            </button>
          </div>

          {/* Right Side - 3x3 Grid */}
          <div className="w-2/3">
            <div className="grid grid-cols-3 gap-6">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category)
                return (
                  <div
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                      isSelected
                        ? `bg-gradient-to-br ${categoryColors[category]} shadow-xl ring-4 ring-white ring-opacity-50`
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    style={{
                      width: '250px',
                      height: '251px',
                      opacity: '1'
                    }}
                  >
                    <div className="h-40 bg-gray-700/50">
                      <img 
                        src={`/assets/${category.toLowerCase()}.png`}
                        alt={category}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/250x160?text=${category}`
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white text-center">
                        {category}
                      </h3>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
