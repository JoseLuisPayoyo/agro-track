import { cn } from '../utils'
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
return (
<select
{...props}
className={cn('h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-brand-500', props.className)}
/>
)
}