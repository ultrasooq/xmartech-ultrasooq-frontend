"use client";
import React, { useEffect, useState } from "react";
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
import { IoMdAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Dialog } from "@/components/ui/dialog";
import AddProductContent from "@/components/modules/products/AddProductContent";
import { PERMISSION_PRODUCTS, checkPermission } from "@/helpers/permission";
import { useMe } from "@/apis/queries/user.queries";
import { useAuth } from "@/context/AuthContext";

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
    isHiddenRequired: z.boolean().optional(),
    isStockRequired: z.boolean().optional(),
    isOfferPriceRequired: z.boolean().optional(),
    isDeliveryAfterRequired: z.boolean().optional(),
    isConsumerTypeRequired: z.boolean().optional(),
    isSellTypeRequired: z.boolean().optional(),
    isVendorDiscountRequired: z.boolean().optional(),
    isConsumerDiscountRequired: z.boolean().optional(),
    isMinQuantityRequired: z.boolean().optional(),
    isMaxQuantityRequired: z.boolean().optional(),
    isMinCustomerRequired: z.boolean().optional(),
    isMaxCustomerRequired: z.boolean().optional(),
    isMinQuantityPerCustomerRequired: z.boolean().optional(),
    isMaxQuantityPerCustomerRequired: z.boolean().optional(),
  })
  .refine(
    (data) => !data.isProductConditionRequired || !!data.productCondition,
    {
      message: "Product Condition is required",
      path: ["productCondition"],
    },
  )
  // .refine((data) => data.isStockRequired || !!data.stock, {
  //   message: "Stock is required",
  //   path: ["stock"],
  // })
  // .refine((data) => data.isOfferPriceRequired || !!data.offerPrice, {
  //   message: "Offer Price is required",
  //   path: ["offerPrice"],
  // })
  .refine((data) => !data.isDeliveryAfterRequired || !!data.deliveryAfter, {
    message: "Delivery After is required",
    path: ["deliveryAfter"],
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
  consumerType: "CONSUMER",
  sellType: "NORMALSELL",
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
  isDeliveryAfterRequired: false,
  isConsumerTypeRequired: false,
  isSellTypeRequired: false,
};

const ManageProductsPage = () => {  
  const router = useRouter();
  const hasPermission = checkPermission(PERMISSION_PRODUCTS);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const me = useMe();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const allManagedProductsQuery = useAllManagedProducts({
    page,
    limit,
    term: searchTerm !== "" ? searchTerm : undefined,
    selectedAdminId: me?.data?.data?.tradeRole == 'MEMBER' ? me?.data?.data?.addedBy : undefined
  }, hasPermission && !!me?.data?.data?.id);

  const { data, refetch } = allManagedProductsQuery;
  const [products, setProducts] = useState(data?.data || []);
  const [totalCount, setTotalCount] = useState(data?.totalCount || 0);

  // Update state when new data is available
  useEffect(() => {
    if (data?.data) {
      setProducts([...data.data]); // ✅ Spread to force state change
      setTotalCount(data.totalCount);
    }
  }, [data]);

  // Function to remove a product from the state
  const handleRemoveFromList = (removedProductId: number) => {
    setProducts((prevProducts: any[]) =>
      prevProducts.filter((product) => product.id !== removedProductId),
    );
    setTotalCount((prevCount: number) => prevCount - 1);
    // If the last product on the page is removed, adjust pagination
    if (products.length === 1 && page > 1) {
      setPage(page - 1); // Move to previous page
    } else {
      refetch(); // Otherwise, just refresh the data
    }
  };

  const updateMultipleProductPrice = useUpdateMultipleProductPrice();

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handleAddProductModal = () => setIsAddProductModalOpen(!isAddProductModalOpen);

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
        stock: updatedFormData.isStockRequired
          ? 0
          : updatedFormData.stock && updatedFormData.stock !== 0
            ? updatedFormData.stock
            : 0,
        offerPrice: updatedFormData.isOfferPriceRequired
          ? 0
          : updatedFormData.offerPrice
            ? updatedFormData.offerPrice
            : undefined,
        productPrice: updatedFormData.isOfferPriceRequired
          ? 0
          : updatedFormData.offerPrice
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
          updatedFormData.offerPrice || updatedFormData.isOfferPriceRequired
            ? "ACTIVE"
            : undefined,
        askForStock: updatedFormData.isStockRequired ? "true" : undefined,
        askForPrice: updatedFormData.isOfferPriceRequired ? "true" : undefined,
      };
    });

    const finalData = formatData.map((item) => {
      delete item.isConsumerDiscountRequired,
        delete item.isConsumerTypeRequired,
        delete item.isDeliveryAfterRequired,
        delete item.isHiddenRequired,
        delete item.isMaxCustomerRequired,
        delete item.isMaxQuantityPerCustomerRequired,
        delete item.isMaxQuantityRequired,
        delete item.isMinCustomerRequired,
        delete item.isMinQuantityPerCustomerRequired,
        delete item.isMinQuantityRequired,
        delete item.isProductConditionRequired,
        delete item.isSellTypeRequired,
        delete item.isOfferPriceRequired;
      delete item.isStockRequired;
      delete item.isVendorDiscountRequired;

      return item;
    });

    console.log({
      productPrice: [...finalData],
    });
    
    const response = await updateMultipleProductPrice.mutateAsync({
      productPrice: [...finalData],
    });

    if (response.status) {
      toast({
        title: "Update Successful",
        description: "Products updated successfully",
        variant: "success",
      });
      // **Trigger refetch to update the product list**
      await refetch();

      form.reset();
      setSelectedProductIds([]);
      router.push("/manage-products");
    } else {
      toast({
        title: "Update Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (!hasPermission) router.push("/home");
  }, [])

  if (!hasPermission) return <div></div>;

  return (
    <>
      <div className="existing-product-add-page">
        <div className="existing-product-add-layout">
          <div className="container m-auto px-3">
            {/* start: existing-product-add-headerPart */}
            <div className="existing-product-add-headerPart">
              <h2 className="text-2xl font-medium capitalize text-color-dark">
                Products
              </h2>
              <ul className="right-filter-lists flex flex-row flex-nowrap gap-x-2">
                <li>
                  <Input
                    type="text"
                    placeholder="Search Product"
                    className="search-box h-[40px] w-[200px] sm:w-[160px] lg:w-80"
                    onChange={handleDebounce}
                  />
                </li>
                <li>
                  <button
                    className="theme-primary-btn add-btn p-2"
                    onClick={handleAddProductModal}
                  >
                    <IoMdAdd size={24} />
                    <span className="d-none-mobile">Add Product</span>
                  </button>
                </li>
              </ul>
            </div>
            {/* end: existing-product-add-headerPart */}

            {/* start: existing-product-add-body */}
            <div className="existing-product-add-body">
              <FormProvider {...form}>
                <form
                  className="existing-product-add-wrapper"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="left-content">
                    <div className="existing-product-add-lists">
                      {allManagedProductsQuery.isLoading ? (
                        <div className="mx-2 grid w-full grid-cols-3 gap-5">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-96 w-full" />
                          ))}
                        </div>
                      ) : null}

                      {!allManagedProductsQuery.data?.data?.length &&
                      !allManagedProductsQuery.isLoading ? (
                        <p className="w-full py-10 text-center text-base font-medium">
                          No product found
                        </p>
                      ) : null}

                      {products.map(
                        (product: {
                          id: number;
                          productId: number;
                          status: string;
                          askForPrice: string;
                          askForStock: string;
                          productPrice_product: {
                            productImages: {
                              id: number;
                              image: string | null;
                              video: string | null;
                            }[];
                            productName: string;
                          };
                          productPrice_productSellerImage: {
                            id: number;
                            image: string | null;
                            video: string | null;
                          }[];
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
                          productCondition: string;
                        }) => (
                          <ManageProductCard
                            selectedIds={selectedProductIds}
                            onSelectedId={handleProductIds}
                            key={product?.id}
                            id={product?.id}
                            productId={product?.productId}
                            status={product?.status}
                            askForPrice={product?.askForPrice}
                            askForStock={product?.askForStock}
                            // productImage={
                            //   product?.productPrice_product?.productImages?.[0]
                            //     ?.image
                            // }
                            productImage={
                              product?.productPrice_productSellerImage?.length
                                ? product?.productPrice_productSellerImage?.[0]
                                    ?.image
                                : product?.productPrice_product
                                    ?.productImages?.[0]?.image
                            }
                            productName={
                              product?.productPrice_product?.productName
                            }
                            productPrice={product?.productPrice}
                            offerPrice={product?.offerPrice}
                            deliveryAfter={product?.deliveryAfter}
                            productLocation={
                              product?.productPrice_productLocation
                                ?.locationName
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
                            minQuantityPerCustomer={
                              product?.minQuantityPerCustomer
                            }
                            maxQuantityPerCustomer={
                              product?.maxQuantityPerCustomer
                            }
                            productCondition={product?.productCondition}
                            onRemove={handleRemoveFromList} // Pass function to remove product
                          />
                        ),
                      )}

                      {/* {allManagedProductsQuery.data?.totalCount > 6 ? (
                        <Pagination
                          page={page}
                          setPage={setPage}
                          totalCount={allManagedProductsQuery.data?.totalCount}
                          limit={limit}
                        />
                      ) : null} */}
                      {totalCount > limit ? (
                        <Pagination
                          page={page}
                          setPage={setPage}
                          totalCount={totalCount} // Use updated count
                          limit={limit}
                        />
                      ) : null}
                    </div>
                  </div>
                  <ManageProductAside
                    isLoading={updateMultipleProductPrice.isPending}
                    // onUpdateProductPrice={handleUpdateProductPrice}
                  />
                </form>
              </FormProvider>
            </div>
            {/* end: existing-product-add-body */}
          </div>
        </div>
      </div>
      <Dialog open={isAddProductModalOpen} onOpenChange={handleAddProductModal}>
        <AddProductContent />
      </Dialog>
    </>
  );
};

export default ManageProductsPage;
