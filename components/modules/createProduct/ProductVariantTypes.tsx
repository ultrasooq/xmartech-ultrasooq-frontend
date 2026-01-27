/**
 * @file ProductVariantTypes.tsx
 * @description Variant type manager component for product creation. Manages a
 *   dynamic list of variant types (e.g., "Color", "Size"), each containing nested
 *   ProductVariants sub-components for defining variant values with optional images.
 *
 * @props None (uses React Hook Form context via `useFormContext`)
 *
 * @behavior
 *   - Manages `productVariants` as a dynamic field array of variant type objects,
 *     each with a `type` name and a nested `variants` array.
 *   - "Add Variant Type" button appends a new variant type with one empty value.
 *   - Each variant type entry shows a ControlledTextInput for the type name and
 *     a trash icon to remove the entire type with all its values.
 *   - Embeds ProductVariants component for each type to manage its variant values.
 *   - Supports RTL layout via `langDir` from AuthContext.
 *
 * @dependencies
 *   - useFormContext, useFieldArray (React Hook Form) - Form state and dynamic fields.
 *   - ProductVariants - Nested variant value editor component.
 *   - ControlledTextInput - Text input for variant type names.
 *   - useTranslations (next-intl) - i18n translations.
 *   - useAuth (AuthContext) - Language direction.
 */
import React from "react";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AddIcon from "@/public/images/add-icon.svg";
import TrashIcon from "@/public/images/social-delete-icon.svg";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import ProductVariants from "./ProductVariants";

const ProductVariantTypes = () => {
    const t = useTranslations();
    const { langDir } = useAuth();
    const formContext = useFormContext();

    const fieldArrayForProductVariants = useFieldArray({
        control: formContext.control,
        name: "productVariants",
    });

    const appendProductVariant = () =>
        fieldArrayForProductVariants.append({
            type: "",
            variants: [
                {
                    value: "",
                    image: null,
                }
            ]
        });

    const removeProductVariant = (index: number) => fieldArrayForProductVariants.remove(index);

    return (
        <>
            <div className="flex w-full items-center justify-end">
                <Button
                    type="button"
                    onClick={appendProductVariant}
                    className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                    dir={langDir}
                    translate="no"
                >
                    <Image src={AddIcon} className="mr-1" alt="add-icon" />
                    <span>{t("add_variant_type")}</span>
                </Button>
            </div>

            {fieldArrayForProductVariants.fields.map((field, index) => (
                <React.Fragment key={field.id}>
                    {index != 0 ? <div className="mt-5 w-full"><hr/></div> : null}

                    <div className="mt-2 w-full">
                        <label
                            className="text-sm font-medium leading-none text-color-dark"
                            dir={langDir}
                            translate="no"
                        >
                            {t("variant_type")}
                        </label>
                        <ControlledTextInput
                            name={`productVariants.${index}.type`}
                            label={t("variant_type")}
                            dir={langDir}
                            translate="no"
                        />
                    </div>

                    <ProductVariants index={index} />

                    {index !== 0 ? (<div className="flex w-full items-center justify-end">
                        <Button
                            type="button"
                            onClick={() => removeProductVariant(index)}
                            className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                            dir={langDir}
                            translate="no"
                        >
                            <Image src={TrashIcon} className="mr-1" alt="add-icon" />
                            <span>{t("delete_variant_type")}</span>
                        </Button>
                    </div>) : null}
                </React.Fragment>
            ))}
        </>
    )
};

export default ProductVariantTypes;