import React, { useEffect, useMemo, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ReactSelect, { MultiValue } from "react-select";
import { Label } from "@/components/ui/label";
import CounterTextInputField from "./CounterTextInputField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CONSUMER_TYPE_LIST, SELL_TYPE_LIST } from "@/utils/constants";
import {
  IAllCountries,
  ICity,
  ICountries,
  ILocations,
  IOption,
  IState,
} from "@/utils/types/common.types";
import {
  useCountries,
  useLocation,
  useAllCountries,
  useFetchStatesByCountry,
  useFetchCitiesByState,
} from "@/apis/queries/masters.queries";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import ControlledDatePicker from "@/components/shared/Forms/ControlledDatePicker";
import ControlledTimePicker from "@/components/shared/Forms/ControlledTimePicker";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

interface Option {
  readonly label: string;
  readonly value: string;
}

interface OptionType {
  label: string;
  value: string | number;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 48,
    minHeight: 48,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 20,
  }),
};

type PriceSectionProps = {
  activeProductType?: string;
};

const PriceSection: React.FC<PriceSectionProps> = ({ activeProductType }) => {
  const t = useTranslations();
  const { langDir, currency } = useAuth();
  const formContext = useFormContext();
  const searchParams = useSearchParams();

  const countriesQuery = useCountries();
  const locationsQuery = useLocation();
  const countriesNewQuery = useAllCountries();

  const watchSetUpPrice = formContext.watch("setUpPrice");
  const watchIsOfferPriceRequired = formContext.watch("isOfferPriceRequired");
  const watchIsStockRequired = formContext.watch("isStockRequired");

  const watchDateOpen = formContext.watch("productPriceList.[0].dateOpen"); // Watch the Time Open value

  //   const watchStartTime = formContext.watch("productPriceList.[0].startTime");
  // const watchEndTime = formContext.watch("productPriceList.[0].endTime");

  // console.log("Start Time:", watchStartTime); // ✅ This should update dynamically

  // console.log("Form Values price:", formContext.getValues());

  const watchConsumerType = formContext.watch(
    "productPriceList.[0].consumerType",
  );
  const watchSellType = formContext.watch("productPriceList.[0].sellType");
  const watchConsumerDiscount = formContext.watch(
    "productPriceList.[0].consumerDiscount",
  );
  const watchVendorDiscount = formContext.watch(
    "productPriceList.[0].vendorDiscount",
  );

  const watchProductCountryId = formContext.watch("productCountryId");
  const watchProductStateId = formContext.watch("productStateId");

  const watchSellCountryIds = formContext.watch("sellCountryIds");
  const watchSellStateIds = formContext.watch("sellStateIds");
  const watchSellCityIds = formContext.watch("sellCityIds");

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [states, setStates] = useState<IOption[]>([]);
  const [cities, setCities] = useState<IOption[]>([]);
  const fetchStatesByCountry = useFetchStatesByCountry();
  const fetchCitiesByState = useFetchCitiesByState();

  // For multiple selction country, state, city
  const [selectedCountries, setSelectedCountries] = useState<OptionType[]>([]);
  const [statesByCountry, setStatesByCountry] = useState<
    Record<string, OptionType[]>
  >({});
  const [citiesByState, setCitiesByState] = useState<
    Record<string, OptionType[]>
  >({});

  const [selectedStates, setSelectedStates] = useState<OptionType[]>([]);
  const [selectedCities, setSelectedCities] = useState<OptionType[]>([]);

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesQuery?.data?.data?.length]);

  const memoizedLocations = useMemo(() => {
    return (
      locationsQuery?.data?.data.map((item: ILocations) => {
        return { label: item.locationName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsQuery?.data?.data?.length]);

  const memoizedAllCountries = useMemo(() => {
    return (
      countriesNewQuery?.data?.data.map((item: IAllCountries) => {
        return { label: item.name, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesNewQuery?.data?.data?.length]);

  // Fetch States When Country is Selected

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    } else {
      setStates([]);
      setSelectedState(null);
    }
  }, [selectedCountry]);

  const fetchStates = async (countryId: number) => {
    try {
      const response = await fetchStatesByCountry.mutateAsync({ countryId }); // Call your API
      setStates(
        response.data.map((state: IState) => ({
          label: state.name,
          value: state.id,
        })),
      );
    } catch (error) {
    }
  };

  // Fetch Cities When State is Selected

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  useEffect(() => {
    let ipInfo = JSON.parse(window.localStorage.ipInfo ?? "{}");
    if (ipInfo.country_name) {
      let country = countriesQuery?.data?.data?.find(
        (item: any) =>
          item.countryName.toLowerCase() == ipInfo.country_name.toLowerCase(),
      );
      formContext.setValue("placeOfOriginId", country?.id);
    }
  }, [countriesQuery?.data?.data]);

  useEffect(() => {
    let ipInfo = JSON.parse(window.localStorage.ipInfo ?? "{}");
    if (ipInfo.country_name) {
      let country = countriesNewQuery?.data?.data?.find(
        (item: any) =>
          item.name.toLowerCase() == ipInfo.country_name.toLowerCase(),
      );
      if (activeProductType != "R") {
        formContext.setValue("productCountryId", country?.id);
        setSelectedCountry(country?.id);
      }
      if (country?.id) {
        formContext.setValue("sellCountryIds", [
          {
            label: country.name,
            value: country.id,
          },
        ]);
        setSelectedCountries([
          {
            label: country.name,
            value: country.id,
          },
        ]);
      }
    }
  }, [countriesNewQuery?.data?.data]);

  useEffect(() => {
    setSelectedCountry(watchProductCountryId);
  }, [watchProductCountryId]);

  useEffect(() => {
    setSelectedState(watchProductStateId);
  }, [watchProductStateId]);

  useEffect(() => {
    setSelectedCountries([...watchSellCountryIds]);
  }, [watchSellCountryIds]);

  useEffect(() => {
    setSelectedStates([...watchSellStateIds]);
  }, [watchSellStateIds]);

  useEffect(() => {
    setSelectedCities([...watchSellCityIds]);
  }, [watchSellCityIds]);

  const fetchCities = async (stateId: number) => {
    try {
      const response = await fetchCitiesByState.mutateAsync({ stateId }); // ✅ Pass as an object
      setCities(
        response.data.map((city: ICity) => ({
          label: city.name,
          value: city.id,
        })),
      );
    } catch (error) {
    }
  };

  // {/* For latitude and longitude */}

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const latLng = `${latitude}, ${longitude}`;

          // console.log(latLng); // Logs correct lat/lng values

          setValue("productLatLng", latLng); // ✅ Update form state
        },
        (error) => {
          // Silently handle geolocation errors
          try {
            let ipInfo = JSON.parse(
              window.localStorage.getItem("ipInfo") || "{}",
            );
            if (ipInfo.latitude && ipInfo.longitude) {
              setValue(
                "productLatLng",
                `${ipInfo.latitude}, ${ipInfo.longitude}`,
              );
            }
          } catch (parseError) {
            // Silently handle JSON parse errors
          }
        },
      );
    } else {
    }
  }); // ✅ Add setValue as dependency

  // Whenever selectedCountries change, fetch states for all selected countries.

  useEffect(() => {
    if (selectedCountries.length > 0) {
      const fetchStates = async () => {
        const statesData: Record<string, OptionType[]> = {};

        try {
          const responses = await Promise.all(
            selectedCountries.map(async (country) => {
              const response = await fetchStatesByCountry.mutateAsync({
                countryId: Number(country.value),
              });
              return { countryId: country.value, data: response.data };
            }),
          );

          responses.forEach(({ countryId, data }) => {
            statesData[countryId] = data.map((state: any) => ({
              label: state.name,
              value: state.id,
            }));
          });

          setStatesByCountry(statesData);
        } catch (error) {
        }
      };

      fetchStates();
    }
  }, [selectedCountries]);

  // Fetch Cities When States Change

  useEffect(() => {
    if (selectedStates.length > 0) {
      const fetchCities = async () => {
        const citiesData: Record<string, OptionType[]> = {};

        try {
          const responses = await Promise.all(
            selectedStates.map(async (state) => {
              const response = await fetchCitiesByState.mutateAsync({
                stateId: Number(state.value),
              });
              return { stateId: state.value, data: response.data };
            }),
          );

          responses.forEach(({ stateId, data }) => {
            citiesData[stateId] = data.map((city: any) => ({
              label: city.name,
              value: city.id,
            }));
          });

          setCitiesByState(citiesData);
        } catch (error) {
        }
      };

      fetchCities();
    }
  }, [selectedStates]);

  const errors = formContext.formState.errors;

  const consumerTypeMessage =
    errors && typeof errors["0"] === "object" && "consumerType" in errors["0"]
      ? errors["0"].consumerType?.message
      : undefined;

  const sellTypeMessage =
    errors && typeof errors["0"] === "object" && "sellType" in errors["0"]
      ? errors["0"].sellType?.message
      : undefined;

  const minCustomerMessage =
    errors && typeof errors["0"] === "object" && "minCustomer" in errors["0"]
      ? errors["0"].minCustomer?.message
      : undefined;

  const maxCustomerMessage =
    errors && typeof errors["0"] === "object" && "maxCustomer" in errors["0"]
      ? errors["0"].maxCustomer?.message
      : undefined;

  const minQuantityPerCustomerMessage =
    errors &&
    typeof errors["0"] === "object" &&
    "minQuantityPerCustomer" in errors["0"]
      ? errors["0"].minQuantityPerCustomer?.message
      : undefined;

  const maxQuantityPerCustomerMessage =
    errors &&
    typeof errors["0"] === "object" &&
    "maxQuantityPerCustomer" in errors["0"]
      ? errors["0"].maxQuantityPerCustomer?.message
      : undefined;

  const minQuantityMessage =
    errors && typeof errors["0"] === "object" && "minQuantity" in errors["0"]
      ? errors["0"].minQuantity?.message
      : undefined;

  const maxQuantityMessage =
    errors && typeof errors["0"] === "object" && "maxQuantity" in errors["0"]
      ? errors["0"].maxQuantity?.message
      : undefined;

  const timeOpenMessage =
    errors && typeof errors["0"] === "object" && "timeOpen" in errors["0"]
      ? errors["0"].timeOpen?.message
      : undefined;

  const timeCloseMessage =
    errors && typeof errors["0"] === "object" && "timeClose" in errors["0"]
      ? errors["0"].timeClose?.message
      : undefined;

  const deliveryAfterMessage =
    errors && typeof errors["0"] === "object" && "deliveryAfter" in errors["0"]
      ? errors["0"].deliveryAfter?.message
      : undefined;

  const vendorDiscountMessage =
    errors && typeof errors["0"] === "object" && "vendorDiscount" in errors["0"]
      ? errors["0"].vendorDiscount?.message
      : undefined;

  const consumerDiscountMessage =
    errors && typeof errors["0"] === "object" && "consumerDiscount" in errors["0"]
      ? errors["0"].consumerDiscount?.message
      : undefined;

  const { setValue } = formContext;

  useEffect(() => {
    if (watchSellType === "BUYGROUP") {
      setValue("isCustomProduct", false);
      setValue("isOfferPriceRequired", false);
      setValue("isStockRequired", false);
    }
    
    // No auto-set behavior - user can choose any consumer type
  }, [watchSellType, setValue]);

  const [localTime, setLocalTime] = useState<string>("");

  // Set the local time on component mount
  useEffect(() => {
    const currentLocalTime = format(new Date(), "MMMM dd, yyyy hh:mm a"); // Desired format
    setLocalTime(currentLocalTime); // Update local time state
  }, []);

  const sellTypes = () => {
    return Object.keys(SELL_TYPE_LIST).map((value: string, index: number) => {
      return {
        label: t(SELL_TYPE_LIST[index].label),
        value: SELL_TYPE_LIST[index].value,
      };
    });
  };

  const consumerTypes = () => {
    return Object.keys(CONSUMER_TYPE_LIST).map(
      (value: string, index: number) => {
        return {
          label: t(CONSUMER_TYPE_LIST[index].label),
          value: CONSUMER_TYPE_LIST[index].value,
        };
      },
    );
  };

  return (
    <div className="space-y-8">
      {/* Price Section Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <span className="text-orange-600 text-sm font-semibold">6</span>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            {t("price")}
          </h4>
          <p className="text-sm text-gray-600">
            {t("price_section_description")}
          </p>
        </div>
      </div>
      {activeProductType !== "R" ? (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <FormField
            control={formContext.control}
            name="setUpPrice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-2 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium text-gray-700" dir={langDir} translate="no">
                    {t("set_up_price")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      ) : null}

      {watchSetUpPrice ? (
        <>
          {activeProductType !== "R" ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <h5 className="text-md font-semibold text-gray-900">{t("pricing_options")}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {t("consumer_type")}
                  </Label>
                  <Controller
                    name="productPriceList.[0].consumerType"
                    control={formContext.control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        onChange={(newValue) => {
                          field.onChange(newValue?.value);
                        }}
                        options={consumerTypes()}
                        value={consumerTypes().find(
                          (item: Option) => item.value === field.value,
                        )}
                        styles={{
                          control: (base: any) => ({
                            ...base,
                            height: 48,
                            minHeight: 48,
                            borderRadius: '0.75rem',
                            borderColor: '#d1d5db',
                            boxShadow: 'none',
                            '&:hover': {
                              borderColor: '#f97316',
                            },
                            '&:focus-within': {
                              borderColor: '#f97316',
                              boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.2)',
                            },
                          }),
                          menu: (base: any) => ({
                            ...base,
                            zIndex: 20,
                            borderRadius: '0.75rem',
                          }),
                          option: (base: any, state: any) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#f97316' : state.isFocused ? '#fed7aa' : 'white',
                            color: state.isSelected ? 'white' : '#374151',
                          }),
                        }}
                        instanceId="productPriceList.[0].consumerType"
                        placeholder={t("select")}
                      />
                    )}
                  />
                  {!watchConsumerType && consumerTypeMessage ? (
                    <p className="text-sm text-red-500 flex items-center gap-1" dir={langDir}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {consumerTypeMessage.toString()}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {t("sell_type")}
                  </Label>
                  <Controller
                    name="productPriceList.[0].sellType"
                    control={formContext.control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        onChange={(newValue) => {
                          field.onChange(newValue?.value);
                        }}
                        options={sellTypes()}
                        value={sellTypes().find(
                          (item: Option) => item.value === field.value,
                        )}
                        styles={{
                          control: (base: any) => ({
                            ...base,
                            height: 48,
                            minHeight: 48,
                            borderRadius: '0.75rem',
                            borderColor: '#d1d5db',
                            boxShadow: 'none',
                            '&:hover': {
                              borderColor: '#f97316',
                            },
                            '&:focus-within': {
                              borderColor: '#f97316',
                              boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.2)',
                            },
                          }),
                          menu: (base: any) => ({
                            ...base,
                            zIndex: 20,
                            borderRadius: '0.75rem',
                          }),
                          option: (base: any, state: any) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#f97316' : state.isFocused ? '#fed7aa' : 'white',
                            color: state.isSelected ? 'white' : '#374151',
                          }),
                        }}
                        instanceId="productPriceList.[0].sellType"
                        placeholder={t("sell_type")}
                      />
                    )}
                  />

                  {!watchSellType && sellTypeMessage ? (
                    <p className="text-sm text-red-500 flex items-center gap-1" dir={langDir}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {sellTypeMessage.toString()}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {/* Discount Settings - Only show when consumer type and sell type are selected */}
          {watchConsumerType && watchSellType && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <h5 className="text-md font-semibold text-gray-900">{t("discount_settings")}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {watchConsumerType === "EVERYONE" ||
                watchConsumerType === "CONSUMER" ? (
                <>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {t("consumer_discount")}
                    </Label>
                    <CounterTextInputField
                      label={t("consumer_discount")}
                      name="productPriceList.[0].consumerDiscount"
                      placeholder={t("discount")}
                    />
                  </div>
                  {watchConsumerDiscount > 0 ? (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        {t("discount_type")}
                      </Label>
                      <Controller
                        name="productPriceList.[0].consumerDiscountType"
                        control={formContext.control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full h-12 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none cursor-pointer"
                          >
                            <option value="" dir={langDir}></option>
                            <option value="FLAT" dir={langDir}>
                              {t("flat").toUpperCase()}
                            </option>
                            <option value="PERCENTAGE" dir={langDir}>
                              {t("percentage").toUpperCase()}
                            </option>
                          </select>
                        )}
                      />
                    </div>
                  ) : null}
                </>
              ) : null}

              {watchConsumerType === "EVERYONE" ||
              watchConsumerType === "VENDORS" ? (
                <>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {t("vendor_discount")}
                    </Label>
                    <CounterTextInputField
                      label={t("vendor_discount")}
                      name="productPriceList.[0].vendorDiscount"
                      placeholder={t("discount")}
                    />
                  </div>
                  {watchVendorDiscount > 0 ? (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        {t("discount_type")}
                      </Label>
                      <Controller
                        name="productPriceList.[0].vendorDiscountType"
                        control={formContext.control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full h-12 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none cursor-pointer"
                          >
                            <option value="" dir={langDir}></option>
                            <option value="FLAT" dir={langDir} translate="no">
                              {t("flat").toUpperCase()}
                            </option>
                            <option
                              value="PERCENTAGE"
                              dir={langDir}
                              translate="no"
                            >
                              {t("percentage").toUpperCase()}
                            </option>
                          </select>
                        )}
                      />
                    </div>
                  ) : null}
                </>
              ) : null}
              </div>
            </div>
          )}

            {watchSellType === "BUYGROUP" ? (
              <>
                <div className="mb-4 w-full">
                  <label dir={langDir} translate="no">
                    {t("add_time")}
                  </label>
                  <Input
                    value={localTime} // Show the local time
                    readOnly // Make it read-only
                    className="theme-form-control-s1"
                    dir={langDir}
                  />
                </div>

                <CounterTextInputField
                  label={t("min_customer")}
                  name="productPriceList.[0].minCustomer"
                  placeholder={t("min")}
                  errorMessage={
                    minCustomerMessage
                      ? minCustomerMessage.toString()
                      : undefined
                  }
                />

                <CounterTextInputField
                  label={t("max_customer")}
                  name="productPriceList.[0].maxCustomer"
                  placeholder={t("max")}
                  errorMessage={
                    maxCustomerMessage
                      ? maxCustomerMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}

            {watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label={t("min_quantity")}
                  name="productPriceList.[0].minQuantity"
                  placeholder={t("min")}
                  errorMessage={
                    minQuantityMessage
                      ? minQuantityMessage.toString()
                      : undefined
                  }
                />

                <CounterTextInputField
                  label={t("max_quantity")}
                  name="productPriceList.[0].maxQuantity"
                  placeholder={t("max")}
                  errorMessage={
                    maxQuantityMessage
                      ? maxQuantityMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}

            {/* Trial Product Fields - Show for TRIAL_PRODUCT sell type with any consumer type */}
            {watchSellType === "TRIAL_PRODUCT" ? (
              <>
                <CounterTextInputField
                  label={t("max_quantity_per_customer")}
                  name="productPriceList.[0].maxQuantityPerCustomer"
                  placeholder={t("max")}
                  errorMessage={
                    maxQuantityPerCustomerMessage
                      ? maxQuantityPerCustomerMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}


            {/* Min/Max Quantity Per Customer - Show for NORMALSELL, BUYGROUP, or WHOLESALE_PRODUCT sell types */}
            {watchSellType === "NORMALSELL" || watchSellType === "BUYGROUP" || watchSellType === "WHOLESALE_PRODUCT" ? (
              <>
                <CounterTextInputField
                  label={t("min_quantity_per_customer")}
                  name="productPriceList.[0].minQuantityPerCustomer"
                  placeholder={t("min")}
                  errorMessage={
                    minQuantityPerCustomerMessage
                      ? minQuantityPerCustomerMessage.toString()
                      : undefined
                  }
                />

                <CounterTextInputField
                  label={t("max_quantity_per_customer")}
                  name="productPriceList.[0].maxQuantityPerCustomer"
                  placeholder={t("max")}
                  errorMessage={
                    maxQuantityPerCustomerMessage
                      ? maxQuantityPerCustomerMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}

            {/* Date and Time Section - Only show when consumer type and sell type are selected */}
            {watchConsumerType && watchSellType && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h5 className="text-md font-semibold text-gray-900">{t("availability_period")}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t("date_open")}
                  </Label>
                  <ControlledDatePicker
                    label={t("date_open")}
                    name="productPriceList.[0].dateOpen"
                    isFuture
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("time_open")}
                  </Label>
                  <ControlledTimePicker
                    label={t("time_open")}
                    name="productPriceList.[0].startTime"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t("date_close")}
                  </Label>
                  <ControlledDatePicker
                    label={t("date_close")}
                    name="productPriceList.[0].dateClose"
                    isFuture
                    minDate={watchDateOpen} // Pass timeOpen as minDate to disable past dates
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("time_close")}
                  </Label>
                  <ControlledTimePicker
                    label={t("time_close")}
                    name="productPriceList.[0].endTime"
                  />
                </div>
              </div>
            </div>
            )}

          {activeProductType !== "R" ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <h5 className="text-md font-semibold text-gray-900">{t("delivery_settings")}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {t("deliver_after")}
                  </Label>
                  <CounterTextInputField
                    label={t("deliver_after")}
                    name="productPriceList.[0].deliveryAfter"
                    placeholder={t("after")}
                    errorMessage={
                      deliveryAfterMessage
                        ? deliveryAfterMessage.toString()
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>
          ) : null}

          {activeProductType !== "R" &&
          watchSetUpPrice &&
          watchSellType !== "BUYGROUP" ? (
            <div className="mb-4 flex w-full flex-col items-start gap-5 md:flex-row md:items-center">
              <>
                <div className="flex flex-row items-center gap-x-3">
                  <Controller
                    name="isCustomProduct"
                    control={formContext.control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-dark-orange!"
                      />
                    )}
                  />
                  <Label dir={langDir} translate="no">
                    {t("customize_product")}
                  </Label>
                </div>

                {/* <div className="flex flex-row items-center gap-x-3">
                  <Controller
                    name="isOfferPriceRequired"
                    control={formContext.control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-dark-orange!"
                      />
                    )}
                  />
                  <Label dir={langDir} translate="no">
                    {t("ask_for_the_price")}
                  </Label>
                </div> */}

                {/* <div className="flex flex-row items-center gap-x-3">
                  <Controller
                    name="isStockRequired"
                    control={formContext.control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-dark-orange!"
                      />
                    )}
                  />
                  <Label dir={langDir} translate="no">
                    {t("ask_for_the_stock")}
                  </Label>
                </div> */}
              </>
            </div>
          ) : null}

          <div className="mb-4 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            {activeProductType !== "R" && !watchIsOfferPriceRequired ? (
              <FormField
                control={formContext.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel dir={langDir} translate="no">
                      {t("product_price")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute bottom-0 left-2 top-0 m-auto flex h-[34px] w-[32px] items-center justify-center bg-[#F6F6F6]!">
                          {currency.symbol}
                        </div>
                        <Input
                          type="number"
                          onWheel={(e) => e.currentTarget.blur()}
                          placeholder={t("product_price")}
                          className="h-[48px]! rounded border-gray-300 pl-12 pr-10 focus-visible:ring-0!"
                          disabled={watchIsOfferPriceRequired}
                          {...field}
                          dir={langDir}
                          translate="no"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {activeProductType === "R" && !watchIsOfferPriceRequired ? (
              <FormField
                control={formContext.control}
                name="offerPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel dir={langDir} translate="no">
                      {t("offer_price")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center bg-[#F6F6F6]!">
                          {currency.symbol}
                        </div>
                        <Input
                          type="number"
                          onWheel={(e) => e.currentTarget.blur()}
                          placeholder={t("offer_price")}
                          className="h-[48px]! rounded border-gray-300 pl-12 pr-10 focus-visible:ring-0!"
                          disabled={watchIsOfferPriceRequired}
                          {...field}
                          dir={langDir}
                          translate="no"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {activeProductType !== "R" && !watchIsStockRequired ? (
              <FormField
                control={formContext.control}
                name="productPriceList.[0].stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel dir={langDir} translate="no">
                      {t("stock")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()}
                        placeholder={t("stock")}
                        className="h-[48px]! rounded border-gray-300 focus-visible:ring-0!"
                        disabled={watchIsStockRequired}
                        {...field}
                        dir={langDir}
                        translate="no"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
          </div>
        </>
      ) : null}

      {activeProductType !== "R" ? (
        <h3
          className="text-base font-bold text-gray-900 mb-3"
          dir={langDir}
          translate="no"
        >
          Warehouse location
        </h3>
      ) : null}

      <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
        {activeProductType !== "R" ? (
          // <div className="mt-2 flex flex-col gap-y-3">
          //   <Label>Product Location</Label>
          //   <Controller
          //     name="productLocationId"
          //     control={formContext.control}
          //     render={({ field }) => (
          //       <ReactSelect
          //         {...field}
          //         onChange={(newValue) => {
          //           field.onChange(newValue?.value);
          //         }}
          //         options={memoizedLocations}
          //         value={memoizedLocations.find(
          //           (item: IOption) => item.value === field.value,
          //         )}
          //         styles={customStyles}
          //         instanceId="productLocationId"
          //       />
          //     )}
          //   />

          //   <p className="text-[13px] text-red-500" dir={langDir}>
          //     {
          //       formContext.formState.errors["productLocationId"]
          //         ?.message as string
          //     }
          //   </p>
          // </div>
          <>
            <div className="mt-2 flex flex-col gap-y-3">
              <Label dir={langDir} translate="no">
                {t("select_country")}
              </Label>
              <Controller
                name="productCountryId"
                control={formContext.control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    onChange={(newValue) => {
                      setSelectedState(null); // Reset state when country changes
                      setCities([]); // Clear cities when country changes
                      field.onChange(newValue?.value);
                    }}
                    options={memoizedAllCountries}
                    value={memoizedAllCountries.find(
                      (item: any) => item.value === field.value,
                    )}
                    styles={customStyles}
                    instanceId="productCountryId"
                    placeholder={t("select")}
                  />
                )}
              />
              <p className="text-[13px] text-red-500" dir={langDir}>
                {
                  formContext.formState.errors["productCountryId"]
                    ?.message as string
                }
              </p>
            </div>
            <div className="mt-2 flex flex-col gap-y-3">
              {/* State Dropdown - Visible only if country is selected */}
              {selectedCountry ? (
                <>
                  <Label dir={langDir} translate="no">
                    {t("select_state")}
                  </Label>
                  <Controller
                    name="productStateId"
                    control={formContext.control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        onChange={(newValue) => {
                          setCities([]); // Clear cities when state changes
                          field.onChange(newValue?.value);
                        }}
                        options={states}
                        value={states.find(
                          (item) => item.value === field.value,
                        )}
                        styles={customStyles}
                        instanceId="productStateId"
                        placeholder={t("select")}
                      />
                    )}
                  />
                  <p className="text-[13px] text-red-500" dir={langDir}>
                    {
                      formContext.formState.errors["productStateId"]
                        ?.message as string
                    }
                  </p>
                </>
              ) : null}
            </div>
            {/* City Dropdown - Visible only if state is selected */}
            {selectedState ? (
              <>
                <div className="mt-2 flex flex-col gap-y-3">
                  <Label dir={langDir} translate="no">
                    {t("select_city")}
                  </Label>
                  <Controller
                    name="productCityId"
                    control={formContext.control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        onChange={(newValue) => {
                          field.onChange(newValue?.value);
                        }}
                        options={cities}
                        value={cities.find(
                          (item) => item.value === field.value,
                        )}
                        styles={customStyles}
                        instanceId="productCityId"
                        placeholder={t("select")}
                      />
                    )}
                  />
                  <p className="text-[13px] text-red-500" dir={langDir}>
                    {
                      formContext.formState.errors["productCityId"]
                        ?.message as string
                    }
                  </p>
                </div>
                <div className="flex flex-col gap-y-3">
                  {/* For Location */}
                  {/* <label>Location</label> */}
                  <ControlledTextInput
                    name="productTown"
                    placeholder={t("enter_location")}
                    label={t("location")}
                    showLabel={true}
                    dir={langDir}
                    translate="no"
                  />
                </div>
                <div className="mt-2 flex flex-col gap-y-3">
                  {/* For latitude and longitude */}
                  {/* <label>Latitude and Longitude</label> */}
                  <Controller
                    name="productLatLng"
                    render={({ field }) => (
                      <ControlledTextInput
                        {...field}
                        placeholder={t("enter_lat_long")}
                        label={t("latitude_n_longitude")}
                        readOnly
                        dir={langDir}
                        translate="no"
                      />
                    )}
                  />
                </div>
              </>
            ) : null}
            <div className="mt-2 flex flex-col gap-y-3"></div>
          </>
        ) : null}
      </div>
      <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-1">
        <Label
          className="text-[16px] font-semibold"
          dir={langDir}
          translate="no"
        >
          {t("where_to_sell")}
        </Label>
      </div>
      <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
        <div className="mt-2 flex flex-col gap-y-3">
          <Label dir={langDir} translate="no">
            {t("select_multiple_country")}
          </Label>
          <Controller
            name="sellCountryIds"
            control={formContext.control}
            render={({ field }) => (
              <ReactSelect
                isMulti
                {...field} // ✅ Ensures value is controlled
                onChange={(newValues: MultiValue<OptionType>) => {
                  setSelectedCountries([...newValues]);
                  field.onChange(newValues);

                  // 🔥 Remove states that belong to the removed country
                  const updatedStates = selectedStates.filter((state) =>
                    newValues.some((country) =>
                      statesByCountry[country.value]?.some(
                        (s) => s.value === state.value,
                      ),
                    ),
                  );
                  setSelectedStates(updatedStates);
                  formContext.setValue("sellStateIds", updatedStates); // ✅ Sync with form state

                  // 🔥 Remove cities that belong to removed states
                  const updatedCities = selectedCities.filter((city) =>
                    updatedStates.some((state) =>
                      citiesByState[state.value]?.some(
                        (c) => c.value === city.value,
                      ),
                    ),
                  );
                  setSelectedCities(updatedCities);
                  formContext.setValue("sellCityIds", updatedCities); // ✅ Sync with form state
                }}
                options={memoizedAllCountries}
                value={selectedCountries}
                styles={customStyles}
                instanceId="sellCountryIds"
                placeholder={t("select")}
              />
            )}
          />
        </div>

        {/* Show States when at least one country is selected */}
        {selectedCountries.length > 0 ? (
          <div className="mt-2 flex flex-col gap-y-3">
            <Label dir={langDir} translate="no">
              {t("select_multiple_state")}
            </Label>
            <Controller
              name="sellStateIds"
              control={formContext.control}
              render={({ field }) => (
                <ReactSelect
                  isMulti
                  {...field} // ✅ Ensures value is controlled
                  onChange={(newValues: MultiValue<OptionType>) => {
                    setSelectedStates([...newValues]);
                    field.onChange(newValues);

                    // 🔥 Remove cities that belong to the removed state
                    const updatedCities = selectedCities.filter((city) =>
                      newValues.some((state) =>
                        citiesByState[state.value]?.some(
                          (c) => c.value === city.value,
                        ),
                      ),
                    );
                    setSelectedCities(updatedCities);
                    formContext.setValue("sellCityIds", updatedCities); // ✅ Sync with form state
                  }}
                  options={selectedCountries.flatMap(
                    (country) => statesByCountry[country.value] || [],
                  )}
                  value={selectedStates}
                  styles={customStyles}
                  instanceId="sellStateIds"
                  placeholder={t("select")}
                />
              )}
            />
          </div>
        ) : null}

        {/* Show Cities when at least one state is selected */}
        {selectedStates.length > 0 ? (
          <div className="mt-2 flex flex-col gap-y-3">
            <Label dir={langDir} translate="no">
              {t("select_multiple_city")}
            </Label>
            <Controller
              name="sellCityIds"
              control={formContext.control}
              render={({ field }) => (
                <ReactSelect
                  isMulti
                  {...field} // ✅ Ensures value is controlled
                  onChange={(newValues: MultiValue<OptionType>) => {
                    field.onChange(newValues);
                    setSelectedCities([...newValues]);
                  }}
                  options={selectedStates.flatMap(
                    (state) => citiesByState[state.value] || [],
                  )}
                  value={selectedCities}
                  styles={customStyles}
                  instanceId="sellCityIds"
                />
              )}
            />
          </div>
        ) : null}

        <div className="mt-2 flex flex-col gap-y-3">
          <Label dir={langDir} translate="no">
            {t("place_of_origin")}
          </Label>
          <Controller
            name="placeOfOriginId"
            control={formContext.control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                onChange={(newValue) => {
                  field.onChange(newValue?.value);
                }}
                options={memoizedCountries}
                value={memoizedCountries.find(
                  (item: IOption) => item.value === field.value,
                )}
                styles={customStyles}
                instanceId="placeOfOriginId"
                placeholder={t("select")}
              />
            )}
          />

          <p className="text-[13px] text-red-500" dir={langDir}>
            {formContext.formState.errors["placeOfOriginId"]?.message as string}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;



