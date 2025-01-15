import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <a href="/admin" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Dashboard</a>
          <a href="/admin/products" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Products</a>
          <a href="/admin/partners" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Partners</a>
          <a href="/admin/images" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Images</a>
          <a href="/admin/logo" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Logo</a>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
}

