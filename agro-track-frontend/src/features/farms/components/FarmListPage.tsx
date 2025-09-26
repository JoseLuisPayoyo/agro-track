import { useState } from "react"
import { useFarms, useCreateFarm, useUpdateFarm, useDeleteFarm } from "../hooks"
import { FarmForm } from "../components/FarmForm"
import { FarmFormData } from "../schemas"
import { Button } from "@/components/ui/Button"
import { toast } from "sonner"
import { Dialog } from "@/components/ui/Dialog"

export default function FarmListPage() {
  const { data, isLoading } = useFarms()
  const createFarm = useCreateFarm()
  const updateFarm = useUpdateFarm()
  const deleteFarm = useDeleteFarm()

  const [openForm, setOpenForm] = useState(false)
  const [editingFarm, setEditingFarm] = useState<number | null>(null)
  console.log("Holaa")

  if (isLoading) return <p className="text-gray-500">Cargando...</p>

  const handleSubmit = (formData: FarmFormData) => {
    if (editingFarm) {
      updateFarm.mutate(
        { id: editingFarm, data: formData },
        { onSuccess: () => toast.success("Finca actualizada") }
      )
    } else {
      createFarm.mutate(formData, { onSuccess: () => toast.success("Finca creada") })
    }
    setOpenForm(false)
    setEditingFarm(null)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Fincas</h1>
        <Button onClick={() => setOpenForm(true)}>+ Nueva Finca</Button>
    </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Parcelas</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((farm, i) => (
              <tr
                key={farm.id}
                className={`border-b ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">{farm.name}</td>
                <td className="px-6 py-4">{farm.parcelCount ?? 0}</td>
                <td className="px-6 py-4 text-gray-600">{farm.location ?? "-"}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEditingFarm(farm.id)
                      setOpenForm(true)
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() =>
                      deleteFarm.mutate(farm.id, {
                        onSuccess: () => toast.success("Finca eliminada"),
                      })
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal con formulario */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <div className="p-6 bg-white rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
            {editingFarm ? "Editar Finca" : "Nueva Finca"}
            </h2>
            <FarmForm
            defaultValues={
                editingFarm
                ? data?.find((f) => f.id === editingFarm)
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={() => {
                setOpenForm(false)
                setEditingFarm(null)
            }}
            />
        </div>
    </Dialog>
    </div>
  )
}
