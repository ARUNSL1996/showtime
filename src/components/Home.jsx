import { useState } from "react";
import BookCard from "../BookCard";

const quickPicks = [
  { label: "Batman", query: "batman" },
  { label: "Inception", query: "inception" },
  { label: "Avatar", query: "avatar" },
  { label: "Interstellar", query: "interstellar" },
];

const featureCards = [
  {
    title: "Instant Movie Search",
    text: "Find movies, TV shows, and entertainment content instantly with fast and accurate search results.",
  },
  {
    title: "Detailed Information",
    text: "Access ratings, release dates, genres, cast members, plot summaries, and production details.",
  },
  {
    title: "Modern User Experience",
    text: "Enjoy a responsive design, smooth navigation, and a professional interface optimized for every device.",
  },
];

const stats = [
  { value: "10K+", label: "Movies Available" },
  { value: "500+", label: "Daily Searches" },
  { value: "24/7", label: "Online Access" },
];

function Home({
  movies,
  query,
  activeQuery,
  loading,
  error,
  onQueryChange,
  onSearch,
  onQuickPick,
  onNavigate,
  onViewDetails,
}) {
  const [showResultsBox, setShowResultsBox] = useState(false);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSearch) onSearch(e);
    setShowResultsBox(true);
  };
  return (
    <div className="home-page">
      {activeQuery && activeQuery.trim() !== "" ? (
        <section className="results-panel" aria-live="polite">
          <div className="section-head">
            <div>
              <span className="section-kicker">Search Results</span>

              <h2>Search Results: "{activeQuery}"</h2>
            </div>

            <button
              type="button"
              className="results-action-button"
              onClick={() => {
                setShowResultsBox(false);
                onQueryChange("");
              }}
            >
              Hide results
            </button>
          </div>

          {error ? <div className="empty-state error-state">{error}</div> : null}

          {!error && loading && movies.length === 0 ? (
            <div className="empty-state">Loading movie results...</div>
          ) : null}

          {!error && !loading && movies.length === 0 ? (
            <div className="empty-state">
              No movies found. Try a different keyword or choose one of the
              featured titles above.
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
      ) : null}

      {showResultsBox && movies.length > 0 ? (
        <div className="results-box" role="dialog" aria-label="Search results">
          <button
            className="results-close"
            aria-label="Close results"
            onClick={() => {
              setShowResultsBox(false);
              onQueryChange("");
            }}
          >
            ✕
          </button>

          <div className="results-box-head">
            <strong>Results for "{activeQuery}"</strong>
          </div>

          <div className="results-box-list">
            <div className="movie-grid">
              {movies.map((movie) => (
                <BookCard
                  key={movie.imdbID}
                  movie={movie}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">Welcome to MovieHub</span>

          <form className="search-bar" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="movie-search">
              Search movies
            </label>

            <input
              id="movie-search"
              type="search"
              placeholder="Search for movies, TV shows, actors, or directors..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />

            <button type="submit" className="primary-button">
              Search Catalog
            </button>

            <button
              type="button"
              className="clear-button"
              aria-label="Clear search"
              onClick={() => {
                onQueryChange("");
                setShowResultsBox(false);
              }}
            >
              ✕
            </button>
          </form>

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
            Discover the latest blockbusters, timeless classics,
            award-winning series, and trending releases from around the
            world. Search instantly, view detailed information, ratings,
            cast members, and production data all in one modern movie
            discovery platform.
          </p>

          <div className="quick-picks" aria-label="Quick search suggestions">
            {quickPicks.map((item) => (
              <button
                key={item.query}
                type="button"
                className="chip-button"
                onClick={() => onQuickPick(item.query)}
              >
                {item.label}
              </button>
            ))}
          </div>

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

            <h2>Your Ultimate Destination for Movie Discovery.</h2>

            <p>
              Browse extensive movie collections, access detailed
              information, explore cast and crew details, and stay updated
              with the latest releases through a clean and intuitive
              interface.
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
