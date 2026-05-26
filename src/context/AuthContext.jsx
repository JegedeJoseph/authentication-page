import React, { createContext, useContext, useState, useEffect } from 'react'
import * as api from '../services/api'

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
    const res = await api.login({ email, password })
    // res: { access_token, refresh_token, user }
    if(res?.user){
      setUser(res.user)
      localStorage.setItem('auth.user', JSON.stringify(res.user))
    }
    if(res?.access_token) localStorage.setItem('auth.token', res.access_token)
    return res
  }

  async function signup({ name, email, password }){
    const res = await api.signup({ name, email, password })
    // backend may not return a token until email verified; set user if provided
    if(res?.user){
      setUser(res.user)
      localStorage.setItem('auth.user', JSON.stringify(res.user))
    }
    return res
  }

  async function resetPassword({ email }){
    const res = await api.forgotPassword({ email })
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
