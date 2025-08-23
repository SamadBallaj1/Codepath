import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard.jsx'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      const { data, error } = await supabase.from('creators').select('*').order('created_at', { ascending: false })
      if (ignore) return
      if (error) setError(error.message)
      setCreators(data || [])
      setLoading(false)
    }
    load()
    return () => { ignore = true }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Creators</h1>
        <Link to="/creators/new" className="btn-primary">Add Creator</Link>
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
          <h2 className="text-xl font-semibold">No creators yet</h2>
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