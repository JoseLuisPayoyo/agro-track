import { useEffect, useState } from 'react'
import { Employee, EmployeeStatus } from '../../types'
import { api } from '../../lib/api'
import { Link } from 'react-router-dom'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<Employee> = {
  nombre: '', apellidos:'', dni:'', email:'', telefono:'', direccion:'',
  estado: 'ACTIVE', fechaContratacion:'', nombreCuadrilla:''
}

export default function EmployeesPage() {
  const [data, setData] = useState<Employee[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Employee>>(empty)
  const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})

  const load = () => api.get('/employees').then(r=> setData(r.data))

  useEffect(()=>{ load() }, [])

  const onSubmit = async () => {
    try {
      if (model.id) {
        await api.put(`/employees/${model.id}`, model)
        toast.success('Empleado actualizado')
      } else {
        await api.post('/employees', model)
        toast.success('Empleado creado')
      }
      setOpen(false); setModel(empty); load()
    } catch (e) { 
      if (e instanceof Error) toast.error(e.message)
      else toast.error('Error desconocido') 
    }
  }

  const onDelete = async () => {
    try {
      await api.delete(`/employees/${confirm.id}`)
      toast.success('Empleado eliminado')
      setConfirm({open:false}); load()
    } catch { toast.error('No se pudo eliminar') }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Empleados</h1>
        <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{setModel(empty); setOpen(true)}}>Añadir empleado</button>
      </header>

      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th><Th>Apellidos</Th><Th>DNI</Th><Th>Email</Th><Th>Teléfono</Th>
            <Th>Dirección</Th><Th>Estado</Th><Th>Fecha contratación</Th><Th>Cuadrilla</Th><Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(emp=>(
            <tr key={emp.id}>
              <Td>{emp.nombre}</Td>
              <Td>{emp.apellidos}</Td>
              <Td>{emp.dni}</Td>
              <Td>{emp.email}</Td>
              <Td>{emp.telefono}</Td>
              <Td>{emp.direccion}</Td>
              <Td><span className="px-2 py-1 text-xs rounded bg-gray-100">{emp.estado}</span></Td>
              <Td>{new Date(emp.fechaContratacion).toLocaleDateString()}</Td>
              <Td>{emp.nombreCuadrilla}</Td>
              <Td>
                <div className="flex gap-2">
                  <button className="px-2 py-1 text-sm border rounded" onClick={()=>{setModel(emp); setOpen(true)}}>Editar</button>
                  <button className="px-2 py-1 text-sm border rounded text-red-700" onClick={()=>setConfirm({open:true, id:emp.id})}>Eliminar</button>
                  <Link className="px-2 py-1 text-sm border rounded" to={`/empleados/${emp.id}/certificados`}>Ver certificados</Link>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar empleado' : 'Añadir empleado'} onClose={()=>setOpen(false)}>
        <EmployeeForm model={model} onChange={setModel} onSubmit={onSubmit} />
      </Modal>

      <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
        title="Eliminar empleado" message="Esta acción no se puede deshacer." />
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

function EmployeeForm({ model, onChange, onSubmit }:{
  model: Partial<Employee>,
  onChange: (m: Partial<Employee>)=>void,
  onSubmit: ()=>void
}) {
  const set = <K extends keyof Employee>(k: K) => (v: Employee[K]) => {
    onChange({ ...model, [k]: v })
  }

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <Row label="Nombre"><input className="border rounded px-3 py-2" value={model.nombre||''} onChange={e=>set('nombre')(e.target.value)} /></Row>
        <Row label="Apellidos"><input className="border rounded px-3 py-2" value={model.apellidos||''} onChange={e=>set('apellidos')(e.target.value)} /></Row>
        <Row label="DNI"><input className="border rounded px-3 py-2" value={model.dni||''} onChange={e=>set('dni')(e.target.value)} /></Row>
        <Row label="Email"><input className="border rounded px-3 py-2" value={model.email||''} onChange={e=>set('email')(e.target.value)} /></Row>
        <Row label="Teléfono"><input className="border rounded px-3 py-2" value={model.telefono||''} onChange={e=>set('telefono')(e.target.value)} /></Row>
        <Row label="Dirección"><input className="border rounded px-3 py-2" value={model.direccion||''} onChange={e=>set('direccion')(e.target.value)} /></Row>
        <Row label="Estado">
          <select className="border rounded px-3 py-2" value={model.estado||'ACTIVE'} onChange={e=>set('estado')(e.target.value as EmployeeStatus)}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="ON_LEAVE">LEAVE</option>
          </select>
        </Row>
        <Row label="Fecha contratación">
          <input type="date" className="border rounded px-3 py-2" value={model.fechaContratacion?.slice(0,10) || ''} onChange={e=>set('fechaContratacion')(e.target.value)} />
        </Row>
        <Row label="Nombre cuadrilla"><input className="border rounded px-3 py-2" value={model.nombreCuadrilla||''} onChange={e=>set('nombreCuadrilla')(e.target.value)} /></Row>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
      </div>
    </div>
  )
}
