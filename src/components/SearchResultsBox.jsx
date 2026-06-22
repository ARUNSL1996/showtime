import BookCard from '../BookCard'

function SearchResultsBox({
  query,
  movies,
  loading,
  error,
  onClose,
  onViewDetails,
}) {
  return (
    <div className="search-results-backdrop" role="presentation">
      <section
        className="search-results-box"
        role="dialog"
        aria-modal="true"
        aria-label={`Search results for ${query || 'movies'}`}
      >
        <button
          type="button"
          className="search-results-close"
          aria-label="Close search results"
          onClick={onClose}
        >
          X
        </button>

        <div className="search-results-head">
          <span className="section-kicker">Search Results</span>
          <h2>Results for "{query}"</h2>
          <p>Use the X button to close this box.</p>
        </div>

        {error ? <div className="empty-state error-state">{error}</div> : null}

        {!error && loading && movies.length === 0 ? (
          <div className="empty-state">Loading search results...</div>
        ) : null}

        {!error && !loading && movies.length === 0 ? (
          <div className="empty-state">
            No movies found. Try another title and search again.
          </div>
        ) : null}

        {movies.length > 0 ? (
          <div className="search-results-grid movie-grid">
            {movies.map((movie) => (
              <BookCard
                key={movie.imdbID}
                movie={movie}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default SearchResultsBox
