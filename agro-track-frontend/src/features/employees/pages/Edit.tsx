import { useParams, useNavigate } from 'react-router-dom'
import { useEmployeeQuery, useUpdateEmployee } from '../hooks'
import EmployeeForm from '../components/EmployeeForm'


export default function EmployeeEdit() {
const { id } = useParams()
const intId = Number(id)
const { data } = useEmployeeQuery(intId)
const mutation = useUpdateEmployee(intId)
const nav = useNavigate()


if (!data) return null


return (
<div className="space-y-4">
<h1 className="text-2xl font-semibold">Editar empleado</h1>
<EmployeeForm
defaultValues={data}
crews={[{ id: 1, name: 'Cuadrilla 1' }]} // TODO: cargar via API
farms={[{ id: 1, name: 'Finca A' }]} // TODO: cargar via API
onSubmit={(values) => mutation.mutate(values as any, { onSuccess: () => nav(`/employees/${intId}`) })}
/>
</div>
)
}