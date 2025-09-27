import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import EmployeesPage from './pages/employees/EmployeesPage'
import CertificatesPage from './pages/employees/CertificatesPage'
import CampaignsPage from './pages/campaigns/CampaignsPage'
import FarmsPage from './pages/farms/FarmsPage'
import ParcelsPage from './pages/farms/ParcelsPage'
import WorkPartsPage from './pages/workparts/WorkPartsPage'
import WorkerEntriesPage from './pages/workparts/WorkerEntriesPage'
import CrewsPage from './pages/crews/CrewsPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Dashboard />} />
        <Route path="/empleados" element={<EmployeesPage />} />
        <Route path="/empleados/:employeeId/certificados" element={<CertificatesPage />} />
        <Route path="/campañas" element={<CampaignsPage />} />
        <Route path="/fincas" element={<FarmsPage />} />
        <Route path="/fincas/:farmId/parcelas" element={<ParcelsPage />} />
        <Route path="/cuadrillas" element={<CrewsPage />} />
        <Route path="/partes" element={<WorkPartsPage />} />
        <Route path="/partes/:workPartId/trabajadores" element={<WorkerEntriesPage />} />
      </Routes>
    </Layout>
  )
}
