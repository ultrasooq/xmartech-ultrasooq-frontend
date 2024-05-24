import React, { useEffect, useMemo, useRef, useState } from "react";
import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import { Label } from "@/components/ui/label";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
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
// import { useUploadFile } from "@/apis/queries/upload.queries";
import { v4 as uuidv4 } from "uuid";
import { useCountries, useLocation } from "@/apis/queries/masters.queries";
import {
  ICountries,
  ILocations,
  ISelectOptions,
} from "@/utils/types/common.types";
import {
  // useCategories,
  useCategory,
  useSubCategoryById,
} from "@/apis/queries/category.queries";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import AddImageContent from "../profile/AddImageContent";
import CloseWhiteIcon from "@/public/images/close-white.svg";
import ReactPlayer from "react-player/lazy";
import BrandSelect from "@/components/shared/BrandSelect";
import {
  CONSUMER_TYPE_LIST,
  DELIVER_AFTER_LIST,
  SELL_TYPE_LIST,
  imageExtensions,
  videoExtensions,
} from "@/utils/constants";
import DynamicForm from "@/components/shared/DynamicForm";
import { Button } from "@/components/ui/button";
import AddIcon from "@/public/images/add-icon.svg";
import ReactSelect from "react-select";

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

type ProductImageProps = {
  path: string;
  id: string;
};

type BasicInformationProps = {
  tagsList: any;
  activeProductType?: string;
};

