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
          <h1 className="text-4xl font-bold text-white">Super app</h1>
          <button
            onClick={() => router.push('/movies')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Explore Movies
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Profile */}
            <UserProfile />
            
            {/* News Widget */}
            <NewsWidget />
            
            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timer Widget */}
              <TimerWidget />
              
              {/* Notes Widget */}
              <NotesWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
