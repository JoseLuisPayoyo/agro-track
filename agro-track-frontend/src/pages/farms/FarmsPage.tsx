import { useEffect, useState } from 'react'
import { Farm } from '../../types'
import { farmsService } from '../../services/farmsService'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const empty: Partial<Farm> = { name:'', location:'' }

export default function FarmsPage() {
  const [data, setData] = useState<Farm[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Farm>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})

  const load = () => farmsService.getAll().then(setData)
  useEffect(()=>{ load() }, [])

  const onSubmit = async () => {
    try {
      if (model.id) {
        await farmsService.update(model.id, model)
        toast.success('Finca actualizada')
      } else {
        await farmsService.create(model)
        toast.success('Finca creada')
      }
      setOpen(false); setModel(empty); load()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const onDelete = async () => {
    try {
      if (confirm.id) await farmsService.remove(confirm.id)
      toast.success('Finca eliminada')
      setConfirm({open:false}); load()
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fincas</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg"
          onClick={()=>{setModel(empty); setOpen(true)}}>Añadir finca</button>
      </header>

      <Table>
        <thead>
          <tr><Th>Nombre</Th><Th>Ubicación</Th><Th>Acciones</Th></tr>
        </thead>
        <tbody>
          {data.map(f=>(
            <tr key={f.id}>
              <Td>{f.name}</Td>
              <Td>{f.location}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded"
                    onClick={()=>{setModel(f); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700"
                    onClick={()=>setConfirm({open:true, id:f.id})}>Eliminar</button>
                  <Link className="px-2 py-1 text-sm border rounded"
                    to={`/fincas/${f.id}/parcelas`}>Ver parcelas</Link>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar finca' : 'Añadir finca'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Nombre">
            <input className="border rounded px-3 py-2"
              value={model.name||''}
              onChange={e=>setModel({...model, name:e.target.value})}/>
          </Row>
          <Row label="Ubicación">
            <input className="border rounded px-3 py-2"
              value={model.location||''}
              onChange={e=>setModel({...model, location:e.target.value})}/>
          </Row>
          <div className="flex justify-end">
            <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar finca" message="Esta acción no se puede deshacer." />
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
