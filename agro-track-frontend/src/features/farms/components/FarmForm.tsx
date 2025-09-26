import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { farmSchema, FarmFormData } from "../schemas"
import { Button } from "@/components/ui/Button"

interface Props {
  defaultValues?: FarmFormData
  onSubmit: (data: FarmFormData) => void
  onCancel?: () => void
}

export function FarmForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmFormData>({
    resolver: zodResolver(farmSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Ubicación</label>
        <textarea
            {...register("location")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
      </div>


      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  )
}
