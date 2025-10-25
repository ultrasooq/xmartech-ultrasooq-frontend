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
import BannerSection from "@/components/modules/trending/BannerSection";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
// @ts-ignore
import { startDebugger } from "remove-child-node-error-debugger";

interface TrendingPageProps {
  searchParams?: Promise<{ term?: string }>;
}

const TrendingPage = (props0: TrendingPageProps) => {
  const searchParams = use(props0.searchParams || Promise.resolve({}));
  const t = useTranslations();
  const { langDir, currency } = useAuth();
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
  const [displayMyProducts, setDisplayMyProducts] = useState("0");
  const [displayRelatedProducts, setDisplayRelatedProducts] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
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
        <BannerSection />

        {/* Full Width Three Column Layout */}
        <div className="w-full min-h-screen bg-gray-50 px-4 lg:px-8">
          <div className="flex h-full">
            {/* Left Column - Filters */}
            <div className="w-64 flex-shrink-0 overflow-y-auto p-4 bg-white rounded-lg shadow-sm">
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
            
            {/* Middle Column - Products (MAIN CONTENT) */}
            <div className="flex-1 bg-white overflow-y-auto">
              <div className="p-6">
                {/* Search Section */}
                <div className="mb-6">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="search"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t("search_product")}
                          onChange={handleDebounce}
                          dir={langDir}
                          translate="no"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900" dir={langDir} translate="no">
                      {t("buygroup_products")}
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(e) => setSortBy(e)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder={t("sort_by")} dir={langDir} translate="no" />
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
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setViewType("grid")}
                          className={`p-2 rounded-lg ${viewType === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                        >
                          <GridIcon active={viewType === "grid"} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewType("list")}
                          className={`p-2 rounded-lg ${viewType === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                        >
                          <ListIcon active={viewType === "list"} />
                        </button>
                      </div>
                    </div>
                  </div>


                  {/* Loading State */}
                  {allProductsQuery.isLoading && viewType === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 8 }).map((_, index) => (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  {allProductsQuery.data?.totalCount > 8 ? (
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
            </div>
            
            {/* Right Column - Cart */}
            <div className="w-72 flex-shrink-0 bg-white rounded-lg shadow-sm">
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
                                      Qty: {cartItem.quantity || 1}
                                    </p>
                                    <p className="text-sm font-semibold text-green-600">
                                      {currency.symbol}{Number(cartItem.productPrice || 0).toFixed(2)}
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
      </div>
      <Footer />
    </>
  );
};

export default TrendingPage;
