const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'login', label: 'Sign In' },
  { id: 'signup', label: 'Create Account' },
]

function Header({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
}) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button
          type="button"
          className="brand"
          onClick={() => onNavigate('home')}
          aria-label="Go to home"
        >
          <span className="brand-mark">ST</span>
          <span className="brand-copy">
            <strong>ShowTime</strong>
            <span>Curated movie discovery</span>
          </span>
        </button>

        <form className="header-search" onSubmit={onSearchSubmit}>
          <label className="sr-only" htmlFor="header-search">
            Search movies
          </label>

          <input
            id="header-search"
            type="search"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />

          <button type="submit" className="header-search__button">
            Search
          </button>
        </form>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${currentPage === item.id ? 'is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
