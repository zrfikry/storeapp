import Image from "next/image";
import { getProducts } from "_/modules/product/api";
import type { Product } from "_/modules/product/dto";
import ProductCard from "_/modules/product/components/ProductCard";

/**
 * Home page displaying a grid of latest products.
 */
export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProducts({ limit: 8, offset: 0 });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-5xl">
        <section className="w-full">
          <h2 className="text-lg font-medium mb-3">Latest Products</h2>
          {products.length === 0 ? (
            <p className="text-sm text-gray-500">No products to show right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
