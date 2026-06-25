'use client'

import { useStore } from '../store/useStore'

export default function UserProfile() {
  const { user, categories } = useStore()

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 shadow-lg text-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
          <img 
            src="/user-avatar-placeholder.png" 
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p className="text-purple-200 text-sm">{user.email}</p>
          <p className="text-xl font-semibold mt-1">@{user.username}</p>
        </div>
      </div>
      <div className="border-t border-purple-400/30 pt-4">
        <p className="text-sm text-purple-200 mb-3">Selected Categories:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-purple-500/60 rounded-full text-sm font-medium hover:bg-purple-500/80 transition-all"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
