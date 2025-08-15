import { Suspense } from "react"
import CategoryClient from "./CategoryClient"
import LoadingSpinner from "@/components/LoadingSpinner"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
  pdfUrl?: string
  pdfType?: "upload" | "link"
}

interface Category {
  id: string
  name: { en: string; ar: string }
  slug: string
}

async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    console.log("[v0] Fetching products for category slug:", categorySlug)

    const allProductsRef = collection(db, "products")
    const allProductsSnapshot = await getDocs(allProductsRef)
    const allProducts = allProductsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[]

    console.log("[v0] All products in database:", allProducts)
    console.log(
      "[v0] All product categories:",
      allProducts.map((p) => ({ id: p.id, category: p.category })),
    )

    const productsRef = collection(db, "products")
    const q = query(productsRef, where("category", "==", categorySlug))
    const querySnapshot = await getDocs(q)

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[]

    console.log("[v0] Found products for category", categorySlug, ":", products.length)
    console.log("[v0] Matching products:", products)
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

async function getCategoryName(slug: string): Promise<{ en: string; ar: string }> {
  try {
    console.log("[v0] Fetching category name for slug:", slug)

    const categoriesRef = collection(db, "categories")
    const q = query(categoriesRef, where("slug", "==", slug))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.docs.length > 0) {
      const category = querySnapshot.docs[0].data() as Category
      console.log("[v0] Found category:", category.name)
      return category.name
    }

    const fallbackName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/([A-Z])/g, " $1")
    console.log("[v0] Using fallback name:", fallbackName)

    return {
      en: fallbackName,
      ar: "المنتجات",
    }
  } catch (error) {
    console.error("Error fetching category name:", error)
    return {
      en: "Products",
      ar: "المنتجات",
    }
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [products, categoryName] = await Promise.all([getProductsByCategory(params.slug), getCategoryName(params.slug)])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryClient products={products} categoryName={categoryName} slug={params.slug} />
    </Suspense>
  )
}
