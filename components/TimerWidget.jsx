'use client'

import { useState, useEffect } from 'react'

export default function TimerWidget() {
  const [hours, setHours] = useState(5)
  const [minutes, setMinutes] = useState(9)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setRunning(false)
        return
      }

      if (seconds > 0) {
        setSeconds((s) => s - 1)
      } else if (minutes > 0) {
        setMinutes((m) => m - 1)
        setSeconds(59)
      } else if (hours > 0) {
        setHours((h) => h - 1)
        setMinutes(59)
        setSeconds(59)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [running, hours, minutes, seconds])

  const pad = (n) => n.toString().padStart(2, '0')

  const NumberSelector = ({ value, setValue, max }) => (
    <div className="flex flex-col items-center">
      <button
        onClick={() => !running && setValue((v) => Math.min(max, v + 1))}
        className="text-gray-400 text-2xl hover:text-white"
      >
        ▲
      </button>

      <div className="text-white text-6xl font-light">
        {pad(value)}
      </div>

      <button
        onClick={() => !running && setValue((v) => Math.max(0, v - 1))}
        className="text-gray-400 text-2xl hover:text-white"
      >
        ▼
      </button>
    </div>
  )

  return (
    <div
      className="rounded-[19px] bg-[#1F2348] flex items-center justify-between px-10"
      style={{
        width: '1038px',
        height: '333px',
      }}
    >
      {/* Circle */}

      <div className="w-[250px] h-[250px] rounded-full bg-[#171B3B] flex items-center justify-center shadow-inner">
        <div className="w-[190px] h-[190px] rounded-full border-[6px] border-[#FF6A6A] flex items-center justify-center">
          <span className="text-white text-5xl font-semibold">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        </div>
      </div>

      {/* Selectors */}

      <div className="flex flex-col items-center">

        <div className="flex items-center gap-16">

          <div className="text-center">
            <p className="text-gray-400 text-2xl mb-6">Hours</p>
            <NumberSelector
              value={hours}
              setValue={setHours}
              max={23}
            />
          </div>

          <div className="text-white text-6xl mt-16">:</div>

          <div className="text-center">
            <p className="text-gray-400 text-2xl mb-6">Minutes</p>
            <NumberSelector
              value={minutes}
              setValue={setMinutes}
              max={59}
            />
          </div>

          <div className="text-white text-6xl mt-16">:</div>

          <div className="text-center">
            <p className="text-gray-400 text-2xl mb-6">Seconds</p>
            <NumberSelector
              value={seconds}
              setValue={setSeconds}
              max={59}
            />
          </div>

        </div>

        <button
          onClick={() => setRunning(!running)}
          className="mt-10 w-[500px] h-[60px] rounded-full bg-[#FF6A6A] text-white text-3xl font-medium hover:bg-[#ff5555]"
        >
          {running ? 'Pause' : 'Start'}
        </button>

      </div>
    </div>
  )
}