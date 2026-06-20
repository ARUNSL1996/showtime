const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'login', label: 'Sign In' },
  { id: 'signup', label: 'Create Account' },
]

function Header({ currentPage, onNavigate }) {
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
