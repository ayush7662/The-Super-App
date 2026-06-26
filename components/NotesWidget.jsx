'use client'

import { useStore } from '../store/useStore'

export default function NotesWidget() {
  const { notes, setNotes } = useStore()

  return (
    <div
      className="rounded-[19px] bg-[#F1C75B] p-8 w-full"
      style={{
        height: '535px',
        maxWidth: '470px',
      }}
    >
      <h2
        className="font-bold text-black"
        style={{
          fontSize: '40px',
          lineHeight: '100%',
        }}
      >
        All notes
      </h2>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes..."
        className="
          mt-8
          w-full
          h-[420px]
          bg-transparent
          resize-none
          outline-none
          text-black
          placeholder:text-black/60
          leading-9
        "
        style={{
          fontSize: '26px',
          fontWeight: 400,
        }}
      />
    </div>
  )
}