const BasicInformationSection: React.FC<BasicInformationProps> = ({
  tagsList,
  activeProductType,
}) => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const photosRef = useRef<HTMLInputElement>(null);
  const [listIds, setListIds] = useState<string[]>([]);
  const [catList, setCatList] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fieldArrayForShortDescription = useFieldArray({
    control: formContext.control,
    name: "productShortDescriptionList",
  });

  const appendShortDescription = () =>
    fieldArrayForShortDescription.append({
      shortDescription: "",
    });

  const removeShortDescription = (index: number) =>
    fieldArrayForShortDescription.remove(index);

  // const upload = useUploadFile();
  const categoryQuery = useCategory();
  const countriesQuery = useCountries();
  const locationsQuery = useLocation();
  const subCategoryById = useSubCategoryById(currentId, !!currentId);

  const watchProductImages = formContext.watch("productImages");

  const memoizedCategories = useMemo(() => {
    return (
      categoryQuery?.data?.data?.children.map((item: any) => {
        return { label: item.name, value: item.id };
      }) || []
    );
  }, [categoryQuery?.data?.data?.children?.length]);

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id?.toString() };
      }) || []
    );
  }, [countriesQuery?.data?.data?.length]);

  const memoizedLocations = useMemo(() => {
    return (
      locationsQuery?.data?.data.map((item: ILocations) => {
        return { label: item.locationName, value: item.id?.toString() };
      }) || []
    );
  }, [locationsQuery?.data?.data?.length]);

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

  const isVideo = (path: string) => {
    if (typeof path === "string") {
      const extension = path.split(".").pop()?.toLowerCase();
      if (extension) {
        if (videoExtensions.includes(extension)) {
          return true;
        }
      }
      return false;
    } else if (typeof path === "object") {
      return true;
    }
  };

  const isImage = (path: any) => {
    if (typeof path === "string") {
      const extension = path.split(".").pop()?.toLowerCase();
      if (extension) {
        if (imageExtensions.includes(extension)) {
          return true;
        }
      }
      return false;
    } else if (typeof path === "object" && path?.type?.includes("image")) {
      return true;
    }
  };

  const consumerTypeMessage =
    Array.isArray(formContext.formState.errors?.productPriceList) &&
    formContext.formState.errors.productPriceList.length > 0
      ? formContext.formState.errors.productPriceList[0]?.consumerType?.message
      : undefined;

  const sellTypeMessage =
    Array.isArray(formContext.formState.errors?.productPriceList) &&
    formContext.formState.errors.productPriceList.length > 0
      ? formContext.formState.errors.productPriceList[0]?.sellType?.message
      : undefined;

  const deliveryAfterMessage =
    Array.isArray(formContext.formState.errors?.productPriceList) &&
    formContext.formState.errors.productPriceList.length > 0
      ? formContext.formState.errors.productPriceList[0]?.deliveryAfter?.message
      : undefined;

  useEffect(() => {
    if (catList[currentIndex]) {
      let tempList = catList;
      if (subCategoryById.data?.data?.children?.length) {
        tempList[currentIndex] = subCategoryById.data?.data;
        tempList = tempList.slice(0, currentIndex + 1);
      }
      setCatList([...tempList]);
      return;
    }

    if (subCategoryById.data?.data?.children?.length) {
      setCatList([...catList, subCategoryById.data?.data]);
    }
  }, [currentId, subCategoryById.data?.data?.children?.length, currentIndex]);

  useEffect(
    () => formContext.setValue("categoryId", Number(currentId)),
    [currentId],
  );

  useEffect(
    () => formContext.setValue("categoryLocation", listIds.join(",")),
    [listIds?.length],
  );

  return (
    <>
      <div className="grid w-full grid-cols-4 gap-x-5">
        <div className="col-span-4 mx-auto mb-3 w-full max-w-[950px] rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
          <div className="flex w-full flex-wrap">
            <div className=" w-full">
              <div className="flex flex-wrap">
                <div className="form-groups-common-sec-s1">
                  <h3>Basic Information</h3>
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
                            onChange={(e) => {
                              if (e.target.value === "") {
                                return;
                              }
                              setCurrentId(e.target.value);
                              setCurrentIndex(0);

                              if (listIds[0]) {
                                let tempIds = listIds;
                                tempIds[0] = e.target.value;
                                tempIds = tempIds.slice(0, 1);

                                setListIds([...tempIds]);
                                return;
                              }
                              setListIds([...listIds, e.target.value]);
                            }}
                            value={catList[0]?.id || ""}
                          >
                            <option value="">Select Category</option>
                            {memoizedCategories.map((item: ISelectOptions) => (
                              <option
                                value={item.value?.toString()}
                                key={item.value}
                              >
                                {item.label}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      <p className="text-[13px] font-medium text-red-500">
                        {
                          formContext.formState.errors["categoryId"]
                            ?.message as string
                        }
                      </p>
                    </div>

                    {catList.length > 0 &&
                      catList.map((item, index) => (
                        <div
                          key={item?.id}
                          className="mb-3 grid w-full grid-cols-1 gap-x-5 gap-y-3"
                        >
                          <div className="flex w-full flex-col justify-between gap-y-2">
                            <Label>Sub Category</Label>
                            <select
                              className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                              onChange={(e) => {
                                if (e.target.value === "") {
                                  return;
                                }

                                setCurrentId(e.target.value);
                                setCurrentIndex(index + 1);

                                if (listIds[index + 1]) {
                                  let tempIds = listIds;
                                  tempIds[index + 1] = e.target.value;
                                  tempIds = tempIds.slice(0, index + 2);
                                  setListIds([...tempIds]);
                                  return;
                                }
                                setListIds([...listIds, e.target.value]);
                              }}
                              value={item?.children
                                ?.find((item: any) =>
                                  listIds.includes(item.id?.toString())
                                    ? item
                                    : "",
                                )
                                ?.id?.toString()}
                            >
                              <option value="">Select Sub Category</option>
                              {item?.children?.map((item: any) => (
                                <option
                                  value={item.id?.toString()}
                                  key={item.id}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                  </div>

                  <ControlledTextInput
                    label="Product Name"
                    name="productName"
                    placeholder="Product Name"
                  />

                  <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                    <BrandSelect />
                    {activeProductType !== "R" ? (
                      <ControlledTextInput
                        label="SKU No"
                        name="skuNo"
                        placeholder="Enter SKU No"
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()}
                      />
                    ) : null}
                  </div>

                  <AccordionMultiSelectV2
                    label="Tag"
                    name="productTagList"
                    options={tagsList || []}
                    placeholder="Tag"
                    error={
                      formContext.formState.errors["productTagList"]
                        ?.message as string
                    }
                  />

                  <div className="relative mb-4 w-full">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none text-color-dark">
                        Product Image
                      </label>
                      <div className="flex w-full flex-wrap">
                        <div className="grid grid-cols-5">
                          {watchProductImages?.map(
                            (item: any, index: number) => (
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
                                                handleRemovePreviewImage(
                                                  item?.id,
                                                );
                                                if (photosRef.current)
                                                  photosRef.current.value = "";
                                              }}
                                            >
                                              <Image
                                                src={CloseWhiteIcon}
                                                alt="close-icon"
                                                height={22}
                                                width={22}
                                              />
                                            </button>
                                          ) : null}

                                          {item?.path && isImage(item.path) ? (
                                            <div className="relative h-44">
                                              <Image
                                                src={
                                                  typeof item.path === "object"
                                                    ? URL.createObjectURL(
                                                        item.path,
                                                      )
                                                    : typeof item.path ===
                                                        "string"
                                                      ? item.path
                                                      : "/images/no-image.jpg"
                                                }
                                                alt="profile"
                                                fill
                                                priority
                                              />
                                              <Input
                                                type="file"
                                                accept="image/*"
                                                multiple={false}
                                                className="!bottom-0 h-44 !w-full cursor-pointer opacity-0"
                                                onChange={(event) => {
                                                  if (event.target.files) {
                                                    if (
                                                      event.target.files[0]
                                                        .size > 1048576
                                                    ) {
                                                      toast({
                                                        title:
                                                          "One of your file size should be less than 1MB",
                                                        variant: "danger",
                                                      });
                                                      return;
                                                    }
                                                    handleEditPreviewImage(
                                                      item?.id,
                                                      event.target.files,
                                                    );
                                                  }
                                                }}
                                                id="productImages"
                                              />
                                            </div>
                                          ) : item?.path &&
                                            isVideo(item.path) ? (
                                            <div className="relative h-44">
                                              <div className="player-wrapper px-2">
                                                <ReactPlayer
                                                  url={
                                                    typeof item.path ===
                                                    "object"
                                                      ? URL.createObjectURL(
                                                          item.path,
                                                        )
                                                      : typeof item.path ===
                                                          "string"
                                                        ? item.path
                                                        : "/images/no-image.jpg"
                                                  }
                                                  width="100%"
                                                  height="100%"
                                                  // playing
                                                  controls
                                                />
                                              </div>

                                              <div className="absolute h-20 w-full p-5">
                                                <p className="rounded-lg border border-gray-300 bg-gray-100 py-2 text-sm font-semibold">
                                                  Upload Video
                                                </p>
                                              </div>
                                              <Input
                                                type="file"
                                                accept="video/*"
                                                multiple={false}
                                                className="!bottom-0 h-20 !w-full cursor-pointer opacity-0"
                                                onChange={(event) => {
                                                  if (event.target.files) {
                                                    if (
                                                      event.target.files[0]
                                                        .size > 1048576
                                                    ) {
                                                      toast({
                                                        title:
                                                          "One of your file size should be less than 1MB",
                                                        variant: "danger",
                                                      });
                                                      return;
                                                    }

                                                    handleEditPreviewImage(
                                                      item?.id,
                                                      event.target.files,
                                                    );
                                                  }
                                                }}
                                                id="productImages"
                                              />
                                            </div>
                                          ) : (
                                            <AddImageContent description="Drop your File , or " />
                                          )}
                                        </div>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            ),
                          )}
                          <div className="relative mb-3 w-full pl-2">
                            <div className="absolute m-auto flex h-48 w-full cursor-pointer flex-wrap items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white text-center">
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
                              accept="image/*, video/*"
                              multiple
                              className="!bottom-0 h-48 !w-full cursor-pointer opacity-0"
                              onChange={(event) => {
                                if (event.target.files) {
                                  const filesArray = Array.from(
                                    event.target.files,
                                  );

                                  if (
                                    filesArray.some(
                                      (file) => file.size > 1048576,
                                    )
                                  ) {
                                    toast({
                                      title:
                                        "One of your file size should be less than 1MB",
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
                              }}
                              id="productImages"
                              ref={photosRef}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-groups-common-sec-s1">
                  <h3>Price</h3>
                  <div className="mb-4 w-full space-y-2">
                    <div className="text-with-checkagree">
                      <div className="check-col">
                        <input
                          type="checkbox"
                          className="custom-check-s1"
                          id="setUpPriceCheck"
                        ></input>
                      </div>
                      <label className="text-col" htmlFor="setUpPriceCheck">
                        Set up price
                      </label>
                    </div>
                  </div>

                  <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                    <div className="mt-2 flex flex-col gap-y-3">
                      <Label>Consumer Type</Label>
                      <Controller
                        name="productPriceList.[0].consumerType"
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
                            instanceId="productPriceList.[0].consumerType"
                          />
                        )}
                      />

                      {consumerTypeMessage ? (
                        <p className="text-[13px] text-red-500">
                          {consumerTypeMessage}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-2 flex flex-col gap-y-3">
                      <Label>Sell Type</Label>
                      <Controller
                        name="productPriceList.[0].sellType"
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
                            instanceId="productPriceList.[0].sellType"
                          />
                        )}
                      />

                      {sellTypeMessage ? (
                        <p className="text-[13px] text-red-500">
                          {sellTypeMessage}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-4">
                    <FormField
                      control={formContext.control}
                      name="productPriceList.[0].consumerDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consumer Discount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <button
                                type="button"
                                className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                -
                              </button>
                              <Input
                                type="number"
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="Discount"
                                className="!h-[48px] rounded border-gray-300 px-12 focus-visible:!ring-0"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                +
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formContext.control}
                      name="productPriceList.[0].vendorDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vendor Discount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <button
                                type="button"
                                className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                -
                              </button>
                              <Input
                                type="number"
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="Discount"
                                className="!h-[48px] rounded border-gray-300 px-12 focus-visible:!ring-0"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                +
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formContext.control}
                      name="productPriceList.[0].minQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min Quantity</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <button
                                type="button"
                                className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                -
                              </button>
                              <Input
                                type="number"
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="Min"
                                className="!h-[48px] rounded border-gray-300 px-12 focus-visible:!ring-0"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                +
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formContext.control}
                      name="productPriceList.[0].maxQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Quantity</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <button
                                type="button"
                                className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                -
                              </button>
                              <Input
                                type="number"
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="Max"
                                className="!h-[48px] rounded border-gray-300 px-12 focus-visible:!ring-0"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                              >
                                +
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                    <div className="mt-2 flex flex-col gap-y-3">
                      <Label>Deliver After</Label>
                      <Controller
                        name="productPriceList.[0].deliveryAfter"
                        control={formContext.control}
                        render={({ field }) => (
                          <ReactSelect
                            {...field}
                            onChange={(newValue) => {
                              field.onChange(newValue?.value);
                            }}
                            options={DELIVER_AFTER_LIST}
                            value={DELIVER_AFTER_LIST.find(
                              (item: any) => item.value === field.value,
                            )}
                            styles={customStyles}
                            instanceId="productPriceList.[0].deliveryAfter"
                          />
                        )}
                      />

                      {deliveryAfterMessage ? (
                        <p className="text-[13px] text-red-500">
                          {deliveryAfterMessage}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {activeProductType !== "R" ? (
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
                      <FormField
                        control={formContext.control}
                        name="productPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]">
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
                                <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]">
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
                  ) : null}

                  <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
                    {activeProductType !== "R" ? (
                      <ControlledSelectInput
                        label="Product Location"
                        name="productLocationId"
                        options={memoizedLocations}
                      />
                    ) : null}
                    <ControlledSelectInput
                      label="Place of Origin"
                      name="placeOfOriginId"
                      options={memoizedCountries}
                    />
                  </div>
                </div>

                <div className="form-groups-common-sec-s1">
                  <h3>Description</h3>
                  <div className="grid w-full grid-cols-1">
                    <div>
                      <div className="flex w-full items-center justify-between">
                        <label className="text-sm font-medium leading-none text-color-dark">
                          Short Description
                        </label>

                        <Button
                          type="button"
                          onClick={appendShortDescription}
                          className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                        >
                          <Image
                            src={AddIcon}
                            className="mr-1"
                            width={14}
                            height={14}
                            alt="add-icon"
                          />
                          <span>Add Short Description</span>
                        </Button>
                      </div>

                      {fieldArrayForShortDescription.fields.map(
                        (field, index) => (
                          <div key={field.id} className="relative w-full">
                            <ControlledTextInput
                              key={field.id}
                              name={`productShortDescriptionList.${index}.shortDescription`}
                              placeholder="Enter Short Description"
                            />

                            {index !== 0 ? (
                              <Button
                                type="button"
                                onClick={() => removeShortDescription(index)}
                                className="absolute right-2 top-6 flex -translate-y-2/4 cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                              >
                                <Image
                                  src="/images/social-delete-icon.svg"
                                  height={32}
                                  width={32}
                                  alt="social-delete-icon"
                                />
                              </Button>
                            ) : null}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {subCategoryById.data?.data?.category_dynamicFormCategory?.length ? (
        <div className="grid w-full grid-cols-1 gap-x-5">
          <div className="col-span-3 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
            {!subCategoryById.data?.data?.category_dynamicFormCategory
              ?.length ? (
              <p className="text-center">No Form Found</p>
            ) : null}

            <div className="space-y-5">
              {subCategoryById.data?.data?.category_dynamicFormCategory?.map(
                (form: {
                  categoryId: number;
                  // categoryLocation: null;
                  createdAt: string;
                  deletedAt: string | null;
                  formId: number;
                  formIdDetail: any;
                  id: number;
                  status: string;
                  updatedAt: string;
                }) => <DynamicForm key={form.id} form={form} />,
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BasicInformationSection;
