import { useParams, Link } from 'react-router-dom'
import { api } from "../lib/api";
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../lib/store'


export default function Product() {
const { id } = useParams()
const [p, setP] = useState<any | null>(null)
const [all, setAll] = useState<any[]>([])
const add = useCart(s=>s.add)
const items = useCart(s=>s.items)
const inCartQty = items.find(i => i.id === id)?.qty ?? 0
const max = p?.stockQty ?? Infinity
const disabled = p ? (max <= inCartQty || max === 0) : true

const [remaining, setRemaining] = useState<number>(p?.stockQty ?? 0)

useEffect(() => {
	setRemaining(p ? Math.max(0, (p.stockQty ?? 0) - inCartQty) : 0)
}, [p, inCartQty])


useEffect(() => {
  if (id) api.getProduct(id).then(setP);
api.listProducts().then((data) => setAll(data as any[]));

}, [id]);



const related = useMemo(()=>{
if(!p) return []
const share = new Set(p.tags)
return all.filter(i=> i.id!==p.id && i.tags.some((t:string)=> share.has(t))).slice(0,3)
},[p,all])


if(!p) return <div>Loading…</div>


return (
<div className="space-y-4">
<Link to="/" className="underline">← Back</Link>
<div className="flex gap-6">
{(() => {
	const resolveImage = (p?: string) => {
		if (!p) return '/logo.svg'
		if (/^https?:\/\//.test(p)) return p
		if (p.startsWith('/')) return p
		if (p.startsWith('./')) return p.replace(/^\./, '')
		return `/images/${p}`
	}
		return (
				<div className="w-56 h-56 flex items-center justify-center border rounded bg-white p-2" style={{ aspectRatio: '1 / 1' }}>
					<img src={resolveImage(p.image)} alt="" className="max-w-full max-h-full object-contain" loading="lazy" />
				</div>
		)
})()}
<div className="space-y-2">
<h1 className="text-2xl font-semibold">{p.title}</h1>
<p className="text-slate-600">{p.description ?? 'Great choice for everyday use.'}</p>
<p className="text-lg font-medium">${p.price.toFixed(2)}</p>
		<p className={remaining>0? 'text-green-600':'text-red-600'}>
			{remaining>0? `In stock: ${remaining}` : 'Out of stock'}
		</p>
		<button
			className={`px-4 py-2 rounded ${disabled ? 'bg-slate-400 text-slate-200 cursor-not-allowed' : 'bg-slate-900 text-white'}`}
			onClick={()=>{
				if(!disabled){ add(p,1); setRemaining(r=> Math.max(0, r-1)) }
			}}
			disabled={disabled}
			aria-disabled={disabled}
		>
			{disabled ? (p && p.stockQty === 0 ? 'Out of stock' : 'Max in cart') : 'Add to Cart'}
		</button>
</div>
</div>


{related.length>0 && (
<div>
<h2 className="font-semibold mb-2">Related</h2>
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
{related.map(r=> (
<Link key={r.id} to={`/p/${r.id}`} className="border rounded p-3 block">
{(() => {
	const resolveImage = (p?: string) => {
		if (!p) return '/logo.svg'
		if (/^https?:\/\//.test(p)) return p
		if (p.startsWith('/')) return p
		if (p.startsWith('./')) return p.replace(/^\./, '')
		return `/images/${p}`
	}
		return (
				<div className="w-full h-32 flex items-center justify-center bg-white p-2" style={{ aspectRatio: '4 / 3' }}>
					<img src={resolveImage(r.image)} alt="" className="max-w-full max-h-full object-contain" loading="lazy"/>
				</div>
		)
})()}
<div className="mt-2 text-sm">{r.title}</div>
</Link>
))}
</div>
</div>
)}
</div>
)
}