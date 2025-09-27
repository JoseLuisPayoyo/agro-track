import { useEffect, useState } from 'react'
import { WorkPart, WorkPartStatus } from '../../types'
import { workPartsService } from '../../services/workPartsService'
import { farmsService } from '../../services/farmsService'
import { parcelsService } from '../../services/parcelsService'
import { campaignsService } from '../../services/campaignsService'
import { crewsService } from '../../services/crewsService'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const empty: Partial<WorkPart> = {
  date: '',
  task: '',
  status: 'OPEN',
  notes: '',
  farmId: '',
  parcelId: '',
  campaignId: '',
  crewId: ''
}

export default function WorkPartsPage() {
  const [data, setData] = useState<WorkPart[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<WorkPart>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})

  const [farms, setFarms] = useState<{value:string,label:string}[]>([])
  const [parcels, setParcels] = useState<{value:string,label:string}[]>([])
  const [campaigns, setCampaigns] = useState<{value:string,label:string}[]>([])
  const [crews, setCrews] = useState<{value:string,label:string}[]>([])

  const load = () => workPartsService.getAll().then(setData)

  useEffect(()=>{
    load()
    farmsService.getAll().then(r=> setFarms(r.map(f=>({value:f.id,label:f.name}))))
    parcelsService.getAll().then(r=> setParcels(r.map(p=>({value:p.id,label:p.name}))))
    campaignsService.getAll().then(r=> setCampaigns(r.map(c=>({value:c.id,label:c.name}))))
    crewsService.getAll().then(r=> setCrews(r.map(c=>({value:c.id,label:c.foremanName}))))
  }, [])

  const onSubmit = async () => {
    try {
      if (model.id) {
        await workPartsService.update(model.id, model)
        toast.success('Parte de trabajo actualizado')
      } else {
        await workPartsService.create(model)
        toast.success('Parte de trabajo creado')
      }
      setOpen(false); setModel(empty); load()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const onDelete = async () => {
    try {
      if (confirm.id) await workPartsService.remove(confirm.id)
      toast.success('Parte de trabajo eliminado')
      setConfirm({open:false}); load()
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  const fmt = (d?:string) => d ? new Date(d).toLocaleDateString() : '—'

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Partes de trabajo</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg"
          onClick={()=>{setModel(empty); setOpen(true)}}>Crear parte</button>
      </header>

      <Table>
        <thead>
          <tr>
            <Th>Fecha</Th><Th>Tarea</Th><Th>Estado</Th><Th>Notas</Th>
            <Th>Finca</Th><Th>Parcela</Th><Th>Campaña</Th><Th>Cuadrilla</Th><Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(p=>(
            <tr key={p.id}>
              <Td>{fmt(p.date)}</Td>
              <Td>{p.task}</Td>
              <Td>{p.status}</Td>
              <Td>{p.notes}</Td>
              <Td>{p.farmName}</Td>
              <Td>{p.parcelName ?? '—'}</Td>
              <Td>{p.campaignName}</Td>
              <Td>{p.crewName}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded"
                    onClick={()=>{setModel(p); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700"
                    onClick={()=>setConfirm({open:true, id:p.id})}>Eliminar</button>
                  <Link className="px-2 py-1 text-sm border rounded"
                    to={`/partes/${p.id}/entradas`}>Ver trabajadores</Link>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar parte' : 'Crear parte'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Fecha">
            <input type="date" className="border rounded px-3 py-2"
              value={model.date?.slice(0,10)||''}
              onChange={e=>setModel({...model, date:e.target.value})}/>
          </Row>
          <Row label="Tarea">
            <input className="border rounded px-3 py-2"
              value={model.task||''}
              onChange={e=>setModel({...model, task:e.target.value})}/>
          </Row>
          <Row label="Estado">
            <select className="border rounded px-3 py-2"
              value={model.status||'OPEN'}
              onChange={e=>setModel({...model, status:e.target.value as WorkPartStatus})}>
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </Row>
          <Row label="Notas">
            <input className="border rounded px-3 py-2"
              value={model.notes||''}
              onChange={e=>setModel({...model, notes:e.target.value})}/>
          </Row>
          <Row label="Finca">
            <select className="border rounded px-3 py-2"
              value={model.farmId||''}
              onChange={e=>setModel({...model, farmId:e.target.value})}>
              <option value="">Selecciona</option>
              {farms.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </Row>
          <Row label="Parcela">
            <select className="border rounded px-3 py-2"
              value={model.parcelId||''}
              onChange={e=>setModel({...model, parcelId:e.target.value})}>
              <option value="">Ninguna</option>
              {parcels.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </Row>
          <Row label="Campaña">
            <select className="border rounded px-3 py-2"
              value={model.campaignId||''}
              onChange={e=>setModel({...model, campaignId:e.target.value})}>
              <option value="">Selecciona</option>
              {campaigns.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Row>
          <Row label="Cuadrilla">
            <select className="border rounded px-3 py-2"
              value={model.crewId||''}
              onChange={e=>setModel({...model, crewId:e.target.value})}>
              <option value="">Selecciona</option>
              {crews.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Row>
          <div className="flex justify-end">
            <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar parte" message="Esta acción no se puede deshacer." />
    </div>
  )
}

function Row({label, children}:{label:string; children:React.ReactNode}) {
  return (
    <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center">
      <span className="text-sm text-gray-600">{label}</span>
      {children}
    </label>
  )
}
