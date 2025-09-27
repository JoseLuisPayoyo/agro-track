import { ReactNode } from 'react'

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  )
}

export function Th({ children }: { children: ReactNode }) {
  return <th className="text-left px-4 py-3 bg-gray-50 border-b">{children}</th>
}

export function Td({ children }: { children: ReactNode }) {
  return <td className="px-4 py-2 border-b">{children}</td>
}
