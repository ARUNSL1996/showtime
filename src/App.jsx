import { useEffect, useState } from 'react'
import './App.css'
import AuthPage from './components/AuthPage'
import Footer from './components/Footer'
import Header from './components/Header'
import DetailsPage from './components/DetailsPage'
import Home from './components/Home'

const DEFAULT_QUERY = 'batman'
const API_URL = 'https://www.omdbapi.com/?apikey=da61c02'

async function fetchMovies(title, handlers) {
  const { setMovies, setLoading, setError, setActiveQuery } = handlers
  const term = title.trim() || DEFAULT_QUERY

  setLoading(true)
  setError('')
  setActiveQuery(term)

  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(term)}`)

    if (!response.ok) {
      throw new Error('Movie service unavailable right now.')
    }

    const data = await response.json()

    if (data.Response === 'False') {
      setMovies([])
      setError(data.Error || `No results found for "${term}".`)
      return
    }

    setMovies(data.Search || [])
  } catch (fetchError) {
    setMovies([])
    setError(
      fetchError instanceof Error
        ? fetchError.message
        : 'Unable to load movies right now.',
    )
  } finally {
    setLoading(false)
  }
}

async function fetchMovieDetails(movieId, handlers) {
  const { setSelectedMovie, setDetailsLoading, setDetailsError } = handlers

  if (!movieId) {
    setDetailsError('Movie details are unavailable right now.')
    return
  }

  setDetailsLoading(true)
  setDetailsError('')

  try {
    const response = await fetch(
      `${API_URL}&i=${encodeURIComponent(movieId)}&plot=full`,
    )

    if (!response.ok) {
      throw new Error('Movie details service unavailable right now.')
    }

    const data = await response.json()

    if (data.Response === 'False') {
      setDetailsError(data.Error || 'Unable to load this title right now.')
      return
    }

    setSelectedMovie(data)
  } catch (fetchError) {
    setDetailsError(
      fetchError instanceof Error
        ? fetchError.message
        : 'Unable to load this title right now.',
    )
  } finally {
    setDetailsLoading(false)
  }
}

function App() {
  const [page, setPage] = useState('home')
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [activeQuery, setActiveQuery] = useState(DEFAULT_QUERY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState('')

  useEffect(() => {
    void fetchMovies(DEFAULT_QUERY, {
      setMovies,
      setLoading,
      setError,
      setActiveQuery,
    })
  }, [])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    void fetchMovies(query, {
      setMovies,
      setLoading,
      setError,
      setActiveQuery,
    })
  }

  const handleQuickPick = (title) => {
    setQuery(title)
    void fetchMovies(title, {
      setMovies,
      setLoading,
      setError,
      setActiveQuery,
    })
  }

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie)
    setPage('details')
    void fetchMovieDetails(movie.imdbID, {
      setSelectedMovie,
      setDetailsLoading,
      setDetailsError,
    })
  }

  const handleBackToHome = () => {
    setPage('home')
  }

  return (
    <div className="app-shell">
      <Header currentPage={page === 'details' ? 'home' : page} onNavigate={setPage} />

      <main className="app-main">
        {page === 'home' ? (
          <Home
            movies={movies}
            query={query}
            activeQuery={activeQuery}
            loading={loading}
            error={error}
            onQueryChange={setQuery}
            onSearch={handleSearchSubmit}
            onQuickPick={handleQuickPick}
            onNavigate={setPage}
            onViewDetails={handleViewDetails}
          />
        ) : page === 'details' ? (
          <DetailsPage
            movie={selectedMovie}
            loading={detailsLoading}
            error={detailsError}
            onBack={handleBackToHome}
          />
        ) : (
          <AuthPage mode={page} onNavigate={setPage} />
        )}
      </main>

      <Footer onNavigate={setPage} />
    </div>
  )
}

export default App
