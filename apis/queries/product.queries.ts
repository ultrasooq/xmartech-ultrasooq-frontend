/**
 * @fileoverview TanStack React Query hooks for product CRUD, listings,
 * pricing, variants, vendor details, dropshipping, wholesale, and
 * product analytics tracking.
 *
 * This is the largest query module -- it exposes hooks for:
 * - Product creation, update, deletion, and removal
 * - Existing products (marketplace catalog), managed products, and
 *   products filtered by business category, buy-group, service,
 *   brand, related tags, and vendor
 * - Product pricing (single and multiple) and product condition
 * - Dropship operations (mark as dropshipable, bulk update, analytics)
 * - Wholesale products and dashboard
 * - Product view, click, and search analytics tracking
 *
 * @module queries/product
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMultiplePriceForProduct,
  createProduct,
  createDropshipProduct,
  deleteProduct,
  fetchAllBuyGroupProducts,
  fetchAllProducts,
  fetchAllProductsByUserBusinessCategory,
  fetchExistingProducts,
  fetchExistingProductForCopy,
  fetchExistingProductById,
  fetchProductById,
  fetchProductVariant,
  fetchProducts,
  fetchRelatedProducts,
  fetchRfqProductById,
  fetchSameBrandProducts,
  getAllManagedProducts,
  getAvailableProductsForDropship,
  getDropshipEarnings,
  getDropshipProducts,
  getOneProductByProductCondition,
  getOneWithProductPrice,
  getProductsByService,
  getVendorDetails,
  getVendorProducts,
  removeProduct,
  updateDropshipProductStatus,
  updateForCustomize,
  updateMultipleProductPrice,
  updateProduct,
  updateProductPriceByProductCondition,
  updateProductStatus,
  updateSingleProducts,
  markProductAsDropshipable,
  getMyDropshipableProducts,
  getDropshipAnalytics,
  bulkUpdateDropshipable,
  getWholesaleProducts,
  getWholesaleDashboard,
  getWholesaleProductSales,
  getUserOwnDropshipableProducts,
  getDropshipProductsFromOriginal,
  trackProductView,
  trackProductClick,
  trackProductSearch,
} from "../requests/product.request";
import {
  ICreateProduct,
  ICreateProductRequest,
  IDeleteProduct,
  IDeleteProductRequest,
  IUpdateProduct,
  IUpdateProductRequest,
} from "@/utils/types/product.types";

/**
 * Mutation hook to create a new product.
 *
 * @remarks
 * - **Payload**: {@link ICreateProductRequest}
 * - **Response**: {@link ICreateProduct}
 * - **Invalidates**: `["products"]`, `["managed-products"]`,
 *   `["existing-products"]`, `["rfq-products"]` on success.
 * - Endpoint: Delegated to `createProduct` in product.request.
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ICreateProduct, APIResponseError, ICreateProductRequest>({
    mutationFn: async (payload) => {
      const res = await createProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["managed-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches a seller's products with extensive filtering.
 *
 * @param payload - Pagination and filter parameters including userId, term, brandIds, status, etc.
 * @param enabled - Whether the query should execute. Defaults to `true`.
 *
 * @remarks
 * Query key: `["products", payload]`
 * Endpoint: Delegated to `fetchProducts` in product.request.
 */
