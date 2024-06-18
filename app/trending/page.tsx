"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  IBrands,
  ISelectOptions,
  TrendingProduct,
} from "@/utils/types/common.types";
import { useBrands } from "@/apis/queries/masters.queries";
import { Checkbox } from "@/components/ui/checkbox";
import { useAllProducts } from "@/apis/queries/product.queries";
import ProductCard from "@/components/modules/trending/ProductCard";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import FilterMenuIcon from "@/components/icons/FilterMenuIcon";
import ProductTable from "@/components/modules/trending/ProductTable";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  useUpdateCartByDevice,
  useUpdateCartWithLogin,
} from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import BannerSection from "@/components/modules/trending/BannerSection";

const TrendingPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deviceId = getOrCreateDeviceId() || "";
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [productFilter, setProductFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);

  const me = useMe();
  const updateCartWithLogin = useUpdateCartWithLogin();
  const updateCartByDevice = useUpdateCartByDevice();
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();
  const allProductsQuery = useAllProducts({
    page,
    limit,
    sort: sortBy,
    priceMin:
      priceRange[0] === 0
        ? 0
        : (priceRange[0] || Number(minPriceInput)) ?? undefined,
    priceMax: priceRange[1] || Number(maxPriceInput) || undefined,
    brandIds:
      selectedBrandIds.map((item) => item.toString()).join(",") || undefined,
    userId: me.data?.data?.id,
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
      allProductsQuery?.data?.data?.map((item: any) => ({
        id: item.id,
        productName: item?.productName || "-",
        productPrice: item?.productPrice || 0,
        offerPrice: item?.offerPrice || 0,
        productImage: item?.productImages?.[0]?.image,
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
      })) || []
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
  ]);

  const handleAddToCart = async (quantity: number, productPriceId?: number) => {
    if (haveAccessToken) {
      if (!productPriceId) {
        toast({
          title: `Oops! Something went wrong`,
          description: "Product Price Id not found",
          variant: "danger",
        });
        return;
      }
      const response = await updateCartWithLogin.mutateAsync({
        productPriceId,
        quantity,
      });

      if (response.status) {
        toast({
          title: "Item added to cart",
          description: "Check your cart for more details",
          variant: "success",
        });
      }
    } else {
      if (!productPriceId) {
        toast({
          title: `Oops! Something went wrong`,
          description: "Product Price Id not found",
          variant: "danger",
        });
        return;
      }
      const response = await updateCartByDevice.mutateAsync({
        productPriceId,
        quantity,
        deviceId,
      });
      if (response.status) {
        toast({
          title: "Item added to cart",
          description: "Check your cart for more details",
          variant: "success",
        });
        return response.status;
      }
    }
  };

  const handleDeleteFromWishlist = async (productId: number) => {
    const response = await deleteFromWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: "Item removed from wishlist",
        description: "Check your wishlist for more details",
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
        title: "Item not removed from wishlist",
        description: "Check your wishlist for more details",
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
        title: "Item added to wishlist",
        description: "Check your wishlist for more details",
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
        title: response.message || "Item not added to wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
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
      <div className="body-content-s1">
        <BannerSection />

        <div className="trending-search-sec">
          <div className="container m-auto px-3">
            <div className={productFilter ? "left-filter show" : "left-filter"}>
              <Accordion
                type="multiple"
                defaultValue={["brand"]}
                className="filter-col"
              >
                <AccordionItem value="brand">
                  <AccordionTrigger className="px-3 text-base hover:!no-underline">
                    By Brand
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="filter-sub-header">
                      <Input
                        type="text"
                        placeholder="Search Brand"
                        className="custom-form-control-s1 searchInput rounded-none"
                        onChange={handleDebounce}
                      />
                    </div>
                    <div className="filter-body-part">
                      <div className="filter-checklists">
                        {!memoizedBrands.length ? (
                          <p className="text-center text-sm font-medium">
                            No data found
                          </p>
                        ) : null}
                        {memoizedBrands.map((item: ISelectOptions) => (
                          <div key={item.value} className="div-li">
                            <Checkbox
                              id={item.label}
                              className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                              onCheckedChange={(checked) =>
                                handleBrandChange(checked, item)
                              }
                              checked={selectedBrandIds.includes(item.value)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={item.label}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {item.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="px-3 text-base hover:!no-underline">
                    Price
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
                          // value={priceRange}
                          max={500}
                          min={0}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          className="mb-4"
                          onClick={() => setPriceRange([])}
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="range-price-left-right-info">
                        <Input
                          type="number"
                          placeholder="$0"
                          className="custom-form-control-s1 rounded-none"
                          onChange={handleMinPriceChange}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        <div className="center-divider"></div>
                        <Input
                          type="number"
                          placeholder="$500"
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
            <div
              className="left-filter-overlay"
              onClick={() => setProductFilter(false)}
            ></div>
            <div className="right-products">
              <div className="products-header-filter">
                <div className="le-info">
                  <h3>Phones & Accessories</h3>
                </div>
                <div className="rg-filter">
                  <p>{memoizedProductList.length} Products found</p>
                  <ul>
                    <li>
                      <Select onValueChange={(e) => setSortBy(e)}>
                        <SelectTrigger className="custom-form-control-s1 bg-white">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="desc">Sort by latest</SelectItem>
                            <SelectItem value="asc">Sort by oldest</SelectItem>
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
                    <li>
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
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-80 w-full" />
                  ))}
                </div>
              ) : null}

              {!memoizedProductList.length && !allProductsQuery.isLoading ? (
                <p className="text-center text-sm font-medium">No data found</p>
              ) : null}

              {viewType === "grid" ? (
                <div className="product-list-s1">
                  {memoizedProductList.map((item: TrendingProduct) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onAdd={() =>
                        handleAddToCart(-1, item.productProductPriceId)
                      }
                      onWishlist={() =>
                        handleAddToWishlist(item.id, item?.productWishlist)
                      }
                      inWishlist={item?.inWishlist}
                      haveAccessToken={haveAccessToken}
                      isInteractive
                    />
                  ))}
                </div>
              ) : null}

              {viewType === "list" && memoizedProductList.length ? (
                <div className="product-list-s1 p-4">
                  <ProductTable list={memoizedProductList} />
                </div>
              ) : null}

              {allProductsQuery.data?.totalCount > 8 ? (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalCount={allProductsQuery.data?.totalCount}
                  limit={limit}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrendingPage;
