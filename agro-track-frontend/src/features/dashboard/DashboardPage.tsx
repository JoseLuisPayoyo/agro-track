import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'


const data = [
{ name: 'Activos', value: 32 },
{ name: 'Cuadrillas', value: 6 },
{ name: 'Fincas', value: 9 },
]


export default function DashboardPage() {
return (
<div className="grid gap-4">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{data.map((k) => (
<div key={k.name} className="card">
<div className="card-header">{k.name}</div>
<div className="card-body text-3xl font-semibold">{k.value}</div>
</div>
))}
</div>
<div className="card">
<div className="card-header">Distribución</div>
<div className="card-body h-64">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={data}>
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Bar dataKey="value" />
</BarChart>
</ResponsiveContainer>
</div>
</div>
</div>
)
}