import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Parcel } from '../../types'
import { api } from '../../lib/api'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<Parcel> = { nombre:'' }

export default function ParcelsPage() {
  const { farmId } = useParams()
  const [data, setData] = useState<Parcel[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Parcel>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})

  const load = () => api.get(`/farms/${farmId}/parcels`).then(r=> setData(r.data))
  useEffect(()=>{ load() }, [farmId])

  const onSubmit = async () => {
    try {
      const payload = { ...model, fincaId: farmId }
      if (model.id) { await api.put(`/parcels/${model.id}`, payload); toast.success('Parcela actualizada') }
      else { await api.post(`/farms/${farmId}/parcels`, payload); toast.success('Parcela creada') }
      setOpen(false); setModel(empty); load()
    } catch { toast.error('Error al guardar') }
  }
  const onDelete = async () => {
    try { await api.delete(`/parcels/${confirm.id}`); toast.success('Parcela eliminada'); setConfirm({open:false}); load() }
    catch { toast.error('No se pudo eliminar') }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Parcelas de la finca</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{setModel(empty); setOpen(true)}}>Crear parcela</button>
      </header>

      <Table>
        <thead>
          <tr><Th>Nombre</Th><Th>Finca</Th><Th>Acciones</Th></tr>
        </thead>
        <tbody>
          {data.map(p=>(
            <tr key={p.id}>
              <Td>{p.nombre}</Td>
              <Td>{p.fincaNombre ?? '—'}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded" onClick={()=>{setModel(p); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700" onClick={()=>setConfirm({open:true, id:p.id})}>Eliminar</button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar parcela' : 'Crear parcela'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Nombre"><input className="border rounded px-3 py-2" value={model.nombre||''} onChange={e=>setModel({...model, nombre:e.target.value})}/></Row>
          <div className="flex justify-end"><button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button></div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar parcela" message="Esta acción no se puede deshacer." />
    </div>
  )
}

function Row({label, children}:{label:string; children:React.ReactNode}) {
  return <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center"><span className="text-sm text-gray-600">{label}</span>{children}</label>
}
