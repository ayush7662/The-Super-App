'use client'

import { useState, useEffect } from 'react'
import { fetchCurrentWeather } from '../lib/apiServices'

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo'
  const city = 'London'

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true)
        const data = await fetchCurrentWeather(city, apiKey)
        setWeather(data)
        setError(null)
      } catch (err) {
        setError('Failed to load weather data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [apiKey])

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-900 rounded-2xl p-6 shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-pink-200">Date</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-pink-200">Time</p>
          <p className="text-lg font-semibold">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-4xl mb-2">⛈️</div>
          <p className="text-sm font-semibold capitalize">{weather.weather[0].description}</p>
        </div>
        
        <div className="text-center">
          <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="text-xs text-pink-200">{weather.main.pressure} mbar Pressure</p>
        </div>
        
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl">💨</span>
            <p className="text-sm">{weather.wind.speed} km/h Wind</p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl">💧</span>
            <p className="text-sm">{weather.main.humidity}% Humidity</p>
          </div>
        </div>
      </div>
    </div>
  )
}
