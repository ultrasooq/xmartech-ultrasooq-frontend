import React, { useEffect, useMemo, useRef, useState } from "react";
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
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import AddImageContent from "../profile/AddImageContent";

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
  const photosRef = useRef<HTMLInputElement>(null);

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
  const watchProductImages = formContext.watch("productImages");

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
        return { label: item.brandName, value: item.id?.toString() };
      }) || []
    );
  }, [brandsQuery?.data?.data?.length]);

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id?.toString() };
      }) || []
    );
  }, [countriesQuery?.data?.data?.length]);

  const handleEditPreviewImage = (id: string, item: FileList) => {
    const tempArr = watchProductImages || [];
    const filteredFormItem = tempArr.filter(
      (item: ProductImageProps) => item.id === id,
    );
    if (filteredFormItem.length) {
      filteredFormItem[0].path = item[0];
      formContext.setValue("productImages", [...tempArr]);
    }
  };

  const handleRemovePreviewImage = (id: string) => {
    formContext.setValue("productImages", [
      ...(watchProductImages || []).filter(
        (item: ProductImageProps) => item.id !== id,
      ),
    ]);
  };

  // const handleUploadedFile = async (files: FileList | null) => {
  //   if (files) {
  //     const formData = new FormData();
  //     formData.append("content", files[0]);
  //     const response = await upload.mutateAsync(formData);
  //     if (response.status && response.data) {
  //       return response.data;
  //     }
  //   }
  // };

  // const handleFileChanges = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   field: ControllerRenderProps<FieldValues, "productImages">,
  //   item: ProductImageProps,
  // ) => {
  //   if (event.target.files?.[0]) {
  //     if (event.target.files[0].size > 1048576) {
  //       toast({
  //         title: "Image size should be less than 1MB",
  //         variant: "danger",
  //       });
  //       return;
  //     }
  //     const response = await handleUploadedFile(event.target.files);

  //     if (response) {
  //       if (
  //         field.value.length &&
  //         field.value.some((val: ProductImageProps) => val.id === item.id)
  //       ) {
  //         field.onChange(
  //           field.value.map((val: ProductImageProps) =>
  //             val.id === item.id ? { ...val, path: response } : val,
  //           ),
  //         );
  //       }
  //     }
  //   }
  // };

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

          <ControlledTextInput
            label="Product Name"
            name="productName"
            placeholder="Product Name"
          />

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledSelectInput
              label="Brand"
              name="brandId"
              options={memoizedBrands}
            />
            <ControlledTextInput
              label="SKU No"
              name="skuNo"
              placeholder="Enter SKU No"
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
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
                  {watchProductImages?.map((item: any, index: number) => (
                    <FormField
                      control={formContext.control}
                      name="productImages"
                      key={index}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative mb-3 w-full px-2">
                              <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
                                {watchProductImages?.length ? (
                                  <button
                                    type="button"
                                    className="common-close-btn-uploader-s1"
                                    onClick={() => {
                                      handleRemovePreviewImage(item?.id);
                                      if (photosRef.current)
                                        photosRef.current.value = "";
                                    }}
                                  >
                                    <Image
                                      src="/images/close-white.svg"
                                      alt="close-icon"
                                      height={22}
                                      width={22}
                                    />
                                  </button>
                                ) : null}
                                {item.path ? (
                                  <Image
                                    src={
                                      typeof item.path === "object"
                                        ? URL.createObjectURL(item.path)
                                        : typeof item.path === "string"
                                          ? item.path
                                          : "/images/no-image.jpg"
                                    }
                                    alt="profile"
                                    fill
                                    priority
                                  />
                                ) : (
                                  <AddImageContent description="Drop your Image , or " />
                                )}

                                <Input
                                  type="file"
                                  accept="image/*"
                                  multiple={false}
                                  className="!bottom-0 h-44 !w-full cursor-pointer opacity-0"
                                  onChange={(event) =>
                                    // handleFileChanges(event, field, item)
                                    {
                                      if (event.target.files) {
                                        handleEditPreviewImage(
                                          item?.id,
                                          event.target.files,
                                        );
                                      }
                                    }
                                  }
                                  id="productImages"
                                />
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="relative mb-3 w-full pl-2">
                    <div className="absolute m-auto flex h-48 w-full cursor-pointer flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center">
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
                    </div>

                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="!bottom-0 h-48 !w-full cursor-pointer opacity-0"
                      onChange={(event) =>
                        // handleFileChanges(event, field, item)
                        {
                          if (event.target.files) {
                            const filesArray = Array.from(event.target.files);
                            console.log(filesArray);
                            if (
                              filesArray.some((file) => file.size > 1048576)
                            ) {
                              toast({
                                title:
                                  "One of your image size should be less than 1MB",
                                variant: "danger",
                              });
                              return;
                            }

                            const newImages = filesArray.map((file) => ({
                              path: file,
                              id: uuidv4(),
                            }));
                            const updatedProductImages = [
                              ...(watchProductImages || []),
                              ...newImages,
                            ];
                            formContext.setValue(
                              "productImages",
                              updatedProductImages,
                            );
                          }
                        }
                      }
                      id="productImages"
                      ref={photosRef}
                    />
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
            <ControlledSelectInput
              label="Place of Origin"
              name="placeOfOriginId"
              options={memoizedCountries}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
