import create from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartItem = { id: string; title: string; price: number; image: string; qty: number; stockQty?: number }

type State = {
	items: CartItem[]
		add: (product: { id: string; title: string; price: number; image: string; stockQty?: number }, qty?: number) => void
	inc: (id: string) => void
	dec: (id: string) => void
	remove: (id: string) => void
	clear: () => void
	total: () => number
}

export const useCart = create<State>()(
	persist<State>(
		(set, get) => ({
			items: [],
					add: (p, q = 1) =>
						set((s: State) => {
							const i = s.items.find((i) => i.id === p.id)
							const max = p.stockQty ?? i?.stockQty ?? Infinity
							if (i) {
								const newQty = Math.min(i.qty + q, max)
								if (newQty === i.qty) return { items: [...s.items] }
								i.qty = newQty
								return { items: [...s.items] }
							}
							const addQty = Math.min(q, max)
							return { items: [...s.items, { id: p.id, title: p.title, price: p.price, image: p.image, qty: addQty, stockQty: p.stockQty }] }
						}),
					inc: (id) =>
						set((s: State) => ({
							items: s.items.map((i) => {
								if (i.id !== id) return i
								const max = i.stockQty ?? Infinity
								if (i.qty >= max) return i
								return { ...i, qty: i.qty + 1 }
							}),
						})),
			dec: (id) => set((s: State) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)) })),
			remove: (id) => set((s: State) => ({ items: s.items.filter((i) => i.id !== id) })),
			clear: () => set({ items: [] }),
			total: () => get().items.reduce((n, i) => n + i.qty * i.price, 0),
		}),
		{ name: 'sf-cart', storage: createJSONStorage(() => localStorage) }
	)
)