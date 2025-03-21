import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ControlledPhoneInput from "@/components/shared/Forms/ControlledPhoneInput";
import { useTranslations } from "next-intl";

type GuestAddressFormProps = {
  onClose: () => void;
  addressType?: "shipping" | "billing";
  setGuestShippingAddress: (address: any) => void;
  setGuestBillingAddress: (address: any) => void;
  guestShippingAddress?: any;
  guestBillingAddress?: any;
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

const GuestAddressForm: React.FC<GuestAddressFormProps> = ({
  onClose,
  addressType,
  setGuestShippingAddress,
  setGuestBillingAddress,
  guestShippingAddress,
  guestBillingAddress,
}) => {
  const t = useTranslations();
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

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData, addressType);

    if (addressType === "shipping") {
      setGuestShippingAddress(formData);
    } else if (addressType === "billing") {
      setGuestBillingAddress(formData);
    }

    form.reset();
    onClose();
  };

  useEffect(() => {
    if (addressType === "shipping" && guestShippingAddress) {
      form.reset(guestShippingAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestShippingAddress, addressType]);

  useEffect(() => {
    if (addressType === "billing" && guestBillingAddress) {
      form.reset(guestBillingAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestBillingAddress, addressType]);

  return (
    <>
      <div className="modal-header">
        <DialogTitle className="text-center text-xl font-bold">
          {`${(addressType === "shipping" && guestShippingAddress) || (addressType === "billing" && guestBillingAddress) ? "Edit" : "Add"} Address`}
        </DialogTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form px-5 pb-5 pt-3"
        >
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput
              label={t("first_name")}
              name="firstName"
              placeholder={t("enter_first_name")}
            />

            <ControlledTextInput
              label={t("last_name")}
              name="lastName"
              placeholder={t("enter_last_name")}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-1">
            <ControlledPhoneInput
              label={t("phone_number")}
              name="phoneNumber"
              countryName="cc"
              placeholder={t("enter_phone_number")}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-1">
            <ControlledTextInput
              label={t("address")}
              name="address"
              placeholder={t("address")}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput label={t("city")} name="city" placeholder={t("city")} />

            <ControlledTextInput
              label={t("province")}
              name="province"
              placeholder={t("province")}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput
              label={t("postcode")}
              type="number"
              name="postCode"
              placeholder={t("postcode")}
              onWheel={(e) => e.currentTarget.blur()}
            />

            <ControlledTextInput
              label={t("country")}
              name="country"
              placeholder={t("country")}
            />

            {/* <ControlledSelectInput
              label="Country"
              name="country"
              options={memoizedCountries}
            /> */}
          </div>

          <Button
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            {(addressType === "shipping" && guestShippingAddress) ||
            (addressType === "billing" && guestBillingAddress)
              ? t("edit_address")
              : t("add_address")}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GuestAddressForm;
