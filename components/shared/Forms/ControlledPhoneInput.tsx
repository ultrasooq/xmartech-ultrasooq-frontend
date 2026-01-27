/**
 * @file ControlledPhoneInput - React Hook Form controlled phone number input.
 * @description Renders an international phone input with country selector using
 * react-phone-input-2. Automatically updates both the phone value and the
 * country dial code in the form state. Supports nested field name error resolution.
 *
 * @props
 *   - label {string} - Label text above the input.
 *   - name {string} - Form field name for the phone value.
 *   - countryName {string} - Form field name for storing the country dial code.
 *   - Plus all PhoneInputProps from react-phone-input-2.
 *
 * @dependencies
 *   - react-hook-form (Controller, useFormContext) - Form state management.
 *   - react-phone-input-2 (PhoneInput) - International phone input with flags.
 *   - @/components/ui/label (Label) - Styled label.
 *   - @/context/AuthContext (useAuth) - Language direction context.
 */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import PhoneInput, { CountryData, PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface ControlledPhoneInputProps extends PhoneInputProps {
  label?: string;
  name: string;
  countryName: string;
}

const ControlledPhoneInput: React.FC<ControlledPhoneInputProps> = ({
  label,
  name,
  countryName,
  ...props
}) => {
  const { langDir } = useAuth();
  const formContext = useFormContext();

  const getError = () => {
    if (name.includes(".")) {
      const nameArray = name.split(".");

      // TODO: Fix type error
      let error: any = formContext.formState.errors;

      nameArray.forEach((item) => {
        if (item) {
          error = error?.[item];
        }
      });

      return error?.message;
    }

    return formContext.formState.errors?.[name]?.message;
  };

  return (
    <div className="mt-0 flex w-full flex-col justify-between space-y-3">
      <Label dir={langDir}>
        {label}
      </Label>
      <Controller
        control={formContext.control}
        name={name}
        render={({ field }) => (
          <PhoneInput
            {...props}
            country={"eg"}
            enableSearch={true}
            value={field.value}
            onChange={(phone: string, country: CountryData) => {
              formContext.setValue(countryName, `+${country.dialCode}`);
              field.onChange(`+${phone}`);
            }}
            inputClass="theme-form-control-s1 w-full!"
          />
        )}
      />
      <p className="text-[13px] font-medium text-red-500" dir={langDir}>
        {getError() as string}
      </p>
    </div>
  );
};

export default ControlledPhoneInput;
