"use client";
import React, { useEffect, useMemo, useRef, useState, use } from "react";
import { debounce } from "lodash";
import {
  useRfqCartListByUserId,
  useRfqProducts,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import RfqProductCard from "@/components/modules/rfq/RfqProductCard";
import Pagination from "@/components/shared/Pagination";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import RfqProductTable from "@/components/modules/rfq/RfqProductTable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddToRfqForm from "@/components/modules/rfq/AddToRfqForm";
import { useMe } from "@/apis/queries/user.queries";
import RfqCartMenu from "@/components/modules/rfq/RfqCartMenu";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useClickOutside } from "use-events";
// import { useCartStore } from "@/lib/rfqStore";
// import CategoryFilterList from "@/components/modules/rfq/CategoryFilterList";
// import BrandFilterList from "@/components/modules/rfq/BrandFilterList";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSlider from "react-slider";
import Link from "next/link";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import BannerImage from "@/public/images/rfq-sec-bg.png";
import SearchIcon from "@/public/images/search-icon-rfq.png";
import Footer from "@/components/shared/Footer";
import { FaPlus } from "react-icons/fa";
import SkeletonProductCardLoader from "@/components/shared/SkeletonProductCardLoader";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useBrands } from "@/apis/queries/masters.queries";
import { IBrands, ISelectOptions } from "@/utils/types/common.types";
import { useCategoryStore } from "@/lib/categoryStore";
import CategoryFilter from "@/components/modules/manageProducts/CategoryFilter";
// @ts-ignore
import { startDebugger } from "remove-child-node-error-debugger";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, Package } from "lucide-react";
import FilterMenuIcon from "@/components/icons/FilterMenuIcon";

interface RfqPageProps {
  searchParams?: Promise<{ term?: string }>;
}

