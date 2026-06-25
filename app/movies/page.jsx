
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'
import { searchMovieByGenre } from '../../lib/apiServices'
import MovieCard from '../../components/MovieCard'
import MovieModal from '../../components/MovieModal'

export default function Movies() {
  const router = useRouter()
  const { categories } = useStore()
  const [moviesByCategory, setMoviesByCategory] = useState({})
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'demo'

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        const moviesData = {}
        
        for (const category of categories) {
          const movies = await searchMovieByGenre(category, apiKey)
          moviesData[category] = movies
        }
        
        setMoviesByCategory(moviesData)
        setError(null)
      } catch (err) {
        setError('Failed to load movies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (categories.length > 0) {
      loadMovies()
    }
  }, [categories, apiKey])

  if (loading) {
    return (
      <div className="min-h-screen p-8 lg:p-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 lg:p-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xl">👤</span>
          </div>
        </div>
        
        <h1 className="text-2xl ml-5 font-bold text-white mb-8">Entertainment according to your choice</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        {categories.map((category) => {
          const movies = moviesByCategory[category] || []
          
          if (movies.length === 0) {
            return (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
                <p className="text-gray-400">No movies found for this category</p>
              </div>
            )
          }

          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.slice(0, 8).map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={setSelectedMovie}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            apiKey={apiKey}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  )
}
