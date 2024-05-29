"use client";
import { useAllUserAddress } from "@/apis/queries/address.queries";
import {
  useAddRfqQuotes,
  useDeleteRfqCartItem,
  useRfqCartListByUserId,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import { useMe } from "@/apis/queries/user.queries";
import RfqProductCard from "@/components/modules/rfqCart/RfqProductCard";
import ControlledDatePicker from "@/components/shared/Forms/ControlledDatePicker";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AddressItem } from "@/utils/types/address.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineChevronLeft } from "react-icons/md";
import { z } from "zod";
import BannerImage from "@/public/images/rfq-sec-bg.png";
import Footer from "@/components/shared/Footer";

const formSchema = z.object({
  address: z.string().trim().min(1, { message: "Address is required" }),
  rfqDate: z
    .date({ required_error: "Delivery Date is required" })
    .transform((val) => val.toISOString()),
});

const RfqCartPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      rfqDate: undefined as unknown as string,
    },
  });

  const me = useMe();
  const allUserAddressQuery = useAllUserAddress({
    page: 1,
    limit: 10,
  });
  const rfqCartListByUser = useRfqCartListByUserId({
    page: 1,
    limit: 20,
  });
  const updateRfqCartWithLogin = useUpdateRfqCartWithLogin();
  const deleteRfqCartItem = useDeleteRfqCartItem();
  const addQuotes = useAddRfqQuotes();

  const memoziedAddressList = useMemo(() => {
    return (
      allUserAddressQuery.data?.data.map((item: AddressItem) => ({
        label: `${item.address} ${item.city} ${item.province} ${item.postCode} ${item.country}`,
        value: `${item.address};${item.city};${item.province};${item.postCode};${item.country}`,
      })) || []
    );
  }, [allUserAddressQuery.data?.data]);

  const memoizedRfqCartList = useMemo(() => {
    if (rfqCartListByUser.data?.data) {
      return rfqCartListByUser.data?.data || [];
    }
    return [];
  }, [rfqCartListByUser.data?.data]);

  const handleAddToCart = async (
    quantity: number,
    productId: number,
    actionType: "add" | "remove",
    offerPrice: number,
  ) => {
    const response = await updateRfqCartWithLogin.mutateAsync({
      productId,
      quantity,
      offerPrice,
    });

    if (response.status) {
      toast({
        title: `Item ${actionType === "add" ? "added to" : actionType === "remove" ? "removed from" : ""} cart`,
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

  const handleRemoveItemFromRfqCart = async (rfqCartId: number) => {
    const response = await deleteRfqCartItem.mutateAsync({ rfqCartId });
    if (response.status) {
      toast({
        title: "Item removed from cart",
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

  const onSubmit = async (formData: any) => {
    const address = formData.address;
    const addressParts = address.split(";");
    const addressObj = {
      address: addressParts[0],
      city: addressParts[1],
      province: addressParts[2],
      postCode: addressParts[3],
      country: addressParts[4],
    };
    const updatedFormData = {
      ...addressObj,
      firstName: me.data?.data?.firstName,
      lastName: me.data?.data?.lastName,
      phoneNumber: me.data?.data?.phoneNumber,
      cc: me.data?.data?.cc,
      rfqCartIds: memoizedRfqCartList.map((item: any) => item.id),
      rfqDate: formData.rfqDate,
    };
    console.log(updatedFormData);
    // return;
    const response = await addQuotes.mutateAsync(updatedFormData);
    if (response.status) {
      toast({
        title: "Quotes added successfully",
        description: "Check your quotes for more details",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["rfq-cart-by-user", { page: 1, limit: 20 }],
      });
      form.reset();
      router.push("/rfq-product-list");
    } else {
      toast({
        title: "Something went wrong",
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <section className="rfq_section">
        <div className="sec-bg relative">
          <Image src={BannerImage} alt="background-banner" fill />
        </div>
        <div className="container mx-auto px-3">
          <div className="rfq-cart-wrapper">
            <div className="headerPart">
              <button
                type="button"
                className="back-btn"
                onClick={() => router.back()}
              >
                <MdOutlineChevronLeft />
              </button>
              <h3>RFQ Cart Items</h3>
            </div>
            <div className="bodyPart">
              <div className="add-delivery-card">
                <h3>Add Delivery Address & date</h3>
                <Form {...form}>
                  <form className="grid grid-cols-2 gap-x-5 !bg-white p-5">
                    <ControlledSelectInput
                      label="Address"
                      name="address"
                      options={memoziedAddressList}
                    />

                    <div>
                      <Label>Date</Label>
                      <ControlledDatePicker name="rfqDate" />
                    </div>
                  </form>
                </Form>
              </div>

              <div className="rfq-cart-item-lists">
                <h4>RFQ Cart Items</h4>
                <div className="rfq-cart-item-ul">
                  {memoizedRfqCartList.map((item: any) => (
                    <RfqProductCard
                      key={item?.id}
                      id={item?.id}
                      rfqProductId={item?.productId}
                      productName={item?.rfqCart_productDetails?.productName}
                      productQuantity={item.quantity}
                      productImages={
                        item?.rfqCart_productDetails?.productImages
                      }
                      offerPrice={item?.rfqCart_productDetails?.offerPrice}
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveItemFromRfqCart}
                    />
                  ))}

                  {!memoizedRfqCartList.length ? (
                    <div className="my-10 text-center">
                      <h4>No items in cart</h4>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="submit-action">
                <Button
                  disabled={!memoizedRfqCartList.length || addQuotes.isPending}
                  className="theme-primary-btn submit-btn"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {addQuotes.isPending ? (
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
                    "Request For RFQ"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RfqCartPage;
