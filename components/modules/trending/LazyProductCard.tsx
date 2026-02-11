"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TrendingProduct } from "@/utils/types/common.types";
import SkeletonProductCardLoader from "@/components/shared/SkeletonProductCardLoader";

// Lazy load the actual ProductCard component
const ProductCard = dynamic(
  () => import("./ProductCard"),
  {
    loading: () => <SkeletonProductCardLoader />,
    ssr: false,
  }
);

type LazyProductCardProps = {
  item: TrendingProduct;
  productVariants?: any[];
  onWishlist: () => void;
  inWishlist?: boolean;
  haveAccessToken: boolean;
  isInteractive?: boolean;
  isSelectable?: boolean;
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  productQuantity?: number;
  productVariant?: any;
  cartId?: number;
  isAddedToCart?: boolean;
  serviceId?: number;
  serviceCartId?: number;
  relatedCart?: any;
  sold?: number;
};

const LazyProductCard: React.FC<LazyProductCardProps> = (props) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before the element is visible
        threshold: 0.01,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [shouldLoad]);

  return (
    <div ref={cardRef} className="w-full">
      {shouldLoad ? (
        <ProductCard {...props} />
      ) : (
        <SkeletonProductCardLoader />
      )}
    </div>
  );
};

export default LazyProductCard;
