import * as React from 'react'


export function Tabs({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode }[] }) {
const [key, setKey] = React.useState(tabs[0]?.key)
return (
<div>
<div className="mb-3 flex gap-2">
{tabs.map((t) => (
<button key={t.key} onClick={() => setKey(t.key)} className={`rounded-xl px-3 py-1.5 text-sm ${key === t.key ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
{t.label}
</button>
))}
</div>
<div className="card">
<div className="card-body">{tabs.find((t) => t.key === key)?.content}</div>
</div>
</div>
)
}