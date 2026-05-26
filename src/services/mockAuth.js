// Simple in-memory mock auth service to be replaced by real API
const users = []

function wait(ms=500){ return new Promise(r=>setTimeout(r, ms)) }

export async function signup({ name, email, password }){
  await wait(600)
  const exists = users.find(u=>u.email===email)
  if(exists) throw new Error('Email already registered')
  const user = { id: Date.now(), name, email }
  users.push({ ...user, password })
  return { user, token: `mock-token-${user.id}` }
}

export async function login({ email, password }){
  await wait(500)
  const found = users.find(u=>u.email===email && u.password===password)
  if(!found) throw new Error('Invalid credentials')
  const { password:pw, ...user } = found
  return { user, token: `mock-token-${user.id}` }
}

export async function resetPassword({ email }){
  await wait(400)
  const found = users.find(u=>u.email===email)
  if(!found) throw new Error('No account with that email')
  // In real flow send email; here, just return success
  return { ok: true }
}
