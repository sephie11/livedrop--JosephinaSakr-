import { useCart, CartItem } from '../../lib/store'
import { money } from '../../lib/format'


export default function CartLineItem({ item }: { item: CartItem }){
const inc = useCart(s=>s.inc)
const dec = useCart(s=>s.dec)
const remove = useCart(s=>s.remove)
return (
<div className="border rounded p-3 flex items-center gap-3">
{(() => {
	const resolveImage = (p?: string) => {
		if (!p) return '/logo.svg'
		if (/^https?:\/\//.test(p)) return p
		if (p.startsWith('/')) return p
		if (p.startsWith('./')) return p.replace(/^\./, '')
		return `/images/${p}`
	}
		return (
				<div className="w-16 h-16 flex items-center justify-center bg-white p-1" style={{ aspectRatio: '1 / 1' }}>
					<img src={resolveImage(item.image)} alt="" className="max-w-full max-h-full object-contain"/>
				</div>
		)
})()}
<div className="flex-1">
<div className="font-medium">{item.title}</div>
<div className="text-sm text-slate-600">{money(item.price)} each</div>
</div>
<div className="flex items-center gap-2">
<button aria-label="Decrease" className="px-2 py-1 border rounded" onClick={()=>dec(item.id)}>-</button>
<span aria-live="polite">{item.qty}</span>
<button aria-label="Increase" className="px-2 py-1 border rounded" onClick={()=>inc(item.id)}>+</button>
</div>
<div className="w-20 text-right font-medium">{money(item.price*item.qty)}</div>
<button aria-label="Remove" className="px-2 py-1 border rounded" onClick={()=>remove(item.id)}>×</button>
</div>
)
}