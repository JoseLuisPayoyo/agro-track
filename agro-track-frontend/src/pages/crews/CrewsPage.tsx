import { useEffect, useState } from 'react'
import { Crew } from '../../types'
import { crewsService } from '../../services/crewsService'
import { employeesService } from '../../services/employeesService'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<Crew> = { name: '', foremanId: '' }

export default function CrewsPage() {
  const [data, setData] = useState<Crew[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Crew>>(empty)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({ open: false })
  const [employees, setEmployees] = useState<{ value: string; label: string }[]>([])

  const load = () => crewsService.getAll().then(setData)

  useEffect(() => {
    load()
    employeesService.getAll().then(r =>
      setEmployees(r.map(e => ({
        value: e.id,
        label: `${e.name} ${e.lastName}` 
      })))
    )
  }, [])

  const onSubmit = async () => {
    try {
      const payload = {
        name: model.name!,
        foremanId: model.foremanId || undefined // 
      }

      if (model.id) {
        await crewsService.update(model.id, payload)
        toast.success('Cuadrilla actualizada')
      } else {
        await crewsService.create(payload)
        toast.success('Cuadrilla creada')
      }
      setOpen(false); setModel(empty); load()
    } catch {
      toast.error('Error al guardar')
    }
  }

  const onDelete = async () => {
    try {
      if (confirm.id) await crewsService.remove(confirm.id)
      toast.success('Cuadrilla eliminada')
      setConfirm({ open: false }); load()
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cuadrillas</h1>
        <button
          className="px-3 py-2 bg-brand-600 text-white rounded-lg"
          onClick={() => { setModel(empty); setOpen(true) }}
        >
          Añadir cuadrilla
        </button>
      </header>

      <Table>
        <thead>
          <tr><Th>Nombre</Th><Th>Encargado</Th><Th>Acciones</Th></tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.id}>
              <Td>{c.name}</Td>
              <Td>{c.foremanName ?? '—'}</Td>
              <Td>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 text-sm border rounded"
                    onClick={() => { setModel(c); setOpen(true) }}
                  >
                    Editar
                  </button>
                  <button
                    className="px-2 py-1 text-sm border rounded text-red-700"
                    onClick={() => setConfirm({ open: true, id: c.id })}
                  >
                    Eliminar
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} title={model.id ? 'Editar cuadrilla' : 'Añadir cuadrilla'} onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <Row label="Nombre">
            <input
              className="border rounded px-3 py-2"
              value={model.name || ''}
              onChange={e => setModel({ ...model, name: e.target.value })}
            />
          </Row>
          <Row label="Encargado">
            <select
              className="border rounded px-3 py-2"
              value={model.foremanId || ''}
              onChange={e => setModel({ ...model, foremanId: e.target.value || undefined })}
            >
              <option value="">Selecciona encargado</option>
              {employees.map(emp => (
                <option key={emp.value} value={emp.value}>{emp.label}</option>
              ))}
            </select>
          </Row>
          <div className="flex justify-end">
            <button className="px-3 py-2 border rounded" onClick={onSubmit}>Guardar</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        onCancel={() => setConfirm({ open: false })}
        onConfirm={onDelete}
        title="Eliminar cuadrilla"
        message="Esta acción no se puede deshacer."
      />
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid sm:grid-cols-[180px_1fr] gap-3 items-center">
      <span className="text-sm text-gray-600">{label}</span>
      {children}
    </label>
  )
}
