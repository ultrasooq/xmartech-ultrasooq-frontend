import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";
import {
  // useAddRfqProduct,
  // useRfqProductById,
  useUpdateRfqProduct,
} from "@/apis/queries/rfq.queries";
import { Input } from "@/components/ui/input";
import AddImageContent from "../profile/AddImageContent";
import { v4 as uuidv4 } from "uuid";
import { useUploadMultipleFile } from "@/apis/queries/upload.queries";
import { useQueryClient } from "@tanstack/react-query";
import { useProductById } from "@/apis/queries/product.queries";

type AddToRfqFormProps = {
  onClose: () => void;
  selectedProductId?: number;
};

const formSchema = z.object({
  note: z
    .string()
    .trim()
    .min(2, {
      message: "Description is required",
    })
    .max(100, {
      message: "Description must be less than 100 characters",
    }),
  rfqProductImagesList: z.any().optional(),
});

const AddToRfqForm: React.FC<AddToRfqFormProps> = ({
  onClose,
  selectedProductId,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      rfqProductImagesList: undefined,
      productImages: [] as { path: File; id: string }[],
    },
  });
  const photosRef = useRef<HTMLInputElement>(null);

  const watchProductImages = form.watch("productImages");

  const uploadMultiple = useUploadMultipleFile();
  // const addRfqProduct = useAddRfqProduct();
  const updateRfqProduct = useUpdateRfqProduct();
  // const rfqProductById = useRfqProductById(
  //   selectedProductId ? selectedProductId.toString() : "",
  //   !!selectedProductId,
  // );
  const productQueryById = useProductById(
    {
      productId: selectedProductId ? selectedProductId.toString() : "",
    },
    !!selectedProductId,
  );

  const handleEditPreviewImage = (id: string, item: FileList) => {
    const tempArr = watchProductImages || [];
    const filteredFormItem = tempArr.filter((item: any) => item?.id === id);
    if (filteredFormItem.length) {
      filteredFormItem[0].path = item[0];
      form.setValue("productImages", [...tempArr]);
    }
  };

  const handleRemovePreviewImage = (id: string) => {
    form.setValue("productImages", [
      ...(watchProductImages || []).filter((item: any) => item?.id !== id),
    ]);
  };

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
    const updatedFormData = { ...formData };
    // if (watchProductImages.length) {
    //   const fileTypeArrays = watchProductImages.filter(
    //     (item: any) => typeof item.path === "object",
    //   );

    //   const imageUrlArray: any = fileTypeArrays?.length
    //     ? await handleUploadedFile(fileTypeArrays)
    //     : [];

    //   const stringTypeArrays = watchProductImages
    //     .filter((item: any) => typeof item.path !== "object")
    //     .map((item: any) => ({ image: item?.path, imageName: item?.path }));

    //   const formattedimageUrlArrays = imageUrlArray?.map((item: any) => ({
    //     image: item,
    //     imageName: item,
    //   }));

    //   updatedFormData.productImages = [
    //     ...stringTypeArrays,
    //     ...formattedimageUrlArrays,
    //   ];

    //   if (updatedFormData.productImages.length) {
    //     updatedFormData.rfqProductImagesList =
    //       updatedFormData.productImages.map((item: any) => ({
    //         image: item?.image,
    //         imageName: item?.imageName,
    //       }));
    //   }
    // }

    // console.log(updatedFormData);
    // return;
    // delete updatedFormData.productImages;
    // if (selectedProductId) {
    //   console.log({
    //     rFqProductId: selectedProductId,
    //     ...updatedFormData,
    //   });
    //   // return;
    //   const response = await updateRfqProduct.mutateAsync({
    //     rFqProductId: selectedProductId,
    //     ...updatedFormData,
    //   });
    //   if (response.status) {
    //     toast({
    //       title: "RFQ Product Update Successful",
    //       description: response.message,
    //       variant: "success",
    //     });
    //     form.reset();
    //     queryClient.invalidateQueries({
    //       queryKey: ["rfq-product-by-id", selectedProductId.toString()],
    //     });
    //     onClose();
    //   } else {
    //     toast({
    //       title: "RFQ Product Update Failed",
    //       description: response.message,
    //       variant: "danger",
    //     });
    //   }
    // }
    // else {
    // add
    // console.log(updatedFormData);
    // return;
    //   const response = await addRfqProduct.mutateAsync(updatedFormData);
    //   if (response.status) {
    //     toast({
    //       title: "RFQ Product Add Successful",
    //       description: response.message,
    //       variant: "success",
    //     });
    //     form.reset();
    //     onClose();
    //   } else {
    //     toast({
    //       title: "RFQ Product Add Failed",
    //       description: response.message,
    //       variant: "danger",
    //     });
    //   }
    // }
  };

  useEffect(() => {
    if (productQueryById?.data?.data) {
      const rfqProduct = productQueryById?.data?.data;

      const productImages = rfqProduct?.rfqProductImage?.length
        ? rfqProduct?.rfqProductImage?.map((item: any) => {
            return {
              path: item?.image,
              id: uuidv4(),
            };
          })
        : [];

      const productImagesList = rfqProduct?.rfqProductImage
        ? rfqProduct?.rfqProductImage?.map((item: any) => {
            return {
              image: item?.imageName,
              imageName: item?.image,
            };
          })
        : undefined;

      form.reset({
        note: productQueryById?.data?.data?.note,
        productImages: productImages || [],
        rfqProductImagesList: productImagesList || undefined,
      });
    }
  }, [selectedProductId, productQueryById?.data]);

  // console.log(form.formState.errors);
  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          {`${selectedProductId ? "Edit" : "Add"} New Product in RFQ List`}
        </DialogTitle>
        <Button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 !bg-white !text-black shadow-none"
        >
          <IoCloseSharp size={20} />
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form px-5 pb-5 pt-3"
        >
          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-color-dark">
                Product Image
              </label>
              <div className="flex w-full flex-wrap">
                <div className="grid grid-cols-3">
                  {watchProductImages?.map((item: any, index: number) => (
                    <FormField
                      control={form.control}
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

                            form.setValue(
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

              <p className="text-[13px] !text-red-500">
                {!watchProductImages?.length
                  ? form.formState.errors?.productImages?.message
                  : ""}
              </p>
            </div>
          </div>

          <ControlledTextareaInput
            label="Write a Note"
            name="note"
            placeholder="Write here..."
            rows={6}
          />

          <Button
            disabled={uploadMultiple.isPending}
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            {uploadMultiple.isPending ? (
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
            ) : (
              `${selectedProductId ? "Edit" : "Add"} New Product in RFQ List`
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddToRfqForm;
