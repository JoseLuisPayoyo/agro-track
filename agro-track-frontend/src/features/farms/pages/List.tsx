import { useFarms, useCreateFarm, useDeleteFarm } from "../hooks"
import { FarmForm } from "../components/FarmForm"
import { useState } from "react"

export default function FarmListPage() {
  const { data, isLoading } = useFarms()
  const createFarm = useCreateFarm()
  const deleteFarm = useDeleteFarm()
  const [openForm, setOpenForm] = useState(false)

  if (isLoading) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Fincas</h1>
        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-brand-500 text-white rounded-md"
        >
          + Nueva Finca
        </button>
      </div>

      {openForm && (
        <FarmForm
          onSubmit={(data) => {
            createFarm.mutate(data)
            setOpenForm(false)
          }}
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Nombre</th>
            <th className="p-2">Parcelas</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((farm) => (
            <tr key={farm.id} className="border-b">
              <td className="p-2">{farm.name}</td>
              <td className="p-2">{farm.parcelCount ?? 0}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => deleteFarm.mutate(farm.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
