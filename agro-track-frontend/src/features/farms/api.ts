import { Farm } from "./types"

import api from "@/lib/axios"

export const getFarms = async () => {
  const { data } = await api.get("/api/farms")
  return data
}


export const getFarm = async (id: number): Promise<Farm> => {
  const { data } = await api.get(`/api/farms/id/${id}`)
  return data
}

export const createFarm = async (farm: Omit<Farm, "id">): Promise<Farm> => {
  const { data } = await api.post("/api/farms", farm)
  return data
}

export const updateFarm = async (id: number, farm: Partial<Farm>): Promise<Farm> => {
  const { data } = await api.put(`/api/farms/${id}`, farm)
  return data
}

export const deleteFarm = async (id: number): Promise<void> => {
  await api.delete(`/api/farms/${id}`)
}
