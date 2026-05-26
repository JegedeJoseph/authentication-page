import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function ResetPassword(){
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const toast = useToast()

  const [formError, setFormError] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    setMessage(null)
    setFormError(null)
    setLoading(true)
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      setFormError('Please enter a valid email address')
      setLoading(false)
      return
    }
    try{
      await auth.resetPassword({ email })
      setMessage('If that account exists, a reset email was sent (mock).')
      toast.success('If that account exists, a reset email was sent')
    }catch(err){ setError(err.message) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-semibold text-slate-700 mb-4">Reset password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          {formError && <div role="alert" className="text-sm text-red-600">{formError}</div>}
          {error && <div role="alert" className="text-sm text-red-600">{error}</div>}
          {message && <div role="status" aria-live="polite" className="text-sm text-green-600">{message}</div>}
          <button disabled={loading} className="w-full bg-sky-500 text-white py-2 rounded flex items-center justify-center">
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
            ) : null}
            {loading? 'Sending...' : 'Send reset'}
          </button>
        </form>
      </div>
    </div>
  )
}
