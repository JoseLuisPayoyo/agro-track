import { cn } from '../utils'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
return (
<input
{...props}
className={cn(
'h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-brand-500',
props.className
)}
/>
)
}