const RfqPage = (props: RfqPageProps) => {
  const searchParams = props.searchParams ? use(props.searchParams) : {};
  const t = useTranslations();
  const { langDir, currency } = useAuth();
  const queryClient = useQueryClient();
  const categoryStore = useCategoryStore();
  const { toast } = useToast();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [searchRfqTerm, setSearchRfqTerm] = useState(searchParams?.term || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermBrand, setSearchTermBrand] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectAllBrands, setSelectAllBrands] = useState<boolean>(false);
  const [displayMyProducts, setDisplayMyProducts] = useState("0");
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [productFilter, setProductFilter] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [quantity, setQuantity] = useState<number | undefined>();
  const [offerPriceFrom, setOfferPriceFrom] = useState<number | undefined>();
  const [offerPriceTo, setOfferPriceTo] = useState<number | undefined>();
  const [cartList, setCartList] = useState<any[]>([]);
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();

  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});

  const handleToggleAddModal = () =>
    setIsAddToCartModalOpen(!isAddToCartModalOpen);

  const me = useMe(haveAccessToken);
  const rfqProductsQuery = useRfqProducts({
    page,
    limit,
    term: searchRfqTerm,
    adminId:
      me?.data?.data?.tradeRole == "MEMBER"
        ? me?.data?.data?.addedBy
        : me?.data?.data?.id,
    sortType: sortBy,
    brandIds: selectedBrandIds.join(","),
    isOwner: displayMyProducts == "1" ? "me" : "",
  });

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

  const rfqCartListByUser = useRfqCartListByUserId(
    {
      page: 1,
      limit: 100,
    },
    haveAccessToken,
  );

  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();

  const handleRfqDebounce = debounce((event: any) => {
    setSearchRfqTerm(event.target.value);
  }, 1000);

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const handlePriceDebounce = debounce((event: any) => {
    setPriceRange(event);
  }, 1000);

  const handleMinPriceChange = debounce((event: any) => {
    setMinPriceInput(event.target.value);
  }, 1000);

  const handleMaxPriceChange = debounce((event: any) => {
    setMaxPriceInput(event.target.value);
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

  const handleRFQCart = (
    quantity: number,
    productId: number,
    action: "add" | "remove",
    offerPriceFrom?: number,
    offerPriceTo?: number,
    note?: string,
  ) => {
    // If quantity is 0 or action is "remove", remove from cart
    if (action === "remove" || quantity === 0 || !quantity) {
      handleAddToCart(0, productId, "remove", 0, 0, "");
    } else {
      handleToggleAddModal();
      setSelectedProductId(productId);
      setQuantity(quantity);
      setOfferPriceFrom(offerPriceFrom);
      setOfferPriceTo(offerPriceTo);
    }
  };

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
    offerPriceFrom?: number,
    offerPriceTo?: number,
    note?: string,
  ) => {
    const response = await updateRfqCartWithLogin.mutateAsync({
      productId,
      quantity,
      offerPriceFrom: offerPriceFrom || 0,
      offerPriceTo: offerPriceTo || 0,
      note: note || "",
    });

    if (response.status) {
      toast({
        title:
          actionType == "add"
            ? t("item_added_to_cart")
            : t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    }
  };

  const handleCartPage = () => router.push("/rfq-cart");

  const memoizedRfqProducts = useMemo(() => {
    if (rfqProductsQuery.data?.data) {
      return (
        rfqProductsQuery.data?.data.map((item: any) => {
          return {
            ...item,
            isAddedToCart:
              item?.product_rfqCart?.length &&
              item?.product_rfqCart[0]?.quantity > 0,
            quantity:
              item?.product_rfqCart?.length &&
              item?.product_rfqCart[0]?.quantity,
          };
        }) || []
      );
    } else {
      return [];
    }
  }, [rfqProductsQuery.data?.data]);

  useEffect(() => {
    if (rfqCartListByUser.data?.data) {
      setCartList(rfqCartListByUser.data?.data?.map((item: any) => item) || []);
    }
  }, [rfqCartListByUser.data?.data]);

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
        queryKey: ["rfq-products"],
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
        queryKey: ["rfq-products"],
      });
    } else {
      toast({
        title: response.message || t("item_not_added_to_wishlist"),
        description: t("check_your_wishlist_for_more_details"),
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (isClickedOutside) {
      setSelectedProductId(undefined);
      setQuantity(undefined);
    }
  }, [isClickedOutside]);

  const selectAll = () => {
    setSelectAllBrands(true);
  };

  const clearFilter = () => {
    setSelectAllBrands(false);
    setSearchRfqTerm("");
    setSelectedBrandIds([]);
    setDisplayMyProducts("0");
    setMaxPriceInput("");
    setMinPriceInput("");
    setPriceRange([]);
    setSelectedCategoryIds([]);

    if (searchInputRef?.current) searchInputRef.current.value = "";
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

  startDebugger();

  return (
    <>
      <title dir={langDir} translate="no">
        {t("rfq")} | Ultrasooq
      </title>
      <div className="body-content-s1">
        {/* Full Width Three Column Layout */}
        <div className="min-h-screen w-full bg-white px-2 sm:px-4 lg:px-8">
          <div className="flex h-full flex-col gap-4 lg:flex-row">
            {/* Left Column - Filters (Desktop) */}
            <div className="hidden w-64 flex-shrink-0 overflow-y-auto bg-white p-4 lg:block">
              <div className="rounded-lg bg-white p-6 shadow-lg">
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
                              id={item.label}
                              className="border border-gray-300 data-[state=checked]:bg-blue-600!"
                              onCheckedChange={(checked) =>
                                handleBrandChange(checked, item)
                              }
                              checked={selectedBrandIds.includes(item.value)}
                            />
                            <label
                              htmlFor={item.label}
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
            <div className="w-full flex-1 overflow-y-auto bg-white lg:w-auto">
              <div className="p-2 sm:p-4 lg:p-6">
                {/* Product Header Filter Section */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
                  {/* Left Section - Mobile Buttons & Title */}
                  <div className="flex w-full items-center gap-3 sm:w-auto">
                    {/* Mobile Filter Button */}
                    <button
                      type="button"
                      className="rounded-lg border border-gray-300 bg-white p-2.5 transition-colors hover:bg-gray-100 lg:hidden"
                      onClick={() => setProductFilter(true)}
                    >
                      <FilterMenuIcon />
                    </button>

                    {/* Mobile Cart Button */}
                    <button
                      type="button"
                      className="relative rounded-lg border border-gray-300 bg-white p-2.5 transition-colors hover:bg-gray-100 lg:hidden"
                      onClick={() => setShowCartDrawer(true)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {cartList.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {cartList.length}
                        </span>
                      )}
                    </button>

                    {/* Title */}
                    <div className="flex-1 sm:flex-none">
                      <h2
                        className="text-base font-semibold text-gray-900 sm:text-xl"
                        dir={langDir}
                        translate="no"
                      >
                        {t("rfq_products")}
                      </h2>
                    </div>
                  </div>

                  {/* Right Section - Sort & View Controls */}
                  <div className="flex w-full items-center gap-3 sm:w-auto">
                    {/* Sort Dropdown */}
                    <Select
                      onValueChange={(e: any) => setSortBy(e)}
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
                            value="newest"
                            dir={langDir}
                            translate="no"
                          >
                            {t("sort_by_latest")}
                          </SelectItem>
                          <SelectItem
                            value="oldest"
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

                {/* Search and Add Product Section */}
                <div className="mb-6">
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="search"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:py-2.5 sm:text-base"
                          placeholder={t("search_product")}
                          onChange={handleRfqDebounce}
                          ref={searchInputRef}
                          defaultValue={searchParams?.term || ""}
                          dir={langDir}
                          translate="no"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {haveAccessToken && me?.data?.data?.tradeRole != "BUYER" ? (
                      <Link
                        href="/product?productType=R"
                        className="flex items-center justify-center gap-x-2 rounded-lg bg-orange-500 px-4 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-orange-600 sm:py-2.5 sm:text-base"
                        dir={langDir}
                        translate="no"
                      >
                        <FaPlus />
                        {t("add_new_rfq_product")}
                      </Link>
                    ) : null}
                  </div>
                </div>

                {/* Loading State */}
                {rfqProductsQuery.isLoading && viewType === "grid" ? (
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <SkeletonProductCardLoader key={index} />
                    ))}
                  </div>
                ) : null}

                {/* No Data State */}
                {!rfqProductsQuery?.data?.data?.length &&
                !rfqProductsQuery.isLoading ? (
                  <div className="py-12 text-center">
                    <p
                      className="text-lg text-gray-500"
                      dir={langDir}
                      translate="no"
                    >
                      {t("no_data_found")}
                    </p>
                  </div>
                ) : null}

                {/* Grid View */}
                {viewType === "grid" && !rfqProductsQuery.isLoading ? (
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:items-stretch sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                    {memoizedRfqProducts.map((item: any) => (
                      <RfqProductCard
                        key={item.id}
                        id={item.id}
                        productType={item?.productType || "-"}
                        productName={item?.productName || "-"}
                        productNote={
                          cartList?.find((el: any) => el.productId == item.id)
                            ?.note || ""
                        }
                        productStatus={item?.status}
                        productImages={item?.productImages}
                        productQuantity={item?.quantity || 0}
                        productPrice={item?.product_productPrice}
                        offerPriceFrom={
                          cartList?.find((el: any) => el.productId == item.id)
                            ?.offerPriceFrom
                        }
                        offerPriceTo={
                          cartList?.find((el: any) => el.productId == item.id)
                            ?.offerPriceTo
                        }
                        onAdd={handleRFQCart}
                        onToCart={handleCartPage}
                        onEdit={() => {
                          handleToggleAddModal();
                          setSelectedProductId(item?.id);
                        }}
                        onWishlist={() =>
                          handleAddToWishlist(item.id, item?.product_wishlist)
                        }
                        isCreatedByMe={item?.userId === me.data?.data?.id}
                        isAddedToCart={item?.isAddedToCart}
                        inWishlist={item?.product_wishlist?.find(
                          (el: any) => el?.userId === me.data?.data?.id,
                        )}
                        haveAccessToken={haveAccessToken}
                        productReview={item?.productReview || []}
                        shortDescription={
                          item?.product_productShortDescription?.[0]
                            ?.shortDescription || ""
                        }
                      />
                    ))}
                  </div>
                ) : null}

                {/* List View */}
                {viewType === "list" && rfqProductsQuery?.data?.data?.length ? (
                  <div className="rounded-lg bg-white shadow">
                    <RfqProductTable list={rfqProductsQuery?.data?.data} />
                  </div>
                ) : null}

                {/* Pagination */}
                {rfqProductsQuery.data?.totalCount > 10 ? (
                  <div className="mt-8">
                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalCount={rfqProductsQuery.data?.totalCount}
                      limit={limit}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right Column - RFQ Cart (Desktop) */}
            <div className="hidden w-72 flex-shrink-0 rounded-lg bg-white shadow-sm lg:block">
              <div className="sticky top-0 h-screen overflow-y-auto">
                <div className="m-4 rounded-lg bg-white p-6 shadow-lg">
                  <div className="cart_sidebar">
                    <div className="mb-4 border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {t("my_cart")}
                        </h3>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-500">
                          {cartList.length}{" "}
                          {cartList.length === 1 ? t("item") : t("items")}
                        </span>
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {cartList.length === 0 ? (
                        <div className="py-6 text-center">
                          <svg
                            className="mx-auto mb-3 h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          <p className="text-sm text-gray-500">
                            {t("your_cart_is_empty")}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {t("add_some_products_to_get_started")}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {cartList.slice(0, 3).map((cartItem: any) => {
                            // Find the product data from our memoized product list
                            const productData = memoizedRfqProducts.find(
                              (product: any) =>
                                product.id === cartItem.productId,
                            );

                            return (
                              <div
                                key={cartItem.id}
                                className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                              >
                                {/* Product Image */}
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                  {productData?.productImages?.[0]?.image ? (
                                    <img
                                      src={productData.productImages[0].image}
                                      alt={productData.productName || "Product"}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                      <svg
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>

                                {/* Product Info */}
                                <div className="min-w-0 flex-1">
                                  <h4 className="truncate text-sm font-medium text-gray-900">
                                    {productData?.productName || t("product")}
                                  </h4>
                                  <div className="mt-1 flex items-center justify-between">
                                    <p className="text-xs text-gray-500">
                                      Qty: {cartItem.quantity || 1}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Show "and X more" if there are more than 3 items */}
                          {cartList.length > 3 && (
                            <div className="py-2 text-center">
                              <p className="text-xs text-gray-500">
                                {t("and_n_more_items", {
                                  n: cartList.length - 3,
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Go to Cart Button */}
                    {cartList.length > 0 && (
                      <div className="border-t border-gray-200 bg-gray-50 p-4">
                        <button
                          onClick={handleCartPage}
                          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-orange-700"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          <span>{t("go_to_rfq_cart")}</span>
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

        {/* Mobile Cart Drawer */}
        <Sheet open={showCartDrawer} onOpenChange={setShowCartDrawer}>
          <SheetContent
            side="right"
            className="w-[300px] overflow-y-auto sm:w-[400px]"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{t("my_cart")}</span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <div className="mb-4 border-b border-gray-200 pb-4">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-500">
                  {cartList.length}{" "}
                  {cartList.length === 1 ? t("item") : t("items")}
                </span>
              </div>

              <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                {cartList.length === 0 ? (
                  <div className="py-6 text-center">
                    <Package className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      {t("your_cart_is_empty")}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {t("add_some_products_to_get_started")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartList.slice(0, 10).map((cartItem: any) => {
                      const productData = memoizedRfqProducts.find(
                        (product: any) => product.id === cartItem.productId,
                      );

                      return (
                        <div
                          key={cartItem.id}
                          className="flex items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {productData?.productImages?.[0]?.image ? (
                              <img
                                src={productData.productImages[0].image}
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
                            <h4 className="truncate text-sm font-medium text-gray-900">
                              {productData?.productName || t("product")}
                            </h4>
                            <div className="mt-1 flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                Qty: {cartItem.quantity || 1}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {cartList.length > 10 && (
                      <div className="py-2 text-center">
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
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <button
                    onClick={handleCartPage}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                  >
                    <Package className="h-4 w-4" />
                    <span>{t("go_to_rfq_cart")}</span>
                  </button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Dialog open={isAddToCartModalOpen} onOpenChange={handleToggleAddModal}>
          <DialogContent
            className="add-new-address-modal gap-0 p-0 md:max-w-2xl!"
            ref={wrapperRef}
          >
            <AddToRfqForm
              onClose={() => {
                setIsAddToCartModalOpen(false);
                setSelectedProductId(undefined);
                setQuantity(undefined);
              }}
              selectedProductId={selectedProductId}
              selectedQuantity={quantity}
              offerPriceFrom={offerPriceFrom}
              offerPriceTo={offerPriceTo}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default RfqPage;
