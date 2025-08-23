import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators.jsx";
import AddCreator from "./pages/AddCreator.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold">Creatorverse</Link>
          <nav className="space-x-3">
            <Link to="/creators" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Creators</Link>
            <Link to="/creators/new" className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">Add</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<Navigate to="/creators" replace />} />
          <Route path="/creators" element={<ShowCreators />} />
          <Route path="/creators/new" element={<AddCreator />} />
          <Route path="/creators/:id" element={<ViewCreator />} />
          <Route path="/creators/:id/edit" element={<EditCreator />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-500">© Creatorverse</div>
      </footer>
    </div>
  );
}
