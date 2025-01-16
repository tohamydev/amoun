export interface Translation {
  en: string;
  ar: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: Translation;
  description: Translation;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: Translation;
  image: string;
  slug: string;
}

