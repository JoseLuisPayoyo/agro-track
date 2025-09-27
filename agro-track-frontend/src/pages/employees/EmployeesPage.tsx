// import { useEffect, useState } from 'react'
// import { Employee, EmployeeStatus } from '../../types'
// import { employeesService } from '../../services/employeesService'
// import { Link } from 'react-router-dom'
// import { Table, Th, Td } from '../../components/Table'
// import Modal from '../../components/Modal'
// import ConfirmDialog from '../../components/ConfirmDialog'
// import toast from 'react-hot-toast'

// const empty: Partial<Employee> = {
//   name: '',
//   lastname: '',
//   dni: '',
//   email: '',
//   phone: '',
//   address: '',
//   jobTitle: '',
//   status: 'ACTIVE',
//   hireDate: '',
//   crewId: '',
//   farmId: ''
// }

// export default function EmployeesPage() {
//   const [data, setData] = useState<Employee[]>([])
//   const [open, setOpen] = useState(false)
//   const [model, setModel] = useState<Partial<Employee>>(empty)
//   const [confirm, setConfirm] = useState<{open:boolean; id?:string}>({open:false})

//   const load = () => employeesService.getAll().then(setData)

//   useEffect(()=>{ load() }, [])

//   const onSubmit = async () => {
//     try {
//       if (model.id) {
//         await employeesService.update(model.id, model)
//         toast.success('Empleado actualizado')
//       } else {
//         await employeesService.create(model)
//         toast.success('Empleado creado')
//       }
//       setOpen(false); setModel(empty); load()
//     } catch {
//       toast.error('Error al guardar')
//     }
//   }

//   const onDelete = async () => {
//     try {
//       if (confirm.id) await employeesService.remove(confirm.id)
//       toast.success('Empleado eliminado')
//       setConfirm({open:false}); load()
//     } catch {
//       toast.error('No se pudo eliminar')
//     }
//   }

//   const fmt = (d?:string) => d ? new Date(d).toLocaleDateString() : '—'

//   return (
//     <div className="space-y-4">
//       <header className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Empleados</h1>
//         <button className="px-3 py-2 bg-brand-600 text-white rounded-lg"
//           onClick={()=>{setModel(empty); setOpen(true)}}>Añadir empleado</button>
//       </header>

//       <Table>
//         <thead>
//           <tr>
//             <Th>Nombre</Th><Th>Apellidos</Th><Th>DNI</Th><Th>Email</Th><Th>Teléfono</Th>
//             <Th>Dirección</Th><Th>Puesto</Th><Th>Estado</Th><Th>Contratación</Th>
//             <Th>Cuadrilla</Th><Th>Finca</Th><Th>Acciones</Th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(emp=>(
//             <tr key={emp.id}>
//               <Td>{emp.name}</Td>
//               <Td>{emp.lastname}</Td>
//               <Td>{emp.dni}</Td>
//               <Td>{emp.email}</Td>
//               <Td>{emp.phone}</Td>
//               <Td>{emp.address}</Td>
//               <Td>{emp.jobTitle}</Td>
//               <Td>{emp.status}</Td>
//               <Td>{fmt(emp.hireDate)}</Td>
//               <Td>{emp.crewName}</Td>
//               <Td>{emp.farmName ?? '—'}</Td>
//               <Td>
//                 <div className="flex gap-2">
//                   <button className="px-2 py-1 text-sm border rounded"
//                     onClick={()=>{setModel(emp); setOpen(true)}}>Editar</button>
//                   <button className="px-2 py-1 text-sm border rounded text-red-700"
//                     onClick={()=>setConfirm({open:true, id:emp.id})}>Eliminar</button>
//                   <Link className="px-2 py-1 text-sm border rounded"
//                     to={`/empleados/${emp.id}/certificados`}>Ver certificados</Link>
//                 </div>
//               </Td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal open={open} title={model.id ? 'Editar empleado' : 'Añadir empleado'} onClose={()=>setOpen(false)}>
//         <EmployeeForm model={model} onChange={setModel} onSubmit={onSubmit} />
//       </Modal>

//       <ConfirmDialog open={confirm.open} onCancel={()=>setConfirm({open:false})} onConfirm={onDelete}
//         title="Eliminar empleado" message="Esta acción no se puede deshacer." />
//     </div>
//   )
// }

// function Row({label, children}:{label:string; children:React.ReactNode}) {
//   return (
//     <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center">
//       <span className="text-sm text-gray-600">{label}</span>
//       {children}
//     </label>
//   )
// }

