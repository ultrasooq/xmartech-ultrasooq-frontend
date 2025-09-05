"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTags } from "@/apis/queries/tags.queries";
import BasicInformationSection from "@/components/modules/createProduct/BasicInformationSection";
import ProductDetailsSection from "@/components/modules/createProduct/ProductDetailsSection";
import DescriptionAndSpecificationSection from "@/components/modules/createProduct/DescriptionAndSpecificationSection";
import Footer from "@/components/shared/Footer";
import { useCreateProduct, useProductById, useProductVariant, useExistingProductById } from "@/apis/queries/product.queries";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useUploadMultipleFile } from "@/apis/queries/upload.queries";
import {
  ALPHANUMERIC_REGEX,
  BUYGROUP_MENU_ID,
  FACTORIES_MENU_ID,
  RFQ_MENU_ID,
  STORE_MENU_ID,
  imageExtensions,
  videoExtensions,
} from "@/utils/constants";
import BackgroundImage from "@/public/images/before-login-bg.png";
import { convertDate, convertTime, generateRandomSkuNoWithTimeStamp, handleDescriptionParse } from "@/utils/helper";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const baseProductPriceItemSchema = (t: any) => {
  return z.object({
    consumerType: z.string().trim().optional(),
    sellType: z.string().trim().optional(),
    consumerDiscount: z.coerce.number().optional().or(z.literal("")),
    vendorDiscount: z.coerce.number().optional().or(z.literal("")),
    consumerDiscountType: z.coerce.string().optional(),
    vendorDiscountType: z.coerce.string().optional(),
    minCustomer: z.coerce.number().optional().or(z.literal("")),
    maxCustomer: z.coerce.number().optional().or(z.literal("")),
    minQuantityPerCustomer: z.coerce.number().optional().or(z.literal("")),
    maxQuantityPerCustomer: z.coerce.number().optional().or(z.literal("")),
    minQuantity: z.coerce.number().optional().or(z.literal("")),
    maxQuantity: z.coerce.number().optional().or(z.literal("")),
    dateOpen: z.coerce.string().optional(),
    dateClose: z.coerce.string().optional(),
    startTime: z.coerce.string().optional(),
    endTime: z.coerce.string().optional().or(z.literal("")),
    timeOpen: z.coerce.number().optional().or(z.literal("")),
    timeClose: z.coerce.number().optional(),
    deliveryAfter: z.coerce.number().optional().or(z.literal("")),
    stock: z.coerce.number().optional().or(z.literal("")),
  });
};

const productPriceItemSchemaWhenSetUpPriceTrue = (t: any) => {
  return baseProductPriceItemSchema(t)
    .extend({
      consumerType: z
        .string()
        .trim()
        .min(1, { message: t("consumer_type_is_required") }),
      sellType: z
        .string()
        .trim()
        .min(1, { message: t("sell_type_is_required") }),
      consumerDiscount: z.coerce
        .number()
        .max(100, { message: t("consumer_discount_must_be_less_than_100") }),
      vendorDiscount: z.coerce
        .number()
        .max(100, { message: t("vendor_discount_must_be_less_than_100") }),
      deliveryAfter: z.coerce
        .number()
        .min(1, { message: t("delivery_after_is_required") }),
    })
    .refine(
      ({ minQuantity, maxQuantity, sellType }) =>
        sellType != "BUYGROUP" ||
        (minQuantity && Number(minQuantity || 0) < Number(maxQuantity || 0)) ||
        (maxQuantity && Number(minQuantity || 0) < Number(maxQuantity || 0)),
      {
        message: t("min_quantity_must_be_less_than_max_quantity"),
        path: ["minQuantity"],
      },
    )
    .refine(
      ({ minQuantityPerCustomer, maxQuantityPerCustomer }) =>
        (minQuantityPerCustomer &&
          Number(minQuantityPerCustomer || 0) <
          Number(maxQuantityPerCustomer || 0)) ||
        (maxQuantityPerCustomer &&
          Number(minQuantityPerCustomer || 0) <
          Number(maxQuantityPerCustomer || 0)),
      {
        message: t(
          "min_quantity_per_customer_must_be_less_than_max_quantity_per_customer",
        ),
        path: ["minQuantityPerCustomer"],
      },
    )
    .refine(
      ({ minCustomer, maxCustomer }) =>
        (!minCustomer || minCustomer) <= (!maxCustomer || maxCustomer),
      {
        message: t("min_customer_must_be_less_than_or_equal_to_max_customer"),
        path: ["minCustomer"],
      },
    )
    .superRefine((schema, ctx) => {
      const {
        sellType,
        minQuantityPerCustomer,
        maxQuantityPerCustomer,
        minQuantity,
        maxQuantity,
        minCustomer,
        maxCustomer,
        startTime,
        endTime,
      } = schema;
      if (sellType === "NORMALSELL" || sellType === "BUYGROUP") {
        if (!minQuantityPerCustomer) {
          ctx.addIssue({
            code: "custom",
            message: t("quantity_per_customer_is_required"),
            path: ["minQuantityPerCustomer"],
          });
        }
        if (!maxQuantityPerCustomer) {
          ctx.addIssue({
            code: "custom",
            message: t("quantity_per_customer_is_required"),
            path: ["maxQuantityPerCustomer"],
          });
        }
      }
      if (sellType === "BUYGROUP") {
        if (!minQuantity) {
          ctx.addIssue({
            code: "custom",
            message: t("min_quantity_is_required"),
            path: ["minQuantity"],
          });
        }
      }
      if (sellType === "BUYGROUP") {
        if (!maxQuantity) {
          ctx.addIssue({
            code: "custom",
            message: t("max_quantity_is_required"),
            path: ["maxQuantity"],
          });
        }
      }
      if (sellType === "BUYGROUP") {
        if (!minCustomer) {
          ctx.addIssue({
            code: "custom",
            message: t("min_customer_is_required"),
            path: ["minCustomer"],
          });
        }
      }
      if (sellType === "BUYGROUP") {
        if (!maxCustomer) {
          ctx.addIssue({
            code: "custom",
            message: t("max_customer_is_required"),
            path: ["maxCustomer"],
          });
        }
      }
      if (sellType == "BUYGROUP") {
        if (
          (minQuantity &&
            Number(minQuantity || 0) > Number(maxQuantity || 0)) ||
          (maxQuantity && Number(minQuantity || 0) > Number(maxQuantity || 0))
        ) {
          ctx.addIssue({
            code: "custom",
            message: t("min_quantity_must_be_less_than_max_quantity"),
            path: ["maxQuantity"],
          });
        }
      }
      // if (sellType === "BUYGROUP") {
      //   if (!startTime) {
      //     ctx.addIssue({ code: "custom", message: t("time_open_is_required"), path: ["startTime"], });
      //   }
      // }
      // if (sellType === "BUYGROUP") {
      //   if (!endTime) {
      //     ctx.addIssue({ code: "custom", message: t("time_close_is_required"), path: ["endTime"], });
      //   }
      // }
    });
};

