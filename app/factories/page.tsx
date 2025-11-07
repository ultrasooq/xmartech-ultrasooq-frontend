"use client";
import React, { useEffect, useMemo, useRef, useState, use } from "react";
import { debounce } from "lodash";
import {
  useAddCustomizeProduct,
  useFactoriesProducts,
  useFactoriesCartListByUserId,
  useUpdateFactoriesCartWithLogin,
} from "@/apis/queries/rfq.queries";
import Pagination from "@/components/shared/Pagination";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import RfqProductTable from "@/components/modules/rfq/RfqProductTable";
import FilterMenuIcon from "@/components/icons/FilterMenuIcon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMe } from "@/apis/queries/user.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useClickOutside } from "use-events";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import BannerImage from "@/public/images/rfq-sec-bg.png";
import SearchIcon from "@/public/images/search-icon-rfq.png";
import Footer from "@/components/shared/Footer";
import SkeletonProductCardLoader from "@/components/shared/SkeletonProductCardLoader";
import FactoriesProductCard from "@/components/modules/factories/FactoriesProductCard";
import { useQueryClient } from "@tanstack/react-query";
import FactoryCartMenu from "@/components/modules/factories/FactoriesCartMenu";
import {
  useAddToWishList,
  useDeleteFromWishList,
} from "@/apis/queries/wishlist.queries";
import { useTranslations } from "next-intl";
import { useCartListByUserId } from "@/apis/queries/cart.queries";
import BrandFilterList from "@/components/modules/rfq/BrandFilterList";
import { useBrands } from "@/apis/queries/masters.queries";
import { ISelectOptions, IBrands } from "@/utils/types/common.types";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import AddToCustomizeForm from "@/components/modules/factories/AddToCustomizeForm";
import { useAuth } from "@/context/AuthContext";
import { useProductVariant } from "@/apis/queries/product.queries";
import Cart from "@/components/modules/cartList/Cart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, X, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactSlider from "react-slider";
import { Package } from "lucide-react";

interface FactoriesPageProps {
  searchParams?: Promise<{ term?: string }>;
}

