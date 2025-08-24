import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listCreators } from '../api'
import CreatorCard from '../components/CreatorCard.jsx'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      try {
        const data = await listCreators()
        if (!ignore) setCreators(data || [])
      } catch (e) {
        if (!ignore) setError(String(e.message || e))
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl shadow ring-1 ring-black/5">
        <img src="https://cdn.pixabay.com/video/2024/02/23/201676-916080496_tiny.jpg" alt="Featured" className="h-56 w-full object-cover sm:h-72 lg:h-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Creatorverse</h1>
            <p className="mt-1 text-white/90 max-w-2xl">Discover podcasts and YouTube creators. Browse, add, edit, and curate your favorites.</p>
            <div className="mt-4">
              <Link to="/creators/new" className="btn-primary">Add Creator</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Latest Creators</h2>
        <Link to="/creators/new" className="btn-muted">Add New</Link>
      </div>

      {error && <div className="card p-4 text-red-700 bg-red-50 ring-red-100">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton-thumb" />
              <div className="card-body">
                <div className="skeleton-line w-2/3" />
                <div className="skeleton-line w-4/5" />
                <div className="skeleton-line w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="empty-card">
          <h3 className="text-xl font-semibold">No creators yet</h3>
          <p className="empty-state">Add your first creator to get started.</p>
          <Link to="/creators/new" className="btn-primary">Add Creator</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map(c => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </div>
  )
}