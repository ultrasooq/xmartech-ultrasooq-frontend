"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAllManagedProducts } from "@/apis/queries/product.queries";
import ManageProductCard from "@/components/modules/manageProducts/ManageProductCard";
import ManageProductAside from "@/components/modules/manageProducts/ManageProductAside";
import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { withActiveUserGuard } from "@/components/shared/withRouteGuard";
import { PERMISSION_PRODUCTS, checkPermission } from "@/helpers/permission";

const BulkActionPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasPermission = checkPermission(PERMISSION_PRODUCTS);
  
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [prefilledData, setPrefilledData] = useState<{[key: string]: any}>();

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
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
      productCondition: "NEW",
      isProductConditionRequired: false,
      isStockRequired: false,
      isOfferPriceRequired: false,
      isDeliveryAfterRequired: false,
      isConsumerTypeRequired: false,
      isSellTypeRequired: false,
      isVendorDiscountRequired: false,
      isConsumerDiscountRequired: false,
      isMinQuantityRequired: false,
      isMaxQuantityRequired: false,
      isMinCustomerRequired: false,
      isMaxCustomerRequired: false,
      isMinQuantityPerCustomerRequired: false,
      isMaxQuantityPerCustomerRequired: false,
    },
  });

  // Get product IDs from URL params
  const productIdsParam = searchParams?.get('ids');
  const productIds = productIdsParam ? productIdsParam.split(',').map(Number) : [];

  // Fetch all products to get the selected ones
  const allProductsQuery = useAllManagedProducts(
    {
      page: 1,
      limit: 1000, // Get all products to filter
      term: "",
      selectedAdminId: undefined,
      brandIds: "",
      status: "",
      expireDate: "",
      sellType: "",
      discount: false,
    },
    hasPermission,
  );

  // Filter selected products based on IDs from URL
  useEffect(() => {
    if (allProductsQuery.data?.data && productIds.length > 0) {
      const filtered = allProductsQuery.data.data.filter((product: any) => 
        productIds.includes(product.id)
      );
      setSelectedProducts(filtered);
      
      // Auto-populate prefilledData with the first product's data for bulk editing
      if (filtered.length > 0) {
        const firstProduct = filtered[0];
        console.log("First product data:", firstProduct);
        
        const productData = {
          stock: firstProduct.stock || 0,
          askForPrice: firstProduct.askForPrice || "false",
          askForStock: firstProduct.askForStock || "false",
          offerPrice: firstProduct.offerPrice || 0,
          productPrice: firstProduct.productPrice || 0,
          status: firstProduct.status || "ACTIVE",
          productCondition: firstProduct.productCondition || "NEW",
          consumerType: firstProduct.consumerType || "CONSUMER",
          sellType: firstProduct.sellType || "NORMALSELL",
          deliveryAfter: firstProduct.deliveryAfter || 0,
          timeOpen: firstProduct.timeOpen || 0,
          timeClose: firstProduct.timeClose || 0,
          vendorDiscount: firstProduct.vendorDiscount || 0,
          vendorDiscountType: firstProduct.vendorDiscountType || "PERCENTAGE",
          consumerDiscount: firstProduct.consumerDiscount || 0,
          consumerDiscountType: firstProduct.consumerDiscountType || "PERCENTAGE",
          minQuantity: firstProduct.minQuantity || 0,
          maxQuantity: firstProduct.maxQuantity || 0,
          minCustomer: firstProduct.minCustomer || 0,
          maxCustomer: firstProduct.maxCustomer || 0,
          minQuantityPerCustomer: firstProduct.minQuantityPerCustomer || 0,
          maxQuantityPerCustomer: firstProduct.maxQuantityPerCustomer || 0,
        };
        setPrefilledData(productData);
        console.log("Auto-populated prefilledData:", productData);
      }
    }
  }, [allProductsQuery.data, productIds]);

  // Handle product data selection for aside
  const handleProductDataSelection = (data: { [key: string]: any }) => {
    setPrefilledData(data);
  };

  // Redirect if no permission
  useEffect(() => {
    if (!hasPermission) {
      router.push("/home");
    }
  }, [hasPermission, router]);

  // Redirect if no products selected
  useEffect(() => {
    if (productIds.length === 0) {
      router.push("/manage-products");
    }
  }, [productIds, router]);

  if (!hasPermission) return <div></div>;

  if (allProductsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (selectedProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg mb-4">No products found</div>
          <button
            onClick={() => router.push("/manage-products")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Manage Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bulk Action
              </h1>
              <p className="text-gray-600 mt-2">
                Managing Products: {selectedProducts.length} products selected
              </p>
            </div>
            <button
              onClick={() => router.push("/manage-products")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Back to Manage Products
            </button>
          </div>
        </div>

        {/* Main Content */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Products List - Left Side */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Selected Products
                  </h2>
                  
                  <div className="space-y-4">
                    {selectedProducts.map((product: any) => (
                      <ManageProductCard
                        key={product.id}
                        selectedIds={[]} // Empty array to hide checkboxes
                        onSelectedId={() => {}} // No-op function
                        onSelect={handleProductDataSelection}
                        id={product.id}
                        productId={product.productId}
                        status={product.status}
                        askForPrice={product.askForPrice}
                        askForStock={product.askForStock}
                        productImage={
                          product?.productPrice_productSellerImage?.length
                            ? product?.productPrice_productSellerImage?.[0]?.image
                            : product?.productPrice_product?.productImages?.[0]?.image
                        }
                        productName={product?.productPrice_product?.productName}
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
                        minQuantityPerCustomer={product?.minQuantityPerCustomer}
                        maxQuantityPerCustomer={product?.maxQuantityPerCustomer}
                        productCondition={product?.productCondition}
                        onRemove={() => {}} // No-op function to hide remove button
                        hideCheckbox={true}
                        hideEyeIcon={true}
                        hideCopyButton={true}
                        hideActionButtons={true}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ManageProductAside - Right Side */}
              <div className="lg:w-1/3">
                <div className="sticky top-6">
                  <ManageProductAside
                    isLoading={false}
                    prefilledData={prefilledData}
                  />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default withActiveUserGuard(BulkActionPage);