export const useProducts = (
  payload: {
    userId: string;
    page: number;
    limit: number;
    term?: string;
    brandIds?: string;
    status?: string;
    expireDate?: string;
    sellType?: string;
    discount?: boolean;
    sort?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["products", payload],
    queryFn: async () => {
      const res = await fetchProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches a single product by its ID, with optional
 * user and shared-link context.
 *
 * @remarks
 * Query key: `["product-by-id", payload]`
 * Endpoint: Delegated to `fetchProductById` in product.request.
 */
export const useProductById = (
  payload: { productId: string; userId?: number; sharedLinkId?: string },
  enabled = true,
) =>
  useQuery({
    queryKey: ["product-by-id", payload],
    queryFn: async () => {
      const res = await fetchProductById(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches an RFQ product by its ID with optional user context.
 *
 * @remarks
 * Query key: `["product-rfq-by-id", payload]`
 * Endpoint: Delegated to `fetchRfqProductById` in product.request.
 */
export const useRfqProductById = (
  payload: { productId: string; userId?: number },
  enabled = true,
) =>
  useQuery({
    queryKey: ["product-rfq-by-id", payload],
    queryFn: async () => {
      const res = await fetchRfqProductById(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to delete a product.
 *
 * @remarks
 * - **Payload**: {@link IDeleteProductRequest}
 * - **Invalidates**: `["products"]`, `["existing-products"]` on success.
 * - Endpoint: Delegated to `deleteProduct` in product.request.
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<IDeleteProduct, APIResponseError, IDeleteProductRequest>({
    mutationFn: async (payload) => {
      const res = await deleteProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing product.
 *
 * @remarks
 * - **Payload**: {@link IUpdateProductRequest}
 * - **Invalidates**: `["products"]`, `["existing-products"]` on success.
 * - Endpoint: Delegated to `updateProduct` in product.request.
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<IUpdateProduct, APIResponseError, IUpdateProductRequest>({
    mutationFn: async (payload) => {
      const res = await updateProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update a product's customization settings.
 *
 * @remarks
 * - **Invalidates**: `["products"]` on success.
 * - Endpoint: Delegated to `updateForCustomize` in product.request.
 */
export const useUpdateForCustomize = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponseError>({
    mutationFn: async (payload) => {
      const res = await updateForCustomize(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["existing-products"],
      // });
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
  });
};

/**
 * Query hook that fetches existing (marketplace catalog) products
 * with search, sort, brand, price, and category filters.
 *
 * @remarks
 * Query key: `["existing-products", payload]`
 * Endpoint: Delegated to `fetchExistingProducts` in product.request.
 */
export const useExistingProduct = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    brandAddedBy?: number;
    categoryIds?: string;
    productType?: string;
    type?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["existing-products", payload],
    queryFn: async () => {
      const res = await fetchExistingProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook dedicated to the "Add from Existing Product" copy
 * functionality. Fetches existing products with filters suitable
 * for the copy UI.
 *
 * @remarks
 * Query key: `["existing-products-for-copy", payload]`
 * Endpoint: Delegated to `fetchExistingProductForCopy` in product.request.
 */
export const useExistingProductForCopy = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    categoryIds?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["existing-products-for-copy", payload],
    queryFn: async () => {
      const res = await fetchExistingProductForCopy(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook to fetch a single existing product by ID for the
 * copy functionality.
 *
 * @remarks
 * Query key: `["existing-product-by-id", payload]`
 * Endpoint: Delegated to `fetchExistingProductById` in product.request.
 */
export const useExistingProductById = (
  payload: {
    existingProductId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["existing-product-by-id", payload],
    queryFn: async () => {
      const res = await fetchExistingProductById(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches all products with extensive filters including
 * owner, user type, and related products.
 *
 * @remarks
 * Query key: `["existing-products", payload]`
 * Endpoint: Delegated to `fetchAllProducts` in product.request.
 */
export const useAllProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    userId?: number;
    categoryIds?: string;
    isOwner?: string;
    userType?: string;
    related?: boolean;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["existing-products", payload],
    queryFn: async () => {
      const res = await fetchAllProducts(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches all products filtered by the user's
 * business category.
 *
 * @remarks
 * Query key: `["existing-products", payload]`
 * Endpoint: Delegated to `fetchAllProductsByUserBusinessCategory` in product.request.
 */
export const useAllProductsByUserBusinessCategory = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    userId?: number;
    categoryIds?: string;
    isOwner?: string;
    userType?: string;
    related?: boolean;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["existing-products", payload],
    queryFn: async () => {
      const res = await fetchAllProductsByUserBusinessCategory(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches buy-group products with filters.
 *
 * @remarks
 * Query key: `["buygroup-products", payload]`
 * Endpoint: Delegated to `fetchAllBuyGroupProducts` in product.request.
 */
export const useAllBuyGroupProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    userId?: number;
    categoryIds?: string;
    isOwner?: string;
    userType?: string;
    related?: boolean;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["buygroup-products", payload],
    queryFn: async () => {
      const res = await fetchAllBuyGroupProducts(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches buy-group products filtered by the user's
 * business category.
 *
 * @remarks
 * Query key: `["buygroup-products", payload]`
 * Endpoint: Delegated to `fetchAllBuyGroupProducts` in product.request.
 */
export const useAllBuyGroupProductsByUserBusinessCategory = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    sort?: string;
    brandIds?: string;
    priceMin?: number;
    priceMax?: number;
    userId?: number;
    categoryIds?: string;
    isOwner?: string;
    userType?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["buygroup-products", payload],
    queryFn: async () => {
      const res = await fetchAllBuyGroupProducts(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches products with the same brand, excluding
 * an optional product.
 *
 * @remarks
 * Query key: `["same-brand-products", payload]`
 * Endpoint: Delegated to `fetchSameBrandProducts` in product.request.
 */
export const useSameBrandProducts = (
  payload: {
    page: number;
    limit: number;
    brandIds: string;
    userId?: number;
    productId?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["same-brand-products", payload],
    queryFn: async () => {
      const res = await fetchSameBrandProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches related products by shared tag IDs.
 *
 * @remarks
 * Query key: `["related-products", payload]`
 * Endpoint: Delegated to `fetchRelatedProducts` in product.request.
 */
export const useRelatedProducts = (
  payload: {
    page: number;
    limit: number;
    tagIds: string;
    userId?: number;
    productId?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["related-products", payload],
    queryFn: async () => {
      const res = await fetchRelatedProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to add multiple price entries to a product.
 *
 * @remarks
 * - **Invalidates**: `["existing-products"]`, `["managed-products"]` on success.
 * - Endpoint: Delegated to `addMultiplePriceForProduct` in product.request.
 */
export const useAddMultiplePriceForProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, any>({
    mutationFn: async (payload) => {
      const res = await addMultiplePriceForProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["managed-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update multiple product prices.
 *
 * @remarks
 * - **Invalidates**: `["managed-products"]`, `["existing-products"]` on success.
 * - Endpoint: Delegated to `updateMultipleProductPrice` in product.request.
 */
export const useUpdateMultipleProductPrice = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, any>({
    mutationFn: async (payload) => {
      const res = await updateMultipleProductPrice(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managed-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches all managed (admin-assigned) products
 * with pagination and extensive filters.
 *
 * @remarks
 * Query key: `["managed-products", payload]`
 * Endpoint: Delegated to `getAllManagedProducts` in product.request.
 */
export const useAllManagedProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    selectedAdminId?: number;
    brandIds?: string;
    categoryIds?: string;
    status?: string;
    expireDate?: string;
    sellType?: string;
    discount?: boolean;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["managed-products", payload],
    queryFn: async () => {
      const res = await getAllManagedProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches a product with its price from another seller.
 *
 * @remarks
 * Query key: `["product-by-other-seller", payload]`
 * Endpoint: Delegated to `getOneWithProductPrice` in product.request.
 */
export const useOneWithProductPrice = (
  payload: {
    productId: number;
    adminId: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["product-by-other-seller", payload],
    queryFn: async () => {
      const res = await getOneWithProductPrice(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches vendor/seller profile details.
 *
 * @remarks
 * Query key: `["vendor-details", payload]`
 * Endpoint: Delegated to `getVendorDetails` in product.request.
 */
export const useVendorDetails = (
  payload: {
    adminId: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["vendor-details", payload],
    queryFn: async () => {
      const res = await getVendorDetails(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches a vendor's products with extensive filters.
 *
 * @remarks
 * Query key: `["vendor-products", payload]`
 * Endpoint: Delegated to `getVendorProducts` in product.request.
 */
export const useVendorProducts = (
  payload: {
    adminId: string;
    page: number;
    limit: number;
    term?: string;
    brandIds?: string;
    status?: string;
    expireDate?: string;
    sellType?: string;
    discount?: boolean;
    sort?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["vendor-products", payload],
    queryFn: async () => {
      const res = await getVendorProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches a product by its condition (product ID +
 * product price ID).
 *
 * @remarks
 * Query key: `["product-condition-by-id", payload]`
 * Endpoint: Delegated to `getOneProductByProductCondition` in product.request.
 */
export const useOneProductByProductCondition = (
  payload: {
    productId: number;
    productPriceId: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["product-condition-by-id", payload],
    queryFn: async () => {
      const res = await getOneProductByProductCondition(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to update a product price entry with description,
 * short descriptions, specifications, and seller images.
 *
 * @remarks
 * - **Invalidates**: `["managed-products"]`, `["existing-products"]` on success.
 * - Endpoint: Delegated to `updateProductPriceByProductCondition` in product.request.
 */
export const useUpdateProductPriceByProductCondition = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IUpdateProduct,
    APIResponseError,
    {
      description: string;
      productShortDescriptionList: {
        shortDescription: string;
      }[];
      productSpecificationList: {
        label: string;
        specification: string;
      }[];
      productSellerImageList: {
        productPriceId: string;
        imageName: string;
        image: string;
        videoName: string;
        video: string;
      }[];
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateProductPriceByProductCondition(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managed-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["existing-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update a product price's status (e.g., ACTIVE / INACTIVE).
 *
 * @remarks
 * - **Payload**: `{ productPriceId: number; status: string }`
 * - Endpoint: Delegated to `updateProductStatus` in product.request.
 */
export const useUpdateProductStatus = () => {
  return useMutation<
    any, // Replace with the actual API response type
    APIResponseError,
    { productPriceId: number; status: string }
  >({
    mutationFn: async ({ productPriceId, status }) => {
      const res = await updateProductStatus({ productPriceId, status });
      return res.data;
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update a single product price entry's full
 * details (stock, pricing, discounts, sell type, quantities, etc.).
 *
 * @remarks
 * - **Payload**: Detailed product price fields.
 * - Endpoint: Delegated to `updateSingleProducts` in product.request.
 */
export const useUpdateSingleProduct = () => {
  return useMutation<
    any, // Replace with the actual API response type
    APIResponseError,
    {
      productPriceId: number;
      stock: number;
      askForPrice: string;
      askForStock: string;
      offerPrice: number;
      productPrice: number;
      status: string;
      productCondition: string;
      consumerType: string;
      sellType: string;
      deliveryAfter: number;
      timeOpen: number;
      timeClose: number;
      vendorDiscount: number;
      vendorDiscountType: string | null;
      consumerDiscount: number;
      consumerDiscountType: string | null;
      minQuantity: number;
      maxQuantity: number;
      minCustomer: number;
      maxCustomer: number;
      minQuantityPerCustomer: number;
      maxQuantityPerCustomer: number;
    }
  >({
    mutationFn: async ({
      productPriceId,
      stock,
      askForPrice,
      askForStock,
      offerPrice,
      productPrice,
      status,
      productCondition,
      consumerType,
      sellType,
      deliveryAfter,
      timeOpen,
      timeClose,
      vendorDiscount,
      vendorDiscountType,
      consumerDiscount,
      consumerDiscountType,
      minQuantity,
      maxQuantity,
      minCustomer,
      maxCustomer,
      minQuantityPerCustomer,
      maxQuantityPerCustomer,
    }) => {
      const res = await updateSingleProducts({
        productPriceId,
        stock,
        askForPrice,
        askForStock,
        offerPrice,
        productPrice,
        status,
        productCondition,
        consumerType,
        sellType,
        deliveryAfter,
        timeOpen,
        timeClose,
        vendorDiscount,
        vendorDiscountType,
        consumerDiscount,
        consumerDiscountType,
        minQuantity,
        maxQuantity,
        minCustomer,
        maxCustomer,
        minQuantityPerCustomer,
        maxQuantityPerCustomer,
      });
      return res.data;
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to remove a product price from the catalog.
 *
 * @remarks
 * - **Payload**: `{ productPriceId: number }`
 * - Endpoint: Delegated to `removeProduct` in product.request.
 */
export const useRemoveProduct = () => {
  return useMutation<
    any, // Replace with the actual API response type
    APIResponseError,
    { productPriceId: number }
  >({
    mutationFn: async ({ productPriceId }) => {
      const res = await removeProduct({ productPriceId });
      return res.data;
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to fetch product variant data for a set of
 * product price IDs. Uses mutation for imperative invocation.
 *
 * @remarks
 * - **Payload**: `number[]` (product price IDs).
 * - Endpoint: Delegated to `fetchProductVariant` in product.request.
 */
export const useProductVariant = () => {
  const queryClient = useQueryClient();
  return useMutation<any, APIResponseError, number[]>({
    mutationFn: async (productPriceId: number[]) => {
      const res = await fetchProductVariant(productPriceId);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches products associated with a specific service.
 *
 * @remarks
 * Query key: `["products-by-service", serviceId, payload]`
 * Endpoint: Delegated to `getProductsByService` in product.request.
 */
export const useProductsByService = (
  serviceId: number,
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["products-by-service", serviceId, payload],
    queryFn: async () => {
      const res = await getProductsByService(serviceId, payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to mark or un-mark a product as dropshipable,
 * configuring commission and markup ranges.
 *
 * @remarks
 * - **Invalidates**: `["products"]`, `["my-dropshipable-products"]`,
 *   `["dropship-analytics"]` on success.
 * - Endpoint: Delegated to `markProductAsDropshipable` in product.request.
 */
export const useMarkProductAsDropshipable = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    APIResponseError,
    {
      productId: number;
      isDropshipable: boolean;
      dropshipCommission?: number;
      dropshipMinMarkup?: number;
      dropshipMaxMarkup?: number;
      dropshipSettings?: any;
    }
  >({
    mutationFn: async ({
      productId,
      isDropshipable,
      dropshipCommission,
      dropshipMinMarkup,
      dropshipMaxMarkup,
      dropshipSettings,
    }) => {
      const res = await markProductAsDropshipable(productId, {
        isDropshipable,
        dropshipCommission,
        dropshipMinMarkup,
        dropshipMaxMarkup,
        dropshipSettings,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-dropshipable-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dropship-analytics"],
      });
    },
  });
};

/**
 * Query hook that fetches the vendor's own dropshipable products.
 *
 * @remarks
 * Query key: `["my-dropshipable-products", payload]`
 * Endpoint: Delegated to `getMyDropshipableProducts` in product.request.
 */
export const useMyDropshipableProducts = (payload: {
  page: number;
  limit: number;
}) =>
  useQuery({
    queryKey: ["my-dropshipable-products", payload],
    queryFn: async () => {
      const res = await getMyDropshipableProducts(payload);
      return res.data;
    },
  });

/**
 * Query hook that fetches aggregated dropship analytics for the vendor.
 *
 * @remarks
 * Query key: `["dropship-analytics"]`
 * Endpoint: Delegated to `getDropshipAnalytics` in product.request.
 */
export const useDropshipAnalytics = () =>
  useQuery({
    queryKey: ["dropship-analytics"],
    queryFn: async () => {
      const res = await getDropshipAnalytics();
      return res.data;
    },
  });

/**
 * Mutation hook to bulk enable or disable dropshipping for multiple products.
 *
 * @remarks
 * - **Payload**: `{ productIds, isDropshipable, dropshipCommission?,
 *   dropshipMinMarkup?, dropshipMaxMarkup? }`
 * - **Invalidates**: `["products"]`, `["my-dropshipable-products"]`,
 *   `["dropship-analytics"]` on success.
 * - Endpoint: Delegated to `bulkUpdateDropshipable` in product.request.
 */
export const useBulkUpdateDropshipable = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    APIResponseError,
    {
      productIds: number[];
      isDropshipable: boolean;
      dropshipCommission?: number;
      dropshipMinMarkup?: number;
      dropshipMaxMarkup?: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await bulkUpdateDropshipable(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-dropshipable-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dropship-analytics"],
      });
    },
  });
};

/**
 * Query hook that fetches wholesale products with pagination.
 *
 * @remarks
 * Query key: `["wholesale-products", payload]`
 * Endpoint: Delegated to `getWholesaleProducts` in product.request.
 */
export const useWholesaleProducts = (payload: {
  page: number;
  limit: number;
}) =>
  useQuery({
    queryKey: ["wholesale-products", payload],
    queryFn: async () => {
      const res = await getWholesaleProducts(payload);
      return res.data;
    },
  });

/**
 * Query hook that fetches wholesale dashboard summary data.
 *
 * @remarks
 * Query key: `["wholesale-dashboard"]`
 * Endpoint: Delegated to `getWholesaleDashboard` in product.request.
 */
export const useWholesaleDashboard = () =>
  useQuery({
    queryKey: ["wholesale-dashboard"],
    queryFn: async () => {
      const res = await getWholesaleDashboard();
      return res.data;
    },
  });

/**
 * Query hook that fetches wholesale sales data for a specific product.
 *
 * @remarks
 * Query key: `["wholesale-product-sales", productId]`
 * Endpoint: Delegated to `getWholesaleProductSales` in product.request.
 */
export const useWholesaleProductSales = (productId: number, enabled: boolean = true) =>
  useQuery({
    queryKey: ["wholesale-product-sales", productId],
    queryFn: async () => {
      const res = await getWholesaleProductSales(productId);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches the user's own dropshipable products
 * (productType = "D", isDropshipable = true).
 *
 * @remarks
 * Query key: `["user-own-dropshipable-products", payload]`
 * Endpoint: Delegated to `getUserOwnDropshipableProducts` in product.request.
 */
export const useUserOwnDropshipableProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    brandIds?: string;
    categoryIds?: string;
    status?: string;
    sort?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["user-own-dropshipable-products", payload],
    queryFn: async () => {
      const res = await getUserOwnDropshipableProducts(payload);
      return res.data;
    },
    enabled,
  });

/**
 * Query hook that fetches dropship products that were created
 * from a specific original product.
 *
 * @remarks
 * Query key: `["dropship-products-from-original", originalProductId]`
 * Endpoint: Delegated to `getDropshipProductsFromOriginal` in product.request.
 */
export const useDropshipProductsFromOriginal = (originalProductId: number, enabled = true) =>
  useQuery({
    queryKey: ["dropship-products-from-original", originalProductId],
    queryFn: async () => {
      const res = await getDropshipProductsFromOriginal(originalProductId);
      return res.data;
    },
    enabled: enabled && !!originalProductId,
  });

/**
 * Mutation hook to track a product view event (analytics).
 *
 * @remarks
 * - **Payload**: `{ productId: number; deviceId?: string }`
 * - Endpoint: Delegated to `trackProductView` in product.request.
 */
export const useTrackProductView = () => {
  return useMutation({
    mutationFn: (payload: { productId: number; deviceId?: string }) =>
      trackProductView(payload),
  });
};

/**
 * Mutation hook to track a product click event (analytics).
 *
 * @remarks
 * - **Payload**: `{ productId: number; clickSource?: string; deviceId?: string }`
 * - Endpoint: Delegated to `trackProductClick` in product.request.
 */
export const useTrackProductClick = () => {
  return useMutation({
    mutationFn: (payload: { productId: number; clickSource?: string; deviceId?: string }) =>
      trackProductClick(payload),
  });
};

/**
 * Mutation hook to track a product search event (analytics).
 *
 * @remarks
 * - **Payload**: `{ searchTerm: string; productId?: number;
 *   clicked?: boolean; deviceId?: string }`
 * - Endpoint: Delegated to `trackProductSearch` in product.request.
 */
export const useTrackProductSearch = () => {
  return useMutation({
    mutationFn: (payload: { searchTerm: string; productId?: number; clicked?: boolean; deviceId?: string }) =>
      trackProductSearch(payload),
  });
};