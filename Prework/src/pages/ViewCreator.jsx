import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single()
      if (ignore) return
      if (error) setError(error.message)
      setCreator(data || null)
      setLoading(false)
    }
    load()
    return () => { ignore = true }
  }, [id])

  if (loading) return <div className="text-gray-500">Loading…</div>
  if (error) return <div className="card p-4 text-red-700 bg-red-50 ring-red-100">{error}</div>
  if (!creator) return <div className="empty-card">Not found.</div>

  const img = creator.imageURL && creator.imageURL.trim() !== '' ? creator.imageURL : '/assets/placeholder.png'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{creator.name}</h1>
        <div className="toolbar">
          <Link to={`/creators/${id}/edit`} className="btn-primary">Edit</Link>
          <Link to="/creators" className="btn-muted">Back</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="aspect-video bg-gray-100">
            <img src={img} alt={creator.name} className="h-full w-full object-cover" />
          </div>
          <div className="card-body">
            <p className="text-gray-700">{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Open Link</a>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Details</h3>
            <p className="card-subtitle">Metadata</p>
          </div>
          <div className="card-body space-y-2">
            <div>
              <div className="text-sm text-gray-600">ID</div>
              <div className="font-mono text-sm">{creator.id}</div>
            </div>
            {creator.created_at && (
              <div>
                <div className="text-sm text-gray-600">Created</div>
                <div className="text-sm">{new Date(creator.created_at).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}