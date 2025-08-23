import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { data, error } = await supabase
      .from('creators')
      .insert({ name: form.name, url: form.url, description: form.description, imageURL: form.imageURL || null })
      .select()
      .single()
    setSubmitting(false)
    if (error) { setError(error.message); return }
    if (data) navigate(`/creators/${data.id}`)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Creator</h1>
      {error && <div className="card p-4 text-red-700 bg-red-50 ring-red-100 mb-4">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e)=>setForm({ ...form, name: e.target.value })}
            required
            className="input"
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            value={form.url}
            onChange={(e)=>setForm({ ...form, url: e.target.value })}
            type="url"
            required
            className="input"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e)=>setForm({ ...form, description: e.target.value })}
            rows="4"
            required
            className="textarea"
            placeholder="Why this creator is awesome…"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            value={form.imageURL}
            onChange={(e)=>setForm({ ...form, imageURL: e.target.value })}
            className="input"
            placeholder="https://.../image.jpg"
          />
        </div>
        <div className="flex items-center gap-3">
          <button disabled={submitting} className="btn-primary">{submitting ? 'Saving…' : 'Save'}</button>
          <Link to="/creators" className="btn-muted">Cancel</Link>
        </div>
      </form>
    </div>
  )
}