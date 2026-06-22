const footerLinks = [
  { id: 'home', label: 'Home' },
  { id: 'login', label: 'Sign In' },
  { id: 'signup', label: 'Create Account' },
]

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <span className="brand-mark brand-mark--footer">ST</span>
          <div>
            <strong>ShowTime</strong>
            <p>
              A polished movie discovery experience with search, title
              details, and account-ready views.
            </p>
          </div>
        </div>

        <div className="footer-group">
          <h3>Explore</h3>
          <div className="footer-links">
            {footerLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                className="footer-link"
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-group footer-group--note">
          <h3>Note</h3>
          <p>
            Connect your backend whenever you are ready to enable sign-in,
            account creation, and saved movie experiences.
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>Powered by OMDb API.</span>
        <span>Designed for a clean, modern browsing experience.</span>
      </div>
    </footer>
  )
}

export default Footer
