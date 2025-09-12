"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SELL_TYPE_LIST, CONSUMER_TYPE_LIST } from "@/utils/constants";
import ReactSelect, { MultiValue } from "react-select";
import { IOption } from "@/utils/types/common.types";
import {
  useCountries,
  useAllCountries,
  useFetchStatesByCountry,
  useFetchCitiesByState,
} from "@/apis/queries/masters.queries";
import { useMe } from "@/apis/queries/user.queries";

interface BulkEditSidebarProps {
  onBulkUpdate: (data: any) => void;
  isLoading?: boolean;
}

const BulkEditSidebar: React.FC<BulkEditSidebarProps> = ({
  onBulkUpdate,
  isLoading = false,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  // Data fetching for countries, states, cities
  const countriesQuery = useCountries();
  const countriesNewQuery = useAllCountries();
  const fetchStatesByCountry = useFetchStatesByCountry();
  const fetchCitiesByState = useFetchCitiesByState();
  
  // Get user data for branches
  const me = useMe();

  // State management for multi-select
  const [selectedCountries, setSelectedCountries] = useState<IOption[]>([]);
  const [selectedStates, setSelectedStates] = useState<IOption[]>([]);
  const [selectedCities, setSelectedCities] = useState<IOption[]>([]);
  const [statesByCountry, setStatesByCountry] = useState<Record<string, IOption[]>>({});
  const [citiesByState, setCitiesByState] = useState<Record<string, IOption[]>>({});

  const form = useForm({
    defaultValues: {
      // Section checkboxes
      updateWarehouse: false,
      updateWhereToSell: false,
      updateBasic: false,
      updateDiscounts: false,
      
      // Warehouse fields
      branchId: "",
      
      // Where to Sell fields
      sellCountryIds: [] as IOption[],
      sellStateIds: [] as IOption[],
      sellCityIds: [] as IOption[],
      placeOfOriginId: "",
      
      // Basic fields
      hideAllSelected: false,
      enableChat: false,
      productCondition: "",
      askForPrice: false,
      askForSell: false,
      
      // Discount fields
      consumerType: "",
      sellType: "",
      vendorDiscount: 0,
      vendorDiscountType: "",
      consumerDiscount: 0,
      consumerDiscountType: "",
      
      // Quantity fields
      minQuantity: 0,
      maxQuantity: 0,
      minCustomer: 0,
      maxCustomer: 0,
      minQuantityPerCustomer: 0,
      maxQuantityPerCustomer: 0,
      
      // Time fields
      timeOpen: 0,
      timeClose: 0,
      
      // Delivery
      deliveryAfter: 0,
    },
  });

  const watchSellType = form.watch("sellType");
  const watchConsumerType = form.watch("consumerType");
  const watchVendorDiscount = form.watch("vendorDiscount");
  const watchConsumerDiscount = form.watch("consumerDiscount");
  const watchUpdateWarehouse = form.watch("updateWarehouse");
  const watchUpdateWhereToSell = form.watch("updateWhereToSell");
  const watchUpdateBasic = form.watch("updateBasic");
  const watchUpdateDiscounts = form.watch("updateDiscounts");

  const onSubmit = (data: any) => {
    console.log("🔍 BulkEditSidebar - Raw form data:", data);
    console.log("🔍 BulkEditSidebar - updateDiscounts:", data.updateDiscounts);
    console.log("🔍 BulkEditSidebar - vendorDiscount:", data.vendorDiscount);
    console.log("🔍 BulkEditSidebar - consumerDiscount:", data.consumerDiscount);
    
    // Include fields only from checked sections
    const updateData: any = {};
    
    // Warehouse section data
    if (data.updateWarehouse) {
      if (data.branchId !== undefined && data.branchId !== "") updateData.branchId = data.branchId;
    }
    
    // Where to Sell section data
    if (data.updateWhereToSell) {
      if (data.sellCountryIds !== undefined && data.sellCountryIds.length > 0) updateData.sellCountryIds = data.sellCountryIds;
      if (data.sellStateIds !== undefined && data.sellStateIds.length > 0) updateData.sellStateIds = data.sellStateIds;
      if (data.sellCityIds !== undefined && data.sellCityIds.length > 0) updateData.sellCityIds = data.sellCityIds;
      if (data.placeOfOriginId !== undefined && data.placeOfOriginId !== "") updateData.placeOfOriginId = data.placeOfOriginId;
    }
    
    // Basic section data
    if (data.updateBasic) {
      if (data.hideAllSelected !== undefined) updateData.hideAllSelected = data.hideAllSelected;
      if (data.enableChat !== undefined) updateData.enableChat = data.enableChat;
      if (data.productCondition !== undefined && data.productCondition !== "") updateData.productCondition = data.productCondition;
      if (data.askForPrice !== undefined) updateData.askForPrice = data.askForPrice;
      if (data.askForSell !== undefined) updateData.askForSell = data.askForSell;
    }
    
    // Discounts section data
    if (data.updateDiscounts) {
      if (data.consumerType !== undefined && data.consumerType !== "") updateData.consumerType = data.consumerType;
      if (data.sellType !== undefined && data.sellType !== "") updateData.sellType = data.sellType;
      if (data.deliveryAfter !== undefined) updateData.deliveryAfter = data.deliveryAfter;
      if (data.vendorDiscount !== undefined) {
        updateData.vendorDiscount = data.vendorDiscount;
        if (data.vendorDiscountType !== undefined) updateData.vendorDiscountType = data.vendorDiscountType;
      }
      if (data.consumerDiscount !== undefined) {
        updateData.consumerDiscount = data.consumerDiscount;
        if (data.consumerDiscountType !== undefined) updateData.consumerDiscountType = data.consumerDiscountType;
      }
      if (data.minQuantity !== undefined) updateData.minQuantity = data.minQuantity;
      if (data.maxQuantity !== undefined) updateData.maxQuantity = data.maxQuantity;
      if (data.minCustomer !== undefined) updateData.minCustomer = data.minCustomer;
      if (data.maxCustomer !== undefined) updateData.maxCustomer = data.maxCustomer;
      if (data.minQuantityPerCustomer !== undefined) updateData.minQuantityPerCustomer = data.minQuantityPerCustomer;
      if (data.maxQuantityPerCustomer !== undefined) updateData.maxQuantityPerCustomer = data.maxQuantityPerCustomer;
      if (data.timeOpen !== undefined) updateData.timeOpen = Number(data.timeOpen);
      if (data.timeClose !== undefined) updateData.timeClose = Number(data.timeClose);
    }
    
    console.log("🔍 BulkEditSidebar - Processed updateData:", updateData);
    console.log("🔍 BulkEditSidebar - updateData keys:", Object.keys(updateData));
    console.log("🔍 BulkEditSidebar - updateData values:", Object.values(updateData));
    
    // Check if there's any data to update
    if (Object.keys(updateData).length === 0) {
      console.log("🔍 BulkEditSidebar - No data to update, skipping...");
      return;
    }
    
    console.log("🔍 BulkEditSidebar - Calling onBulkUpdate with:", updateData);
    onBulkUpdate(updateData);
  };

  const sellTypes = () => {
    return SELL_TYPE_LIST.map((item) => ({
      label: t(item.label),
      value: item.value,
    }));
  };

  const consumerTypes = () => {
    return CONSUMER_TYPE_LIST.map((item) => ({
      label: t(item.label),
      value: item.value,
    }));
  };


  const discountTypes = () => [
    { label: t("percentage"), value: "PERCENTAGE" },
    { label: t("flat"), value: "FLAT" },
  ];

  // Memoized countries data
  const memoizedAllCountries = useMemo(() => {
    if (!countriesNewQuery.data?.data) return [];
    return countriesNewQuery.data.data.map((country: any) => ({
      label: country.name,
      value: country.id.toString(),
    }));
  }, [countriesNewQuery.data]);

  const memoizedCountries = useMemo(() => {
    if (!countriesQuery.data?.data) return [];
    return countriesQuery.data.data.map((country: any) => ({
      label: country.name,
      value: country.id.toString(),
    }));
  }, [countriesQuery.data]);

  // Memoized branches data
  const memoizedBranches = useMemo(() => {
    if (!me.data?.data?.userBranch) return [];
    return me.data.data.userBranch.map((branch: any) => ({
      label: branch.city ? `${branch.city} Branch` : `Branch ${branch.id}`,
      value: branch.id.toString(),
    }));
  }, [me.data?.data?.userBranch]);

  // Custom styles for ReactSelect
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "40px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      "&:hover": {
        border: "1px solid #d1d5db",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3b82f6" : state.isFocused ? "#f3f4f6" : "white",
      color: state.isSelected ? "white" : "#374151",
    }),
  };

  // Fetch states when countries are selected
  useEffect(() => {
    if (selectedCountries.length > 0) {
      const fetchStates = async () => {
        const newStatesByCountry: Record<string, IOption[]> = {};
        
        for (const country of selectedCountries) {
          try {
            const response = await fetchStatesByCountry.mutateAsync({
              countryId: parseInt(country.value),
            });
            
            if (response?.data) {
              newStatesByCountry[country.value] = response.data.map((state: any) => ({
                label: state.name,
                value: state.id.toString(),
              }));
            }
          } catch (error) {
            console.error(`Error fetching states for country ${country.value}:`, error);
          }
        }
        
        setStatesByCountry(newStatesByCountry);
      };
      
      fetchStates();
    } else {
      setStatesByCountry({});
      setSelectedStates([]);
      setSelectedCities([]);
    }
  }, [selectedCountries]);

  // Fetch cities when states are selected
  useEffect(() => {
    if (selectedStates.length > 0) {
      const fetchCities = async () => {
        const newCitiesByState: Record<string, IOption[]> = {};
        
        for (const state of selectedStates) {
          try {
            const response = await fetchCitiesByState.mutateAsync({
              stateId: parseInt(state.value),
            });
            
            if (response?.data) {
              newCitiesByState[state.value] = response.data.map((city: any) => ({
                label: city.name,
                value: city.id.toString(),
              }));
            }
          } catch (error) {
            console.error(`Error fetching cities for state ${state.value}:`, error);
          }
        }
        
        setCitiesByState(newCitiesByState);
      };
      
      fetchCities();
    } else {
      setCitiesByState({});
      setSelectedCities([]);
    }
  }, [selectedStates]);

  // Synchronize form values with local state on mount
  useEffect(() => {
    const formValues = form.getValues();
    if (formValues.sellCountryIds && formValues.sellCountryIds.length > 0) {
      setSelectedCountries(formValues.sellCountryIds);
    }
    if (formValues.sellStateIds && formValues.sellStateIds.length > 0) {
      setSelectedStates(formValues.sellStateIds);
    }
    if (formValues.sellCityIds && formValues.sellCityIds.length > 0) {
      setSelectedCities(formValues.sellCityIds);
    }
  }, []);

  // Sync form values when local state changes
  useEffect(() => {
    form.setValue("sellStateIds", selectedStates);
  }, [selectedStates, form]);

  useEffect(() => {
    form.setValue("sellCityIds", selectedCities);
  }, [selectedCities, form]);

  return (
    <aside className="h-fit">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900" dir={langDir} translate="no">
            {t("bulk_edit")}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t("select_fields_to_update")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">

          {/* Warehouse Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className="flex items-center space-x-2 px-3 bg-white">
                <Controller
                  name="updateWarehouse"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium text-gray-900" translate="no">
                  Warehouse
                </span>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Warehouse Fields */}
            <div className={`space-y-4 ${!watchUpdateWarehouse ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Branch Selection */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  Select Branch
                </Label>
                <Controller
                  name="branchId"
                  control={form.control}
                  render={({ field }) => (
                    <select
                      {...field}
                      disabled={!watchUpdateWarehouse}
                      className="w-full h-10 capitalize rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">{t("select")}</option>
                      {memoizedBranches.map((branch: IOption) => (
                        <option key={branch.value} value={branch.value}>
                          {branch.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Where to Sell Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className="flex items-center space-x-2 px-3 bg-white">
                <Controller
                  name="updateWhereToSell"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium text-gray-900" translate="no">
                  Where to Sell
                </span>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Where to Sell Fields */}
            <div className={`space-y-4 ${!watchUpdateWhereToSell ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Where to Sell - Select Multiple Country */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  {t("select_multiple_country")}
                </Label>
                <Controller
                  name="sellCountryIds"
                  control={form.control}
                  render={({ field }) => (
                    <ReactSelect
                      isMulti
                      isDisabled={!watchUpdateWhereToSell}
                      onChange={(newValues: MultiValue<IOption>) => {
                        const newCountries = newValues || [];
                        setSelectedCountries([...newCountries]);
                        field.onChange(newCountries);

                        // Remove states that belong to the removed country
                        const updatedStates = selectedStates.filter((state) =>
                          newCountries.some((country) =>
                            statesByCountry[country.value]?.some(
                              (s) => s.value === state.value,
                            ),
                          ),
                        );
                        setSelectedStates(updatedStates);
                        form.setValue("sellStateIds", updatedStates);

                        // Remove cities that belong to removed states
                        const updatedCities = selectedCities.filter((city) =>
                          updatedStates.some((state) =>
                            citiesByState[state.value]?.some(
                              (c) => c.value === city.value,
                            ),
                          ),
                        );
                        setSelectedCities(updatedCities);
                        form.setValue("sellCityIds", updatedCities);
                      }}
                      options={memoizedAllCountries}
                      value={selectedCountries}
                      styles={customStyles}
                      instanceId="sellCountryIds"
                      placeholder={t("select")}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  )}
                />
              </div>

              {/* Select Multiple State */}
              {selectedCountries.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                    {t("select_multiple_state")}
                  </Label>
                  <Controller
                    name="sellStateIds"
                    control={form.control}
                    render={({ field }) => (
                      <ReactSelect
                        isMulti
                        isDisabled={!watchUpdateWhereToSell}
                        onChange={(newValues: MultiValue<IOption>) => {
                          const newStates = newValues || [];
                          field.onChange(newStates);
                          setSelectedStates([...newStates]);

                          // Remove cities that belong to removed states
                          const updatedCities = selectedCities.filter((city) =>
                            newStates.some((state) =>
                              citiesByState[state.value]?.some(
                                (c) => c.value === city.value,
                              ),
                            ),
                          );
                          setSelectedCities(updatedCities);
                          form.setValue("sellCityIds", updatedCities);
                        }}
                        options={selectedCountries.flatMap(
                          (country) => statesByCountry[country.value] || []
                        )}
                        value={selectedStates}
                        styles={customStyles}
                        instanceId="sellStateIds"
                        placeholder={t("select")}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                </div>
              )}

              {/* Select Multiple City */}
              {selectedStates.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                    {t("select_multiple_city")}
                  </Label>
                  <Controller
                    name="sellCityIds"
                    control={form.control}
                    render={({ field }) => (
                      <ReactSelect
                        isMulti
                        isDisabled={!watchUpdateWhereToSell}
                        onChange={(newValues: MultiValue<IOption>) => {
                          const newCities = newValues || [];
                          field.onChange(newCities);
                          setSelectedCities([...newCities]);
                        }}
                        options={selectedStates.flatMap(
                          (state) => citiesByState[state.value] || []
                        )}
                        value={selectedCities}
                        styles={customStyles}
                        instanceId="sellCityIds"
                        placeholder={t("select")}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                </div>
              )}

              {/* Place of Origin */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  {t("place_of_origin")}
                </Label>
                <Controller
                  name="placeOfOriginId"
                  control={form.control}
                  render={({ field }) => (
                    <ReactSelect
                      isDisabled={!watchUpdateWhereToSell}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value || "");
                      }}
                      options={memoizedCountries}
                      value={memoizedCountries.find(
                        (item: IOption) => item.value === field.value,
                      )}
                      styles={customStyles}
                      instanceId="placeOfOriginId"
                      placeholder={t("select")}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Basic Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className="flex items-center space-x-2 px-3 bg-white">
                <Controller
                  name="updateBasic"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="text-sm font-medium text-gray-900" translate="no">
                  Basic Settings
                </span>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Basic Fields */}
            <div className={`space-y-4 ${!watchUpdateBasic ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Hide All Selected */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Controller
                    name="hideAllSelected"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={!watchUpdateBasic}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    )}
                  />
                  <Label className="text-sm font-medium text-gray-900" translate="no">
                    Hide All Selected
                  </Label>
                </div>
              </div>

              {/* Enable Chat */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Controller
                    name="enableChat"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={!watchUpdateBasic}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    )}
                  />
                  <Label className="text-sm font-medium text-gray-900" translate="no">
                    Enable Chat
                  </Label>
                </div>
              </div>

              {/* Product Condition */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  Product Condition
                </Label>
                <Controller
                  name="productCondition"
                  control={form.control}
                  render={({ field }) => (
                    <select
                      {...field}
                      disabled={!watchUpdateBasic}
                      className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">{t("select")}</option>
                      <option value="NEW">New</option>
                      <option value="USED">Used</option>
                      <option value="REFURBISHED">Refurbished</option>
                    </select>
                  )}
                />
              </div>

              {/* Ask for Price */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Controller
                    name="askForPrice"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={!watchUpdateBasic}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    )}
                  />
                  <Label className="text-sm font-medium text-gray-900" translate="no">
                    Ask for Price
                  </Label>
                </div>
              </div>

              {/* Ask for Sell */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Controller
                    name="askForSell"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={!watchUpdateBasic}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    )}
                  />
                  <Label className="text-sm font-medium text-gray-900" translate="no">
                    Ask for Sell
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Discounts Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <div className="flex items-center space-x-2 px-3 bg-white">
                <Controller
                  name="updateDiscounts"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <h3 className="text-sm font-semibold text-gray-700" translate="no">
                  {t("discounts")}
                </h3>
              </div>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Consumer Type */}
            <div className={`p-4 rounded-lg border ${watchUpdateDiscounts ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-300'}`}>
              <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                {t("consumer_type")}
              </Label>
              <Controller
                name="consumerType"
                control={form.control}
                render={({ field }) => (
                  <select
                    {...field}
                    disabled={!watchUpdateDiscounts}
                    className={`w-full h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                      watchUpdateDiscounts 
                        ? 'border-gray-300 focus:ring-blue-500' 
                        : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    }`}
                  >
                    <option value="">{t("select")}</option>
                    {consumerTypes().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Sell Type */}
            <div className={`p-4 rounded-lg border ${watchUpdateDiscounts ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-300'}`}>
              <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                {t("sell_type")}
              </Label>
              <Controller
                name="sellType"
                control={form.control}
                render={({ field }) => (
                  <select
                    {...field}
                    disabled={!watchUpdateDiscounts}
                    className={`w-full h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                      watchUpdateDiscounts 
                        ? 'border-gray-300 focus:ring-blue-500' 
                        : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    }`}
                  >
                    <option value="">{t("select")}</option>
                    {sellTypes().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Show dependent fields only when both Consumer Type and Sell Type are selected and section is enabled */}
            {watchConsumerType && watchSellType && watchUpdateDiscounts ? (
              <>
              {/* Delivery After */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  {t("deliver_after")}
                </Label>
                <Controller
                  name="deliveryAfter"
                  control={form.control}
                  render={({ field }) => (
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                        onClick={() => {
                          const newValue = Number(field.value) - 1;
                          field.onChange(newValue >= 0 ? newValue : 0);
                        }}
                      >
                        -
                      </button>
                      <Input
                        {...field}
                        type="number"
                        placeholder={t("after")}
                        className="pl-12 pr-12 text-center"
                        value={field.value || 0}
                        min="0"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                        onClick={() => {
                          const newValue = Number(field.value) + 1;
                          field.onChange(newValue);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Quantity fields - show only for BUYGROUP sell type */}
              {watchSellType === "BUYGROUP" && (
                <>
                  {/* Min Quantity */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("min_quantity")}
                    </Label>
                    <Controller
                      name="minQuantity"
                      control={form.control}
                      render={({ field }) => (
                        <div className="relative">
                          <button
                            type="button"
                            className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) - 1;
                              field.onChange(newValue >= 0 ? newValue : 0);
                            }}
                          >
                            -
                          </button>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t("min")}
                            className="pl-12 pr-12 text-center"
                            value={field.value || 0}
                            min="0"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) + 1;
                              field.onChange(newValue);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>

                  {/* Max Quantity */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("max_quantity")}
                    </Label>
                    <Controller
                      name="maxQuantity"
                      control={form.control}
                      render={({ field }) => (
                        <div className="relative">
                          <button
                            type="button"
                            className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) - 1;
                              field.onChange(newValue >= 0 ? newValue : 0);
                            }}
                          >
                            -
                          </button>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t("max")}
                            className="pl-12 pr-12 text-center"
                            value={field.value || 0}
                            min="0"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) + 1;
                              field.onChange(newValue);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>

                  {/* Min Customer */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("min_customer")}
                    </Label>
                    <Controller
                      name="minCustomer"
                      control={form.control}
                      render={({ field }) => (
                        <div className="relative">
                          <button
                            type="button"
                            className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) - 1;
                              field.onChange(newValue >= 0 ? newValue : 0);
                            }}
                          >
                            -
                          </button>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t("min")}
                            className="pl-12 pr-12 text-center"
                            value={field.value || 0}
                            min="0"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) + 1;
                              field.onChange(newValue);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>

                  {/* Max Customer */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("max_customer")}
                    </Label>
                    <Controller
                      name="maxCustomer"
                      control={form.control}
                      render={({ field }) => (
                        <div className="relative">
                          <button
                            type="button"
                            className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) - 1;
                              field.onChange(newValue >= 0 ? newValue : 0);
                            }}
                          >
                            -
                          </button>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t("max")}
                            className="pl-12 pr-12 text-center"
                            value={field.value || 0}
                            min="0"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                            onClick={() => {
                              const newValue = Number(field.value) + 1;
                              field.onChange(newValue);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}

              {/* Time Open - Common for all sell types */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  {t("time_open")}
                </Label>
                <Controller
                  name="timeOpen"
                  control={form.control}
                  render={({ field }) => (
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                        onClick={() => {
                          const newValue = Number(field.value) - 1;
                          field.onChange(newValue >= 0 ? newValue : 0);
                        }}
                      >
                        -
                      </button>
                      <Input
                        {...field}
                        type="number"
                        placeholder={t("time_open")}
                        className="pl-12 pr-12 text-center"
                        value={field.value || 0}
                        min="0"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                        onClick={() => {
                          const newValue = Number(field.value) + 1;
                          field.onChange(newValue);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Time Close - Common for all sell types */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                  {t("time_close")}
                </Label>
                <Controller
                  name="timeClose"
                  control={form.control}
                  render={({ field }) => (
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                        onClick={() => {
                          const newValue = Number(field.value) - 1;
                          field.onChange(newValue >= 0 ? newValue : 0);
                        }}
                      >
                        -
                      </button>
                      <Input
                        {...field}
                        type="number"
                        placeholder={t("time_close")}
                        className="pl-12 pr-12 text-center"
                        value={field.value || 0}
                        min="0"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                        onClick={() => {
                          const newValue = Number(field.value) + 1;
                          field.onChange(newValue);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                />
              </div>

              {/* Quantity Per Customer - show for BUYGROUP or WHOLESALE_PRODUCT sell type */}
              {(watchSellType === "BUYGROUP" || watchSellType === "WHOLESALE_PRODUCT") && (
                <>
                  {/* Min Quantity Per Customer */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("min_quantity_per_customer")}
                    </Label>
                    <Controller
                      name="minQuantityPerCustomer"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = Number(field.value) || 0;
                              const newValue = Math.max(currentValue - 1, 0);
                              field.onChange(newValue);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <Input
                            type="number"
                            value={field.value || 0}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="h-8 w-20 text-center"
                            placeholder={t("min")}
                            min="0"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = Number(field.value) || 0;
                              const newValue = currentValue + 1;
                              field.onChange(newValue);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>

                  {/* Max Quantity Per Customer */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("max_quantity_per_customer")}
                    </Label>
                    <Controller
                      name="maxQuantityPerCustomer"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = Number(field.value) || 0;
                              const newValue = Math.max(currentValue - 1, 0);
                              field.onChange(newValue);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <Input
                            type="number"
                            value={field.value || 0}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="h-8 w-20 text-center"
                            placeholder={t("max")}
                            min="0"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = Number(field.value) || 0;
                              const newValue = currentValue + 1;
                              field.onChange(newValue);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}

              {/* Vendor Discount - Show for EVERYONE or VENDORS/BUSINESS consumer type */}
              {(watchConsumerType === "EVERYONE" || watchConsumerType === "VENDORS" || watchConsumerType === "BUSINESS") && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                    {t("vendor_discount")}
                  </Label>
                  <Controller
                    name="vendorDiscount"
                    control={form.control}
                    render={({ field }) => (
                      <div className="relative">
                        <button
                          type="button"
                          className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                          onClick={() => {
                            const newValue = Number(field.value) - 1;
                            field.onChange(newValue);
                          }}
                        >
                          -
                        </button>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Discount"
                          className="pl-12 pr-12 text-center"
                          value={field.value || 0}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                          onClick={() => {
                            const newValue = Number(field.value) + 1;
                            field.onChange(newValue);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Consumer Discount - Show for EVERYONE or CONSUMER consumer type */}
              {(watchConsumerType === "EVERYONE" || watchConsumerType === "CONSUMER") && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                    {t("consumer_discount")}
                  </Label>
                  <Controller
                    name="consumerDiscount"
                    control={form.control}
                    render={({ field }) => (
                      <div className="relative">
                        <button
                          type="button"
                          className="absolute left-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                          onClick={() => {
                            const newValue = Number(field.value) - 1;
                            field.onChange(newValue);
                          }}
                        >
                          -
                        </button>
                        <Input
                          {...field}
                          type="number"
                          placeholder={t("discount")}
                          className="pl-12 pr-12 text-center"
                          value={field.value || 0}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-[6px] z-10 flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                          onClick={() => {
                            const newValue = Number(field.value) + 1;
                            field.onChange(newValue);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Vendor Discount Type - Show for EVERYONE or VENDORS/BUSINESS consumer type */}
              {(watchConsumerType === "EVERYONE" || watchConsumerType === "VENDORS" || watchConsumerType === "BUSINESS") && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                    {t("vendor_discount_type")}
                  </Label>
                  <Controller
                    name="vendorDiscountType"
                    control={form.control}
                    render={({ field }) => (
                      <select
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        {discountTypes().map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              )}

              {/* Consumer Discount Type - Show for EVERYONE or CONSUMER consumer type */}
              {(watchConsumerType === "EVERYONE" || watchConsumerType === "CONSUMER") && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                    {t("consumer_discount_type")}
                  </Label>
                  <Controller
                    name="consumerDiscountType"
                    control={form.control}
                    render={({ field }) => (
                      <select
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        {discountTypes().map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              )}

              {/* Trial Product Fields - Show for TRIAL_PRODUCT sell type and EVERYONE consumer type */}
              {watchSellType === "TRIAL_PRODUCT" && watchConsumerType === "EVERYONE" && (
                <>
                  {/* Max Quantity Per Customer for Trial Product */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-900 mb-3 block" translate="no">
                      {t("max_quantity_per_customer")}
                    </Label>
                    <Controller
                      name="maxQuantityPerCustomer"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = Number(field.value) || 0;
                              const newValue = Math.max(currentValue - 1, 0);
                              field.onChange(newValue);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <Input
                            type="number"
                            value={field.value || 0}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="h-8 w-20 text-center"
                            placeholder={t("max")}
                            min="0"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const currentValue = Number(field.value) || 0;
                              const newValue = currentValue + 1;
                              field.onChange(newValue);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}
              </>
            ) : (
              /* Show message only when Consumer Type/Sell Type is not selected (section is enabled) */
              watchUpdateDiscounts && (
                <div className="p-6 text-center">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-blue-600 text-sm font-medium mb-2">
                      {t("select_consumer_type_and_sell_type")}
                    </div>
                    <div className="text-blue-500 text-xs">
                      {t("choose_consumer_type_and_sell_type_to_see_options")}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>



          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              translate="no"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t("updating")}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {t("update_selected")}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default BulkEditSidebar;
