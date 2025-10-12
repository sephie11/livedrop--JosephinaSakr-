import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { askSupport } from '../../assistant/engine'


export function SupportPanel({ open, onClose }: { open: boolean, onClose: ()=>void }){
const [input, setInput] = useState('')
const [response, setResponse] = useState<string>('')
const ref = useRef<HTMLDivElement>(null)
const previouslyFocused = useRef<HTMLElement | null>(null)


useEffect(()=>{
function onKey(e: KeyboardEvent){ if(e.key==='Escape') onClose() }
window.addEventListener('keydown', onKey); return ()=> window.removeEventListener('keydown', onKey)
},[onClose])


useEffect(()=>{
	if(open){
		previouslyFocused.current = document.activeElement as HTMLElement | null
		setTimeout(()=> ref.current?.querySelector('textarea')?.focus(), 0)
		console.log('[SupportPanel] opened')
	} else {
		previouslyFocused.current?.focus?.()
	}
},[open])


async function onAsk(){
const r = await askSupport(input)
setResponse(r.text)
}
useEffect(()=>{
	if(!open) return
	function onKey(e: KeyboardEvent){
		if(e.key !== 'Tab') return
		const container = ref.current
		if(!container) return
		const focusable = Array.from(container.querySelectorAll<HTMLElement>("a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])"))
			.filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
		if(focusable.length === 0) return
		const first = focusable[0]
		const last = focusable[focusable.length - 1]
		if(e.shiftKey){
			if(document.activeElement === first){
				e.preventDefault(); last.focus()
			}
		} else {
			if(document.activeElement === last){
				e.preventDefault(); first.focus()
			}
		}
	}
	document.addEventListener('keydown', onKey)
	return ()=> document.removeEventListener('keydown', onKey)
},[open])

if(!open) return null

return createPortal(
		<div id="support-overlay" className="fixed inset-0 bg-black/40 z-40" onClick={onClose} aria-modal role="dialog">
			<div id="support-panel" ref={ref} className="fixed right-0 top-0 h-full w-80 bg-white p-4 flex flex-col shadow-lg z-50 border-l-4 border-sky-500 ring-1 ring-sky-200" onClick={e=>e.stopPropagation()}>
			<div className="flex items-center justify-between mb-2">
				<h2 className="font-semibold  text-black">Ask Support</h2>
				<button className="font-semibold  text-black" aria-label="Close" onClick={onClose}>×</button>
			</div>
			<textarea aria-label="Question" className="border rounded p-2 h-32" value={input} onChange={e=>setInput(e.target.value)} />
			<button className="mt-2 px-3 py-2 rounded bg-slate-900 text-white" onClick={onAsk}>Ask</button>
			<div  className="mt-3 border rounded p-2 text-base font-medium text-black bg-slate-50 whitespace-pre-wrap min-h-[6rem]" aria-live="polite">{response}</div>
		</div>
	</div>,
	document.body
)
}