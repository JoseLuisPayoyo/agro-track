export default function ErrorState({ message = 'Ha ocurrido un error' }: { message?: string }) {
return <div className="p-4 rounded-xl bg-red-50 text-red-700">{message}</div>
}