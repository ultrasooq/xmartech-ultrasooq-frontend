"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useProductById } from "@/apis/queries/product.queries";
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

const ProductDetailsPage = () => {
  const queryClient = useQueryClient();
  const searchParams = useParams();
  const searchQuery = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const deviceId = getOrCreateDeviceId() || "";
  const [activeTab, setActiveTab] = useState("description");
  const [haveAccessToken, setHaveAccessToken] = useState(false);

  const me = useMe();
  const productQueryById = useProductById(
    {
      productId: searchParams?.id ? (searchParams?.id as string) : "",
      userId: me.data?.data?.id,
    },
    !!searchParams?.id,
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

  const productDetails = productQueryById.data?.data;
  const calculateTagIds = useMemo(
    () => productDetails?.productTags.map((item: any) => item.tagId).join(","),
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
    if (!!productQueryById?.data?.inWishlist) {
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
    const type = searchQuery?.get("type");
    if (type) setActiveTab(type);
  }, [searchQuery?.get("type")]);

  useEffect(() => {
    const accessToken = getCookie(PUREMOON_TOKEN_KEY);
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [getCookie(PUREMOON_TOKEN_KEY)]);

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
              isLoading={!productQueryById.isFetched}
              onWishlist={handleAddToWishlist}
              haveAccessToken={haveAccessToken}
              inWishlist={!!productQueryById?.data?.inWishlist}
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
              productReview={productQueryById?.data?.data?.productReview}
              onAdd={handleAddToCart}
              isLoading={!productQueryById.isFetched}
              // soldBy={
              //   productDetails?.adminBy?.tradeRole === "COMPANY"
              //     ? productDetails?.adminBy?.userProfile?.[0]?.companyName
              //     : productDetails?.adminBy?.tradeRole === "FREELANCER"
              //       ? `${productDetails?.adminBy?.firstName} ${productDetails?.adminBy?.lastName}`
              //       : null
              // }
              soldBy={`${productDetails?.product_productPrice?.[0]?.adminDetail?.firstName}
                ${productDetails?.product_productPrice?.[0]?.adminDetail?.lastName}`}
              userId={me.data?.data?.id}
              sellerId={
                productDetails?.product_productPrice?.[0]?.adminDetail?.id
              }
              haveOtherSellers={!!productQueryById.data?.otherSeller?.length}
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
                      {/* <ReactQuill
                        theme="snow"
                        value={productDetails?.specification}
                        readOnly
                        modules={{
                          toolbar: false,
                        }}
                        className="readonly-quill"
                      /> */}

                      <div className="specification-sec">
                        <h2>Specification</h2>
                        <table className="specification-table">
                          <tbody>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Craft of Weaving</th>
                              <td>Knit</td>
                              <th>Applicable Season</th>
                              <td>Spring and Summer</td>
                            </tr>
                            <tr>
                              <th>Cn</th>
                              <td colSpan={3}>Knit</td>
                            </tr>
                            <tr>
                              <td colSpan={4} />
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="vendor" className="mt-0">
                    <div className="w-full bg-white">
                      <div className="vendor-information-card-ui">
                        <div className="vendor-image">DK</div>
                        <div className="vendor-info">
                          <h2>Vendor Name</h2>
                          <ul className="vendor-contact-info">
                            <li>
                              <a href="mailto:test@gmail.com">
                                <span className="icon">
                                  <img src="/images/email.svg" alt="" />
                                </span>
                                <span className="text">test@gmail.com</span>
                              </a>
                            </li>
                            <li>
                              <a href="tel:1234567890">
                                <span className="icon">
                                  <img src="/images/phone-call.svg" alt="" />
                                </span>
                                <span className="text">1234567890</span>
                              </a>
                            </li>
                          </ul>
                          <h5>Business Type</h5>
                          <div className="tagLists">
                            <div className="tagItem">
                              <div className="tagIbox">Online Shop</div>
                            </div>
                          </div>
                          <h5>
                            Company ID: <strong>PUREFC0000058</strong>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-0">
                    <div className="w-full border border-solid border-gray-300 bg-white p-5">
                      <ReviewSection
                        productId={searchParams?.id as string}
                        hasAccessToken={haveAccessToken}
                        productReview={
                          productQueryById?.data?.data?.productReview
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
              <img src="/images/suggestion-pic1.png" alt="" />
            </div>
          </div> */}
                <SameBrandSection productDetails={productDetails} />
              </div>
            </div>
          </div>
        </div>

        <div className="product-view-s1-details-more-suggestion-sliders">
          <RelatedProductsSection calculateTagIds={calculateTagIds} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
