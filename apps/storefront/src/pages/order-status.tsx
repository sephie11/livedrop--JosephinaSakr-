import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrderStatus, type OrderStatus } from '../lib/api'

export default function OrderStatus() {
	const { id } = useParams()
	const [status, setStatus] = useState<OrderStatus | null>(null)

	useEffect(() => {
		if (!id) return
		getOrderStatus(id).then(setStatus)
	}, [id])

	if (!id) return <div>Missing order id</div>
	if (!status) return <div>Loading…</div>

	return (
		<div className="space-y-2">
			<h1 className="text-xl font-semibold">
				Order {id.slice(-4).padStart(id.length, '•')}
			</h1>
			<p>
				Status: <span className="font-medium">{status.status}</span>
			</p>
			{status.carrier && <p>Carrier: {status.carrier}</p>}
			{status.eta && <p>ETA: {new Date(status.eta).toLocaleDateString()}</p>}
		</div>
	)
}