// function EmployeeForm({ model, onChange, onSubmit }:{
//   model: Partial<Employee>,
//   onChange: (m: Partial<Employee>)=>void,
//   onSubmit: ()=>void
// }) {
//   const set = <K extends keyof Employee>(k: K) => (v: Employee[K]) => {
//     onChange({ ...model, [k]: v })
//   }
//   return (
//     <div className="space-y-3">
//       <div className="grid sm:grid-cols-2 gap-3">
//         <Row label="Nombre"><input className="border rounded px-3 py-2" value={model.name||''} onChange={e=>set('name')(e.target.value)} /></Row>
//         <Row label="Apellidos"><input className="border rounded px-3 py-2" value={model.lastname||''} onChange={e=>set('lastname')(e.target.value)} /></Row>
//         <Row label="DNI"><input className="border rounded px-3 py-2" value={model.dni||''} onChange={e=>set('dni')(e.target.value)} /></Row>
//         <Row label="Email"><input className="border rounded px-3 py-2" value={model.email||''} onChange={e=>set('email')(e.target.value)} /></Row>
//         <Row label="Teléfono"><input className="border rounded px-3 py-2" value={model.phone||''} onChange={e=>set('phone')(e.target.value)} /></Row>
//         <Row label="Dirección"><input className="border rounded px-3 py-2" value={model.address||''} onChange={e=>set('address')(e.target.value)} /></Row>
//         <Row label="Puesto"><input className="border rounded px-3 py-2" value={model.jobTitle||''} onChange={e=>set('jobTitle')(e.target.value)} /></Row>
//         <Row label="Estado">
//           <select className="border rounded px-3 py-2"
//             value={model.status||'ACTIVE'}
//             onChange={e=>set('status')(e.target.value as EmployeeStatus)}>
//             <option value="ACTIVE">ACTIVE</option>
//             <option value="INACTIVE">INACTIVE</option>
//             <option value="LEAVE">LEAVE</option>
//           </select>
//         </Row>
//         <Row label="Fecha contratación">
//           <input type="date" className="border rounded px-3 py-2"
//             value={model.hireDate?.slice(0,10) || ''}
//             onChange={e=>set('hireDate')(e.target.value)} />
//         </Row>
//       </div>
//       <div className="flex justify-end gap-2 pt-2">
//         <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { Employee, EmployeeStatus } from '../../types'
import { employeesService } from '../../services/employeesService'
import { crewsService } from '../../services/crewsService'
import { farmsService } from '../../services/farmsService'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const empty: Partial<Employee> = {
  name: '',
  lastName: '',
  dni: '',
  email: '',
  phone: '',
  address: '',
  jobTitle: '',
  status: EmployeeStatus.ACTIVE,
  hireDate: '',
  crewId: '',
  farmId: undefined
}

