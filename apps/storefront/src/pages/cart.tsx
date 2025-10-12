import { Link } from 'react-router-dom'
import { useCart } from '../lib/store'
import { money } from '../lib/format'
import CartLineItem from '../components/molecules/CartLineItem'


export default function Cart(){
const items = useCart(s=>s.items)
const total = useCart(s=>s.total())


return (
<div className="space-y-4">
<h1 className="text-xl font-semibold">Cart</h1>
<div className="space-y-3">
{items.length===0 && <p>Your cart is empty.</p>}
{items.map(i=> <CartLineItem key={i.id} item={i} />)}
</div>
<div className="flex items-center justify-between border-t pt-4">
<div className="font-medium">Total: {money(total)}</div>
<Link to="/checkout" className="px-4 py-2 rounded bg-slate-900 text-white">Checkout</Link>
</div>
</div>
)
}