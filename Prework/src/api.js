const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dmnatohfmwpajukiqisu.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbmF0b2hmbXdwYWp1a2lxaXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODAyOTMsImV4cCI6MjA3MTQ1NjI5M30.0G0s6aMDvpu2tM8_e1IX3zokoHu3ZpDHrYssAm2Mlg4'

const BASE = `${SUPABASE_URL}/rest/v1`
const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, { headers: HEADERS, ...opts })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) return res.json()
  return null
}

export async function listCreators() {
  const url = `${BASE}/creators?select=*&order=created_at.desc`
  return fetchJson(url)
}

export async function getCreator(id) {
  const url = `${BASE}/creators?select=*&id=eq.${id}`
  const rows = await fetchJson(url)
  return rows && rows[0] ? rows[0] : null
}

export async function createCreator(payload) {
  const url = `${BASE}/creators`
  const body = JSON.stringify(payload)
  const headers = { ...HEADERS, Prefer: 'return=representation' }
  const res = await fetch(url, { method: 'POST', headers, body })
  if (!res.ok) throw new Error(await res.text())
  const rows = await res.json()
  return rows[0]
}

export async function updateCreator(id, payload) {
  const url = `${BASE}/creators?id=eq.${id}`
  const body = JSON.stringify(payload)
  const headers = { ...HEADERS, Prefer: 'return=representation' }
  const res = await fetch(url, { method: 'PATCH', headers, body })
  if (!res.ok) throw new Error(await res.text())
  const rows = await res.json()
  return rows[0]
}

export async function deleteCreator(id) {
  const url = `${BASE}/creators?id=eq.${id}`
  const res = await fetch(url, { method: 'DELETE', headers: HEADERS })
  if (!res.ok) throw new Error(await res.text())
  return true
}