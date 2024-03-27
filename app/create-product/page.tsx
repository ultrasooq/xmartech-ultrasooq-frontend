"use client";
import React, { useMemo } from "react";
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
import { useCreateProduct } from "@/apis/queries/product.queries";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, { message: "Product Name is required" }),
  productCategory: z
    .string()
    .trim()
    .min(2, { message: "Product Category is required" }),
  productSubCategory: z
    .string()
    .trim()
    .min(2, { message: "Product Sub Category is required" }),
  brand: z
    .string()
    .trim()
    .min(2, { message: "Brand is required" })
    .max(50, { message: "Brand must be less than 50 characters" }),
  skuNo: z
    .string()
    .trim()
    .min(2, { message: "SKU No. is required" })
    .max(50, { message: "SKU No. must be less than 50 characters" }),
  tagList: z
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
  productPrice: z
    .string()
    .trim()
    .min(1, { message: "Product Price is required" }),
  offerPrice: z.string().trim().min(1, { message: "Offer Price is required" }),
  colorList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "Color is required",
    })
    .transform((value) => {
      let temp: any = [];
      value.forEach((item) => {
        temp.push({ tagId: item.value });
      });
      return temp;
    }),
  functionList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "Function is required",
    })
    .transform((value) => {
      let temp: any = [];
      value.forEach((item) => {
        temp.push({ tagId: item.value });
      });
      return temp;
    }),
  placeOfOrigin: z
    .string()
    .trim()
    .min(2, { message: "Place of Origin is required" })
    .max(50, { message: "Place of Origin must be less than 50 characters" }),
  // style: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Style is required" })
  //   .max(50, { message: "Style must be less than 50 characters" }),
  // batteryLife: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Battery Life is required" })
  //   .max(50, { message: "Battery Life must be less than 50 characters" }),
  // screen: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Screen is required" })
  //   .max(50, { message: "Screen must be less than 50 characters" }),
  // memorySize: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Memory Size is required" })
  //   .max(50, { message: "Memory Size must be less than 50 characters" }),
  // modelNumber: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Model No is required" })
  //   .max(50, { message: "Model No must be less than 50 characters" }),
  // brandName: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Brand Name is required" })
  //   .max(50, { message: "Brand Name must be less than 50 characters" }),
  // detailsAttribute: z
  //   .string()
  //   .trim()
  //   .min(2, { message: "Attribute is required" }),
  // detailsValue: z.string().trim().min(2, { message: "Value is required" }),
});

const CreateProductPage = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      productSubCategory: "",
      brand: "",
      skuNo: "",
      tagList: undefined,
      productPrice: "",
      offerPrice: "",
      colorList: undefined,
      functionList: undefined,
      placeOfOrigin: "",
      // style: "",
      // batteryLife: "",
      // screen: "",
      // memorySize: "",
      // modelNumber: "",
      // brandName: "",
      // detailsAttribute: "",
      // detailsValue: "",
      productImages: [
        {
          path: "",
          id: uuidv4(),
        },
      ],
    },
  });

  const tagsQuery = useTags();
  const createProduct = useCreateProduct();

  const memoizedTags = useMemo(() => {
    return (
      tagsQuery?.data?.data.map((item: { id: string; tagName: string }) => {
        return { label: item.tagName, value: item.id };
      }) || []
    );
  }, [tagsQuery?.data]);

  const onSubmit = async (formData: any) => {
    console.log(formData);

    return;
    const response = await createProduct.mutateAsync(formData);
    if (response.status && response.data) {
      toast({
        title: "Product Create Successful",
        description: response.message,
      });
      form.reset();
    } else {
      toast({
        title: "Product Create Failed",
        description: response.message,
      });
    }
  };

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
                className="w-full md:w-8/12 lg:w-9/12"
              >
                <div className="mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
                  <BasicInformationSection tagsList={memoizedTags} />
                </div>

                <div className="mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
                  <ProductDetailsSection tagsList={memoizedTags} />
                </div>

                <div className="mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
                  <DescriptionAndSpecificationSection />
                </div>
                <div className="mb-4 mt-4 inline-flex w-full items-center justify-end">
                  <button className="mt-3 rounded-sm bg-transparent px-4 py-4 text-lg font-bold leading-6 text-[#7F818D]">
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={createProduct.isPending}
                    className="mt-3 rounded-sm bg-dark-orange px-10 py-4 text-lg font-bold leading-6 text-white"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </Form>

            <div className="mb-12 w-full pl-3 md:w-4/12 lg:w-3/12">
              <SuggestedProductsListCard />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CreateProductPage;
