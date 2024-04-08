"use client";
import React, { useMemo, useState } from "react";
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
import { cn } from "@/lib/utils";
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

const TrendingPage = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [productFilter,setProductFilter] = useState(false);

  const allProductsQuery = useAllProducts({
    page: 1,
    limit: 20,
    sort: sortBy,
    priceMin:
      priceRange[0] === 0
        ? 0
        : (priceRange[0] || Number(minPriceInput)) ?? undefined,
    priceMax: priceRange[1] || Number(maxPriceInput) || undefined,
    brandIds:
      selectedBrandIds.map((item) => item.toString()).join(",") || undefined,
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
      })) || []
    );
  }, [
    allProductsQuery?.data?.data?.length,
    sortBy,
    priceRange[0],
    priceRange[1],
  ]);

  // console.log(minPriceInput, maxPriceInput);
  return (
    <>
      <div className="body-content-s1">
        {/* start: custom-inner-banner-s1 */}
        <div className="custom-inner-banner-s1">
          <div className="container m-auto px-3">
            <div className="custom-inner-banner-s1-captionBox">
              <img
                src="/images/trending-product-inner-banner.png"
                alt=""
                className="bg-image"
              ></img>
              <div className="text-container">
                <ul className="page-indicator">
                  <li>
                    <a href="#">Home</a>
                    <img src="/images/nextarow.svg" alt="" />
                  </li>
                  <li>
                    <a href="#">Shop</a>
                    <img src="/images/nextarow.svg" alt="" />
                  </li>
                  <li>Phones & Accessories</li>
                </ul>
                <h2>sed do eiusmod tempor incididunt</h2>
                <h5>Only 2 days:</h5>
                <h4>21/10 & 22/10</h4>
                <div className="action-btns">
                  <button
                    type="button"
                    className="theme-primary-btn custom-btn"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="image-container">
                <img
                  src="/images/trending-product-inner-banner-pic.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
        {/* end: custom-inner-banner-s1 */}

        {/* start: trending-search-sec */}
        <div className="trending-search-sec">
          <div className="container m-auto px-3">
            <div className={productFilter ? "left-filter show" : "left-filter"}>
              <Accordion
                type="single"
                defaultValue="brand"
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
                        {/* <Slider defaultValue={[50]} max={100} step={1} /> */}
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
                        />
                        <div className="center-divider"></div>
                        <Input
                          type="number"
                          placeholder="$500"
                          className="custom-form-control-s1 rounded-none"
                          onChange={handleMaxPriceChange}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* <div className="filter-col">
                <div className="filter-sub-header">
                  <div className="filter-name-with-arow">
                    <h3>By Brand</h3>
                    <button type="button" className="arow-btn">
                      <img src="/images/down-arow-lg.svg" alt="" />
                    </button>
                  </div>
          
                  <input
                    type="text"
                    className="custom-form-control-s1 searchInput"
                    placeholder="Search Brand"
                  ></input>
                </div>
                <div className="filter-body-part">
                  <div className="filter-checklists">
                    {memoizedBrands.map((item: ISelectOptions) => (
                      <div key={item.value} className="div-li">
                        <Checkbox
                          id={item.label}
                          className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
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
              </div> */}

              {/* <div className="filter-col">
                <div className="filter-sub-header">
                  <div className="filter-name-with-arow">
                    <h3>Price</h3>
                    <button type="button" className="arow-btn">
                      <img src="/images/down-arow-lg.svg" alt="" />
                    </button>
                  </div>
                </div>

                <div className="filter-body-part">
                  <div className="mb-4">
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="range-price-left-right-info">
                    <select className="custom-form-control-s1 select1">
                      <option>$0</option>
                    </select>
                    <div className="center-divider"></div>
                    <select className="custom-form-control-s1 select1">
                      <option>$500</option>
                    </select>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="left-filter-overlay" onClick={()=> setProductFilter(false)}></div>
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
                    {/* <li>View</li> */}
                    <li>
                      <button
                        type="button"
                        className={cn(
                          "view-type-btn",
                          viewType === "grid" ? "active" : "",
                        )}
                        onClick={() => setViewType("grid")}
                      >
                        <GridIcon />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={cn(
                          "view-type-btn",
                          viewType === "list" ? "active" : "",
                        )}
                        onClick={() => setViewType("list")}
                      >
                        <ListIcon />
                      </button>
                    </li>
                    <li>
                    <button
                        type="button"
                        className="view-type-btn"
                        onClick={()=> setProductFilter(true)}
                      >
                        <FilterMenuIcon />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {allProductsQuery.isLoading && viewType === "grid" ? (
                <div className="grid grid-cols-4 gap-5">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-80 w-full" />
                </div>
              ) : null}

              {!memoizedProductList.length && !allProductsQuery.isLoading ? (
                <p className="text-center text-sm font-medium">No data found</p>
              ) : null}

              {viewType === "grid" ? (
                <div className="product-list-s1">
                  {memoizedProductList.map((item: TrendingProduct) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              ) : null}

              {viewType === "list" && memoizedProductList.length ? (
                <div className="product-list-s1 p-4">
                  <ProductTable list={memoizedProductList} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* end: trending-search-sec */}
      </div>
    </>
  );
};

export default TrendingPage;
