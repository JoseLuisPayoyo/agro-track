import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema, type EmployeeFormValues } from '../schemas'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'


export default function EmployeeForm({ defaultValues, onSubmit, crews, farms }: { defaultValues?: Partial<EmployeeFormValues>; onSubmit: (v: EmployeeFormValues) => void; crews: { id: number; name: string }[]; farms: { id: number; name: string }[] }) {
const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormValues>({ resolver: zodResolver(employeeSchema), defaultValues: defaultValues as any })


return (
<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="text-sm">Nombre</label>
<Input {...register('name')} />
{errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
</div>
<div>
<label className="text-sm">Apellidos</label>
<Input {...register('lastName')} />
{errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
</div>
<div>
<label className="text-sm">DNI</label>
<Input {...register('dni')} />
{errors.dni && <p className="text-xs text-red-600">{errors.dni.message}</p>}
</div>
<div>
<label className="text-sm">Estado</label>
<Select {...register('status')} defaultValue={defaultValues?.status ?? 'ACTIVE'}>
<option value="ACTIVE">Activo</option>
<option value="INACTIVE">Inactivo</option>
</Select>
</div>
<div>
<label className="text-sm">Cuadrilla</label>
<Select {...register('crewId')}>{crews.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}</Select>
</div>
<div>
<label className="text-sm">Finca (opcional)</label>
<Select {...register('farmId')}>
<option value="">Sin asignar</option>
{farms.map((f) => (<option key={f.id} value={f.id}>{f.name}</option>))}
</Select>
</div>
<div className="md:col-span-2 flex justify-end gap-2 mt-2">
<Button type="submit">Guardar</Button>
</div>
</form>
)
}