const formSchemaForTypeP = (t: any) => {
  return z
    .object({
      productName: z
        .string()
        .trim()
        .min(2, { message: t("product_name_is_required") })
        .max(50, {
          message: t("product_name_must_be_less_than_50_characters"),
        }),
      categoryId: z.number().optional(),
      categoryLocation: z.string().trim().optional(),
      typeOfProduct: z
        .string({
          required_error: t("provide_you_product_type"),
          message: t("provide_you_product_type"),
        })
        .trim(),
      brandId: z.number().min(1, { message: t("brand_is_required") }),
      productCountryId: z
        .number()
        .min(1, { message: t("product_country_is_required") }),
      productStateId: z
        .number()
        .min(1, { message: t("product_state_is_required") }),
      productCityId: z
        .number()
        .min(1, { message: t("product_city_is_required") }),
      productTown: z.string().trim().optional(),
      productLatLng: z.string().trim().optional(),
      sellCountryIds: z.any().optional(),
      sellStateIds: z.any().optional(),
      sellCityIds: z.any().optional(),
      skuNo: z.string().trim().optional(),
      productCondition: z
        .string()
        .trim()
        .min(1, { message: t("product_condition_is_required") }),
      productTagList: z
        .array(
          z.object({
            label: z.string().trim(),
            value: z.number(),
          }),
          {
            invalid_type_error: t("tag_is_required"),
            required_error: t("tag_is_required"),
          },
        )
        .min(1, { message: t("tag_is_required") })
        .transform((value) => value.map((item) => ({ tagId: item.value }))),
      productImagesList: z.any().optional(),
      productPrice: z.coerce.number().optional().or(z.literal("")),
      offerPrice: z.coerce.number().optional().or(z.literal("")),
      placeOfOriginId: z
        .number()
        .min(1, { message: t("place_of_origin_is_required") }),
      productShortDescriptionList: z.array(
        z.object({
          shortDescription: z
            .string()
            .trim()
            .min(2, { message: t("short_description_is_required") })
            .max(20, {
              message: t("short_description_must_be_less_than_20_characters"),
            }),
        }),
      ),
      productSpecificationList: z.array(
        z.object({
          label: z
            .string()
            .trim()
            .min(2, { message: t("label_is_required") })
            .max(20, { message: t("label_must_be_less_than_20_characters") }),
          specification: z
            .string()
            .trim()
            .min(1, { message: t("specification_is_required") })
            .max(20, {
              message: t("specification_must_be_less_than_20_characters"),
            })
            .refine((val) => ALPHANUMERIC_REGEX.test(val), {
              message: t("specification_must_contain_only_letters_or_digits"),
            }),
        }),
      ),
      description: z.string().trim().optional(),
      descriptionJson: z.array(z.any()).optional(),
      productPriceList: z.array(baseProductPriceItemSchema(t)).optional(),
      setUpPrice: z.boolean(),
      isStockRequired: z.boolean().optional(),
      isOfferPriceRequired: z.boolean().optional(),
      isCustomProduct: z.boolean().optional(),
      productVariants: z.array(
        z.object({
          type: z
            .string()
            .trim()
            .min(3, {
              message: t("variant_type_must_be_equal_greater_than_2_characters"),
            })
            .max(20, { message: t("variant_type_must_be_less_than_20_characters") })
            .optional()
            .or(z.literal("")),
          variants: z.array(
            z.object({
              value: z
                .string()
                .trim()
                .min(1, { message: t("value_is_required") })
                .max(20, {
                  message: t("value_must_be_less_than_n_characters", { n: 20 }),
                })
                .optional()
                .or(z.literal("")),
              image: z.any().optional(),
            })
          )
        }),
      ),
    })
    .superRefine((data, ctx) => {
      data.productVariants.forEach((productVariant, index) => {
        const variantsCount = productVariant.variants.filter((el) =>
          el.value?.trim(),
        ).length;

        if (productVariant.type?.trim() && variantsCount == 0) {
          ctx.addIssue({
            code: "custom",
            message: t("value_is_required"),
            path: [`productVariants.${index}.variants.0.value`],
          });
        }

        if (variantsCount > 0 && !productVariant.type?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: t("variant_type_is_required"),
            path: [`productVariants.${index}.type`],
          });
        }
      });

      if (data.setUpPrice) {
        const result = z
          .array(productPriceItemSchemaWhenSetUpPriceTrue(t))
          .safeParse(data.productPriceList);

        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue(issue));
        }
      } else {
        data.productPrice = 0;
        data.offerPrice = 0;
        if (Array.isArray(data.productPriceList)) {
          data.productPriceList = data.productPriceList.map((item) => ({
            consumerType: "",
            sellType: "",
            consumerDiscount: 0,
            vendorDiscount: 0,
            consumerDiscountType: "",
            vendorDiscountType: "",
            minCustomer: 0,
            maxCustomer: 0,
            minQuantityPerCustomer: 0,
            maxQuantityPerCustomer: 0,
            minQuantity: 0,
            maxQuantity: 0,
            dateOpen: "",
            dateClose: "",
            timeOpen: 0,
            timeClose: 0,
            startTime: "",
            endTime: "",
            deliveryAfter: 0,
            stock: 0,
          }));
        }
      }
    });
};

