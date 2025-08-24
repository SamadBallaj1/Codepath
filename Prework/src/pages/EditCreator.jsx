import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getCreator, updateCreator, deleteCreator } from '../api'

export default function EditCreator() {
  const { id } = useParams()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '', youtube: '', twitter: '', instagram: '', facebook: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      try {
        const data = await getCreator(id)
        if (!ignore && data) setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
          youtube: data.youtube || '',
          twitter: data.twitter || '',
          instagram: data.instagram || '',
          facebook: data.facebook || ''
        })
      } catch (e) {
        if (!ignore) setError(String(e.message || e))
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [id])

  async function onSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null,
      youtube: form.youtube || null,
      twitter: form.twitter || null,
      instagram: form.instagram || null,
      facebook: form.facebook || null,
    }
    try {
      await updateCreator(id, payload)
      navigate(`/creators/${id}`)
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
    const ok = window.confirm('Delete this creator?')
    if (!ok) return
    try {
      await deleteCreator(id)
      navigate('/creators')
    } catch (e) {
      setError(String(e.message || e))
    }
  }

  if (loading) return <div className="text-gray-500">Loading…</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Creator</h1>
      {error && <div className="card p-4 text-red-700 bg-red-50 ring-red-100 mb-4">{error}</div>}
      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input value={form.imageURL} onChange={(e)=>setForm({ ...form, imageURL: e.target.value })} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} rows="4" required className="textarea" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Social Media Links</h2>
          <div>
            <label className="block text-sm font-medium mb-1">YouTube</label>
            <input value={form.youtube} onChange={(e)=>setForm({ ...form, youtube: e.target.value })} className="input" placeholder="youtube handle (without @)" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Twitter</label>
            <input value={form.twitter} onChange={(e)=>setForm({ ...form, twitter: e.target.value })} className="input" placeholder="twitter handle (without @)" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <input value={form.instagram} onChange={(e)=>setForm({ ...form, instagram: e.target.value })} className="input" placeholder="instagram handle (without @)" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Facebook</label>
            <input value={form.facebook} onChange={(e)=>setForm({ ...form, facebook: e.target.value })} className="input" placeholder="facebook handle or URL" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input value={form.url} onChange={(e)=>setForm({ ...form, url: e.target.value })} type="url" required className="input" />
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