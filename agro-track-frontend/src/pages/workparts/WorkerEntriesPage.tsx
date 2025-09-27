import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WorkerEntry, Employee } from '../../types'
import { api } from '../../lib/api'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<WorkerEntry> = { empleadoId:'', horas:0, kilos:0 }

export default function WorkerEntriesPage() {
  const { workPartId } = useParams()
  const [data, setData] = useState<WorkerEntry[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<WorkerEntry>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})
  const [employees, setEmployees] = useState<{value:string,label:string}[]>([])

  const load = () => api.get(`/workparts/${workPartId}/entries`).then(r=> setData(r.data))
  useEffect(()=>{
    load()
    api.get('/employees').then(r=> setEmployees(r.data.map((e:Employee)=>({value:e.id,label:`${e.nombre} ${e.apellidos}`}))))
  }, [workPartId])

  const onSubmit = async () => {
    try {
      const payload = { ...model, workPartId }
      if (model.id) { await api.put(`/entries/${model.id}`, payload); toast.success('Parte trabajador actualizado') }
      else { await api.post(`/workparts/${workPartId}/entries`, payload); toast.success('Parte trabajador creado') }
      setOpen(false); setModel(empty); load()
    } catch { toast.error('Error al guardar') }
  }
  const onDelete = async () => {
    try { await api.delete(`/entries/${confirm.id}`); toast.success('Parte trabajador eliminado'); setConfirm({open:false}); load() }
    catch { toast.error('No se pudo eliminar') }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Partes de trabajadores</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{setModel(empty); setOpen(true)}}>Añadir parte</button>
      </header>

      <Table>
        <thead>
          <tr><Th>Empleado</Th><Th>Horas</Th><Th>Kilos</Th><Th>Acciones</Th></tr>
        </thead>
        <tbody>
          {data.map(w=>(
            <tr key={w.id}>
              <Td>{w.empleadoNombre ?? '—'}</Td>
              <Td>{w.horas}</Td>
              <Td>{w.kilos}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded" onClick={()=>{setModel(w); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700" onClick={()=>setConfirm({open:true, id:w.id})}>Eliminar</button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar parte trabajador' : 'Añadir parte trabajador'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Empleado">
            <select className="border rounded px-3 py-2" value={model.empleadoId||''} onChange={e=>setModel({...model, empleadoId:e.target.value})}>
              <option value="">Selecciona</option>
              {employees.map(e=><option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </Row>
          <Row label="Horas"><input type="number" step="0.1" className="border rounded px-3 py-2" value={model.horas ?? 0} onChange={e=>setModel({...model, horas: Number(e.target.value)})}/></Row>
          <Row label="Kilos"><input type="number" step="0.1" className="border rounded px-3 py-2" value={model.kilos ?? 0} onChange={e=>setModel({...model, kilos: Number(e.target.value)})}/></Row>
          <div className="flex justify-end"><button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button></div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar registro" message="Esta acción no se puede deshacer." />
    </div>
  )
}

function Row({label, children}:{label:string; children:React.ReactNode}) {
  return <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center"><span className="text-sm text-gray-600">{label}</span>{children}</label>
}
