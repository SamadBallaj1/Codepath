import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const run = async () => {
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (!error) setCreator(data);
      setLoading(false);
    };
    run();
  },[id]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!creator) return <div className="text-center text-gray-500">Not found</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-gray-100">
        <img src={creator.imageURL || "/assets/placeholder.png"} alt={creator.name} className="h-64 w-full object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{creator.name}</h1>
          <p className="mt-3 text-gray-700">{creator.description}</p>
          <div className="mt-6 flex gap-3">
            <a href={creator.url} target="_blank" rel="noreferrer" className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black">Visit</a>
            <Link to={`/creators/${creator.id}/edit`} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Edit</Link>
            <Link to="/creators" className="rounded-lg bg-gray-200 px-4 py-2">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
