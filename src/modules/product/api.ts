import { http } from "_/lib/http";
import type { Product, CreateProduct, UpdateProduct } from "./dto";

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
  const images = p.images && p.images.length > 0 ? p.images : (p.thumbnail ? [p.thumbnail] : []);
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: Number(p.price ?? 0),
    images,
    category: {
      id: 0,
      name: p.category ?? "",
      image: p.thumbnail ?? images[0] ?? "",
    },
  };
}

/**
 * Fetch a list of products from DummyJSON, optionally searching by title and paginating.
 * @param params Optional filters and pagination (limit, offset, title).
 * @returns Array of mapped products.
 */
export async function getProducts(params?: {
  limit?: number;
  offset?: number; // mapped to DummyJSON 'skip'
  title?: string; // when provided, use /products/search?q=
  price_min?: number; // not supported in DummyJSON, ignored
  price_max?: number; // not supported in DummyJSON, ignored
  categoryId?: number; // not directly supported without slug, ignored here
}): Promise<Product[]> {
  const { limit, offset, title } = params || {};

  if (title && title.trim().length > 0) {
    const { data } = await http.get<{ products: DummyProduct[] }>(
      `https://dummyjson.com/products/search`,
      { params: { q: title, limit, skip: offset } }
    );
    return (data.products || []).map(mapDummyToProduct);
  }

  const { data } = await http.get<{ products: DummyProduct[] }>(
    `https://dummyjson.com/products`,
    { params: { limit, skip: offset } }
  );
  return (data.products || []).map(mapDummyToProduct);
}

/**
 * Fetch a single product by id from DummyJSON.
 * @param id The product id.
 * @returns The mapped Product.
 */
export async function getProduct(id: number): Promise<Product> {
  const { data } = await http.get<DummyProduct>(`https://dummyjson.com/products/${id}`);
  return mapDummyToProduct(data);
}

// The following mutating endpoints are not supported by DummyJSON in a persistent way for this app.
// To keep API surface, we throw to indicate unsupported operations.
/**
 * Unsupported: Create a product (DummyJSON is read-only for this demo).
 * @throws Always throws to indicate unsupported operation.
 */
export async function createProduct(_data: CreateProduct, _token?: string): Promise<Product> {
  throw new Error("createProduct is not supported with DummyJSON data source");
}

/**
 * Unsupported: Update a product (DummyJSON is read-only for this demo).
 * @throws Always throws to indicate unsupported operation.
 */
export async function updateProduct(_id: number, _data: UpdateProduct, _token?: string): Promise<Product> {
  throw new Error("updateProduct is not supported with DummyJSON data source");
}

/**
 * Unsupported: Delete a product (DummyJSON is read-only for this demo).
 * @throws Always throws to indicate unsupported operation.
 */
export async function deleteProduct(_id: number, _token?: string): Promise<void> {
  throw new Error("deleteProduct is not supported with DummyJSON data source");
}

/**
 * Fetch products by category from DummyJSON.
 * Note: The current signature accepts a numeric categoryId for backward compatibility.
 * @param categoryId Category identifier (used as path segment).
 * @param params Optional pagination.
 * @returns Array of mapped products.
 */
export async function getProductsByCategory(
  categoryId: number,
  params?: { limit?: number; offset?: number }
): Promise<Product[]> {
  const { limit, offset } = params || {};
  const { data } = await http.get<{ products: DummyProduct[] }>(
    `https://dummyjson.com/products/category/${categoryId}`,
    { params: { limit, skip: offset } }
  );
  return (data.products || []).map(mapDummyToProduct);
}
