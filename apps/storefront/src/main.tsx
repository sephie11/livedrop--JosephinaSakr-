import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import './index.css'
import { useEffect } from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* dev-only click logger to help debug unexpected navigation */}
      {process.env.NODE_ENV !== 'production' && (
        <DebugClickLogger />
      )}
    </BrowserRouter>
  </React.StrictMode>
)

function DebugClickLogger(){
  useEffect(()=>{
    function onClick(e: MouseEvent){
      console.log('[DebugClick] target=', (e.target as HTMLElement)?.outerHTML?.slice?.(0,200))
    }
    document.addEventListener('click', onClick)
    return ()=> document.removeEventListener('click', onClick)
  },[])
  return null
}
