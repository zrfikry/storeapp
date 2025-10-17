import { http } from '_/lib/http'

import type { Product } from './dto'

// DummyJSON product type (partial)
type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  images?: string[];
  thumbnail?: string;
  category?: string;
};

/**
 * Map a DummyJSON product to the app's Product DTO.
 * @param p The DummyJSON product.
 * @returns The mapped Product.
 */
function mapDummyToProduct(p: DummyProduct): Product {
  const images = p.images && p.images.length > 0 ? p.images : (p.thumbnail ? [p.thumbnail] : [])
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: Number(p.price ?? 0),
    images,
    category: {
      id: 0,
      name: p.category ?? '',
      image: p.thumbnail ?? images[0] ?? '',
    },
  }
}

/**
 * Fetch a list of products from DummyJSON, optionally searching by title and paginating.
 * @param params Optional filters and pagination (limit, offset, title).
 * @returns Array of mapped products.
 */
export async function getProducts(params?: {
  limit?: number;
  offset?: number;
  title?: string;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
}): Promise<Product[]> {
  const { limit, offset, title } = params || {}

  if (title && title.trim().length > 0) {
    const { data } = await http.get<{ products: DummyProduct[] }>(
      `https://dummyjson.com/products/search`,
      { params: { q: title, limit, skip: offset } }
    )
    return (data.products || []).map(mapDummyToProduct)
  }

  const { data } = await http.get<{ products: DummyProduct[] }>(
    `https://dummyjson.com/products`,
    { params: { limit, skip: offset } }
  )
  return (data.products || []).map(mapDummyToProduct)
}

/**
 * Fetch a single product by id from DummyJSON.
 * @param id The product id.
 * @returns The mapped Product.
 */
export async function getProduct(id: number): Promise<Product> {
  const { data } = await http.get<DummyProduct>(`https://dummyjson.com/products/${id}`)
  return mapDummyToProduct(data)
}
