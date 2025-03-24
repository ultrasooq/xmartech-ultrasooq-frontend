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
  useRfqProductById,
  useUpdateForCustomize,
  useUpdateProduct,
} from "@/apis/queries/product.queries";
import {
  useAddProductDuplicateRfq,
  useUpdateFactoriesCartWithLogin,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import { imageExtensions, videoExtensions } from "@/utils/constants";
import ReactPlayer from "react-player/lazy";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import {
  generateRandomSkuNoWithTimeStamp,
  isBrowser,
  isImage,
  isVideo,
} from "@/utils/helper";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type AddToCustomizeFormProps = {
  onClose: () => void;
  selectedProductId?: number;
//   selectedQuantity?: number;
};

const addFormSchema = z.object({
  fromPrice: z.coerce
    .number()
    .max(1000000, {
      message: "Offer From price must be less than 1000000",
    })
    .optional(),
    toPrice: z.coerce
    .number()
    .max(1000000, {
      message: "Offer To price must be less than 1000000",
    })
    .optional(),
  note: z
    .string()
    .trim()
    .max(100, {
      message: "Description must be less than 100 characters",
    })
    .optional(),
    customizeproductImageList: z.any().optional(),
});

const editFormSchema = z.object({
  note: z
    .string()
    .trim()
    .max(100, {
      message: "Description must be less than 100 characters",
    })
    .optional(),
    customizeproductImageList: z.any().optional(),
});

const addDefaultValues = {
  fromPrice: 0,
  toPrice: 0,
  note: "",
  customizeproductImageList: undefined,
  productImages: [] as { path: File; id: string }[],
};

const editDefaultValues = {
  note: "",
  customizeproductImageList: undefined,
  productImages: [] as { path: File; id: string }[],
};

const AddToCustomizeForm: React.FC<AddToCustomizeFormProps> = ({
  onClose,
  selectedProductId,
//   selectedQuantity,
}) => {
  const t = useTranslations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm({
    // resolver: zodResolver(selectedQuantity ? addFormSchema : editFormSchema),
    // defaultValues: selectedQuantity ? addDefaultValues : editDefaultValues,
    resolver: zodResolver(addFormSchema),
    defaultValues: addDefaultValues,
  });
  const photosRef = useRef<HTMLInputElement>(null);

  const watchProductImages = form.watch("productImages");

  const uploadMultiple = useUploadMultipleFile();
  const createProduct = useCreateProduct();
  const addDuplicateProduct = useAddProductDuplicateRfq();
  const updateProduct = useUpdateProduct();
  const updateForCustomize = useUpdateForCustomize();
  const productQueryById = useRfqProductById(
    {
      productId: selectedProductId ? selectedProductId.toString() : "",
    },
    !!selectedProductId,
  );
  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();

  const updateFactoriesCartWithLogin = useUpdateFactoriesCartWithLogin();

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
    customizeProductId: number,
    // offerPrice: number,
    // note: string,
  ) => {
    const response = await updateFactoriesCartWithLogin.mutateAsync({
      productId,
      quantity,
      customizeProductId
      // offerPrice,
      // note,
    });

    if (response.status) {
      toast({
        title: t("something_went_wrong"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
      // form.reset();
      // productQueryById.refetch();
      // queryClient.invalidateQueries({
      //   queryKey: ["rfq-products"],
      // });
        router.push(`/factories-cart`);
        onClose();
    } else {
      toast({
        title: t("something_went_wrong"),
        description: response.message,
        variant: "danger",
      });
    }
  };

  const onSubmit = async (formData: any) => {
    // console.log(formData); return
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
                link: item?.path,
                linkType: 'video',
                videoName,
              };
            } else if (imageExtensions.includes(extension)) {
              const imageName: string = item?.path.split("/").pop()!;
              return {
                link: item?.path,
                linktype: 'image',
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
              link: item,
              linkType: 'video',
              videoName,
            };
          } else if (imageExtensions.includes(extension)) {
            const imageName: string = item.split("/").pop()!;
            return {
              link: item,
              linkType: 'image',
              imageName,
            };
          }
        }

        return {
          link: item,
          linkType: '',
          imageName: item,
        };
      });

      updatedFormData.productImages = [
        // ...stringTypeArrays,
        ...formattedimageUrlArrays,
      ];

      if (updatedFormData.productImages.length) {
        updatedFormData.customizeproductImageList = updatedFormData.productImages;
      }
    }

    delete updatedFormData.productImages;

    // console.log(productQueryById, selectedProductId)

    if (
      selectedProductId
    ) {
      // F type product

      console.log(updatedFormData); 

      // return;
      const response = await updateForCustomize.mutateAsync({
        productId: selectedProductId,
        // productType: "F",
        ...updatedFormData,
      });
      if (response.status) {
        toast({
          title: t("customize_product_update_successful"),
          description: response.message,
          variant: "success",
        });

         await handleAddToCart(
            1,
            Number(selectedProductId),
            response?.data.id,
          );
        
      } else {
        toast({
          title: t("customize_product_update_failed"),
          description: response.message,
          variant: "danger",
        });
      }
    } 

    if (isBrowser())
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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

      const customizeproductImageList = product?.productImages
        ? product?.productImages?.map((item: any) => {
            if (item?.video) {
              return {
                link: item?.video,
                linkType: 'video',
                videoName: item?.videoName,
              };
            } else if (item?.image) {
              return {
                link: item?.image,
                linkType: 'image',
                imageName: item?.imageName,
              };
            }
          })
        : undefined;

      form.reset({
        note: productQueryById?.data?.data?.note,
        productImages: productImages || [],
        customizeproductImageList: customizeproductImageList || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductId, productQueryById?.data]);

  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          {t("add_customize_cart")}
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
                {t("product_image")}
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
                                            event.target.files[0].size >
                                            524288000
                                          ) {
                                            toast({
                                              title: t("one_of_file_should_be_less_than_size", { size: "500MB" }),
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
                                        {t("upload_video")}
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
                                            524288000
                                          ) {
                                            toast({
                                              title: t("one_of_file_should_be_less_than_size", { size: "500MB" }),
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
                                  <AddImageContent description={t("drop_your_file")} />
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
                        <span>{t("add_more")}</span>
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
                              filesArray.some((file) => file.size > 524288000)
                            ) {
                              toast({
                                title: t("one_of_file_should_be_less_than_size", { size: "500MB" }),
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
            label={t("write_a_note")}
            name="note"
            placeholder=""
            rows={6}
          />

          {/* {selectedQuantity ? ( */}
            <ControlledTextInput
              label={t("offer_price_from")}
              name="fromPrice"
              placeholder={t("offer_price")}
              type="number"
            />

            <ControlledTextInput
              label={t("offer_price_to")}
              name="toPrice"
              placeholder={t("to_price")}
              type="number"
            />
          {/* ) : null} */}

          <Button
            disabled={
            //   uploadMultiple.isPending ||
            //   updateProduct.isPending ||
            //   createProduct.isPending ||
            //   addDuplicateProduct.isPending ||
            updateFactoriesCartWithLogin.isPending
            }
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            {/* {uploadMultiple.isPending ||
            updateProduct.isPending ||
            createProduct.isPending ||
            addDuplicateProduct.isPending ||
            updateRfqCartWithLogin.isPending ? (
              <LoaderWithMessage message="Please wait" />
            ) : (
              `${selectedQuantity ? "Add to Cart" : "Edit"}`
            
            )} */}
            {t("add_t_cart")}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddToCustomizeForm;
