import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getFarms, createFarm, updateFarm, deleteFarm } from "./api"
import { FarmFormData } from "./schemas"

export function useFarms() {
  return useQuery({ queryKey: ["farms"], queryFn: getFarms })
}

export function useCreateFarm() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: FarmFormData) => createFarm(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["farms"] }),
  })
}

export function useUpdateFarm() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FarmFormData }) =>
      updateFarm(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["farms"] }),
  })
}

export function useDeleteFarm() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteFarm(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["farms"] }),
  })
}
