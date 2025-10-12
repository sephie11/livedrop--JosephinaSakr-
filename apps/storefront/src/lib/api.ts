export type Product = { id: string; title: string; price: number; image: string; tags: string[]; stockQty: number; description?: string }


export async function listProducts(): Promise<Product[]> {
const res = await fetch('/mock-catalog.json')
const data = await res.json()
return data
}


export async function getProduct(id: string): Promise<Product | null> {
const all = await listProducts()
return all.find(p => p.id === id) ?? null
}


const STATUS = ['Placed','Packed','Shipped','Delivered'] as const
export type OrderStatus = { status: typeof STATUS[number]; carrier?: string; eta?: string }


export async function getOrderStatus(id: string): Promise<OrderStatus> {
const idx = id.split('').reduce((a,c)=> a + c.charCodeAt(0), 0) % STATUS.length
const status = STATUS[idx]
const base: OrderStatus = { status }
if(status === 'Shipped' || status === 'Delivered') {
base.carrier = ['DHL','UPS','FedEx'][idx % 3]
const days = status === 'Shipped' ? 5 : 0
base.eta = new Date(Date.now() + days*24*3600*1000).toISOString()
}
return new Promise(r=> setTimeout(()=> r(base), 200))
}


export async function placeOrder(cart: any[]): Promise<{ orderId: string }>{
	const rand = Math.random().toString(36).slice(2).toUpperCase().replace(/[^A-Z0-9]/g,'')
	const orderId = (rand + 'XXXXXXXXXXXX').slice(0, 12)
	const total = cart.reduce((s:any, i:any) => s + (i.qty ?? 0) * (i.product?.price ?? i.price ?? 0), 0)
	const order = {
		orderId,
		createdAt: new Date().toISOString(),
		items: cart,
		total,
	}

	// persist locally
	const key = 'sf-orders'
	try {
		const prev = JSON.parse(localStorage.getItem(key) || '[]')
		prev.unshift(order)
		localStorage.setItem(key, JSON.stringify(prev))
	} catch (e) {
		// ignore
	}

	return new Promise((r) => setTimeout(() => r({ orderId }), 300))
}