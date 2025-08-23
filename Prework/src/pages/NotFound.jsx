import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty-card">
      <h1 className="text-3xl font-bold">404 — Not Found</h1>
      <p className="empty-state">The page you’re looking for doesn’t exist.</p>
      <Link to="/creators" className="btn-primary">Back to Home</Link>
    </div>
  )
}