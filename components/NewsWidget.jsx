'use client'

import { useState, useEffect } from 'react'
import { fetchTopHeadlines } from '../lib/apiServices'

export default function NewsWidget() {
  const [articles, setArticles] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo'

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        const data = await fetchTopHeadlines('general', apiKey)
        setArticles(data)
        setError(null)
      } catch (err) {
        setError('Failed to load news')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [apiKey])

  useEffect(() => {
    if (articles.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [articles])

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    )
  }

  if (error || articles.length === 0) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <p className="text-red-400 text-center">{error || 'No news available'}</p>
      </div>
    )
  }

  const article = articles[currentIndex]

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg text-gray-900">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>{new Date(article.publishedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <h4 className="text-xl font-bold mb-3">{article.title}</h4>
        <p className="text-gray-600 line-clamp-3">{article.description}</p>
        <button className="mt-4 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
          Browse
        </button>
      </div>
    </div>
  )
}
