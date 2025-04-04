import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
// import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ControlledPhoneInput from "@/components/shared/Forms/ControlledPhoneInput";
import { useCountries } from "@/apis/queries/masters.queries";
import { useToast } from "@/components/ui/use-toast";
import {
  useAddAddress,
  useAddressById,
  useUpdateAddress,
} from "@/apis/queries/address.queries";
import { IoCloseSharp } from "react-icons/io5";
import { ALPHABETS_REGEX } from "@/utils/constants";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type AddressFormProps = {
  addressId?: number;
  onClose: () => void;
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
    city: z
      .string()
      .trim()
      .min(2, { message: t("city_required") })
      .max(50, {
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

const AddressForm: React.FC<AddressFormProps> = ({ addressId, onClose }) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const { toast } = useToast();
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

  const createAddress = useAddAddress();
  const updateAddress = useUpdateAddress();
  const addressByIdQuery = useAddressById(
    addressId ? String(addressId) : "",
    !!addressId,
  );
  const countriesQuery = useCountries();

  const onSubmit = async (formData: typeof defaultValues) => {
    if (addressId) {
      const updatedFormData = {
        ...formData,
        userAddressId: addressId,
      };
      const response = await updateAddress.mutateAsync(updatedFormData);

      if (response.status) {
        toast({
          title: t("address_edit_successful"),
          description: response.message,
          variant: "success",
        });
        form.reset();
        onClose();
      } else {
        toast({
          title: t("address_edit_failed"),
          description: response.message,
          variant: "danger",
        });
      }
    } else {
      const response = await createAddress.mutateAsync(formData);

      if (response.status) {
        toast({
          title: t("address_add_successful"),
          description: response.message,
          variant: "success",
        });
        form.reset();
        onClose();
      } else {
        toast({
          title: t("address_add_failed"),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addressByIdQuery.data?.data,
    countriesQuery?.data?.data?.length,
    addressId,
  ]);

  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          {`${addressId}` ? t("edit_address") : t("add_address")}
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
          <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
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

          <div className="mt-2 grid w-full grid-cols-1 gap-1 md:grid-cols-1">
            <ControlledPhoneInput
              label={t("phone_number")}
              name="phoneNumber"
              countryName="cc"
              placeholder={t("enter_phone_number")}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-1">
            <ControlledTextInput
              label={t("address")}
              name="address"
              placeholder={t("address")}
              dir={langDir}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
            <ControlledTextInput
              label="City"
              name="city"
              placeholder="City"
              dir={langDir}
            />

            <ControlledTextInput
              label={t("province")}
              name="province"
              placeholder={t("province")}
              dir={langDir}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
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
            disabled={createAddress.isPending || updateAddress.isPending}
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
            dir={langDir}
          >
            {createAddress.isPending || updateAddress.isPending ? (
              <LoaderWithMessage message="Please wait" />
            ) : addressId ? (
              t("edit_address")
            ) : (
              t("add_address")
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddressForm;