const formSchemaForTypeR = (t: any) => {
  return z
    .object({
      productName: z
        .string()
        .trim()
        .min(2, { message: t("product_name_is_required") })
        .max(50, {
          message: t("product_name_must_be_less_than_50_characters"),
        }),
      categoryId: z.number().optional(),
      categoryLocation: z.string().trim().optional(),
      typeOfProduct: z
        .string({
          required_error: t("provide_you_product_type"),
          message: t("provide_you_product_type"),
        })
        .trim(),
      brandId: z.number().min(1, { message: t("brand_is_required") }),
      productCondition: z
        .string()
        .trim()
        .min(1, { message: t("product_condition_is_required") }),
      productTagList: z
        .array(
          z.object({
            label: z.string().trim(),
            value: z.number(),
          }),
        )
        .min(1, { message: t("tag_is_required") })
        .transform((value) => {
          let temp: any = [];
          value.forEach((item) => {
            temp.push({ tagId: item.value });
          });
          return temp;
        }),
      productImagesList: z.any().optional(),
      productPrice: z.coerce.number().optional(),
      offerPrice: z.coerce.number().optional(),
      placeOfOriginId: z
        .number()
        .min(1, { message: t("place_of_origin_is_required") }),
      productShortDescriptionList: z.array(
        z.object({
          shortDescription: z
            .string()
            .trim()
            .min(2, { message: t("short_description_is_required") })
            .max(20, {
              message: t("short_description_must_be_less_than_20_characters"),
            }),
        }),
      ),
      productSpecificationList: z.array(
        z.object({
          label: z
            .string()
            .trim()
            .min(2, { message: t("label_is_required") })
            .max(20, { message: t("label_must_be_less_than_20_characters") }),
          specification: z
            .string()
            .trim()
            .min(2, { message: t("specification_is_required") })
            .max(20, {
              message: t("specification_must_be_less_than_20_characters"),
            }),
        }),
      ),
      description: z.string().trim().optional(),
      descriptionJson: z.array(z.any()).optional(),
      setUpPrice: z.boolean(),
      isStockRequired: z.boolean().optional(),
      isOfferPriceRequired: z.boolean().optional(),
      isCustomProduct: z.boolean().optional(),
      productVariants: z.array(
        z.object({
          type: z
            .string()
            .trim()
            .min(3, {
              message: t("variant_type_must_be_equal_greater_than_2_characters"),
            })
            .max(20, { message: t("variant_type_must_be_less_than_20_characters") })
            .optional()
            .or(z.literal("")),
          variants: z.array(
            z.object({
              value: z
                .string()
                .trim()
                .min(1, { message: t("value_is_required") })
                .max(20, {
                  message: t("value_must_be_less_than_n_characters", { n: 20 }),
                })
                .optional()
                .or(z.literal("")),
              image: z.any().optional(),
            })
          )
        }),
      ),
    })
    .superRefine((data, ctx) => {
      data.productVariants.forEach((productVariant, index) => {
        const variantsCount = productVariant.variants.filter((el) =>
          el.value?.trim(),
        ).length;

        if (productVariant.type?.trim() && variantsCount == 0) {
          ctx.addIssue({
            code: "custom",
            message: t("value_is_required"),
            path: [`productVariants.${index}.variants.0.value`],
          });
        }

        if (variantsCount > 0 && !productVariant.type?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: t("variant_type_is_required"),
            path: [`productVariants.${index}.type`],
          });
        }
      });

      if (data.setUpPrice) {
        // if (data.offerPrice === 0) {
        //   ctx.addIssue({
        //     code: "custom",
        //     message: t("offer_price_is_required"),
        //     path: ["offerPrice"],
        //   });
        // }
      }
    });
};

