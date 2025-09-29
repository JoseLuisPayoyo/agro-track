import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Certificate, CertificationType } from '../../types'
import { certificationsService } from '../../services/certificationsService'
import { Table, Th, Td } from '../../components/Table'
import Modal from '../../components/Modal'
import ConfirmDialog from '../../components/ConfirmDialog'
import toast from 'react-hot-toast'

const empty: Partial<Certificate> = {
  type: undefined,
  expiresAt: ''
}

export default function CertificatesPage() {
  const { employeeId } = useParams<{ employeeId: string }>()
  const [data, setData] = useState<Certificate[]>([])
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<Partial<Certificate>>(empty)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({ open: false })

  const load = () => {
    if (employeeId) certificationsService.getByEmployee(employeeId).then(setData)
  }

  useEffect(() => { load() }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [employeeId])

  const onSubmit = async () => {
    try {
      const payload = {
        employeeId: employeeId!, 
        type: model.type as CertificationType,
        expiresAt: model.expiresAt,
        ...(model.expiresAt ? { expiresAt: new Date(model.expiresAt).toISOString().split('T')[0] } : {})
      }

      if (model.id) {
        await certificationsService.update(model.id, payload)
        toast.success('Certificado actualizado')
      } else {
        await certificationsService.create(payload)
        toast.success('Certificado creado')
      }
      setOpen(false); setModel(empty); load()
    } catch (err) {
      console.error(err)
      toast.error('Error al guardar certificado')
    }
  }

  const onDelete = async () => {
    try {
      if (confirm.id) await certificationsService.remove(confirm.id)
      toast.success('Certificado eliminado')
      setConfirm({ open: false }); load()
    } catch {
      toast.error('No se pudo eliminar certificado')
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certificados</h1>
        <button
          className="px-3 py-2 bg-brand-600 text-white rounded-lg"
          onClick={() => { setModel(empty); setOpen(true) }}
        >
          Añadir certificado
        </button>
      </header>

      <Table>
        <thead>
          <tr>
            <Th>Empleado</Th>
            <Th>Tipo</Th>
            <Th>Fecha expiración</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.id}>
              <Td>{c.employeeName}</Td>
              <Td>{c.type}</Td>
              <Td>{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : '—'}</Td>
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

      {/* Modal crear/editar */}
      <Modal
        open={open}
        title={model.id ? 'Editar certificado' : 'Añadir certificado'}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">
          <Row label="Tipo">
            <select
              className="border rounded px-3 py-2"
              value={model.type || ''}
              onChange={e => setModel({ ...model, type: e.target.value as CertificationType })}
            >
              <option value="">Selecciona tipo</option>
              <option value="FITOSANITARIO">Fitosanitario</option>
              <option value="MANEJO_CARRETILLA">Manejo de carretilla</option>
              <option value="USO_EPI">Uso de EPI</option>
              <option value="PRL_BASICO">PRL Básico</option>
              <option value="MANEJO_MAQUINARIA">Manejo de maquinaria</option>
            </select>
          </Row>
          <Row label="Fecha de expiración">
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={model.expiresAt || ''}
              onChange={e => setModel({ ...model, expiresAt: e.target.value })}
            />
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
        title="Eliminar certificado"
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
