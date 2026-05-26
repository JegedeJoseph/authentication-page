import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const add = useCallback((type, message, timeout = 4000) => {
    const id = Date.now() + Math.random()
    const t = { id, type, message }
    setToasts(s=>[...s, t])
    if(timeout > 0){
      setTimeout(()=>{
        setToasts(s => s.filter(x=>x.id!==id))
      }, timeout)
    }
  }, [])

  const remove = useCallback((id)=> setToasts(s => s.filter(x=>x.id!==id)), [])

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <div aria-live="polite" className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map(t=> (
          <div key={t.id} className={`max-w-sm w-full px-4 py-2 rounded shadow-md text-white ${t.type==='error'? 'bg-red-600' : 'bg-sky-600'}`} role="status">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(){
  const ctx = useContext(ToastContext)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return {
    success: (msg, t)=>ctx.add('success', msg, t),
    error: (msg, t)=>ctx.add('error', msg, t),
    remove: ctx.remove
  }
}

export default ToastProvider