export default function EmployeesPage() {
  const [data, setData] = useState<Employee[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Employee>>(empty)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({ open: false })
  const [crews, setCrews] = useState<{ id: string; name: string }[]>([])
  const [farms, setFarms] = useState<{ id: string; name: string }[]>([])

  const load = () => employeesService.getAll().then(setData)

  useEffect(() => {
    load()
    crewsService.getAll().then(r => setCrews(r))
    farmsService.getAll().then(r => setFarms(r))
  }, [])

  const onSubmit = async () => {
    try {
      const payload = {
        name: model.name!,
        lastName: model.lastName!,   
        dni: model.dni!,
        email: model.email,
        phone: model.phone,
        address: model.address,
        jobTitle: model.jobTitle,
        status: model.status!,
        hireDate: model.hireDate,
        crewId: model.crewId!,    
        farmId: model.farmId         
      }

      if (model.id) {
        await employeesService.update(model.id, payload)
        toast.success('Empleado actualizado')
      } else {
        await employeesService.create(payload)
        toast.success('Empleado creado')
      }
      setOpen(false); setModel(empty); load()
    } catch {
      toast.error('Error al guardar empleado')
    }
  }

  const onDelete = async () => {
    try {
      if (confirm.id) await employeesService.remove(confirm.id)
      toast.success('Empleado eliminado')
      setConfirm({ open: false }); load()
    } catch {
      toast.error('No se pudo eliminar empleado')
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Empleados</h1>
        <button
          className="px-3 py-2 bg-brand-600 text-white rounded-lg"
          onClick={() => { setModel(empty); setOpen(true) }}
        >
          Añadir empleado
        </button>
      </header>

      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Apellidos</Th>
            <Th>DNI</Th>
            <Th>Email</Th>
            <Th>Teléfono</Th>
            <Th>Dirección</Th>
            <Th>Puesto</Th>
            <Th>Estado</Th>
            <Th>Fecha contratación</Th>
            <Th>Cuadrilla</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr key={e.id}>
              <Td>{e.name}</Td>
              <Td>{e.lastName}</Td>
              <Td>{e.dni}</Td>
              <Td>{e.email}</Td>
              <Td>{e.phone}</Td>
              <Td>{e.address}</Td>
              <Td>{e.jobTitle}</Td>
              <Td>{e.status}</Td>
              <Td>{e.hireDate ? new Date(e.hireDate).toLocaleDateString() : '—'}</Td>
              <Td>{e.crewName ?? '—'}</Td>
              <Td>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 text-sm border rounded"
                    onClick={() => { setModel(e); setOpen(true) }}
                  >
                    Editar
                  </button>
                  <button
                    className="px-2 py-1 text-sm border rounded text-red-700"
                    onClick={() => setConfirm({ open: true, id: e.id })}
                  >
                    Eliminar
                  </button>
                  <Link
                    to={`/empleados/${e.id}/certificados`}
                    className="px-2 py-1 text-sm border rounded text-blue-700"
                  >
                    Ver certificados
                  </Link>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para crear/editar */}
      <Modal
        open={open}
        title={model.id ? 'Editar empleado' : 'Añadir empleado'}
        onClose={() => setOpen(false)}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Row label="Nombre">
            <input
              className="border rounded px-3 py-2"
              value={model.name || ''}
              onChange={e => setModel({ ...model, name: e.target.value })}
            />
          </Row>
          <Row label="Apellidos">
            <input
              className="border rounded px-3 py-2"
              value={model.lastName || ''}
              onChange={e => setModel({ ...model, lastName: e.target.value })}
            />
          </Row>
          <Row label="DNI">
            <input
              className="border rounded px-3 py-2"
              value={model.dni || ''}
              onChange={e => setModel({ ...model, dni: e.target.value })}
            />
          </Row>
          <Row label="Email">
            <input
              className="border rounded px-3 py-2"
              value={model.email || ''}
              onChange={e => setModel({ ...model, email: e.target.value })}
            />
          </Row>
          <Row label="Teléfono">
            <input
              className="border rounded px-3 py-2"
              value={model.phone || ''}
              onChange={e => setModel({ ...model, phone: e.target.value })}
            />
          </Row>
          <Row label="Dirección">
            <input
              className="border rounded px-3 py-2"
              value={model.address || ''}
              onChange={e => setModel({ ...model, address: e.target.value })}
            />
          </Row>
          <Row label="Puesto">
            <input
              className="border rounded px-3 py-2"
              value={model.jobTitle || ''}
              onChange={e => setModel({ ...model, jobTitle: e.target.value })}
            />
          </Row>
          <Row label="Estado">
            <select
              className="border rounded px-3 py-2"
              value={model.status || EmployeeStatus.ACTIVE}
              onChange={e => setModel({ ...model, status: e.target.value as EmployeeStatus })}
            >
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
              <option value="LEAVE">Baja</option>
            </select>
          </Row>
          <Row label="Fecha contratación">
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={model.hireDate || ''}
              onChange={e => setModel({ ...model, hireDate: e.target.value })}
            />
          </Row>
          <Row label="Cuadrilla">
            <select
              className="border rounded px-3 py-2"
              value={model.crewId || ''}
              onChange={e => setModel({ ...model, crewId: e.target.value })}
            >
              <option value="">Selecciona cuadrilla</option>
              {crews.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Row>
          <Row label="Finca (opcional)">
            <select
              className="border rounded px-3 py-2"
              value={model.farmId || ''}
              onChange={e => setModel({ ...model, farmId: e.target.value })}
            >
              <option value="">Ninguna</option>
              {farms.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </Row>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-3 py-2 border rounded" onClick={onSubmit}>
            Guardar
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        onCancel={() => setConfirm({ open: false })}
        onConfirm={onDelete}
        title="Eliminar empleado"
        message="Esta acción no se puede deshacer."
      />
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col space-y-1 text-sm">
      <span className="text-gray-600">{label}</span>
      {children}
    </label>
  )
}

