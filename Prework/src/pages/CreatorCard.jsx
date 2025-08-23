import React from "react";
import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  const img = creator.imageURL || "/assets/placeholder.png";
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-gray-100">
      <div className="aspect-video bg-gray-100">
        <img src={img} alt={creator.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="truncate text-lg font-semibold">{creator.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{creator.description}</p>
        <div className="mt-4 flex gap-2">
          <a href={creator.url} target="_blank" rel="noreferrer" className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black">Visit</a>
          <Link to={`/creators/${creator.id}`} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">View</Link>
        </div>
      </div>
    </div>
  );
}
