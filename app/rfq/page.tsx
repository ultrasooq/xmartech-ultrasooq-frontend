"use client";
import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { debounce } from "lodash";
import { IBrands, ISelectOptions } from "@/utils/types/common.types";
import { useBrands } from "@/apis/queries/masters.queries";
import { useRfqProducts } from "@/apis/queries/rfq.queries";
import RfqProductCard from "@/components/modules/rfq/RfqProductCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import { cn } from "@/lib/utils";
import RfqProductTable from "@/components/modules/rfq/RfqProductTable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddToRfqForm from "@/components/modules/rfq/AddToRfqForm";

const RfqPage = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchRfqTerm, setSearchRfqTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

  const handleToggleAddModal = () =>
    setIsAddToCartModalOpen(!isAddToCartModalOpen);

  const rfqProductsQuery = useRfqProducts({
    page: 1,
    limit: 40,
    // TODO: api pending
    // term: searchRfqTerm,
    // brandIds:
    //   selectedBrandIds.map((item) => item.toString()).join(",") || undefined,
  });

  const brandsQuery = useBrands({
    term: searchTerm,
  });

  const handleDebounce = debounce((event: any) => {
    setSearchTerm(event.target.value);
  }, 1000);

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
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

  const handleRfqDebounce = debounce((event: any) => {
    setSearchRfqTerm(event.target.value);
  }, 1000);

  const memoizedRfqProductList = useMemo(() => {
    return (
      rfqProductsQuery?.data?.data?.map((item: any) => ({
        id: item.id,
        productType: item?.type || "-",
        productName: item?.rfqProductName || "-",
        productNote: item?.productNote || "-",
        productStatus: item?.status,
        productImages: item?.rfqProductImage || [],
      })) || []
    );
  }, [rfqProductsQuery?.data?.data?.length]);

  console.log(rfqProductsQuery.data?.data);

  return (
    <section className="rfq_section">
      <div className="sec-bg">
        <img src="/images/rfq-sec-bg.png" alt="" />
      </div>
      <div className="rfq-container px-3">
        <div className="row">
          <div className="col-lg-12 rfq_main_box">
            <div className="rfq_left">
              <div className="product_filter_box">
                <div className="product_filter_box_head">
                  <h4>Categories</h4>
                  <img src="images/symbol.svg" alt="symbol-icon" />
                </div>
                <div className="check_filter">
                  <div className="categori_list">
                    <a href="">Clothing & Apparel</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Garden & Kitchen</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Consumer Electrics</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Health & Beauty</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Computers & Technologies</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Jewelry & Watches</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Phones & Accessories</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Sport & Outdoor</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Babies and Moms</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Books & Office</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Cars & Motocycles</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Fruits</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Meat</a>
                  </div>
                  <div className="categori_list">
                    <a href="">Book</a>
                  </div>
                </div>
              </div>

              <div className="trending-search-sec">
                <div className="container m-auto">
                  <div className="left-filter">
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
                                    checked={selectedBrandIds.includes(
                                      item.value,
                                    )}
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
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="rfq_middle">
              <div className="rfq_middle_top">
                <div className="rfq_search">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Product"
                    onChange={handleRfqDebounce}
                  />
                  <button type="button">
                    <img src="images/search-icon-rfq.png" alt="search-icon" />
                  </button>
                </div>
                <div className="rfq_add_new_product">
                  <button
                    type="button"
                    onClick={() => setIsAddToCartModalOpen(true)}
                  >
                    <img src="images/plus-icon-white.png" alt="plus-icon" /> add
                    new product in RFQ
                  </button>
                </div>
              </div>
              <div className="product_section product_gray_n_box">
                <div className="row">
                  <div className="col-lg-12 products_sec_wrap">
                    <div className="products_sec_top">
                      <div className="products_sec_top_left">
                        <h4> trending & high rate product</h4>
                      </div>
                      <div className="products_sec_top_right">
                        <div className="trending_filter">
                          <select>
                            <option>Sort by latest</option>
                            <option>Price Hight to Low</option>
                            <option>Price Low to High</option>
                            <option>Customer Rating</option>
                            <option>What&apos;s New</option>
                            <option>Popularity</option>
                          </select>
                        </div>
                        <div className="trending_view">
                          <ul>
                            <li>View</li>
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
                          </ul>
                        </div>
                      </div>
                    </div>

                    {rfqProductsQuery.isLoading && viewType === "grid" ? (
                      <div className="mt-5 grid grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, index) => (
                          <Skeleton key={index} className="h-80 w-full" />
                        ))}
                      </div>
                    ) : null}

                    {!memoizedRfqProductList.length &&
                    !rfqProductsQuery.isLoading ? (
                      <p className="text-center text-sm font-medium">
                        No data found
                      </p>
                    ) : null}

                    {viewType === "grid" ? (
                      <div className="product_sec_list">
                        {memoizedRfqProductList.map((item: any) => (
                          <RfqProductCard
                            key={item.id}
                            id={item.id}
                            productType={item?.productType || "-"}
                            productName={item?.productName || "-"}
                            productNote={item?.productNote || "-"}
                            productStatus={item?.productStatus}
                            productImages={item?.productImages}
                          />
                        ))}
                      </div>
                    ) : null}

                    {viewType === "list" && memoizedRfqProductList.length ? (
                      <div className="product_sec_list">
                        <RfqProductTable list={memoizedRfqProductList} />
                      </div>
                    ) : null}

                    {memoizedRfqProductList.length > 10 ? <Pagination /> : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="rfq_right">
              <div className="rfq_right_top">
                <h4>RFQ Cart</h4>
                <p>Lorem ipsum dolor sit amet, </p>
                <button type="button">Request For Quote</button>
              </div>
              <div className="rfq_right_bottom">
                <h4>Your RFQ Cart (3 items)</h4>
                <div className="rfq_cart_wrap">
                  <div className="rfq_cart_wrap_image">
                    <img src="images/pro-6.png" alt="pro-6" />
                  </div>
                  <div className="rfq_cart_wrap_content">
                    <div className="rfq_cart_wrap_content_top">
                      <a href="#">Lorem Ipsum is simply dummy text..</a>
                      <div className="pen_gray_icon">
                        <img
                          src="images/pen-gray-icon.png"
                          alt="pen-gray-icon"
                        />
                      </div>
                    </div>
                    <div className="rfq_cart_wrap_content_top_bottom">
                      <div className="quantity">
                        <button className="adjust_field minus">-</button>
                        <input type="text" value="1" />
                        <button className="adjust_field plus">+</button>
                      </div>
                      <div className="remove_text">
                        <span>Remove</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rfq_cart_wrap">
                  <div className="rfq_cart_wrap_image">
                    <img src="images/pro-5.png" alt="pro-5" />
                  </div>
                  <div className="rfq_cart_wrap_content">
                    <div className="rfq_cart_wrap_content_top">
                      <a href="#">Lorem Ipsum is simply dummy text..</a>
                      <div className="pen_gray_icon">
                        <img
                          src="images/pen-gray-icon.png"
                          alt="pen-gray-icon"
                        />
                      </div>
                    </div>
                    <div className="rfq_cart_wrap_content_top_bottom">
                      <div className="quantity">
                        <button className="adjust_field minus">-</button>
                        <input type="text" value="1" />
                        <button className="adjust_field plus">+</button>
                      </div>
                      <div className="remove_text">
                        <span>Remove</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rfq_cart_wrap">
                  <div className="rfq_cart_wrap_image">
                    <img src="images/pro-2.png" alt="pro-2" />
                  </div>
                  <div className="rfq_cart_wrap_content">
                    <div className="rfq_cart_wrap_content_top">
                      <a href="#">Lorem Ipsum is simply dummy text..</a>
                      <div className="pen_gray_icon">
                        <img
                          src="images/pen-gray-icon.png"
                          alt="pen-gray-icon"
                        />
                      </div>
                    </div>
                    <div className="rfq_cart_wrap_content_top_bottom">
                      <div className="quantity">
                        <button className="adjust_field minus">-</button>
                        <input type="text" value="1" />
                        <button className="adjust_field plus">+</button>
                      </div>
                      <div className="remove_text">
                        <span>Remove</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isAddToCartModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent className="add-new-address-modal gap-0 p-0 md:!max-w-2xl">
          <AddToRfqForm
            onClose={() => {
              setIsAddToCartModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RfqPage;
