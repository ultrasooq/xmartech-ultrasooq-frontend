"use client";
import React, { useEffect, useMemo, useRef, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import {
  IBrands,
  ISelectOptions,
  TrendingProduct,
} from "@/utils/types/common.types";
import { useBrands } from "@/apis/queries/masters.queries";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAllProducts,
  useProductVariant,
} from "@/apis/queries/product.queries";
import { useDropshipProducts } from "@/apis/queries/dropship.queries";
import ProductCard from "@/components/modules/trending/ProductCard";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import FilterMenuIcon from "@/components/icons/FilterMenuIcon";
import ProductTable from "@/components/modules/trending/ProductTable";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactSlider from "react-slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { stripHTML } from "@/utils/helper";
// import Image from "next/image";
// import TrendingBannerImage from "@/public/images/trending-product-inner-banner.png";
// import ChevronRightIcon from "@/public/images/nextarow.svg";
// import InnerBannerImage from "@/public/images/trending-product-inner-banner-pic.png";
import Footer from "@/components/shared/Footer";
import Pagination from "@/components/shared/Pagination";
import { useToast } from "@/components/ui/use-toast";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/apis/queries/user.queries";
import { useUserAccounts } from "@/hooks/useUserAccounts";
import {
  useCartListByDevice,
  useCartListByUserId,
  useDeleteCartItem,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import BannerSection from "@/components/modules/trending/BannerSection";
import SkeletonProductCardLoader from "@/components/shared/SkeletonProductCardLoader";
import { useCategoryStore } from "@/lib/categoryStore";
import TrendingCategories from "@/components/modules/trending/TrendingCategories";
import VendorsSection from "@/components/modules/trending/VendorsSection";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Package, Building2, X, ShoppingCart } from "lucide-react";
// @ts-ignore
import { startDebugger } from "remove-child-node-error-debugger";
import Cart from "@/components/modules/cartList/Cart";
import CategoryFilter from "@/components/modules/manageProducts/CategoryFilter";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useVendorBusinessCategories } from "@/hooks/useVendorBusinessCategories";
import { checkCategoryConnection } from "@/utils/categoryConnection";
import { useCategory } from "@/apis/queries/category.queries";

interface TrendingPageProps {
  searchParams?: Promise<{ term?: string }>;
}

