"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import {
  useRfqProducts,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import RfqProductCard from "@/components/modules/rfq/RfqProductCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import { cn } from "@/lib/utils";
import RfqProductTable from "@/components/modules/rfq/RfqProductTable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddToRfqForm from "@/components/modules/rfq/AddToRfqForm";
import { useMe } from "@/apis/queries/user.queries";
import RfqCartMenu from "@/components/modules/rfq/RfqCartMenu";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useClickOutside } from "use-events";
import { useCartStore } from "@/lib/rfqStore";
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
import Link from "next/link";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import BannerImage from "@/public/images/rfq-sec-bg.png";
import PlusWhiteIcon from "@/public/images/plus-icon-white.png";
import SearchIcon from "@/public/images/search-icon-rfq.png";
import Footer from "@/components/shared/Footer";

const RfqPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [searchRfqTerm, setSearchRfqTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const cart = useCartStore();

  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});

  const handleToggleAddModal = () =>
    setIsAddToCartModalOpen(!isAddToCartModalOpen);

  const me = useMe();
  const rfqProductsQuery = useRfqProducts({
    page: 1,
    limit: 60,
    term: searchRfqTerm,
    adminId: me?.data?.data?.id || undefined,
    sortType: sortBy,
    // brandIds:
    //   selectedBrandIds.map((item) => item.toString()).join(",") || undefined,
  });
  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();

  const handleRfqDebounce = debounce((event: any) => {
    setSearchRfqTerm(event.target.value);
  }, 1000);

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
  ) => {
    const response = await updateRfqCartWithLogin.mutateAsync({
      productId,
      quantity,
    });

    if (response.status) {
      toast({
        title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
        description: "Check your cart for more details",
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
            isAddedToCart: cart.cart.some(
              (cartItem) => cartItem.rfqProductId === item.id,
            ),
            quantity:
              cart.cart.find((cartItem) => cartItem.rfqProductId === item.id)
                ?.quantity || 0,
          };
        }) || []
      );
    } else {
      return [];
    }
  }, [rfqProductsQuery.data?.data, me?.data?.data, cart.cart]);

  useEffect(() => {
    if (isClickedOutside) {
      setSelectedProductId(undefined);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    const accessToken = getCookie(PUREMOON_TOKEN_KEY);
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [getCookie(PUREMOON_TOKEN_KEY)]);

  return (
    <>
      <section className="rfq_section">
        <div className="sec-bg relative">
          <Image src={BannerImage} alt="background-banner" fill />
        </div>
        <div className="rfq-container px-3">
          <div className="row">
            <div className="rfq_main_box !justify-center">
              <div className="rfq_left">
                {/* <CategoryFilterList /> */}
                {/* <BrandFilterList /> */}
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
                      <Image
                        src={SearchIcon}
                        height={14}
                        width={14}
                        alt="search-icon"
                      />
                    </button>
                  </div>
                  {haveAccessToken ? (
                    <div className="rfq_add_new_product">
                      <Link
                        href="/create-product?productType=R"
                        className="flex gap-x-2 bg-dark-orange px-3 py-2 text-white"
                      >
                        <Image
                          src={PlusWhiteIcon}
                          width={15}
                          height={24}
                          alt="plus-icon"
                        />{" "}
                        Add new product in RFQ
                      </Link>
                    </div>
                  ) : null}
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
                            <Select
                              onValueChange={(e: any) => setSortBy(e)}
                              defaultValue={sortBy}
                            >
                              <SelectTrigger className="custom-form-control-s1 bg-white">
                                <SelectValue placeholder="Sort by" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="newest">
                                    Sort by latest
                                  </SelectItem>
                                  <SelectItem value="oldest">
                                    Sort by oldest
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="trending_view">
                            <ul>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => setViewType("grid")}
                                >
                                  <GridIcon active={viewType === "grid"} />
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => setViewType("list")}
                                >
                                  <ListIcon active={viewType === "list"} />
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

                      {!rfqProductsQuery?.data?.data?.length &&
                      !rfqProductsQuery.isLoading ? (
                        <p className="my-10 text-center text-sm font-medium">
                          No data found
                        </p>
                      ) : null}

                      {viewType === "grid" ? (
                        <div className="product_sec_list">
                          {memoizedRfqProducts.map((item: any) => (
                            <RfqProductCard
                              key={item.id}
                              id={item.id}
                              productType={item?.productType || "-"}
                              productName={item?.productName || "-"}
                              productNote={item?.productNote || "-"}
                              productStatus={item?.status}
                              productImages={item?.productImages}
                              productQuantity={item?.quantity || 0}
                              onAdd={handleAddToCart}
                              onToCart={handleCartPage}
                              onEdit={() => {
                                handleToggleAddModal();
                                setSelectedProductId(item?.id);
                              }}
                              isCreatedByMe={item?.userId === me.data?.data?.id}
                              isAddedToCart={item?.isAddedToCart}
                              haveAccessToken={haveAccessToken}
                            />
                          ))}
                        </div>
                      ) : null}

                      {viewType === "list" &&
                      rfqProductsQuery?.data?.data?.length ? (
                        <div className="product_sec_list">
                          <RfqProductTable
                            list={rfqProductsQuery?.data?.data}
                          />
                        </div>
                      ) : null}

                      {rfqProductsQuery?.data?.data?.length > 10 ? (
                        <Pagination />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <RfqCartMenu onAdd={handleAddToCart} />
            </div>
          </div>
        </div>
        <Dialog open={isAddToCartModalOpen} onOpenChange={handleToggleAddModal}>
          <DialogContent
            className="add-new-address-modal gap-0 p-0 md:!max-w-2xl"
            ref={wrapperRef}
          >
            <AddToRfqForm
              onClose={() => {
                setIsAddToCartModalOpen(false);
                setSelectedProductId(undefined);
              }}
              selectedProductId={selectedProductId}
            />
          </DialogContent>
        </Dialog>
      </section>
      <Footer />
    </>
  );
};

export default RfqPage;
