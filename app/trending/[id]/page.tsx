"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  useProductById,
  useOneWithProductPrice,
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
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useMe } from "@/apis/queries/user.queries";
import { useQueryClient } from "@tanstack/react-query";
import Footer from "@/components/shared/Footer";
// import Image from "next/image";
// import EmailIcon from "@/public/images/email.svg";
// import PhoneCallIcon from "@/public/images/phone-call.svg";
import VendorSection from "@/components/modules/productDetails/VendorSection";

const ProductDetailsPage = () => {
  const queryClient = useQueryClient();
  const searchParams = useParams();
  const searchQuery = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const deviceId = getOrCreateDeviceId() || "";
  const [activeTab, setActiveTab] = useState("description");
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const type = searchQuery?.get("type");
  const otherSellerId = searchQuery?.get("sellerId");
  const otherProductId = searchQuery?.get("productId");

  const me = useMe();
  const productQueryById = useProductById(
    {
      productId: searchParams?.id ? (searchParams?.id as string) : "",
      userId: me.data?.data?.id,
    },
    !!searchParams?.id && !otherSellerId && !otherProductId,
  );
  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 10,
      deviceId,
    },
    !haveAccessToken,
  );
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 10,
    },
    haveAccessToken,
  );
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const productQueryByOtherSeller = useOneWithProductPrice(
    {
      productId: otherProductId ? Number(otherProductId) : 0,
      adminId: otherSellerId ? Number(otherSellerId) : 0,
    },
    !!otherProductId && !!otherSellerId,
  );

  const productDetails = !otherSellerId
    ? productQueryById.data?.data
    : productQueryByOtherSeller.data?.data;
  const productInWishlist = !otherSellerId
    ? productQueryById.data?.inWishlist
    : productQueryByOtherSeller.data?.inWishlist;
  const otherSellerDetails = !otherSellerId
    ? productQueryById.data?.otherSeller
    : productQueryByOtherSeller.data?.otherSeller;

  const calculateTagIds = useMemo(
    () => productDetails?.productTags.map((item: any) => item.tagId).join(","),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productDetails?.productTags?.length],
  );

  const handleAddToCart = async (
    quantity: number,
    actionType: "add" | "remove",
  ) => {
    if (haveAccessToken) {
      if (!productDetails?.product_productPrice?.[0]?.id) {
        toast({
          title: `Oops! Something went wrong`,
          description: "Product Price Id not found",
          variant: "danger",
        });
        return;
      }
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId: productDetails?.product_productPrice?.[0]?.id,
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
      if (!productDetails?.product_productPrice?.[0]?.id) {
        toast({
          title: `Oops! Something went wrong`,
          description: "Product Price Id not found",
          variant: "danger",
        });
        return;
      }
      const response = await updateCartByDevice.mutateAsync({
        productPriceId: productDetails?.product_productPrice?.[0]?.id,
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

  const handleDeleteFromWishlist = async () => {
    const response = await deleteFromWishlist.mutateAsync({
      productId: Number(searchParams?.id),
    });
    if (response.status) {
      toast({
        title: "Item removed from wishlist",
        description: "Check your wishlist for more details",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "product-by-id",
          { productId: searchParams?.id, userId: me.data?.data?.id },
        ],
      });
    } else {
      toast({
        title: "Item not removed from wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!!productInWishlist) {
      handleDeleteFromWishlist();
      return;
    }

    const response = await addToWishlist.mutateAsync({
      productId: Number(searchParams?.id),
    });
    if (response.status) {
      toast({
        title: "Item added to wishlist",
        description: "Check your wishlist for more details",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "product-by-id",
          { productId: searchParams?.id, userId: me.data?.data?.id },
        ],
      });
    } else {
      toast({
        title: response.message || "Item not added to wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (type) setActiveTab(type);
  }, [type]);

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  return (
    <>
      <div className="body-content-s1">
        <div className="product-view-s1-left-right type2">
          <div className="container m-auto px-3">
            <ProductImagesCard
              productDetails={productDetails}
              onAdd={() => handleAddToCart(1, "add")}
              onToCart={handleCartPage}
              onToCheckout={handleCheckoutPage}
              hasItem={hasItemByUser || hasItemByDevice}
              isLoading={
                !(
                  productQueryById.isFetched ||
                  productQueryByOtherSeller.isFetched
                )
              }
              onWishlist={handleAddToWishlist}
              haveAccessToken={haveAccessToken}
              inWishlist={!!productInWishlist}
              askForPrice={
                productDetails?.product_productPrice?.[0]?.askForPrice
              }
            />
            <ProductDescriptionCard
              productId={searchParams?.id ? (searchParams?.id as string) : ""}
              productName={productDetails?.productName}
              brand={productDetails?.brand?.brandName}
              productPrice={productDetails?.productPrice}
              offerPrice={productDetails?.product_productPrice?.[0]?.offerPrice}
              skuNo={productDetails?.skuNo}
              category={productDetails?.category?.name}
              productTags={productDetails?.productTags}
              productShortDescription={
                productDetails?.product_productShortDescription
              }
              productQuantity={
                getProductQuantityByUser || getProductQuantityByDevice
              }
              productReview={productDetails?.productReview}
              onAdd={handleAddToCart}
              isLoading={
                !otherSellerId && !otherProductId
                  ? !productQueryById.isFetched
                  : !productQueryByOtherSeller.isFetched
              }
              soldBy={`${productDetails?.product_productPrice?.[0]?.adminDetail?.firstName}
                ${productDetails?.product_productPrice?.[0]?.adminDetail?.lastName}`}
              soldByTradeRole={
                productDetails?.product_productPrice?.[0]?.adminDetail
                  ?.tradeRole
              }
              userId={me.data?.data?.id}
              sellerId={
                productDetails?.product_productPrice?.[0]?.adminDetail?.id
              }
              haveOtherSellers={!!otherSellerDetails?.length}
              productProductPrice={
                productDetails?.product_productPrice?.[0]?.productPrice
              }
              consumerDiscount={
                productDetails?.product_productPrice?.[0]?.consumerDiscount
              }
              askForPrice={
                productDetails?.product_productPrice?.[0]?.askForPrice
              }
              otherSellerDetails={otherSellerDetails}
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
                        value={
                          productDetails?.description || "No Description found"
                        }
                        readOnly
                        modules={{ toolbar: false }}
                        className="readonly-quill"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="specification" className="mt-0">
                    <div className="w-full bg-white">
                      {!productDetails?.product_productSpecification?.length ? (
                        <div className="specification-sec">
                          <h2>No specification found</h2>
                        </div>
                      ) : null}
                      {productDetails?.product_productSpecification?.length ? (
                        <div className="specification-sec">
                          <h2>Specification</h2>
                          <table className="specification-table">
                            <tbody>
                              <tr className="grid grid-cols-2">
                                {productDetails?.product_productSpecification?.map(
                                  (item: {
                                    id: number;
                                    label: string;
                                    specification: string;
                                  }) => (
                                    <div key={item?.id}>
                                      <th>{item?.label}</th>
                                      <td>{item?.specification}</td>
                                    </div>
                                  ),
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                    </div>
                  </TabsContent>
                  <TabsContent value="vendor" className="mt-0">
                    <div className="w-full bg-white">
                      <VendorSection
                        adminId={
                          productDetails?.product_productPrice?.[0]?.adminId
                        }
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-0">
                    <div className="w-full border border-solid border-gray-300 bg-white p-5">
                      <ReviewSection
                        productId={searchParams?.id as string}
                        hasAccessToken={haveAccessToken}
                        productReview={productDetails?.productReview}
                        isCreator={
                          me?.data?.data?.id === productDetails?.adminId
                        }
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="qanda" className="mt-0">
                    <div className="w-full border border-solid border-gray-300 bg-white p-5">
                      <QuestionsAnswersSection
                        hasAccessToken={haveAccessToken}
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
                    <Image src="/images/suggestion-pic1.png" alt="suggested-preview" />
                  </div>
                </div> */}
                <SameBrandSection
                  productDetails={productDetails}
                  productId={searchParams?.id as string}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="product-view-s1-details-more-suggestion-sliders">
          <RelatedProductsSection
            calculateTagIds={calculateTagIds}
            productId={searchParams?.id as string}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
