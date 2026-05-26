import React, { createContext, useContext, useState, useEffect } from 'react'
import * as mockAuth from '../services/mockAuth'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const raw = localStorage.getItem('auth.user')
    if(raw){
      try{ setUser(JSON.parse(raw)) }catch(e){ localStorage.removeItem('auth.user') }
    }
  },[])

  async function login({ email, password }){
    const res = await mockAuth.login({ email, password })
    setUser(res.user)
    localStorage.setItem('auth.user', JSON.stringify(res.user))
    localStorage.setItem('auth.token', res.token)
    return res
  }

  async function signup({ name, email, password }){
    const res = await mockAuth.signup({ name, email, password })
    setUser(res.user)
    localStorage.setItem('auth.user', JSON.stringify(res.user))
    localStorage.setItem('auth.token', res.token)
    return res
  }

  async function resetPassword({ email }){
    const res = await mockAuth.resetPassword({ email })
    return res
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('auth.user')
    localStorage.removeItem('auth.token')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
