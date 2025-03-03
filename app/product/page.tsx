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
import { useCreateProduct } from "@/apis/queries/product.queries";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUploadMultipleFile } from "@/apis/queries/upload.queries";
import { imageExtensions, videoExtensions } from "@/utils/constants";
import BackgroundImage from "@/public/images/before-login-bg.png";
import { generateRandomSkuNoWithTimeStamp } from "@/utils/helper";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";

const baseProductPriceItemSchema = z.object({
  consumerType: z.string().trim().optional(),
  sellType: z.string().trim().optional(),
  consumerDiscount: z.coerce.number().optional(),
  vendorDiscount: z.coerce.number().optional(),
  consumerDiscountType: z.coerce.string().optional(),
  vendorDiscountType: z.coerce.string().optional(),
  minCustomer: z.coerce.number().optional(),
  maxCustomer: z.coerce.number().optional(),
  minQuantityPerCustomer: z.coerce.number().optional(),
  maxQuantityPerCustomer: z.coerce.number().optional(),
  minQuantity: z.coerce.number().optional(),
  maxQuantity: z.coerce.number().optional(),
  dateOpen: z.coerce.string().optional(),
  dateClose: z.coerce.string().optional(),
  startTime: z.coerce.string().optional(),
  endTime: z.coerce.string().optional(),
  timeOpen: z.coerce.number().optional(),
  timeClose: z.coerce.number().optional(),
  deliveryAfter: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
});

const productPriceItemSchemaWhenSetUpPriceTrue = baseProductPriceItemSchema
  .extend({
    consumerType: z
      .string()
      .trim()
      .min(1, { message: "Consumer Type is required" }),
    sellType: z.string().trim().min(1, { message: "Sell Type is required" }),
    consumerDiscount: z.coerce
      .number()
      .max(100, { message: "Consumer Discount must be less than 100" }),
    vendorDiscount: z.coerce
      .number()
      .max(100, { message: "Vendor Discount must be less than 100" }),
    deliveryAfter: z.coerce
      .number()
      .min(1, { message: "Delivery After is required" }),
  })
  .refine(
    ({ minQuantity, maxQuantity }) =>
      (!minQuantity || minQuantity) <= (!maxQuantity || maxQuantity),
    {
      message: "Min Quantity must be less than or equal to Max Quantity",
      path: ["minQuantity"],
    },
  )
  .refine(
    ({ minQuantityPerCustomer, maxQuantityPerCustomer }) =>
      (!minQuantityPerCustomer || minQuantityPerCustomer) <=
      (!maxQuantityPerCustomer || maxQuantityPerCustomer),
    {
      message:
        "Min Quantity Per Customer must be less than or equal to Max Quantity Per Customer",
      path: ["minQuantityPerCustomer"],
    },
  )
  .refine(
    ({ minCustomer, maxCustomer }) =>
      (!minCustomer || minCustomer) <= (!maxCustomer || maxCustomer),
    {
      message: "Min Customer must be less than or equal to Max Customer",
      path: ["minCustomer"],
    },
  )
  // .refine(({ timeOpen, timeClose }) => (!timeOpen || timeOpen) <= (!timeClose || timeClose), {
  //   message: "Open Time must be less than or equal to Close Time",
  //   path: ["timeOpen"],
  // },)
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
          message: "Quantity Per Customer is required",
          path: ["minQuantityPerCustomer"],
        });
      }
      if (!maxQuantityPerCustomer) {
        ctx.addIssue({
          code: "custom",
          message: "Quantity Per Customer is required",
          path: ["maxQuantityPerCustomer"],
        });
      }
    }
    if (sellType === "BUYGROUP") {
      if (!minQuantity) {
        ctx.addIssue({
          code: "custom",
          message: "Min Quantity is required",
          path: ["minQuantity"],
        });
      }
    }
    if (sellType === "BUYGROUP") {
      if (!maxQuantity) {
        ctx.addIssue({
          code: "custom",
          message: "Max Quantity is required",
          path: ["maxQuantity"],
        });
      }
    }
    if (sellType === "BUYGROUP") {
      if (!minCustomer) {
        ctx.addIssue({
          code: "custom",
          message: "Min Customer is required",
          path: ["minCustomer"],
        });
      }
    }
    if (sellType === "BUYGROUP") {
      if (!maxCustomer) {
        ctx.addIssue({
          code: "custom",
          message: "Max Customer is required",
          path: ["maxCustomer"],
        });
      }
    }
    // if (sellType === "BUYGROUP") {
    //   if (!startTime) {
    //     ctx.addIssue({ code: "custom", message: "Time Open is required", path: ["startTime"], });
    //   }
    // }
    // if (sellType === "BUYGROUP") {
    //   if (!endTime) {
    //     ctx.addIssue({ code: "custom", message: "Time Close is required", path: ["endTime"], });
    //   }
    // }
  });

