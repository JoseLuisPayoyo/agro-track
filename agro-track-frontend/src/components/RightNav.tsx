import { NavLink } from 'react-router-dom'

const links = [
  { to: '/inicio', label: 'Inicio' },
  { to: '/empleados', label: 'Empleados' },
  { to: '/campañas', label: 'Campañas' },
  { to: '/fincas', label: 'Fincas' },
  { to: '/partes', label: 'Partes de trabajo' },
]

export default function RightNav() {
  return (
    <nav className="h-full p-4 flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">AgroTrack</h2>
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg border hover:bg-gray-50 ${
              isActive ? 'border-brand-500 text-brand-700 bg-brand-50' : 'border-gray-200'
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
      <div className="mt-auto text-xs text-gray-400">v0.1</div>
    </nav>
  )
}
