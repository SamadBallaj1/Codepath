import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createCreator } from '../api'

export default function AddCreator() {
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '', youtube: '', twitter: '', instagram: '', facebook: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
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
      const data = await createCreator(payload)
      navigate(`/creators/${data.id}`)
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Creator</h1>
      {error && <div className="card p-4 text-red-700 bg-red-50 ring-red-100 mb-4">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input value={form.imageURL} onChange={(e)=>setForm({ ...form, imageURL: e.target.value })} className="input" placeholder="https://.../image.jpg" />
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
          <input value={form.url} onChange={(e)=>setForm({ ...form, url: e.target.value })} type="url" required className="input" placeholder="https://example.com" />
        </div>
        <div className="flex items-center gap-3">
          <button disabled={submitting} className="btn-primary">{submitting ? 'Saving…' : 'Save'}</button>
          <Link to="/creators" className="btn-muted">Cancel</Link>
        </div>
      </form>
    </div>
  )
}