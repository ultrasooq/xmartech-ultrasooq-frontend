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
  useDeleteCartItem,
} from "@/apis/queries/cart.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId, handleDescriptionParse } from "@/utils/helper";
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
import PlateEditor from "@/components/shared/Plate/PlateEditor";
import ProductCard from "@/components/modules/cartList/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { CartItem } from "@/utils/types/cart.types";
import { useTranslations } from "next-intl";

const ProductDetailsPage = () => {
  const t = useTranslations();
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

  const handleProductUpdateSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["product-by-id"],
    }); // Refetch product details
  };

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
  const deleteCartItem = useDeleteCartItem();
  const [isVisible, setIsVisible] = useState(false); // Initially hidden

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

  const memoizedCartList = useMemo(() => {
    if (cartListByUser.data?.data) {
      setIsVisible(true);
      return cartListByUser.data?.data || [];
    } else if (cartListByDeviceQuery.data?.data) {
      return cartListByDeviceQuery.data?.data || [];
    }
    return [];
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  const handleRemoveItemFromCart = async (cartId: number) => {
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    } else {
      toast({
        title: t("item_not_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "danger",
      });
    }
  };

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

  const [globalQuantity, setGlobalQuantity] = useState(0); // Global state

  useEffect(() => {
    setGlobalQuantity(
      getProductQuantityByUser || getProductQuantityByDevice || 0,
    );
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  const handleQuantity = async (quantity: number, action: "add" | "remove") => {
    const isAddedToCart = hasItemByUser || hasItemByDevice;
    if (isAddedToCart) {
      handleAddToCart(quantity, action);
    } else {
      setGlobalQuantity(quantity);
    }
  };

  const handleAddToCart = async (
    quantity: number,
    actionType: "add" | "remove",
  ) => {
    const minQuantity = productDetails?.product_productPrice?.length ? productDetails.product_productPrice[0]?.minQuantityPerCustomer : null;
    if (actionType == "add" && minQuantity && minQuantity > quantity) {
      toast({
        description: t("min_quantity_must_be_n", { n: minQuantity }),
        variant: "danger",
      })
      return;
    }

    const maxQuantity = productDetails?.product_productPrice?.length ? productDetails.product_productPrice[0]?.maxQuantityPerCustomer : null; 
    if (maxQuantity && maxQuantity < quantity) {
      toast({
        description: t("max_quantity_must_be_n", { n: maxQuantity }),
        variant: "danger",
      })
      return;
    }

    if (actionType == "remove" && minQuantity && minQuantity > quantity) {
      quantity = 0;
    }

    if (haveAccessToken) {
      if (!productDetails?.product_productPrice?.[0]?.id) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
          variant: "danger",
        });
        return;
      }

      if (actionType == "add" && quantity == 0) {
        quantity = minQuantity ?? 1;
      }

      const response = await updateCartWithLogin.mutateAsync({
        productPriceId: productDetails?.product_productPrice?.[0]?.id,
        quantity,
      });

      if (response.status) {
        setGlobalQuantity(quantity);
        toast({
          title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        setIsVisible(true); // Show the div when the button is clicked
        return response.status;
      }
    } else {
      if (!productDetails?.product_productPrice?.[0]?.id) {
        toast({
          title: t("something_went_wrong"),
          description: t("product_price_id_not_found"),
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
        setGlobalQuantity(quantity);
        toast({
          title: actionType == "add" ? t("item_added_to_cart") : t("item_removed_from_cart"),
          description: t("check_your_cart_for_more_details"),
          variant: "success",
        });
        setIsVisible(true); // Show the div when the button is clicked
        return response.status;
      }
    }
  };

  const handleCartPage = async () => {
    if ((getProductQuantityByUser || 0) >= 1 || (getProductQuantityByDevice || 0) >= 1) {
      router.push("/cart");
      return;
    }

    let quantity = globalQuantity;
    if (quantity == 0) {
      const minQuantity = productDetails?.product_productPrice?.length ? productDetails.product_productPrice[0]?.minQuantityPerCustomer : null;
      quantity = minQuantity || 1;
    }
    const response = await handleAddToCart(quantity, "add");
    if (response) {
      setTimeout(() => {
        router.push("/cart");
      }, 2000);
    }
  };
  
  const handleCheckoutPage = async () => {
    if ((getProductQuantityByUser || 0) >= 1 || (getProductQuantityByDevice || 0) >= 1) {
      router.push("/checkout");
      return;
    }

    let quantity = globalQuantity;
    if (quantity == 0) {
      const minQuantity = productDetails?.product_productPrice?.length ? productDetails.product_productPrice[0]?.minQuantityPerCustomer : null;
      quantity = minQuantity || 1;
    }
    const response = await handleAddToCart(quantity, "add");
    if (response) {
      setTimeout(() => {
        router.push("/checkout");
      }, 2000);
    }
  };

  const handelOpenCartLayout = () => {
    setIsVisible(true); // Show the div when the button is clicked
  };

  const handleDeleteFromWishlist = async () => {
    const response = await deleteFromWishlist.mutateAsync({
      productId: Number(searchParams?.id),
    });
    if (response.status) {
      toast({
        title: t("item_removed_from_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
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
        title: t("item_not_removed_from_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
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
        title: t("item_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
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
        title: response.message || t("item_not_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
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
      <title>Store | Ultrasooq</title>
      <div className="body-content-s1 relative">
        <div className="product-view-s1-left-right type2">
          <div className="container m-auto px-3">
            <ProductImagesCard
              productDetails={productDetails}
              onProductUpdateSuccess={handleProductUpdateSuccess} // Pass to child
              onAdd={() => handleAddToCart(globalQuantity, "add")}
              onToCart={handleCartPage}
              onToCheckout={handleCheckoutPage}
              openCartCard={handelOpenCartLayout}
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
              isAddedToCart={hasItemByUser || hasItemByDevice}
              cartQuantity={globalQuantity}
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
              onQuantityChange={handleQuantity}
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
              minQuantity={
                productDetails?.product_productPrice?.[0]?.minQuantityPerCustomer
              }
              maxQuantity={
                productDetails?.product_productPrice?.[0]?.maxQuantityPerCustomer
              }
              otherSellerDetails={otherSellerDetails}
              productPriceArr={productDetails?.product_productPrice}
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
                      className="w-[50%] rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                    >
                      {t("description")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="specification"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                    >
                      {t("specification")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="vendor"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                    >
                      {t("vendor")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                    >
                      {t("reviews")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="qanda"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                    >
                      {t("questions")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="offers"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent !bg-[#F8F8F8] font-semibold !text-[#71717A] data-[state=active]:!border-b-2 data-[state=active]:!border-b-dark-orange data-[state=active]:!text-dark-orange data-[state=active]:!shadow-none sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                    >
                      {t("more_offers")}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-0">
                    <div className="w-full bg-white">
                      <PlateEditor
                        description={
                          handleDescriptionParse(productDetails?.description) ||
                          undefined
                        }
                        readOnly
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
                          <h2>{t("specification")}</h2>
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

        {isVisible && (
          <div className="product_cart_modal absolute right-[20px] top-[150px] w-full px-4 md:w-[300px]">
            <div className="card-item cart-items">
              <div className="inline-flex w-full items-center justify-center pt-5 text-center">
                <a
                  href="javascript:void(0)"
                  className="rounded-none bg-dark-orange px-5 py-3 text-base text-white"
                  onClick={handleCartPage}
                >
                  {t("go_to_cart_page")}
                </a>
              </div>
              <div className="cart-item-lists">
                {haveAccessToken &&
                !cartListByUser.data?.data?.length &&
                !cartListByUser.isLoading ? (
                  <div className="px-3 py-6">
                    <p className="my-3 text-center">{t("no_cart_items")}</p>
                  </div>
                ) : null}

                {!haveAccessToken &&
                !cartListByDeviceQuery.data?.data?.length &&
                !cartListByDeviceQuery.isLoading ? (
                  <div className="px-3 py-6">
                    <p className="my-3 text-center">{t("no_cart_items")}</p>
                  </div>
                ) : null}

                <div className="px-3">
                  {cartListByUser.isLoading ? (
                    <div className="my-3 space-y-3">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 w-full" />
                      ))}
                    </div>
                  ) : null}

                  {!haveAccessToken && cartListByDeviceQuery.isLoading ? (
                    <div className="my-3 space-y-3">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 w-full" />
                      ))}
                    </div>
                  ) : null}
                </div>

                {memoizedCartList?.map((item: CartItem) => (
                  <ProductCard
                    key={item.id}
                    cartId={item.id}
                    productId={item.productId}
                    productPriceId={item.productPriceId}
                    productName={
                      item.productPriceDetails?.productPrice_product?.productName
                    }
                    offerPrice={item.productPriceDetails?.offerPrice}
                    productQuantity={item.quantity}
                    productImages={
                      item.productPriceDetails?.productPrice_product?.productImages
                    }
                    consumerDiscount={
                      item.productPriceDetails?.consumerDiscount
                    }
                    onRemove={handleRemoveItemFromCart}
                    onWishlist={handleAddToWishlist}
                    haveAccessToken={haveAccessToken}
                    minQuantity={item?.productPriceDetails?.minQuantityPerCustomer}
                    maxQuantity={item?.productPriceDetails?.maxQuantityPerCustomer}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

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
