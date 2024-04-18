"use client";
import React, { useEffect, useState } from "react";
import { useFetchProductById } from "@/apis/queries/product.queries";
import SimilarProductsSection from "@/components/modules/productDetails/SimilarProductsSection";
import RelatedProductsSection from "@/components/modules/productDetails/RelatedProductsSection";
import DescriptionSection from "@/components/modules/productDetails/DescriptionSection";
import SameBrandSection from "@/components/modules/productDetails/SameBrandSection";
import ProductDescriptionCard from "@/components/modules/productDetails/ProductDescriptionCard";
import ProductImagesCard from "@/components/modules/productDetails/ProductImagesCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCartListByUserId,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const BuyGroupPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [activeProductId, setActiveProductId] = useState<string | null>();

  const productQueryById = useFetchProductById(
    activeProductId ? activeProductId : "",
    !!activeProductId,
  );
  const cartListByUser = useCartListByUserId({
    page: 1,
    limit: 10,
  });
  const updateCartWithLogin = useUpdateCartWithLogin();

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let productId = params.get("id");
    setActiveProductId(productId);
  }, []);

  const productDetails = productQueryById.data?.data;

  const handleAddToCart = async (quantity: number) => {
    console.log("add to cart:", quantity);
    // return;
    const response = await updateCartWithLogin.mutateAsync({
      productId: Number(activeProductId),
      quantity,
    });

    if (response.status) {
      toast({
        title: "Item added to cart",
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

  const handleCartPage = () => router.push("/cart-list");

  return (
    <div className="body-content-s1">
      <div className="product-view-s1-left-right type2">
        <div className="container m-auto px-3">
          <ProductImagesCard
            productDetails={productDetails}
            onAdd={() => handleAddToCart(1)}
            onNavigate={handleCartPage}
            hasItem={
              !!cartListByUser.data?.data?.find(
                (item: any) => item.productId === Number(activeProductId),
              )
            }
          />
          <ProductDescriptionCard
            productName={productDetails?.productName}
            brand={productDetails?.brand?.brandName}
            productPrice={productDetails?.productPrice}
            offerPrice={productDetails?.offerPrice}
            skuNo={productDetails?.skuNo}
            category={productDetails?.category?.name}
            productTags={productDetails?.productTags}
            productQuantity={
              cartListByUser.data?.data?.find(
                (item: any) => item.productId === Number(activeProductId),
              )?.quantity
            }
            onAdd={handleAddToCart}
          />
        </div>
      </div>
      <div className="product-view-s1-left-details-with-right-suggestion">
        <div className="container m-auto px-3">
          <div className="product-view-s1-left-details">
            <div className="theme-tab-s1">
              <ul>
                <li>
                  <a href="#" className="active">
                    Description
                  </a>
                </li>
                <li>
                  <a href="#">Specification</a>
                </li>
                <li>
                  <a href="#">Vendor</a>
                </li>
                <li>
                  <a href="#">Reviews</a>
                </li>
                <li>
                  <a href="#">Questions and Answers</a>
                </li>
                <li>
                  <a href="#">More Offers</a>
                </li>
              </ul>
            </div>

            <div className="w-full">
              <Tabs defaultValue="description">
                <TabsList className="flex h-auto w-full flex-wrap gap-x-6 rounded-none bg-transparent px-0 sm:grid sm:min-h-[80px] sm:w-[560px] sm:grid-cols-3">
                  <TabsTrigger
                    value="description"
                    className="w-full rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white sm:w-auto"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="specification"
                    className="w-full rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white sm:w-auto"
                  >
                    Specification
                  </TabsTrigger>
                  <TabsTrigger
                    value="vendor"
                    className="w-full rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white sm:w-auto"
                  >
                    Vendor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0">
                  <div className="w-full bg-white">
                    <DescriptionSection />
                  </div>
                </TabsContent>
                <TabsContent value="specification" className="mt-0">
                  <div className="w-full bg-white">
                    <p>Specification</p>
                  </div>
                </TabsContent>
                <TabsContent value="vendor" className="mt-0">
                  <div className="w-full bg-white">
                    <p>Vendor</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="product-view-s1-details-right-suggestion">
            <div className="suggestion-lists-s1">
              <div className="suggestion-list-s1-col">
                <div className="suggestion-banner">
                  <img src="/images/suggestion-pic1.png" alt="" />
                </div>
              </div>
              <SameBrandSection />
            </div>
          </div>
        </div>
      </div>

      <div className="product-view-s1-details-more-suggestion-sliders">
        <RelatedProductsSection />
        <SimilarProductsSection />
      </div>
    </div>
  );
};

export default BuyGroupPage;
