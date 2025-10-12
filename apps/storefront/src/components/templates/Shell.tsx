import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { SupportPanel } from '../organisms/SupportPanel'
import { useCart } from '../../lib/store'


export function Shell({ children }: { children: ReactNode }) {
const [open, setOpen] = useState(false)
const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))


return (
<div className="min-h-screen flex flex-col">
<header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
<div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
<Link to="/" className="font-semibold">Storefront</Link>
<nav className={("ml-auto flex items-center gap-4 ") + (open ? 'pointer-events-none opacity-60' : '')}>
<Link to="/">Catalog</Link>
<Link to="/cart">Cart ({cartCount})</Link>
<button type="button" aria-label="Ask support" className="px-3 py-1 rounded bg-slate-900 text-white" onPointerDown={(e) => { e.preventDefault(); e.stopPropagation() }} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log('[Shell] Ask Support clicked'); setOpen(true) }}>Ask Support</button>
</nav>
</div>
</header>
<main className="mx-auto max-w-6xl w-full px-4 py-6 flex-1">{children}</main>
<SupportPanel open={open} onClose={() => setOpen(false)} />
</div>
)
}