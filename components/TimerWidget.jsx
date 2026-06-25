'use client'

import { useState, useEffect, useRef } from 'react'

export default function TimerWidget() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(minutes * 60)
  const intervalRef = useRef(null)

  useEffect(() => {
    setTimeLeft(hours * 3600 + minutes * 60 + seconds)
  }, [hours, minutes, seconds])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      alert('Timer finished!')
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    if (timeLeft > 0) setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(hours * 3600 + minutes * 60 + seconds)
  }

  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
      <h3 className="text-xl font-bold mb-4">Countdown Timer</h3>
      
      <div className="text-5xl font-bold text-center mb-6 font-mono">
        {formatTime(timeLeft)}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <label className="text-xs text-green-100 block mb-1">Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
            disabled={isRunning}
            className="w-full px-2 py-2 rounded bg-white/20 text-center font-bold"
            min="0"
          />
        </div>
        <div>
          <label className="text-xs text-green-100 block mb-1">Minutes</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            disabled={isRunning}
            className="w-full px-2 py-2 rounded bg-white/20 text-center font-bold"
            min="0"
            max="59"
          />
        </div>
        <div>
          <label className="text-xs text-green-100 block mb-1">Seconds</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            disabled={isRunning}
            className="w-full px-2 py-2 rounded bg-white/20 text-center font-bold"
            min="0"
            max="59"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleStart}
          disabled={isRunning || timeLeft === 0}
          className="flex-1 bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="flex-1 bg-white/20 py-2 rounded-lg font-semibold hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-white/20 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