const defaultValues: { [key: string]: any } = {
  productName: "",
  categoryId: 0,
  categoryLocation: "",
  typeOfProduct: "",
  brandId: 0,
  skuNo: "",
  productCondition: "",
  productTagList: undefined,
  productImagesList: undefined,
  productPrice: "",
  offerPrice: "",
  placeOfOriginId: 0,
  // productLocationId: 0,
  productCountryId: 0,
  productStateId: 0,
  productCityId: 0,
  sellCountryIds: [],
  sellStateIds: [],
  sellCityIds: [],
  productTown: "",
  productLatLng: "",
  productShortDescriptionList: [
    {
      shortDescription: "",
    },
  ],
  productSpecificationList: [
    {
      label: "",
      specification: "",
    },
  ],
  description: "",
  descriptionJson: undefined,
  productImages: [],
  productPriceList: [
    {
      consumerType: "",
      sellType: "",
      consumerDiscount: "",
      vendorDiscount: "",
      consumerDiscountType: "",
      vendorDiscountType: "",
      minCustomer: "",
      maxCustomer: "",
      minQuantityPerCustomer: "",
      maxQuantityPerCustomer: "",
      minQuantity: "",
      maxQuantity: "",
      dateOpen: "",
      dateClose: "",
      timeOpen: "",
      timeClose: "",
      startTime: "",
      endTime: "",
      deliveryAfter: "",
      stock: "",
    },
  ],
  setUpPrice: true,
  isStockRequired: false,
  isOfferPriceRequired: false,
  isCustomProduct: false,
  productVariants: [
    {
      type: "",
      variants: [
        {
          value: "",
          image: null
        }
      ]
    }
  ],
};

