import { useEffect, useMemo, useState } from 'react'
import { listProducts } from '../lib/api'
import ProductCard from '../components/atoms/ProductCard'


export default function Catalog() {
const [q, setQ] = useState('')
const [sort, setSort] = useState<'asc'|'desc'|'none'>('none')
const [tag, setTag] = useState('')
const [items, setItems] = useState<any[]>([])


useEffect(() => { listProducts().then(setItems) }, [])


const tags = useMemo(() => Array.from(new Set(items.flatMap(i => i.tags))).sort(), [items])


const filtered = useMemo(() => {
let out = items
if (q) {
const t = q.toLowerCase()
out = out.filter(i => (i.title + ' ' + i.tags.join(' ')).toLowerCase().includes(t))
}
if (tag) out = out.filter(i => i.tags.includes(tag))
if (sort !== 'none') out = [...out].sort((a,b)=> sort==='asc'? a.price-b.price : b.price-a.price)
return out
}, [items,q,sort,tag])


return (
<div className="space-y-4">
<h1 className="text-xl font-semibold">Catalog</h1>
<div className="flex gap-2 items-center">
<input aria-label="Search" className="border px-3 py-2 rounded w-64" placeholder="Search title or tag" value={q} onChange={e=>setQ(e.target.value)} />
<select aria-label="Sort by price" className="border px-3 py-2 rounded" value={sort} onChange={e=>setSort(e.target.value as any)}>
<option value="none">Sort</option>
<option value="asc">Price ↑</option>
<option value="desc">Price ↓</option>
</select>
<select aria-label="Filter by tag" className="border px-3 py-2 rounded" value={tag} onChange={e=>setTag(e.target.value)}>
<option value="">All tags</option>
{tags.map(t=> <option key={t} value={t}>{t}</option>)}
</select>
</div>


<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
{filtered.map(p => <ProductCard key={p.id} product={p} />)}
</div>
</div>
)
}