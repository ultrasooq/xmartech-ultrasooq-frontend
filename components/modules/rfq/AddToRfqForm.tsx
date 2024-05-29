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
import { Input } from "@/components/ui/input";
import AddImageContent from "../profile/AddImageContent";
import { v4 as uuidv4 } from "uuid";
import { useUploadMultipleFile } from "@/apis/queries/upload.queries";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateProduct,
  useProductById,
  useUpdateProduct,
} from "@/apis/queries/product.queries";
import {
  useAddProductDuplicateRfq,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import { imageExtensions, videoExtensions } from "@/utils/constants";
import ReactPlayer from "react-player/lazy";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { generateRandomSkuNoWithTimeStamp } from "@/utils/helper";

type AddToRfqFormProps = {
  onClose: () => void;
  selectedProductId?: number;
  selectedQuantity?: number;
};

const formSchema = z.object({
  offerPrice: z.coerce
    .number()
    .min(1, {
      message: "Offer price is required",
    })
    .max(1000000, {
      message: "Offer price must be less than 1000000",
    }),
  note: z
    .string()
    .trim()
    .min(2, {
      message: "Description is required",
    })
    .max(100, {
      message: "Description must be less than 100 characters",
    }),
  productImagesList: z.any().optional(),
});

const AddToRfqForm: React.FC<AddToRfqFormProps> = ({
  onClose,
  selectedProductId,
  selectedQuantity,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offerPrice: 0,
      note: "",
      productImagesList: undefined,
      productImages: [] as { path: File; id: string }[],
    },
  });
  const photosRef = useRef<HTMLInputElement>(null);

  const watchProductImages = form.watch("productImages");

  const uploadMultiple = useUploadMultipleFile();
  const createProduct = useCreateProduct();
  const addDuplicateProduct = useAddProductDuplicateRfq();
  const updateProduct = useUpdateProduct();
  const productQueryById = useProductById(
    {
      productId: selectedProductId ? selectedProductId.toString() : "",
    },
    !!selectedProductId,
  );
  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();

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

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    offerPrice: number,
  ) => {
    const response = await updateRfqCartWithLogin.mutateAsync({
      productId,
      quantity,
      offerPrice,
    });

    if (response.status) {
      toast({
        title: "Item added to cart",
        description: "Check your cart for more details",
        variant: "success",
      });
      form.reset();
      productQueryById.refetch();
      queryClient.invalidateQueries({
        queryKey: ["rfq-products"],
      });
      onClose();
    } else {
      toast({
        title: "Oops! Something went wrong",
        description: response.message,
        variant: "danger",
      });
    }
  };

  const onSubmit = async (formData: any) => {
    const updatedFormData = { ...formData };
    if (watchProductImages.length) {
      const fileTypeArrays = watchProductImages.filter(
        (item: any) => typeof item.path === "object",
      );

      const imageUrlArray: any = fileTypeArrays?.length
        ? await handleUploadedFile(fileTypeArrays)
        : [];

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
    }

    delete updatedFormData.productImages;

    if (
      selectedProductId &&
      productQueryById?.data?.data?.productType === "R"
    ) {
      // R type product
      const response = await updateProduct.mutateAsync({
        productId: selectedProductId,
        productType: "R",
        ...updatedFormData,
      });
      if (response.status) {
        toast({
          title: "RFQ Product Update Successful",
          description: response.message,
          variant: "success",
        });
        form.reset();

        productQueryById.refetch();
        queryClient.invalidateQueries({
          queryKey: ["rfq-products"],
        });
        onClose();
      } else {
        toast({
          title: "RFQ Product Update Failed",
          description: response.message,
          variant: "danger",
        });
      }
    } else if (
      selectedProductId &&
      productQueryById?.data?.data?.productType === "P"
    ) {
      // P type product
      const product = productQueryById?.data?.data;
      const productTagList = product?.productTags
        ? product?.productTags?.map((item: any) => {
            return {
              tagId: item?.productTagsTag?.id,
            };
          })
        : [];

      const randomSkuNo = generateRandomSkuNoWithTimeStamp().toString();
      const data = {
        ...updatedFormData,
        productType: "R",
        productName: product?.productName,
        categoryId: product?.categoryId ? product?.categoryId : 0,
        categoryLocation: product?.categoryLocation
          ? product?.categoryLocation
          : "",
        brandId: product?.brandId ? product?.brandId : 0,
        skuNo: randomSkuNo,
        productTagList: productTagList || undefined,
        productPrice: product?.productPrice ? Number(product.productPrice) : 0,
        offerPrice: product?.offerPrice ? Number(product.offerPrice) : 0,
        placeOfOriginId: product?.placeOfOriginId
          ? product?.placeOfOriginId
          : 0,
        productShortDescriptionList:
          product?.product_productShortDescription?.map((item: any) => ({
            shortDescription: item?.shortDescription,
          })) || [],
        description: product?.description,
        specification: product?.specification,
        status: "ACTIVE",
        productPriceList: [
          {
            consumerType: "",
            sellType: "",
            consumerDiscount: 0,
            vendorDiscount: 0,
            minCustomer: 0,
            maxCustomer: 0,
            minQuantityPerCustomer: 0,
            maxQuantityPerCustomer: 0,
            minQuantity: 0,
            maxQuantity: 0,
            timeOpen: 0,
            timeClose: 0,
            deliveryAfter: 0,
          },
        ],
      };

      console.log(data);
      // return;
      const response = await createProduct.mutateAsync(data);
      if (response.status) {
        toast({
          title: "RFQ Product Add Successful",
          description: response.message,
          variant: "success",
        });
        const dependentResponse = await addDuplicateProduct.mutateAsync({
          productId: selectedProductId,
        });
        if (dependentResponse.status) {
          toast({
            title: "Product Duplicate Successful",
            description: dependentResponse.message,
            variant: "success",
          });

          handleAddToCart(
            selectedQuantity ? selectedQuantity : 1,
            response.data.id,
            formData?.offerPrice,
          );
        } else {
          toast({
            title: "Product Duplicate Failed",
            description: dependentResponse.message,
            variant: "danger",
          });
        }
      } else {
        toast({
          title: "RFQ Product Add Failed",
          description: response.message,
          variant: "danger",
        });
      }
    }
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
    if (productQueryById?.data?.data) {
      const product = productQueryById?.data?.data;

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
        note: productQueryById?.data?.data?.note,
        productImages: productImages || [],
        productImagesList: productImagesList || undefined,
      });
    }
  }, [selectedProductId, productQueryById?.data]);

  // console.log(productQueryById.data?.data);
  // console.log(form.getValues());
  // console.log(selectedQuantity);

  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          {/* {`${selectedProductId ? "Edit" : "Add"} New Product in RFQ List`} */}
          {selectedQuantity ? `Add to RFQ cart` : "Edit Product"}
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
                                            event.target.files[0].size > 1048576
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
                                            event.target.files[0].size > 1048576
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
                                /> */}
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
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

          <ControlledTextInput
            label="Offer Price"
            name="offerPrice"
            placeholder="Offer Price"
            type="number"
          />

          <Button
            disabled={
              uploadMultiple.isPending ||
              updateProduct.isPending ||
              createProduct.isPending ||
              addDuplicateProduct.isPending ||
              updateRfqCartWithLogin.isPending
            }
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            {uploadMultiple.isPending ||
            updateProduct.isPending ||
            createProduct.isPending ||
            addDuplicateProduct.isPending ||
            updateRfqCartWithLogin.isPending ? (
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
              `${selectedQuantity ? "Save" : "Edit"}`
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
// `${selectedProductId ? "Edit" : "Add"} New Product in RFQ List`

export default AddToRfqForm;
