import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ProductDetailsSectionProps = {
  tagsList?: any;
};

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  tagsList,
}) => {
  const formContext = useFormContext();

  return (
    <div className="flex w-full flex-wrap">
      <div className="mb-4 w-full">
        <div className="mt-2.5 w-full">
          <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
            Product Details
          </label>
        </div>
      </div>
      <div className="mb-3.5 w-full">
        <div className="flex flex-wrap">
          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label>Place of Origin</Label>
              <Controller
                name="placeOfOrigin"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Place of Origin</option>
                    <option value="">Origin 1</option>
                    <option value="">Origin 2</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {
                  formContext.formState.errors["placeOfOrigin"]
                    ?.message as string
                }
              </p>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <Label>Style</Label>
              <Controller
                name="style"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Style</option>
                    <option value="">Style 1</option>
                    <option value="">Style 2</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["style"]?.message as string}
              </p>
            </div>
          </div>

          <div className="w-full">
            <AccordionMultiSelectV2
              label="Color"
              name="colorList"
              options={tagsList || []}
              placeholder="Color"
              error={
                formContext.formState.errors["colorList"]?.message as string
              }
            />
          </div>

          <div className="w-full">
            <AccordionMultiSelectV2
              label="Function"
              name="functionList"
              options={tagsList || []}
              placeholder="Function"
              error={
                formContext.formState.errors["functionList"]?.message as string
              }
            />
          </div>

          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label>Battery Life</Label>
              <Controller
                name="batteryLife"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Batter Life</option>
                    <option value="">Battery Life 1</option>
                    <option value="">Battery Life 2</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["batteryLife"]?.message as string}
              </p>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <Label>Screen</Label>
              <Controller
                name="screen"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Screen</option>
                    <option value="">Screen 1</option>
                    <option value="">Screen 2</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["screen"]?.message as string}
              </p>
            </div>
          </div>

          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label>Memory Size</Label>
              <Controller
                name="memorySize"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Memory Size</option>
                    <option value="">Memory Size 1</option>
                    <option value="">Memory Size 2</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["memorySize"]?.message as string}
              </p>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <FormField
                control={formContext.control}
                name="modelNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model No</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Model No"
                        className="!h-[48px] rounded border-gray-300 pr-10 focus-visible:!ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <FormField
              control={formContext.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
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

            <div>
              <div className="mb-2 grid w-full gap-x-6 md:grid-cols-2">
                <FormField
                  control={formContext.control}
                  name="detailsAttribute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>More Details</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Attribute -e.g color"
                          className="!h-[48px] rounded border-gray-300 pr-10 focus-visible:!ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formContext.control}
                  name="detailsValue"
                  render={({ field }) => (
                    <FormItem className="flex flex-col self-end">
                      <FormControl>
                        <Input
                          placeholder="value -e.g color"
                          className="!h-[48px] rounded border-gray-300 pr-10 focus-visible:!ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <span className="text-sm font-normal text-[#7F818D]">
                Please fill in both attribute name & value ( e.g, color:Red)
              </span>
            </div>
          </div>

          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center justify-start text-sm font-semibold capitalize text-dark-orange"
              >
                <img src="/images/plus-orange.png" className="mr-2" />
                Add Custom Field
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
