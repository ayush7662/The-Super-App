'use client'

export default function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
        alt={movie.Title}
        className="w-full h-48 object-cover"
      />
    </div>
  )
}