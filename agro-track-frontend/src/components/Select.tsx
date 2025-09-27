type Option = { value: string | number; label: string }

export default function Select({
  value, onChange, options, placeholder
}: {
  value?: string | number
  onChange: (v: string) => void
  options: Option[]
  placeholder?: string
}) {
  return (
    <select
      className="w-full border rounded-lg px-3 py-2"
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">{placeholder ?? 'Selecciona...'}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
