import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { farmSchema, FarmFormData } from "../schemas"
import { Button } from "@/components/ui/Button"

interface Props {
  defaultValues?: FarmFormData
  onSubmit: (data: FarmFormData) => void
}

export function FarmForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FarmFormData>({
    resolver: zodResolver(farmSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input {...register("name")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        {formState.errors.name && <p className="text-red-500 text-sm">{formState.errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea {...register("description")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <Button type="submit">Guardar</Button>
    </form>
  )
}
