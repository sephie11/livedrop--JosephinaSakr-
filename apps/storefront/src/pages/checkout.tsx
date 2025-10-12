import { useCart } from '../lib/store'
import { money } from '../lib/format'
import { placeOrder } from '../lib/api'
import { useNavigate } from 'react-router-dom'


export default function Checkout(){
const items = useCart(s=>s.items)
const total = useCart(s=>s.total())
const clear = useCart(s=>s.clear)
const nav = useNavigate()


async function onPlace(){
const { orderId } = await placeOrder(items)
clear()
nav(`/order/${orderId}`)
}


return (
<div className="space-y-4">
<h1 className="text-xl font-semibold">Checkout (stub)</h1>
<ul className="space-y-1 text-sm">
{items.map(i=> <li key={i.id}>{i.qty}× {i.title} — {money(i.price*i.qty)}</li>)}
</ul>
<div className="font-medium">Total: {money(total)}</div>
<button className="px-4 py-2 rounded bg-slate-900 text-white" onClick={onPlace}>Place order</button>
</div>
)
}