import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single()
      if (ignore) return
      if (error) setError(error.message)
      if (data) setForm({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || ''
      })
      setLoading(false)
    }
    load()
    return () => { ignore = true }
  }, [id])

  async function onSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { data, error } = await supabase
      .from('creators')
      .update({ name: form.name, url: form.url, description: form.description, imageURL: form.imageURL || null })
      .eq('id', id)
      .select()
      .single()
    setSaving(false)
    if (error) { setError(error.message); return }
    if (data) navigate(`/creators/${id}`)
  }

  async function onDelete() {
    const ok = window.confirm('Delete this creator?')
    if (!ok) return
    const { error } = await supabase.from('creators').delete().eq('id', id)
    if (error) { setError(error.message); return }
    navigate('/creators')
  }

  if (loading) return <div className="text-gray-500">Loading…</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Creator</h1>
      {error && <div className="card p-4 text-red-700 bg-red-50 ring-red-100 mb-4">{error}</div>}
      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e)=>setForm({ ...form, name: e.target.value })}
            required
            className="input"
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            value={form.imageURL}
            onChange={(e)=>setForm({ ...form, imageURL: e.target.value })}
            className="input"
          />
        </div>
        <div className="flex items-center gap-3">
          <button disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save'}</button>
          <button type="button" onClick={onDelete} className="btn-danger">Delete</button>
          <Link to={`/creators/${id}`} className="btn-muted">Cancel</Link>
        </div>
      </form>
    </div>
  )
}