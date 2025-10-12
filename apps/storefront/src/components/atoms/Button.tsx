import { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'


export default function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>){
return <button {...props} className={clsx('px-3 py-2 rounded bg-slate-900 text-white disabled:opacity-50', className)} />
}