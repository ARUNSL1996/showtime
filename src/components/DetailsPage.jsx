const placeholderPoster = 'https://via.placeholder.com/420x630?text=Movie+Poster'

function formatValue(value) {
  return value && value !== 'N/A' ? value : 'Not listed'
}

function DetailsPage({ movie, loading, error, onBack }) {
  const poster =
    movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : placeholderPoster
  const imdbUrl = movie?.imdbID
    ? `https://www.imdb.com/title/${movie.imdbID}/`
    : null

  const quickFacts = [
    { label: 'Year', value: formatValue(movie?.Year) },
    { label: 'Runtime', value: formatValue(movie?.Runtime) },
    { label: 'Rated', value: formatValue(movie?.Rated) },
    { label: 'Genre', value: formatValue(movie?.Genre) },
  ]

  const detailRows = [
    { label: 'Director', value: formatValue(movie?.Director) },
    { label: 'Writer', value: formatValue(movie?.Writer) },
    { label: 'Cast', value: formatValue(movie?.Actors) },
    { label: 'Language', value: formatValue(movie?.Language) },
    { label: 'Country', value: formatValue(movie?.Country) },
    { label: 'Awards', value: formatValue(movie?.Awards) },
    {
      label: 'IMDb rating',
      value:
        movie?.imdbRating && movie.imdbRating !== 'N/A'
          ? `${movie.imdbRating}/10`
          : 'Not listed',
    },
    { label: 'Votes', value: formatValue(movie?.imdbVotes) },
    { label: 'Box office', value: formatValue(movie?.BoxOffice) },
    { label: 'Production', value: formatValue(movie?.Production) },
  ]

  return (
    <section className="details-page">
      <button type="button" className="ghost-button details-back" onClick={onBack}>
        Back to results
      </button>

      <div className="details-panel">
        <aside className="details-poster-card">
          <img
            src={poster}
            alt={`${movie?.Title || 'Movie'} poster`}
            className="details-poster"
          />

          <div className="details-poster-copy">
            <span className="section-kicker">Title details</span>
            <h2>{movie?.Title || 'Loading title details'}</h2>
            <p>
              {loading
                ? 'Retrieving the full title record, cast information, and production details.'
                : 'A complete overview of the selected film, ready for deeper browsing.'}
            </p>
          </div>
        </aside>

        <div className="details-content">
          <div className="details-head">
            <span className="hero-kicker">Selected title</span>
            <h1>{movie?.Title || 'Movie details'}</h1>

            <div className="details-meta">
              {quickFacts.map((item) => (
                <span key={item.label} className="movie-chip">
                  {item.label}: {item.value}
                </span>
              ))}
            </div>
          </div>

          {movie?.Plot ? (
            <p className="details-plot">{movie.Plot}</p>
          ) : (
            <p className="details-plot details-plot--muted">
              {loading
                ? 'Loading the full synopsis...'
                : 'Plot information is not available for this title.'}
            </p>
          )}

          <div className="details-actions">
            <button type="button" className="primary-button" onClick={onBack}>
              Back to results
            </button>

            {imdbUrl ? (
              <a
                href={imdbUrl}
                target="_blank"
                rel="noreferrer"
                className="secondary-button details-imdb"
              >
                Open IMDb
              </a>
            ) : null}
          </div>

          {error ? <div className="empty-state error-state">{error}</div> : null}

          <div className="details-grid">
            {detailRows.map((item) => (
              <article key={item.label} className="detail-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailsPage
