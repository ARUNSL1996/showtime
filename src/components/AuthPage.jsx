import { useState } from 'react'

const authCopy = {
  login: {
    eyebrow: 'Returning user',
    title: 'Sign in to continue your movie browsing experience.',
    description:
      'Access your watchlist, resume discovery, and keep your selected titles close at hand.',
  },
  signup: {
    eyebrow: 'Create profile',
    title: 'Create your account and start building a personalized watchlist.',
    description:
      'Set up your profile to save favorites and prepare the app for future authentication integration.',
  },
}

const authHighlights = [
  {
    value: 'Secure',
    label: 'Designed for clean, reliable authentication flows.',
  },
  {
    value: 'Consistent',
    label: 'Matches the same visual language as the rest of the site.',
  },
  {
    value: 'Ready',
    label: 'Prepared for backend wiring whenever you are ready to connect it.',
  },
]

function AuthPage({ mode, onNavigate }) {
  const isLogin = mode === 'login'
  const copy = authCopy[mode] || authCopy.login
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(
      isLogin
        ? 'Login form is ready for backend integration.'
        : 'Signup form is ready for backend integration.',
    )
  }

  return (
    <section className="auth-layout">
      <div className="auth-intro">
        <span className="hero-kicker">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>

        <div className="auth-points">
          {authHighlights.map((item) => (
            <article key={item.value} className="auth-point">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="ghost-button"
          onClick={() => onNavigate('home')}
        >
          Back to home
        </button>
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="form-head">
          <span className="badge">
            {isLogin ? 'Secure sign in' : 'Create account'}
          </span>
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p>
            {isLogin
              ? 'Resume your session with a secure sign-in.'
              : 'Get started with a streamlined registration form.'}
          </p>
        </div>

        <div className={`form-grid ${isLogin ? '' : 'form-grid--split'}`}>
          {isLogin ? (
            <>
              <label className="field field--full">
                <span>Email address</span>
                <input type="email" placeholder="you@example.com" />
              </label>

              <label className="field field--full">
                <span>Password</span>
                <input type="password" placeholder="Enter your password" />
              </label>

              <label className="field field--full checkbox-field">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
            </>
          ) : (
            <>
              <label className="field field--full">
                <span>Full name</span>
                <input type="text" placeholder="Your name" />
              </label>

              <label className="field field--full">
                <span>Email address</span>
                <input type="email" placeholder="you@example.com" />
              </label>

              <label className="field">
                <span>Password</span>
                <input type="password" placeholder="Create a password" />
              </label>

              <label className="field">
                <span>Confirm password</span>
                <input type="password" placeholder="Repeat the password" />
              </label>

              <label className="field field--full checkbox-field">
                <input type="checkbox" />
                <span>I agree to the terms and want movie recommendations.</span>
              </label>
            </>
          )}
        </div>

        <button type="submit" className="primary-button auth-submit">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>

        <p className="auth-message">
          {status ||
            'This is a front-end form only. Connect it to your authentication API when ready.'}
        </p>

        <p className="form-switch">
          {isLogin ? 'Need an account?' : 'Already have an account?'}
          <button
            type="button"
            className="auth-toggle"
            onClick={() => onNavigate(isLogin ? 'signup' : 'login')}
          >
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </form>
    </section>
  )
}

export default AuthPage
