import { useEffect, useState } from 'react'
import { api } from '../lib/api'

type Stats = {
  empleados: number
  campañas: number
  fincas: number
  partes: number
  cuadrillas: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    empleados: 0,
    campañas: 0,
    fincas: 0,
    partes: 0,
    cuadrillas: 0
  })

  useEffect(() => {
    Promise.all([
      api.get('/employees'),   // GET lista empleados
      api.get('/campaigns'),
      api.get('/farms'),
      api.get('/work-parts'),
      api.get('/crews')
    ]).then(([e,c,f,p,q])=>{
      setStats({
        empleados: e.data.length ?? 0,
        campañas: c.data.length ?? 0,
        fincas: f.data.length ?? 0,
        partes: p.data.length ?? 0,
        cuadrillas: q.data.length ?? 0
      })
    }).catch(()=>{
      setStats({empleados:0,campañas:0,fincas:0,partes:0,cuadrillas:0})
    })
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inicio</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Stat title="Empleados" value={stats.empleados} />
        <Stat title="Campañas" value={stats.campañas} />
        <Stat title="Fincas" value={stats.fincas} />
        <Stat title="Partes de trabajo" value={stats.partes} />
        <Stat title="Cuadrillas" value={stats.cuadrillas} />
      </div>
      {/* Aquí podrías meter listados recientes (últimos empleados, partes, etc.) */}
    </div>
  )
}

function Stat({ title, value }:{title:string; value:number|string}) {
  return (
    <div className="rounded-2xl border p-4 bg-white">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  )
}
