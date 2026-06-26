'use client'

import { useStore } from '../store/useStore'

export default function UserProfile() {
  const { user, categories } = useStore()

  return (
    <div
      className="rounded-[19px] text-white px-7 py-6 w-full"
      style={{
        height: '319px',
        background: '#5746EA',
        maxWidth: '507px',
      }}
    >
      {/* Top Section */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-[120px] h-[170px] rounded-[32px] overflow-hidden border-[3px] border-white">
          <img
            src="/assets/userProfile.png"

            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h3 className="text-[20px] font-normal">
            {user.name}
          </h3>

          <p className="text-[18px] text-[#FFFFFFCC]">
            {user.email}
          </p>

          <h2 className="text-[42px] font-bold leading-none mt-2">
            {user.username}
          </h2>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="h-[38px] rounded-full bg-[#9F94FF] flex items-center justify-center text-[16px] text-white"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}