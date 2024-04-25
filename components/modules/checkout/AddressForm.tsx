import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ControlledPhoneInput from "@/components/shared/Forms/ControlledPhoneInput";
import { useCountries } from "@/apis/queries/masters.queries";
import { ICountries } from "@/utils/types/common.types";
import { useToast } from "@/components/ui/use-toast";
import {
  useAddAddress,
  useAddressById,
  useUpdateAddress,
} from "@/apis/queries/address.queries";
import Image from "next/image";

type AddressFormProps = {
  addressId?: number;
  onClose: () => void;
};

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, {
      message: "First Name is required",
    })
    .max(50, {
      message: "First Name must be less than 50 characters",
    }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last Name is required" })
    .max(50, {
      message: "Last Name must be less than 50 characters",
    }),
  cc: z.string().trim(),
  phoneNumber: z
    .string()
    .trim()
    .min(2, {
      message: "Phone Number is required",
    })
    .min(8, {
      message: "Phone Number must be minimum of 8 digits",
    })
    .max(20, {
      message: "Phone Number cannot be more than 20 digits",
    }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address is required" })
    .max(50, {
      message: "Address must be less than 50 characters",
    }),
  city: z.string().trim().min(2, { message: "City is required" }).max(50, {
    message: "City must be less than 50 characters",
  }),
  province: z
    .string()
    .trim()
    .min(2, { message: "Province is required" })
    .max(50, {
      message: "Province must be less than 50 characters",
    }),
  country: z
    .string()
    .trim()
    .min(2, { message: "Country is required" })
    .max(50, {
      message: "Country must be less than 50 characters",
    }),
  postCode: z
    .string()
    .trim()
    .min(2, { message: "Post Code is required" })
    .max(50, {
      message: "Post Code must be less than 50 characters",
    }),
});

const AddressForm: React.FC<AddressFormProps> = ({ addressId, onClose }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      cc: "",
      address: "",
      city: "",
      province: "",
      country: "",
      postCode: "",
    },
  });

  const createAddress = useAddAddress();
  const updateAddress = useUpdateAddress();
  const addressByIdQuery = useAddressById(
    addressId ? String(addressId) : "",
    !!addressId,
  );
  const countriesQuery = useCountries();

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.countryName };
      }) || []
    );
  }, [countriesQuery?.data?.data?.length]);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (addressId) {
      const updatedFormData = {
        ...formData,
        userAddressId: addressId,
      };
      const response = await updateAddress.mutateAsync(updatedFormData);

      if (response.status) {
        toast({
          title: "Address Edit Successful",
          description: response.message,
          variant: "success",
        });
        form.reset();
        onClose();
      } else {
        toast({
          title: "Address Edit Failed",
          description: response.message,
          variant: "danger",
        });
      }
    } else {
      const response = await createAddress.mutateAsync(formData);

      if (response.status) {
        toast({
          title: "Address Add Successful",
          description: response.message,
          variant: "success",
        });
        form.reset();
        onClose();
      } else {
        toast({
          title: "Address Add Failed",
          description: response.message,
          variant: "danger",
        });
      }
    }
  };

  useEffect(() => {
    if (addressId && addressByIdQuery.data?.data) {
      const addressDetails = addressByIdQuery.data?.data;
      form.reset({
        firstName: addressDetails?.firstName,
        lastName: addressDetails?.lastName,
        phoneNumber: addressDetails?.phoneNumber,
        cc: addressDetails?.cc,
        address: addressDetails?.address,
        city: addressDetails?.city,
        province: addressDetails?.province,
        country: addressDetails?.country,
        postCode: addressDetails?.postCode,
      });
    }
  }, [
    addressByIdQuery.data?.data,
    countriesQuery?.data?.data?.length,
    addressId,
  ]);

  return (
    <>
      <div className="modal-header">
        <DialogTitle className="text-center text-xl font-bold">
          {`${addressId ? "Edit" : "Add"} New Address`}
        </DialogTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form px-5 pb-5 pt-3"
        >
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput
              label="First Name"
              name="firstName"
              placeholder="Enter Your First Name"
            />

            <ControlledTextInput
              label="Last Name"
              name="lastName"
              placeholder="Enter Your Last Name"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-1">
            <ControlledPhoneInput
              label="Phone Number"
              name="phoneNumber"
              countryName="cc"
              placeholder="Enter Your Phone Number"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-1">
            <ControlledTextInput
              label="Address"
              name="address"
              placeholder="Address"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput label="City" name="city" placeholder="City" />

            <ControlledTextInput
              label="Province"
              name="province"
              placeholder="Province"
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput
              label="Post Code"
              type="number"
              name="postCode"
              placeholder="Post Code"
              onWheel={(e) => e.currentTarget.blur()}
            />

            <ControlledTextInput
              label="Country"
              name="country"
              placeholder="Country"
            />

            {/* <ControlledSelectInput
              label="Country"
              name="country"
              options={memoizedCountries}
            /> */}
          </div>

          <Button
            disabled={createAddress.isPending || updateAddress.isPending}
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            {createAddress.isPending || updateAddress.isPending ? (
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
            ) : addressId ? (
              "Edit Address"
            ) : (
              "Add Address"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddressForm;
