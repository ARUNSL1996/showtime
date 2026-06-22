import BookCard from "../BookCard";

const featureCards = [
  {
    title: "Curated Movie Highlights",
    text: "Start with a ready-made lineup of popular and classic titles from the catalog.",
  },
  {
    title: "Detailed Information",
    text: "Access ratings, release dates, genres, cast members, plot summaries, and production details.",
  },
  {
    title: "Modern User Experience",
    text: "Enjoy a responsive design, smooth navigation, and a polished interface optimized for every device.",
  },
];

const stats = [
  { value: "10K+", label: "Movies Available" },
  { value: "500+", label: "Daily Visitors" },
  { value: "24/7", label: "Online Access" },
];

function Home({ movies, loading, error, onNavigate, onViewDetails }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">Welcome to ShowTime</span>

         

          <div className="hero-banner">
            <img
              src="https://thumbs.dreamstime.com/b/illustration-film-industry-popcorn-reel-film-clapperboard-cinema-screen-highly-detailed-illustration-128248155.jpg"
              alt="Movies banner"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://source.unsplash.com/1600x600/?movies,cinema";
              }}
            />
          </div>

          <p>
            Discover blockbuster favorites, timeless classics, award-winning
            series, and trending releases from around the world in one clean
            movie hub.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => onNavigate("login")}
            >
              Sign In
            </button>

            <button
              type="button"
              className="ghost-button"
              onClick={() => onNavigate("signup")}
            >
              Create Account
            </button>
          </div>
        </div>

        <aside className="hero-aside">
          <div className="spotlight-card">
            <span className="section-kicker">Featured Platform</span>

            <h2>Your destination for effortless movie discovery.</h2>

            <p>
              Browse extensive movie collections, open full title details, and
              stay updated with the latest releases through a clean and
              intuitive interface.
            </p>
          </div>

          <div className="stat-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="results-panel" aria-live="polite">
        <div className="section-head">
          <div>
            <span className="section-kicker">Featured Titles</span>
            <h2>Current lineup</h2>
          </div>
          <p>Pick any poster to open the full details view.</p>
        </div>

        {error ? <div className="empty-state error-state">{error}</div> : null}

        {!error && loading && movies.length === 0 ? (
          <div className="empty-state">Loading movie titles...</div>
        ) : null}

        {!error && !loading && movies.length === 0 ? (
          <div className="empty-state">
            No featured titles are available right now.
          </div>
        ) : null}

        {movies.length > 0 ? (
          <div className="movie-grid">
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

      <section className="feature-grid" aria-label="App highlights">
        {featureCards.map((card, index) => (
          <article key={card.title} className="feature-card">
            <span className="section-kicker">0{index + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Home;
