import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/empleados', label: 'Empleados' },
  { to: '/campanas', label: 'Campañas' },
  { to: '/fincas', label: 'Fincas' },
  { to: '/cuadrillas', label: 'Cuadrillas' },
  { to: '/partes', label: 'Partes de trabajo' },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="w-64 bg-white border-r h-screen fixed right-0 top-0">
      <div className="p-4 font-bold text-xl">AgroTrack</div>
      <nav className="flex flex-col p-2 space-y-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-2 rounded-lg ${
              pathname === link.to
                ? 'bg-brand-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
