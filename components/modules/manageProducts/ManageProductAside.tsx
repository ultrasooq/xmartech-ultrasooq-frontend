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

  const watchIsProductConditionRequired = formContext.watch(
    "isProductConditionRequired",
  );
  const watchIsStockRequired = formContext.watch("isStockRequired");
  const watchIsOfferPriceRequired = formContext.watch("isOfferPriceRequired");
  const watchIsConsumerTypeRequired = formContext.watch(
    "isConsumerTypeRequired",
  );
  const watchIsSellTypeRequired = formContext.watch("isSellTypeRequired");

  const errors = formContext.formState.errors;
  const productConditionMessage = errors?.productCondition?.message;
  const stockMessage = errors?.stock?.message;
  const offerPriceMessage = errors?.offerPrice?.message;
  const consumerTypeMessage = errors?.consumerType?.message;
  const sellTypeMessage = errors?.sellType?.message;

  return (
    <aside className="manage_product_list">
      <div className="manage_product_list_wrap">
        <h2>Manage the product</h2>
        <div className="all_select_button">
          <button type="button">Select All</button>
          <button type="button">Clean Select</button>
        </div>

        <div className="select_main_wrap">
          <div className="mt-2 flex flex-col gap-y-3">
            <Label>Product Location</Label>
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

          <div className="select_type !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Controller
                name="isProductConditionRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Product Condition</Label>
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
                    isDisabled={!watchIsProductConditionRequired}
                  />
                )}
              />

              {productConditionMessage ? (
                <p className="text-[13px] text-red-500">
                  {productConditionMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="select_type mb-4 !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field !flex h-[48px] !flex-row !items-center text-gray-500">
              <button
                type="button"
                className="flex !w-[40px] items-center justify-center"
              >
                <FiEyeOff size={24} />
              </button>
              <Label>Hide all Selected</Label>
            </div>
          </div>

          <div className="select_type mb-4 !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Controller
                name="isStockRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Controller
                name="stock"
                control={formContext.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Ask for the Stock</Label>
                    <Input
                      type="number"
                      className="theme-form-control-s1"
                      placeholder="Ask for the Stock"
                      {...field}
                      onWheel={(e) => e.currentTarget.blur()}
                      disabled={!watchIsStockRequired}
                    />
                  </div>
                )}
              />
              {stockMessage ? (
                <p className="text-[13px] text-red-500">
                  {stockMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="select_type mb-4 !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Controller
                name="isOfferPriceRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex w-full flex-col gap-y-3">
              <Controller
                name="offerPrice"
                control={formContext.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Ask for the Price</Label>
                    <Input
                      type="number"
                      className="theme-form-control-s1"
                      placeholder="Ask for the Price"
                      {...field}
                      onWheel={(e) => e.currentTarget.blur()}
                      disabled={!watchIsOfferPriceRequired}
                    />
                  </div>
                )}
              />
              {offerPriceMessage ? (
                <p className="text-[13px] text-red-500">
                  {offerPriceMessage.toString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="select_type !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Controller
                name="isDeliveryAfterRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-x-5">
              <CounterTextInputField
                label="Deliver After"
                name="deliveryAfter"
                placeholder="After"
              />
            </div>
          </div>

          {watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
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
                <CounterTextInputField
                  label="Time Close"
                  name="timeClose"
                  placeholder="Close"
                />
              </div>
            </div>
          ) : null}

          <div className="select_type !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Controller
                name="isConsumerTypeRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Consumer Type</Label>
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
                    isDisabled={!watchIsConsumerTypeRequired}
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

          <div className="select_type !items-start gap-x-2">
            <div className="select_type_checkbox">
              <Controller
                name="isSellTypeRequired"
                control={formContext.control}
                render={({ field }) => (
                  <Checkbox
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <Label>Sell Type</Label>
              <Controller
                name="sellType"
                control={formContext.control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    onChange={(newValue) => {
                      field.onChange(newValue?.value);
                    }}
                    options={SELL_TYPE_LIST}
                    value={SELL_TYPE_LIST.find(
                      (item: Option) => item.value === field.value,
                    )}
                    styles={customStyles}
                    instanceId="sellType"
                    isDisabled={!watchIsSellTypeRequired}
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

          {watchConsumerType === "EVERYONE" ||
          watchConsumerType === "CONSUMER" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <CounterTextInputField
                  label="Vendor Discount"
                  name="vendorDiscount"
                  placeholder="Discount"
                />
              </div>
            </div>
          ) : null}

          {watchConsumerType === "EVERYONE" ||
          watchConsumerType === "VENDORS" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <CounterTextInputField
                  label="Consumer Discount"
                  name="consumerDiscount"
                  placeholder="Discount"
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
                <CounterTextInputField
                  label="Min Quantity"
                  name="minQuantity"
                  placeholder="Min"
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
                <CounterTextInputField
                  label="Max Quantity"
                  name="maxQuantity"
                  placeholder="Max"
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
                <CounterTextInputField
                  label="Min Customer"
                  name="minCustomer"
                  placeholder="Min"
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
                <CounterTextInputField
                  label="Max Customer"
                  name="maxCustomer"
                  placeholder="Max"
                />
              </div>
            </div>
          ) : null}

          {watchSellType === "NORMALSELL" || watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <CounterTextInputField
                  label="Min Quantity Per Customer"
                  name="minQuantityPerCustomer"
                  placeholder="Min"
                />
              </div>
            </div>
          ) : null}

          {watchSellType === "NORMALSELL" || watchSellType === "BUYGROUP" ? (
            <div className="select_type !items-start gap-x-2">
              <div className="select_type_checkbox">
                <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
              </div>
              <div className="grid w-full grid-cols-1 gap-x-5">
                <CounterTextInputField
                  label="Max Quantity Per Customer"
                  name="maxQuantityPerCustomer"
                  placeholder="Max"
                />
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