const CreateProductPage = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('copy');
  const { toast } = useToast();
  const [activeProductType, setActiveProductType] = useState<string>();
  const form = useForm({
    resolver: zodResolver(
      activeProductType === "R" ? formSchemaForTypeR(t) : formSchemaForTypeP(t),
    ),
    defaultValues,
  });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const uploadMultiple = useUploadMultipleFile();
  const tagsQuery = useTags();
  const createProduct = useCreateProduct();
  const watchProductImages = form.watch("productImages");
  const watchSetUpPrice = form.watch("setUpPrice");
  
  // Get current account to ensure we use the correct user ID
  const { data: currentAccount } = useCurrentAccount();

  const productQueryById = useProductById(
    {
      productId: productId || ''
    },
    !!productId && !searchParams?.get('copy'),
  );

  // Query for existing product when copying
  const existingProductQueryById = useExistingProductById(
    {
      existingProductId: productId || ''
    },
    !!productId && searchParams?.get('copy') !== null,
  );
  const getProductVariant = useProductVariant();

  const memoizedTags = useMemo(() => {
    return (
      tagsQuery?.data?.data.map((item: { id: string; tagName: string }) => {
        return { label: item.tagName, value: item.id };
      }) || []
    );
  }, [tagsQuery?.data]);

  const handleUploadedFile = async (list: any[]) => {
    if (list?.length) {
      const formData = new FormData();

      list.forEach((item: { path: File; id: string }) => {
        formData.append("content", item.path);
      });

      const response = await uploadMultiple.mutateAsync(formData);
      if (response.status && response.data) {
        return response.data;
      }
    }
  };

  const fetchProductVariant = async (productPriceId: number) => {
    const product = productQueryById?.data?.data;
    const response = await getProductVariant.mutateAsync([productPriceId]);
    const variants = response?.data?.[0]?.object || [];
    if (variants.length > 0) {
      const productSellerImages = product?.product_productPrice?.[0]?.productPrice_productSellerImage?.length
        ? product?.product_productPrice?.[0]?.productPrice_productSellerImage
        : product?.productImages?.length
        ? product?.productImages
        : [];

      // @ts-ignore
      let variantTypes = [...new Set(variants.map((variant: any) => variant.type))];
      form.setValue("productVariants", variantTypes.map((type: string) => {
        return {
          type: type,
          variants: variants.filter((variant: any) => variant.type == type).map((variant: any) => {
            return {
              value: variant.value, 
              image: productSellerImages?.find((image: any) => {
                return image.variant && image.variant?.type == type && image.variant?.value == variant.value;
              })?.image || null
            };
          })
        };
      }));
    }
  }

  useEffect(() => {
    // Handle regular product data
    if (productQueryById?.data?.data) {
      const product = productQueryById?.data?.data;
      populateFormWithProductData(product);
    }
  }, [productQueryById?.data?.data]);

  useEffect(() => {
    // Handle existing product data when copying
    console.log('=== EXISTING PRODUCT USE EFFECT TRIGGERED ===');
    console.log('existingProductQueryById:', existingProductQueryById);
    console.log('existingProductQueryById?.data:', existingProductQueryById?.data);
    console.log('existingProductQueryById?.data?.data:', existingProductQueryById?.data?.data);
    console.log('productId:', productId);
    console.log('searchParams?.get("copy"):', searchParams?.get('copy'));
    console.log('searchParams?.get("copy") !== null:', searchParams?.get('copy') !== null);
    
    if (existingProductQueryById?.data?.data) {
      const existingProduct = existingProductQueryById?.data?.data;
      console.log('Found existing product data:', existingProduct);
      populateFormWithExistingProductData(existingProduct);
    } else {
      console.log('No existing product data found');
      console.log('Query enabled:', !!productId && searchParams?.get('copy') !== null);
    }
  }, [existingProductQueryById?.data?.data]);

  const populateFormWithProductData = (product: any) => {
      setActiveProductType(product.productType);
      
      form.setValue("categoryId", product.categoryId);
      form.setValue("categoryLocation", product.categoryLocation);
      setSelectedCategoryIds(
      product.categoryLocation ? product.categoryLocation.split(',').filter((item: string) => item) : []
      );

      form.setValue("productName", product.productName);
      form.setValue("typeOfProduct", product.typeOfProduct);
      form.setValue("brandId", product.brandId);
      form.setValue("productCondition", product.product_productPrice?.[0]?.productCondition);
      form.setValue(
        "productTagList",
        product.productTags?.filter((item: any) => item.productTagsTag)?.map((item: any) => {
          return {
            label: item.productTagsTag.tagName,
            value: item.productTagsTag.id
          }
        }) || []
      );

      const productSellerImages = product?.product_productPrice?.[0]
        ?.productPrice_productSellerImage?.length
        ? product?.product_productPrice?.[0]?.productPrice_productSellerImage
        : product?.productImages?.length
        ? product?.productImages
        : [];

      const productImages = productSellerImages?.filter((item: any) => item.image)
      .map((item: any) => ({
        id: item.id,
        path: item.image,
        name: item.imageName || 'product-image',
        type: 'image'
      })) || [];

    form.setValue("productImages", productImages);
    form.setValue("productPrice", product.productPrice);
    form.setValue("offerPrice", product.offerPrice);
    form.setValue("description", product.description);
    form.setValue("specification", product.specification);
    form.setValue("shortDescription", product.shortDescription);
    form.setValue("barcode", product.barcode);
    form.setValue("placeOfOriginId", product.placeOfOriginId);
    form.setValue("productType", product.productType);
    form.setValue("typeProduct", product.typeProduct);

      form.setValue("productSpecificationList", product.product_productSpecification?.map((item: any) => {
        return {
          label: item.label,
          specification: item.specification
        }
      }) || []);

      if (product.product_productPrice?.length) {
        fetchProductVariant(product.product_productPrice?.[0]?.id);
      }
  };

  const populateFormWithExistingProductData = (existingProduct: any) => {
    console.log('=== POPULATING FORM WITH EXISTING PRODUCT DATA ===');
    console.log('existingProduct:', existingProduct);
    console.log('existingProduct.specification:', existingProduct.specification);
    console.log('existingProduct.shortDescription:', existingProduct.shortDescription);
    console.log('existingProduct.description:', existingProduct.description);
    
    setActiveProductType(existingProduct.productType);
    
    form.setValue("categoryId", existingProduct.categoryId);
    form.setValue("categoryLocation", existingProduct.categoryLocation);
    setSelectedCategoryIds(
      existingProduct.categoryLocation ? existingProduct.categoryLocation.split(',').filter((item: string) => item) : []
    );

    form.setValue("productName", existingProduct.productName);
    console.log('Set productName:', existingProduct.productName);
    
    form.setValue("typeOfProduct", existingProduct.typeOfProduct);
    form.setValue("brandId", existingProduct.brandId);
    form.setValue("productCondition", "New"); // Default for existing products
    form.setValue(
      "productTagList",
      existingProduct.existingProductTags?.filter((item: any) => item.existingProductTag)?.map((item: any) => {
        return {
          label: item.existingProductTag.tagName,
          value: item.existingProductTag.id
        }
      }) || []
    );

    // Use existingProductImages for existing products
    const productImages = existingProduct.existingProductImages?.filter((item: any) => item.image)
      .map((item: any) => ({
        id: item.id,
        path: item.image,
        name: item.imageName || 'product-image',
        type: 'image'
      })) || [];

    console.log('Setting productImages:', productImages);
    form.setValue("productImages", productImages);
    form.setValue("productPrice", existingProduct.productPrice);
    form.setValue("offerPrice", existingProduct.offerPrice);
    form.setValue("description", existingProduct.description);
    
    // Parse description JSON if it exists, otherwise create proper Slate format
    if (existingProduct.description) {
      try {
        const descriptionJson = JSON.parse(existingProduct.description);
        // Validate that it's a proper Slate format
        if (Array.isArray(descriptionJson) && descriptionJson.length > 0) {
          form.setValue("descriptionJson", descriptionJson);
        } else {
          // If it's not a proper Slate format, create one
          form.setValue("descriptionJson", [
            {
              id: '1',
              type: 'p',
              children: [{ text: existingProduct.description }]
            }
          ]);
        }
      } catch (e) {
        console.log('Description is not valid JSON, creating Slate format from plain text');
        // Create proper Slate format from plain text
        form.setValue("descriptionJson", [
          {
            id: '1',
            type: 'p',
            children: [{ text: existingProduct.description }]
          }
        ]);
      }
    } else {
      // Default empty Slate format
      form.setValue("descriptionJson", [
        {
          id: '1',
          type: 'p',
          children: [{ text: '' }]
        }
      ]);
    }
    
    // Set product specifications - ExistingProduct has specification as a simple string field
    if (existingProduct.specification && existingProduct.specification.trim()) {
      // Try to parse as JSON first, if it fails, treat as plain text
      try {
        const specData = JSON.parse(existingProduct.specification);
        if (Array.isArray(specData) && specData.length > 0) {
          const productSpecificationList = specData.map((item: any) => ({
            label: item.label || "",
            specification: item.specification || ""
          }));
          form.setValue("productSpecificationList", productSpecificationList);
        } else {
          // If it's not an array, create a single specification entry
          form.setValue("productSpecificationList", [
            {
              label: "Specification",
              specification: existingProduct.specification
            }
          ]);
        }
      } catch (e) {
        // If parsing fails, treat as plain text
        form.setValue("productSpecificationList", [
          {
            label: "Specification",
            specification: existingProduct.specification
          }
        ]);
      }
    } else {
      // Default empty specification
      form.setValue("productSpecificationList", [
        {
          label: "",
          specification: ""
        }
      ]);
    }
    
    // Set product short descriptions - ExistingProduct has shortDescription as a simple string field
    if (existingProduct.shortDescription && existingProduct.shortDescription.trim()) {
      // Try to parse as JSON first, if it fails, treat as plain text
      try {
        const shortDescData = JSON.parse(existingProduct.shortDescription);
        if (Array.isArray(shortDescData) && shortDescData.length > 0) {
          const productShortDescriptionList = shortDescData.map((item: any) => ({
            shortDescription: item.shortDescription || ""
          }));
          form.setValue("productShortDescriptionList", productShortDescriptionList);
        } else {
          // If it's not an array, create a single short description entry
          form.setValue("productShortDescriptionList", [
            {
              shortDescription: existingProduct.shortDescription
            }
          ]);
        }
      } catch (e) {
        // If parsing fails, treat as plain text
        form.setValue("productShortDescriptionList", [
          {
            shortDescription: existingProduct.shortDescription
          }
        ]);
      }
    } else {
      // Default empty short description
      form.setValue("productShortDescriptionList", [
        {
          shortDescription: ""
        }
      ]);
    }
    
    form.setValue("shortDescription", existingProduct.shortDescription);
    form.setValue("barcode", existingProduct.barcode);
    form.setValue("placeOfOriginId", existingProduct.placeOfOriginId);
    form.setValue("productType", existingProduct.productType);
    form.setValue("typeProduct", existingProduct.typeProduct);
    
    console.log('=== FORM POPULATION COMPLETE ===');
  };

  const onSubmit = async (formData: any) => {
    // Get the current user ID from the current account for debugging
    const currentUserId = currentAccount?.data?.account?.id;
    
    if (!currentUserId) {
      toast({
        title: t("error"),
        description: "Unable to determine current account. Please try switching accounts and try again.",
        variant: "danger",
      });
      return;
    }

    console.log('Creating product with current user ID:', currentUserId);
    console.log('Current account data:', currentAccount?.data?.account);
    
    // Debug JWT token
    const token = getCookie(PUREMOON_TOKEN_KEY);
    console.log('JWT Token exists:', !!token);
    console.log('JWT Token length:', token ? token.length : 0);

    const updatedFormData = {
      ...formData,
      productType:
        activeProductType === "R" ? "R" : activeProductType === "F" ? "F" : "P",
      status:
        activeProductType === "R" || activeProductType === "F"
          ? "ACTIVE"
          : "INACTIVE",
    };

    updatedFormData.productImagesList = [];

    if (watchProductImages.length) {
      const fileTypeArrays = watchProductImages.filter(
        (item: any) => typeof item.path === "object",
      );

      const imageUrlArray: any = fileTypeArrays?.length
        ? await handleUploadedFile(fileTypeArrays)
        : [];

      updatedFormData.productImages = [
        ...watchProductImages.filter(
          (item: any) => typeof item.path === "string",
        )
        .map((item: any) => item.path),
        ...imageUrlArray
      ];

      if (updatedFormData.productImages.length) {
        updatedFormData.productImagesList = updatedFormData.productImages.map(
          (item: string) => {
            const extension = item.split(".").pop()?.toLowerCase();

            if (extension) {
              if (videoExtensions.includes(extension)) {
                const videoName: string = item.split("/").pop()!;
                return { video: item, videoName };
              } else if (imageExtensions.includes(extension)) {
                const imageName: string = item.split("/").pop()!;
                return { image: item, imageName };
              }
            }

            return { image: item, imageName: item };
          },
        );
      }
    }
    const randomSkuNo = generateRandomSkuNoWithTimeStamp().toString();

    delete updatedFormData.productImages;
    updatedFormData.productPriceList = [
      {
        ...(activeProductType !== "R" && updatedFormData.productPriceList[0]),
        askForStock: updatedFormData.isStockRequired ? "true" : "false",
        askForPrice: updatedFormData.isOfferPriceRequired ? "true" : "false",
        isCustomProduct: updatedFormData.isCustomProduct ? "true" : "false",
        productPrice: updatedFormData.isOfferPriceRequired
          ? 0
          : activeProductType === "R"
            ? (updatedFormData.offerPrice ?? 0)
            : (updatedFormData.productPrice ?? 0),
        offerPrice: updatedFormData.isOfferPriceRequired
          ? 0
          : activeProductType === "R"
            ? (updatedFormData.offerPrice ?? 0)
            : (updatedFormData.productPrice ?? 0),
        stock: updatedFormData.isStockRequired
          ? 0
          : updatedFormData.productPriceList?.[0]?.stock
            ? updatedFormData.productPriceList[0].stock
            : 0,
        productCountryId: updatedFormData.productCountryId,
        productStateId: updatedFormData.productStateId,
        productCityId: updatedFormData.productCityId,
        productCondition: updatedFormData.productCondition,
        productTown: updatedFormData.productTown,
        productLatLng: updatedFormData.productLatLng,
        sellCountryIds: updatedFormData.sellCountryIds,
        sellStateIds: updatedFormData.sellStateIds,
        sellCityIds: updatedFormData.sellCityIds,
        status:
          activeProductType === "R"
            ? updatedFormData.offerPrice || updatedFormData.isOfferPriceRequired
              ? "ACTIVE"
              : "INACTIVE"
            : updatedFormData.productPrice ||
              updatedFormData.isOfferPriceRequired
              ? "ACTIVE"
              : "INACTIVE",
      },
    ];

    if (activeProductType === "R") {
      updatedFormData.productPriceList[0] = {
        consumerType: "",
        sellType: "",
        consumerDiscount: 0,
        vendorDiscount: 0,
        consumerDiscountType: "",
        vendorDiscountType: "",
        minCustomer: 0,
        maxCustomer: 0,
        minQuantityPerCustomer: 0,
        maxQuantityPerCustomer: 0,
        minQuantity: 0,
        maxQuantity: 0,
        timeOpen: 0,
        timeClose: 0,
        deliveryAfter: 0,
        stock: 0,
        askForStock: updatedFormData.isStockRequired ? "true" : undefined,
        askForPrice: updatedFormData.isOfferPriceRequired ? "true" : undefined,
        ...updatedFormData.productPriceList[0],
      };
      delete updatedFormData.productPriceList[0].productCountryId;
      delete updatedFormData.productPriceList[0].productStateId;
      delete updatedFormData.productPriceList[0].productCityId;
      delete updatedFormData.productPriceList[0].productTown;
      delete updatedFormData.productPriceList[0].productLatLng;
      delete updatedFormData.productPriceList[0].sellCountryIds;
      delete updatedFormData.productPriceList[0].sellStateIds;
      delete updatedFormData.productPriceList[0].sellCityIds;
    }

    if (updatedFormData.productPriceList?.[0]?.sellType == "NORMALSELL") {
      updatedFormData.productPriceList[0].menuId = STORE_MENU_ID;
    }
    if (updatedFormData.productPriceList?.[0]?.sellType == "BUYGROUP") {
      updatedFormData.productPriceList[0].menuId = BUYGROUP_MENU_ID;
    }
    if (updatedFormData.isCustomProduct) {
      updatedFormData.productPriceList[0].menuId = FACTORIES_MENU_ID;
    }
    if (activeProductType == "R") {
      updatedFormData.productPriceList[0].menuId = RFQ_MENU_ID;
    }

    // delete updatedFormData.productLocationId;
    delete updatedFormData.productCountryId;
    delete updatedFormData.productStateId;
    delete updatedFormData.productCityId;
    delete updatedFormData.productTown;
    delete updatedFormData.productLatLng;
    delete updatedFormData.sellCountryIds;
    delete updatedFormData.sellStateIds;
    delete updatedFormData.sellCityIds;

    delete updatedFormData.setUpPrice;
    delete updatedFormData.productCondition;

    delete updatedFormData.isStockRequired;
    delete updatedFormData.isOfferPriceRequired;

    updatedFormData.skuNo = randomSkuNo;
    updatedFormData.offerPrice =
      activeProductType === "R"
        ? (updatedFormData.offerPrice ?? 0)
        : (updatedFormData.productPrice ?? 0);
    updatedFormData.productPrice =
      activeProductType === "R"
        ? (updatedFormData.offerPrice ?? 0)
        : (updatedFormData.productPrice ?? 0);

    // Add existingProductId if creating from existing product
    if (productId && searchParams?.get('copy')) {
      updatedFormData.existingProductId = parseInt(productId);
      console.log('Adding existingProductId to payload:', parseInt(productId));
    }

    // TODO: category input field change
    if (updatedFormData.categoryId === 0) {
      toast({
        title: t("product_create_failed"),
        description: t("please_select_category"),
        variant: "danger",
      });
      return;
    }

    (updatedFormData.description = updatedFormData?.descriptionJson
      ? JSON.stringify(updatedFormData?.descriptionJson)
      : ""),
      delete updatedFormData.descriptionJson;

    // Process short descriptions for backend
    if (updatedFormData.productShortDescriptionList?.length > 0) {
      // Filter out empty short descriptions
      const validShortDescriptions = updatedFormData.productShortDescriptionList
        .filter((item: any) => item.shortDescription && item.shortDescription.trim())
        .map((item: any) => ({
          shortDescription: item.shortDescription.trim()
        }));
      
      if (validShortDescriptions.length > 0) {
        updatedFormData.productShortDescriptionList = validShortDescriptions;
        // Also set the first short description as the main shortDescription field
        updatedFormData.shortDescription = validShortDescriptions[0].shortDescription;
      } else {
        delete updatedFormData.productShortDescriptionList;
        updatedFormData.shortDescription = "";
      }
    } else {
      updatedFormData.shortDescription = "";
    }

    // Process specifications for backend
    if (updatedFormData.productSpecificationList?.length > 0) {
      // Filter out empty specifications
      const validSpecifications = updatedFormData.productSpecificationList
        .filter((item: any) => item.label && item.label.trim() && item.specification && item.specification.trim())
        .map((item: any) => ({
          label: item.label.trim(),
          specification: item.specification.trim()
        }));
      
      if (validSpecifications.length > 0) {
        updatedFormData.productSpecificationList = validSpecifications;
      } else {
        delete updatedFormData.productSpecificationList;
      }
    }

    updatedFormData.productVariant = [];
    for (let productVariant of updatedFormData.productVariants) {
      if (productVariant.type) {
        for (let variant of productVariant.variants) {
          if (variant.value) {
            updatedFormData.productVariant.push({
              type: productVariant.type,
              value: variant.value
            })
          } 
        }
      }
    }

    let productVariantImages = [];
    for (let productVariant of updatedFormData.productVariants) {
      if (productVariant.type) {
        for (let variant of productVariant.variants) {
          if (variant.image && variant.value) {
            productVariantImages.push({ 
              path: variant.image,
              id: productVariant.type + '-' + variant.value,
            });
          }
        }
      }
    }

    if (productVariantImages.length > 0) {
      const productVariantImagesArray = await handleUploadedFile(
        productVariantImages.filter((item: any) => typeof item.path === 'object')
      );
      let updatedProductVariantImagesArray: any[] = [];
      let i = 0;
      productVariantImages.forEach((item: any) => {
        if (typeof item.path === 'object') {
          updatedProductVariantImagesArray.push(
            productVariantImagesArray ? productVariantImagesArray[i] : null
          );
          i++;
        } else {
          updatedProductVariantImagesArray.push(item.path);
        }
      })
      if (updatedProductVariantImagesArray.length) {
        productVariantImages = productVariantImages.map((image: any, index: number) => {
          image.url = updatedProductVariantImagesArray[index];
          return image;
        });

        for (let productVariant of updatedFormData.productVariants) {
          if (productVariant.type) {
            for (let variant of productVariant.variants) {
              if (variant.image && variant.value) {
                let variantImage = productVariantImages.find(
                  (image: any) => image.id == `${productVariant.type}-${variant.value}`
                );
                if (variantImage) {
                  const url = variantImage.url;
                  const extension = url.split(".").pop()?.toLowerCase();

                  if (extension) {
                    if (imageExtensions.includes(extension)) {
                      const imageName: string = url.split("/").pop()!;
                      updatedFormData.productImagesList.push({
                        image: url,
                        imageName,
                        variant: {
                          type: productVariant.type,
                          value: variant.value,
                        },
                      });
                    } else {
                      updatedFormData.productImagesList.push({
                        image: url,
                        imageName: url,
                        variant: {
                          type: productVariant.type,
                          value: variant.value,
                        },
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    delete updatedFormData.productVariants;

    if (productQueryById?.data?.data && searchParams?.get('copy') && updatedFormData.productName.trim() == productQueryById?.data?.data?.productName.trim()) {
      updatedFormData.status = "ACTIVE";
    }

    console.log('=== FINAL FORM DATA BEING SENT TO BACKEND ===');
    console.log('updatedFormData:', updatedFormData);
    console.log('productShortDescriptionList:', updatedFormData.productShortDescriptionList);
    console.log('productSpecificationList:', updatedFormData.productSpecificationList);
    console.log('shortDescription:', updatedFormData.shortDescription);
    
    const response = await createProduct.mutateAsync(updatedFormData);

    if (response.status && response.data) {
      toast({
        title: t("product_create_successful"),
        description: response.message,
        variant: "success",
      });
      form.reset();
      if (activeProductType === "R") {
        router.push("/rfq");
      } else if (activeProductType === "F") {
        router.push("/factories");
      } else {
        router.push("/manage-products");
      }
    } else {
      toast({
        title: t("product_create_failed"),
        description: response.message,
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (!watchSetUpPrice) {
      form.setValue("productPrice", 0);
      form.setValue("offerPrice", 0);
      form.setValue("productPriceList", [
        {
          consumerType: "",
          sellType: "",
          consumerDiscount: 0,
          vendorDiscount: 0,
          consumerDiscountType: "",
          vendorDiscountType: "",
          minCustomer: 0,
          maxCustomer: 0,
          minQuantityPerCustomer: 0,
          maxQuantityPerCustomer: 0,
          minQuantity: 0,
          maxQuantity: 0,
          dateOpen: "",
          dateClose: "",
          timeOpen: 0,
          timeClose: 0,
          startTime: "",
          endTime: "",
          deliveryAfter: 0,
          stock: 0,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSetUpPrice, form.setValue]);

  useEffect(() => {
    if (activeProductType == "R") {
      form.setValue("typeOfProduct", "BRAND")
    }
  }, [activeProductType]);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let activeProductType = params.get("productType");

    if (activeProductType) {
      setActiveProductType(activeProductType);
    }
  }, []);

  return (
    <>
      <section className="relative w-full py-7">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <Image
            src={BackgroundImage}
            className="h-full w-full object-cover object-center"
            alt="background"
            fill
            priority
          />
        </div>
        <div className="container relative z-10 m-auto mx-auto max-w-[950px] px-3">
          <div className="flex flex-wrap">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <BasicInformationSection
                  tagsList={memoizedTags}
                  activeProductType={activeProductType}
                  selectedCategoryIds={selectedCategoryIds}
                  copy={searchParams?.get('copy') && productQueryById?.data?.data ? true : false}
                />

                {/* <ProductDetailsSection /> */}

                <div className="grid w-full grid-cols-4 gap-x-5">
                  <div className="col-span-4 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-2 shadow-sm sm:p-3 lg:p-4">
                    <div className="form-groups-common-sec-s1">
                      <DescriptionAndSpecificationSection />
                      <div className="mb-4 mt-4 inline-flex w-full items-center justify-end gap-2">
                        <button
                          className="rounded-sm bg-transparent px-2 py-2 text-sm font-bold leading-6 text-[#7F818D] md:px-4 md:py-4 md:text-lg"
                          dir={langDir}
                          translate="no"
                        >
                          {t("save_as_draft")}
                        </button>

                        <Button
                          disabled={
                            createProduct.isPending || uploadMultiple.isPending
                          }
                          type="submit"
                          className="h-10 rounded bg-dark-orange px-6 text-center text-sm font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90 md:h-12 md:px-10 md:text-lg"
                          dir={langDir}
                          translate="no"
                        >
                          {createProduct.isPending ||
                            uploadMultiple.isPending ? (
                            <LoaderWithMessage message={t("please_wait")} />
                          ) : (
                            t("continue")
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CreateProductPage;
