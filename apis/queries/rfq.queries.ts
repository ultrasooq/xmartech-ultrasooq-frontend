/**
 * @fileoverview TanStack React Query hooks for the RFQ (Request For
 * Quotation) and Factories modules.
 *
 * Covers RFQ product listings, factories product listings, RFQ / factories
 * cart operations, quote submission and deletion, customize-product
 * requests, duplicate-product RFQ creation, and RFQ request visibility.
 *
 * @module queries/rfq
 */

import { APIResponseError } from "@/utils/types/common.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCustomizeProductApi,
  addFactoriesProductApi,
  addFactoriesQuotes,
  addProductDuplicateRfq,
  addRfqProduct,
  addRfqQuotes,
  deleteFactoriesCartItem,
  deleteRfqCartItem,
  deleteRfqQuote,
  fetchAllRfqQuotesByBuyerId,
  fetchAllRfqQuotesUsersByBuyerId,
  fetchAllRfqQuotesUsersBySellerId,
  fetchFactoriesCartByUserId,
  fetchFactoriesProducts,
  fetchFactoriesProductsByUserBusinessCategory,
  fetchOneRfqQuotesUsersByBuyerID,
  fetchRfqCartByUserId,
  fetchRfqProductById,
  fetchRfqProducts,
  hideRfqRequest,
  updateFactoriesCartWithLogin,
  updateRfqCartWithLogin,
  updateRfqProduct,
} from "../requests/rfq.requests";
import { AddRfqQuotesRequest, AddFactoriesQuotesRequest } from "@/utils/types/rfq.types";

/**
 * Query hook that fetches paginated RFQ products with optional filters.
 *
 * @remarks
 * Query key: `["rfq-products", payload]`
 * Endpoint: Delegated to `fetchRfqProducts` in rfq.requests.
 */
