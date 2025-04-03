import React from "react";
import ControlledRichTextEditor from "@/components/shared/Forms/ControlledRichTextEditor";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFieldArray, useFormContext } from "react-hook-form";
import AddIcon from "@/public/images/add-icon.svg";
import TrashIcon from "@/public/images/social-delete-icon.svg";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

const DescriptionAndSpecificationSection = () => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const formContext = useFormContext();

  const fieldArrayForSpecification = useFieldArray({
    control: formContext.control,
    name: "productSpecificationList",
  });

  const appendSpecification = () =>
    fieldArrayForSpecification.append({
      label: "",
      specification: "",
    });

  const removeSpecification = (index: number) =>
    fieldArrayForSpecification.remove(index);

  return (
    <div className="flex w-full flex-wrap">
      <h3 dir={langDir}>{t("description_n_specification")}</h3>
      <div className="mb-3.5 w-full">
        <div className="relative mb-4 w-full">
          <ControlledRichTextEditor
            label={t("description")}
            name="descriptionJson"
          />
        </div>
        <div className="relative mb-4 w-full">
          <div className="grid w-full grid-cols-1">
            <div>
              <div className="flex w-full items-center justify-between">
                <label className="text-sm font-medium leading-none text-color-dark" dir={langDir}>
                  {t("specification")}
                </label>

                <Button
                  type="button"
                  onClick={appendSpecification}
                  className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                  dir={langDir}
                >
                  <Image src={AddIcon} className="mr-1" alt="add-icon" />
                  <span>{t("add_specification")}</span>
                </Button>
              </div>

              {fieldArrayForSpecification.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative grid w-full grid-cols-1 gap-5 md:grid-cols-2"
                >
                  <ControlledTextInput
                    name={`productSpecificationList.${index}.label`}
                    placeholder={t("enter_label")}
                    label={t("label")}
                    dir={langDir}
                  />

                  <ControlledTextInput
                    name={`productSpecificationList.${index}.specification`}
                    placeholder={t("enter_value")}
                    label={t("value")}
                    dir={langDir}
                  />

                  {index !== 0 ? (
                    <Button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="absolute right-2 top-3 flex -translate-y-2/4 cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                      dir={langDir}
                    >
                      <Image src={TrashIcon} alt="social-delete-icon" />
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndSpecificationSection;
