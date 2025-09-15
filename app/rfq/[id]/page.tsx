"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useProductById,
  useOneWithProductPrice,
} from "@/apis/queries/product.queries";
import RelatedProductsSection from "@/components/modules/productDetails/RelatedProductsSection";
import SameBrandSection from "@/components/modules/productDetails/SameBrandSection";
import ProductDescriptionCard from "@/components/modules/rfqProductDetails/ProductDescriptionCard";
import ProductImagesCard from "@/components/modules/rfqProductDetails/ProductImagesCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { handleDescriptionParse } from "@/utils/helper";
import ReviewSection from "@/components/shared/ReviewSection";
import QuestionsAnswersSection from "@/components/modules/productDetails/QuestionsAnswersSection";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useMe } from "@/apis/queries/user.queries";
import { useQueryClient } from "@tanstack/react-query";
import Footer from "@/components/shared/Footer";
import VendorSection from "@/components/modules/productDetails/VendorSection";
import PlateEditor from "@/components/shared/Plate/PlateEditor";
import ProductCard from "@/components/modules/cartList/ProductCard";
import ServiceCard from "@/components/modules/cartList/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { CartItem } from "@/utils/types/cart.types";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useClickOutside } from "use-events";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { useDeleteRfqCartItem, useRfqCartListByUserId, useUpdateRfqCartWithLogin } from "@/apis/queries/rfq.queries";
import Link from "next/link";
import RfqCartMenuCard from "@/components/modules/rfq/RfqCartMenuCard";
import AddToRfqForm from "@/components/modules/rfq/AddToRfqForm";

const ProductDetailsPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const queryClient = useQueryClient();
  const searchParams = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("description");
  const [cartList, setCartList] = useState<any[]>([]);

  const wrapperRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [offerPriceFrom, setOfferPriceFrom] = useState<number | undefined>();
  const [offerPriceTo, setOfferPriceTo] = useState<number | undefined>();
  const [productNote, setProductNote] = useState<string>("");
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});
  const handleToggleAddModal = () => setIsAddToCartModalOpen(!isAddToCartModalOpen);

  const me = useMe();
  const productQueryById = useProductById(
    {
      productId: searchParams?.id ? (searchParams?.id as string) : "",
      userId: me.data?.data?.id,
    },
    !!searchParams?.id
  );

  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();
  const deleteRfqCartItem = useDeleteRfqCartItem();
  const rfqCartListByUser = useRfqCartListByUserId(
    {
      page: 1,
      limit: 100,
    }
  );

  useEffect(() => {
    if (rfqCartListByUser.data?.data) {
      setIsVisible(true);
      setCartList(rfqCartListByUser.data?.data?.map((item: any) => item) || []);
    }
  }, [rfqCartListByUser.data?.data]);

  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const [isVisible, setIsVisible] = useState(false); // Initially hidden

  const productDetails = productQueryById.data?.data;
  const productInWishlist = productQueryById.data?.inWishlist;

  const calculateTagIds = useMemo(
    () => productDetails?.productTags.map((item: any) => item.tagId).join(","),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productDetails?.productTags?.length],
  );

  const handleRFQCart = (
    quantity: number,
    productId: number,
    action: "add" | "remove",
    offerPriceFrom?: number,
    offerPriceTo?: number,
    note?: string,
  ) => {
    if (action == "remove" && quantity == 0) {
      handleAddToCart(quantity, productId, "remove", 0, 0, "");
    } else {
      handleToggleAddModal();
      setSelectedProductId(productId);
      setQuantity(quantity);
      setOfferPriceFrom(offerPriceFrom);
      setOfferPriceTo(offerPriceTo);
      setProductNote(note || "");
    }
  };

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
    offerPriceFrom?: number,
    offerPriceTo?: number,
    note?: string,
  ) => {
    const response = await updateRfqCartWithLogin.mutateAsync({
      productId,
      quantity,
      offerPriceFrom: offerPriceFrom || 0,
      offerPriceTo: offerPriceTo || 0,
      note: note || "",
    });

    if (response.status) {
      setIsVisible(true);
      toast({
        title:
          actionType == "add"
            ? t("item_added_to_cart")
            : t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    }
  };

  const handleRemoveItemFromRfqCart = async (rfqCartId: number) => {
    const response = await deleteRfqCartItem.mutateAsync({ rfqCartId });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
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

  return (
    <>
      <title dir={langDir} translate="no">
        {t("store")} | Ultrasooq
      </title>
      <div className="body-content-s1 relative">
        <div className="product-view-s1-left-right type2">
          <div className="container m-auto px-3">
            <ProductImagesCard
              productDetails={productDetails}
              onAdd={handleRFQCart}
              onEdit={() => {
                handleToggleAddModal();
                setSelectedProductId(productDetails?.id);
              }}
              openCartCard={handelOpenCartLayout}
              isLoading={productQueryById?.isLoading}
              onWishlist={handleAddToWishlist}
              inWishlist={!!productInWishlist}
              isAddedToCart={
                cartList?.find((item: any) => item.productId == productDetails?.id) ? true : false
              }
              cartQuantity={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.quantity || 0
              }
              offerPriceFrom={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.offerPriceFrom
              }
              offerPriceTo={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.offerPriceTo
              }
              productNote={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.note || ""
              }
            />

            <ProductDescriptionCard
              productId={searchParams?.id ? (searchParams?.id as string) : ""}
              productName={productDetails?.productName}
              productType={productDetails?.productType}
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
                cartList?.find((item: any) => item.productId == productDetails?.id)?.quantity || 0
              }
              offerPriceFrom={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.offerPriceFrom
              }
              offerPriceTo={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.offerPriceTo
              }
              productNote={
                cartList?.find((item: any) => item.productId == productDetails?.id)?.note || ""
              }
              productReview={productDetails?.productReview}
              onAdd={handleRFQCart}
              isLoading={productQueryById.isLoading}
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
                      className="w-[50%] rounded-none border-b-2 border-b-transparent bg-[#F8F8F8]! font-semibold text-[#71717A]! data-[state=active]:border-b-2! data-[state=active]:border-b-dark-orange! data-[state=active]:text-dark-orange! data-[state=active]:shadow-none! sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                      dir={langDir}
                      translate="no"
                    >
                      {t("description")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="specification"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent bg-[#F8F8F8]! font-semibold text-[#71717A]! data-[state=active]:border-b-2! data-[state=active]:border-b-dark-orange! data-[state=active]:text-dark-orange! data-[state=active]:shadow-none! sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                      dir={langDir}
                      translate="no"
                    >
                      {t("specification")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="vendor"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent bg-[#F8F8F8]! font-semibold text-[#71717A]! data-[state=active]:border-b-2! data-[state=active]:border-b-dark-orange! data-[state=active]:text-dark-orange! data-[state=active]:shadow-none! sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                      dir={langDir}
                      translate="no"
                    >
                      {t("vendor")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent bg-[#F8F8F8]! font-semibold text-[#71717A]! data-[state=active]:border-b-2! data-[state=active]:border-b-dark-orange! data-[state=active]:text-dark-orange! data-[state=active]:shadow-none! sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                      dir={langDir}
                      translate="no"
                    >
                      {t("reviews")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="qanda"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent bg-[#F8F8F8]! font-semibold text-[#71717A]! data-[state=active]:border-b-2! data-[state=active]:border-b-dark-orange! data-[state=active]:text-dark-orange! data-[state=active]:shadow-none! sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                      dir={langDir}
                      translate="no"
                    >
                      {t("questions")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="offers"
                      className="w-[50%] rounded-none border-b-2 border-b-transparent bg-[#F8F8F8]! font-semibold text-[#71717A]! data-[state=active]:border-b-2! data-[state=active]:border-b-dark-orange! data-[state=active]:text-dark-orange! data-[state=active]:shadow-none! sm:w-auto md:w-auto md:py-2 md:text-xs lg:w-full lg:py-4 lg:text-base"
                      dir={langDir}
                      translate="no"
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
                        readOnly={true}
                        fixedToolbar={false}
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
                          <h2 dir={langDir} translate="no">
                            {t("specification")}
                          </h2>
                          <table className="specification-table">
                            <tbody>
                              <tr className="grid grid-cols-1 md:grid-cols-2">
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
                        hasAccessToken={true}
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
                        hasAccessToken={true}
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
                <SameBrandSection
                  productDetails={productDetails}
                  productId={searchParams?.id as string}
                />
              </div>
            </div>
          </div>
        </div>

        {isVisible ? (
          <div className="product_cart_modal absolute right-0 top-[150px] w-full px-4 lg:w-[300px] xl:right-[20px]">
            {cartList.length ? (
              <div className="mb-4 w-full text-center">
                <Link
                  href="/rfq-cart"
                  className="flex justify-center gap-x-2 bg-dark-orange px-3 py-2 text-sm text-white lg:text-base"
                  dir={langDir}
                  translate="no"
                >
                  {t("go_to_rfq_cart")}
                </Link>
              </div>
            ) : null}

            <h4 className="text-center" dir={langDir} translate="no">
              {t("your_rfq_cart")} ({t("n_items", { n: cartList.length })})
            </h4>

            {!cartList.length ? (
              <div className="my-10 text-center" dir={langDir} translate="no">
                <h4>{t("no_cart_items")}</h4>
              </div>
            ) : null}

            {cartList.map((item: any) => (
              <RfqCartMenuCard
                key={item?.id}
                id={item?.id}
                rfqProductId={item?.productId}
                productName={item?.rfqCart_productDetails?.productName}
                productQuantity={item.quantity}
                productImages={item?.rfqCart_productDetails?.productImages}
                onAdd={handleRFQCart}
                onRemove={handleRemoveItemFromRfqCart}
                offerPriceFrom={Number(item?.offerPriceFrom || 0)}
                offerPriceTo={Number(item?.offerPriceTo || 0)}
                note={item?.note}
              />
            ))}
          </div>
        ) : null}

        <div className="product-view-s1-details-more-suggestion-sliders">
          <RelatedProductsSection
            calculateTagIds={calculateTagIds}
            productId={searchParams?.id as string}
          />
        </div>
      </div>
      <Footer />

      <Dialog open={isAddToCartModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent
          className="add-new-address-modal gap-0 p-0 md:max-w-2xl!"
          ref={wrapperRef}
        >
          <AddToRfqForm
            onClose={() => {
              setIsAddToCartModalOpen(false);
              setSelectedProductId(undefined);
              setQuantity(undefined);
              setProductNote("");
            }}
            selectedProductId={selectedProductId}
            selectedQuantity={quantity}
            offerPriceFrom={offerPriceFrom}
            offerPriceTo={offerPriceTo}
            note={productNote}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetailsPage;
