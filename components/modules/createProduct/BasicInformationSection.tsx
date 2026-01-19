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
    borderRadius: "0.75rem",
    borderColor: "#d1d5db",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9ca3af",
    },
    "&:focus-within": {
      borderColor: "#f97316",
      boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.2)",
    },
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 20,
    borderRadius: "0.75rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#f97316"
      : state.isFocused
        ? "#fed7aa"
        : "white",
    color: state.isSelected ? "white" : "#374151",
    "&:hover": {
      backgroundColor: state.isSelected ? "#ea580c" : "#fed7aa",
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
  const [hasInitializedCategories, setHasInitializedCategories] =
    useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const createTag = useCreateTag();
  const t = useTranslations();
  const { langDir } = useAuth();

  // Helper function to recursively find a category in the hierarchy
  const findCategoryInHierarchy = (
    categories: any[],
    targetId: string | number,
  ): any => {
    if (!categories || !Array.isArray(categories)) return null;

    for (const category of categories) {
      if (
        category.id?.toString() === targetId?.toString() ||
        Number(category.id) === Number(targetId)
      ) {
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
  const findRootCategoryForTarget = (
    categories: any[],
    targetId: string | number,
  ): any => {
    if (!categories || !Array.isArray(categories)) return null;

    for (const category of categories) {
      // Check if this category itself matches
      if (
        category.id?.toString() === targetId?.toString() ||
        Number(category.id) === Number(targetId)
      ) {
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

  const categoryQuery = useCategory(PRODUCT_CATEGORY_ID.toString());
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
    // Remove listIds update logic from here - let the progression useEffect handle it
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
    if (
      catList.length > 0 &&
      selectedCategoryIds?.length &&
      !hasInitializedCategories
    ) {
      setHasInitializedCategories(true);
    }
  }, [catList.length, selectedCategoryIds, hasInitializedCategories]);

  // Initialize catList with first category when selectedCategoryIds are provided
  useEffect(() => {
    // Check if we should initialize
    const shouldInitialize =
      selectedCategoryIds?.length &&
      memoizedCategories.length > 0 &&
      catList.length === 0 &&
      !hasInitializedCategories;

    if (shouldInitialize) {
      const firstCategoryId = selectedCategoryIds[0];

      // Find the category from memoizedCategories
      const firstCategory = memoizedCategories.find(
        (cat: any) => cat.value?.toString() === firstCategoryId,
      );

      // First, try to find it directly in top-level categories
      let categoryFromQuery = null;
      if (categoryQuery?.data?.data?.children) {
        categoryFromQuery = categoryQuery.data.data.children.find(
          (item: any) =>
            item.id?.toString() === firstCategoryId ||
            Number(item.id) === Number(firstCategoryId),
        );
      }

      // If not found directly, search in the hierarchy (subcategories)
      if (!categoryFromQuery && categoryQuery?.data?.data?.children) {
        // Find the root category that contains this target category
        const rootCategory = findRootCategoryForTarget(
          categoryQuery.data.data.children,
          firstCategoryId,
        );

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
        setCurrentIndex(0);
        // Initialize listIds with first category
        setListIds([firstCategoryId.toString()]);
        formContext.setValue("categoryId", Number(firstCategoryId));
      } else if (firstCategory) {
        // Fallback: create a minimal category object
        const minimalCategory = {
          id: Number(firstCategoryId),
          name: firstCategory.label,
          children: [],
        };
        setCatList([minimalCategory]);
        setCurrentId(firstCategoryId);
        setCurrentIndex(0);
        // Initialize listIds with first category
        setListIds([firstCategoryId.toString()]);
        formContext.setValue("categoryId", Number(firstCategoryId));
      } else {
        // Last resort: try to fetch the category directly by ID
        if (firstCategoryId) {
          setCurrentId(firstCategoryId);
          setCurrentIndex(0);
          // Initialize listIds with first category
          setListIds([firstCategoryId.toString()]);
          formContext.setValue("categoryId", Number(firstCategoryId));
        }
      }
    }
  }, [
    selectedCategoryIds,
    memoizedCategories,
    catList.length,
    categoryQuery?.data?.data?.children,
    hasInitializedCategories,
    formContext,
  ]);

  // Progress through category hierarchy when selectedCategoryIds is provided
  // ONLY after children are loaded for each level
  useEffect(() => {
    // Only progress if:
    // 1. We have selectedCategoryIds to progress through
    // 2. We have a catList (categories loaded)
    // 3. We haven't reached the end yet
    // 4. Children are loaded for the current level (subCategoryById has data)
    if (
      selectedCategoryIds?.length &&
      catList?.length &&
      listIds.length < selectedCategoryIds.length &&
      subCategoryById.data?.data?.children &&
      currentId
    ) {
      const nextIdIndex = listIds.length; // Next position to fill in listIds

      // Check if currentId matches the last ID in listIds (meaning we've loaded children for a completed position)
      const lastIdInList =
        listIds.length > 0 ? listIds[listIds.length - 1] : null;

      if (lastIdInList && currentId?.toString() === lastIdInList?.toString()) {
        // We've loaded children for the current position, move to next
        if (nextIdIndex < selectedCategoryIds.length) {
          const nextCategoryId = selectedCategoryIds[nextIdIndex];
          setCurrentId(nextCategoryId.toString());
        }
      } else if (nextIdIndex < selectedCategoryIds.length) {
        // Check if currentId matches the next expected ID (children loaded for next position)
        const expectedNextId = selectedCategoryIds[nextIdIndex];
        if (currentId?.toString() === expectedNextId?.toString()) {
          // Add the current category to listIds
          if (!listIds.includes(expectedNextId.toString())) {
            setListIds([...listIds, expectedNextId.toString()]);
          }

          // Move to next category if there is one
          const nextNextIdIndex = nextIdIndex + 1;
          if (nextNextIdIndex < selectedCategoryIds.length) {
            const nextCategoryId = selectedCategoryIds[nextNextIdIndex];
            setCurrentId(nextCategoryId.toString());
          }
        }
      } else if (
        nextIdIndex === selectedCategoryIds.length &&
        listIds.length === selectedCategoryIds.length - 1
      ) {
        // We're at the last category - add it to listIds
        const lastCategoryId =
          selectedCategoryIds[selectedCategoryIds.length - 1];
        if (!listIds.includes(lastCategoryId.toString())) {
          setListIds([...listIds, lastCategoryId.toString()]);
        }
      }
    }
  }, [
    selectedCategoryIds,
    catList?.length,
    listIds.length,
    subCategoryById.data?.data?.children,
    currentId,
  ]);

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
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
            <span className="text-sm font-semibold text-white">1</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_category")}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
              dir={langDir}
              translate="no"
            >
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
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
                    className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            />
            {formContext.formState.errors["categoryId"] && (
              <p
                className="mt-1 flex items-center gap-1 text-sm text-red-500"
                dir={langDir}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {formContext.formState.errors["categoryId"]?.message as string}
              </p>
            )}
          </div>

          {catList.length > 0
            ? catList
                .filter((item) => item.children?.length)
                .map((item, index) => (
                  <div
                    key={`category-level-${index}-${item?.id}`}
                    className="space-y-3"
                  >
                    <Label
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      dir={langDir}
                      translate="no"
                    >
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      {t("sub_category")}
                    </Label>
                    <div className="relative">
                      <select
                        className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            return;
                          }

                          setCurrentId(e.target.value);
                          setCurrentIndex(index + 1);

                          // Index in catList (0 = first subcategory dropdown)
                          // Position in listIds: index + 1 (because listIds[0] is parent, listIds[1] is first sub)
                          const listIdsPosition = index + 1;

                          if (listIds[listIdsPosition]) {
                            // Update existing position
                            let tempIds = [...listIds];
                            tempIds[listIdsPosition] = e.target.value;
                            tempIds = tempIds.slice(0, listIdsPosition + 1);
                            setListIds(tempIds);
                            return;
                          }
                          // Add new position - make sure we have all previous positions
                          const newListIds = [...listIds];
                          while (newListIds.length <= listIdsPosition) {
                            // Fill in any missing positions (shouldn't happen, but just in case)
                            newListIds.push("");
                          }
                          newListIds[listIdsPosition] = e.target.value;
                          setListIds(newListIds);
                        }}
                        value={listIds[index + 1] || ""}
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
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {formContext.formState.errors["categoryLocation"] && (
                      <p
                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                        dir={langDir}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {
                          formContext.formState.errors["categoryLocation"]
                            ?.message as string
                        }
                      </p>
                    )}
                  </div>
                ))
            : null}
        </div>
      </div>

      {/* Product Name Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <span className="text-sm font-semibold text-white">2</span>
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
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
            <span className="text-sm font-semibold text-white">3</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_details")}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <BrandSelect
            selectedBrandType={formContext.getValues("typeOfProduct")}
            productType={activeProductType}
          />

          <div className="space-y-3">
            <Label
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
              dir={langDir}
              translate="no"
            >
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
              <p
                className="mt-1 flex items-center gap-1 text-sm text-red-500"
                dir={langDir}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {
                  formContext.formState.errors["productCondition"]
                    ?.message as string
                }
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500">
            <span className="text-sm font-semibold text-white">4</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{t("tags")}</h4>
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
            formContext.formState.errors["productTagList"]?.message as string
          }
        />
      </div>

      {/* Product Images Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500">
            <span className="text-sm font-semibold text-white">5</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {t("product_images")}
            </h4>
          </div>
        </div>

        <div className="space-y-4">
          <Label
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
            dir={langDir}
            translate="no"
          >
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {t("product_images")}
          </Label>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {watchProductImages?.map((item: any) => (
              <div
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 transition-colors duration-200 hover:border-orange-300"
              >
                {isImage(item.path) ? (
                  <Image
                    src={
                      typeof item.path === "object"
                        ? URL.createObjectURL(item.path)
                        : item.path
                    }
                    alt="product-image"
                    fill
                    className="object-cover"
                  />
                ) : isVideo(item.path) ? (
                  <VideoPlayer item={item} />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Overlay with actions */}
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center gap-2 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <label
                    htmlFor="editImage"
                    className="cursor-pointer rounded-full bg-white p-2 transition-colors hover:bg-gray-100"
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
                    <svg
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemovePreviewImage(item.id)}
                    className="rounded-full bg-red-500 p-2 transition-colors hover:bg-red-600"
                    title={t("remove_image")}
                  >
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Add Image Button */}
            <div className="group flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition-colors duration-200 hover:border-orange-400 hover:bg-orange-50">
              <label
                htmlFor="productImages"
                className="flex cursor-pointer flex-col items-center justify-center text-gray-500 group-hover:text-orange-600"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 group-hover:bg-orange-100">
                  <IoMdAdd className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{t("add_image")}</span>
                <span className="mt-1 text-xs text-gray-400">
                  {t("click_to_upload")}
                </span>
              </label>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files).map(
                      (file) => ({
                        path: file,
                        id: uuidv4(),
                      }),
                    );
                    formContext.setValue("productImages", [
                      ...(formContext.getValues("productImages") || []),
                      ...filesArray,
                    ]);
                  }
                }}
                id="productImages"
                ref={photosRef}
                accept="image/*,video/*"
              />
            </div>
          </div>

          {formContext.formState.errors["productImages"] && (
            <p
              className="mt-2 flex items-center gap-1 text-sm text-red-500"
              dir={langDir}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
