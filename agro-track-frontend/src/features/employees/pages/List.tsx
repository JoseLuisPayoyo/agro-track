import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import EmptyState from '@/components/feedback/EmptyState'
import Loader from '@/components/feedback/Loader'
import ErrorState from '@/components/feedback/ErrorState'
import EmployeeTable from '../components/EmployeeTable'
import { useEmployeesQuery } from '../hooks'


export default function EmployeesList() {
const [q, setQ] = useState('')
const [status, setStatus] = useState<string | undefined>(undefined)
const { data, isLoading, isError } = useEmployeesQuery({ page: 0, size: 20, q, status })


return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h1 className="text-2xl font-semibold">Empleados</h1>
<Button>+ Crear</Button>
</div>
<div className="flex flex-wrap gap-2">
<div className="w-64"><Input placeholder="Buscar por nombre/DNI" value={q} onChange={(e) => setQ(e.target.value)} /></div>
<div className="w-48">
<Select value={status} onChange={(e) => setStatus(e.target.value || undefined)}>
<option value="">Todos</option>
<option value="ACTIVE">Activos</option>
<option value="INACTIVE">Inactivos</option>
</Select>
</div>
<Button variant="outline" onClick={() => { /* aquí puedes sincronizar URL, debounce, etc. */ }}>Buscar</Button>
</div>


{isLoading && <Loader />}
{isError && <ErrorState />}


{data && data.content.length > 0 ? (
<EmployeeTable rows={data.content} />
) : (
<EmptyState title="No hay empleados" action={<Button>Crear empleado</Button>} />)
}
</div>
)
}