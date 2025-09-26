import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getFarms, createFarm, updateFarm, deleteFarm } from "./api"
import { Farm } from "./types"

export const useFarms = () =>
  useQuery<Farm[], Error>({ queryKey: ["farms"], queryFn: getFarms })

export const useCreateFarm = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: createFarm, onSuccess: () => qc.invalidateQueries({ queryKey: ["farms"] }) })
}

export const useUpdateFarm = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Farm> }) => updateFarm(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["farms"] }),
  })
}

export const useDeleteFarm = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteFarm,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["farms"] }),
  })
}
