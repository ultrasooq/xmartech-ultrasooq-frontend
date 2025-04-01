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
import { useCartListByUserId, useUpdateCartWithLogin } from "@/apis/queries/cart.queries";
import BrandFilterList from "@/components/modules/rfq/BrandFilterList";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const addFormSchema = (t: any) => {
  return z.object({
    fromPrice: z.coerce
      .number({ invalid_type_error: t("from_price_required") })
      .min(1, {
        message: t("from_price_required")
      })
      .max(1000000, {
        message: t("from_price_must_be_less_than_price", { price: 1000000 }),
      }),
    toPrice: z.coerce
      .number({ invalid_type_error: t("to_price_required") })
      .min(1, {
        message: t("to_price_required")
      })
      .max(1000000, {
        message: t("to_price_must_be_less_than_price", { price: 1000000 }),
      }),
    note: z
      .string()
      .trim()
      .max(100, {
        message: t("description_must_be_less_than_n_chars", { n: 100 }),
      })
      .optional(),
  }).refine(
    ({ fromPrice, toPrice }) => {
      return Number(fromPrice) < Number(toPrice);
    },
    {
      message: t("from_price_must_be_less_than_to_price"),
      path: ["fromPrice"],
    }
  )
};

const FactoriesPage = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const wrapperRef = useRef(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [searchRfqTerm, setSearchRfqTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectAllBrands, setSelectAllBrands] = useState<boolean>(false);
  const [displayMyProducts, setDisplayMyProducts] = useState('0');
  const [haveAccessToken, setHaveAccessToken] = useState(false);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [cartList, setCartList] = useState<any[]>([]);
  const [factoriesCartList, setFactoriesCartList] = useState<any[]>([]);
  const addToWishlist = useAddToWishList();
  const deleteFromWishlist = useDeleteFromWishList();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isAddToFactoryModalOpen, setIsAddToFactoryModalOpen] = useState(false);
  const [selectedCustomizedProduct, setSelectedCustomizedProduct] = useState<{ [key: string]: any }>();

  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => { });
  const handleToggleAddModal = () => setIsAddToFactoryModalOpen(!isAddToFactoryModalOpen);

  const me = useMe(haveAccessToken);
  const factoriesProductsQuery = useFactoriesProducts({
    page,
    limit,
    term: searchRfqTerm,
    adminId: me?.data?.data?.id || undefined,
    sortType: sortBy,
    brandIds: selectedBrandIds.join(','),
    isOwner: displayMyProducts == '1' ? 'me' : ''
  });
  const cartListByUser = useCartListByUserId(
    {
      page: 1,
      limit: 100,
    },
    haveAccessToken,
  );
  const addCustomizeProduct = useAddCustomizeProduct();
  const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();

  const form = useForm({
    resolver: zodResolver(addFormSchema(t)),
    defaultValues: { note: "" },
  });

  const handleRfqDebounce = debounce((event: any) => {
    setSearchRfqTerm(event.target.value);
  }, 1000);

  const handleAddToFactories = (productId: number) => {
    const item = factoriesCartList.find((el: any) => el.productId == productId)
    setSelectedCustomizedProduct({
      id: productId,
      customizedProductId: item?.customizeProductId,
      quantity: item?.quantity,
      fromPrice: item?.customizeProductDetail?.fromPrice,
      toPrice: item?.customizeProductDetail?.toPrice,
      note: item?.customizeProductDetail?.note
    });
    handleToggleAddModal();
  };

  const addToFactories = async (formData: any) => {
    try {
      if (!selectedCustomizedProduct?.customizedProductId) {
        const response = await addCustomizeProduct.mutateAsync({
          productId: Number(selectedCustomizedProduct?.id),
          note: formData.note,
          fromPrice: Number(formData.fromPrice) || 0,
          toPrice: Number(formData.toPrice) || 0
        });

        if (response.status) {
          handleToggleAddModal();
          toast({
            title: t("item_added"),
            description: t("item_added_successfully"),
            variant: "success",
          });

          // Refetch the listing API after a successful response
          queryClient.invalidateQueries({ queryKey: ["factoriesProducts"], exact: false });

          const resp = await updateFactoriesCartWithLogin.mutateAsync({
            productId: Number(selectedCustomizedProduct?.id),
            customizeProductId: response?.data?.id,
            quantity: 1
          })

          if (resp.status) {
            toast({
              title: t("item_added_to_cart"),
              description: t("check_your_cart_for_more_details"),
              variant: "success",
            });
          } else {
            toast({
              title: t("something_went_wrong"),
              description: response.message,
              variant: "danger",
            });
          }
        }
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("failed_to_add_item"),
        variant: "destructive",
      });
    }
  }

  const memoizedRfqProducts = useMemo(() => {
    if (factoriesProductsQuery.data?.data) {
      return (
        factoriesProductsQuery.data?.data.map((item: any) => {
          return {
            ...item,
            isAddedToFactoryCart: item?.product_rfqCart?.length && item?.product_rfqCart[0]?.quantity > 0,
            factoryCartQuantity: item?.product_rfqCart?.length ? item.product_rfqCart[0].quantity : 0,
          };
        }) || []
      );
    } else {
      return [];
    }
  }, [
    factoriesProductsQuery.data?.data,
  ]);

  useEffect(() => {
    if (cartListByUser.data?.data) {
      setCartList((cartListByUser.data?.data || []).map((item: any) => item));
    }
  }, [cartListByUser.data?.data]);

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
          "factoriesProducts",
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
          "factoriesProducts",
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
    setSearchRfqTerm('');
    setSelectedBrandIds([]);
    setDisplayMyProducts('0');

    if (searchInputRef?.current) searchInputRef.current.value = '';
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
      <title>{t("rfq")} | Ultrasooq</title>
      <section className="rfq_section">
        <div className="sec-bg relative">
          <Image src={BannerImage} alt="background-banner" fill />
        </div>
        <div className="rfq-container px-3">
          <div className="row">
            <div className="rfq_main_box !justify-center">
              <div className="rfq_left">
                <div className="all_select_button">
                  <button type="button" onClick={selectAll}>{t("select_all")}</button>
                  <button type="button" onClick={clearFilter}>{t("clean_select")}</button>
                </div>
                <BrandFilterList
                  selectAllBrands={selectAllBrands}
                  onSelectBrands={(brandIds: number[]) => setSelectedBrandIds(brandIds)}
                />
              </div>
              <div className="rfq_middle">
                <div className="rfq_middle_top">
                  <div className="rfq_search">
                    <input
                      type="search"
                      className="form-control"
                      placeholder={t("search_product")}
                      onChange={handleRfqDebounce}
                      ref={searchInputRef}
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
                          <RadioGroup
                            className="flex flex-col gap-y-3"
                            value={displayMyProducts}
                            onValueChange={setDisplayMyProducts}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="0" id="all_products" checked={displayMyProducts == '0'} />
                              <Label htmlFor="all_products" className="text-base">
                                {t("all_products")}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="my_products" checked={displayMyProducts == '1'} />
                              <Label htmlFor="my_products" className="text-base">
                                {t("my_products")}
                              </Label>
                            </div>
                          </RadioGroup>
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

                      {factoriesProductsQuery.isLoading && viewType === "grid" ? (
                        <div className="mt-5 grid grid-cols-4 gap-5">
                          {Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonProductCardLoader key={index} />
                          ))}
                        </div>
                      ) : null}

                      {!factoriesProductsQuery?.data?.data?.length &&
                        !factoriesProductsQuery.isLoading ? (
                        <p className="my-10 text-center text-sm font-medium">
                          {t("no_data_found")}
                        </p>
                      ) : null}

                      {viewType === "grid" ? (
                        <div className="product_sec_list">
                          {memoizedRfqProducts.map((item: any) => {
                            return (
                              <FactoriesProductCard
                                key={item.id}
                                id={item.id}
                                productType={item?.productType || "-"}
                                productName={item?.productName || "-"}
                                productNote={item?.productNote || "-"}
                                productStatus={item?.status}
                                productImages={item?.productImages}
                                productQuantity={cartList.find((el: any) => el.productId == item.id)?.quantity || 0}
                                customizeProductId={factoriesCartList.find((el: any) => el.productId == item.id)?.customizeProductId}
                                onAdd={() => handleAddToFactories(item.id)}
                                onWishlist={() => handleAddToWishlist(item.id, item?.product_wishlist)}
                                isCreatedByMe={item?.userId === me.data?.data?.id}
                                isAddedToCart={cartList.find((el: any) => el.productId == item.id) ? true : false}
                                isAddedToFactoryCart={factoriesCartList.find((el: any) => el.productId == item.id) ? true : false}
                                inWishlist={
                                  item?.product_wishlist?.find(
                                    (el: any) => el?.userId === me.data?.data?.id,
                                  )
                                }
                                haveAccessToken={haveAccessToken}
                                productPrices={item?.product_productPrice}
                              />
                            )
                          })}
                        </div>
                      ) : null}

                      {viewType === "list" &&
                        factoriesProductsQuery?.data?.data?.length ? (
                        <div className="product_sec_list">
                          <RfqProductTable
                            list={factoriesProductsQuery?.data?.data}
                          />
                        </div>
                      ) : null}

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
                </div>
              </div>
              <FactoryCartMenu
                onInitCart={setFactoriesCartList}
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

                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                  <ControlledTextInput
                    label={t("from_price")}
                    name="fromPrice"
                    placeholder={t("from_price")}
                    type="number"
                  />

                  <ControlledTextInput
                    label={t("to_price")}
                    name="toPrice"
                    placeholder={t("to_price")}
                    type="number"
                  />
                </div>

                <Button
                  disabled={addCustomizeProduct.isPending || updateFactoriesCartWithLogin.isPending}
                  type="submit"
                  className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 mt-2"
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
