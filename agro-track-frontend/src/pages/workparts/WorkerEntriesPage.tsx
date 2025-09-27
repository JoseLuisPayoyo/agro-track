import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WorkerEntry } from '../../types'
import { workPartEntriesService } from '../../services/workPartEntriesService'
import { employeesService } from '../../services/employeesService'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<WorkerEntry> = {
  hoursWorked: 0,
  quantityKg: 0
}

export default function WorkerEntriesPage() {
  const { workPartId } = useParams()
  const [data, setData] = useState<WorkerEntry[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<WorkerEntry>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})
  const [employees, setEmployees] = useState<{value:string,label:string}[]>([])

  const load = () => {
    if (workPartId) workPartEntriesService.getByWorkPart(workPartId).then(setData)
  }

  useEffect(()=>{
    load()
    employeesService.getAll().then(r=> 
      setEmployees(r.map(e=>({value:e.id,label:`${e.name} ${e.lastname}`})))
    )
  }, [workPartId])

  const onSubmit = async () => {
    try {
      const payload = { 
        ...model, 
        workPartId,
        employeeId: model.employeeId,
        hoursWorked: model.hoursWorked,
        quantityKg: model.quantityKg
      }
      if (model.id) {
        await workPartEntriesService.update(model.id, payload)
        toast.success('Entrada actualizada')
      } else {
        await workPartEntriesService.create(payload)
        toast.success('Entrada creada')
      }
      setOpen(false); setModel(empty); load()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const onDelete = async () => {
    try {
      if (confirm.id) await workPartEntriesService.remove(confirm.id)
      toast.success('Entrada eliminada')
      setConfirm({open:false}); load()
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trabajadores en el parte</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg"
          onClick={()=>{setModel(empty); setOpen(true)}}>Añadir trabajador</button>
      </header>

      <Table>
        <thead>
          <tr><Th>Empleado</Th><Th>Horas</Th><Th>Kilos</Th><Th>Acciones</Th></tr>
        </thead>
        <tbody>
          {data.map(e=>(
            <tr key={e.id}>
              <Td>{e.employeeName}</Td>
              <Td>{e.hoursWorked}</Td>
              <Td>{e.quantityKg ?? '—'}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded"
                    onClick={()=>{setModel(e); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700"
                    onClick={()=>setConfirm({open:true, id:e.id})}>Eliminar</button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar entrada' : 'Añadir entrada'} onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <Row label="Empleado">
            <select className="border rounded px-3 py-2"
              value={model.employeeId||''}
              onChange={e=>setModel({...model, employeeId:e.target.value})}>
              <option value="">Selecciona</option>
              {employees.map(emp=><option key={emp.value} value={emp.value}>{emp.label}</option>)}
            </select>
          </Row>
          <Row label="Horas trabajadas">
            <input type="number" step="0.1" className="border rounded px-3 py-2"
              value={model.hoursWorked||0}
              onChange={e=>setModel({...model, hoursWorked:Number(e.target.value)})}/>
          </Row>
          <Row label="Cantidad (Kg)">
            <input type="number" step="0.1" className="border rounded px-3 py-2"
              value={model.quantityKg||0}
              onChange={e=>setModel({...model, quantityKg:Number(e.target.value)})}/>
          </Row>
          <div className="flex justify-end">
            <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar entrada" message="Esta acción no se puede deshacer." />
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
