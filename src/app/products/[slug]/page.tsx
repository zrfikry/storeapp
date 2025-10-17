import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { t } from '_/i18n'
import Button from '_/modules/common/components/Button'
import { getProduct } from '_/modules/product/api'
import type { Product } from '_/modules/product/dto'
import AddToCartButton from '_/modules/transaction/components/AddToCartButton'
import {formatCurrency} from '_/modules/transaction/helpers'

/**
 * Product detail page that fetches the product by id extracted from slug.
 */
const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const id = Number(params.slug.split('-')[0])

  if (Number.isNaN(id) || id <= 0) {
    notFound()
  }

  let product: Product | null = null
  try {
    product = await getProduct(id)
  } catch (e) {
    // If the product cannot be fetched, show 404 page
    notFound()
  }

  if (!product) {
    notFound()
  }

  const image = product.images?.[0]

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-4 row-start-2 items-start w-full max-w-4xl">
        <Link href="/">
          <Button variant="ghost">{t('common.back')}</Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full bg-[color:var(--surface)]/70 border border-[color:var(--surface-border)]/60 p-4 rounded-lg">
          <div className="aspect-square rounded overflow-hidden bg-[color:var(--surface)]/30">
            {image ? (
              <Image src={image} alt={product.title} width={800} height={800} unoptimized className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-xs text-[color:var(--muted)]">{t('common.noImage')}</div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">{product.title}</h1>
            <div className="text-lg font-medium text-[color:var(--foreground)]">{formatCurrency(product.price)}</div>
            <div className="text-xs inline-flex items-center gap-2 text-[color:var(--muted)]">
              <span className="rounded bg-[color:var(--surface)]/70 border border-[color:var(--surface-border)]/60 px-2 py-1">{product.category?.name || t('common.uncategorized')}</span>
            </div>
            <p className="text-sm text-[color:var(--muted)] leading-relaxed whitespace-pre-line">{product.description}</p>
            <div className="pt-2">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetailPage
