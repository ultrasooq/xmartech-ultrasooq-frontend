"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useAllManagedProducts,
} from "@/apis/queries/product.queries";
import ManageProductCard from "@/components/modules/manageProducts/ManageProductCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddProductContent from "@/components/modules/products/AddProductContent";


import { PERMISSION_PRODUCTS, checkPermission } from "@/helpers/permission";
import { useMe } from "@/apis/queries/user.queries";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import BrandFilterList from "@/components/modules/rfq/BrandFilterList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IBrands, ISelectOptions } from "@/utils/types/common.types";
import { Checkbox } from "@/components/ui/checkbox";
import { useBrands } from "@/apis/queries/masters.queries";
import { withActiveUserGuard } from "@/components/shared/withRouteGuard";

const schema = (t: any) => {
  return (
    z
      .object({
        productPrice: z.number().optional(),
        offerPrice: z.coerce.number().optional(),
        stock: z.coerce.number().optional(),
        deliveryAfter: z.coerce.number().optional(),
        timeOpen: z.coerce.number().optional(),
        timeClose: z.coerce.number().optional(),
        consumerType: z.string().trim().optional(),
        sellType: z.string().trim().optional(),
        vendorDiscount: z.coerce.number().optional(),
        vendorDiscountType: z.coerce.string().optional(),
        consumerDiscount: z.coerce.number().optional(),
        consumerDiscountType: z.coerce.string().optional(),
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
        message: t("delivery_after_is_required"),
        path: ["deliveryAfter"],
      })
      .refine((data) => !data.isConsumerTypeRequired || !!data.consumerType, {
        message: t("consumer_type_is_required"),
        path: ["consumerType"],
      })
      .refine((data) => !data.isSellTypeRequired || !!data.sellType, {
        message: t("sell_type_is_required"),
        path: ["sellType"],
      })
  );
};

