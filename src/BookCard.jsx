import './Bookcard.css'

const BookCard = ({ movie, onViewDetails }) => {
  const poster =
    movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/220x300'

  return (
    <article className="movie-card">
      <img
        src={poster}
        alt={`${movie.Title} poster`}
        className="movie-img"
      />

      <div className="movie-info">
        <div className="movie-meta">
          <span className="movie-chip">{movie.Year}</span>
          {movie.Type ? <span className="movie-chip movie-chip--accent">{movie.Type}</span> : null}
        </div>

        <h3>{movie.Title}</h3>

        <button
          type="button"
          className="movie-link"
          onClick={() => onViewDetails(movie)}
          disabled={!onViewDetails}
        >
          View Details
        </button>
      </div>
    </article>
  )
}

export default BookCard
