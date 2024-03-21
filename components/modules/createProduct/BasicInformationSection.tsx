import React from "react";
import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type BasicInformationProps = {
  tagsList: any;
};

const BasicInformationSection: React.FC<BasicInformationProps> = ({
  tagsList,
}) => {
  const formContext = useFormContext();

  return (
    <div className="flex w-full flex-wrap">
      <div className="mb-4 w-full">
        <div className="mt-2.5 w-full">
          <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
            Basic Information
          </label>
        </div>
      </div>
      <div className="mb-3.5 w-full">
        <div className="flex flex-wrap">
          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label>Product Category</Label>
              <Controller
                name="productCategory"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Category</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Cloths">Cloths</option>
                    <option value="Addidas">Electronics</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {
                  formContext.formState.errors["productCategory"]
                    ?.message as string
                }
              </p>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <Label>Product Sub-Category</Label>
              <Controller
                name="productSubCategory"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="Shoes">Shoes</option>
                    <option value="sneakers">Sneakers</option>
                    <option value="Lofers">Lofers</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {
                  formContext.formState.errors["productSubCategory"]
                    ?.message as string
                }
              </p>
            </div>
          </div>

          <div className="relative mb-4 w-full">
            <FormField
              control={formContext.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Product Name"
                      className="!h-[48px] rounded border-gray-300 pr-10 focus-visible:!ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label>Brand</Label>
              <Controller
                name="brand"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Brand</option>
                    <option value="Nike">Nike</option>
                    <option value="Addidas">Addidas</option>
                    <option value="Puma">Puma</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["brand"]?.message as string}
              </p>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <Label>SKU No</Label>
              <Controller
                name="skuNo"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select SKU No</option>
                    <option value="SF1133569600-1">SF1133569600-1</option>
                    <option value="SF1133569600-1">SF1133569600-1</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["skuNo"]?.message as string}
              </p>
            </div>
          </div>

          <AccordionMultiSelectV2
            label="Tag"
            name="tagList"
            options={tagsList || []}
            placeholder="Tag"
            error={formContext.formState.errors["tagList"]?.message as string}
          />

          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-color-dark">
                Product Image
              </label>
              <div className="flex w-full flex-wrap">
                <div className="mb-3 w-full pr-2 sm:w-[50%] lg:w-[33.33%] xl:w-[22%]">
                  <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-solid border-gray-300 text-center">
                    <img src="/images/iphone.png" />
                  </div>
                </div>
                <div className="mb-3 w-full px-2 sm:w-[50%] lg:w-[33.33%] xl:w-[22%]">
                  <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
                    <div className="text-sm font-medium leading-4 text-color-dark">
                      <img
                        src="/images/upload.png"
                        className="m-auto mb-3"
                        alt="camera"
                      />
                      <span>Drop your Image or </span>
                      <span className="text-blue-500">browse</span>
                      <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                        (.jpg or .png only. Up to 16mb)
                      </p>
                    </div>

                    <input
                      type="file"
                      className="absolute h-full w-full rounded-full bg-red-200 opacity-0"
                    />
                  </div>
                </div>
                <div className="mb-3 w-full px-2 sm:w-[50%] lg:w-[33.33%] xl:w-[22%]">
                  <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
                    <div className="text-sm font-medium leading-4 text-color-dark">
                      <img
                        src="/images/video-square.png"
                        className="m-auto mb-3"
                        alt="camera"
                      />
                      <span>Drop your Image or </span>
                      <span className="text-blue-500">browse</span>
                      <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                        (Up to 16mb)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="absolute h-full w-full rounded-full bg-red-200 opacity-0"
                    />
                  </div>
                </div>
                <div className="mb-3 w-full px-2 sm:w-[50%] lg:w-[33.33%] xl:w-[22%]">
                  <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
                    <div className="text-sm font-medium leading-4 text-color-dark">
                      <img
                        src="/images/upload.png"
                        className="m-auto mb-3"
                        alt="camera"
                      />
                      <span>Drop your Image or </span>
                      <span className="text-blue-500">browse</span>
                      <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                        (.jpg or .png only. Up to 16mb)
                      </p>
                    </div>

                    <input
                      type="file"
                      className="absolute h-full w-full rounded-full bg-red-200 opacity-0"
                    />
                  </div>
                </div>
                <div className="mb-3 w-full pl-2 sm:w-[50%] lg:w-[33.33%] xl:w-[12%]">
                  <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
                    <div className="text-sm font-medium leading-4 text-color-dark">
                      <img
                        src="/images/plus.png"
                        className="m-auto mb-3"
                        alt="camera"
                      />
                      <span>Add More </span>
                    </div>
                    <input
                      type="file"
                      className="absolute h-full w-full rounded-full bg-red-200 opacity-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <FormField
              control={formContext.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center bg-[#F6F6F6]">
                        $
                      </div>
                      <Input
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()}
                        placeholder="Product Price"
                        className="!h-[48px] rounded border-gray-300 pl-12 pr-10 focus-visible:!ring-0"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formContext.control}
              name="offerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center bg-[#F6F6F6]">
                        $
                      </div>
                      <Input
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()}
                        placeholder="Offer Price"
                        className="!h-[48px] rounded border-gray-300 pl-12 pr-10 focus-visible:!ring-0"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
