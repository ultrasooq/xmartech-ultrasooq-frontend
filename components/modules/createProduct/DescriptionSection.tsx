import React from "react";
import { Button } from "@/components/ui/button";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import Image from "next/image";
import AddIcon from "@/public/images/add-icon.svg";
import TrashIcon from "@/public/images/social-delete-icon.svg";
import { useFieldArray, useFormContext } from "react-hook-form";
import ControlledRichTextEditor from "@/components/shared/Forms/ControlledRichTextEditor";
import { useTranslations } from "next-intl";

const DescriptionSection = () => {
  const t = useTranslations();
  const formContext = useFormContext();

  const fieldArrayForShortDescription = useFieldArray({
    control: formContext.control,
    name: "productShortDescriptionList",
  });

  const appendShortDescription = () =>
    fieldArrayForShortDescription.append({
      shortDescription: "",
    });

  const removeShortDescription = (index: number) =>
    fieldArrayForShortDescription.remove(index);

  return (
    <div className="form-groups-common-sec-s1">
      <h3>{t("description")}</h3>
      <div className="grid w-full grid-cols-1">
        <div>
          <div className="flex w-full items-center justify-between">
            <label className="text-sm font-medium leading-none text-color-dark">
              {t("short_description")}
            </label>

            <Button
              type="button"
              onClick={appendShortDescription}
              className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
            >
              <Image src={AddIcon} className="mr-1" alt="add-icon" />
              <span>{t("add_short_description")}</span>
            </Button>
          </div>

          {fieldArrayForShortDescription.fields.map((field, index) => (
            <div key={field.id} className="relative w-full">
              <ControlledTextInput
                key={field.id}
                name={`productShortDescriptionList.${index}.shortDescription`}
                placeholder="Enter Short Description"
              />

             {/* <ControlledRichTextEditor
              key={field.id}
              label=""
              name={`productShortDescriptionList.${index}.shortDescription`}
              /> */}

              {index !== 0 ? (
                <Button
                  type="button"
                  onClick={() => removeShortDescription(index)}
                  className="absolute right-2 top-6 flex -translate-y-2/4 cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                >
                  <Image src={TrashIcon} alt="social-delete-icon" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
