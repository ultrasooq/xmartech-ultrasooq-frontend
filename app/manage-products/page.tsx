"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  IBrands,
  ISelectOptions,
  TrendingProduct,
} from "@/utils/types/common.types";
import { useBrands } from "@/apis/queries/masters.queries";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAddMultiplePriceForProduct,
  useProducts,
} from "@/apis/queries/product.queries";
import ProductCard from "@/components/modules/trending/ProductCard";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import Footer from "@/components/shared/Footer";
import Pagination from "@/components/shared/Pagination";
import { useMe } from "@/apis/queries/user.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoaderPrimaryIcon from "@/public/images/load-primary.png";

const ManageProductsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchProductTerm, setSearchProductTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [productFilter, setProductFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const me = useMe();

  const productsQuery = useProducts(
    {
      userId: String(me?.data?.data?.id),
      page,
      limit,
      term: searchProductTerm !== "" ? searchProductTerm : undefined,
      status: "ALL",
    },
    !!me?.data?.data?.id,
  );
  const brandsQuery = useBrands({
    term: searchTerm,
  });
  const addMultiplePriceForProductIds = useAddMultiplePriceForProduct();

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
  }, [brandsQuery?.data?.data?.length]);

  const handleProductDebounce = debounce((event: any) => {
    setSearchProductTerm(event.target.value);
  }, 1000);

  const handleBrandDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handleProductIds = (checked: boolean | string, id: number) => {
    let tempArr = selectedProductIds || [];
    if (checked && !tempArr.find((ele: number) => ele === id)) {
      tempArr = [...tempArr, id];
    }

    if (!checked && tempArr.find((ele: number) => ele === id)) {
      tempArr = tempArr.filter((ele: number) => ele !== id);
    }

    setSelectedProductIds(tempArr);
  };

  const handleBrandChange = (
    checked: boolean | string,
    item: ISelectOptions,
  ) => {
    let tempArr = selectedBrandIds || [];
    if (checked && !tempArr.find((ele: number) => ele === item.value)) {
      tempArr = [...tempArr, item.value];
    }

    if (!checked && tempArr.find((ele: number) => ele === item.value)) {
      tempArr = tempArr.filter((ele: number) => ele !== item.value);
    }
    setSelectedBrandIds(tempArr);
  };

  // const memoizedProductList = useMemo(() => {
  //   return (
  //     allProductsQuery?.data?.data?.map((item: any) => ({
  //       productImage: item?.productImages?.[0]?.image,
  //       categoryName: item?.category?.name || "-",
  //       skuNo: item?.skuNo,
  //       brandName: item?.brand?.brandName || "-",
  //       productReview: item?.productReview || [],
  //       productProductPriceId: item?.product_productPrice?.[0]?.id,
  //       productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
  //     })) || []
  //   );
  // }, []);

  const memoizedProductList = useMemo(() => {
    return (
      productsQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productImage: item?.productImages?.[0]?.image,
          productName: item?.productName || "-",
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo || "-",
          brandName: item?.brand?.brandName || "-",
          productPrice: item?.productPrice || 0,
          offerPrice: item?.offerPrice || 0,
          productProductPriceId: item?.product_productPrice?.[0]?.id,
          productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
          shortDescription: item?.product_productShortDescription?.length
            ? item?.product_productShortDescription?.[0]?.shortDescription
            : "-",
        };
      }) || []
    );
  }, [
    productsQuery.data?.data,
    productsQuery.data?.data?.length,
    page,
    limit,
    searchTerm,
    selectedBrandIds,
  ]);

  const onSubmit = async () => {
    const data = selectedProductIds.map((item: number) => ({
      productId: item,
      status: "INACTIVE",
    }));
    console.log({
      productPrice: data,
    });
    // return;
    const response = await addMultiplePriceForProductIds.mutateAsync({
      productPrice: data,
    });

    if (response.status && response.data) {
      toast({
        title: "Product Price Add Successful",
        description: response.message,
        variant: "success",
      });
      setSelectedProductIds([]);
      router.push("/rfq-list");
    } else {
      toast({
        title: "Product Price Add Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

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
        <div className="trending-search-sec manage_product_sec mt-0">
          <div className="container m-auto flex flex-wrap px-3">
            <div className="mb-5 flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 pb-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Choose Products
                </h4>
              </div>
            </div>
            <div className={productFilter ? "left-filter show" : "left-filter"}>
              <div className="filter-sub-header">
                <Input
                  type="text"
                  placeholder="Search Product"
                  className="border-color-[rgb(232 232 232 / var(--tw-border-opacity))] h-[45px] w-full rounded-none border border-solid px-3 py-0 text-sm font-normal"
                  onChange={handleProductDebounce}
                />
              </div>
              <Accordion
                type="multiple"
                defaultValue={["brand"]}
                className="filter-col"
              >
                <AccordionItem value="brand">
                  <AccordionTrigger className="px-3 text-base hover:!no-underline">
                    By Brand
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="filter-sub-header">
                      <Input
                        type="text"
                        placeholder="Search Brand"
                        className="custom-form-control-s1 searchInput rounded-none"
                        onChange={handleBrandDebounce}
                      />
                    </div>
                    <div className="filter-body-part">
                      <div className="filter-checklists">
                        {!memoizedBrands.length ? (
                          <p className="text-center text-sm font-medium">
                            No data found
                          </p>
                        ) : null}
                        {memoizedBrands.map((item: ISelectOptions) => (
                          <div key={item.value} className="div-li">
                            <Checkbox
                              id={item.label}
                              className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                              onCheckedChange={(checked) =>
                                handleBrandChange(checked, item)
                              }
                              checked={selectedBrandIds.includes(item.value)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={item.label}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {item.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div
              className="left-filter-overlay"
              onClick={() => setProductFilter(false)}
            ></div>
            <div className="right-products">
              {productsQuery.isLoading ? (
                <div className="grid grid-cols-4 gap-5">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-80 w-full" />
                  ))}
                </div>
              ) : null}

              {!memoizedProductList.length && !productsQuery.isLoading ? (
                <p className="text-center text-sm font-medium">No data found</p>
              ) : null}

              <div className="product-list-s1">
                {memoizedProductList.map((item: TrendingProduct) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAdd={() => {}}
                    onWishlist={() => {}}
                    inWishlist={item?.inWishlist}
                    haveAccessToken={haveAccessToken}
                    isSelectable
                    selectedIds={selectedProductIds}
                    onSelectedId={handleProductIds}
                  />
                ))}
              </div>

              {productsQuery.data?.totalCount > 8 ? (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalCount={productsQuery.data?.totalCount}
                  limit={limit}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {selectedProductIds.length ? (
        <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-end border-t border-solid border-gray-300 bg-dark-orange px-10 py-3">
          <p className="mr-4 text-base font-medium text-white">
            {selectedProductIds.length} Selected
          </p>
          <Button
            type="submit"
            onClick={onSubmit}
            size="lg"
            className="flex items-center rounded-sm bg-white text-sm font-bold text-dark-orange"
            disabled={addMultiplePriceForProductIds.isPending}
          >
            {addMultiplePriceForProductIds.isPending ? (
              <>
                <Image
                  src={LoaderPrimaryIcon}
                  alt="fb-icon"
                  width={20}
                  height={20}
                  className="mr-2 animate-spin"
                />
                <span>Please wait</span>
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default ManageProductsPage;
