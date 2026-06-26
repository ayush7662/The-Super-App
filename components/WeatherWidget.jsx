'use client'

import { useState, useEffect } from 'react'
import { fetchCurrentWeather } from '../lib/apiServices'

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ''
  const city = 'London'

  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await fetchCurrentWeather(city, apiKey)
        setWeather(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [apiKey])

  if (loading) {
    return (
      <div
        style={{
          height: '177px',
          background: '#101744',
          borderTopLeftRadius: '19px',
          borderTopRightRadius: '19px',
          maxWidth: '507px',
        }}
        className="w-full flex items-center justify-center text-white"
      >
        Loading...
      </div>
    )
  }

  if (!weather) {
    return (
      <div
        style={{
          height: '177px',
          background: '#101744',
          borderTopLeftRadius: '19px',
          borderTopRightRadius: '19px',
          maxWidth: '507px',
        }}
        className="w-full flex items-center justify-center text-white"
      >
        Failed to load weather
      </div>
    )
  }

  return (
    <div
      style={{
        height: '177px',
        borderTopLeftRadius: '19px',
        borderTopRightRadius: '19px',
        overflow: 'hidden',
        maxWidth: '507px',
      }}
      className="w-full"
    >
      {/* Pink Header */}
      <div
        style={{
          background: '#FF4ADE',
          height: '68px',
        }}
        className="flex justify-between items-center px-8 text-white"
      >
        <div>
          <h3 className="text-[18px] font-semibold">
            {new Date().toLocaleDateString()}
          </h3>
          <p className="text-sm">Date</p>
        </div>

        <div className="text-right">
          <h3 className="text-[18px] font-semibold">
            {weather.weather[0].main}
          </h3>
          <p className="text-sm">Weather</p>
        </div>
      </div>

      {/* Dark Bottom */}
      <div
        style={{
          background: '#101744',
          height: '109px',
        }}
        className="grid grid-cols-4 text-white"
      >
        {/* Icon */}
        <div className="flex items-center justify-center border-r border-white/20">
          <span className="text-5xl">⛅</span>
        </div>

        {/* Temperature */}
        <div className="flex flex-col justify-center px-4 border-r border-white/20">
          <h2 className="text-[32px] font-bold leading-none">
            {Math.round(weather.main.temp)}°C
          </h2>

          <p className="text-xs text-gray-300 mt-2">
            {weather.main.pressure} mbar
          </p>

          <p className="text-xs text-gray-300">
            Pressure
          </p>
        </div>

        {/* Wind */}
        <div className="flex flex-col justify-center px-4 border-r border-white/20">
          <div className="text-2xl">💨</div>

          <p className="text-sm mt-1">
            {weather.wind.speed} km/h
          </p>

          <p className="text-xs text-gray-300">
            Wind
          </p>
        </div>

        {/* Humidity */}
        <div className="flex flex-col justify-center px-4">
          <div className="text-2xl">💧</div>

          <p className="text-sm mt-1">
            {weather.main.humidity}%
          </p>

          <p className="text-xs text-gray-300">
            Humidity
          </p>
        </div>
      </div>
    </div>
  )
}