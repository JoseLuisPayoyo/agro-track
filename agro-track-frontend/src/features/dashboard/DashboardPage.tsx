import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
// const data = [
// { name: 'Activos', value: 32 },
// { name: 'Cuadrillas', value: 6 },
// { name: 'Fincas', value: 9 },
// ]


export default function DashboardPage() {
  const data = [
    { name: "Activos", value: 32 },
    { name: "Cuadrillas", value: 6 },
    { name: "Fincas", value: 9 },
  ]

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {data.map((k) => (
          <div key={k.name} className="card p-5">
            <div className="kpi">
              <span className="kpi-label">{k.name}</span>
              <span className="kpi-value">{k.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card">
        <div className="card-header">Distribución</div>
        <div className="card-body h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
