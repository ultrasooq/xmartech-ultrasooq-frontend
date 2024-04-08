import React, { useEffect, useMemo, useState } from "react";
import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import { Label } from "@/components/ui/label";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUploadFile } from "@/apis/queries/upload.queries";
import { v4 as uuidv4 } from "uuid";
import { useBrands, useCountries } from "@/apis/queries/masters.queries";
import {
  IBrands,
  ICountries,
  ISelectOptions,
} from "@/utils/types/common.types";
import {
  useCategories,
  useCategory,
  useSubCategoryById,
} from "@/apis/queries/category.queries";

type ProductImageProps = {
  path: string;
  id: string;
};

type BasicInformationProps = {
  tagsList: any;
};

const BasicInformationSection: React.FC<BasicInformationProps> = ({
  tagsList,
}) => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const [nestedCategoryList, setNestedCategoryList] = useState<any[]>([]);

  const watchCategoryId = formContext.watch("categoryId");
  const watchSubCategoryId = formContext.watch("subCategoryId");

  const upload = useUploadFile();
  const categoryQuery = useCategory();
  const brandsQuery = useBrands({});
  const countriesQuery = useCountries();
  const subCategoryById = useSubCategoryById(
    watchSubCategoryId,
    !!watchSubCategoryId,
  );
  const watcher = formContext.watch("productImages");

  const memoizedCategories = useMemo(() => {
    return (
      categoryQuery?.data?.data?.children.map((item: any) => {
        return { label: item.name, value: item.id };
      }) || []
    );
  }, [categoryQuery?.data?.data?.children?.length]);

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
  }, [brandsQuery?.data?.data?.length]);

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id };
      }) || []
    );
  }, [countriesQuery?.data?.data?.length]);

  const handleProductImages = () => {
    formContext.setValue("productImages", [
      ...formContext.getValues("productImages"),
      { path: "", id: uuidv4() },
    ]);
  };

  const handleUploadedFile = async (files: FileList | null) => {
    if (files) {
      const formData = new FormData();
      formData.append("content", files[0]);
      const response = await upload.mutateAsync(formData);
      if (response.status && response.data) {
        return response.data;
      }
    }
  };

  const handleFileChanges = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "productImages">,
    item: ProductImageProps,
  ) => {
    if (event.target.files?.[0]) {
      if (event.target.files[0].size > 1048576) {
        toast({
          title: "Image size should be less than 1MB",
        });
        return;
      }
      const response = await handleUploadedFile(event.target.files);

      if (response) {
        if (
          field.value.length &&
          field.value.some((val: ProductImageProps) => val.id === item.id)
        ) {
          field.onChange(
            field.value.map((val: ProductImageProps) =>
              val.id === item.id ? { ...val, path: response } : val,
            ),
          );
        }
      }
    }
  };

  useEffect(() => {
    if (
      subCategoryById?.data?.data &&
      subCategoryById?.data?.data?.children.length
    ) {
      if (
        nestedCategoryList
          .map((item: any) => item?.type)
          .includes(subCategoryById?.data?.data?.type)
      ) {
        const index = nestedCategoryList.findIndex(
          (item: any) => item?.type === subCategoryById?.data?.data?.type,
        );

        nestedCategoryList.splice(index, 1, subCategoryById?.data?.data);
        console.log(nestedCategoryList);

        setNestedCategoryList([...nestedCategoryList]);
      } else {
        setNestedCategoryList((prev) => [...prev, subCategoryById?.data?.data]);
      }
    }
  }, [subCategoryById?.data?.data]);

  useEffect(() => {
    setNestedCategoryList([]);
    if (watchCategoryId) {
      formContext.setValue("subCategoryId", watchCategoryId);
    }
  }, [watchCategoryId]);

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
          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">
            <div className="flex w-full flex-col justify-between gap-y-2">
              <Label>Product Category</Label>
              <Controller
                name="categoryId"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Category</option>
                    {memoizedCategories.map((item: ISelectOptions) => (
                      <option value={item.value?.toString()} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["categoryId"]?.message as string}
              </p>
            </div>

            {nestedCategoryList.length > 0 &&
              nestedCategoryList.map((item: any) => (
                <div
                  className="mb-2 flex w-full flex-col  justify-end gap-y-2"
                  key={item.id}
                >
                  <select
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                    onChange={(e) => {
                      console.log(nestedCategoryList);
                      if (!item?.children.length) return;
                      formContext.setValue("subCategoryId", e.target.value);
                    }}
                  >
                    <option value="">Select Category</option>
                    {item?.children?.map((item: any) => (
                      <option value={item.id?.toString()} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
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

          <div className="grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="mb-4 flex w-full flex-col justify-between">
              <Label>Brand</Label>
              <Controller
                name="brandId"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-12 w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Brand</option>
                    {memoizedBrands.map((item: ISelectOptions) => (
                      <option value={item.value?.toString()} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["brandId"]?.message as string}
              </p>
            </div>

            <FormField
              control={formContext.control}
              name="skuNo"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>SKU No</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="Enter SKU No"
                      className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <AccordionMultiSelectV2
            label="Tag"
            name="productTagList"
            options={tagsList || []}
            placeholder="Tag"
            error={
              formContext.formState.errors["productTagList"]?.message as string
            }
          />

          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-color-dark">
                Product Image
              </label>
              <div className="flex w-full flex-wrap">
                <div className="grid grid-cols-5">
                  {(watcher || [])?.map(
                    (item: ProductImageProps, index: number) => (
                      <FormField
                        control={formContext.control}
                        name="productImages"
                        key={index}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative mb-3 w-full px-2">
                                <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
                                  {item.path && item.path !== "" ? (
                                    <Image
                                      src={item.path || "/images/no-image.jpg"}
                                      alt="profile"
                                      fill
                                      priority
                                    />
                                  ) : (
                                    <div className="absolute my-auto text-sm font-medium leading-4 text-color-dark">
                                      <img
                                        src="/images/upload.png"
                                        className="m-auto mb-3"
                                        alt="camera"
                                      />
                                      <span>Drop your Image or </span>
                                      <span className="text-blue-500">
                                        browse
                                      </span>
                                      <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                                        (.jpg or .png only. Up to 1mb)
                                      </p>
                                    </div>
                                  )}

                                  <Input
                                    type="file"
                                    accept="image/*"
                                    multiple={false}
                                    className="!bottom-0 h-44 !w-full cursor-pointer opacity-0 "
                                    // onChange={async (event) => {
                                    //   if (event.target.files?.[0]) {
                                    //     if (
                                    //       event.target.files[0].size > 1048576
                                    //     ) {
                                    //       toast({
                                    //         title:
                                    //           "Image size should be less than 1MB",
                                    //       });
                                    //       return;
                                    //     }
                                    //     const response =
                                    //       await handleUploadedFile(
                                    //         event.target.files,
                                    //       );

                                    //     if (response) {
                                    //       if (
                                    //         field.value.length &&
                                    //         field.value.some(
                                    //           (val: ProductImageProps) =>
                                    //             val.id === item.id,
                                    //         )
                                    //       ) {
                                    //         field.onChange(
                                    //           field.value.map(
                                    //             (val: ProductImageProps) =>
                                    //               val.id === item.id
                                    //                 ? { ...val, path: response }
                                    //                 : val,
                                    //           ),
                                    //         );
                                    //       }
                                    //     }
                                    //   }
                                    // }}
                                    onChange={(event) =>
                                      handleFileChanges(event, field, item)
                                    }
                                    id="productImages"
                                  />
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ),
                  )}
                  <div className="mb-3 w-full pl-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleProductImages}
                      className="relative m-auto flex h-48 w-full cursor-pointer flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center"
                    >
                      <div className="text-sm font-medium leading-4 text-color-dark">
                        <Image
                          src="/images/plus.png"
                          className="m-auto mb-3"
                          alt="camera-icon"
                          width={29}
                          height={28}
                        />
                        <span>Add More</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
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

          <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            <div className="flex w-full flex-col gap-y-2">
              <Label>Place of Origin</Label>
              <Controller
                name="placeOfOriginId"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select Place of Origin</option>
                    {memoizedCountries.map((item: ISelectOptions) => (
                      <option value={item.value?.toString()} key={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {
                  formContext.formState.errors["placeOfOriginId"]
                    ?.message as string
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
