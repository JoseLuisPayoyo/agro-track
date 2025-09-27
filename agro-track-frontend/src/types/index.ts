// Enums
export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'LEAVE'
export type CertificateType = 'FITOSANITARIOS' | 'USO_EPI' | 'MANEJO_CARRETILLA' | 'PRL_BASICO' | 'MANEJO_MAQUINARIA'
export type WorkPartStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE'

// Core entities
export type Employee = {
  id: string //UUID
  nombre: string
  apellidos: string
  dni: string
  email: string
  telefono: string
  direccion: string
  estado: EmployeeStatus
  fechaContratacion: string // ISO
  nombreCuadrilla: string
}

export type Certificate = {
  id: string
  employeeId: string
  tipo: CertificateType
  fechaExpiracion: string
  empleadoNombre?: string
}

export type Campaign = {
  id: string
  nombre: string
  fechaInicio: string
  fechaFin: string
  tareaPrincipal: string
  fincaId: string
  fincaNombre: string
  cuadrillaId: string
  cuadrillaNombre: string
}

export type Farm = {
  id: string
  nombre: string
  ubicacion: string
}

export type Parcel = {
  id: string
  nombre: string
  fincaId: string
  fincaNombre?: string
}

export type WorkPart = {
  id: string
  date: string
  task: string
  status: WorkPartStatus
  notes?: string
  fincaId?: string
  fincaNombre?: string
  parcelaId?: string
  parcelaNombre?: string
  campañaId?: string
  campañaNombre?: string
  cuadrillaId?: string
  cuadrillaNombre?: string
}

export type WorkerEntry = {
  id: string
  workPartId: string
  empleadoId: string
  empleadoNombre?: string
  horas: number
  kilos: number
}