export const useRfqProducts = (
  payload: {
    page: number;
    limit: number;
    term?: string;
    adminId?: string;
    sortType?: "newest" | "oldest";
    brandIds?: string;
    isOwner?: string;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-products", payload],
    queryFn: async () => {
      const res = await fetchRfqProducts(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

  /**
   * Query hook that fetches paginated factories products with optional filters.
   *
   * @remarks
   * Query key: `["factoriesProducts", payload]`
   * Endpoint: Delegated to `fetchFactoriesProducts` in rfq.requests.
   */
  export const useFactoriesProducts = (
    payload: {
      page: number;
      limit: number;
      term?: string;
      adminId?: string;
      sortType?: "newest" | "oldest";
      brandIds?: string;
      isOwner?: string;
      related?: boolean;
    },
    enabled = true,
  ) =>
    useQuery({
      queryKey: ["factoriesProducts", payload],
      queryFn: async () => {
        const res = await fetchFactoriesProducts(payload);
        return res.data;
      },
      // onError: (err: APIResponseError) => {
      //   console.log(err);
      // },
      enabled,
    });

    /**
     * Query hook that fetches factories products filtered by the user's
     * business category.
     *
     * @remarks
     * Query key: `["factoriesProducts", payload]`
     * Endpoint: Delegated to `fetchFactoriesProductsByUserBusinessCategory` in rfq.requests.
     */
    export const useFactoriesProductsByUserBusinessCategory = (
      payload: {
        page: number;
        limit: number;
        term?: string;
        adminId?: string;
        sortType?: "newest" | "oldest";
        brandIds?: string;
        isOwner?: string;
      },
      enabled = true,
    ) =>
      useQuery({
        queryKey: ["factoriesProducts", payload],
        queryFn: async () => {
          const res = await fetchFactoriesProductsByUserBusinessCategory(payload);
          return res.data;
        },
        // onError: (err: APIResponseError) => {
        //   console.log(err);
        // },
        enabled,
      });

/**
 * Query hook that fetches a single RFQ product by its ID.
 *
 * @remarks
 * Query key: `["rfq-product-by-id", id]`
 * Endpoint: Delegated to `fetchRfqProductById` in rfq.requests.
 */
export const useRfqProductById = (id: string, enabled = true) =>
  useQuery({
    queryKey: ["rfq-product-by-id", id],
    queryFn: async () => {
      const res = await fetchRfqProductById({ rfqProductId: id });
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to add a new RFQ product.
 *
 * @remarks
 * - **Payload**: `{ productNote, rfqProductName, rfqProductImagesList }`
 * - **Invalidates**: `["rfq-products"]` on success.
 * - Endpoint: Delegated to `addRfqProduct` in rfq.requests.
 */
export const useAddRfqProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      productNote: string;
      rfqProductName: string;
      rfqProductImagesList: { imageName: string; image: string }[];
    }
  >({
    mutationFn: async (payload) => {
      const res = await addRfqProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to update an existing RFQ product.
 *
 * @remarks
 * - **Payload**: `{ rFqProductId, productNote, rfqProductName, rfqProductImagesList }`
 * - **Invalidates**: `["rfq-products"]` on success.
 * - Endpoint: Delegated to `updateRfqProduct` in rfq.requests.
 */
export const useUpdateRfqProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      rFqProductId: number;
      productNote: string;
      rfqProductName: string;
      rfqProductImagesList: { imageName: string; image: string }[];
    }
  >({
    mutationFn: async (payload) => {
      const res = await updateRfqProduct(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Query hook that fetches the RFQ cart items for the authenticated user.
 *
 * @remarks
 * Query key: `["rfq-cart-by-user", payload]`
 * Endpoint: Delegated to `fetchRfqCartByUserId` in rfq.requests.
 */
export const useRfqCartListByUserId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-cart-by-user", payload],
    queryFn: async () => {
      const res = await fetchRfqCartByUserId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

  /**
   * Query hook that fetches factories cart items for the authenticated user.
   *
   * @remarks
   * Query key: `["factories-cart-by-user", payload]`
   * Endpoint: Delegated to `fetchFactoriesCartByUserId` in rfq.requests.
   */
  export const useFactoriesCartListByUserId = (
    payload: {
      page: number;
      limit: number;
    },
    enabled = true,
  ) =>
    useQuery({
      queryKey: ["factories-cart-by-user", payload],
      queryFn: async () => {
        const res = await fetchFactoriesCartByUserId(payload);
        return res.data;
      },
      // onError: (err: APIResponseError) => {
      //   console.log(err);
      // },
      enabled,
    });

/**
 * Mutation hook to add or update an RFQ cart item.
 *
 * @remarks
 * - **Payload**: `{ productId, quantity, productType?, offerPriceFrom?, offerPriceTo?, note? }`
 * - **Invalidates**: `["rfq-cart-by-user"]`, `["rfq-products"]` on success.
 * - Endpoint: Delegated to `updateRfqCartWithLogin` in rfq.requests.
 */
export const useUpdateRfqCartWithLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number; quantity: number; productType?: "SAME" | "SIMILAR"; offerPriceFrom?: number; offerPriceTo?: number; note?: string }
  >({
    mutationFn: async (payload) => {
      const res = await updateRfqCartWithLogin(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["rfq-cart-count-with-login"],
      // });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to add or update a factories cart item.
 *
 * @remarks
 * - **Payload**: `{ productId, quantity, customizeProductId }`
 * - **Invalidates**: `["factories-cart-by-user"]`, `["factoriesProducts"]` on success.
 * - Endpoint: Delegated to `updateFactoriesCartWithLogin` in rfq.requests.
 */
export const useUpdateFactoriesCartWithLogin = () =>
  {
    const queryClient = useQueryClient();
    return useMutation<
      { data: any; message: string; status: boolean },
      APIResponseError,
      { productId: number; quantity: number; customizeProductId: number }
    >({
      mutationFn: async (payload) => {
        const res = await updateFactoriesCartWithLogin(payload);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["factories-cart-by-user"],
        });
        queryClient.invalidateQueries({
          queryKey: ["factoriesProducts"],
        });
        // queryClient.invalidateQueries({
        //   queryKey: ["rfq-cart-count-with-login"],
        // });
      },
      onError: (err: APIResponseError) => {
      },
    });
  };

/**
 * Mutation hook to add a product to the factories module.
 *
 * @remarks
 * - **Payload**: `{ productId: number }`
 * - Endpoint: Delegated to `addFactoriesProductApi` in rfq.requests.
 */
export const useAddFactoriesProduct = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number }
  >({
    mutationFn: async (payload) => {
      const res = await addFactoriesProductApi(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to submit a customize-product request with a price range.
 *
 * @remarks
 * - **Payload**: `{ productId, note, fromPrice, toPrice }`
 * - Endpoint: Delegated to `addCustomizeProductApi` in rfq.requests.
 */
export const useAddCustomizeProduct = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number, note: string, fromPrice: number, toPrice: number }
  >({
    mutationFn: async (payload) => {
      const res = await addCustomizeProductApi(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to delete an RFQ cart item.
 *
 * @remarks
 * - **Payload**: `{ rfqCartId: number }`
 * - **Invalidates**: `["rfq-cart-by-user"]`, `["rfq-products"]` on success.
 * - Endpoint: Delegated to `deleteRfqCartItem` in rfq.requests.
 */
export const useDeleteRfqCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { rfqCartId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteRfqCartItem(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-by-device"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-count-with-login"],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ["cart-count-without-login"],
      // });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to delete a factories cart item.
 *
 * @remarks
 * - **Payload**: `{ factoriesCartId: number }`
 * - **Invalidates**: `["factories-cart-by-user"]`, `["factoriesProducts"]` on success.
 * - Endpoint: Delegated to `deleteFactoriesCartItem` in rfq.requests.
 */
export const useDeleteFactoriesCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { factoriesCartId: number }
  >({
    mutationFn: async (payload) => {
      const res = await deleteFactoriesCartItem(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["factories-cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["factoriesProducts"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};


/**
 * Query hook that fetches all RFQ quote requests submitted by the buyer.
 *
 * @remarks
 * Query key: `["rfq-quotes-request", payload]`
 * Endpoint: Delegated to `fetchAllRfqQuotesByBuyerId` in rfq.requests.
 */
export const useAllRfqQuotesByBuyerId = (
  payload: {
    page: number;
    limit: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-request", payload],
    queryFn: async () => {
      const res = await fetchAllRfqQuotesByBuyerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches all RFQ quote users (seller responses)
 * for a specific quote request owned by the buyer.
 *
 * @remarks
 * Query key: `["rfq-quotes-users", payload]`
 * Endpoint: Delegated to `fetchAllRfqQuotesUsersByBuyerId` in rfq.requests.
 */
export const useAllRfqQuotesUsersByBuyerId = (
  payload: {
    page: number;
    limit: number;
    rfqQuotesId: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-users", payload],
    queryFn: async () => {
      const res = await fetchAllRfqQuotesUsersByBuyerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches a single RFQ quotes-user entry by buyer ID.
 *
 * @remarks
 * Query key: `["rfq-quotes-by-buyer-id", payload]`
 * Endpoint: Delegated to `fetchOneRfqQuotesUsersByBuyerID` in rfq.requests.
 */
export const useFindOneRfqQuotesUsersByBuyerID = (
  payload: {
    rfqQuotesId?: number;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-by-buyer-id", payload],
    queryFn: async () => {
      const res = await fetchOneRfqQuotesUsersByBuyerID(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Query hook that fetches all RFQ quote requests visible to the seller,
 * with optional `showHidden` filter.
 *
 * @remarks
 * Query key: `["rfq-quotes-by-seller-id", payload]`
 * Endpoint: Delegated to `fetchAllRfqQuotesUsersBySellerId` in rfq.requests.
 */
export const useAllRfqQuotesUsersBySellerId = (
  payload: {
    page: number;
    limit: number;
    showHidden?: boolean;
  },
  enabled = true,
) =>
  useQuery({
    queryKey: ["rfq-quotes-by-seller-id", payload],
    queryFn: async () => {
      const res = await fetchAllRfqQuotesUsersBySellerId(payload);
      return res.data;
    },
    // onError: (err: APIResponseError) => {
    //   console.log(err);
    // },
    enabled,
  });

/**
 * Mutation hook to submit a new RFQ quote request as a buyer.
 *
 * @remarks
 * - **Payload**: {@link AddRfqQuotesRequest}
 * - **Invalidates**: `["rfq-quotes-request"]` on success.
 * - Endpoint: Delegated to `addRfqQuotes` in rfq.requests.
 */
export const useAddRfqQuotes = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    AddRfqQuotesRequest
  >({
    mutationFn: async (payload) => {
      const res = await addRfqQuotes(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-quotes-request"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to submit a factories quote request.
 *
 * @remarks
 * - **Payload**: {@link AddFactoriesQuotesRequest}
 * - **Invalidates**: `["factories-cart-by-user"]`, `["factories-quotes-request"]` on success.
 * - Endpoint: Delegated to `addFactoriesQuotes` in rfq.requests.
 */
export const useAddFactoriesRequestQuotes = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    AddFactoriesQuotesRequest
  >({
    mutationFn: async (payload) => {
      const res = await addFactoriesQuotes(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["factories-cart-by-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["factories-quotes-request"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to duplicate a product into the RFQ module.
 *
 * @remarks
 * - **Payload**: `{ productId: number }`
 * - Endpoint: Delegated to `addProductDuplicateRfq` in rfq.requests.
 */
export const useAddProductDuplicateRfq = () => {
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { productId: number }
  >({
    mutationFn: async (payload) => {
      const res = await addProductDuplicateRfq(payload);
      return res.data;
    },
    onSuccess: () => {},
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to delete an RFQ quote.
 *
 * @remarks
 * - **Payload**: `{ rfqQuotesId: number }`
 * - **Invalidates**: `["rfq-quotes-request"]` on success.
 * - Endpoint: Delegated to `deleteRfqQuote` in rfq.requests.
 */
export const useDeleteRfqQuote = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    {
      rfqQuotesId: number;
    }
  >({
    mutationFn: async (payload) => {
      const res = await deleteRfqQuote(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rfq-quotes-request"],
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};

/**
 * Mutation hook to toggle the visibility (hidden state) of an RFQ
 * request for the seller. Invalidates and force-refetches all seller
 * RFQ query variants.
 *
 * @remarks
 * - **Payload**: `{ rfqQuotesUserId: number; isHidden: boolean }`
 * - **Invalidates / refetches**: All queries with key `"rfq-quotes-by-seller-id"`.
 * - Endpoint: Delegated to `hideRfqRequest` in rfq.requests.
 */
export const useHideRfqRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    { data: any; message: string; status: boolean },
    APIResponseError,
    { rfqQuotesUserId: number; isHidden: boolean }
  >({
    mutationFn: async (payload) => {
      const res = await hideRfqRequest(payload);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate all queries that start with "rfq-quotes-by-seller-id"
      // This includes both visible (showHidden: false) and hidden (showHidden: true) queries
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "rfq-quotes-by-seller-id";
        },
      });
      // Force refetch to ensure data is updated immediately
      queryClient.refetchQueries({
        predicate: (query) => {
          return query.queryKey[0] === "rfq-quotes-by-seller-id";
        },
      });
    },
    onError: (err: APIResponseError) => {
    },
  });
};
