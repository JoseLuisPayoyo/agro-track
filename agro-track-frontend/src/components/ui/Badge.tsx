export function Badge({ children, tone = 'success' }: { children: React.ReactNode; tone?: 'success' | 'warning' | 'danger' }) {
const map = { success: 'badge-success', warning: 'badge-warning', danger: 'badge-danger' }
return <span className={map[tone]}>{children}</span>
}