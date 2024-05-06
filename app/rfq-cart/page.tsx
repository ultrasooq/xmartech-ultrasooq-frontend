"use client";
import { useAllUserAddress } from "@/apis/queries/address.queries";
import {
  useDeleteRfqCartItem,
  useRfqCartListByUserId,
  useUpdateRfqCartWithLogin,
} from "@/apis/queries/rfq.queries";
import RfqProductCard from "@/components/modules/rfqCart/RfqProductCard";
import ControlledDatePicker from "@/components/shared/Forms/ControlledDatePicker";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AddressItem } from "@/utils/types/address.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineChevronLeft } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({});

const RfqCartPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

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

  const memoziedAddressList = useMemo(() => {
    return (
      allUserAddressQuery.data?.data.map((item: AddressItem) => ({
        label: `${item.address} ${item.city} ${item.postCode} ${item.postCode} ${item.country}`,
        value: item.id.toString(),
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
  ) => {
    const response = await updateRfqCartWithLogin.mutateAsync({
      productId,
      quantity,
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

  return (
    <>
      <section className="rfq_section">
        <div className="sec-bg relative">
          <Image src="/images/rfq-sec-bg.png" alt="background-banner" fill />
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
                      <ControlledDatePicker name="createdDate" />
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
                      onAdd={handleAddToCart}
                      onRemove={handleRemoveItemFromRfqCart}
                    />
                  ))}
                </div>
              </div>
              <div className="submit-action">
                <button className="theme-primary-btn submit-btn">
                  Request For RFQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RfqCartPage;
