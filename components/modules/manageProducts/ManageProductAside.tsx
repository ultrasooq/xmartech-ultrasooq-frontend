import React, { useMemo } from "react";
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

const UPDATED_SELL_TYPE_LIST = [
  {
    label: "Everyone",
    value: "EVERYONE",
  },
  ...SELL_TYPE_LIST,
];
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
  const formContext = useFormContext();

  const locationsQuery = useLocation();

  const memoizedLocations = useMemo(() => {
    return (
      locationsQuery?.data?.data.map((item: ILocations) => {
        return { label: item.locationName, value: item.id };
      }) || []
    );
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

  return (
    <aside className="manage_product_list h-fit">
      <div className="manage_product_list_wrap">
        <h2>Manage the product</h2>
        <div className="all_select_button">
          <button type="button">Select All</button>
          <button type="button">Clean Select</button>
        </div>

        <div className="select_main_wrap">
          <div className="mt-2 flex flex-col gap-y-3">
            <Label>Person Location</Label>
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
                  value={memoizedLocations.find(
                    (item: IOption) => item.value === field.value,
                  )}
                  styles={customStyles}
                  instanceId="productLocationId"
                />
              )}
            />
          </div>

          <div className="select_type !items-start gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isProductConditionRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Product Condition</Label>
              {watchIsProductConditionRequired ? (
                <Controller
                  name="productCondition"
                  control={formContext.control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                      options={PRODUCT_CONDITION_LIST}
                      value={PRODUCT_CONDITION_LIST.find(
                        (item: any) => item.value === field.value,
                      )}
                      styles={customStyles}
                      instanceId="productCondition"
                      // isDisabled={!watchIsProductConditionRequired}
                    />
                  )}
                />
              ) : null}
              {productConditionMessage ? (
                <p className="text-[13px] text-red-500">
                  {productConditionMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="select_type mb-2 !items-start gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isHiddenRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>

            <div className="flex w-full flex-col gap-y-3">
              <Label>Hide all Selected</Label>
              {watchIsHiddenRequired ? (
                <div className="select_type_field !flex h-[48px] !flex-row !items-center text-gray-500">
                  <button
                    type="button"
                    className="flex !w-[40px] items-center justify-center"
                  >
                    <FiEyeOff size={24} />
                  </button>
                  <Label>Hide all Selected</Label>
                </div>
              ) : null}
            </div>
          </div>

          <div className="select_type mb-2 !items-start !gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isStockRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Ask for the Stock</Label>
              {!watchIsStockRequired ? (
                <Controller
                  name="stock"
                  control={formContext.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        type="number"
                        className="theme-form-control-s1"
                        placeholder="Ask for the Stock"
                        {...field}
                        onWheel={(e) => e.currentTarget.blur()}
                        disabled={watchIsStockRequired}
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

          <div className="select_type mb-2 !items-start !gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isOfferPriceRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>

            <div className="flex w-full flex-col gap-y-3">
              <Label>Ask for the Price</Label>
              {!watchIsOfferPriceRequired ? (
                <Controller
                  name="offerPrice"
                  control={formContext.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Input
                        type="number"
                        className="theme-form-control-s1"
                        placeholder="Ask for the Price"
                        {...field}
                        onWheel={(e) => e.currentTarget.blur()}
                        disabled={watchIsOfferPriceRequired}
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

          <div className="select_type !items-start gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isDeliveryAfterRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-x-5">
              <Label>Deliver After</Label>
              {watchIsDeliveryAfterRequired ? (
                <CounterTextInputField
                  name="deliveryAfter"
                  placeholder="After"
                />
              ) : null}
            </div>
          </div>

          {watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Time Open</Label>
                <CounterTextInputField
                  label="Time Open"
                  name="timeOpen"
                  placeholder="Open"
                />
              </div>
            </div>
          ) : null}

          {watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Time Close</Label>
                <CounterTextInputField
                  label="Time Close"
                  name="timeClose"
                  placeholder="Close"
                />
              </div>
            </div>
          ) : null}

          <div className="select_type !items-start gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isConsumerTypeRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Consumer Type</Label>
              {watchIsConsumerTypeRequired ? (
                <Controller
                  name="consumerType"
                  control={formContext.control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                      options={CONSUMER_TYPE_LIST}
                      value={CONSUMER_TYPE_LIST.find(
                        (item: Option) => item.value === field.value,
                      )}
                      styles={customStyles}
                      instanceId="consumerType"
                      // isDisabled={!watchIsConsumerTypeRequired}
                    />
                  )}
                />
              ) : null}

              {consumerTypeMessage ? (
                <p className="text-[13px] text-red-500">
                  {consumerTypeMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="select_type !items-start gap-x-4">
            <div className="select_type_checkbox">
              <Controller
                name="isSellTypeRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:!bg-dark-orange"
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Sell Type</Label>
              {watchIsSellTypeRequired ? (
                <Controller
                  name="sellType"
                  control={formContext.control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      onChange={(newValue) => {
                        field.onChange(newValue?.value);
                      }}
                      options={UPDATED_SELL_TYPE_LIST}
                      value={UPDATED_SELL_TYPE_LIST.find(
                        (item: Option) => item.value === field.value,
                      )}
                      styles={customStyles}
                      instanceId="sellType"
                      // isDisabled={!watchIsSellTypeRequired}
                    />
                  )}
                />
              ) : null}
              {sellTypeMessage ? (
                <p className="text-[13px] text-red-500">
                  {sellTypeMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          {watchConsumerType === "EVERYONE" ||
          watchConsumerType === "CONSUMER" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isVendorDiscountRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Vendor Discount</Label>
                {watchIsVendorDiscountRequired ? (
                  <CounterTextInputField
                    name="vendorDiscount"
                    placeholder="Discount"
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchConsumerType === "EVERYONE" ||
          watchConsumerType === "VENDORS" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isConsumerDiscountRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Consumer Discount</Label>
                {watchIsConsumerDiscountRequired ? (
                  <CounterTextInputField
                    name="consumerDiscount"
                    placeholder="Discount"
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isMinQuantityRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Min Quantity</Label>
                {watchIsMinQuantityRequired ? (
                  <CounterTextInputField name="minQuantity" placeholder="Min" />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isMaxQuantityRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Max Quantity</Label>
                {watchIsMaxQuantityRequired ? (
                  <CounterTextInputField name="maxQuantity" placeholder="Max" />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isMinCustomerRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Min Customer</Label>
                {watchIsMinCustomerRequired ? (
                  <CounterTextInputField name="minCustomer" placeholder="Min" />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" || watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isMaxCustomerRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Max Customer</Label>
                {watchIsMaxCustomerRequired ? (
                  <CounterTextInputField name="maxCustomer" placeholder="Max" />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" ||
          watchSellType === "NORMALSELL" ||
          watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isMinQuantityPerCustomerRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Min Quantity Per Customer</Label>
                {watchIsMinQuantityPerCustomerRequired ? (
                  <CounterTextInputField
                    name="minQuantityPerCustomer"
                    placeholder="Min"
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {watchSellType === "EVERYONE" ||
          watchSellType === "NORMALSELL" ||
          watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-4">
              <div className="select_type_checkbox">
                <Controller
                  name="isMaxQuantityPerCustomerRequired"
                  control={formContext.control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:!bg-dark-orange"
                    />
                  )}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <Label>Max Quantity Per Customer</Label>
                {watchIsMaxQuantityPerCustomerRequired ? (
                  <CounterTextInputField
                    name="maxQuantityPerCustomer"
                    placeholder="Max"
                  />
                ) : null}
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
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ManageProductAside;
