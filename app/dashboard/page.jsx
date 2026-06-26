'use client'

import UserProfile from '../../components/UserProfile'
import WeatherWidget from '../../components/WeatherWidget'
import NewsWidget from '../../components/NewsWidget'
import TimerWidget from '../../components/TimerWidget'
import NotesWidget from '../../components/NotesWidget'
import { useStore } from '../../store/useStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const { user, categories } = useStore()

  useEffect(() => {
    if (!user.name || categories.length === 0) {
      router.push('/register')
    }
  }, [user, categories, router])

  return (
    <div className="min-h-screen p-8 lg:p-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 
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
          </h1>
          <button
            onClick={() => router.push('/movies')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Explore Movies
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* User Profile */}
            <UserProfile />
            
            {/* Weather Widget */}
            <WeatherWidget />
            
            {/* Timer Widget */}
            <TimerWidget />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Notes Widget - Middle */}
            <NotesWidget />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* News Widget */}
            <NewsWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
