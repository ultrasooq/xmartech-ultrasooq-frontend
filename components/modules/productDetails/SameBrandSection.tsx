import React from "react";
import SameBrandProductCard from "./SameBrandProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripHTML } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";

type SameBrandSectionProps = {
  sameBrandProducts: any;
  isLoading: boolean;
};

const SameBrandSection: React.FC<SameBrandSectionProps> = ({
  sameBrandProducts,
  isLoading,
}) => {
  return (
    <div className="suggestion-list-s1-col">
      <div className="suggestion-same-branch-lists-s1">
        <div className="title-headerpart">
          <h3>Same Brand</h3>
        </div>
        <div className="contnet-bodypart min-h-[460px]">
          {isLoading ? <Skeleton className="h-[420px] w-full" /> : null}

          <div className="product-list-s1 outline-style">
            {!isLoading && sameBrandProducts?.length ? (
              <Carousel
                opts={{ align: "start", loop: true }}
                orientation="vertical"
                className="w-full max-w-xs"
              >
                <CarouselContent className="-mt-1 h-[420px]">
                  {sameBrandProducts?.map((item: any) => (
                    <CarouselItem key={item?.id} className="pt-1 md:basis-1/2">
                      <div className="p-1">
                        <SameBrandProductCard
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
                          productReview={item?.productReview}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="top-0" />
                <CarouselNext className="bottom-0" />
              </Carousel>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SameBrandSection;
