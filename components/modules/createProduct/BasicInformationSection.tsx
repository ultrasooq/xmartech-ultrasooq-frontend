import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { ISelectOptions } from "@/utils/types/common.types";
import {
  useCategory,
  useSubCategoryById,
} from "@/apis/queries/category.queries";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import AddImageContent from "../profile/AddImageContent";
import CloseWhiteIcon from "@/public/images/close-white.svg";
import BrandSelect from "@/components/shared/BrandSelect";
import { PRODUCT_CATEGORY_ID, PRODUCT_CONDITION_LIST } from "@/utils/constants";
import ReactSelect from "react-select";
import PriceSection from "./PriceSection";
import DescriptionSection from "./DescriptionSection";
import { isImage, isVideo } from "@/utils/helper";
import { useCreateTag } from "@/apis/queries/tags.queries";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { IoMdAdd } from "react-icons/io";

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 48,
    minHeight: 48,
    borderRadius: '0.75rem',
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af',
    },
    '&:focus-within': {
      borderColor: '#f97316',
      boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.2)',
    },
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 20,
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? '#f97316' : state.isFocused ? '#fed7aa' : 'white',
    color: state.isSelected ? 'white' : '#374151',
    '&:hover': {
      backgroundColor: state.isSelected ? '#ea580c' : '#fed7aa',
    },
  }),
};

type ProductImageProps = {
  path: string;
  id: string;
};

type BasicInformationProps = {
  tagsList: any;
  activeProductType?: string;
  selectedCategoryIds?: string[];
  copy: boolean;
};

const VideoPlayer = ({ item }: { item: any }) => (
        <video
          controls
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
  >
    <source
      src={
        typeof item.path === "object"
          ? URL.createObjectURL(item.path)
          : item.path
      }
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
);

