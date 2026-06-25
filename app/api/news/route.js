import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'general'
  const apiKey = process.env.NEWS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'News API key not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data.articles || [])
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
