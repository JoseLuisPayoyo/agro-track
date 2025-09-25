import { useParams } from 'react-router-dom'
import Loader from '@/components/feedback/Loader'
import ErrorState from '@/components/feedback/ErrorState'
import { Tabs } from '@/components/ui/Tabs'
import { useEmployeeQuery } from '../hooks'


export default function EmployeeDetail() {
const { id } = useParams()
const intId = Number(id)
const { data, isLoading, isError } = useEmployeeQuery(intId)


if (isLoading) return <Loader />
if (isError || !data) return <ErrorState />


return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h1 className="text-2xl font-semibold">{data.name} {data.lastName}</h1>
</div>


<Tabs
tabs={[
{ key: 'info', label: 'Info', content: <InfoTab data={data} /> },
{ key: 'certs', label: 'Certificaciones', content: <div>Tabla de certificaciones…</div> },
{ key: 'entries', label: 'Entradas', content: <div>Entradas del empleado…</div> },
]}
/>
</div>
)
}


function InfoTab({ data }: any) {
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
<div className="card"><div className="card-header">Datos personales</div><div className="card-body">DNI: {data.dni}</div></div>
<div className="card"><div className="card-header">Datos laborales</div><div className="card-body">Estado: {data.status}</div></div>
</div>
)
}