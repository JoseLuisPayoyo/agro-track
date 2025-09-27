import RightNav from './RightNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_280px]">
      <main className="p-4 lg:p-6">{children}</main>
      <aside className="border-l bg-white">
        <RightNav />
      </aside>
    </div>
  )
}
