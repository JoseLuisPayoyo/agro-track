// Enums
export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LEAVE = 'LEAVE'
}

export type CertificationType = 'FITOSANITARIOS' | 'USO_EPI' | 'MANEJO_CARRETILLA' | 'PRL_BASICO' | 'MANEJO_MAQUINARIA'
export type WorkPartStatus = 'OPEN' | 'CLOSED'

// Core entities
export interface Employee {
  id: string
  name: string
  lastname: string
  dni: string
  email: string
  phone: string
  address: string
  jobTitle: string
  status: EmployeeStatus
  hireDate: string // ISO date yyyy-MM-dd

  crewId: string
  crewName: string
  farmId?: string
  farmName?: string
}

export interface Certificate {
  id: string
  employeeId: string
  employeeName: string
  type: CertificationType
  expiresAt: string // ISO date
}

export interface Campaign {
  id: string
  name: string
  startDate: string
  endDate?: string
  mainTask: string

  farmId: string
  farmName: string

  crewId: string
  crewName: string
}


export interface Farm {
  id: string
  name: string
  location: string
}

export interface Parcel {
  id: string
  name: string
  farmId: string
  farmName: string
}
export interface Crew {
  id: string
  name: string
  foremanId: string
  foremanName: string
}



export interface WorkPart {
  id: string
  date: string
  task: string
  status: WorkPartStatus
  notes?: string

  farmId: string
  farmName: string
  parcelId?: string
  parcelName?: string
  campaignId: string
  campaignName: string
  crewId: string
  crewName: string
}

export interface WorkerEntry {
  id: string
  workPartId: string
  employeeId: string
  employeeName: string
  hoursWorked: number
  quantityKg: number
}
