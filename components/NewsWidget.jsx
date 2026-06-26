'use client'

import { useState, useEffect } from 'react'

export default function NewsWidget() {
  const [articles, setArticles] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch('/api/news?category=general')
        const data = await response.json()

        if (response.ok) {
          setArticles(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  useEffect(() => {
    if (articles.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [articles])

  if (loading) {
    return (
      <div
        style={{
          width: '464px',
          height: '907px',
          borderRadius: '19px',
          background: '#FFFFFF',
        }}
        className="flex items-center justify-center"
      >
        Loading...
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div
        style={{
          width: '464px',
          height: '907px',
          borderRadius: '19px',
          background: '#FFFFFF',
        }}
        className="flex items-center justify-center"
      >
        No News Available
      </div>
    )
  }

  const article = articles[currentIndex]

  return (
    <div
      style={{
        width: '464px',
        height: '907px',
        borderRadius: '19px',
      }}
      className="overflow-hidden bg-white"
    >
      {/* Image Section */}
      <div className="relative h-[520px]">
        <img
          src={article.urlToImage || '/news-placeholder.jpg'}
          alt={article.title}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">

          <p className="text-[15px]">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>

          <p className="text-[15px] mb-4">
            {new Date(article.publishedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>

          <h2 className="text-[26px] font-bold leading-8">
            {article.title}
          </h2>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-6 h-[387px] flex flex-col justify-between">

        <p className="text-[#272727] text-[20px] leading-8 overflow-hidden">
          {article.description}
        </p>

        <div className="flex justify-end">
          <button
            className="text-white text-[24px] font-semibold rounded-[34px]"
            style={{
              background: '#148A08',
              width: '179px',
              height: '50px',
            }}
          >
            Browse
          </button>
        </div>

      </div>
    </div>
  )
}