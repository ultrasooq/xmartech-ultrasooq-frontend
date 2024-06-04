"use client";
import React, { useState } from "react";
import {
  useAllManagedProducts,
  useUpdateMultipleProductPrice,
} from "@/apis/queries/product.queries";
import ManageProductCard from "@/components/modules/manageProducts/ManageProductCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import ManageProductAside from "@/components/modules/manageProducts/ManageProductAside";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    productPrice: z.number().optional(),
    offerPrice: z.coerce.number().optional(),
    productLocationId: z.number().optional(),
    stock: z.coerce.number().optional(),
    deliveryAfter: z.coerce.number().optional(),
    timeOpen: z.coerce.number().optional(),
    timeClose: z.coerce.number().optional(),
    consumerType: z.string().trim().optional(),
    sellType: z.string().trim().optional(),
    vendorDiscount: z.coerce.number().optional(),
    consumerDiscount: z.coerce.number().optional(),
    minQuantity: z.coerce.number().optional(),
    maxQuantity: z.coerce.number().optional(),
    minCustomer: z.coerce.number().optional(),
    maxCustomer: z.coerce.number().optional(),
    minQuantityPerCustomer: z.coerce.number().optional(),
    maxQuantityPerCustomer: z.coerce.number().optional(),
    productCondition: z.string().optional(),
    isProductConditionRequired: z.boolean().optional(),
    isStockRequired: z.boolean().optional(),
    isOfferPriceRequired: z.boolean().optional(),
    isConsumerTypeRequired: z.boolean().optional(),
    isSellTypeRequired: z.boolean().optional(),
  })
  .refine(
    (data) => !data.isProductConditionRequired || !!data.productCondition,
    {
      message: "Product Condition is required",
      path: ["productCondition"],
    },
  )
  .refine((data) => !data.isStockRequired || !!data.stock, {
    message: "Stock is required",
    path: ["stock"],
  })
  .refine((data) => !data.isOfferPriceRequired || !!data.offerPrice, {
    message: "Offer Price is required",
    path: ["offerPrice"],
  })
  .refine((data) => !data.isConsumerTypeRequired || !!data.consumerType, {
    message: "Consumer Type is required",
    path: ["consumerType"],
  })
  .refine((data) => !data.isSellTypeRequired || !!data.sellType, {
    message: "Sell Type is required",
    path: ["sellType"],
  });

const defaultValues = {
  productPrice: 0,
  offerPrice: 0,
  productLocationId: undefined,
  stock: 0,
  deliveryAfter: 0,
  timeOpen: 0,
  timeClose: 0,
  consumerType: "",
  sellType: "",
  vendorDiscount: 0,
  consumerDiscount: 0,
  minQuantity: 0,
  maxQuantity: 0,
  minCustomer: 0,
  maxCustomer: 0,
  minQuantityPerCustomer: 0,
  maxQuantityPerCustomer: 0,
  productCondition: "",
  isProductConditionRequired: false,
  isStockRequired: false,
  isOfferPriceRequired: false,
  isConsumerTypeRequired: false,
  isSellTypeRequired: false,
};

const ManageProductsPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const allManagedProductsQuery = useAllManagedProducts({
    page,
    limit,
  });
  const updateMultipleProductPrice = useUpdateMultipleProductPrice();

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

  console.log(form.getValues(), "form values");

  const onSubmit = async (formData: any) => {
    if (!selectedProductIds.length) {
      toast({
        title: "Update Failed",
        description: "Please select at least one product",
        variant: "danger",
      });
      return;
    }
    const updatedFormData = {
      ...formData,
      productPrice:
        formData.offerPrice && formData.offerPrice !== 0
          ? formData.offerPrice
          : undefined,
      status: "ACTIVE",
    };

    const formatData = selectedProductIds.map((ele: number) => {
      return {
        productPriceId: ele,
        ...updatedFormData,
        stock:
          updatedFormData.stock && updatedFormData.stock !== 0
            ? updatedFormData.stock
            : undefined,
        offerPrice:
          updatedFormData.offerPrice && updatedFormData.offerPrice !== 0
            ? updatedFormData.offerPrice
            : undefined,
        deliveryAfter:
          updatedFormData.deliveryAfter && updatedFormData.deliveryAfter !== 0
            ? updatedFormData.deliveryAfter
            : undefined,
        timeOpen:
          updatedFormData.timeOpen && updatedFormData.timeOpen !== 0
            ? updatedFormData.timeOpen
            : undefined,
        timeClose:
          updatedFormData.timeClose && updatedFormData.timeClose !== 0
            ? updatedFormData.timeClose
            : undefined,
        minQuantity:
          updatedFormData.minQuantity && updatedFormData.minQuantity !== 0
            ? updatedFormData.minQuantity
            : undefined,
        maxQuantity:
          updatedFormData.maxQuantity && updatedFormData.maxQuantity !== 0
            ? updatedFormData.maxQuantity
            : undefined,
        minCustomer:
          updatedFormData.minCustomer && updatedFormData.minCustomer !== 0
            ? updatedFormData.minCustomer
            : undefined,
        maxCustomer:
          updatedFormData.maxCustomer && updatedFormData.maxCustomer !== 0
            ? updatedFormData.maxCustomer
            : undefined,
        minQuantityPerCustomer:
          updatedFormData.minQuantityPerCustomer &&
          updatedFormData.minQuantityPerCustomer !== 0
            ? updatedFormData.minQuantityPerCustomer
            : undefined,
        maxQuantityPerCustomer:
          updatedFormData.maxQuantityPerCustomer &&
          updatedFormData.maxQuantityPerCustomer !== 0
            ? updatedFormData.maxQuantityPerCustomer
            : undefined,
        vendorDiscount:
          updatedFormData.vendorDiscount && updatedFormData.vendorDiscount !== 0
            ? updatedFormData.vendorDiscount
            : undefined,
        consumerDiscount:
          updatedFormData.consumerDiscount &&
          updatedFormData.consumerDiscount !== 0
            ? updatedFormData.consumerDiscount
            : undefined,
        productCondition:
          updatedFormData.productCondition &&
          updatedFormData.productCondition !== ""
            ? updatedFormData.productCondition
            : undefined,
        consumerType:
          updatedFormData.consumerType && updatedFormData.consumerType !== ""
            ? updatedFormData.consumerType
            : undefined,
        sellType:
          updatedFormData.sellType && updatedFormData.sellType !== ""
            ? updatedFormData.sellType
            : undefined,
        status:
          updatedFormData.offerPrice && updatedFormData.offerPrice !== 0
            ? "ACTIVE"
            : "INACTIVE",
      };
    });
    console.log({
      productPrice: [...formatData],
    });
    return;
    const response = await updateMultipleProductPrice.mutateAsync({
      productPrice: [...formatData],
    });

    if (response.status) {
      toast({
        title: "Update Successful",
        description: "Products updated successfully",
        variant: "success",
      });
      form.reset();
      setSelectedProductIds([]);
      router.push("/products");
    } else {
      toast({
        title: "Update Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <div className="existing-product-add-page">
        <FormProvider {...form}>
          <form
            className="container m-auto flex px-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="existing-product-add-lists">
              {allManagedProductsQuery.isLoading ? (
                <div className="mx-2 grid w-full grid-cols-3 gap-5">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-96 w-full" />
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
                  offerPrice: string;
                  productPrice_productLocation: {
                    locationName: string;
                  };
                  stock: number;
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
                    offerPrice={product?.offerPrice}
                    deliveryAfter={product?.deliveryAfter}
                    productLocation={
                      product?.productPrice_productLocation?.locationName
                    }
                    stock={product?.stock}
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

            <ManageProductAside isLoading={allManagedProductsQuery.isPending} />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ManageProductsPage;
