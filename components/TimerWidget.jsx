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

  const Selector = ({ title, value, setValue, max }) => (
    <div className="flex flex-col items-center">

      <p className="text-[#A9A9C8] text-[28px] mb-4">
        {title}
      </p>

      <button
        onClick={() => !running && setValue(v => Math.min(max, v + 1))}
        className="text-[#8B8BAF] text-3xl"
      >
        ▲
      </button>

      <div className="text-white text-[56px] font-light leading-none my-3">
        {pad(value)}
      </div>

      <button
        onClick={() => !running && setValue(v => Math.max(0, v - 1))}
        className="text-[#8B8BAF] text-3xl"
      >
        ▼
      </button>

    </div>
  )

  return (
    <div
      style={{
        width: '1038px',
        height: '333px',
        background: '#1E2343',
        borderRadius: '19px',
      }}
      className="flex items-center px-10"
    >
      {/* Circle */}

      <div className="mr-20">

        <div className="w-[230px] h-[230px] rounded-full bg-[#191D3A] flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,.4)]">

          <div className="w-[180px] h-[180px] rounded-full border-[6px] border-[#FF6B6B] flex items-center justify-center">

            <span className="text-white text-[44px] font-semibold tracking-wide">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>

          </div>

        </div>

      </div>

      {/* Timer Controls */}

      <div className="flex-1 flex flex-col items-center">

        <div className="flex items-start gap-16">

          <Selector
            title="Hours"
            value={hours}
            setValue={setHours}
            max={23}
          />

          <div className="text-white text-[58px] mt-[70px]">:</div>

          <Selector
            title="Minutes"
            value={minutes}
            setValue={setMinutes}
            max={59}
          />

          <div className="text-white text-[58px] mt-[70px]">:</div>

          <Selector
            title="Seconds"
            value={seconds}
            setValue={setSeconds}
            max={59}
          />

        </div>

        <button
          onClick={() => setRunning(!running)}
          className="mt-8 rounded-full text-white text-[32px] font-medium"
          style={{
            width: '420px',
            height: '60px',
            background: '#FF6A6A',
          }}
        >
          {running ? 'Pause' : 'Start'}
        </button>

      </div>

    </div>
  )
}