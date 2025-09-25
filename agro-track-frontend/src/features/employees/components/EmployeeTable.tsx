import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/table/DataTable'
import type { EmployeeDTO } from '../types'
import { Link } from 'react-router-dom'


export default function EmployeeTable({ rows }: { rows: EmployeeDTO[] }) {
const columns: ColumnDef<EmployeeDTO>[] = [
{ accessorKey: 'name', header: 'Nombre', cell: (info) => info.row.original.name },
{ accessorKey: 'lastName', header: 'Apellidos' },
{ accessorKey: 'dni', header: 'DNI' },
{ accessorKey: 'crewId', header: 'Cuadrilla' },
{ accessorKey: 'status', header: 'Estado' },
{
id: 'actions',
header: 'Acciones',
cell: ({ row }) => (
<div className="flex gap-2">
<Link className="text-brand-700" to={`/employees/${row.original.id}`}>Ver</Link>
<Link className="text-gray-700" to={`/employees/${row.original.id}/edit`}>Editar</Link>
</div>
),
},
]


return <DataTable columns={columns} data={rows} />
}