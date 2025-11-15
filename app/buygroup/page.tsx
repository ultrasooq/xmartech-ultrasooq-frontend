"use client";
import { useBrands } from "@/apis/queries/masters.queries";
import {
  useAllBuyGroupProducts,
  useProductVariant,
} from "@/apis/queries/product.queries";
import { useCategory } from "@/apis/queries/category.queries";
import FilterMenuIcon from "@/components/icons/FilterMenuIcon";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import ProductCard from "@/components/modules/trending/ProductCard";
import ProductTable from "@/components/modules/trending/ProductTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IBrands,
  ISelectOptions,
  TrendingProduct,
} from "@/utils/types/common.types";
import { debounce } from "lodash";
import { use, useEffect, useMemo, useRef, useState } from "react";
import ReactSlider from "react-slider";
// import { stripHTML } from "@/utils/helper";
// import Image from "next/image";
// import TrendingBannerImage from "@/public/images/trending-product-inner-banner.png";
// import ChevronRightIcon from "@/public/images/nextarow.svg";
// import InnerBannerImage from "@/public/images/trending-product-inner-banner-pic.png";
import {
  useCartListByDevice,
  useCartListByUserId,
} from "@/apis/queries/cart.queries";
import { useMe } from "@/apis/queries/user.queries";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
// import BannerSection from "@/components/modules/trending/BannerSection";
import TrendingCategories from "@/components/modules/trending/TrendingCategories";
import Footer from "@/components/shared/Footer";
import Pagination from "@/components/shared/Pagination";
import SkeletonProductCardLoader from "@/components/shared/SkeletonProductCardLoader";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCategoryStore } from "@/lib/categoryStore";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import CategoryFilter from "@/components/modules/manageProducts/CategoryFilter";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
// @ts-ignore
import { startDebugger } from "remove-child-node-error-debugger";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, Package } from "lucide-react";

interface TrendingPageProps {
  searchParams?: Promise<{ term?: string }>;
}

