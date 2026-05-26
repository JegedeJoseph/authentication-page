import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [remember, setRemember] = useState(false)
  const [formError, setFormError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    setFormError(null)
    setLoading(true)
    // client-side validation
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      setFormError('Please enter a valid email address')
      setLoading(false)
      return
    }
    if(password.length < 6){
      setFormError('Password must be at least 6 characters')
      setLoading(false)
      return
    }
    try{
      await auth.login({ email, password })
      if(remember){ localStorage.setItem('auth.remember', '1') }
      navigate('/dashboard')
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-semibold text-slate-700 mb-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4" aria-describedby={formError? 'form-error' : undefined}>
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input id="login-email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" aria-required="true" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Password</label>
            <div className="relative mt-1">
              <input id="login-password" required type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded px-3 py-2 pr-10" aria-required="true" />
              <button type="button" onClick={()=>setShowPassword(s=>!s)} aria-pressed={showPassword} aria-label={showPassword? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-.653.11-1.28.316-1.87M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {formError && <div id="form-error" role="alert" className="text-sm text-red-600">{formError}</div>}
          {error && <div role="alert" className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center space-x-2">
            <input id="remember" type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="h-4 w-4" />
            <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
          </div>
          <button disabled={loading} className="w-full bg-brand-500 text-white py-2 rounded">{loading? 'Signing...' : 'Sign in'}</button>
        </form>
        <div className="mt-4 text-sm text-slate-600">
          <Link to="/reset" className="text-sky-600">Forgot password?</Link>
        </div>
        <div className="mt-4 text-sm text-slate-600">Don't have an account? <Link to="/signup" className="text-sky-600">Create one</Link></div>
      </div>
    </div>
  )
}
