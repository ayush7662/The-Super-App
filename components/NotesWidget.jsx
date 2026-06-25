'use client'

import { useStore } from '../store/useStore'

export default function NotesWidget() {
  const { notes, setNotes } = useStore()

  const handleNoteChange = (e) => {
    setNotes(e.target.value)
  }

  const handleClear = () => {
    setNotes('')
  }

  return (
    <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">All Notes</h3>
        <button
          onClick={handleClear}
          className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-all"
        >
          Clear
        </button>
      </div>
      
      <textarea
        value={notes}
        onChange={handleNoteChange}
        placeholder="Write your notes here..."
        className="w-full h-32 px-4 py-3 rounded-lg bg-white/20 placeholder-white/50 text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      
      <p className="text-xs text-orange-100 mt-2">
        Notes are automatically saved to your browser
      </p>
    </div>
  )
}