const defaultValues = {
  productPrice: 0,
  offerPrice: 0,
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
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const hasPermission = checkPermission(PERMISSION_PRODUCTS);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  
  // Handle page change while preserving selections
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Don't clear selections when changing pages
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  };

  // Handle filter toggle
  const handleFilterToggle = () => {
    // Don't allow filter if no products are selected
    if (!showOnlySelected && globalSelectedIds.size === 0) {
      toast({
        title: t("no_products_selected"),
        description: t("please_select_products_first"),
        variant: "danger",
      });
      return;
    }
    
    setShowOnlySelected(!showOnlySelected);
    setPage(1); // Reset to first page when toggling filter
    
    // Force refetch when toggling filter to get fresh data
    setTimeout(() => {
      refetch();
    }, 100);
  };
  const [limit, setLimit] = useState(3);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [globalSelectedIds, setGlobalSelectedIds] = useState<Set<number>>(new Set());

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const me = useMe();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [displayStoreProducts, setDisplayStoreProducts] = useState(false);
  const [displayBuyGroupProducts, setDisplayBuyGroupProducts] = useState(false);
  const [displayExpiredProducts, setDisplayExpiredProducts] = useState(false);
  const [displayHiddenProducts, setDisplayHiddenProducts] = useState(false);
  const [displayDiscountedProducts, setDisplayDiscountedProducts] = useState(false);

  const [searchTermBrand, setSearchTermBrand] = useState("");

  const brandsQuery = useBrands({
    term: searchTermBrand,
  });

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsQuery?.data?.data?.length]);

  const handleDebounceBrandSearch = debounce((event: any) => {
    setSearchTermBrand(event.target.value);
  }, 1000);

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

  const form = useForm({
    resolver: zodResolver(schema(t)),
    defaultValues,
  });

  const sellType = () => {
    if (displayStoreProducts && displayBuyGroupProducts) {
      return "NORMALSELL,BUYGROUP";
    }

    if (displayStoreProducts) {
      return "NORMALSELL";
    }

    if (displayBuyGroupProducts) {
      return "BUYGROUP";
    }

    return "";
  };

  const allManagedProductsQuery = useAllManagedProducts(
    {
      page: showOnlySelected ? 1 : page, // When filter is active, start from page 1
      limit: showOnlySelected ? 1000 : limit, // When filter is active, fetch a large number to get all selected products
      term: searchTerm !== "" ? searchTerm : undefined,
      selectedAdminId:
        me?.data?.data?.tradeRole == "MEMBER"
          ? me?.data?.data?.addedBy
          : undefined,
      brandIds: selectedBrandIds.join(","),
      status: displayHiddenProducts ? "INACTIVE" : "",
      expireDate: displayExpiredProducts ? "expired" : "",
      sellType:
        displayStoreProducts || displayBuyGroupProducts ? sellType() : "",
      discount: displayDiscountedProducts,
    },
    hasPermission,
  );

  const { data, refetch } = allManagedProductsQuery;
  const [products, setProducts] = useState(data?.data || []);
  const [totalCount, setTotalCount] = useState(data?.totalCount || 0);

  const selectAll = () => {
    setSelectedBrandIds(
      brandsQuery?.data?.data?.map((item: any) => {
        return item.id;
      }) || [],
    );
    setDisplayStoreProducts(true);
    setDisplayBuyGroupProducts(true);
    setDisplayExpiredProducts(true);
    setDisplayHiddenProducts(true);
    setDisplayDiscountedProducts(true);
  };

  // const selectAllProducts = () => {
  //   // Select all products across all pages
  //   if (data?.data) {
  //     const allProductIds = data.data.map((product: any) => product.id);
  //     setSelectedProductIds(allProductIds);
  //     setGlobalSelectedIds(new Set(allProductIds));
  //   }
  // };

  // const clearAllProductSelections = () => {
  //   // Clear all product selections across all pages
  //   setSelectedProductIds([]);
  //   setGlobalSelectedIds(new Set());
    
  //   // Disable the filter if it was active
  //   if (showOnlySelected) {
  //     setShowOnlySelected(false);
  //   }
  // };

  const clearFilter = () => {
    setSelectedBrandIds([]);
    setDisplayStoreProducts(false);
    setDisplayBuyGroupProducts(false);
    setDisplayExpiredProducts(false);
    setDisplayHiddenProducts(false);
    setDisplayDiscountedProducts(false);

    if (searchInputRef?.current) searchInputRef.current.value = "";
  };

  // Update state when new data is available
  useEffect(() => {
    if (data?.data) {
      let filteredProducts = [...data.data];
      
      // Apply "Show Only Selected" filter if enabled
      if (showOnlySelected && globalSelectedIds.size > 0) {
        // When filter is active, we show ALL selected products from the fetched data
        filteredProducts = data.data.filter((product: any) => globalSelectedIds.has(product.id));
        
        // Update total count to show how many selected products we found
        setTotalCount(filteredProducts.length);
      } else {
        // When filter is not active, show all products from current page
        filteredProducts = [...data.data];
        setTotalCount(data.totalCount);
      }
      
      setProducts(filteredProducts);
      
      // Sync current page selections with global selections
      const currentPageIds = filteredProducts.map((product: any) => product.id);
      const currentPageSelections = currentPageIds.filter((id: number) => globalSelectedIds.has(id));
      setSelectedProductIds(currentPageSelections);
    }
  }, [data, globalSelectedIds, showOnlySelected]);

  // Handle filter state changes and refetch data when needed
  useEffect(() => {
    if (showOnlySelected && globalSelectedIds.size > 0) {
      // When filter becomes active, refetch to get all products for filtering
      refetch();
    }
  }, [showOnlySelected, globalSelectedIds, refetch]);

  // Function to remove a product from the state
  const handleRemoveFromList = (removedProductId: number) => {
    setProducts((prevProducts: any[]) =>
      prevProducts.filter((product) => product.id !== removedProductId),
    );
    setTotalCount((prevCount: number) => prevCount - 1);
    
    // Remove from global selections if it exists there
    setGlobalSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(removedProductId);
      return newSet;
    });
    
    // Disable filter if no more selected products
    if (globalSelectedIds.size === 0 && showOnlySelected) {
      setShowOnlySelected(false);
    }
    
    // If the last product on the page is removed, adjust pagination
    if (products.length === 1 && page > 1) {
      setPage(page - 1); // Move to previous page
    } else {
      refetch(); // Otherwise, just refresh the data
    }
  };

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handleAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const handleProductIds = (checked: boolean | string, id: number) => {
    let tempArr = selectedProductIds || [];
    if (checked && !tempArr.find((ele: number) => ele === id)) {
      tempArr = [...tempArr, id];
      // Add to global selection
      setGlobalSelectedIds(prev => new Set(Array.from(prev).concat([id])));
    }

    if (!checked && tempArr.find((ele: number) => ele === id)) {
      tempArr = tempArr.filter((ele: number) => ele !== id);
      // Remove from global selection
      setGlobalSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }

    setSelectedProductIds(tempArr);
  };

  const onSubmit = async (formData: any) => {
    // Use global selections if available, otherwise use current page selections
    const productsToUpdate = Array.from(globalSelectedIds).length > 0 
      ? Array.from(globalSelectedIds) 
      : selectedProductIds;
      
    if (!productsToUpdate.length) {
      toast({
        title: t("update_failed"),
        description: t("please_select_at_least_one_product"),
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

    const formatData = productsToUpdate.map((ele: number) => {
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
        vendorDiscountType:
          updatedFormData.vendorDiscountType 
          ? updatedFormData.vendorDiscountType
          : undefined,
        consumerDiscountType:
          updatedFormData.consumerDiscountType
            ? updatedFormData.consumerDiscountType
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

    // Note: updateMultipleProductPrice is not imported, need to add the import
    // const response = await updateMultipleProductPrice.mutateAsync({
    //   productPrice: [...finalData],
    // });

    // if (response.status) {
    //   toast({
    //     title: t("update_successful"),
    //     description: t("products_updated_successfully"),
    //     variant: "success",
    //   });
    //   // **Trigger refetch to update the product list**
    //   await refetch();

    //   form.reset();
    //   setSelectedProductIds([]);
    //   setGlobalSelectedIds(new Set()); // Clear global selections after successful update
    //   router.push("/manage-products");
    // } else {
    //   toast({
    //     title: t("update_failed"),
    //     description: response.message,
    //     variant: "danger",
    //   });
    // }
  };

  useEffect(() => {
    if (!hasPermission) router.push("/home");
  }, []);

  if (!hasPermission) return <div></div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t("products")}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  placeholder={t("search_product")}
                  className="w-64 h-10"
                  onChange={handleDebounce}
                  ref={searchInputRef}
                  dir={langDir}
                  translate="no"
                />

                <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}>
                  <DialogTrigger asChild>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                      onClick={handleAddProductModal}
                      dir={langDir}
                    >
                      <IoMdAdd size={20} />
                      <span>{t("add_product")}</span>
                    </button>
                  </DialogTrigger>
                  <AddProductContent onClose={() => setIsAddProductModalOpen(false)} />
                </Dialog>
                {/* <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={selectAllProducts}
                  dir={langDir}
                  translate="no"
                >
                  Select All Products
                </button> */}
                {/* <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  onClick={clearAllProductSelections}
                  dir={langDir}
                  translate="no"
                >
                  Clear All
                </button> */}
                {Array.from(globalSelectedIds).length > 0 && (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    onClick={() => router.push(`/manage-products/bulk-action?ids=${Array.from(globalSelectedIds).join(',')}`)}
                    dir={langDir}
                  >
                    Bulk Action ({Array.from(globalSelectedIds).length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Filters - Left Side */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-4">
                      <div className="flex gap-2 mb-4">
                        <button 
                          type="button" 
                          onClick={selectAll}
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                        >
                          {t("select_all")}
                        </button>
                        <button 
                          type="button" 
                          onClick={clearFilter}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                        >
                          {t("clean_select")}
                        </button>
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <Accordion
                      type="multiple"
                      defaultValue={["brand"]}
                      className="mb-4"
                    >
                      <AccordionItem value="brand">
                        <AccordionTrigger className="text-base hover:!no-underline">
                          {t("by_brand")}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mb-3">
                            <Input
                              type="text"
                              placeholder={t("search_brand")}
                              className="w-full h-8 text-sm"
                              onChange={handleDebounceBrandSearch}
                              dir={langDir}
                              translate="no"
                            />
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {!memoizedBrands.length ? (
                              <p className="text-center text-sm text-gray-500">
                                {t("no_data_found")}
                              </p>
                            ) : null}
                            {memoizedBrands.map((item: ISelectOptions) => (
                              <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.label}
                                  className="border border-gray-300 data-[state=checked]:!bg-blue-600"
                                  onCheckedChange={(checked) =>
                                    handleBrandChange(checked, item)
                                  }
                                  checked={selectedBrandIds.includes(item.value)}
                                />
                                <label
                                  htmlFor={item.label}
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Product Conditions Filter */}
                    <Accordion
                      type="multiple"
                      defaultValue={["product_conditions"]}
                    >
                      <AccordionItem value="product_conditions">
                        <AccordionTrigger className="text-base hover:!no-underline">
                          {t("by_menu")}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="displayStoreProducts"
                                className="border border-gray-300 data-[state=checked]:!bg-blue-600"
                                onCheckedChange={(checked: boolean) =>
                                  setDisplayStoreProducts(checked)
                                }
                                checked={displayStoreProducts}
                              />
                              <label
                                htmlFor="displayStoreProducts"
                                className="text-sm font-medium cursor-pointer"
                                dir={langDir}
                                translate="no"
                              >
                                {t("store")}
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="displayBuyGroupProducts"
                                className="border border-gray-300 data-[state=checked]:!bg-blue-600"
                                onCheckedChange={(checked: boolean) => {
                                  setDisplayBuyGroupProducts(checked);
                                  setDisplayExpiredProducts(
                                    checked
                                      ? displayExpiredProducts
                                      : false,
                                  );
                                }}
                                checked={displayBuyGroupProducts}
                              />
                              <label
                                htmlFor="displayBuyGroupProducts"
                                className="text-sm font-medium cursor-pointer"
                                dir={langDir}
                                translate="no"
                              >
                                {t("buy_group")}
                              </label>
                            </div>
                            {displayBuyGroupProducts ? (
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="displayExpiredProducts"
                                  className="border border-gray-300 data-[state=checked]:!bg-blue-600"
                                  onCheckedChange={(checked: boolean) =>
                                    setDisplayExpiredProducts(checked)
                                  }
                                  checked={displayExpiredProducts}
                                />
                                <label
                                  htmlFor="displayExpiredProducts"
                                  className="text-sm font-medium cursor-pointer"
                                  dir={langDir}
                                  translate="no"
                                >
                                  {t("expired")}
                                </label>
                              </div>
                            ) : null}
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="displayHiddenProducts"
                                className="border border-gray-300 data-[state=checked]:!bg-blue-600"
                                onCheckedChange={(checked: boolean) =>
                                  setDisplayHiddenProducts(checked)
                                }
                                checked={displayHiddenProducts}
                              />
                              <label
                                htmlFor="displayHiddenProducts"
                                className="text-sm font-medium cursor-pointer"
                                dir={langDir}
                                translate="no"
                              >
                                {t("hidden")}
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="displayDiscountedProducts"
                                className="border border-gray-300 data-[state=checked]:!bg-blue-600"
                                onCheckedChange={(checked: boolean) =>
                                  setDisplayDiscountedProducts(checked)
                                }
                                checked={displayDiscountedProducts}
                              />
                              <label
                                htmlFor="displayDiscountedProducts"
                                className="text-sm font-medium cursor-pointer"
                                dir={langDir}
                                translate="no"
                              >
                                {t("discounted")}
                              </label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>

                {/* Products List - Right Side */}
                <div className="lg:w-3/4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                          {t("products")} ({totalCount})
                        </h2>
                        <div className="flex items-center gap-4">
                          {/* Show Only Selected Filter */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Show Selected :</label>
                            <button
                              type="button"
                              onClick={handleFilterToggle}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                showOnlySelected ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                  showOnlySelected ? 'translate-x-5' : 'translate-x-1'
                                }`}
                              />
                            </button>
                            {showOnlySelected && (
                              <span className="text-xs text-blue-600 font-medium">
                                ({Array.from(globalSelectedIds).length} selected)
                              </span>
                            )}
                          </div>
                          {/* Page Limit Selector */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Show:</label>
                            <select
                              value={limit}
                              onChange={(e) => handleLimitChange(Number(e.target.value))}
                              className="h-8 px-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value={3}>3</option>
                              <option value={6}>6</option>
                              <option value={12}>12</option>
                              <option value={24}>24</option>
                              <option value={50}>50</option>
                            </select>
                          </div>



                          {/* <div className="text-sm text-gray-600">
                            <span className="font-medium">Current Page:</span> {selectedProductIds.length} selected
                            {Array.from(globalSelectedIds).length > 0 && (
                              <span className="ml-3">
                                <span className="font-medium">Total:</span> {Array.from(globalSelectedIds).length} selected
                              </span>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>

                                         {allManagedProductsQuery.isLoading ? (
                       <div className="space-y-4">
                         {Array.from({ length: 6 }).map((_, index) => (
                           <Skeleton key={index} className="h-24 w-full" />
                         ))}
                       </div>
                     ) : null}

                    {!allManagedProductsQuery.data?.data?.length &&
                    !allManagedProductsQuery.isLoading ? (
                      <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">
                          {t("no_product_found")}
                        </p>
                      </div>
                    ) : null}

                    {/* Show message when filter is active but no products match */}
                    {showOnlySelected && products.length === 0 && allManagedProductsQuery.data?.data?.length > 0 ? (
                      <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">
                          No selected products found in the current data
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Try refreshing the page or check if your selections are still valid
                        </p>
                        <button
                          onClick={() => setShowOnlySelected(false)}
                          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Show All Products
                        </button>
                      </div>
                    ) : null}

                                         <div className="space-y-4">
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
                           stock: number;
                           consumerType: string;
                           sellType: string;
                           deliveryAfter: number;
                           timeOpen: number | null;
                           timeClose: number | null;
                           vendorDiscount: number | null;
                           vendorDiscountType: string | null;
                           consumerDiscount: number | null;
                           consumerDiscountType: string | null;
                           minQuantity: number | null;
                           maxQuantity: number | null;
                           minCustomer: number | null;
                           maxCustomer: number | null;
                           minQuantityPerCustomer: number | null;
                           maxQuantityPerCustomer: number | null;
                           productCondition: string;
                         }) => (
                           <ManageProductCard
                             key={product?.id}
                             selectedIds={selectedProductIds}
                             onSelectedId={handleProductIds}
                             id={product?.id}
                             productId={product?.productId}
                             status={product?.status}
                             askForPrice={product?.askForPrice}
                             askForStock={product?.askForStock}
                             productImage={
                               product?.productPrice_productSellerImage
                                 ?.length
                                 ? product
                                     ?.productPrice_productSellerImage?.[0]
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
                             stock={product?.stock}
                             consumerType={product?.consumerType}
                             sellType={product?.sellType}
                             timeOpen={product?.timeOpen}
                             timeClose={product?.timeClose}
                             vendorDiscount={product?.vendorDiscount}
                             vendorDiscountType={product?.vendorDiscountType}
                             consumerDiscount={product?.consumerDiscount}
                             consumerDiscountType={product?.consumerDiscountType}
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
                             onRemove={handleRemoveFromList}
                           />
                         ),
                       )}
                     </div>

                    {!showOnlySelected && totalCount > limit ? (
                      <div className="mt-8">
                        <Pagination
                          page={page}
                          setPage={handlePageChange}
                          totalCount={totalCount}
                          limit={limit}
                        />
                      </div>
                    ) : null}
                    {showOnlySelected && (
                      <div className="mt-8 text-center text-gray-500">
                        Showing {products.length} selected products from all pages
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      
    </>
  );
};

export default withActiveUserGuard(ManageProductsPage);
