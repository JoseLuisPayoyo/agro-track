import { useEffect, useState } from 'react'
import { Campaign, Farm } from '../../types'
import { api } from '../../lib/api'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<Campaign> = { nombre:'', fechaInicio:'', fechaFin:'', tareaPrincipal:'', fincaId:'', cuadrillaId:'' }

export default function CampaignsPage() {
  const [data, setData] = useState<Campaign[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Campaign>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})
  const [farms, setFarms] = useState<{value:string,label:string}[]>([])
  const [squads, setSquads] = useState<{value:string,label:string}[]>([])

  const load = () => api.get('/campaigns').then(r=> setData(r.data))
  useEffect(()=>{
    load()
    api.get('/farms').then(r=> setFarms(r.data.map((f:Farm)=>({value:f.id,label:f.nombre}))))
    // Si tienes endpoint de cuadrillas, cámbialo por el real:
    type Squad = { id: string; nombre: string }

    api.get<Squad[]>('/squads').then(r=> 
      setSquads(r.data.map((q)=>({value:q.id,label:q.nombre})))
    )

      .catch(()=> setSquads([]))
  }, [])

  const onSubmit = async () => {
    try {
      if (model.id) {
        await api.put(`/campaigns/${model.id}`, model)
        toast.success('Campaña actualizada')
      } else {
        await api.post('/campaigns', model)
        toast.success('Campaña creada')
      }
      setOpen(false); setModel(empty); load()
    } catch { toast.error('Error al guardar') }
  }

  const onDelete = async () => {
    try {
      await api.delete(`/campaigns/${confirm.id}`)
      toast.success('Campaña eliminada')
      setConfirm({open:false}); load()
    } catch { toast.error('No se pudo eliminar') }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campañas</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{setModel(empty); setOpen(true)}}>Crear campaña</button>
      </header>

      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th><Th>Inicio</Th><Th>Fin</Th><Th>Tarea principal</Th><Th>Finca</Th><Th>Cuadrilla</Th><Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(c=>(
            <tr key={c.id}>
              <Td>{c.nombre}</Td>
              <Td>{new Date(c.fechaInicio).toLocaleDateString()}</Td>
              <Td>{new Date(c.fechaFin).toLocaleDateString()}</Td>
              <Td>{c.tareaPrincipal}</Td>
              <Td>{c.fincaNombre}</Td>
              <Td>{c.cuadrillaNombre}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded" onClick={()=>{setModel(c); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700" onClick={()=>setConfirm({open:true, id:c.id})}>Eliminar</button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar campaña' : 'Crear campaña'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Nombre"><input className="border rounded px-3 py-2" value={model.nombre||''} onChange={e=>setModel({...model, nombre:e.target.value})}/></Row>
          <Row label="Fecha inicio"><input type="date" className="border rounded px-3 py-2" value={model.fechaInicio?.slice(0,10)||''} onChange={e=>setModel({...model, fechaInicio:e.target.value})}/></Row>
          <Row label="Fecha fin"><input type="date" className="border rounded px-3 py-2" value={model.fechaFin?.slice(0,10)||''} onChange={e=>setModel({...model, fechaFin:e.target.value})}/></Row>
          <Row label="Tarea principal"><input className="border rounded px-3 py-2" value={model.tareaPrincipal||''} onChange={e=>setModel({...model, tareaPrincipal:e.target.value})}/></Row>
          <Row label="Finca">
            <select className="border rounded px-3 py-2" value={model.fincaId||''} onChange={e=>setModel({...model, fincaId:e.target.value})}>
              <option value="">Selecciona</option>
              {farms.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </Row>
          <Row label="Cuadrilla">
            <select className="border rounded px-3 py-2" value={model.cuadrillaId||''} onChange={e=>setModel({...model, cuadrillaId:e.target.value})}>
              <option value="">Selecciona</option>
              {squads.map(q=><option key={q.value} value={q.value}>{q.label}</option>)}
            </select>
          </Row>
          <div className="flex justify-end">
            <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar campaña" message="Esta acción no se puede deshacer." />
    </div>
  )
}

function Row({label, children}:{label:string; children:React.ReactNode}) {
  return <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center">{}<span className="text-sm text-gray-600">{label}</span>{children}</label>
}
