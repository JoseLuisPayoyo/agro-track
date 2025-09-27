// import { useEffect, useState } from 'react'
// import { api } from '../lib/api'

// type Stats = {
//   empleados: number
//   campañas: number
//   fincas: number
//   partes: number
//   cuadrillas: number
// }

// export default function Dashboard() {
//   const [stats, setStats] = useState<Stats>({
//     empleados: 0,
//     campañas: 0,
//     fincas: 0,
//     partes: 0,
//     cuadrillas: 0
//   })

//   useEffect(() => {
//     Promise.all([
//       api.get('/employees'),   // GET lista empleados
//       api.get('/campaigns'),
//       api.get('/farms'),
//       api.get('/work-parts'),
//       api.get('/crews')
//     ]).then(([e,c,f,p,q])=>{
//       setStats({
//         empleados: e.data.length ?? 0,
//         campañas: c.data.length ?? 0,
//         fincas: f.data.length ?? 0,
//         partes: p.data.length ?? 0,
//         cuadrillas: q.data.length ?? 0
//       })
//     }).catch(()=>{
//       setStats({empleados:0,campañas:0,fincas:0,partes:0,cuadrillas:0})
//     })
//   }, [])

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Inicio</h1>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         <Stat title="Empleados" value={stats.empleados} />
//         <Stat title="Campañas" value={stats.campañas} />
//         <Stat title="Fincas" value={stats.fincas} />
//         <Stat title="Partes de trabajo" value={stats.partes} />
//         <Stat title="Cuadrillas" value={stats.cuadrillas} />
//       </div>
//       {/* Aquí podrías meter listados recientes (últimos empleados, partes, etc.) */}
//     </div>
//   )
// }

// function Stat({ title, value }:{title:string; value:number|string}) {
//   return (
//     <div className="rounded-2xl border p-4 bg-white">
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="text-3xl font-semibold mt-1">{value}</div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Users, ClipboardList, Home, FileText, Users2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

type Stats = {
  empleados: number
  campañas: number
  fincas: number
  partes: number
  cuadrillas: number
}

type Employee = {
  id: string
  name: string
  lastname: string
  status: string
  hireDate: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    empleados: 0,
    campañas: 0,
    fincas: 0,
    partes: 0,
    cuadrillas: 0,
  })
  const [employees, setEmployees] = useState<Employee[]>([])
  const [statusData, setStatusData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    Promise.all([
      api.get('/employees'),
      api.get('/campaigns'),
      api.get('/farms'),
      api.get('/work-parts'),
      api.get('/crews'),
    ])
      .then(([e, c, f, p, q]) => {
        setStats({
          empleados: e.data.length ?? 0,
          campañas: c.data.length ?? 0,
          fincas: f.data.length ?? 0,
          partes: p.data.length ?? 0,
          cuadrillas: q.data.length ?? 0,
        })

        // Últimos 5 empleados
        setEmployees(e.data.slice(-5).reverse())

        // Conteo de empleados por estado
        const statusCounts: Record<string, number> = {}
        e.data.forEach((emp: Employee) => {
          statusCounts[emp.status] = (statusCounts[emp.status] || 0) + 1
        })
        setStatusData(
          Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
        )
      })
      .catch(() => {
        setStats({ empleados: 0, campañas: 0, fincas: 0, partes: 0, cuadrillas: 0 })
      })
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Panel de control</h1>

      {/* Tarjetas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Stat title="Empleados" value={stats.empleados} icon={Users} />
        <Stat title="Campañas" value={stats.campañas} icon={ClipboardList} />
        <Stat title="Fincas" value={stats.fincas} icon={Home} />
        <Stat title="Partes de trabajo" value={stats.partes} icon={FileText} />
        <Stat title="Cuadrillas" value={stats.cuadrillas} icon={Users2} />
      </div>

      {/* Gráfico */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm">
        <h2 className="font-semibold mb-4">Distribución de empleados por estado</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#10b981', '#f59e0b', '#ef4444'][index % 3]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla últimos empleados */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm">
        <h2 className="font-semibold mb-4">Últimos empleados contratados</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Nombre</th>
              <th className="py-2">Estado</th>
              <th className="py-2">Fecha contratación</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="py-2">{e.name} {e.lastname}</td>
                <td className="py-2">{e.status}</td>
                <td className="py-2">
                  {new Date(e.hireDate).toLocaleDateString('es-ES')}
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No hay empleados recientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Stat({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: number | string
  icon: React.ElementType
}) {
  return (
    <div className="rounded-2xl border p-4 bg-white flex items-center gap-4 shadow-sm">
      <div className="p-3 rounded-xl bg-brand-100 text-brand-600">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-3xl font-semibold mt-1">{value}</div>
      </div>
    </div>
  )
}
