export interface Farm {
  id: number
  name: string
  location?: string
  parcelCount?: number
}

export interface FarmFormData {
  name: string
  location?: string
}
