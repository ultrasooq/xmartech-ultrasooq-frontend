"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TrendingProduct } from "@/utils/types/common.types";
import SkeletonProductCardLoader from "@/components/shared/SkeletonProductCardLoader";

const ProductCard = dynamic(
  () => import("./ProductCard"),
  {
    loading: () => <SkeletonProductCardLoader />,
    ssr: false,
  }
);

interface LazyProductListProps {
  products: TrendingProduct[];
  onWishlist: (productId: number, wishlistArr?: any[]) => void;
  haveAccessToken: boolean;
  isSelectable?: boolean;
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  productVariants?: any[];
  isInteractive?: boolean;
  [key: string]: any;
}

const LazyProductList: React.FC<LazyProductListProps> = ({
  products,
  onWishlist,
  haveAccessToken,
  isSelectable,
  selectedIds,
  onSelectedId,
  productVariants,
  isInteractive,
  ...otherProps
}) => {
  const [visibleCount, setVisibleCount] = useState(8); // Initial visible items
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < products.length) {
          setIsLoadingMore(true);
          // Load next batch with a small delay for smooth UX
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 8, products.length));
            setIsLoadingMore(false);
          }, 100);
        }
      },
      {
        rootMargin: '200px', // Start loading when 200px away
        threshold: 0.1,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [visibleCount, products.length]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <>
      <div className="product-list-s1">
        {visibleProducts.map((item: TrendingProduct) => (
          <ProductCard
            key={item.id}
            item={item}
            onWishlist={() => onWishlist(item.id, item.product_wishlist)}
            inWishlist={item?.product_wishlist?.find(
              (el: any) => el?.userId === otherProps.me?.data?.data?.id,
            )}
            haveAccessToken={haveAccessToken}
            isSelectable={isSelectable}
            selectedIds={selectedIds}
            onSelectedId={onSelectedId}
            productVariants={productVariants}
            isInteractive={isInteractive}
            {...otherProps}
          />
        ))}
      </div>
      
      {/* Observer target for infinite scroll */}
      {hasMore && (
        <div ref={observerTarget} className="w-full py-4">
          {isLoadingMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonProductCardLoader key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LazyProductList;
