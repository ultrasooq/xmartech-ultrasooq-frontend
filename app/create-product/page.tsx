"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTags } from "@/apis/queries/tags.queries";
import BasicInformationSection from "@/components/modules/createProduct/BasicInformationSection";
import ProductDetailsSection from "@/components/modules/createProduct/ProductDetailsSection";
import DescriptionAndSpecificationSection from "@/components/modules/createProduct/DescriptionAndSpecificationSection";
import Footer from "@/components/shared/Footer";
import {
  useCreateProduct,
  useProductById,
  useUpdateProduct,
} from "@/apis/queries/product.queries";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadMultipleFile } from "@/apis/queries/upload.queries";

const videoExtensions = ["mp4", "mkv", "avi", "mov", "wmv"];
const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];

const formSchema = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2, { message: "Product Name is required" })
      .max(50, { message: "Product Name must be less than 50 characters" }),
    categoryId: z.number().optional(),
    categoryLocation: z.string().trim().optional(),
    brandId: z
      .string()
      .trim()
      .min(1, { message: "Brand is required" })
      .max(50, { message: "Brand must be less than 50 characters" })
      .transform((value) => Number(value)),
    skuNo: z
      .string()
      .trim()
      .min(2, { message: "SKU No. is required" })
      .max(50, { message: "SKU No. must be less than 50 characters" }),
    productTagList: z
      .array(
        z.object({
          label: z.string().trim(),
          value: z.number(),
        }),
      )
      .min(1, {
        message: "Tag is required",
      })
      .transform((value) => {
        let temp: any = [];
        value.forEach((item) => {
          temp.push({ tagId: item.value });
        });
        return temp;
      }),
    productImagesList: z.any().optional(),
    productPrice: z
      .string()
      .trim()
      .min(1, { message: "Product Price is required" })
      .transform((value) => Number(value)),
    offerPrice: z
      .string()
      .trim()
      .min(1, { message: "Offer Price is required" })
      .transform((value) => Number(value)),
    placeOfOriginId: z
      .string()
      .trim()
      .min(1, { message: "Place of Origin is required" })
      .transform((value) => Number(value)),
    shortDescription: z.string().trim(),
    description: z.string().trim(),
    specification: z.string().trim(),
  })
  .superRefine(({ productPrice, offerPrice }, ctx) => {
    if (Number(productPrice) < Number(offerPrice)) {
      ctx.addIssue({
        code: "custom",
        message: "Offer Price must be less than Product Price",
        path: ["offerPrice"],
      });
    }
  });

const CreateProductPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const searchQuery = useSearchParams();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      categoryId: 0,
      categoryLocation: "",
      brandId: "",
      skuNo: "",
      productTagList: undefined,
      productImagesList: undefined,
      productPrice: "",
      offerPrice: "",
      placeOfOriginId: "",
      shortDescription: "",
      description: "",
      specification: "",
      productImages: [],
    },
  });

  const [activeProductId, setActiveProductId] = useState<string>();
  const [activeProductType, setActiveProductType] = useState<string>();

  const uploadMultiple = useUploadMultipleFile();
  const tagsQuery = useTags();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const productQueryById = useProductById(
    {
      productId: activeProductId ? activeProductId : "",
    },
    !!activeProductId,
  );
  const watchProductImages = form.watch("productImages");

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
    const updatedFormData = {
      ...formData,
      productType:
        activeProductId && activeProductType === "P"
          ? "R"
          : activeProductType
            ? "R"
            : "P",
      status: "ACTIVE",
    };
    if (watchProductImages.length) {
      const fileTypeArrays = watchProductImages.filter(
        (item: any) => typeof item.path === "object",
      );

      const imageUrlArray: any = fileTypeArrays?.length
        ? await handleUploadedFile(fileTypeArrays)
        : [];

      if (activeProductId) {
        // edit
        const stringTypeArrays = watchProductImages
          .filter((item: any) => typeof item.path !== "object")
          .map((item: any) => {
            const extension = item.path.split(".").pop()?.toLowerCase();

            if (extension) {
              if (videoExtensions.includes(extension)) {
                const videoName: string = item?.path.split("/").pop()!;
                return {
                  video: item?.path,
                  videoName,
                };
              } else if (imageExtensions.includes(extension)) {
                const imageName: string = item?.path.split("/").pop()!;
                return {
                  image: item?.path,
                  imageName,
                };
              }
            }
          });

        const formattedimageUrlArrays = imageUrlArray?.map((item: any) => {
          const extension = item.split(".").pop()?.toLowerCase();

          if (extension) {
            if (videoExtensions.includes(extension)) {
              const videoName: string = item.split("/").pop()!;
              return {
                video: item,
                videoName,
              };
            } else if (imageExtensions.includes(extension)) {
              const imageName: string = item.split("/").pop()!;
              return {
                image: item,
                imageName,
              };
            }
          }

          return {
            image: item,
            imageName: item,
          };
        });
        updatedFormData.productImages = [
          ...stringTypeArrays,
          ...formattedimageUrlArrays,
        ];

        if (updatedFormData.productImages.length) {
          updatedFormData.productImagesList = updatedFormData.productImages;
        }
      } else {
        // add
        updatedFormData.productImages = [...imageUrlArray];

        if (updatedFormData.productImages.length) {
          updatedFormData.productImagesList = updatedFormData.productImages.map(
            (item: string) => {
              const extension = item.split(".").pop()?.toLowerCase();

              if (extension) {
                if (videoExtensions.includes(extension)) {
                  const videoName: string = item.split("/").pop()!;
                  return {
                    video: item,
                    videoName,
                  };
                } else if (imageExtensions.includes(extension)) {
                  const imageName: string = item.split("/").pop()!;
                  return {
                    image: item,
                    imageName,
                  };
                }
              }

              return {
                image: item,
                imageName: item,
              };
            },
          );
        }
      }
    }

    delete updatedFormData.productImages;

    if (activeProductId) {
      // edit
      updatedFormData.productId = Number(activeProductId);
      console.log("edit:", updatedFormData);
      // return;
      const response = await updateProduct.mutateAsync(updatedFormData);
      if (response.status && response.data) {
        toast({
          title: "Product Update Successful",
          description: response.message,
          variant: "success",
        });
        form.reset();

        // queryClient.invalidateQueries({
        //   queryKey: ["product-by-id", activeProductId],
        // });
        productQueryById.refetch();

        if (activeProductType === "R") {
          router.push("/rfq");
        } else {
          router.push("/product-list");
        }
      } else {
        toast({
          title: "Product Update Failed",
          description: response.message,
          variant: "danger",
        });
      }
    } else {
      // add
      console.log("add:", updatedFormData);
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
        } else {
          router.push("/product-list");
        }
      } else {
        toast({
          title: "Product Create Failed",
          description: response.message,
          variant: "danger",
        });
      }
    }
  };

  useEffect(() => {
    if (productQueryById?.data?.data) {
      const product = productQueryById?.data?.data;

      const productTagList = product?.productTags
        ? product?.productTags?.map((item: any) => {
            return {
              label: item?.productTagsTag?.tagName,
              value: item?.productTagsTag?.id,
            };
          })
        : [];

      const productImages = product?.productImages?.length
        ? product?.productImages?.map((item: any) => {
            if (item?.image) {
              return {
                path: item?.image,
                id: uuidv4(),
              };
            } else if (item?.video) {
              return {
                path: item?.video,
                id: uuidv4(),
              };
            }
          })
        : [];

      const productImagesList = product?.productImages
        ? product?.productImages?.map((item: any) => {
            if (item?.video) {
              return {
                video: item?.video,
                videoName: item?.videoName,
              };
            } else if (item?.image) {
              return {
                image: item?.image,
                imageName: item?.imageName,
              };
            }
          })
        : undefined;

      form.reset({
        productName: product?.productName,
        categoryId: product?.categoryId ? product?.categoryId : 0,
        categoryLocation: product?.categoryLocation
          ? product?.categoryLocation
          : "",
        brandId: product?.brandId ? String(product?.brandId) : "",
        skuNo: product?.skuNo,
        productTagList: productTagList || undefined,
        productImages: productImages || [],
        productImagesList: productImagesList || undefined,
        productPrice: product?.productPrice,
        offerPrice: product?.offerPrice,
        placeOfOriginId: product?.placeOfOriginId
          ? String(product?.placeOfOriginId)
          : "",
        shortDescription: product?.shortDescription || "",
        description: product?.description,
        specification: product?.specification,
      });
    }
  }, [productQueryById?.data?.data]);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let activeProductId = params.get("productId");
    let activeProductType = params.get("productType");

    if (activeProductId) {
      setActiveProductId(activeProductId);
    }
    if (activeProductType) {
      setActiveProductType(activeProductType);
    }
  }, []);

  return (
    <>
      <section className="relative w-full py-7">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <Image
            src="/images/before-login-bg.png"
            className="h-full w-full object-cover object-center"
            alt="background"
            fill
            priority
          />
        </div>
        <div className="container relative z-10 m-auto px-3">
          <div className="flex flex-wrap">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="grid w-full grid-cols-4 gap-x-5">
                  <div className="col-span-4 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
                    <BasicInformationSection
                      tagsList={memoizedTags}
                      isEditable={!!form.getValues("categoryLocation")}
                    />
                  </div>
                </div>

                <ProductDetailsSection />

                <div className="grid w-full grid-cols-4 gap-x-5">
                  <div className="col-span-3 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
                    <DescriptionAndSpecificationSection />
                    <div className="mb-4 mt-4 inline-flex w-full items-center justify-end">
                      <button className="rounded-sm bg-transparent px-4 py-4 text-lg font-bold leading-6 text-[#7F818D]">
                        Save as Draft
                      </button>

                      <Button
                        disabled={
                          createProduct.isPending ||
                          updateProduct.isPending ||
                          uploadMultiple.isPending
                        }
                        type="submit"
                        className="h-12 rounded bg-dark-orange px-10 text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
                      >
                        {createProduct.isPending ||
                        updateProduct.isPending ||
                        uploadMultiple.isPending ? (
                          <>
                            <Image
                              src="/images/load.png"
                              alt="loader-icon"
                              width={20}
                              height={20}
                              className="mr-2 animate-spin"
                            />
                            Please wait
                          </>
                        ) : activeProductId ? (
                          "Update"
                        ) : (
                          "Continue"
                        )}
                      </Button>
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
