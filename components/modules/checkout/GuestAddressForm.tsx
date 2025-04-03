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
import { ALPHABETS_REGEX } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";

type GuestAddressFormProps = {
  onClose: () => void;
  addressType?: "shipping" | "billing";
  setGuestShippingAddress: (address: any) => void;
  setGuestBillingAddress: (address: any) => void;
  guestShippingAddress?: any;
  guestBillingAddress?: any;
};

const formSchema = (t: any) => {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(2, {
        message: t("first_name_required"),
      })
      .max(50, {
        message: t("first_name_must_be_50_chars_only"),
      }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: t("last_name_requierd") })
      .max(50, {
        message: t("last_name_must_be_50_chars_only"),
      }),
    cc: z.string().trim(),
    phoneNumber: z
      .string()
      .trim()
      .min(2, {
        message: t("phone_number_required"),
      })
      .min(8, {
        message: t("phone_number_must_be_min_8_digits"),
      })
      .max(20, {
        message: t("phone_number_cant_be_more_than_20_digits"),
      }),
    address: z
      .string()
      .trim()
      .min(2, { message: t("address_required") })
      .max(50, {
        message: t("address_must_be_less_than_n_chars", { n: 50 }),
      }),
    city: z.string().trim().min(2, { message: t("city_required") }).max(50, {
      message: t("city_must_be_less_than_n_chars", { n: 50 }),
    })
    .refine((val) => ALPHABETS_REGEX.test(val), {
      message: t("city_must_contain_only_letters"),
    }),
    province: z
      .string()
      .trim()
      .min(2, { message: t("province_required") })
      .max(50, {
        message: t("province_must_be_less_than_n_chars", { n: 50 }),
      })
      .refine((val) => ALPHABETS_REGEX.test(val), {
        message: t("province_must_contain_only_letters"),
      }),
    country: z
      .string()
      .trim()
      .min(2, { message: t("country_required") })
      .max(50, {
        message: t("country_must_be_less_than_n_chars", { n: 50 }),
      })
      .refine((val) => ALPHABETS_REGEX.test(val), {
        message: t("country_must_contain_only_letters"),
      }),
    postCode: z
      .string()
      .trim()
      .min(2, { message: t("postcode_required") })
      .max(50, {
        message: t("postcode_must_be_less_than_n_chars", { n: 50 }),
      }),
  });
};

const GuestAddressForm: React.FC<GuestAddressFormProps> = ({
  onClose,
  addressType,
  setGuestShippingAddress,
  setGuestBillingAddress,
  guestShippingAddress,
  guestBillingAddress,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const defaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cc: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postCode: "",
  };
  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: typeof defaultValues) => {
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
          {`${(addressType === "shipping" && guestShippingAddress) || (addressType === "billing" && guestBillingAddress) ? t("edit_address") : t("add_address")}`}
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
              dir={langDir}
            />

            <ControlledTextInput
              label={t("last_name")}
              name="lastName"
              placeholder={t("enter_last_name")}
              dir={langDir}
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
              dir={langDir}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput label={t("city")} name="city" placeholder={t("city")} dir={langDir} />

            <ControlledTextInput
              label={t("province")}
              name="province"
              placeholder={t("province")}
              dir={langDir}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <ControlledTextInput
              label={t("postcode")}
              type="number"
              name="postCode"
              placeholder={t("postcode")}
              onWheel={(e) => e.currentTarget.blur()}
              dir={langDir}
            />

            <ControlledTextInput
              label={t("country")}
              name="country"
              placeholder={t("country")}
              dir={langDir}
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
            dir={langDir}
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
