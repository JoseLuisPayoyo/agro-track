import { Outlet, NavLink } from 'react-router-dom'
import { AppRoutes } from '@/routes'
import { LayoutDashboard, Users2, Factory, ClipboardList, MapPinned, FolderKanban } from 'lucide-react'


export function AppLayout() {
return (
<div className="min-h-screen grid grid-cols-[260px_1fr]">
<aside className="bg-gray-50 border-r border-gray-200 p-4">
  <div className="text-2xl font-bold text-brand-600 mb-8">AgroTrack</div>
  <nav className="space-y-2">
    <SideLink to="/" icon={<LayoutDashboard size={18} />}>Dashboard</SideLink>
    <SideLink to="/employees" icon={<Users2 size={18} />}>Empleados</SideLink>
    <SideLink to="/crews" icon={<FolderKanban size={18} />}>Cuadrillas</SideLink>
    <SideLink to="/farms" icon={<Factory size={18} />}>Fincas</SideLink>
    <SideLink to="/campaigns" icon={<MapPinned size={18} />}>Campañas</SideLink>
    <SideLink to="/workparts" icon={<ClipboardList size={18} />}>Partes</SideLink>
  </nav>
</aside>

<main className="bg-gray-50">
<header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
<div className="font-medium">Panel</div>
<div className="text-sm text-gray-500">v0.1.0</div>
</header>
<section className="container-page">
<AppRoutes />
<Outlet />
</section>
</main>
</div>
)
}


function SideLink({ to, icon, children }: { to: string; icon?: React.ReactNode; children: React.ReactNode }) {
return (
<NavLink
to={to}
className={({ isActive }) =>
`flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-brand-700' : 'text-gray-700'}`
}
end
>
{icon}
{children}
</NavLink>
)
}