const BASE = import.meta.env.VITE_API_BASE || 'https://mock-render-backend.render.com'

async function request(path, opts = {}){
  const url = `${BASE}${path}`
  const headers = { 'Content-Type': 'application/json', ...(opts.headers||{}) }
  const res = await fetch(url, { ...opts, headers, credentials: 'include' })
  const text = await res.text()
  let json = null
  try{ if(text) json = JSON.parse(text) }catch(e){ }
  if(!res.ok){
    const message = json?.detail || json?.message || text || res.statusText
    const err = new Error(message)
    err.status = res.status
    throw err
  }
  return json
}

export async function signup({ name, email, password }){
  return request('/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) })
}

export async function login({ email, password }){
  return request('/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export async function forgotPassword({ email }){
  return request('/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
}

export async function resetPassword({ password, access_token }){
  const headers = access_token ? { Authorization: `Bearer ${access_token}` } : undefined
  return request('/reset-password', { method: 'POST', headers, body: JSON.stringify({ password }) })
}

export default { signup, login, forgotPassword, resetPassword }
