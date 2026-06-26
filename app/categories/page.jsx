'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../store/useStore'

const CATEGORIES = [
  'Action',
  'Drama',
  'Romance',
  'Thriller',
  'Western',
  'Horror',
  'Fantasy',
  'Music',
  'Fiction',
]

const categoryColors = {
  Action: '#FF5209',
  Drama: '#C996F7',
  Romance: '#148A08',
  Thriller: '#84C2FF',
  Western: '#9B3200',
  Horror: '#7358FF',
  Fantasy: '#EC4AD8',
  Music: '#F11A39',
  Fiction: '#6CCF63',
}

export default function Categories() {
  const router = useRouter()
  const { setCategories } = useStore()

  const [selectedCategories, setSelectedCategories] = useState([])

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category)
      )
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleContinue = () => {
    if (selectedCategories.length >= 3) {
      setCategories(selectedCategories)
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-12 py-8">

      <div className="w-full max-w-[1600px] flex justify-between">

        {/* LEFT */}

        <div className="w-[32%] pt-6">

          <h1
            className="text-[#72DB73]"
            style={{
              fontFamily: 'Single Day',
              fontSize: '55px',
            }}
          >
            Super app
          </h1>

          <h2 className="text-white text-[60px] font-bold leading-[82px] mt-12">
            Choose your
            <br />
            entertainment
            <br />
            category
          </h2>

          <div className="flex flex-wrap gap-4 mt-14 w-[420px]">

            {selectedCategories.map((category) => (

              <div
                key={category}
                className="bg-[#148A08] rounded-full px-6 py-2 flex items-center gap-3 text-white text-xl"
              >
                {category}

                <button
                  onClick={() => toggleCategory(category)}
                  className="text-[#0C5307] font-bold"
                >
                  ✕
                </button>

              </div>

            ))}

          </div>

          {selectedCategories.length > 0 &&
            selectedCategories.length < 3 && (

              <p className="text-red-500 mt-8 text-xl">
                ⚠ Minimum 3 category required
              </p>

            )}

        </div>

        {/* RIGHT */}

        <div className="relative w-[58%] pb-28">

          <div className="grid grid-cols-3 gap-x-8 gap-y-6">

            {CATEGORIES.map((category) => {

              const isSelected =
                selectedCategories.includes(category)

              return (

              <div
  key={category}
  onClick={() => toggleCategory(category)}
  className={`relative rounded-2xl cursor-pointer transition-all duration-200 ${
    isSelected ? "border-4 border-[#11B800]" : ""
  }`}
  style={{
    width: "250px",
    height: "251px",
    backgroundColor: categoryColors[category],
  }}
>
  {/* Category Name */}
  <h2
    className="absolute text-white font-semibold"
    style={{
      left: "20px",
      top: "18px",
      fontSize: "28px",
    }}
  >
    {category}
  </h2>

  {/* Image */}
  <div
    className="absolute overflow-hidden rounded-xl"
    style={{
      width: "210px",
      height: "118px",
      left: "20px",
      top: "95px",
    }}
  >
    <img
      src={`/assets/${category.toLowerCase()}.png`}
      alt={category}
      className="w-full h-full object-cover"
    />
  </div>
</div>

              )
            })}

          </div>

          {/* Next Button */}

          <button
            onClick={handleContinue}
            disabled={selectedCategories.length < 3}
            className="absolute bottom-0 right-0
                       w-[180px]
                       h-[60px]
                       rounded-full
                       bg-[#148A08]
                       text-white
                       text-[22px]
                       font-semibold
                       hover:bg-[#1AB80F]
                       transition-all
                       disabled:opacity-50
                       disabled:cursor-not-allowed"
          >
            Next Page
          </button>

        </div>

      </div>

    </div>
  )
}