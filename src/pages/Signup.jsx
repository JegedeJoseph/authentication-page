import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    setLoading(true)
    try{
      await auth.signup({ name, email, password })
      navigate('/dashboard')
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-semibold text-slate-700 mb-4">Create account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600">Name</label>
            <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Password</label>
            <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button disabled={loading} className="w-full bg-sky-500 text-white py-2 rounded">{loading? 'Creating...' : 'Create account'}</button>
        </form>
      </div>
    </div>
  )
}
