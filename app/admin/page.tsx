"use client"

import { useState, useEffect } from "react"
import AdminLogin from "@/components/AdminLogin"
import CategoryList from "@/components/CategoryList"
import CategoryForm from "@/components/CategoryForm"
import ProductTable from "@/components/ProductTable"
import ProductForm from "@/components/ProductForm"
import InsertDummyData from "@/components/InsertDummyData"
import { db } from "@/lib/firebase"
import { collection, doc, deleteDoc, updateDoc, addDoc, getDocs } from "firebase/firestore"
import LoadingSpinner from "@/components/LoadingSpinner"
import Link from "next/link"
import { Home, LogOut } from "lucide-react"

interface Category {
  id: string
  name: { en: string; ar: string }
  slug: string
  image: string
}

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
  hidden?: boolean
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("categories")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const [isProductFormOpen, setIsProductFormOpen] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = () => {
      const isAuth = localStorage.getItem("adminAuthenticated")
      const loginTime = localStorage.getItem("adminLoginTime")

      if (isAuth === "true" && loginTime) {
        const timeDiff = Date.now() - Number.parseInt(loginTime)
        const hoursDiff = timeDiff / (1000 * 60 * 60)

        // Session expires after 24 hours
        if (hoursDiff < 24) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem("adminAuthenticated")
          localStorage.removeItem("adminLoginTime")
        }
      }
    }

    checkAuthStatus()
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const categoriesSnapshot = await getDocs(collection(db, "categories"))
      const productsSnapshot = await getDocs(collection(db, "products"))

      const fetchedCategories = categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category)
      const fetchedProducts = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product)

      setCategories(fetchedCategories)
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load data. Please try refreshing the page.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminLoginTime")
    setIsAuthenticated(false)
  }

  const handleAddCategory = async (category: Omit<Category, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "categories"), category)
      const newCategory = { id: docRef.id, ...category }
      setCategories([...categories, newCategory])
      setIsCategoryFormOpen(false)
    } catch (error) {
      console.error("Error adding category:", error)
      setError("Failed to add category. Please try again.")
    }
  }

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      const { id, ...categoryData } = updatedCategory
      await updateDoc(doc(db, "categories", id), categoryData)
      setCategories(categories.map((cat) => (cat.id === id ? updatedCategory : cat)))
      setIsCategoryFormOpen(false)

      // Update associated products
      const updatedProducts = products.map((product) => {
        if (product.category === editingCategory?.slug) {
          return { ...product, category: updatedCategory.slug }
        }
        return product
      })
      setProducts(updatedProducts)

      // Update products in Firestore
      for (const product of updatedProducts) {
        if (product.category === updatedCategory.slug) {
          await updateDoc(doc(db, "products", product.id), { category: updatedCategory.slug })
        }
      }
    } catch (error) {
      console.error("Error updating category:", error)
      setError("Failed to update category. Please try again.")
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this category? This will also delete all associated products.")
    ) {
      try {
        await deleteDoc(doc(db, "categories", id))
        setCategories(categories.filter((cat) => cat.id !== id))

        // Delete associated products
        const associatedProducts = products.filter(
          (product) => product.category === categories.find((cat) => cat.id === id)?.slug,
        )
        for (const product of associatedProducts) {
          await deleteDoc(doc(db, "products", product.id))
        }
        setProducts(products.filter((product) => !associatedProducts.includes(product)))
      } catch (error) {
        console.error("Error deleting category:", error)
        setError("Failed to delete category. Please try again.")
      }
    }
  }

  const handleAddProduct = async (product: Omit<Product, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product)
      const newProduct = { id: docRef.id, ...product }
      setProducts([...products, newProduct])
      setIsProductFormOpen(false)
    } catch (error) {
      console.error("Error adding product:", error)
      setError("Failed to add product. Please try again.")
    }
  }

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const { id, ...productData } = updatedProduct
      await updateDoc(doc(db, "products", id), productData)
      setProducts(products.map((prod) => (prod.id === id ? updatedProduct : prod)))
      setIsProductFormOpen(false)
    } catch (error) {
      console.error("Error updating product:", error)
      setError("Failed to update product. Please try again.")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id))
      setProducts(products.filter((product) => product.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
      setError("Failed to delete product. Please try again.")
    }
  }

  const handleToggleProductVisibility = async (id: string) => {
    try {
      const productRef = doc(db, "products", id)
      const product = products.find((p) => p.id === id)
      if (product) {
        await updateDoc(productRef, {
          hidden: !product.hidden,
        })
        setProducts(products.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p)))
      }
    } catch (error) {
      console.error("Error toggling product visibility:", error)
      setError("Failed to update product visibility. Please try again.")
    }
  }

  if (loading && isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      <div className="mb-6">
        <Link
          href="/admin/dashboard"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Home className="w-4 h-4 mr-2" />
          Home Content Dashboard
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh Data
          </button>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => setActiveTab("categories")}
          className={`mr-2 px-4 py-2 rounded ${activeTab === "categories" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded ${activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Products
        </button>
      </div>

      {activeTab === "categories" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <button
            onClick={() => {
              setEditingCategory(null)
              setIsCategoryFormOpen(true)
            }}
            className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Category
          </button>
          <CategoryList
            categories={categories}
            onEdit={(category) => {
              setEditingCategory(category)
              setIsCategoryFormOpen(true)
            }}
            onDelete={handleDeleteCategory}
          />
          <CategoryForm
            category={editingCategory || undefined}
            onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
            onCancel={() => {
              setEditingCategory(null)
              setIsCategoryFormOpen(false)
            }}
            isOpen={isCategoryFormOpen}
          />
        </div>
      )}

      {activeTab === "products" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <button
            onClick={() => {
              setEditingProduct(null)
              setIsProductFormOpen(true)
            }}
            className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Product
          </button>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductTable
              products={products}
              onDelete={handleDeleteProduct}
              onToggleVisibility={handleToggleProductVisibility}
              onEdit={(product) => {
                setEditingProduct(product)
                setIsProductFormOpen(true)
              }}
            />
          )}
          <ProductForm
            product={editingProduct || undefined}
            categories={categories}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setEditingProduct(null)
              setIsProductFormOpen(false)
            }}
            isOpen={isProductFormOpen}
          />
        </div>
      )}

      <InsertDummyData />
    </div>
  )
}
