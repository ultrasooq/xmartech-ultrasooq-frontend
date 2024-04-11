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
import SuggestedProductsListCard from "@/components/modules/createProduct/SuggestedProductsListCard";
import {
  useCreateProduct,
  useFetchProductById,
  useUpdateProduct,
} from "@/apis/queries/product.queries";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2, { message: "Product Name is required" })
      .max(50, { message: "Product Name must be less than 50 characters" }),
    categoryId: z
      .string()
      .trim()
      .min(1, { message: "Product Category is required" })
      .transform((value) => Number(value)),
    subCategoryId: z
      .string()
      .trim()
      .transform((value) => Number(value))
      .optional(),
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
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      categoryId: "",
      subCategoryId: "",
      brandId: "",
      skuNo: "",
      productTagList: undefined,
      productImagesList: undefined,
      productPrice: "",
      offerPrice: "",
      placeOfOriginId: "",
      description: "",
      specification: "",
      productImages: [
        {
          path: "",
          id: uuidv4(),
        },
      ],
    },
  });
  const [activeProductId, setActiveProductId] = useState<string | null>();

  const tagsQuery = useTags();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const productQueryById = useFetchProductById(
    activeProductId ? activeProductId : "",
    !!activeProductId,
  );

  const memoizedTags = useMemo(() => {
    return (
      tagsQuery?.data?.data.map((item: { id: string; tagName: string }) => {
        return { label: item.tagName, value: item.id };
      }) || []
    );
  }, [tagsQuery?.data]);

  const onSubmit = async (formData: any) => {
    if (form.getValues("productImages").length) {
      formData.productImagesList = form
        .getValues("productImages")
        .filter((item) => item.path !== "")
        .map((item) => ({
          imageName: item.id,
          image: item.path,
        }));
    }
    delete formData.productImages;
    if (formData.subCategoryId !== "") {
      formData.categoryId = formData.subCategoryId;
      delete formData.subCategoryId;
    }
    // console.log(formData);
    // return;
    if (activeProductId) {
      // edit
      const updatedFormData = {
        ...formData,
        productId: Number(activeProductId),
      };

      const response = await updateProduct.mutateAsync(updatedFormData);
      if (response.status && response.data) {
        toast({
          title: "Product Update Successful",
          description: response.message,
          variant: "success",
        });
        form.reset();

        queryClient.invalidateQueries({
          queryKey: ["product-by-id", activeProductId],
        });

        router.push("/product-list");
      } else {
        toast({
          title: "Product Update Failed",
          description: response.message,
          variant: "danger",
        });
      }
    } else {
      // add
      const response = await createProduct.mutateAsync(formData);
      if (response.status && response.data) {
        toast({
          title: "Product Create Successful",
          description: response.message,
          variant: "success",
        });
        form.reset();
        router.push("/product-list");
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
    const params = new URLSearchParams(document.location.search);
    let productId = params.get("productId");
    setActiveProductId(productId);
  }, []);

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
            return {
              path: item?.image,
              id: item?.imageName,
            };
          })
        : [
            {
              path: "",
              id: uuidv4(),
            },
          ];

      const productImagesList = product?.productImages
        ? product?.productImages?.map((item: any) => {
            return {
              imageName: item?.image,
              image: item?.imageName,
            };
          })
        : undefined;

      form.reset({
        productName: product?.productName,
        categoryId: product?.categoryId ? String(product?.categoryId) : "",
        brandId: product?.brandId ? String(product?.brandId) : "",
        skuNo: product?.skuNo,
        productTagList: productTagList || undefined,
        productImages: productImages || [
          {
            path: "",
            id: uuidv4(),
          },
        ],
        productImagesList: productImagesList || undefined,
        productPrice: product?.productPrice,
        offerPrice: product?.offerPrice,
        placeOfOriginId: product?.placeOfOriginId
          ? String(product?.placeOfOriginId)
          : "",
        description: product?.description,
        specification: product?.specification,
      });
    }
  }, [productQueryById?.data?.data]);

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
        <div className="relative z-10 m-auto w-full max-w-[1540px] px-4">
          <div className="flex flex-wrap">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-6"
              >
                <div className="grid w-full grid-cols-4 gap-x-5">
                  <div className="col-span-3 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
                    <BasicInformationSection tagsList={memoizedTags} />
                  </div>
                  <div className="col-span-1 w-full">
                    <SuggestedProductsListCard />
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
                          createProduct.isPending || updateProduct.isPending
                        }
                        type="submit"
                        className="h-12 rounded bg-dark-orange px-10 text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
                      >
                        {createProduct.isPending || updateProduct.isPending ? (
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
