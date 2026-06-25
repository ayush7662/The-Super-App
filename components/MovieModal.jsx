'use client'

import { useState, useEffect } from 'react'
import { fetchMovieDetails } from '../lib/apiServices'

export default function MovieModal({ movie, onClose, apiKey }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchMovieDetails(movie.imdbID, apiKey)
        setDetails(data)
      } catch (err) {
        console.error('Failed to load movie details:', err)
      } finally {
        setLoading(false)
      }
    }

    if (movie) {
      loadDetails()
    }
  }, [movie, apiKey])

  if (!movie) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {movie.Poster !== 'N/A' && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          ) : details ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">{details.Title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">
                  {details.Genre}
                </span>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                  {details.Year}
                </span>
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm">
                  ⭐ {details.imdbRating}
                </span>
                <span className="px-3 py-1 bg-orange-600 rounded-full text-sm">
                  {details.Runtime}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{details.Plot}</p>
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Cast:</h4>
                <p className="text-gray-400">{details.Actors}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Director:</h4>
                <p className="text-gray-400">{details.Director}</p>
              </div>
            </>
          ) : (
            <p className="text-red-400">Failed to load movie details</p>
          )}
        </div>
      </div>
    </div>
  )
}
