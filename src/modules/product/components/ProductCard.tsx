'use client'

import Image from 'next/image'
import React, {useMemo} from 'react'

import { t } from '_/i18n'
import Card from '_/modules/common/components/Card'
import {toSlug} from '_/modules/common/helpers'
import { Product } from '_/modules/product/dto'
import {formatCurrency} from '_/modules/transaction/helpers'

type ProductCardProps = {
  product: Product;
}

/**
 * Display a product card with image, title and price linking to the detail page.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const url = useMemo(() => {
    const slug = toSlug(`${product.id} ${product.title}`)

    return `/products/${slug}`
  }, [product.id, product.title])

  return (
    <Card href={url}>
      <div className="aspect-square overflow-hidden rounded mb-2 bg-white/10">
        {product.images?.[0] ? (
          <Image width={400} height={400} src={product.images[0]} unoptimized alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-xs text-gray-400">{t('common.noImage')}</div>
        )}
      </div>
      <div className="text-sm font-semibold">{product.title}</div>
      <div className="text-sm font-small text-[color:var(--foreground)] line-clamp-2 min-h-[2.5rem]">{formatCurrency(product.price)}</div>
    </Card>
  )
}

export default ProductCard
