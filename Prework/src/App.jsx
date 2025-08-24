import { Routes, Route, Navigate, Link } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import NotFound from './pages/NotFound.jsx'
import Footer from './components/footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/creators" className="text-xl font-bold tracking-tight">Creatorverse</Link>
          <nav className="flex items-center gap-3">
            <Link to="/creators" className="btn-ghost">Home</Link>
            <Link to="/creators/new" className="btn-primary">Add Creator</Link>
          </nav>
        </div>
      </header>
      <main className="container py-8 flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/creators" replace />} />
          <Route path="/creators" element={<ShowCreators />} />
          <Route path="/creators/new" element={<AddCreator />} />
          <Route path="/creators/:id" element={<ViewCreator />} />
          <Route path="/creators/:id/edit" element={<EditCreator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}