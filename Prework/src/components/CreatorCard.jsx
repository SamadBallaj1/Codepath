import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
  const img = creator?.imageURL && creator.imageURL.trim() !== '' ? creator.imageURL : '/assets/placeholder.svg'

  return (
    <Link to={`/creators/${creator.id}`} className="block">
      <article className="card hover:shadow-lg transition">
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img src={img} alt={creator.name} className="h-full w-full object-cover" />
        </div>
        <div className="card-body">
          <h3 className="text-lg font-semibold leading-tight">{creator.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Visit</a>
        </div>
      </article>
    </Link>
  )
}