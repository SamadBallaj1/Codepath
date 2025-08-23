import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", url: "", description: "", imageURL: "" });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.url || !form.description) return;
    setSaving(true);
    const { data, error } = await supabase.from("creators").insert([form]).select().single();
    setSaving(false);
    if (!error && data) navigate(`/creators/${data.id}`);
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold">Add Creator</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input className="w-full rounded-lg border px-3 py-2" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">URL</label>
          <input className="w-full rounded-lg border px-3 py-2" value={form.url} onChange={(e)=>setForm({...form,url:e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea className="w-full rounded-lg border px-3 py-2" rows="4" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input className="w-full rounded-lg border px-3 py-2" value={form.imageURL} onChange={(e)=>setForm({...form,imageURL:e.target.value})} placeholder="/assets/creator-1.jpg" />
        </div>
        <button type="submit" disabled={saving} className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60">
          {saving ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}
