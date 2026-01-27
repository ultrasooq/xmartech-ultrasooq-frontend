/**
 * @file SimilarProductsSection.tsx
 * @description A placeholder carousel section for displaying similar products.
 *   Currently renders empty product card slots (gray placeholders) in a
 *   horizontally-scrolling carousel. Intended to be populated with actual
 *   similar product data in a future implementation.
 *
 * @props None
 *
 * @behavior
 *   - Renders a "Similar products" heading and a shadcn Carousel with 10
 *     placeholder items.
 *   - Carousel is configured with start alignment and infinite loop.
 *   - Each placeholder is a gray rounded box of fixed dimensions.
 *   - Responsive: shows 2 items on mobile up to 5 on large screens.
 *
 * @dependencies
 *   - Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
 *     (shadcn/Embla) - Carousel components.
 */
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SimilarProductsSection = () => {
  return (
    <section className="w-full py-8">
      <div className="container m-auto">
        <div className="products-header-filter">
          <div className="le-info">
            <h3>Similar products</h3>
          </div>
        </div>
        {/* <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> */}
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="max-w-[260px] pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">{/* <ProductCard /> */}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* </div> */}
      </div>
    </section>
  );
};

export default SimilarProductsSection;
