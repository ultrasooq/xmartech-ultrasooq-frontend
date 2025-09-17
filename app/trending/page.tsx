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
import { Package, Building2 } from "lucide-react";
// @ts-ignore
import { startDebugger } from "remove-child-node-error-debugger";
import Cart from "@/components/modules/cartList/Cart";
import CategoryFilter from "@/components/modules/manageProducts/CategoryFilter";

interface TrendingPageProps {
  searchParams?: Promise<{ term?: string }>;
}

const TrendingPage = (props0: TrendingPageProps) => {
  const searchParams = use(props0.searchParams);
  const t = useTranslations();
  const { langDir, currency } = useAuth();
  const queryClient = useQueryClient();
  const categoryStore = useCategoryStore();
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
  const [displayMyProducts, setDisplayMyProducts] = useState("0");
  const [displayRelatedProducts, setDisplayRelatedProducts] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [productVariants, setProductVariants] = useState<any[]>([]);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "vendors">("products");
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
    userId: me?.data?.data?.tradeRole == "BUYER"
      ? undefined
      : me?.data?.data?.tradeRole == "MEMBER"
        ? me?.data?.data?.addedBy
        : me?.data?.data?.id,
    categoryIds: selectedCategoryIds.length > 0 
      ? selectedCategoryIds.join(",") 
      : category.categoryIds ? category.categoryIds : undefined,
    isOwner: displayMyProducts == "1" ? "me" : "",
    related: displayRelatedProducts,
    userType: me?.data?.data?.tradeRole == "BUYER" ? "BUYER" : ""
  });

  // Get unique user IDs from products
  const uniqueUserIds = useMemo(() => {
    const userIds = new Set<number>();
    allProductsQuery?.data?.data?.forEach((item: any) => {
      if (item?.userId) {
        userIds.add(item.userId);
      }
    });
    return Array.from(userIds);
  }, [allProductsQuery?.data?.data]);

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
      allProductsQuery?.data?.data?.map((item: any) => ({
        id: item.id,
        productName: item?.productName || "-",
        productPrice: item?.productPrice || 0,
        offerPrice: item?.offerPrice || 0,
        productImage: item?.product_productPrice?.[0]
          ?.productPrice_productSellerImage?.length
          ? item?.product_productPrice?.[0]
            ?.productPrice_productSellerImage?.[0]?.image
          : item?.productImages?.[0]?.image,
        categoryName: item?.category?.name || "-",
        skuNo: item?.skuNo,
        brandName: item?.brand?.brandName || "-",
        productReview: item?.productReview || [],
        productWishlist: item?.product_wishlist || [],
        inWishlist: item?.product_wishlist?.find(
          (ele: any) => ele?.userId === me.data?.data?.id,
        ),
        shortDescription: item?.product_productShortDescription?.length
          ? item?.product_productShortDescription?.[0]?.shortDescription
          : "-",
        productProductPriceId: item?.product_productPrice?.[0]?.id,
        productProductPrice: item?.product_productPrice?.[0]?.offerPrice,
        consumerDiscount: item?.product_productPrice?.[0]?.consumerDiscount,
        consumerDiscountType:
          item?.product_productPrice?.[0]?.consumerDiscountType,
        vendorDiscount: item?.product_productPrice?.[0]?.vendorDiscount,
        vendorDiscountType: item?.product_productPrice?.[0]?.vendorDiscountType,
        askForPrice: item?.product_productPrice?.[0]?.askForPrice,
        productPrices: item?.product_productPrice,
         // Add vendor information
         vendorId: item?.addedBy || item?.userId,
         vendorName: (() => {
           const userId = item?.userId;
           const user = usersMap.get(userId);
           
           console.log("=== VENDOR DEBUG ===");
           console.log("Product ID:", item.id);
           console.log("Product userId:", userId);
           console.log("User from map:", user);
           console.log("Account name:", user?.accountName);
           console.log("First name:", user?.firstName);
           console.log("Last name:", user?.lastName);
           console.log("Users map size:", usersMap.size);
           console.log("==================");
           
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
         vendorPhone: usersMap.get(item?.userId)?.phoneNumber || item?.user?.phoneNumber,
         vendorProfilePicture: usersMap.get(item?.userId)?.profilePicture || item?.user?.profilePicture,
         vendorTradeRole: usersMap.get(item?.userId)?.tradeRole || item?.user?.tradeRole,
         vendorUserProfile: usersMap.get(item?.userId)?.userProfile || item?.user?.userProfile,
      })) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allProductsQuery?.data?.data,
    allProductsQuery?.data?.data?.length,
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
            firstName: product.vendorName.split(' ')[0] || '',
            lastName: product.vendorName.split(' ').slice(1).join(' ') || '',
            email: product.vendorEmail || '',
            phoneNumber: product.vendorPhone || '',
            profilePicture: product.vendorProfilePicture,
            tradeRole: product.vendorTradeRole || 'VENDOR',
            userProfile: product.vendorUserProfile || [],
            productCount: 0,
            averageRating: 0,
            location: '', // Will be populated from user profile if available
            businessTypes: [],
          });
        }
        
        // Increment product count
        const vendor = vendorMap.get(product.vendorId);
        vendor.productCount += 1;
      }
    });

    // Calculate average ratings and extract business types
    return Array.from(vendorMap.values()).map(vendor => {
      // Calculate average rating from products
      const vendorProducts = memoizedProductList.filter((p: any) => p.vendorId === vendor.id);
      const totalRating = vendorProducts.reduce((sum: number, product: any) => {
        const reviews = product.productReview || [];
        const avgRating = reviews.length > 0 
          ? reviews.reduce((rSum: number, review: any) => rSum + (review.rating || 0), 0) / reviews.length
          : 0;
        return sum + avgRating;
      }, 0);
      
      vendor.averageRating = vendorProducts.length > 0 ? totalRating / vendorProducts.length : 0;
      
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

  const getProductVariants = async () => {
    let productPriceIds = memoizedProductList
      .filter((item: any) => item.productPrices.length > 0)
      .map((item: any) => item.productPrices[0].id);

    const response = await fetchProductVariant.mutateAsync(productPriceIds);
    if (response.status) setProductVariants(response.data);
  };

  useEffect(() => {
    if (memoizedProductList.length) {
      getProductVariants();
    }
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
      <div className="body-content-s1">
        <TrendingCategories />

        <BannerSection />

        <div className="trending-search-sec">
          <div className="container m-auto px-3">
             <div
               className={`${productFilter ? "left-filter show" : "left-filter"} bg-white rounded-lg shadow-xs p-6`}
               dir={langDir}
             >
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
                           className="flex-1 h-8 text-sm"
                           onChange={handleBrandSearchChange}
                           dir={langDir}
                           translate="no"
                         />
                         <Button
                           type="button"
                           onClick={handleBrandSearch}
                           disabled={!searchTermBrand.trim()}
                           size="sm"
                           className="h-8 px-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-xs"
                         >
                           {t("search")}
                         </Button>
                       </div>
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
                             className="border border-gray-300 data-[state=checked]:bg-blue-600!"
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

               {/* Price Filter */}
               <Accordion
                 type="multiple"
                 defaultValue={["price"]}
               >
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
                           ref={minPriceInputRef}
                         />
                         <div className="center-divider"></div>
                         <Input
                           type="number"
                           placeholder={`${currency.symbol}500`}
                           className="custom-form-control-s1 rounded-none"
                           onChange={handleMaxPriceChange}
                           onWheel={(e) => e.currentTarget.blur()}
                           ref={maxPriceInputRef}
                         />
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
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "products" | "vendors")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="products" className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span>{t("products")}</span>
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {allProductsQuery.data?.totalCount || 0}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="vendors" className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{t("vendors")}</span>
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {memoizedVendors.length}
                    </span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="space-y-6">
                  
              <div className="products-header-filter">
                <div className="le-info">
                  {/* TODO: need name here */}
                  {/* <h3></h3> */}
                </div>
                <div className="rg-filter">
                  <p dir={langDir} translate="no">
                    {t("n_products_found", {
                      n: allProductsQuery.data?.totalCount,
                    })}
                  </p>
                  <ul>
                    <li>
                      {haveAccessToken ? (
                        <>
                          <Checkbox 
                            onClick={(e) => setDisplayRelatedProducts(!displayRelatedProducts)}
                          />
                          <label className="ml-2" translate="no" dir={langDir}>{t("recommended")}</label>
                        </>
                      ) : null}
                    </li>
                    <li>
                      <Select onValueChange={(e) => setSortBy(e)}>
                        <SelectTrigger className="custom-form-control-s1 bg-white">
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
                    </li>

                    <li>
                      <button
                        type="button"
                        className="view-type-btn"
                        onClick={() => setViewType("grid")}
                      >
                        <GridIcon active={viewType === "grid"} />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="view-type-btn"
                        onClick={() => setViewType("list")}
                      >
                        <ListIcon active={viewType === "list"} />
                      </button>
                    </li>
                    <li className="block md:hidden">
                      <button
                        type="button"
                        className="view-type-btn"
                        onClick={() => setProductFilter(true)}
                      >
                        <FilterMenuIcon />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {allProductsQuery.isLoading && viewType === "grid" ? (
                <div className="grid grid-cols-4 gap-5">
                  {Array.from({ length: 8 }).map((_, index: number) => (
                    <SkeletonProductCardLoader key={index} />
                  ))}
                </div>
              ) : null}

              {!memoizedProductList.length && !allProductsQuery.isLoading ? (
                <p
                  className="text-center text-sm font-medium"
                  dir={langDir}
                  translate="no"
                >
                  {t("no_data_found")}
                </p>
              ) : null}

              {viewType === "grid" ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
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
                            (variant: any) => variant.productId == item.id,
                          )?.object || []
                        }
                        item={item}
                        onWishlist={() =>
                          handleAddToWishlist(item.id, item?.productWishlist)
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
                <div className="product-list-s1 p-4">
                  <ProductTable list={memoizedProductList} />
                </div>
              ) : null}

              {allProductsQuery.data?.totalCount > page ? (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalCount={allProductsQuery.data?.totalCount}
                  limit={limit}
                />
              ) : null}
                </TabsContent>

                <TabsContent value="vendors" className="space-y-6">
                  <VendorsSection 
                    vendors={memoizedVendors}
                    isLoading={allProductsQuery.isLoading || usersLoading}
                    products={memoizedProductList}
                  />
                </TabsContent>
              </Tabs>
            </div>
            {/* <div className="product_cart_modal absolute right-[20px] top-[150px] w-full px-4 lg:w-[300px]">
              <Cart 
                haveAccessToken={haveAccessToken}
                isLoadingCart={cartListByDeviceQuery?.isLoading || cartListByUser?.isLoading}
                cartItems={cartList}
              />
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrendingPage;
