import { ReactNode } from "react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  console.log("Dialog render, open:", open)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white border border-black rounded-lg shadow-xl p-6">
        {children}
        <button onClick={() => onOpenChange(false)}>Cerrar</button>
      </div>
    </div>
  )
}

