import React, { useEffect, useMemo, useRef, useState } from "react";
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
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
// import { useUploadFile } from "@/apis/queries/upload.queries";
import { v4 as uuidv4 } from "uuid";
import {
  useBrands,
  useCountries,
  useLocation,
} from "@/apis/queries/masters.queries";
import {
  IBrands,
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
import ControlledRichTextEditor from "@/components/shared/Forms/ControlledRichTextEditor";
import { fetchSubCategoriesById } from "@/apis/requests/category.requests";
import CloseWhiteIcon from "@/public/images/close-white.svg";
import ReactPlayer from "react-player/lazy";
import BrandSelect from "@/components/shared/BrandSelect";
import { imageExtensions, videoExtensions } from "@/utils/constants";

type ProductImageProps = {
  path: string;
  id: string;
};

type BasicInformationProps = {
  tagsList: any;
  isEditable?: boolean;
};

const BasicInformationSection: React.FC<BasicInformationProps> = ({
  tagsList,
  isEditable,
}) => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const photosRef = useRef<HTMLInputElement>(null);
  const [listIds, setListIds] = useState<string[]>([]);
  const [catList, setCatList] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // const upload = useUploadFile();
  const categoryQuery = useCategory();
  const brandsQuery = useBrands({});
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

  useEffect(() => {
    if (formContext.getValues("categoryLocation")) {
      const tempArr = formContext.getValues("categoryLocation")?.split(",");
      const promises = tempArr
        .slice(0, tempArr.length - 1)
        .map(async (categoryId: string) => {
          const res = await fetchSubCategoriesById({ categoryId });
          return res.data?.data;
        });
      Promise.all(promises).then((values) => {
        setListIds(tempArr);
        setCatList(values);
      });
    }
  }, [isEditable]);

  useEffect(
    () => formContext.setValue("categoryId", Number(currentId)),
    [currentId],
  );

  useEffect(
    () => formContext.setValue("categoryLocation", listIds.join(",")),
    [listIds?.length],
  );

  return (
    <div className="grid w-full grid-cols-4 gap-x-5">
      <div className="col-span-4 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
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
                              listIds.includes(item.id?.toString()) ? item : "",
                            )
                            ?.id?.toString()}
                        >
                          <option value="">Select Sub Category</option>
                          {item?.children?.map((item: any) => (
                            <option value={item.id?.toString()} key={item.id}>
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
                                              ? URL.createObjectURL(item.path)
                                              : typeof item.path === "string"
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
                                                event.target.files[0].size >
                                                1048576
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
                                    ) : item?.path && isVideo(item.path) ? (
                                      <div className="relative h-44">
                                        <div className="player-wrapper px-2">
                                          <ReactPlayer
                                            url={
                                              typeof item.path === "object"
                                                ? URL.createObjectURL(item.path)
                                                : typeof item.path === "string"
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
                                                event.target.files[0].size >
                                                1048576
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

                                    {/* <Input
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

                                <Input
                                  type="file"
                                  accept="video/*"
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
                                /> */}
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
                          accept="image/*, video/*"
                          multiple
                          className="!bottom-0 h-48 !w-full cursor-pointer opacity-0"
                          onChange={(event) => {
                            if (event.target.files) {
                              const filesArray = Array.from(event.target.files);

                              if (
                                filesArray.some((file) => file.size > 1048576)
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
                {/* <ControlledSelectInput
              label="Product Location"
              name="productLocationId"
              options={memoizedLocations}
            /> */}
                <ControlledSelectInput
                  label="Place of Origin"
                  name="placeOfOriginId"
                  options={memoizedCountries}
                />
              </div>

              <div className="grid w-full grid-cols-1">
                <ControlledRichTextEditor
                  label="Short Description"
                  name="shortDescription"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationSection;
