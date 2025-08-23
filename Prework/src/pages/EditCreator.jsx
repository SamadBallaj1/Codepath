import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    const run = async () => {
      const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (!error && data) setForm(data);
      setLoading(false);
    };
    run();
  },[id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("creators").update(form).eq("id", id);
    setSaving(false);
    if (!error) navigate(`/creators/${id}`);
  };

  const del = async () => {
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (!error) navigate("/creators");
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold">Edit Creator</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input className="w-full rounded-lg border px-3 py-2" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full rounded-lg border px-3 py-2" value={form.url} onChange={(e)=>setForm({...form,url:e.target.value})} />
        <textarea className="w-full rounded-lg border px-3 py-2" rows="4" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
        <input className="w-full rounded-lg border px-3 py-2" value={form.imageURL} onChange={(e)=>setForm({...form,imageURL:e.target.value})} />
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : "Update"}</button>
          <button type="button" onClick={del} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Delete</button>
        </div>
      </form>
    </div>
  );
}
