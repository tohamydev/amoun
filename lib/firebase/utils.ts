import { db } from "@/lib/firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import type { Product, Category } from "@/lib/i18n/types"

export async function getProducts(locale = "en"): Promise<Product[]> {
  const productsSnapshot = await getDocs(collection(db, "products"))
  return productsSnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name[locale] || data.name.en,
      description: data.description[locale] || data.description.en,
      image: data.image,
      categoryId: data.categoryId,
      category: data.category,
      pdfUrl: data.pdfUrl,
      pdfType: data.pdfType,
    } as Product
  })
}

export async function getCategories(locale = "en"): Promise<Category[]> {
  const categoriesSnapshot = await getDocs(collection(db, "categories"))
  return categoriesSnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name[locale] || data.name.en,
      image: data.image,
      slug: data.slug,
    } as Category
  })
}

export async function createProduct(product: Omit<Product, "id">) {
  const id = uuidv4()
  await setDoc(doc(db, "products", id), {
    ...product,
    id,
  })
  return id
}

export async function createCategory(category: Omit<Category, "id">) {
  const id = uuidv4()
  await setDoc(doc(db, "categories", id), {
    ...category,
    id,
  })
  return id
}
