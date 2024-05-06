"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import AddressCard from "@/components/modules/mySettings/address/AddressCard";
import { AddressItem } from "@/utils/types/address.types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddressForm from "@/components/modules/checkout/AddressForm";
import { useClickOutside } from "use-events";
import { useMe } from "@/apis/queries/user.queries";
import {
  useAllUserAddress,
  useDeleteAddress,
} from "@/apis/queries/address.queries";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type AddressPageProps = {};

const AddressPage: React.FC<AddressPageProps> = ({}) => {
  const { toast } = useToast();
  const wrapperRef = useRef(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >();

  const handleToggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);

  const [isClickedOutside] = useClickOutside([wrapperRef], (event) => {});

  const me = useMe();
  const allUserAddressQuery = useAllUserAddress({
    page: 1,
    limit: 10,
  });
  const delteAddress = useDeleteAddress();

  const memoziedAddressList = useMemo(() => {
    return allUserAddressQuery.data?.data || [];
  }, [allUserAddressQuery.data?.data]);

  const handleDeleteAddress = async (userAddressId: number) => {
    const response = await delteAddress.mutateAsync({ userAddressId });
    if (response.status) {
      toast({
        title: "Address removed",
        description: "Check your address for more details",
        variant: "success",
      });
    }
  };

  useEffect(() => {
    if (isClickedOutside) {
      setSelectedAddressId(undefined);
    }
  }, [isClickedOutside]);

  return (
    <div className="my-settings-content">
      <h2>Manage Address</h2>
      <div className="my-address-sec">
        <div className="card-item cart-items for-add">
          <div className="top-heading">
            <button
              className="add-new-address-btn inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-none border-input bg-background p-0 text-sm font-medium !normal-case shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              type="button"
              onClick={() => handleToggleAddModal()}
            >
              <img
                alt="add-icon"
                loading="lazy"
                width={14}
                height={14}
                decoding="async"
                data-nimg={1}
                src="/images/addbtn.svg"
                style={{ color: "transparent" }}
              />{" "}
              Add a new address{" "}
            </button>
          </div>
        </div>

        {allUserAddressQuery.isLoading
          ? Array.from({ length: 2 }, (_, i) => i).map((item) => (
              <div className="space-y-3 px-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          : null}

        <div className="card-item selected-address">
          <div className="selected-address-lists">
            {!allUserAddressQuery.isLoading && !memoziedAddressList?.length ? (
              <p className="py-10 text-center">No address found</p>
            ) : null}

            {memoziedAddressList?.map((item: AddressItem) => (
              <AddressCard
                key={item.id}
                id={item.id}
                firstName={item.firstName}
                lastName={item.lastName}
                cc={item.cc}
                phoneNumber={item.phoneNumber}
                address={item.address}
                city={item.city}
                country={item.country}
                province={item.province}
                postCode={item.postCode}
                onEdit={() => {
                  setSelectedAddressId(item.id);
                  handleToggleAddModal();
                }}
                onDelete={() => handleDeleteAddress(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent
          className="add-new-address-modal gap-0 p-0"
          ref={wrapperRef}
        >
          <AddressForm
            onClose={() => {
              setIsAddModalOpen(false);
              setSelectedAddressId(undefined);
            }}
            addressId={selectedAddressId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressPage;
