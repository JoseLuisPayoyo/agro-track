export default function EmptyState({ title = 'Sin datos', action }: { title?: string; action?: React.ReactNode }) {
return (
<div className="grid place-items-center gap-2 py-16 text-center text-gray-500">
<div>🌱</div>
<div className="font-medium">{title}</div>
{action}
</div>
)
}