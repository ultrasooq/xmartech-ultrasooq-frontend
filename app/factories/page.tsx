"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import {
  useAddCustomizeProduct,
  useFactoriesProducts,
  useUpdateFactoriesCartWithLogin,
} from "@/apis/queries/rfq.queries";
import Pagination from "@/components/shared/Pagination";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import RfqProductTable from "@/components/modules/rfq/RfqProductTable";
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
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { useAddToWishList, useDeleteFromWishList } from "@/apis/queries/wishlist.queries";
import { useTranslations } from "next-intl";

const addFormSchema = z.object({
  price: z.coerce
    .number()
    .max(1000000, {
      message: "Offer price must be less than 1000000",
    })
    .optional(),
  note: z
    .string()
    .trim()
    .max(100, {
      message: "Description must be less than 100 characters",
    })
    .optional(),
});

const FactoriesPage = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [searchRfqTerm, setSearchRfqTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [isAddToFactoryModalOpen, setIsAddToFactoryModalOpen] = useState(false);
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [cartList, setCartList] = useState<any[]>([]);
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();

  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});

  const handleToggleAddModal = () => setIsAddToFactoryModalOpen(!isAddToFactoryModalOpen);

  const me = useMe(haveAccessToken);
  const rfqProductsQuery = useFactoriesProducts({
    page,
    limit,
    term: searchRfqTerm,
    adminId: me?.data?.data?.id || undefined,
    sortType: sortBy,
  });
  const addCustomizeProduct = useAddCustomizeProduct();
  const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();

  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: { note: "", price: 0 },
  });

  const handleRfqDebounce = debounce((event: any) => {
    setSearchRfqTerm(event.target.value);
  }, 1000);

  const handleAddToFactories = async (productId: number) => {
    setSelectedProductId(productId);
    handleToggleAddModal();
  };

  const addToFactories = async (formData: any) => {console.log(formData);
    try {
      const response = await addCustomizeProduct.mutateAsync({
        productId: Number(selectedProductId),
        note: formData.note,
        price: Number(formData.price) || 0
      });
  
      if (response.status) {
        handleToggleAddModal();
        toast({
          title: `Item Added`,
          description: "Item added successfully",
          variant: "success",
        });

        // Refetch the listing API after a successful response
        queryClient.invalidateQueries({ queryKey: ["factoriesProducts"], exact: false });

        const resp = await updateFactoriesCartWithLogin.mutateAsync({
          productId: Number(selectedProductId),
          customizeProductId: response?.data?.id,
          quantity: 1
        })

        if (resp.status) {
          toast({
            title: "Item added to cart",
            description: "Check your cart for more details",
            variant: "success",
          });
        } else {
          toast({
            title: "Oops! Something went wrong",
            description: response.message,
            variant: "danger",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  }

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
  }, [
    rfqProductsQuery.data?.data,
  ]);

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
          "factoriesProducts",
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
          "factoriesProducts",
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
    if (isClickedOutside) {
      setSelectedProductId(undefined);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    if (accessToken) {
      setHaveAccessToken(true);
    } else {
      setHaveAccessToken(false);
    }
  }, [accessToken]);

  return (
    <>
      <title>{t("rfq")} | Ultrasooq</title>
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
                      placeholder={t("search_product")}
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
                </div>
                <div className="product_section product_gray_n_box">
                  <div className="row">
                    <div className="col-lg-12 products_sec_wrap">
                      <div className="products_sec_top">
                        <div className="products_sec_top_left">
                          <h4>{t("trending_n_high_rate_product")}</h4>
                        </div>
                        <div className="products_sec_top_right">
                          <div className="trending_filter">
                            <Select
                              onValueChange={(e: any) => setSortBy(e)}
                              defaultValue={sortBy}
                            >
                              <SelectTrigger className="custom-form-control-s1 bg-white">
                                <SelectValue placeholder={t("sort_by")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="newest">
                                    {t("sort_by_latest")}
                                  </SelectItem>
                                  <SelectItem value="oldest">
                                    {t("sort_by_oldest")}
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
                            <SkeletonProductCardLoader key={index} />
                          ))}
                        </div>
                      ) : null}

                      {!rfqProductsQuery?.data?.data?.length &&
                      !rfqProductsQuery.isLoading ? (
                        <p className="my-10 text-center text-sm font-medium">
                          {t("no_data_found")}
                        </p>
                      ) : null}

                      {viewType === "grid" ? (
                        <div className="product_sec_list">
                          {memoizedRfqProducts.map((item: any) => (
                            <FactoriesProductCard
                              key={item.id}
                              id={item.id}
                              productType={item?.productType || "-"}
                              productName={item?.productName || "-"}
                              productNote={item?.productNote || "-"}
                              productStatus={item?.status}
                              productImages={item?.productImages}
                              productQuantity={cartList.find((el: any) => el.productId == item.id)?.quantity || 0}
                              customizeProductId={cartList.find((el: any) => el.productId == item.id)?.customizeProductId}
                              onAdd={() => handleAddToFactories(item?.id)}
                              onToCart={handleCartPage}
                              onWishlist={() => handleAddToWishlist(item.id, item?.product_wishlist)}
                              isCreatedByMe={item?.userId === me.data?.data?.id}
                              isAddedToCart={item?.isAddedToCart}
                              inWishlist={
                                item?.product_wishlist?.find(
                                  (el: any) => el?.userId === me.data?.data?.id,
                                )
                              }
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

                      {rfqProductsQuery.data?.totalCount > 8 ? (
                        <Pagination
                          page={page}
                          setPage={setPage}
                          totalCount={rfqProductsQuery.data?.totalCount}
                          limit={limit}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <FactoryCartMenu
                onInitCart={setCartList}
                haveAccessToken={haveAccessToken}
              />
            </div>
          </div>
        </div>

        {/* add to factories modal */}
        <Dialog open={isAddToFactoryModalOpen} onOpenChange={handleToggleAddModal}>
          <DialogContent
            className="add-new-address-modal gap-0 p-0 md:!max-w-2xl"
            ref={wrapperRef}
          >
            <div className="modal-header !justify-between">
              <DialogTitle className="text-center text-xl font-bold">
                {t("add_to_factories")}
              </DialogTitle>
              <Button
                onClick={handleToggleAddModal}
                className="absolute right-2 top-2 z-10 !bg-white !text-black shadow-none"
              >
                <IoCloseSharp size={20} />
              </Button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addToFactories)}
                className="card-item card-payment-form px-5 pb-5 pt-3"
              >
                <ControlledTextareaInput
                  label={t("write_a_note")}
                  name="note"
                  placeholder=""
                  rows={6}
                />

                <ControlledTextInput
                  label={t("price")}
                  name="price"
                  placeholder={t("price")}
                  type="number"
                />
                
                <Button
                  disabled={addCustomizeProduct.isPending || updateFactoriesCartWithLogin.isPending}
                  type="submit"
                  className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
                >
                  {addCustomizeProduct.isPending || updateFactoriesCartWithLogin.isPending ? (
                    <LoaderWithMessage message={t("please_wait")} />
                  ) : t("add")}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

      </section>
      <Footer />
    </>
  );
};

export default FactoriesPage;
