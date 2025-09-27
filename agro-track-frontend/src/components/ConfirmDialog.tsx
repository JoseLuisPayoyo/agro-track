import React from 'react'

type Props = {
  open: boolean
  title?: string
  message?: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDialog({ open, title = 'Confirmar', message = '¿Seguro?', onCancel, onConfirm }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-[320px] shadow-xl">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 rounded-lg border" onClick={onCancel}>Cancelar</button>
          <button className="px-3 py-2 rounded-lg bg-red-600 text-white" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}