const BasicInformationSection: React.FC<BasicInformationProps> = ({
  tagsList,
  activeProductType,
  selectedCategoryIds,
  copy,
}) => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const photosRef = useRef<HTMLInputElement>(null);
  const [currentId, setCurrentId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [catList, setCatList] = useState<any[]>([]);
  const [listIds, setListIds] = useState<string[]>([]);
  const [hasInitializedCategories, setHasInitializedCategories] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const createTag = useCreateTag();
  const t = useTranslations();
  const { langDir } = useAuth();

  // Helper function to recursively find a category in the hierarchy
  const findCategoryInHierarchy = (categories: any[], targetId: string | number): any => {
    if (!categories || !Array.isArray(categories)) return null;
    
    for (const category of categories) {
      if (category.id?.toString() === targetId?.toString() || Number(category.id) === Number(targetId)) {
        return category;
      }
      if (category.children && category.children.length > 0) {
        const found = findCategoryInHierarchy(category.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to find the root category that contains a target category
  const findRootCategoryForTarget = (categories: any[], targetId: string | number): any => {
    if (!categories || !Array.isArray(categories)) return null;
    
    for (const category of categories) {
      // Check if this category itself matches
      if (category.id?.toString() === targetId?.toString() || Number(category.id) === Number(targetId)) {
        return category;
      }
      // Check if target is in this category's children/descendants
      if (category.children && category.children.length > 0) {
        const found = findCategoryInHierarchy(category.children, targetId);
        if (found) {
          return category; // Return the root category that contains the target
        }
      }
    }
    return null;
  };

  const watchProductImages = formContext.watch("productImages");

  const categoryQuery = useCategory(PRODUCT_CATEGORY_ID);
  const subCategoryById = useSubCategoryById(currentId.toString());

  const memoizedCategories = useMemo(() => {
    return (
      categoryQuery?.data?.data?.children?.map((item: any) => {
        return { label: item.name, value: item.id };
      }) || []
    );
  }, [categoryQuery?.data?.data?.children?.length]);

  const productConditions = () => {
    return PRODUCT_CONDITION_LIST.map((item) => {
      return {
        label: t(item.label),
        value: item.value,
      };
    });
  };

  const handleCreateTag = async (newTag: string) => {
    const response = await createTag.mutateAsync({ tagName: newTag });
    if (response.status) {
      toast({
        title: t("tag_created_successfully"),
        description: response.message,
        variant: "success",
      });
      return { label: response.data.tagName, value: response.data.id };
    } else {
      toast({
        title: t("tag_create_failed"),
        description: response.message,
        variant: "danger",
      });
      return null;
    }
  };

  useEffect(() => {
    if (catList[currentIndex]) {
      let tempList = catList;
      if (subCategoryById.data?.data?.children) {
        tempList[currentIndex] = subCategoryById.data?.data;
        tempList = tempList.slice(0, currentIndex + 1);
      }
      setCatList([...tempList]);
      return;
    }

    if (subCategoryById.data?.data?.children) {
      setCatList([...catList, subCategoryById.data?.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, subCategoryById.data?.data?.children, currentIndex]);

  useEffect(
    () => formContext.setValue("categoryId", Number(currentId)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentId],
  );

  // Reset state when selectedCategoryIds changes (for edit mode)
  useEffect(() => {
    if (selectedCategoryIds?.length && !hasInitializedCategories) {
      setListIds([]);
      setCurrentIndex(0);
      setCatList([]);
      setCurrentId("");
    } else if (!selectedCategoryIds?.length) {
      setHasInitializedCategories(false);
    }
  }, [selectedCategoryIds, hasInitializedCategories]);
  
  // Mark as initialized after catList is set
  useEffect(() => {
    if (catList.length > 0 && selectedCategoryIds?.length && !hasInitializedCategories) {
      setHasInitializedCategories(true);
    }
  }, [catList.length, selectedCategoryIds, hasInitializedCategories]);

  // Initialize catList with first category when selectedCategoryIds are provided
  useEffect(() => {
    // Check if we should initialize
    const shouldInitialize = selectedCategoryIds?.length && 
                             memoizedCategories.length > 0 && 
                             catList.length === 0 && 
                             !hasInitializedCategories;
    
    if (shouldInitialize) {
      const firstCategoryId = selectedCategoryIds[0];
      
      // Find the category from memoizedCategories
      const firstCategory = memoizedCategories.find((cat: any) => cat.value?.toString() === firstCategoryId);
      
      // First, try to find it directly in top-level categories
      let categoryFromQuery = null;
      if (categoryQuery?.data?.data?.children) {
        categoryFromQuery = categoryQuery.data.data.children.find((item: any) => 
          item.id?.toString() === firstCategoryId || 
          Number(item.id) === Number(firstCategoryId)
        );
      }
      
      // If not found directly, search in the hierarchy (subcategories)
      if (!categoryFromQuery && categoryQuery?.data?.data?.children) {
        // Find the root category that contains this target category
        const rootCategory = findRootCategoryForTarget(categoryQuery.data.data.children, firstCategoryId);
        
        if (rootCategory) {
          // If the root category itself matches, use it
          if (rootCategory.id?.toString() === firstCategoryId?.toString()) {
            categoryFromQuery = rootCategory;
          } else {
            // Otherwise, we need to load the root category and then navigate to the target
            categoryFromQuery = rootCategory;
          }
        }
      }
      
      if (categoryFromQuery) {
        setCatList([categoryFromQuery]);
        setCurrentId(firstCategoryId);
        setCurrentIndex(1);
        formContext.setValue("categoryId", Number(firstCategoryId));
      } else if (firstCategory) {
        // Fallback: create a minimal category object
        const minimalCategory = {
          id: Number(firstCategoryId),
          name: firstCategory.label,
          children: []
        };
        setCatList([minimalCategory]);
        setCurrentId(firstCategoryId);
        setCurrentIndex(1);
        formContext.setValue("categoryId", Number(firstCategoryId));
      } else {
        // Last resort: try to fetch the category directly by ID
        if (firstCategoryId) {
          setCurrentId(firstCategoryId);
          setCurrentIndex(1);
          formContext.setValue("categoryId", Number(firstCategoryId));
        }
      }
    }
  }, [selectedCategoryIds, memoizedCategories, catList.length, categoryQuery?.data?.data?.children, hasInitializedCategories, formContext]);

  useEffect(() => {
    if (selectedCategoryIds?.length && catList?.length && listIds.length < selectedCategoryIds.length) {
      if (currentIndex < selectedCategoryIds.length) {
        setCurrentId(selectedCategoryIds[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (selectedCategoryIds.length == currentIndex + 1) {
        setListIds(selectedCategoryIds);
      }
    }
  }, [selectedCategoryIds, catList?.length, currentIndex, listIds.length]);

  useEffect(
    () => formContext.setValue("categoryLocation", listIds.join(",")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listIds?.length],
  );

  const handleEditPreviewImage = (id: string, item: FileList) => {
    const tempArr = formContext.getValues("productImages") || [];
    const filteredFormItem = tempArr.filter(
      (item: ProductImageProps) => item.id !== id,
    );
    formContext.setValue("productImages", [
      ...filteredFormItem,
      { path: item[0], id: uuidv4() },
    ]);
  };

  const handleRemovePreviewImage = (id: string) => {
    const tempArr = formContext.getValues("productImages") || [];
    const filteredFormItem = tempArr.filter(
      (item: ProductImageProps) => item.id !== id,
    );
    formContext.setValue("productImages", filteredFormItem);
  };

  return (
    <div className="space-y-8">
      {/* Category Selection Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">1</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_category")}
            </h4>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
                        {t("product_category")}
                      </Label>
                      <Controller
                        name="categoryId"
                        control={formContext.control}
                        render={({ field }) => (
                <div className="relative">
                          <select
                            {...field}
                    className="w-full h-12 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-500"
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
                            <option value="" dir={langDir} translate="no">
                              {t("select_category")}
                            </option>
                            {memoizedCategories.map((item: ISelectOptions) => (
                              <option
                                value={item.value?.toString()}
                                key={item.value}
                                dir={langDir}
                              >
                                {item.label}
                              </option>
                            ))}
                          </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}
            />
            {formContext.formState.errors["categoryId"] && (
              <p className="text-sm text-red-500 flex items-center gap-1 mt-1" dir={langDir}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formContext.formState.errors["categoryId"]?.message as string}
              </p>
            )}
                    </div>

                    {catList.length > 0
                      ? catList
                        .filter((item) => item.children?.length)
                        .map((item, index) => (
                <div key={`category-level-${index}-${item?.id}`} className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                                {t("sub_category")}
                              </Label>
                  <div className="relative">
                              <select
                      className="w-full h-12 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none cursor-pointer"
                                onChange={(e) => {
                                  if (e.target.value === "") {
                                    return;
                                  }

                                  setCurrentId(e.target.value);
                                  setCurrentIndex(index + 1);

                                  if (listIds[index]) {
                                    let tempIds = listIds;
                                    tempIds[index] = e.target.value;
                                    tempIds = tempIds.slice(0, index + 1);
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
                                <option value="" dir={langDir} translate="no">
                                  {t("select_sub_category")}
                                </option>
                                {item?.children?.map((item: any) => (
                                  <option
                                    value={item.id?.toString()}
                                    key={item.id}
                                    dir={langDir}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                            </div>
                  </div>
                  {formContext.formState.errors["categoryLocation"] && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1" dir={langDir}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formContext.formState.errors["categoryLocation"]?.message as string}
                    </p>
                  )}
                          </div>
                        ))
                      : null}
                  </div>
      </div>

      {/* Product Name Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">2</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_name")}
            </h4>
          </div>
        </div>

                  <ControlledTextInput
                    label={t("product_name")}
                    name="productName"
                    placeholder={t("product_name")}
                    disabled={copy}
                    dir={langDir}
                    translate="no"
                  />
                              </div>

      {/* Product Details Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">3</span>
                                </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_details")}
            </h4>
                                </div>
                              </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BrandSelect
                      selectedBrandType={formContext.getValues("typeOfProduct")}
                      productType={activeProductType}
                    />

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                        {t("product_condition")}
                      </Label>
                      <Controller
                        name="productCondition"
                        control={formContext.control}
                        render={({ field }) => (
                          <ReactSelect
                            {...field}
                            onChange={(newValue) => {
                              field.onChange(newValue?.value);
                            }}
                            options={productConditions()}
                            value={productConditions().find(
                              (item: any) => item.value === field.value,
                            )}
                            styles={customStyles}
                            instanceId="productCondition"
                            placeholder={t("select")}
                          />
                        )}
                      />
            {formContext.formState.errors["productCondition"] && (
              <p className="text-sm text-red-500 flex items-center gap-1 mt-1" dir={langDir}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formContext.formState.errors["productCondition"]?.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">4</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("tags")}
            </h4>
                    </div>
                  </div>

                  <AccordionMultiSelectV2
                    label={t("tags")}
                    name="productTagList"
                    options={tagsList || []}
                    placeholder={t("tags")}
                    canCreate={true}
                    createOption={handleCreateTag}
                    error={
                      formContext.formState.errors["productTagList"]
                        ?.message as string
                    }
                  />
      </div>

      {/* Product Images Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">5</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_images")}
            </h4>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2" dir={langDir} translate="no">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t("product_images")}
          </Label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {watchProductImages?.map((item: any) => (
              <div
                key={item.id}
                className="relative group aspect-square rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50 hover:border-orange-300 transition-colors duration-200"
              >
                {isImage(item.path) ? (
                                              <Image
                    src={typeof item.path === "object" ? URL.createObjectURL(item.path) : item.path}
                    alt="product-image"
                    fill
                    className="object-cover"
                  />
                ) : isVideo(item.path) ? (
                  <VideoPlayer item={item} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <label
                    htmlFor="editImage"
                    className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                    title={t("edit_image")}
                  >
                    <input
                                                type="file"
                      id="editImage"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleEditPreviewImage(item.id, e.target.files);
                        }
                      }}
                    />
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemovePreviewImage(item.id)}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    title={t("remove_image")}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                                        </div>
                                      </div>
            ))}
            
            {/* Add Image Button */}
            <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors duration-200 group">
              <label
                htmlFor="productImages"
                className="flex flex-col items-center justify-center text-gray-500 group-hover:text-orange-600 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center mb-2 transition-colors duration-200">
                  <IoMdAdd className="w-6 h-6" />
                              </div>
                <span className="text-sm font-medium">{t("add_image")}</span>
                <span className="text-xs text-gray-400 mt-1">{t("click_to_upload")}</span>
              </label>
              <input
                              type="file"
                              multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files).map((file) => ({
                                    path: file,
                                    id: uuidv4(),
                                  }));
                                  formContext.setValue(
                                    "productImages",
                      [...(formContext.getValues("productImages") || []), ...filesArray],
                                  );
                                }
                              }}
                              id="productImages"
                              ref={photosRef}
                accept="image/*,video/*"
              />
            </div>
          </div>
          
          {formContext.formState.errors["productImages"] && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-2" dir={langDir}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formContext.formState.errors["productImages"]?.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Include Price and Description sections */}
      <PriceSection activeProductType={activeProductType} />
      <DescriptionSection />
    </div>
  );
};

export default memo(BasicInformationSection);