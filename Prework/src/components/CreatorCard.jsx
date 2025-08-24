import { Link } from 'react-router-dom'

function normalizeUrl(kind, v) {
  if (!v) return null
  const val = String(v).trim()
  if (!val) return null
  if (/^https?:\/\//i.test(val)) return val
  if (kind === 'youtube') return `https://www.youtube.com/@${val}`
  if (kind === 'instagram') return `https://www.instagram.com/${val}`
  if (kind === 'facebook') return `https://www.facebook.com/${val}`
  return null
}

function Icon({ name, className = 'h-4 w-4' }) {
  if (name === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fill="currentColor" d="M23 12s0-3.5-.45-5.17A3.1 3.1 0 0 0 20.83 4.1C19.17 3.66 12 3.66 12 3.66s-7.17 0-8.83.44A3.1 3.1 0 0 0 1.45 6.83C1 8.5 1 12 1 12s0 3.5.45 5.17a3.1 3.1 0 0 0 1.72 2.73C4.83 20.34 12 20.34 12 20.34s7.17 0 8.83-.44a3.1 3.1 0 0 0 1.72-2.73C23 15.5 23 12 23 12Zm-13 3.34v-6.7l6 3.35Z"/></svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-2.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/></svg>
    )
  }
  if (name === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fill="currentColor" d="M13 22v-7h2.5L16 11h-3V9.25c0-.9.25-1.51 1.54-1.51H16V5.2A20 20 0 0 0 14 5c-2.15 0-3.62 1.31-3.62 3.72V11H8v4h2.38v7Z"/></svg>
    )
  }
  return null
}

export default function CreatorCard({ creator }) {
  const img = creator?.imageURL && creator.imageURL.trim() !== '' ? creator.imageURL : '/assets/placeholder.svg'
  const socials = [
    { name: 'youtube', url: normalizeUrl('youtube', creator?.youtube) },
    { name: 'instagram', url: normalizeUrl('instagram', creator?.instagram) },
    { name: 'facebook', url: normalizeUrl('facebook', creator?.facebook) },
  ].filter(s => !!s.url)

  return (
    <Link to={`/creators/${creator.id}`} className="block">
      <article className="card hover:shadow-xl transition">
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img src={img} alt={creator.name} className="h-full w-full !object-cover !object-center" />
        </div>
        <div className="card-body">
          <h3 className="text-lg font-semibold leading-tight">{creator.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{creator.description}</p>
          {socials.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 ring-1 ring-black/5">
                  <Icon name={s.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
          <a href={creator.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Visit</a>
        </div>
      </article>
    </Link>
  )
}