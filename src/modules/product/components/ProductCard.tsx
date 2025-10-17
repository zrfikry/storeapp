'use client'

import React, {useMemo} from "react";
import Image from "next/image";
import { Product } from "_/modules/product/dto";
import {toSlug} from "_/modules/common/helpers";
import Card from "_/modules/common/components/Card";

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
          <div className="w-full h-full grid place-items-center text-xs text-gray-400">No image</div>
        )}
      </div>
      <div className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.title}</div>
      <div className="text-sm text-gray-300">{product.price.toFixed(2)}</div>
    </Card>
  )
}

export default ProductCard
