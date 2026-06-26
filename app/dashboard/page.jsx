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
  <div className="min-h-screen bg-black p-8">
    <div className="mx-auto max-w-[1700px]">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-[#72DB73]"
          style={{
            fontFamily: 'Single Day',
            fontSize: '47px',
          }}
        >
          Super app
        </h1>

        <button
          onClick={() => router.push('/movies')}
          className="bg-[#148A08] text-white px-6 py-3 rounded-full"
        >
          Browse
        </button>
      </div>

      {/* Dashboard */}
      <div className="flex gap-10 items-start">

        {/* Left Side */}
        <div className="flex flex-col">

          {/* Profile + Notes */}
          <div className="flex gap-8">

            <div className="flex flex-col gap-6">
              <UserProfile />
              <WeatherWidget />
            </div>

            <NotesWidget />

          </div>

          {/* Timer */}
          <div className="mt-6">
            <TimerWidget />
          </div>

        </div>

        {/* News */}
        <div>
          <NewsWidget />
        </div>

      </div>

    </div>
  </div>
)
}