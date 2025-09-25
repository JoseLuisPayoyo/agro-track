import * as React from 'react'


export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
if (!open) return null
return (
<div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
<div className="w-full max-w-lg rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
{title && <div className="card-header">{title}</div>}
<div className="card-body">{children}</div>
</div>
</div>
)
}