import React from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripHTML } from "@/utils/helper";

type RelatedProductsSectionProps = {
  relatedProducts: any[];
  isLoading: boolean;
};

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  relatedProducts,
  isLoading,
}) => {
  return (
    <section className="w-full py-8">
      <div className="container m-auto">
        <div className="products-header-filter">
          <div className="le-info">
            <h3>Related products</h3>
          </div>
        </div>

        {!isLoading && relatedProducts?.length ? (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-1">
              {relatedProducts?.map((item: any) => (
                <CarouselItem
                  key={item?.id}
                  className="max-w-[260px] pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <ProductCard
                      id={item?.id}
                      productName={item?.productName}
                      productImages={item?.productImages}
                      shortDescription={
                        item?.shortDescription
                          ? stripHTML(item?.shortDescription)
                          : "-"
                      }
                      offerPrice={item?.offerPrice}
                      productPrice={item?.productPrice}
                      onView={() => {}}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : null}
      </div>
    </section>
  );
};

export default RelatedProductsSection;
