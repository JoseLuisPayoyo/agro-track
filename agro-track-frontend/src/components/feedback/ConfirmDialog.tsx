import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'


export default function ConfirmDialog({ open, title = '¿Confirmar?', description, onConfirm, onClose }: { open: boolean; title?: string; description?: string; onConfirm: () => void; onClose: () => void }) {
return (
<Modal open={open} onClose={onClose} title={title}>
<p className="text-sm text-gray-600">{description}</p>
<div className="mt-5 flex justify-end gap-2">
<Button variant="ghost" onClick={onClose}>Cancelar</Button>
<Button onClick={onConfirm}>Confirmar</Button>
</div>
</Modal>
)
}