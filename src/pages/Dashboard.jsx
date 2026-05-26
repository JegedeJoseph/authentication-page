import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-sky-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Welcome back, {user?.name || user?.email}</h2>
            <p className="text-sm text-slate-600">This is a protected dashboard (mock).</p>
          </div>
          <div>
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded" aria-label="Sign out">Sign out</button>
          </div>
        </div>
      </div>
    </div>
  )
}