const FactoriesPage = (props: FactoriesPageProps) => {
  const searchParams = props.searchParams ? use(props.searchParams) : {};
  const t = useTranslations();
  const { langDir } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { currency } = useAuth();
  const wrapperRef = useRef(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [searchRfqTerm, setSearchRfqTerm] = useState(searchParams?.term || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermBrand, setSearchTermBrand] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [productFilter, setProductFilter] = useState(false);
  const [selectAllBrands, setSelectAllBrands] = useState<boolean>(false);
  const [displayMyProducts, setDisplayMyProducts] = useState("0");
  const [displayRelatedProducts, setDisplayRelatedProducts] = useState(false);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [productVariants, setProductVariants] = useState<any[]>([]);
  const [cartList, setCartList] = useState<any[]>([]);
  const [factoriesCartList, setFactoriesCartList] = useState<any[]>([]);
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);

  const [isAddToFactoryModalOpen, setIsAddToFactoryModalOpen] = useState(false);
  const [selectedCustomizedProduct, setSelectedCustomizedProduct] = useState<{
    [key: string]: any;
  }>();

  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});
  const handleToggleAddModal = () =>
    setIsAddToFactoryModalOpen(!isAddToFactoryModalOpen);

  const me = useMe(haveAccessToken);
  const brandsQuery = useBrands({
    term: searchTerm,
  });
  
  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: any) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
  }, [brandsQuery?.data?.data?.length]);

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

  const factoriesProductsQuery = useFactoriesProducts({
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
    related: displayRelatedProducts
  });
  const fetchProductVariant = useProductVariant();
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 100,
    },
    haveAccessToken,
  );
  const factoriesCartByUser = useFactoriesCartListByUserId(
    {
      page: 1,
      limit: 100,
    },
    haveAccessToken,
  );
  const addCustomizeProduct = useAddCustomizeProduct();
  const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();

  const handleRfqDebounce = debounce((event: any) => {
    setSearchRfqTerm(event.target.value);
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

  const handleBrandSearchChange = (event: any) => {
    setSearchTermBrand(event.target.value);
  };

  const handleBrandSearch = () => {
    setSearchTerm(searchTermBrand);
  };

  const handleAddToFactories = (productId: number) => {
    const item = factoriesCartList.find((el: any) => el.productId == productId);
    setSelectedCustomizedProduct({
      id: productId,
      customizedProductId: item?.customizeProductId,
      quantity: item?.quantity,
      fromPrice: item?.customizeProductDetail?.fromPrice,
      toPrice: item?.customizeProductDetail?.toPrice,
      note: item?.customizeProductDetail?.note,
    });
    handleToggleAddModal();
  };

  const memoizedRfqProducts = useMemo(() => {
    return (
      factoriesProductsQuery?.data?.data?.map((item: any) => {
        return {
          ...item,
          isAddedToFactoryCart:
            item?.product_rfqCart?.length &&
            item?.product_rfqCart[0]?.quantity > 0,
          factoryCartQuantity: item?.product_rfqCart?.length
            ? item.product_rfqCart[0].quantity
            : 0,
        };
      }) || []
    );
  }, [factoriesProductsQuery.data?.data]);

  const getProductVariants = async () => {
    let productPriceIds = memoizedRfqProducts
      .filter((item: any) => item.product_productPrice.length > 0)
      .map((item: any) => item.product_productPrice[0].id);

    const response = await fetchProductVariant.mutateAsync(productPriceIds);
    if (response.status) setProductVariants(response.data);
  };

  useEffect(() => {
    if (memoizedRfqProducts.length) {
      getProductVariants();
    }
  }, [memoizedRfqProducts]);

  useEffect(() => {
    if (cartListByUser.data?.data) {
      setCartList((cartListByUser.data?.data || []).map((item: any) => item));
    }
  }, [cartListByUser.data?.data]);

  useEffect(() => {
    if (factoriesCartByUser.data?.data) {
      setFactoriesCartList((factoriesCartByUser.data?.data || []).map((item: any) => item));
    }
  }, [factoriesCartByUser.data?.data]);

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
        queryKey: ["factoriesProducts"],
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
        queryKey: ["factoriesProducts"],
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
      setSelectedCustomizedProduct(undefined);
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

    if (searchInputRef?.current) searchInputRef.current.value = "";
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

  return (
    <>
      <title dir={langDir} translate="no">
        {t("factories")} | Ultrasooq
      </title>

      {/* Modern Three-Column Layout */}
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
                        value={searchTermBrand}
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
                        value={minPriceInput}
                        onChange={handleMinPriceChange}
                        onWheel={(e) => e.currentTarget.blur()}
                        ref={minPriceInputRef}
                      />
                      <div className="center-divider"></div>
                      <Input
                        type="number"
                        placeholder={`${currency.symbol}500`}
                        className="custom-form-control-s1 rounded-none"
                        value={maxPriceInput}
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
                          value={searchTermBrand}
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
                          value={minPriceInput}
                          onChange={handleMinPriceChange}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        <div className="center-divider"></div>
                        <Input
                          type="number"
                          placeholder={`${currency.symbol}500`}
                          className="custom-form-control-s1 rounded-none"
                          value={maxPriceInput}
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

        {/* Middle Column - Products (MAIN CONTENT) */}
        <div className="flex-1 bg-white overflow-y-auto w-full lg:w-auto">
          <div className="p-2 sm:p-4 lg:p-6">
            
            {/* Product Header Filter Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {/* Left Section - Mobile Buttons & Product Count */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  className="lg:hidden p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setProductFilter(true)}
                >
                  <FilterMenuIcon />
                </button>
                
                {/* Mobile Cart Button - Hidden on desktop as cart is in right column */}
                <button
                  type="button"
                  className="lg:hidden p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors relative"
                  onClick={() => {/* Will be handled by right column */}}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {factoriesCartList.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {factoriesCartList.length}
                    </span>
                  )}
                </button>

                {/* Product Count */}
                <div className="flex-1 sm:flex-none">
                  <p className="text-base sm:text-lg font-semibold text-gray-800" dir={langDir} translate="no">
                    {factoriesProductsQuery.data?.totalCount || 0} {t("products")}
                  </p>
                </div>
              </div>

              {/* Right Section - Sort & View Controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort Dropdown */}
                <Select onValueChange={(e: any) => setSortBy(e)} value={sortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] h-10 bg-white border-gray-300">
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
            {factoriesProductsQuery.isLoading && viewType === "grid" ? (
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonProductCardLoader key={index} />
                ))}
              </div>
            ) : null}

            {/* No Data State */}
            {!factoriesProductsQuery?.data?.data?.length && !factoriesProductsQuery.isLoading ? (
              <p
                className="text-center text-sm font-medium my-10"
                dir={langDir}
                translate="no"
              >
                {t("no_data_found")}
              </p>
            ) : null}

            {/* Grid View */}
            {viewType === "grid" ? (
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 sm:items-stretch">
                          {memoizedRfqProducts.map((item: any) => {
                            const cartItem = cartList?.find(
                              (el: any) => el.productId == item.id,
                            );
                            const factoryCartItem = factoriesCartList?.find(
                              (el: any) => el.productId == item.id,
                            );

                            return (
                              <FactoriesProductCard
                                key={item.id}
                                id={item.id}
                                productType={item?.productType || "-"}
                                productName={item?.productName || "-"}
                                productNote={item?.productNote || ""}
                                productStatus={item?.status}
                                productImages={item?.productImages}
                                productVariants={
                                  productVariants.find(
                                    (variant: any) =>
                                      variant.productId == item.id,
                                  )?.object || []
                                }
                                productQuantity={factoryCartItem?.quantity || 0}
                                productVariant={factoryCartItem?.object}
                                customizeProductId={factoryCartItem?.customizeProductId}
                                onAdd={() => handleAddToFactories(item.id)}
                                onWishlist={() =>
                                  handleAddToWishlist(
                                    item.id,
                                    item?.product_wishlist,
                                  )
                                }
                                isCreatedByMe={
                                  item?.userId === me.data?.data?.id
                                }
                                cartId={factoryCartItem?.id}
                                isAddedToFactoryCart={
                                  factoryCartItem && factoryCartItem?.quantity > 0
                                    ? true
                                    : false
                                }
                                inWishlist={item?.product_wishlist?.find(
                                  (el: any) => el?.userId === me.data?.data?.id,
                                )}
                                haveAccessToken={haveAccessToken}
                                productPrices={item?.product_productPrice}
                                categoryId={item?.categoryId}
                                categoryLocation={item?.categoryLocation}
                                consumerType={item?.product_productPrice?.[0]?.consumerType}
                              />
                            );
                          })}
              </div>
            ) : null}

            {/* List View */}
            {viewType === "list" && factoriesProductsQuery?.data?.data?.length ? (
              <div className="overflow-x-auto">
                <RfqProductTable
                  list={factoriesProductsQuery?.data?.data}
                />
              </div>
            ) : null}

            {/* Pagination */}
            {factoriesProductsQuery.data?.totalCount > 8 ? (
              <Pagination
                page={page}
                setPage={setPage}
                totalCount={factoriesProductsQuery.data?.totalCount}
                limit={limit}
              />
            ) : null}
          </div>
        </div>

        {/* Right Column - Cart (Desktop Only) */}
        <div className="hidden lg:block w-64 flex-shrink-0 bg-white">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg m-2 lg:m-4 p-4 lg:p-6">
              <div className="cart_sidebar">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{t("factory_cart")}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {factoriesCartList.length} {factoriesCartList.length === 1 ? t("item") : t("items")}
                    </span>
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {factoriesCartList.length === 0 ? (
                    <div className="text-center py-6">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">{t("your_cart_is_empty")}</p>
                      <p className="text-gray-400 text-xs mt-1">{t("add_some_products_to_get_started")}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {factoriesCartList.slice(0, 3).map((cartItem: any) => {
                        // Find the product data from our memoized product list
                        const productData = memoizedRfqProducts.find((product: any) => product.id === cartItem.productId);
                        
                        return (
                          <div key={cartItem.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            {/* Product Image */}
                            <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                              {productData?.productImages?.[0]?.image ? (
                                <img
                                  src={productData.productImages[0].image}
                                  alt={productData.productName || 'Product'}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
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
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-green-600">
                                    {t("customized")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Show "and X more" if there are more than 3 items */}
                      {factoriesCartList.length > 3 && (
                        <div className="text-center py-2">
                          <p className="text-xs text-gray-500">
                            {t("and_n_more_items", { n: factoriesCartList.length - 3 })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Go to Cart Button */}
                {factoriesCartList.length > 0 && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => window.location.href = '/factories-cart'}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Package className="h-4 w-4" />
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

      {/* Add to factories modal */}
      {selectedCustomizedProduct?.id ? (
        <Dialog
          open={isAddToFactoryModalOpen}
          onOpenChange={handleToggleAddModal}
        >
          <DialogContent
            className="add-new-address-modal gap-0 p-0 md:max-w-2xl!"
            ref={wrapperRef}
          >
            <AddToCustomizeForm
              selectedProductId={selectedCustomizedProduct?.id}
              onClose={() => {
                setIsAddToFactoryModalOpen(false);
                setSelectedCustomizedProduct(undefined);
              }}
              onAddToFactory={() => {
                // Refetch the listing API after a successful response
                queryClient.invalidateQueries({
                  queryKey: ["factoriesProducts"],
                  exact: false,
                });
                // Refetch the factories cart
                queryClient.invalidateQueries({
                  queryKey: ["factories-cart-by-user"],
                  exact: false,
                });
              }}
            />
          </DialogContent>
        </Dialog>
      ) : null}
      
      <Footer />
    </>
  );
};

export default FactoriesPage;
