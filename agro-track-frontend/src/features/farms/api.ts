import api from "@/lib/axios"
import { Farm, FarmFormData } from "./types"

export async function getFarms() {
  const res = await api.get<Farm[]>("/api/farms")
  return res.data
}

export async function createFarm(data: FarmFormData) {
  const res = await api.post<Farm>("/api/farms", data)
  return res.data
}

export async function updateFarm(id: number, data: FarmFormData) {
  const res = await api.put<Farm>(`/api/farms/${id}`, data)
  return res.data
}

export async function deleteFarm(id: number) {
  await api.delete(`/api/farms/${id}`)
  return id
}
