import React, { useMemo, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CONSUMER_TYPE_LIST,
  PRODUCT_CONDITION_LIST,
  SELL_TYPE_LIST,
} from "@/utils/constants";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { Label } from "@/components/ui/label";
import CounterTextInputField from "../createProduct/CounterTextInputField";
import { useLocation } from "@/apis/queries/masters.queries";
import { ILocations, IOption } from "@/utils/types/common.types";
import { FiEyeOff } from "react-icons/fi";
// import { FiEye } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { IoIosEyeOff } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

interface Option {
  readonly label: string;
  readonly value: string;
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

type ManageProductAsideProps = {
  isLoading?: boolean;
};

const ManageProductAside: React.FC<ManageProductAsideProps> = ({
  isLoading,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  const formContext = useFormContext();

  const locationsQuery = useLocation();

  const memoizedLocations = useMemo(() => {
    return (
      locationsQuery?.data?.data.map((item: ILocations) => {
        return { label: item.locationName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsQuery?.data?.data?.length]);

  const watchConsumerType = formContext.watch("consumerType");
  const watchSellType = formContext.watch("sellType");

  const watchIsHiddenRequired = formContext.watch("isHiddenRequired");
  const watchIsProductConditionRequired = formContext.watch(
    "isProductConditionRequired",
  );
  const watchIsStockRequired = formContext.watch("isStockRequired");
  const watchIsOfferPriceRequired = formContext.watch("isOfferPriceRequired");
  const watchIsConsumerTypeRequired = formContext.watch(
    "isConsumerTypeRequired",
  );
  const watchIsSellTypeRequired = formContext.watch("isSellTypeRequired");
  const watchIsDeliveryAfterRequired = formContext.watch(
    "isDeliveryAfterRequired",
  );
  const watchIsVendorDiscountRequired = formContext.watch(
    "isVendorDiscountRequired",
  );
  const watchIsConsumerDiscountRequired = formContext.watch(
    "isConsumerDiscountRequired",
  );
  const watchIsMinQuantityRequired = formContext.watch("isMinQuantityRequired");
  const watchIsMaxQuantityRequired = formContext.watch("isMaxQuantityRequired");
  const watchIsMinCustomerRequired = formContext.watch("isMinCustomerRequired");
  const watchIsMaxCustomerRequired = formContext.watch("isMaxCustomerRequired");
  const watchIsMinQuantityPerCustomerRequired = formContext.watch(
    "isMinQuantityPerCustomerRequired",
  );
  const watchIsMaxQuantityPerCustomerRequired = formContext.watch(
    "isMaxQuantityPerCustomerRequired",
  );

  const errors = formContext.formState.errors;
  const productConditionMessage = errors?.productCondition?.message;
  const stockMessage = errors?.stock?.message;
  const offerPriceMessage = errors?.offerPrice?.message;
  const consumerTypeMessage = errors?.consumerType?.message;
  const sellTypeMessage = errors?.sellType?.message;

  const productConditions = () => {
    return Object.keys(PRODUCT_CONDITION_LIST).map((value: string, index: number) => {
      return {
        label: t(PRODUCT_CONDITION_LIST[index].label),
        value: PRODUCT_CONDITION_LIST[index].value
      };
    });
  };

  const sellTypes = () => {
    return Object.keys(SELL_TYPE_LIST).map((value: string, index: number) => {
      return {
        label: t(SELL_TYPE_LIST[index].label),
        value: SELL_TYPE_LIST[index].value
      };
    });
  };

  const consumerTypes = () => {
    return Object.keys(CONSUMER_TYPE_LIST).map((value: string, index: number) => {
      return {
        label: t(CONSUMER_TYPE_LIST[index].label),
        value: CONSUMER_TYPE_LIST[index].value
      };
    });
  };

  return (
    <aside className="manage_product_list h-fit">
      <div className="manage_product_list_wrap">
        <h2 dir={langDir}>{t("manage_product")}</h2>
        <div className="all_select_button">
          <button
            type="button"
            onClick={() => {
              formContext.setValue("isHiddenRequired", true);
              formContext.setValue("isProductConditionRequired", true);
              formContext.setValue("isStockRequired", true);
              formContext.setValue("isOfferPriceRequired", true);
              formContext.setValue("isConsumerTypeRequired", true);
              formContext.setValue("isSellTypeRequired", true);
              formContext.setValue("isDeliveryAfterRequired", true);
              formContext.setValue("isVendorDiscountRequired", true);
              formContext.setValue("isConsumerDiscountRequired", true);
              formContext.setValue("isTimeOpen", true);
              formContext.setValue("IsTimeClose", true);
              formContext.setValue("isMinQuantityRequired", true);
              formContext.setValue("isMaxQuantityRequired", true);
              formContext.setValue("isMinCustomerRequired", true);
              formContext.setValue("isMaxCustomerRequired", true);
              formContext.setValue("isMinQuantityPerCustomerRequired", true);
              formContext.setValue("isMaxQuantityPerCustomerRequired", true);
            }}
            dir={langDir}
          >
            {t("select_all")}
          </button>
          <button
            type="button"
            onClick={() => {
              formContext.setValue("productLocationId", null);
              formContext.setValue("isHiddenRequired", false);
              formContext.setValue("isProductConditionRequired", false);
              formContext.setValue("productCondition", null);
              formContext.setValue("isStockRequired", false);
              formContext.setValue("isOfferPriceRequired", false);
              formContext.setValue("isConsumerTypeRequired", false);
              formContext.setValue("isSellTypeRequired", false);
              formContext.setValue("isDeliveryAfterRequired", false);
              formContext.setValue("isVendorDiscountRequired", false);
              formContext.setValue("isConsumerDiscountRequired", false);
              formContext.setValue("isTimeOpen", false);
              formContext.setValue("IsTimeClose", false);
              formContext.setValue("isMinQuantityRequired", false);
              formContext.setValue("isMaxQuantityRequired", false);
              formContext.setValue("isMinCustomerRequired", false);
              formContext.setValue("isMaxCustomerRequired", false);
              formContext.setValue("isMinQuantityPerCustomerRequired", false);
              formContext.setValue("isMaxQuantityPerCustomerRequired", false);
            }}
            dir={langDir}
          >
            {t("clean_select")}
          </button>
        </div>

        <div className="select_main_wrap">
          <div className="mt-2 flex flex-col gap-y-3">
            <Label dir={langDir}>{t("product_location")}</Label>
            <Controller
              name="productLocationId"
              control={formContext.control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  onChange={(newValue) => {
                    field.onChange(newValue?.value);
                  }}
                  options={memoizedLocations}
                  value={
                    memoizedLocations.find(
                      (item: IOption) => item.value === field.value,
                    ) || ""
                  }
                  styles={customStyles}
                  instanceId="productLocationId"
                  isClearable={true}
                  placeholder={t("select")}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isProductConditionRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-start border-[1px] border-[#ccc] border-[solid] p-2">
              <Label dir={langDir}>{t("product_condition")}</Label>
              <div className="flex w-full gap-2 space-y-2">
                <Controller
                  name="productCondition"
                  control={formContext.control}
                  render={({ field }) => (
                    <ReactSelect
                      className="w-full"
                      {...field}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                      options={productConditions()}
                      value={
                        productConditions().find(
                          (item: any) => item.value === field.value,
                        ) || null
                      }
                      styles={customStyles}
                      instanceId="productCondition"
                      placeholder={t("select")}
                      // isDisabled={!watchIsProductConditionRequired}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isHiddenRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] items-center justify-start border-[1px] border-[#ccc] border-[solid] p-2">
              <IoIosEyeOff className="text-[20px] text-[#ccc]" />
              <Label dir={langDir}>{t("hide_All_selected")}</Label>
            </div>
          </div>

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isStockRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-start border-[1px] border-[#ccc] border-[solid] p-2">
              <Label dir={langDir}>{t("ask_for_the_stock")}</Label>
              <div className="flex w-full gap-2 space-y-2">
                {!watchIsStockRequired ? (
                  <Controller
                    name="stock"
                    control={formContext.control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Input
                          type="number"
                          className="theme-form-control-s1"
                          placeholder={t("ask_for_the_stock")}
                          {...field}
                          onWheel={(e) => e.currentTarget.blur()}
                          disabled={watchIsStockRequired}
                          dir={langDir}
                        />
                      </div>
                    )}
                  />
                ) : null}
                {stockMessage ? (
                  <p className="text-[13px] text-red-500">
                    {stockMessage.toString()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isOfferPriceRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-start border-[1px] border-[#ccc] border-[solid] p-2">
              <Label dir={langDir}>{t("ask_for_the_price")}</Label>
              {!watchIsOfferPriceRequired ? (
                <Controller
                  name="offerPrice"
                  control={formContext.control}
                  render={({ field }) => (
                    <div className="flex w-full gap-2 space-y-2">
                      <Input
                        type="number"
                        className="theme-form-control-s1"
                        placeholder={t("ask_for_the_price")}
                        {...field}
                        onWheel={(e) => e.currentTarget.blur()}
                        disabled={watchIsOfferPriceRequired}
                        dir={langDir}
                      />
                    </div>
                  )}
                />
              ) : null}
              {offerPriceMessage ? (
                <p className="text-[13px] text-red-500">
                  {offerPriceMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isDeliveryAfterRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
              <Label dir={langDir}>{t("deliver_after")}</Label>
              <div className="flex w-full gap-2 space-y-2">
                {/* <div className="flex w-[90px] items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid]"> */}
                <CounterTextInputField
                  name="deliveryAfter"
                  placeholder={t("after")}
                />
                {/* </div> */}
              </div>
            </div>
          </div>

          {watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="isTimeOpen"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("time_open")}</Label>
                <CounterTextInputField
                  label=""
                  name="timeOpen"
                  placeholder={t("open")}
                />
              </div>
            </div>
          ) : null}

          {watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="IsTimeClose"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("time_close")}</Label>
                <CounterTextInputField
                  label=""
                  name="timeClose"
                  placeholder={t("close")}
                />
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isConsumerTypeRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-start border-[1px] border-[#ccc] border-[solid] p-2">
              <Label dir={langDir}>{t("consumer_type")}</Label>
              <div className="flex w-full gap-2 space-y-2">
                <Controller
                  name="consumerType"
                  control={formContext.control}
                  defaultValue="CONSUMER" // ✅ Set default inside Controller
                  render={({ field }) => (
                    <ReactSelect
                      className="w-full"
                      {...field}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                      options={consumerTypes()}
                      value={consumerTypes().find(
                        (item: Option) => item.value === field.value,
                      )}
                      styles={customStyles}
                      instanceId="consumerType"
                      // isDisabled={!watchIsConsumerTypeRequired}
                    />
                  )}
                />
                {consumerTypeMessage ? (
                  <p className="text-[13px] text-red-500">
                    {consumerTypeMessage.toString()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-[10px] py-2">
            <Controller
              name="isSellTypeRequired"
              control={formContext.control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  className="h-[30px] w-[30px]"
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-start border-[1px] border-[#ccc] border-[solid] p-2">
              <Label dir={langDir}>{t("sell_type")}</Label>
              <div className="flex w-full gap-2 space-y-2">
                <Controller
                  name="sellType"
                  control={formContext.control}
                  render={({ field }) => (
                    <ReactSelect
                      className="w-full"
                      {...field}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                      options={sellTypes()}
                      value={sellTypes().find(
                        (item: Option) => item.value === field.value,
                      )}
                      styles={customStyles}
                      instanceId="sellType"
                      // isDisabled={!watchIsSellTypeRequired}
                    />
                  )}
                />
                {sellTypeMessage ? (
                  <p className="text-[13px] text-red-500">
                    {sellTypeMessage.toString()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {watchConsumerType === "EVERYONE" ||
          watchConsumerType === "CONSUMER" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              {/* <div className="select_type_checkbox"> */}
              <Controller
                name="isVendorDiscountRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* </div> */}
              <div className="flex w-[calc(100%_-_40px)] items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("vendor_discount")}</Label>
                <div className="flex w-full gap-2 space-y-2">
                  <CounterTextInputField
                    name="vendorDiscount"
                    placeholder="Discount"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {watchConsumerType === "EVERYONE" ||
          watchConsumerType === "VENDORS" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              {/* <div className="select_type_checkbox"> */}
              <Controller
                name="isConsumerDiscountRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* </div> */}
              <div className="flex w-[calc(100%_-_40px)] items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("consumer_discount")}</Label>
                {watchIsConsumerDiscountRequired ? (
                  <CounterTextInputField
                    name="consumerDiscount"
                    placeholder={t("discount")}
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              {/* <div className="select_type_checkbox"> */}
              <Controller
                name="isMinQuantityRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* </div> */}
              <div className="flex w-[calc(100%_-_40px)] items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("min_quantity")}</Label>
                <CounterTextInputField name="minQuantity" placeholder={t("min")} />
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="isMaxQuantityRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("max_quantity")}</Label>
                <CounterTextInputField name="maxQuantity" placeholder={t("max")} />
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="isMinCustomerRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("min_customer")}</Label>
                <div className="flex w-full gap-2 space-y-2">
                  <CounterTextInputField name="minCustomer" placeholder={t("min")} />
                </div>
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="isMaxCustomerRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] flex-wrap flex-wrap items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("max_customer")}</Label>
                <div className="flex w-full gap-2 space-y-2">
                  <CounterTextInputField name="maxCustomer" placeholder={t("max")} />
                </div>
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" ||
          watchSellType === "NORMALSELL" ||
          watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="isMinQuantityPerCustomerRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("min_quantity_per_customer")}</Label>
                <div className="flex w-full gap-2 space-y-2">
                  <CounterTextInputField
                    name="minQuantityPerCustomer"
                    placeholder={t("min")}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" ||
          watchSellType === "NORMALSELL" ||
          watchSellType === "BUYGROUP" ? (
            <div className="flex items-center justify-start gap-[10px] py-2">
              <Controller
                name="isMaxQuantityPerCustomerRequired"
                control={formContext.control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="h-[30px] w-[30px]"
                    checked={!!field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="flex w-[calc(100%_-_40px)] flex-wrap items-center justify-between border-[1px] border-[#ccc] border-[solid] p-2">
                <Label dir={langDir}>{t("max_quantity_per_customer")}</Label>
                <div className="flex w-full gap-2 space-y-2">
                  <CounterTextInputField
                    name="maxQuantityPerCustomer"
                    placeholder={t("max")}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full !bg-[#DF2100]"
          >
            {isLoading ? (
              <LoaderWithMessage message={t("please_wait")} />
            ) : (
              t("update")
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ManageProductAside;
