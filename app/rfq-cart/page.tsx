"use client";
import { useAllUserAddress } from "@/apis/queries/address.queries";
import {
  useAddRfqQuotes,
  useDeleteRfqCartItem,
  useRfqCartListByUserId,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import {
  useAllCountries,
  useFetchStatesByCountry,
  useFetchCitiesByState,
} from "@/apis/queries/masters.queries";
import { useMe } from "@/apis/queries/user.queries";
import RfqProductCard from "@/components/modules/rfqCart/RfqProductCard";
import ControlledDatePicker from "@/components/shared/Forms/ControlledDatePicker";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AddressItem } from "@/utils/types/address.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineChevronLeft } from "react-icons/md";
import { z } from "zod";
import BannerImage from "@/public/images/rfq-sec-bg.png";
import Footer from "@/components/shared/Footer";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

const formSchema = (t: any) => {
  return z.object({
    countryId: z
      .string()
      .trim()
      .min(1, { message: t("country_required") }),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    rfqDate: z
      .date({ required_error: "" })
      .optional()
      .nullable()
      .transform((val) => (val ? val.toISOString() : null)),
  });
};

const RfqCartPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      countryId: "",
      stateId: "",
      cityId: "",
      rfqDate: undefined as unknown as string,
    },
  });

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const me = useMe();
  const allCountriesQuery = useAllCountries();
  const fetchStatesByCountry = useFetchStatesByCountry();
  const fetchCitiesByState = useFetchCitiesByState();
  const rfqCartListByUser = useRfqCartListByUserId({
    page: 1,
    limit: 20,
  });
  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();
  const deleteRfqCartItem = useDeleteRfqCartItem();
  const addQuotes = useAddRfqQuotes();

  const memoizedCountryList = useMemo(() => {
    return (
      allCountriesQuery.data?.data?.map((item: any) => ({
        label: item.name,
        value: item.id.toString(),
      })) || []
    );
  }, [allCountriesQuery.data?.data]);

  const memoizedStateList = useMemo(() => {
    return (
      states?.map((item: any) => ({
        label: item.name,
        value: item.id.toString(),
      })) || []
    );
  }, [states]);

  const memoizedCityList = useMemo(() => {
    return (
      cities?.map((item: any) => ({
        label: item.name,
        value: item.id.toString(),
      })) || []
    );
  }, [cities]);

  const memoizedRfqCartList = useMemo(() => {
    if (rfqCartListByUser.data?.data) {
      return rfqCartListByUser.data?.data || [];
    }
    return [];
  }, [rfqCartListByUser.data?.data]);

  // Handle country selection
  const handleCountryChange = async (countryId: string) => {
    form.setValue("countryId", countryId);
    form.setValue("stateId", "");
    form.setValue("cityId", "");
    setStates([]);
    setCities([]);

    if (countryId) {
      const response = await fetchStatesByCountry.mutateAsync({
        countryId: parseInt(countryId),
      });
      if (response.status && response.data) {
        setStates(response.data);
      }
    }
  };

  // Handle state selection
  const handleStateChange = async (stateId: string) => {
    form.setValue("stateId", stateId);
    form.setValue("cityId", "");
    setCities([]);

    if (stateId) {
      const response = await fetchCitiesByState.mutateAsync({
        stateId: parseInt(stateId),
      });
      if (response.status && response.data) {
        setCities(response.data);
      }
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

  const handleRemoveItemFromRfqCart = async (rfqCartId: number) => {
    const response = await deleteRfqCartItem.mutateAsync({ rfqCartId });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    }
  };

  const onSubmit = async (formData: any) => {
    const updatedFormData = {
      firstName: me.data?.data?.firstName || "",
      lastName: me.data?.data?.lastName || "",
      phoneNumber: me.data?.data?.phoneNumber || "",
      cc: me.data?.data?.cc || "",
      address: "", // Keep for backward compatibility
      city: "", // Keep for backward compatibility
      province: "", // Keep for backward compatibility
      postCode: "", // Keep for backward compatibility
      country: "", // Keep for backward compatibility
      countryId: formData.countryId,
      stateId: formData.stateId || undefined,
      cityId: formData.cityId || undefined,
      rfqCartIds: memoizedRfqCartList.map((item: any) => item.id),
      rfqDate: formData.rfqDate || undefined,
    };

    const response = await addQuotes.mutateAsync(updatedFormData);
    if (response.status) {
      toast({
        title: t("rfq_submitted_successfully"),
        description: t("vendors_will_respond_via_messages"),
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user", { page: 1, limit: 20 }],
      });
      form.reset();
      router.push("/rfq-quotes");
    } else {
      toast({
        title: t("something_went_wrong"),
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <section className="rfq_section">
        <div className="sec-bg relative">
          <Image src={BannerImage} alt="background-banner" fill />
        </div>
        <div className="container mx-auto px-3">
          <div className="rfq-cart-wrapper">
            <div className="headerPart">
              <button
                type="button"
                className="back-btn"
                onClick={() => router.back()}
              >
                <MdOutlineChevronLeft />
              </button>
              <h3 dir={langDir} translate="no">
                {t("rfq_cart_items")}
              </h3>
            </div>
            <div className="bodyPart">
              <div className="add-delivery-card">
                <h3 dir={langDir} translate="no">
                  {t("select_location")}
                </h3>
                <p
                  className="mb-3 text-sm text-gray-600"
                  dir={langDir}
                  translate="no"
                >
                  {t("location_helps_find_vendors")}
                </p>
                <Form {...form}>
                  <form className="grid grid-cols-1 gap-5 bg-white! p-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <ControlledSelectInput
                        label={t("country") + " *"}
                        name="countryId"
                        options={memoizedCountryList}
                        placeholder={t("select_country")}
                        onChange={(e: any) =>
                          handleCountryChange(e.target.value)
                        }
                      />
                    </div>

                    <ControlledSelectInput
                      label={t("state") + ` (${t("optional")})`}
                      name="stateId"
                      options={memoizedStateList}
                      placeholder={t("select_state")}
                      onChange={(e: any) => handleStateChange(e.target.value)}
                      disabled={
                        !form.watch("countryId") ||
                        memoizedStateList.length === 0
                      }
                    />

                    <ControlledSelectInput
                      label={t("city") + ` (${t("optional")})`}
                      name="cityId"
                      options={memoizedCityList}
                      placeholder={t("select_city")}
                      disabled={
                        !form.watch("stateId") || memoizedCityList.length === 0
                      }
                    />

                    <div className="md:col-span-2">
                      <Label dir={langDir} translate="no">
                        {t("delivery_date")} ({t("optional")})
                      </Label>
                      <ControlledDatePicker
                        name="rfqDate"
                        isFuture
                        placeholder={t("enter_date")}
                      />
                    </div>
                  </form>
                </Form>
              </div>

              <div className="rfq-cart-item-lists">
                <h4 dir={langDir} translate="no">
                  {t("rfq_cart_items")}
                </h4>
                <div className="rfq-cart-item-ul">
                  {memoizedRfqCartList.map((item: any) => (
                    <RfqProductCard
                      key={item?.id}
                      id={item?.id}
                      rfqProductId={item?.productId}
                      productName={item?.rfqCart_productDetails?.productName}
                      productQuantity={item.quantity}
                      productImages={
                        item?.rfqCart_productDetails?.productImages
                      }
                      offerPriceFrom={item?.offerPriceFrom}
                      offerPriceTo={item?.offerPriceTo}
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveItemFromRfqCart}
                      note={item?.note}
                    />
                  ))}

                  {!memoizedRfqCartList.length ? (
                    <div className="my-10 text-center">
                      <h4 dir={langDir} translate="no">
                        {t("no_cart_items")}
                      </h4>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="submit-action">
                <Button
                  disabled={!memoizedRfqCartList.length || addQuotes.isPending}
                  className="theme-primary-btn submit-btn"
                  onClick={form.handleSubmit(onSubmit)}
                  translate="no"
                >
                  {addQuotes.isPending ? (
                    <>
                      <Image
                        src="/images/load.png"
                        alt="loader-icon"
                        width={20}
                        height={20}
                        className="mr-2 animate-spin"
                      />
                      {t("please_wait")}
                    </>
                  ) : (
                    t("request_for_rfq")
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RfqCartPage;