const TrendingPage = (props0: TrendingPageProps) => {
  const searchParams = use(props0.searchParams || Promise.resolve({}));
  const t = useTranslations();
  const { langDir, currency, user } = useAuth();
  const currentAccount = useCurrentAccount();
  const currentTradeRole = currentAccount?.data?.data?.account?.tradeRole || user?.tradeRole;
  const queryClient = useQueryClient();
  const categoryStore = useCategoryStore();
  const { toast } = useToast();
  const router = useRouter();
  const deviceId = getOrCreateDeviceId() || "";
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [productFilter, setProductFilter] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [displayMyProducts, setDisplayMyProducts] = useState("0");
  const [displayRelatedProducts, setDisplayRelatedProducts] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [productVariants, setProductVariants] = useState<any[]>([]);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const searchUrlTerm = (searchParams as any)?.term || "";
  const category = useCategoryStore();

  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);

  const me = useMe();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const allProductsQuery = useAllBuyGroupProducts({
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
    categoryIds: category.categoryIds ? category.categoryIds : undefined,
    isOwner: displayMyProducts == "1" ? "me" : "",
    related: displayRelatedProducts,
    userType: me?.data?.data?.tradeRole == "BUYER" ? "BUYER" : "",
  });
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

  // Helpers for Buygroup coming soon
  const getLocalTimestamp = (dateStr?: string, timeStr?: string) => {
    if (!dateStr) return 0;
    const date = new Date(dateStr);
    const [h, m] = String(timeStr || "").split(":").map(Number);
    if (!Number.isNaN(h)) date.setHours(h || 0, Number.isNaN(m) ? 0 : m, 0, 0);
    return date.getTime();
  };

  const getSaleStartLabel = (dateStr?: string, timeStr?: string) => {
    try {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      if (timeStr) {
        const [h, m] = timeStr.split(":").map(Number);
        if (!Number.isNaN(h)) d.setHours(h || 0, Number.isNaN(m) ? 0 : m, 0, 0);
      }
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const comingSoonProducts = useMemo(() => {
    const now = Date.now();
    return (allProductsQuery?.data?.data || []).filter((p: any) => {
      const pp = p?.product_productPrice?.[0];
      if (!pp) return false;
      if (pp?.sellType !== "BUYGROUP") return false;
      const startTs = getLocalTimestamp(pp?.dateOpen, pp?.startTime);
      return startTs && now < startTs; // not started yet
    });
  }, [allProductsQuery?.data?.data]);

  const Carousel: React.FC<{ list: any[] }> = ({ list }) => {
    const [index, setIndex] = useState(0);
    const auto = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (!list?.length) return;
      auto.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % list.length);
      }, 4000);
      return () => {
        if (auto.current) clearInterval(auto.current);
      };
    }, [list?.length]);

    if (!list?.length) return null;

    return (
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-white shadow-sm">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
          {list.map((p: any) => {
            const img = p?.product_productPrice?.[0]?.productPrice_productSellerImage?.[0]?.image || p?.productImages?.[0]?.image;
            const startLabel = getSaleStartLabel(p?.product_productPrice?.[0]?.dateOpen, p?.product_productPrice?.[0]?.startTime);
            return (
              <div key={p.id} className="min-w-full h-48 sm:h-56 md:h-64 lg:h-72 relative">
                <a href={`/trending/${p.id}`} className="absolute inset-0">
                  {/* background image */}
                  <img src={img || "/images/product-placeholder.png"} alt={p.productName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                  <div className="absolute left-2 right-2 sm:left-4 sm:right-4 bottom-2 sm:bottom-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="text-white">
                      <h3 className="text-sm sm:text-lg md:text-xl font-semibold line-clamp-1 mb-1">{p.productName}</h3>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-500 text-white text-[9px] sm:text-[10px] md:text-xs font-bold shadow">
                          {t("sale_starts_on")}
                        </span>
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] sm:text-[10px] md:text-xs font-semibold shadow">
                          {startLabel}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-bold bg-yellow-500 text-white shadow">{t("coming_soon")}</span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        {/* Dots */}
        <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 flex justify-center gap-1 sm:gap-1.5">
          {list.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`h-1 sm:h-1.5 rounded-full transition-all ${i === index ? "w-4 sm:w-6 bg-white" : "w-2 sm:w-3 bg-white/60"}`} />
          ))}
        </div>
      </div>
    );
  };

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

  const memoizedProductList = useMemo(() => {
    return (
      allProductsQuery?.data?.data?.map((item: any) => {
        let sold = 0;
        if (item.orderProducts?.length) {
          item.orderProducts.forEach((product: any) => {
            sold += product?.orderQuantity || 0;
          });
        }

        return {
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
          vendorDiscountType:
            item?.product_productPrice?.[0]?.vendorDiscountType,
          askForPrice: item?.product_productPrice?.[0]?.askForPrice,
          productPrices: item?.product_productPrice,
          sold: sold,
        };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allProductsQuery?.data?.data,
    allProductsQuery?.data?.data?.length,
    sortBy,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    priceRange[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    priceRange[1],
    page,
    limit,
    searchTerm,
    selectedBrandIds,
    displayMyProducts,
  ]);

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

  // Helper function to calculate discounted price
  const calculateDiscountedPrice = (
    offerPrice: string | number,
    discount: number,
    discountType?: string
  ) => {
    const price = offerPrice ? Number(offerPrice) : 0;
    if (discountType == 'PERCENTAGE') {
      return Number((price - (price * discount) / 100).toFixed(2));
    } else if (discountType == 'FIXED' || discountType == 'FLAT') {
      return Number((price - discount).toFixed(2));
    }
    // If no discount type is specified, treat as fixed discount
    return Number((price - discount).toFixed(2));
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

    if (minPriceInputRef.current) minPriceInputRef.current.value = "";
    if (maxPriceInputRef.current) maxPriceInputRef.current.value = "";
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
        {t("buygroup")} | Ultrasooq
      </title>
      <div className="body-content-s1">
        <TrendingCategories />
        {/* Coming Soon Carousel */}
        <div className="px-2 sm:px-6 lg:px-12 mt-4 mb-6">
          <Carousel list={comingSoonProducts} />
        </div>

        {/* Full Width Three Column Layout */}
        <div className="w-full min-h-screen bg-white px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row h-full gap-4">
            {/* Left Column - Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto p-4 bg-white">
              <div className="bg-white rounded-lg shadow-lg p-6">
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
                        selectedCategoryIds={category.categoryIds ? category.categoryIds.split(",").map(Number) : []}
                        onCategoryChange={(categoryIds) => category.setCategoryIds(categoryIds.join(","))}
                        onClear={() => category.setCategoryIds("")}
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
                            onChange={handleDebounce}
                            dir={langDir}
                            translate="no"
                          />
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
            </div>
            
            {/* Middle Column - Products (MAIN CONTENT - PRIORITIZED) */}
            <div className="flex-1 bg-white overflow-y-auto w-full lg:w-auto">
              <div className="p-2 sm:p-4 lg:p-6">
                {/* Product Header Filter Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {/* Left Section - Mobile Buttons & Title */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Mobile Filter Button */}
                    <button
                      type="button"
                      className="lg:hidden p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setProductFilter(true)}
                    >
                      <FilterMenuIcon />
                    </button>
                    
                    {/* Mobile Cart Button */}
                    <button
                      type="button"
                      className="lg:hidden p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors relative"
                      onClick={() => setShowCartDrawer(true)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {cartList.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartList.length}
                        </span>
                      )}
                    </button>

                    {/* Title */}
                    <div className="flex-1 sm:flex-none">
                      <h2 className="text-base sm:text-xl font-semibold text-gray-900" dir={langDir} translate="no">
                        {t("buygroup_products")}
                      </h2>
                    </div>
                  </div>

                  {/* Right Section - Sort & View Controls */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Sort Dropdown */}
                    <Select onValueChange={(e) => setSortBy(e)} value={sortBy}>
                      <SelectTrigger className="w-full sm:w-[180px] h-10 bg-white border-gray-300">
                        <SelectValue
                          placeholder={t("sort_by")}
                          dir={langDir}
                          translate="no"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="desc" dir={langDir} translate="no">
                            {t("sort_by_latest")}
                          </SelectItem>
                          <SelectItem value="asc" dir={langDir} translate="no">
                            {t("sort_by_oldest")}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* View Type Buttons */}
                    <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                      <button
                        type="button"
                        className={`p-2 rounded transition-colors ${
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
                        className={`p-2 rounded transition-colors ${
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


                {/* Loading State */}
                {allProductsQuery.isLoading && viewType === "grid" ? (
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 sm:items-stretch">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <SkeletonProductCardLoader key={index} />
                    ))}
                  </div>
                ) : null}

                {/* No Data State */}
                {!memoizedProductList.length && !allProductsQuery.isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg" dir={langDir} translate="no">
                      {t("no_data_found")}
                    </p>
                  </div>
                ) : null}

                {/* Grid View */}
                {viewType === "grid" && !allProductsQuery.isLoading ? (
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 sm:items-stretch">
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
                            productQuantity={cartItem?.quantity}
                            productVariant={cartItem?.object}
                            cartId={cartItem?.id}
                            isAddedToCart={cartItem ? true : false}
                            relatedCart={relatedCart}
                            sold={item.sold}
                          />
                        );
                      })}
                    </div>
                  ) : null}

                  {/* List View */}
                  {viewType === "list" && memoizedProductList.length ? (
                    <div className="bg-white rounded-lg shadow">
                      <ProductTable list={memoizedProductList} />
                    </div>
                  ) : null}

                {/* Pagination */}
                {allProductsQuery.data?.totalCount > 10 ? (
                  <div className="mt-8">
                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalCount={allProductsQuery.data?.totalCount}
                      limit={limit}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            
            {/* Right Column - Cart (Desktop) */}
            <div className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-lg shadow-sm">
              <div className="sticky top-0 h-screen overflow-y-auto">
                <div className="bg-white rounded-lg shadow-lg m-4 p-6">
                  <div className="cart_sidebar">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{t("my_cart")}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {cartList.length} {cartList.length === 1 ? t("item") : t("items")}
                        </span>
                      </div>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {cartList.length === 0 ? (
                        <div className="text-center py-6">
                          <svg className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p className="text-gray-500 text-sm">{t("your_cart_is_empty")}</p>
                          <p className="text-gray-400 text-xs mt-1">{t("add_some_products_to_get_started")}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {cartList.slice(0, 3).map((cartItem: any) => {
                            // Find the product data from our memoized product list
                            const productData = memoizedProductList.find((product: any) => product.id === cartItem.productId);
                            
                            // Calculate the price with discount
                            let unitPrice = 0;
                            if (cartItem.cartType === "DEFAULT" && cartItem.productPriceDetails) {
                              const offerPrice = cartItem.productPriceDetails.offerPrice || 0;
                              // Determine which discount to use based on user's trade role
                              let discount = 0;
                              let discountType: string | undefined;
                              
                              if (currentTradeRole && currentTradeRole !== "BUYER") {
                                // VENDOR: Use vendor discount if available
                                discount = cartItem.productPriceDetails.vendorDiscount || 0;
                                discountType = cartItem.productPriceDetails.vendorDiscountType;
                              } else {
                                // BUYER: Use consumer discount if available
                                discount = cartItem.productPriceDetails.consumerDiscount || 0;
                                discountType = cartItem.productPriceDetails.consumerDiscountType;
                              }
                              
                              unitPrice = calculateDiscountedPrice(offerPrice, discount, discountType);
                            } else {
                              // Fallback to offerPrice if available
                              unitPrice = Number(cartItem.productPriceDetails?.offerPrice || cartItem.productPrice || 0);
                            }
                            
                            // Calculate total price (unit price * quantity)
                            const quantity = cartItem.quantity || 1;
                            const totalPrice = unitPrice * quantity;
                            
                            return (
                              <div key={cartItem.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                {/* Product Image */}
                                <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                  {productData?.productImage ? (
                                    <img
                                      src={productData.productImage}
                                      alt={productData.productName || 'Product'}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {productData?.productName || t("product")}
                                  </h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">
                                      Qty: {quantity}
                                    </p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {currency.symbol}{totalPrice.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* Show "and X more" if there are more than 3 items */}
                          {cartList.length > 3 && (
                            <div className="text-center py-2">
                              <p className="text-xs text-gray-500">
                                {t("and_n_more_items", { n: cartList.length - 3 })}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Go to Cart Button */}
                    {cartList.length > 0 && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <button
                          onClick={() => router.push("/cart")}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span>{t("go_to_cart")}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <Sheet open={productFilter} onOpenChange={setProductFilter}>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{t("filters")}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
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
                      selectedCategoryIds={category.categoryIds ? category.categoryIds.split(",").map(Number) : []}
                      onCategoryChange={(categoryIds) => category.setCategoryIds(categoryIds.join(","))}
                      onClear={() => category.setCategoryIds("")}
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
                          onChange={handleDebounce}
                          dir={langDir}
                          translate="no"
                        />
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
                            id={`mobile-${item.label}`}
                            className="border border-gray-300 data-[state=checked]:bg-blue-600!"
                            onCheckedChange={(checked) =>
                              handleBrandChange(checked, item)
                            }
                            checked={selectedBrandIds.includes(item.value)}
                          />
                          <label
                            htmlFor={`mobile-${item.label}`}
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

        {/* Mobile Cart Drawer */}
        <Sheet open={showCartDrawer} onOpenChange={setShowCartDrawer}>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{t("my_cart")}</span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {cartList.length} {cartList.length === 1 ? t("item") : t("items")}
                </span>
              </div>
              
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                {cartList.length === 0 ? (
                  <div className="text-center py-6">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">{t("your_cart_is_empty")}</p>
                    <p className="text-gray-400 text-xs mt-1">{t("add_some_products_to_get_started")}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartList.slice(0, 10).map((cartItem: any) => {
                      const productData = memoizedProductList.find((product: any) => product.id === cartItem.productId);
                      
                      let unitPrice = 0;
                      if (cartItem.cartType === "DEFAULT" && cartItem.productPriceDetails) {
                        const offerPrice = cartItem.productPriceDetails.offerPrice || 0;
                        // Determine which discount to use based on user's trade role
                        let discount = 0;
                        let discountType: string | undefined;
                        
                        if (currentTradeRole && currentTradeRole !== "BUYER") {
                          // VENDOR: Use vendor discount if available
                          discount = cartItem.productPriceDetails.vendorDiscount || 0;
                          discountType = cartItem.productPriceDetails.vendorDiscountType;
                        } else {
                          // BUYER: Use consumer discount if available
                          discount = cartItem.productPriceDetails.consumerDiscount || 0;
                          discountType = cartItem.productPriceDetails.consumerDiscountType;
                        }
                        
                        unitPrice = calculateDiscountedPrice(offerPrice, discount, discountType);
                      } else {
                        unitPrice = Number(cartItem.productPriceDetails?.offerPrice || cartItem.productPrice || 0);
                      }
                      
                      const quantity = cartItem.quantity || 1;
                      const totalPrice = unitPrice * quantity;
                      
                      return (
                        <div key={cartItem.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            {productData?.productImage ? (
                              <img
                                src={productData.productImage}
                                alt={productData.productName || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {productData?.productName || t("product")}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-gray-500">
                                Qty: {quantity}
                              </p>
                              <p className="text-sm font-semibold text-green-600">
                                {currency.symbol}{totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {cartList.length > 10 && (
                      <div className="text-center py-2">
                        <p className="text-xs text-gray-500">
                          {t("and_n_more_items", { n: cartList.length - 10 })}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Go to Cart Button */}
              {cartList.length > 0 && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => router.push("/cart")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Package className="h-4 w-4" />
                    <span>{t("go_to_cart")}</span>
                  </button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Footer />
    </>
  );
};

export default TrendingPage;
