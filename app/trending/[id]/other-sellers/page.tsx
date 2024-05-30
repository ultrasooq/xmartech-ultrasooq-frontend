"use client";
import {
  useOneProductBySellerId,
  useProductById,
} from "@/apis/queries/product.queries";
import { useMe } from "@/apis/queries/user.queries";
import SellerCard from "@/components/modules/otherSellers/SellerCard";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getOrCreateDeviceId } from "@/utils/helper";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import {
  useCartListByDevice,
  useCartListByUserId,
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";

const AllSellers = () => {
  const router = useRouter();
  const searchParams = useParams();
  const searchQuery = useSearchParams();
  // const [sellerId, setSellerId] = useState("");
  const { toast } = useToast();
  const deviceId = getOrCreateDeviceId() || "";
  const [haveAccessToken, setHaveAccessToken] = useState(false);

  const me = useMe();
  const productQueryById = useProductById(
    {
      productId: searchParams?.id ? (searchParams?.id as string) : "",
      userId: me.data?.data?.id,
    },
    !!searchParams?.id,
  );
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
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

  const productDetails = productQueryById.data?.data;

  const getProductQuantityByUser = cartListByUser.data?.data?.find(
    (item: any) => item.productId === Number(searchParams?.id),
  )?.quantity;

  const getProductQuantityByDevice = cartListByDeviceQuery.data?.data?.find(
    (item: any) => item.productId === Number(searchParams?.id),
  )?.quantity;

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

  // const allSellersQuery = useOneProductBySellerId({
  //   productId: searchParams?.id ? (searchParams?.id as string) : "",
  //   userId: 1,
  //   sellerId: 1,
  // });

  // useEffect(() => {
  //   const userId = searchQuery?.get("userId");
  //   const sellerId = searchQuery?.get("sellerId");
  //   if (type) setActiveTab(type);
  // }, [searchQuery?.get("type")]);

  useEffect(() => {
    const accessToken = getCookie(PUREMOON_TOKEN_KEY);
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [getCookie(PUREMOON_TOKEN_KEY)]);

  console.log(productQueryById.data?.data);
  console.log(productQueryById.data?.otherSeller);

  return (
    <section className="w-full py-8">
      <div className="container m-auto px-3">
        <div className="flex flex-wrap border border-solid border-gray-300 shadow-md">
          <div className="flex w-full flex-wrap items-center justify-between">
            <div className="flex w-full items-center justify-between border-b border-solid border-gray-300 px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  All Sellers
                </h4>
              </div>
              <div className="flex flex-wrap">
                <div className="mr-3 flex items-center justify-end">
                  <span>{productDetails?.productName}</span>
                </div>
                <div className="relative flex w-[50px] items-center justify-end">
                  <Image
                    src={
                      productDetails?.productImages?.[0]?.image ||
                      PlaceholderImage
                    }
                    alt="product-preview"
                    fill
                  />
                </div>
              </div>
            </div>

            {productQueryById.data?.otherSeller?.map(
              (item: {
                id: number;
                adminDetail: {
                  firstName: string;
                  lastName: string;
                };
                offerPrice: string;
                productPrice: string;
                productId: number;
              }) => (
                <SellerCard
                  key={item?.id}
                  productId={item?.productId}
                  sellerName={`${item?.adminDetail?.firstName} ${item?.adminDetail?.lastName}`}
                  offerPrice={item?.offerPrice}
                  productPrice={item?.productPrice}
                  onAdd={() => handleAddToCart(1, "add")}
                  onToCheckout={handleCheckoutPage}
                />
              ),
            )}
          </div>
        </div>

        {!productQueryById.data?.otherSeller?.length &&
        !productQueryById.isLoading ? (
          <p className="py-10 text-center text-sm font-medium">
            No Sellers Found
          </p>
        ) : null}

        {productQueryById?.isLoading ? (
          <div className="my-2 space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AllSellers;
