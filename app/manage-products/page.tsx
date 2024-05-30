"use client";
import React, { useState } from "react";
import { useAllManagedProducts } from "@/apis/queries/product.queries";
import ManageProductCard from "@/components/modules/manageProducts/ManageProductCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import ManageProductAside from "@/components/modules/manageProducts/ManageProductAside";
import { FormProvider, useForm } from "react-hook-form";

const ManageProductsPage = () => {
  const form = useForm();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const allManagedProductsQuery = useAllManagedProducts({
    page,
    limit,
  });

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

  console.log(allManagedProductsQuery.data?.data);

  return (
    <>
      <div className="existing-product-add-page">
        <FormProvider {...form}>
          <form className="container m-auto flex px-3">
            <div className="existing-product-add-lists">
              {allManagedProductsQuery.isLoading ? (
                <div className="mx-2 grid w-full grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-80 w-full" />
                  ))}
                </div>
              ) : null}

              {!allManagedProductsQuery.data?.data &&
              !allManagedProductsQuery.isLoading ? (
                <p className="w-full text-center text-base font-medium">
                  No data found
                </p>
              ) : null}

              {allManagedProductsQuery.data?.data?.map(
                (product: {
                  id: number;
                  productPrice_product: {
                    productImages: {
                      id: number;
                      image: string | null;
                      video: string | null;
                    }[];
                    productName: string;
                  };
                  productPrice: string;
                  productPrice_productLocation: {
                    locationName: string;
                  };
                  consumerType: string;
                  sellType: string;
                  deliveryAfter: number;
                  timeOpen: number | null;
                  timeClose: number | null;
                  vendorDiscount: number | null;
                  consumerDiscount: number | null;
                  minQuantity: number | null;
                  maxQuantity: number | null;
                  minCustomer: number | null;
                  maxCustomer: number | null;
                  minQuantityPerCustomer: number | null;
                  maxQuantityPerCustomer: number | null;
                }) => (
                  <ManageProductCard
                    selectedIds={selectedProductIds}
                    onSelectedId={handleProductIds}
                    key={product?.id}
                    id={product?.id}
                    productImage={
                      product?.productPrice_product?.productImages?.[0]?.image
                    }
                    productName={product?.productPrice_product?.productName}
                    productPrice={product?.productPrice}
                    deliveryAfter={product?.deliveryAfter}
                    productLocation={
                      product?.productPrice_productLocation?.locationName
                    }
                    consumerType={product?.consumerType}
                    sellType={product?.sellType}
                    timeOpen={product?.timeOpen}
                    timeClose={product?.timeClose}
                    vendorDiscount={product?.vendorDiscount}
                    consumerDiscount={product?.consumerDiscount}
                    minQuantity={product?.minQuantity}
                    maxQuantity={product?.maxQuantity}
                    minCustomer={product?.minCustomer}
                    maxCustomer={product?.maxCustomer}
                    minQuantityPerCustomer={product?.minQuantityPerCustomer}
                    maxQuantityPerCustomer={product?.maxQuantityPerCustomer}
                  />
                ),
              )}

              {allManagedProductsQuery.data?.totalCount > 6 ? (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalCount={allManagedProductsQuery.data?.totalCount}
                  limit={limit}
                />
              ) : null}
            </div>

            <ManageProductAside />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ManageProductsPage;
