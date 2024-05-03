"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  useFetchProductById,
  useRelatedProducts,
  useSameBrandProducts,
} from "@/apis/queries/product.queries";
// import SimilarProductsSection from "@/components/modules/productDetails/SimilarProductsSection";
import RelatedProductsSection from "@/components/modules/productDetails/RelatedProductsSection";
import SameBrandSection from "@/components/modules/productDetails/SameBrandSection";
import ProductDescriptionCard from "@/components/modules/productDetails/ProductDescriptionCard";
import ProductImagesCard from "@/components/modules/productDetails/ProductImagesCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCartListByDevice,
  useCartListByUserId,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import ReviewSection from "@/components/shared/ReviewSection";
import QuestionsAnswersSection from "@/components/modules/productDetails/QuestionsAnswersSection";

const ProductDetailsPage = () => {
  const searchParams = useParams();
  const searchQuery = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const hasAccessToken = !!getCookie(PUREMOON_TOKEN_KEY);
  const deviceId = getOrCreateDeviceId() || "";
  const [activeTab, setActiveTab] = useState("description");

  const productQueryById = useFetchProductById(
    searchParams?.id ? (searchParams?.id as string) : "",
    !!searchParams?.id,
  );

  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 10,
      deviceId,
    },
    !hasAccessToken,
  );
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 10,
    },
    hasAccessToken,
  );
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const productDetails = productQueryById.data?.data;
  const calculateTagIds = useMemo(
    () => productDetails?.productTags.map((item: any) => item.tagId).join(","),
    [productDetails?.productTags?.length],
  );
  const sameBrandProductsQuery = useSameBrandProducts(
    {
      page: 1,
      limit: 10,
      brandIds: productDetails?.brandId,
    },
    !!productDetails?.brandId,
  );
  const relatedProductsQuery = useRelatedProducts(
    {
      page: 1,
      limit: 10,
      tagIds: calculateTagIds,
    },
    !!calculateTagIds,
  );

  const handleAddToCart = async (
    quantity: number,
    actionType: "add" | "remove",
  ) => {
    console.log("add to cart:", quantity);
    // return;
    if (hasAccessToken) {
      const response = await updateCartWithLogin.mutateAsync({
        productId: Number(searchParams?.id),
        quantity,
      });

      if (response.status) {
        toast({
          title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });

        return response.status;
      }
    } else {
      const response = await updateCartByDevice.mutateAsync({
        productId: Number(searchParams?.id),
        quantity,
        deviceId,
      });
      if (response.status) {
        toast({
          title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
          description: "Check your cart for more details",
          variant: "success",
        });
        return response.status;
      }
    }
  };

  const hasItemByUser = !!cartListByUser.data?.data?.find(
    (item: any) => item.productId === Number(searchParams?.id),
  );

  const hasItemByDevice = !!cartListByDeviceQuery.data?.data?.find(
    (item: any) => item.productId === Number(searchParams?.id),
  );

  const getProductQuantityByUser = cartListByUser.data?.data?.find(
    (item: any) => item.productId === Number(searchParams?.id),
  )?.quantity;

  const getProductQuantityByDevice = cartListByDeviceQuery.data?.data?.find(
    (item: any) => item.productId === Number(searchParams?.id),
  )?.quantity;

  const handleCartPage = () => router.push("/cart");
  const handleCheckoutPage = async () => {
    if (getProductQuantityByUser === 1 || getProductQuantityByDevice === 1) {
      router.push("/checkout");
      return;
    }

    const response = await handleAddToCart(1, "add");
    if (response) {
      setTimeout(() => {
        router.push("/checkout");
      }, 2000);
    }
  };

  useEffect(() => {
    const type = searchQuery?.get("type");
    if (type) setActiveTab(type);
  }, [searchQuery?.get("type")]);

  return (
    <div className="body-content-s1">
      <div className="product-view-s1-left-right type2">
        <div className="container m-auto px-3">
          <ProductImagesCard
            productDetails={productDetails}
            onAdd={() => handleAddToCart(1, "add")}
            onToCart={handleCartPage}
            onToCheckout={handleCheckoutPage}
            hasItem={hasItemByUser || hasItemByDevice}
            isLoading={!productQueryById.isFetched}
          />
          <ProductDescriptionCard
            productName={productDetails?.productName}
            brand={productDetails?.brand?.brandName}
            productPrice={productDetails?.productPrice}
            offerPrice={productDetails?.offerPrice}
            skuNo={productDetails?.skuNo}
            category={productDetails?.category?.name}
            productTags={productDetails?.productTags}
            productShortDescription={productDetails?.shortDescription}
            productQuantity={
              getProductQuantityByUser || getProductQuantityByDevice
            }
            productReview={productQueryById?.data?.data?.productReview}
            onAdd={handleAddToCart}
            isLoading={!productQueryById.isFetched}
            soldBy={
              productDetails?.userBy?.tradeRole === "COMPANY"
                ? productDetails?.userBy?.userProfile?.[0]?.companyName
                : productDetails?.userBy?.tradeRole === "FREELANCER"
                  ? `${productDetails?.userBy?.firstName} ${productDetails?.userBy?.lastName}`
                  : null
            }
          />
        </div>
      </div>
      <div className="product-view-s1-left-details-with-right-suggestion">
        <div className="container m-auto px-3">
          <div className="product-view-s1-left-details">
            <div className="w-full">
              <Tabs onValueChange={(e) => setActiveTab(e)} value={activeTab}>
                <TabsList className="flex h-auto w-full flex-wrap rounded-none bg-transparent px-0 sm:grid sm:min-h-[80px] sm:grid-cols-6">
                  <TabsTrigger
                    value="description"
                    className="w-full rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] py-4 text-base font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="specification"
                    className="w-full rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] py-4 text-base font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto"
                  >
                    Specification
                  </TabsTrigger>
                  <TabsTrigger
                    value="vendor"
                    className="w-full rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] py-4 text-base font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto"
                  >
                    Vendor
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="w-full rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] py-4 text-base font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto"
                  >
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger
                    value="qanda"
                    className="w-full rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] py-4 text-base font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto"
                  >
                    Questions
                  </TabsTrigger>
                  <TabsTrigger
                    value="offers"
                    className="w-full rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] py-4 text-base font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto"
                  >
                    More Offers
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0">
                  <div className="w-full bg-white">
                    <ReactQuill
                      theme="snow"
                      value={productDetails?.description}
                      readOnly
                      modules={{ toolbar: false }}
                      className="readonly-quill"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="specification" className="mt-0">
                  <div className="w-full bg-white">
                    <ReactQuill
                      theme="snow"
                      value={productDetails?.specification}
                      readOnly
                      modules={{
                        toolbar: false,
                      }}
                      className="readonly-quill"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="vendor" className="mt-0">
                  <div className="w-full bg-white">
                    <p>Vendor</p>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-0">
                  <div className="w-full border border-solid border-gray-300 bg-white p-5">
                    <ReviewSection
                      productId={searchParams?.id as string}
                      hasAccessToken={hasAccessToken}
                      productReview={
                        productQueryById?.data?.data?.productReview
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="qanda" className="mt-0">
                  <div className="w-full border border-solid border-gray-300 bg-white p-5">
                    <QuestionsAnswersSection
                      hasAccessToken={hasAccessToken}
                      productId={searchParams?.id as string}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="offers" className="mt-0">
                  <div className="w-full bg-white">
                    <p>More Offers</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="product-view-s1-details-right-suggestion">
            <div className="suggestion-lists-s1 mt-3">
              {/* TODO: hide ad section for now */}
              {/* <div className="suggestion-list-s1-col">
            <div className="suggestion-banner">
              <img src="/images/suggestion-pic1.png" alt="" />
            </div>
          </div> */}
              <SameBrandSection
                sameBrandProducts={sameBrandProductsQuery?.data?.data}
                isLoading={!sameBrandProductsQuery?.isFetched}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="product-view-s1-details-more-suggestion-sliders">
        <RelatedProductsSection
          relatedProducts={relatedProductsQuery?.data?.data}
          isLoading={!relatedProductsQuery?.isFetched}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