const TrendingPage = (props0: TrendingPageProps) => {
  const searchParams = props0.searchParams ? use(props0.searchParams) : {};
  const t = useTranslations();
  const { langDir, currency, user } = useAuth();
  const currentAccount = useCurrentAccount();
  const currentTradeRole =
    currentAccount?.data?.data?.account?.tradeRole || user?.tradeRole;
  const queryClient = useQueryClient();
  const categoryStore = useCategoryStore();
  const vendorBusinessCategoryIds = useVendorBusinessCategories();
  // const searchParams = useSearchParams();
  const { toast } = useToast();
  const deviceId = getOrCreateDeviceId() || "";
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermBrand, setSearchTermBrand] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [productFilter, setProductFilter] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [displayMyProducts, setDisplayMyProducts] = useState("0");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [productVariants, setProductVariants] = useState<any[]>([]);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "vendors">(
    "products",
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const category = useCategoryStore();

  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);

  // const [searchUrlTerm, setSearchUrlTerm] = useState("");
  const searchUrlTerm = searchParams?.term || "";

  const me = useMe();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const deleteCartItem = useDeleteCartItem();

  const allProductsQuery = useAllProducts({
    page,
    limit,
    sort: sortBy,
    term: searchUrlTerm,
    priceMin:
      priceRange[0] === 0
        ? 0
        : ((priceRange[0] || Number(minPriceInput)) ?? undefined),
    priceMax: priceRange[1] || Number(maxPriceInput) || undefined,
    brandIds:
      selectedBrandIds.map((item) => item.toString()).join(",") || undefined,
    userId:
      me?.data?.data?.tradeRole == "BUYER"
        ? undefined
        : me?.data?.data?.tradeRole == "MEMBER"
          ? me?.data?.data?.addedBy
          : me?.data?.data?.id,
    categoryIds:
      selectedCategoryIds.length > 0
        ? selectedCategoryIds.join(",")
        : category.categoryIds
          ? category.categoryIds
          : undefined,
    isOwner: displayMyProducts == "1" ? "me" : "",
    userType: me?.data?.data?.tradeRole == "BUYER" ? "BUYER" : "",
  });

  // Fetch dropship products
  const dropshipProductsQuery = useDropshipProducts({
    page,
    limit,
    status: "ACTIVE",
  });

  // Combine regular products and dropship products
  const combinedProducts = useMemo(() => {
    const regularProducts = allProductsQuery?.data?.data || [];
    const dropshipProducts = dropshipProductsQuery?.data?.data || [];

    // Transform dropship products to match regular product format
    const transformedDropshipProducts = dropshipProducts.map(
      (dropshipProduct: any) => ({
        ...dropshipProduct,
        // Ensure dropship products have the same structure as regular products
        productType: "D", // Mark as dropship product
        isDropshipped: true,
        // Preserve marketing content and images
        customMarketingContent: dropshipProduct.customMarketingContent || {},
        productImages: dropshipProduct.productImages || [],
        additionalMarketingImages:
          dropshipProduct.additionalMarketingImages || [],
        // Use the original product's data for display
        originalProductName:
          dropshipProduct.originalProduct?.productName ||
          dropshipProduct.productName,
        originalProductDescription:
          dropshipProduct.originalProduct?.productDescription ||
          dropshipProduct.productDescription,
      }),
    );

    return [...regularProducts, ...transformedDropshipProducts];
  }, [allProductsQuery?.data?.data, dropshipProductsQuery?.data?.data]);

  // Combined loading state
  const isLoading =
    allProductsQuery.isLoading || dropshipProductsQuery.isLoading;

  // Combined total count
  const totalCount =
    (allProductsQuery?.data?.totalCount || 0) +
    (dropshipProductsQuery?.data?.totalCount || 0);

  // Get unique user IDs from products
  const uniqueUserIds = useMemo(() => {
    const userIds = new Set<number>();
    combinedProducts.forEach((item: any) => {
      if (item?.userId) {
        userIds.add(item.userId);
      }
    });
    return Array.from(userIds);
  }, [combinedProducts]);

  // Use custom hook to get user accounts
  const { usersMap, isLoading: usersLoading } = useUserAccounts(uniqueUserIds);

  const fetchProductVariant = useProductVariant();
  const brandsQuery = useBrands({
    term: searchTerm,
  });

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsQuery?.data?.data?.length]);

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handlePriceDebounce = debounce((event: any) => {
    setPriceRange(event);
  }, 1000);

  const handleMinPriceChange = debounce((event: any) => {
    setMinPriceInput(event.target.value);
    // setPriceRange([ Number(event.target.value),500]);
  }, 1000);

  const handleMaxPriceChange = debounce((event: any) => {
    setMaxPriceInput(event.target.value);
    // setPriceRange([0, Number(event.target.value)]);
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

  const handleBrandSearchChange = (event: any) => {
    setSearchTermBrand(event.target.value);
  };

  const handleBrandSearch = () => {
    setSearchTerm(searchTermBrand);
    // Trigger refetch for brands
    if (brandsQuery.refetch) {
      brandsQuery.refetch();
    }
  };

  const memoizedProductList = useMemo(() => {
    return (
      combinedProducts?.map((item: any) => {
        // Find the active product price entry (status: "ACTIVE")
        // If no active entry, fall back to the first one
        const activePriceEntry =
          item?.product_productPrice?.find(
            (pp: any) => pp?.status === "ACTIVE",
          ) || item?.product_productPrice?.[0];

        return {
          id: item.id,
          productName: (() => {
            // For dropship products, use the customized name
            if (
              item?.isDropshipped &&
              item?.customMarketingContent?.customName
            ) {
              return item.customMarketingContent.customName;
            }

            // For regular products, use the original product name
            return item?.productName || "-";
          })(),
          productPrice: item?.productPrice || 0,
          offerPrice: activePriceEntry?.offerPrice || item?.offerPrice || 0,
          productImage: (() => {
            // For dropship products, prioritize marketing images
            if (item?.isDropshipped) {
              // First priority: additionalMarketingImages (base64 marketing images)
              if (
                item?.additionalMarketingImages &&
                Array.isArray(item.additionalMarketingImages) &&
                item.additionalMarketingImages.length > 0
              ) {
                return item.additionalMarketingImages[0];
              }

              // Second priority: marketing images in productImages array
              if (item?.productImages && Array.isArray(item.productImages)) {
                const marketingImage = item.productImages.find(
                  (img: any) => img.variant?.type === "marketing",
                );
                if (marketingImage) {
                  return marketingImage.image;
                }
                // Fallback to first image in productImages
                if (item.productImages[0]?.image) {
                  return item.productImages[0].image;
                }
              }

              // Third priority: original product images
              if (
                item?.originalProduct?.productImages &&
                Array.isArray(item.originalProduct.productImages) &&
                item.originalProduct.productImages.length > 0
              ) {
                return item.originalProduct.productImages[0]?.image;
              }
            }

            // For regular products, use existing logic
            return activePriceEntry?.productPrice_productSellerImage?.length
              ? activePriceEntry?.productPrice_productSellerImage?.[0]?.image
              : item?.productImages?.[0]?.image;
          })(),
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo,
          brandName: item?.brand?.brandName || "-",
          productReview: item?.productReview || [],
          productWishlist: item?.product_wishlist || [],
          inWishlist: item?.product_wishlist?.find(
            (ele: any) => ele?.userId === me.data?.data?.id,
          ),
          shortDescription: (() => {
            // For dropship products, prioritize marketing text
            if (
              item?.isDropshipped &&
              item?.customMarketingContent?.marketingText
            ) {
              return item.customMarketingContent.marketingText;
            }

            // For regular products, use existing logic
            return item?.product_productShortDescription?.length
              ? item?.product_productShortDescription?.[0]?.shortDescription
              : "-";
          })(),
          productProductPriceId: activePriceEntry?.id,
          productProductPrice: activePriceEntry?.offerPrice,
          consumerDiscount: activePriceEntry?.consumerDiscount,
          consumerDiscountType: activePriceEntry?.consumerDiscountType,
          vendorDiscount: activePriceEntry?.vendorDiscount,
          vendorDiscountType: activePriceEntry?.vendorDiscountType,
          askForPrice: activePriceEntry?.askForPrice,
          productPrices: item?.product_productPrice,
          categoryId: item?.categoryId,
          categoryLocation: item?.categoryLocation,
          categoryConnections: item?.category?.category_categoryIdDetail || [],
          consumerType: activePriceEntry?.consumerType,

          // Add vendor information
          vendorId: item?.addedBy || item?.userId,
          vendorName: (() => {
            const userId = item?.userId;
            const user = usersMap.get(userId);

            // Priority order for vendor name:
            // 1. Account name (sub-account name)
            // 2. First name + Last name
            // 3. First name only
            // 4. Email
            // 5. Fallback to vendor ID

            if (user?.accountName) {
              return user.accountName;
            }
            if (user?.firstName && user?.lastName) {
              return `${user.firstName} ${user.lastName}`;
            }
            if (user?.firstName) {
              return user.firstName;
            }
            if (user?.email) {
              return user.email;
            }
            // Fallback to vendor ID if no user data
            if (userId) {
              return `Vendor ${userId}`;
            }
            if (item?.addedBy) {
              return `Vendor ${item.addedBy}`;
            }
            return "Unknown Vendor";
          })(),
          vendorEmail: usersMap.get(item?.userId)?.email || item?.user?.email,
          vendorPhone:
            usersMap.get(item?.userId)?.phoneNumber || item?.user?.phoneNumber,
          vendorProfilePicture:
            usersMap.get(item?.userId)?.profilePicture ||
            item?.user?.profilePicture,
          vendorTradeRole:
            usersMap.get(item?.userId)?.tradeRole || item?.user?.tradeRole,
          vendorUserProfile:
            usersMap.get(item?.userId)?.userProfile || item?.user?.userProfile,
          status: item?.status || "ACTIVE",
        };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    combinedProducts,
    combinedProducts?.length,
    sortBy,
    searchUrlTerm,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    priceRange[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    priceRange[1],
    page,
    limit,
    searchTerm,
    selectedBrandIds,
    displayMyProducts,
    usersMap,
  ]);

  // Extract unique vendors from products
  const memoizedVendors = useMemo(() => {
    const vendorMap = new Map();

    memoizedProductList.forEach((product: any) => {
      if (product.vendorId) {
        if (!vendorMap.has(product.vendorId)) {
          vendorMap.set(product.vendorId, {
            id: product.vendorId,
            firstName: product.vendorName.split(" ")[0] || "",
            lastName: product.vendorName.split(" ").slice(1).join(" ") || "",
            email: product.vendorEmail || "",
            phoneNumber: product.vendorPhone || "",
            profilePicture: product.vendorProfilePicture,
            tradeRole: product.vendorTradeRole || "VENDOR",
            userProfile: product.vendorUserProfile || [],
            productCount: 0,
            averageRating: 0,
            location: "", // Will be populated from user profile if available
            businessTypes: [],
          });
        }

        // Increment product count
        const vendor = vendorMap.get(product.vendorId);
        vendor.productCount += 1;
      }
    });

    // Calculate average ratings and extract business types
    return Array.from(vendorMap.values()).map((vendor) => {
      // Calculate average rating from products
      const vendorProducts = memoizedProductList.filter(
        (p: any) => p.vendorId === vendor.id,
      );
      const totalRating = vendorProducts.reduce((sum: number, product: any) => {
        const reviews = product.productReview || [];
        const avgRating =
          reviews.length > 0
            ? reviews.reduce(
                (rSum: number, review: any) => rSum + (review.rating || 0),
                0,
              ) / reviews.length
            : 0;
        return sum + avgRating;
      }, 0);

      vendor.averageRating =
        vendorProducts.length > 0 ? totalRating / vendorProducts.length : 0;

      // Extract business types
      if (vendor.userProfile?.length) {
        vendor.businessTypes = vendor.userProfile
          .map((item: any) => item?.userProfileBusinessType)
          .flat()
          .map((item: any) => item?.userProfileBusinessTypeTag?.tagName)
          .filter(Boolean);
      }

      return vendor;
    });
  }, [memoizedProductList]);

  const [cartList, setCartList] = useState<any[]>([]);

  const cartListByDeviceQuery = useCartListByDevice(
    {
      page: 1,
      limit: 100,
      deviceId,
    },
    !haveAccessToken,
  );

  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 100,
    },
    haveAccessToken,
  );

  useEffect(() => {
    if (cartListByUser.data?.data) {
      setCartList((cartListByUser.data?.data || []).map((item: any) => item));
    } else if (cartListByDeviceQuery.data?.data) {
      setCartList(
        (cartListByDeviceQuery.data?.data || []).map((item: any) => item),
      );
    }
  }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

  // Handle remove item from cart
  const handleRemoveItemFromCart = async (cartId: number) => {
    const response = await deleteCartItem.mutateAsync({ cartId });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    } else {
      toast({
        title: t("item_not_removed_from_cart"),
        description: response.message || t("check_your_cart_for_more_details"),
        variant: "danger",
      });
    }
  };

  // Get unique category IDs from cart items for fresh category data
  const uniqueCartCategoryIds = useMemo(() => {
    const categoryIds = new Set<number>();
    cartList.forEach((cartItem: any) => {
      const productData = memoizedProductList.find(
        (product: any) => product.id === cartItem.productId,
      );
      if (productData?.categoryId) {
        categoryIds.add(productData.categoryId);
      }
    });
    return Array.from(categoryIds);
  }, [cartList, memoizedProductList]);

  // Fetch category data for the first category in cart (if vendor)
  // This ensures we have fresh category connection data
  const firstCartCategoryId =
    uniqueCartCategoryIds.length > 0 ? uniqueCartCategoryIds[0] : undefined;
  const firstCartCategoryQuery = useCategory(
    firstCartCategoryId?.toString(),
    !!(currentTradeRole && currentTradeRole !== "BUYER" && firstCartCategoryId),
  );

  // Create a map of categoryId -> fresh category connections
  const freshCategoryConnectionsMap = useMemo(() => {
    const map = new Map<number, any[]>();
    if (
      firstCartCategoryId &&
      firstCartCategoryQuery?.data?.data?.category_categoryIdDetail
    ) {
      map.set(
        firstCartCategoryId,
        firstCartCategoryQuery.data.data.category_categoryIdDetail,
      );
    }
    return map;
  }, [firstCartCategoryId, firstCartCategoryQuery?.data?.data]);

  const getCartPricing = React.useCallback(
    (productData: any, cartItem: any) => {
      if (!cartItem) {
        return {
          unitPrice: 0,
          totalPrice: 0,
          originalUnitPrice: 0,
          originalTotalPrice: 0,
        };
      }

      const quantity = Number(cartItem?.quantity) || 1;

      const cartPriceDetails = cartItem?.productPriceDetails || {};

      let originalPrice = 0;
      if (productData?.productProductPrice) {
        originalPrice = Number(productData.productProductPrice) || 0;
      } else if (productData?.productPrice) {
        originalPrice = Number(productData.productPrice) || 0;
      }

      const backendOriginalPrice = Number(
        cartPriceDetails?.price ?? cartPriceDetails?.basePrice ?? 0,
      );

      if (!originalPrice && backendOriginalPrice > 0) {
        originalPrice = backendOriginalPrice;
      }

      if (!originalPrice) {
        const cartOfferPrice = Number(
          cartPriceDetails?.offerPrice ?? cartItem?.offerPrice ?? 0,
        );
        const cartConsumerDiscount = Number(
          cartPriceDetails?.consumerDiscount ?? 0,
        );
        const cartConsumerDiscountType = cartPriceDetails?.consumerDiscountType;

        if (
          cartOfferPrice > 0 &&
          cartConsumerDiscount > 0 &&
          cartConsumerDiscountType
        ) {
          const normalizedDiscountType = cartConsumerDiscountType
            ?.toString()
            .toUpperCase()
            .trim();

          if (normalizedDiscountType === "PERCENTAGE") {
            originalPrice = cartOfferPrice / (1 - cartConsumerDiscount / 100);
          } else if (
            normalizedDiscountType === "AMOUNT" ||
            normalizedDiscountType === "FLAT" ||
            normalizedDiscountType === "FIXED"
          ) {
            originalPrice = cartOfferPrice + cartConsumerDiscount;
          } else {
            originalPrice = cartOfferPrice;
          }
        } else {
          originalPrice = cartOfferPrice;
        }
      }

      const rawConsumerType =
        productData?.consumerType ||
        cartItem?.productPriceDetails?.consumerType ||
        "CONSUMER";
      const consumerType =
        typeof rawConsumerType === "string"
          ? rawConsumerType.toUpperCase().trim()
          : "CONSUMER";

      const isVendorType =
        consumerType === "VENDOR" || consumerType === "VENDORS";
      const isConsumerType = consumerType === "CONSUMER";
      const isEveryoneType = consumerType === "EVERYONE";

      const categoryId = Number(productData?.categoryId || 0);
      const categoryLocation = productData?.categoryLocation;

      // Get fresh category connections - prioritize from category query if available
      let categoryConnections = productData?.categoryConnections || [];
      if (
        categoryId === firstCartCategoryId &&
        freshCategoryConnectionsMap.has(categoryId)
      ) {
        categoryConnections = freshCategoryConnectionsMap.get(categoryId) || [];
      }

      const isCategoryMatch = checkCategoryConnection(
        vendorBusinessCategoryIds,
        categoryId,
        categoryLocation,
        categoryConnections,
      );

      const vendorDiscountValue = Number(
        productData?.vendorDiscount ??
          cartItem?.productPriceDetails?.vendorDiscount ??
          0,
      );
      const vendorDiscountType =
        productData?.vendorDiscountType ||
        cartItem?.productPriceDetails?.vendorDiscountType;

      const consumerDiscountValue = Number(
        productData?.consumerDiscount ??
          cartItem?.productPriceDetails?.consumerDiscount ??
          0,
      );
      const consumerDiscountType =
        productData?.consumerDiscountType ||
        cartItem?.productPriceDetails?.consumerDiscountType;

      let discount = 0;
      let discountType: string | undefined;

      if (currentTradeRole && currentTradeRole !== "BUYER") {
        // VENDOR user
        if (isVendorType || isEveryoneType) {
          // consumerType is VENDOR/VENDORS or EVERYONE - vendor can get vendor discount
          // BUT category match is REQUIRED for vendor discounts
          if (isCategoryMatch) {
            // Same relation - Vendor gets vendor discount if available
            if (vendorDiscountValue > 0 && vendorDiscountType) {
              discount = vendorDiscountValue;
              discountType = vendorDiscountType;
            } else {
              // No vendor discount available, no discount
              discount = 0;
            }
          } else {
            // Not same relation - No vendor discount
            // If consumerType is EVERYONE, fallback to consumer discount
            if (isEveryoneType) {
              if (consumerDiscountValue > 0 && consumerDiscountType) {
                discount = consumerDiscountValue;
                discountType = consumerDiscountType;
              } else {
                discount = 0;
              }
            } else {
              // consumerType is VENDOR/VENDORS but no category match - no discount
              discount = 0;
            }
          }
        } else {
          // consumerType is CONSUMER - vendors get no discount
          discount = 0;
        }
      } else {
        if (isConsumerType || isEveryoneType) {
          if (consumerDiscountValue > 0 && consumerDiscountType) {
            discount = consumerDiscountValue;
            discountType = consumerDiscountType;
          }
        }
      }

      let finalPrice = originalPrice;
      if (discount > 0 && discountType) {
        const normalizedDiscountType = discountType
          .toString()
          .toUpperCase()
          .trim();
        if (normalizedDiscountType === "PERCENTAGE") {
          finalPrice = originalPrice * (1 - discount / 100);
        } else if (
          normalizedDiscountType === "AMOUNT" ||
          normalizedDiscountType === "FLAT" ||
          normalizedDiscountType === "FIXED"
        ) {
          finalPrice = originalPrice - discount;
        }
      }

      const backendOfferPrice = Number(
        cartPriceDetails?.offerPrice ?? cartItem?.offerPrice ?? 0,
      );

      if (backendOfferPrice > 0) {
        finalPrice =
          finalPrice > 0
            ? Math.min(finalPrice, backendOfferPrice)
            : backendOfferPrice;
      }

      if (backendOriginalPrice > 0) {
        originalPrice =
          originalPrice > 0
            ? Math.max(originalPrice, backendOriginalPrice)
            : backendOriginalPrice;
      }

      if (!Number.isFinite(finalPrice) || finalPrice < 0) {
        finalPrice = 0;
      }

      if (!Number.isFinite(originalPrice) || originalPrice < 0) {
        originalPrice = 0;
      }

      const unitPrice = Number(finalPrice.toFixed(2));
      const originalUnitPrice = Number(originalPrice.toFixed(2));
      const totalPrice = Number((unitPrice * quantity).toFixed(2));
      const originalTotalPrice = Number(
        (originalUnitPrice * quantity).toFixed(2),
      );

      return {
        unitPrice,
        totalPrice,
        originalUnitPrice,
        originalTotalPrice,
      };
    },
    [
      currentTradeRole,
      vendorBusinessCategoryIds,
      freshCategoryConnectionsMap,
      firstCartCategoryId,
    ],
  );

  const getProductVariants = async () => {
    let productPriceIds = memoizedProductList
      .filter((item: any) => item.productPrices.length > 0)
      .map((item: any) => item.productPrices[0].id);

    const response = await fetchProductVariant.mutateAsync(productPriceIds);
    if (response.status) setProductVariants(response.data);
  };

  const handleDeleteFromWishlist = async (productId: number) => {
    const response = await deleteFromWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: t("item_removed_from_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "product-by-id",
          { productId: String(productId), userId: me.data?.data?.id },
        ],
      });
    } else {
      toast({
        title: t("item_not_removed_from_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "danger",
      });
    }
  };

  const handleAddToWishlist = async (
    productId: number,
    wishlistArr?: any[],
  ) => {
    const wishlistObject = wishlistArr?.find(
      (item) => item.userId === me.data?.data?.id,
    );
    // return;
    if (wishlistObject) {
      handleDeleteFromWishlist(wishlistObject?.productId);
      return;
    }

    const response = await addToWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: t("item_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "product-by-id",
          { productId: String(productId), userId: me.data?.data?.id },
        ],
      });
    } else {
      toast({
        title: response.message || t("item_not_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "danger",
      });
    }
  };

  const selectAll = () => {
    setSelectedBrandIds(
      brandsQuery?.data?.data?.map((item: any) => {
        return item.id;
      }) || [],
    );
  };

  const clearFilter = () => {
    setSelectedBrandIds([]);
    setMaxPriceInput("");
    setMinPriceInput("");
    setPriceRange([]);
    setDisplayMyProducts("0");
    setSelectedCategoryIds([]);

    if (minPriceInputRef.current) minPriceInputRef.current.value = "";
    if (maxPriceInputRef.current) maxPriceInputRef.current.value = "";
  };

  // Category filter handlers
  const handleCategoryChange = (categoryIds: number[]) => {
    setSelectedCategoryIds(categoryIds);
  };

  const handleCategoryClear = () => {
    setSelectedCategoryIds([]);
  };

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  useEffect(() => {
    return () => {
      categoryStore.setSubCategories([]);
      categoryStore.setSubSubCategories([]);
      categoryStore.setCategoryId("");
      categoryStore.setCategoryIds("");
      categoryStore.setSubCategoryIndex(0);
      categoryStore.setSecondLevelCategoryIndex(0);
      categoryStore.setSubCategoryParentName("");
      categoryStore.setSubSubCategoryParentName("");
    };
  }, []);

  startDebugger();

  return (
    <>
      <title dir={langDir} translate="no">
        {t("store")} | Ultrasooq
      </title>
      <div className="body-content-s1 bg-white">
        <TrendingCategories />

        <BannerSection />

        {/* Full Width Two Column Layout */}
        <div className="min-h-screen w-full bg-white px-2 sm:px-4 lg:px-8">
          <div className="flex h-full flex-col gap-4 lg:flex-row">
            {/* Left Column - Filters (Desktop) - Improved UI */}
            <div className="hidden flex-shrink-0 overflow-y-auto bg-white p-4 lg:block lg:w-1/4">
              <div className="sticky top-4 rounded-xl bg-white p-6 shadow-lg">
                {/* Filter Header */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {t("filters")}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAll}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      {t("select_all")}
                    </button>
                    <button
                      type="button"
                      onClick={clearFilter}
                      className="flex-1 rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                    >
                      {t("clean_select")}
                    </button>
                  </div>
                </div>

                {/* Category Filter - Improved */}
                <div className="mb-6">
                  <Accordion
                    type="multiple"
                    defaultValue={["category_filter"]}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <AccordionItem value="category_filter" className="border-0">
                      <AccordionTrigger className="bg-gray-50 px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{t("by_category")}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-4 py-4">
                        <CategoryFilter
                          selectedCategoryIds={selectedCategoryIds}
                          onCategoryChange={handleCategoryChange}
                          onClear={handleCategoryClear}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Brand Filter - Improved */}
                <div className="mb-6">
                  <Accordion
                    type="multiple"
                    defaultValue={["brand"]}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <AccordionItem value="brand" className="border-0">
                      <AccordionTrigger className="bg-gray-50 px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{t("by_brand")}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-4 py-4">
                        <div className="mb-3">
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder={t("search_brand")}
                              className="h-9 flex-1 border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                              onChange={handleBrandSearchChange}
                              dir={langDir}
                              translate="no"
                            />
                            <Button
                              type="button"
                              onClick={handleBrandSearch}
                              disabled={!searchTermBrand.trim()}
                              size="sm"
                              className="h-9 bg-blue-600 px-4 text-xs font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                              {t("search")}
                            </Button>
                          </div>
                        </div>
                        <div className="max-h-48 space-y-2 overflow-y-auto">
                          {!memoizedBrands.length ? (
                            <p className="py-4 text-center text-sm text-gray-500">
                              {t("no_data_found")}
                            </p>
                          ) : null}
                          {memoizedBrands.map((item: ISelectOptions) => (
                            <div
                              key={item.value}
                              className="flex items-center space-x-2 rounded px-2 py-1 transition-colors hover:bg-gray-50"
                            >
                              <Checkbox
                                id={item.label}
                                className="border border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                                onCheckedChange={(checked) =>
                                  handleBrandChange(checked, item)
                                }
                                checked={selectedBrandIds.includes(item.value)}
                              />
                              <label
                                htmlFor={item.label}
                                className="flex-1 cursor-pointer text-sm leading-none font-medium"
                              >
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Price Filter - Improved */}
                <div>
                  <Accordion
                    type="multiple"
                    defaultValue={["price"]}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <AccordionItem value="price" className="border-0">
                      <AccordionTrigger className="bg-gray-50 px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">💰</span>
                          <span>{t("price")}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-4 py-4">
                        <div className="mb-4 px-2">
                          <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={[0, 500]}
                            ariaLabel={["Lower thumb", "Upper thumb"]}
                            ariaValuetext={(state) =>
                              `Thumb value ${state.valueNow}`
                            }
                            renderThumb={(props, state) => (
                              <div {...props} key={props.key}>
                                {state.valueNow}
                              </div>
                            )}
                            pearling
                            minDistance={10}
                            onChange={(value) => handlePriceDebounce(value)}
                            max={500}
                            min={0}
                          />
                        </div>
                        <div className="mb-4 flex justify-center">
                          <Button
                            variant="outline"
                            className="h-9 px-4 text-sm"
                            onClick={() => setPriceRange([])}
                            dir={langDir}
                            translate="no"
                          >
                            {t("clear")}
                          </Button>
                        </div>
                        <div className="range-price-left-right-info">
                          <Input
                            type="number"
                            placeholder={`${currency.symbol}0`}
                            className="custom-form-control-s1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={handleMinPriceChange}
                            onWheel={(e) => e.currentTarget.blur()}
                            ref={minPriceInputRef}
                          />
                          <div className="center-divider"></div>
                          <Input
                            type="number"
                            placeholder={`${currency.symbol}500`}
                            className="custom-form-control-s1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            onChange={handleMaxPriceChange}
                            onWheel={(e) => e.currentTarget.blur()}
                            ref={maxPriceInputRef}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Main Content Column - Products (FULL WIDTH NOW) */}
            <div className="w-full flex-1 overflow-y-auto bg-white lg:w-auto">
              <div className="p-2 sm:p-4 lg:p-6">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "products" | "vendors")
                  }
                  className="w-full"
                >
                  <TabsList className="mb-4 grid w-full grid-cols-2 sm:mb-6">
                    <TabsTrigger
                      value="products"
                      className="flex items-center justify-center space-x-1 text-xs sm:space-x-2 sm:text-sm"
                    >
                      <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{t("products")}</span>
                      <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs sm:ml-2 sm:px-2 sm:py-1">
                        {totalCount}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="vendors"
                      className="flex items-center justify-center space-x-1 text-xs sm:space-x-2 sm:text-sm"
                    >
                      <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{t("vendors")}</span>
                      <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs sm:ml-2 sm:px-2 sm:py-1">
                        {memoizedVendors.length}
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="products" className="space-y-6">
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
                      {/* Left Section - Mobile Buttons & Product Count */}
                      <div className="flex w-full items-center gap-3 sm:w-auto">
                        {/* Mobile Filter Button */}
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white p-2.5 transition-colors hover:bg-gray-100 lg:hidden"
                          onClick={() => setProductFilter(true)}
                        >
                          <FilterMenuIcon />
                        </button>

                        {/* Mobile Cart Button - Hidden on desktop, floating button shows instead */}
                        <button
                          type="button"
                          className="relative rounded-lg border border-gray-300 bg-white p-2.5 transition-colors hover:bg-gray-100 lg:hidden"
                          onClick={() => setShowCartDrawer(true)}
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {cartList.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                              {cartList.length > 99 ? "99+" : cartList.length}
                            </span>
                          )}
                        </button>

                        {/* Product Count */}
                        <div className="flex-1 sm:flex-none">
                          <p
                            className="text-base font-semibold text-gray-800 sm:text-lg"
                            dir={langDir}
                            translate="no"
                          >
                            {t("n_products_found", {
                              n: totalCount,
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Right Section - Sort & View Controls */}
                      <div className="flex w-full items-center gap-3 sm:w-auto">
                        {/* Sort Dropdown */}
                        <Select
                          onValueChange={(e) => setSortBy(e)}
                          value={sortBy}
                        >
                          <SelectTrigger className="h-10 w-full border-gray-300 bg-white sm:w-[180px]">
                            <SelectValue
                              placeholder={t("sort_by")}
                              dir={langDir}
                              translate="no"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                value="desc"
                                dir={langDir}
                                translate="no"
                              >
                                {t("sort_by_latest")}
                              </SelectItem>
                              <SelectItem
                                value="asc"
                                dir={langDir}
                                translate="no"
                              >
                                {t("sort_by_oldest")}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {/* View Type Buttons */}
                        <div className="hidden items-center gap-2 rounded-lg border border-gray-300 bg-white p-1 sm:flex">
                          <button
                            type="button"
                            className={`rounded p-2 transition-colors ${
                              viewType === "grid"
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                            onClick={() => setViewType("grid")}
                          >
                            <GridIcon active={viewType === "grid"} />
                          </button>
                          <button
                            type="button"
                            className={`rounded p-2 transition-colors ${
                              viewType === "list"
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                            onClick={() => setViewType("list")}
                          >
                            <ListIcon active={viewType === "list"} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isLoading && viewType === "grid" ? (
                      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                        {Array.from({ length: 10 }).map((_, index: number) => (
                          <SkeletonProductCardLoader key={index} />
                        ))}
                      </div>
                    ) : null}

                    {!memoizedProductList.length && !isLoading ? (
                      <p
                        className="text-center text-sm font-medium"
                        dir={langDir}
                        translate="no"
                      >
                        {t("no_data_found")}
                      </p>
                    ) : null}

                    {viewType === "grid" ? (
                      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                        {memoizedProductList.map((item: TrendingProduct) => {
                          const cartItem = cartList?.find(
                            (el: any) => el.productId == item.id,
                          );
                          let relatedCart: any = null;
                          if (cartItem) {
                            relatedCart = cartList
                              ?.filter(
                                (c: any) =>
                                  c.serviceId && c.cartProductServices?.length,
                              )
                              .find((c: any) => {
                                return !!c.cartProductServices.find(
                                  (r: any) =>
                                    r.relatedCartType == "PRODUCT" &&
                                    r.productId == item.id,
                                );
                              });
                          }
                          return (
                            <ProductCard
                              key={item.id}
                              productVariants={
                                productVariants.find(
                                  (variant: any) =>
                                    variant.productId == item.id,
                                )?.object || []
                              }
                              item={item}
                              onWishlist={() =>
                                handleAddToWishlist(
                                  item.id,
                                  item?.productWishlist,
                                )
                              }
                              inWishlist={item?.inWishlist}
                              haveAccessToken={haveAccessToken}
                              isInteractive
                              productQuantity={cartItem?.quantity || 0}
                              productVariant={cartItem?.object}
                              cartId={cartItem?.id}
                              relatedCart={relatedCart}
                              isAddedToCart={cartItem ? true : false}
                            />
                          );
                        })}
                      </div>
                    ) : null}

                    {viewType === "list" && memoizedProductList.length ? (
                      <div className="product-list-s1 overflow-x-auto p-2 sm:p-4">
                        <ProductTable list={memoizedProductList} />
                      </div>
                    ) : null}

                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalCount={totalCount}
                      limit={limit}
                    />
                  </TabsContent>

                  <TabsContent value="vendors" className="space-y-6">
                    <VendorsSection
                      vendors={memoizedVendors}
                      isLoading={isLoading || usersLoading}
                      products={memoizedProductList}
                      haveAccessToken={haveAccessToken}
                      cartList={cartList}
                      onWishlist={handleAddToWishlist}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cart Button - Only show when cart has items */}
        {cartList.length > 0 && (
          <button
            onClick={() => setShowCartDrawer(true)}
            className="group fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-blue-700 lg:h-14 lg:w-14"
            aria-label={t("my_cart")}
          >
            <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white shadow-lg lg:h-6 lg:w-6">
              {cartList.length > 99 ? "99+" : cartList.length}
            </span>
          </button>
        )}

        {/* Mobile Filter Drawer */}
        <Sheet open={productFilter} onOpenChange={setProductFilter}>
          <SheetContent
            side="left"
            className="w-[300px] overflow-y-auto sm:w-[400px]"
          >
            <SheetHeader>
              <SheetTitle>{t("filters")}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <div className="mb-4">
                <div className="mb-4 flex gap-2">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="rounded bg-blue-100 px-3 py-2 text-sm text-blue-700 transition-colors hover:bg-blue-200"
                  >
                    {t("select_all")}
                  </button>
                  <button
                    type="button"
                    onClick={clearFilter}
                    className="rounded bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    {t("clean_select")}
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <Accordion
                type="multiple"
                defaultValue={["category_filter"]}
                className="mb-4"
              >
                <AccordionItem value="category_filter">
                  <AccordionTrigger className="text-base hover:no-underline!">
                    {t("by_category")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <CategoryFilter
                      selectedCategoryIds={selectedCategoryIds}
                      onCategoryChange={handleCategoryChange}
                      onClear={handleCategoryClear}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Brand Filter */}
              <Accordion
                type="multiple"
                defaultValue={["brand"]}
                className="mb-4"
              >
                <AccordionItem value="brand">
                  <AccordionTrigger className="text-base hover:no-underline!">
                    {t("by_brand")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-3">
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder={t("search_brand")}
                          className="h-8 flex-1 text-sm"
                          onChange={handleBrandSearchChange}
                          dir={langDir}
                          translate="no"
                        />
                        <Button
                          type="button"
                          onClick={handleBrandSearch}
                          disabled={!searchTermBrand.trim()}
                          size="sm"
                          className="h-8 bg-blue-600 px-3 text-xs hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                          {t("search")}
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                      {!memoizedBrands.length ? (
                        <p className="text-center text-sm text-gray-500">
                          {t("no_data_found")}
                        </p>
                      ) : null}
                      {memoizedBrands.map((item: ISelectOptions) => (
                        <div
                          key={item.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`mobile-${item.label}`}
                            className="border border-gray-300 data-[state=checked]:bg-blue-600!"
                            onCheckedChange={(checked) =>
                              handleBrandChange(checked, item)
                            }
                            checked={selectedBrandIds.includes(item.value)}
                          />
                          <label
                            htmlFor={`mobile-${item.label}`}
                            className="cursor-pointer text-sm leading-none font-medium"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Price Filter */}
              <Accordion type="multiple" defaultValue={["price"]}>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base hover:no-underline!">
                    {t("price")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4">
                      <div className="px-2">
                        <ReactSlider
                          className="horizontal-slider"
                          thumbClassName="example-thumb"
                          trackClassName="example-track"
                          defaultValue={[0, 500]}
                          ariaLabel={["Lower thumb", "Upper thumb"]}
                          ariaValuetext={(state) =>
                            `Thumb value ${state.valueNow}`
                          }
                          renderThumb={(props, state) => (
                            <div {...props} key={props.key}>
                              {state.valueNow}
                            </div>
                          )}
                          pearling
                          minDistance={10}
                          onChange={(value) => handlePriceDebounce(value)}
                          max={500}
                          min={0}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          className="mb-4"
                          onClick={() => setPriceRange([])}
                          dir={langDir}
                          translate="no"
                        >
                          {t("clear")}
                        </Button>
                      </div>
                      <div className="range-price-left-right-info">
                        <Input
                          type="number"
                          placeholder={`${currency.symbol}0`}
                          className="custom-form-control-s1 rounded-none"
                          onChange={handleMinPriceChange}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        <div className="center-divider"></div>
                        <Input
                          type="number"
                          placeholder={`${currency.symbol}500`}
                          className="custom-form-control-s1 rounded-none"
                          onChange={handleMaxPriceChange}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop & Mobile Cart Drawer - Enhanced */}
        <Sheet open={showCartDrawer} onOpenChange={setShowCartDrawer}>
          <SheetContent
            side="right"
            className="w-full overflow-y-auto sm:w-[400px] lg:w-[450px]"
          >
            <SheetHeader className="mb-4 border-b border-gray-200 pb-4">
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-lg font-bold">{t("my_cart")}</span>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500">
                  {cartList.length}{" "}
                  {cartList.length === 1 ? t("item") : t("items")}
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6">
              {cartList.length === 0 ? (
                <div className="py-12 text-center">
                  <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                  <p className="text-base font-medium text-gray-500">
                    {t("your_cart_is_empty")}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    {t("add_some_products_to_get_started")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartList.map((cartItem: any) => {
                    const productData = memoizedProductList.find(
                      (product: any) => product.id === cartItem.productId,
                    );

                    return (
                      <div
                        key={cartItem.id}
                        className="group flex items-center space-x-4 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                      >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {productData?.productImage ? (
                            <img
                              src={productData.productImage}
                              alt={productData.productName || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="mb-1 truncate text-sm font-semibold text-gray-900">
                            {productData?.productName || t("product")}
                          </h4>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {t("quantity")}: {cartItem.quantity || 1}
                            </p>
                            <div className="text-right">
                              {(() => {
                                const pricing = getCartPricing(
                                  productData,
                                  cartItem,
                                );
                                return (
                                  <>
                                    <p className="text-sm font-bold text-green-600">
                                      {currency.symbol}
                                      {pricing.totalPrice.toFixed(2)}
                                    </p>
                                    {pricing.originalTotalPrice >
                                      pricing.totalPrice && (
                                      <p className="text-xs text-gray-500 line-through">
                                        {currency.symbol}
                                        {pricing.originalTotalPrice.toFixed(2)}
                                      </p>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItemFromCart(cartItem.id)}
                          disabled={deleteCartItem.isPending}
                          className="flex-shrink-0 rounded-lg p-2 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={t("remove_from_cart")}
                          title={t("remove_from_cart")}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Go to Cart Button */}
            {cartList.length > 0 && (
              <div className="sticky bottom-0 mt-6 border-t border-gray-200 bg-white pt-4">
                <button
                  onClick={() => {
                    setShowCartDrawer(false);
                    window.location.href = "/cart";
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700"
                >
                  <Package className="h-5 w-5" />
                  <span>{t("go_to_cart")}</span>
                </button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
      <Footer />
    </>
  );
};

export default TrendingPage;