const formSchemaForTypeP = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2, { message: "Product Name is required" })
      .max(50, { message: "Product Name must be less than 50 characters" }),
    categoryId: z.number().optional(),
    categoryLocation: z.string().trim().optional(),
    typeOfProduct: z
      .string({
        required_error: "Provide you product type",
        message: "Provide you product type",
      })
      .trim(),
    brandId: z.number().min(1, { message: "Brand is required" }),
    // productLocationId: z.number().min(1, { message: "Product Location is required" }),
    productCountryId: z
      .number()
      .min(1, { message: "Product Country is required" }),
    productStateId: z.number().min(1, { message: "Product State is required" }),
    productCityId: z.number().min(1, { message: "Product City is required" }),
    productTown: z.string().trim().optional(),
    productLatLng: z.string().trim().optional(),
    sellCountryIds: z.any().optional(),
    sellStateIds: z.any().optional(),
    sellCityIds: z.any().optional(),
    skuNo: z.string().trim().optional(),
    productCondition: z
      .string()
      .trim()
      .min(1, { message: "Product Condition is required" }),
    productTagList: z
      .array(
        z.object({
          label: z.string().trim(),
          value: z.number(),
        }),
      )
      .min(1, { message: "Tag is required" })
      .transform((value) => value.map((item) => ({ tagId: item.value }))),
    productImagesList: z.any().optional(),
    productPrice: z.coerce.number().optional(),
    offerPrice: z.coerce.number().optional(),
    placeOfOriginId: z
      .number()
      .min(1, { message: "Place of Origin is required" }),
    productShortDescriptionList: z.array(
      z.object({
        shortDescription: z
          .string()
          .trim()
          .min(2, { message: "Short Description is required" })
          .max(20, {
            message: "Short Description must be less than 20 characters",
          }),
      }),
    ),
    productSpecificationList: z.array(
      z.object({
        label: z
          .string()
          .trim()
          .min(2, { message: "Label is required" })
          .max(20, { message: "Label must be less than 20 characters" }),
        specification: z
          .string()
          .trim()
          .min(2, { message: "Specification is required" })
          .max(20, {
            message: "Specification must be less than 20 characters",
          }),
      }),
    ),
    description: z.string().trim().optional(),
    descriptionJson: z.array(z.any()).optional(),
    productPriceList: z.array(baseProductPriceItemSchema).optional(),
    setUpPrice: z.boolean(),
    isStockRequired: z.boolean().optional(),
    isOfferPriceRequired: z.boolean().optional(),
    isCustomProduct: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.setUpPrice) {
      const result = z
        .array(productPriceItemSchemaWhenSetUpPriceTrue)
        .safeParse(data.productPriceList);

      if (!result.success) {
        result.error.issues.forEach((issue) => ctx.addIssue(issue));
      }

      // if (data.productPrice === 0) {
      //   ctx.addIssue({
      //     code: "custom",
      //     message: "Product Price is required",
      //     path: ["productPrice"],
      //   });
      // }
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

const formSchemaForTypeR = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2, { message: "Product Name is required" })
      .max(50, { message: "Product Name must be less than 50 characters" }),
    categoryId: z.number().optional(),
    categoryLocation: z.string().trim().optional(),
    typeOfProduct: z
      .string({
        required_error: "Provide you product type",
        message: "Provide you product type",
      })
      .trim(),
    brandId: z.number().min(1, { message: "Brand is required" }),
    productCondition: z
      .string()
      .trim()
      .min(1, { message: "Product Condition is required" }),
    productTagList: z
      .array(
        z.object({
          label: z.string().trim(),
          value: z.number(),
        }),
      )
      .min(1, { message: "Tag is required" })
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
      .min(1, { message: "Place of Origin is required" }),
    productShortDescriptionList: z.array(
      z.object({
        shortDescription: z
          .string()
          .trim()
          .min(2, { message: "Short Description is required" })
          .max(20, {
            message: "Short Description must be less than 20 characters",
          }),
      }),
    ),
    productSpecificationList: z.array(
      z.object({
        label: z
          .string()
          .trim()
          .min(2, { message: "Label is required" })
          .max(20, { message: "Label must be less than 20 characters" }),
        specification: z
          .string()
          .trim()
          .min(2, { message: "Specification is required" })
          .max(20, {
            message: "Specification must be less than 20 characters",
          }),
      }),
    ),
    description: z.string().trim().optional(),
    descriptionJson: z.array(z.any()).optional(),
    setUpPrice: z.boolean(),
    isStockRequired: z.boolean().optional(),
    isOfferPriceRequired: z.boolean().optional(),
    isCustomProduct: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.setUpPrice) {
      // if (data.offerPrice === 0) {
      //   ctx.addIssue({
      //     code: "custom",
      //     message: "Offer Price is required",
      //     path: ["offerPrice"],
      //   });
      // }
    }
  });

const defaultValues = {
  productName: "",
  categoryId: 0,
  categoryLocation: "",
  typeOfProduct: "",
  brandId: 0,
  skuNo: "",
  productCondition: "",
  productTagList: undefined,
  productImagesList: undefined,
  productPrice: 0,
  offerPrice: 0,
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
  ],
  setUpPrice: true,
  isStockRequired: false,
  isOfferPriceRequired: false,
  isCustomProduct: false,
};

const CreateProductPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [activeProductType, setActiveProductType] = useState<string>();
  const form = useForm({
    resolver: zodResolver(
      activeProductType === "R" ? formSchemaForTypeR : formSchemaForTypeP,
    ),
    defaultValues,
  });

  const uploadMultiple = useUploadMultipleFile();
  const tagsQuery = useTags();
  const createProduct = useCreateProduct();
  const watchProductImages = form.watch("productImages");
  const watchSetUpPrice = form.watch("setUpPrice");

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

  const onSubmit = async (formData: any) => {
    // console.log(formData)
    // return
    const updatedFormData = {
      ...formData,
      productType:
        activeProductType === "R" ? "R" : activeProductType === "F" ? "F" : "P",
      status:
        activeProductType === "R" || activeProductType === "F"
          ? "ACTIVE"
          : "INACTIVE",
    };

    if (watchProductImages.length) {
      const fileTypeArrays = watchProductImages.filter(
        (item: any) => typeof item.path === "object",
      );

      const imageUrlArray: any = fileTypeArrays?.length
        ? await handleUploadedFile(fileTypeArrays)
        : [];

      updatedFormData.productImages = [...imageUrlArray];

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
        // productLocationId: updatedFormData.productLocationId,
        productCountryId: updatedFormData.productCountryId,
        productStateId: updatedFormData.productStateId,
        productCityId: updatedFormData.productCityId,
        productCondition: updatedFormData.productCondition,
        productTown: updatedFormData.productTown,
        productLatLng: updatedFormData.productLatLng,
        sellCountryIds: updatedFormData.sellCountryIds,
        sellStateIds: updatedFormData.sellStateIds,
        sellCityIds: updatedFormData.sellCityIds,
        // status:
        //   activeProductType !== "R" && updatedFormData.productPrice !== 0
        //     ? "ACTIVE"
        //     : activeProductType === "R" && updatedFormData.offerPrice !== 0
        //       ? "ACTIVE"
        //       : "INACTIVE",
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
      updatedFormData.productPriceList[0] = [
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
          timeOpen: 0,
          timeClose: 0,
          deliveryAfter: 0,
          stock: 0,
          askForStock: updatedFormData.isStockRequired ? "true" : undefined,
          askForPrice: updatedFormData.isOfferPriceRequired
            ? "true"
            : undefined,
          // status:
          //   updatedFormData.offerPrice || updatedFormData.isOfferPriceRequired
          //     ? "ACTIVE"
          //     : undefined,
          ...updatedFormData.productPriceList[0],
        },
      ];
      // delete updatedFormData.productPriceList[0].productLocationId;
      delete updatedFormData.productPriceList[0].productCountryId;
      delete updatedFormData.productPriceList[0].productStateId;
      delete updatedFormData.productPriceList[0].productCityId;
      delete updatedFormData.productPriceList[0].productTown;
      delete updatedFormData.productPriceList[0].productLatLng;
      delete updatedFormData.productPriceList[0].sellCountryIds;
      delete updatedFormData.productPriceList[0].sellStateIds;
      delete updatedFormData.productPriceList[0].sellCityIds;
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

    // TODO: category input field change
    if (updatedFormData.categoryId === 0) {
      toast({
        title: "Product Create Failed",
        description: "Please select category",
        variant: "danger",
      });
      return;
    }

    (updatedFormData.description = updatedFormData?.descriptionJson
      ? JSON.stringify(updatedFormData?.descriptionJson)
      : ""),
      delete updatedFormData.descriptionJson;

    // console.log("add:", updatedFormData);
    // return;
    const response = await createProduct.mutateAsync(updatedFormData);

    if (response.status && response.data) {
      toast({
        title: "Product Create Successful",
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
        title: "Product Create Failed",
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
                />

                {/* <ProductDetailsSection /> */}

                <div className="grid w-full grid-cols-4 gap-x-5">
                  <div className="col-span-4 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-2 shadow-sm sm:p-3 lg:p-4">
                    <div className="form-groups-common-sec-s1">
                      <DescriptionAndSpecificationSection />
                      <div className="mb-4 mt-4 inline-flex w-full items-center justify-end gap-2">
                        <button className="rounded-sm bg-transparent px-2 py-2 text-sm font-bold leading-6 text-[#7F818D] md:px-4 md:py-4 md:text-lg">
                          Save as Draft
                        </button>

                        <Button
                          disabled={
                            createProduct.isPending || uploadMultiple.isPending
                          }
                          type="submit"
                          className="h-10 rounded bg-dark-orange px-6 text-center text-sm font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90 md:h-12 md:px-10 md:text-lg"
                        >
                          {createProduct.isPending ||
                          uploadMultiple.isPending ? (
                            <LoaderWithMessage message="Please wait" />
                          ) : (
                            "Continue"
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
