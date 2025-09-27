import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WorkPart, Farm, Parcel, Campaign } from '../../types'
import { api } from '../../lib/api'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<WorkPart> = { date:'', task:'', status:'PENDING', notes:'', fincaId:'', parcelaId:'', campañaId:'', cuadrillaId:'' }

export default function WorkPartsPage() {
  const [data, setData] = useState<WorkPart[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<WorkPart>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})

  const [farms, setFarms] = useState<{value:string,label:string}[]>([])
  const [parcels, setParcels] = useState<{value:string,label:string}[]>([])
  const [campaigns, setCampaigns] = useState<{value:string,label:string}[]>([])
  const [squads, setSquads] = useState<{value:string,label:string}[]>([])

  const load = () => api.get('/workparts').then(r=> setData(r.data))
  useEffect(()=>{
    load()
    api.get('/farms').then(r=> setFarms(r.data.map((f:Farm)=>({value:f.id,label:f.nombre}))))
    api.get('/parcels').then(r=> setParcels(r.data.map((p:Parcel)=>({value:p.id,label:p.nombre}))))
    api.get('/campaigns').then(r=> setCampaigns(r.data.map((c:Campaign)=>({value:c.id,label:c.nombre}))))
    type Squad = { id: string; nombre: string }

    api.get<Squad[]>('/squads').then(r=> 
      setSquads(r.data.map((q)=>({value:q.id,label:q.nombre})))
    )

      .catch(()=> setSquads([]))
  }, [])

  const onSubmit = async () => {
    try {
      if (model.id) { await api.put(`/workparts/${model.id}`, model); toast.success('Parte actualizado') }
      else { await api.post('/workparts', model); toast.success('Parte creado') }
      setOpen(false); setModel(empty); load()
    } catch { toast.error('Error al guardar') }
  }
  const onDelete = async () => {
    try { await api.delete(`/workparts/${confirm.id}`); toast.success('Parte eliminado'); setConfirm({open:false}); load() }
    catch { toast.error('No se pudo eliminar') }
  }

  const fmt = (d?:string) => d ? new Date(d).toLocaleDateString() : '—'

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Partes de trabajo</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{setModel(empty); setOpen(true)}}>Crear parte</button>
      </header>

      <Table>
        <thead>
          <tr>
            <Th>Fecha</Th><Th>Tarea</Th><Th>Estado</Th><Th>Notas</Th>
            <Th>Finca</Th><Th>Parcela</Th><Th>Campaña</Th><Th>Cuadrilla</Th><Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(w=>(
            <tr key={w.id}>
              <Td>{fmt(w.date)}</Td>
              <Td>{w.task}</Td>
              <Td>{w.status}</Td>
              <Td>{w.notes ?? '—'}</Td>
              <Td>{w.fincaNombre ?? '—'}</Td>
              <Td>{w.parcelaNombre ?? '—'}</Td>
              <Td>{w.campañaNombre ?? '—'}</Td>
              <Td>{w.cuadrillaNombre ?? '—'}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded" onClick={()=>{setModel(w); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700" onClick={()=>setConfirm({open:true, id:w.id})}>Eliminar</button>
                  <Link className="px-2 py-1 text-sm border rounded" to={`/partes/${w.id}/trabajadores`}>Ver partes</Link>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar parte' : 'Crear parte'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Fecha"><input type="date" className="border rounded px-3 py-2" value={model.date?.slice(0,10)||''} onChange={e=>setModel({...model, date:e.target.value})}/></Row>
          <Row label="Tarea"><input className="border rounded px-3 py-2" value={model.task||''} onChange={e=>setModel({...model, task:e.target.value})}/></Row>
          <Row label="Estado">
            <select className="border rounded px-3 py-2" value={model.status||'PENDING'} onChange={e=>setModel({...model, status:e.target.value as WorkPart['status']})}>
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </Row>
          <Row label="Notas"><textarea className="border rounded px-3 py-2" value={model.notes||''} onChange={e=>setModel({...model, notes:e.target.value})}/></Row>
          <div className="grid sm:grid-cols-2 gap-3">
            <Row label="Finca">
              <select className="border rounded px-3 py-2" value={model.fincaId||''} onChange={e=>setModel({...model, fincaId:e.target.value})}>
                <option value="">—</option>
                {farms.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </Row>
            <Row label="Parcela">
              <select className="border rounded px-3 py-2" value={model.parcelaId||''} onChange={e=>setModel({...model, parcelaId:e.target.value})}>
                <option value="">—</option>
                {parcels.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </Row>
            <Row label="Campaña">
              <select className="border rounded px-3 py-2" value={model.campañaId||''} onChange={e=>setModel({...model, campañaId:e.target.value})}>
                <option value="">—</option>
                {campaigns.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Row>
            <Row label="Cuadrilla">
              <select className="border rounded px-3 py-2" value={model.cuadrillaId||''} onChange={e=>setModel({...model, cuadrillaId:e.target.value})}>
                <option value="">—</option>
                {squads.map(q=><option key={q.value} value={q.value}>{q.label}</option>)}
              </select>
            </Row>
          </div>
          <div className="flex justify-end"><button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button></div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar parte" message="Esta acción no se puede deshacer." />
    </div>
  )
}

function Row({label, children}:{label:string; children:React.ReactNode}) {
  return <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center"><span className="text-sm text-gray-600">{label}</span>{children}</label>
}
