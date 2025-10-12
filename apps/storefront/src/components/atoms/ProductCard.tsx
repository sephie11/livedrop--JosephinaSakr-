import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../../lib/store'
import { money } from '../../lib/format'


export default function ProductCard({ product }: { product: any }){
	const add = useCart(s=>s.add)
	const items = useCart(s=>s.items)
	const inCartQty = items.find(i => i.id === product.id)?.qty ?? 0
	const max = product.stockQty ?? Infinity
	const disabled = max <= inCartQty || max === 0

	const [remaining, setRemaining] = useState<number>(product.stockQty ?? 0)

	useEffect(() => {
		const newRem = (product.stockQty ?? 0) - inCartQty
		setRemaining(Math.max(0, newRem))
	}, [product.stockQty, inCartQty])
return (
<div className="border rounded p-3 flex flex-col">
<Link to={`/p/${product.id}`} className="block">
{(() => {
	const resolveImage = (p?: string) => {
		if (!p) return '/logo.svg'
		if (/^https?:\/\//.test(p)) return p
		if (p.startsWith('/')) return p
		if (p.startsWith('./')) return p.replace(/^\./, '')
		return `/images/${p}`
	}
		return (
				<div className="w-full h-36 flex items-center justify-center bg-white p-2" style={{ aspectRatio: '4 / 3' }}>
					<img src={resolveImage(product.image)} alt="" className="max-w-full max-h-full object-contain" loading="lazy"/>
				</div>
		)
})()}
<div className="mt-2 font-medium line-clamp-2 min-h-[3rem]">{product.title}</div>
</Link>
<div className="mt-auto flex items-center justify-between">
		<div className="text-sm">{money(product.price)}</div>
		<div className="text-xs text-slate-500">{remaining > 0 ? `${remaining} left` : 'Out of stock'}</div>
		<button
			className={`px-3 py-1 rounded ${disabled ? 'bg-slate-400 text-slate-200 cursor-not-allowed' : 'bg-slate-900 text-white'}`}
			onClick={() => {
				
				if (!disabled) {
					add(product, 1)
					setRemaining((r) => Math.max(0, r - 1))
				}
			}}
			disabled={disabled}
			aria-disabled={disabled}
		>
			{disabled ? (max === 0 ? 'Out of stock' : 'Max reached') : 'Add'}
		</button>
</div>
</div>
)
}