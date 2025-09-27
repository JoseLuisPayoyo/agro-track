import React from 'react'

export default function Modal({
  open, title, onClose, children
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button className="text-gray-500" onClick={onClose}>✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
