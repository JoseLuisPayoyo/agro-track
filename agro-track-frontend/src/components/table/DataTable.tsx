import * as React from 'react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'


export default function DataTable<T>({ columns, data }: { columns: ColumnDef<T, any>[]; data: T[] }) {
const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel() })


return (
<div className="card">
<div className="card-body">
<table className="w-full text-sm">
<thead>
{table.getHeaderGroups().map((hg) => (
<tr key={hg.id} className="text-left text-gray-500">
{hg.headers.map((h) => (
<th key={h.id} className="py-2">
{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
</th>
))}
</tr>
))}
</thead>
<tbody>
{table.getRowModel().rows.map((row) => (
<tr key={row.id} className="border-t border-gray-100">
{row.getVisibleCells().map((cell) => (
<td key={cell.id} className="py-2">
{flexRender(cell.column.columnDef.cell, cell.getContext())}
</td>
))}
</tr>
))}
</tbody>
</table>
<div className="mt-4 flex items-center justify-between text-sm">
<div>
Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
</div>
<div className="flex gap-2">
<button className="px-3 py-1 rounded border" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
Anterior
</button>
<button className="px-3 py-1 rounded border" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
Siguiente
</button>
</div>
</div>
</div>
</div>
)
}