/**
 * @file SkeletonProductCardLoader - Loading placeholder for product cards.
 * @description Renders a skeleton layout mimicking a product card with one large
 * image placeholder and four text line placeholders. Used while product data loads.
 *
 * @dependencies
 *   - @/components/ui/skeleton (Skeleton) - Pulsing placeholder component.
 */
import React from "react";
import { Skeleton } from "../ui/skeleton";

/** Skeleton placeholder matching a product card layout. */
const SkeletonProductCardLoader = () => {
  return (
    <div className="h-80 w-full space-y-2">
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
    </div>
  );
};

export default SkeletonProductCardLoader;
