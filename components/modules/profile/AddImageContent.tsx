import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

/**
 * Props for the {@link AddImageContent} component.
 *
 * @property description - Instructional text displayed above the
 *   "browse" link (e.g., "Drop your File , or").
 */
type AddImageContentProps = {
  description: string;
};

/**
 * Placeholder overlay shown inside file-upload drop zones.
 *
 * Renders an upload icon, the provided {@link AddImageContentProps.description}
 * text, a "browse" link, and the company logo specification note.
 * This component is used as the empty-state content for image and
 * file upload areas throughout the application.
 *
 * @param props - {@link AddImageContentProps}
 * @returns An absolutely positioned overlay element with upload instructions.
 */
const AddImageContent: React.FC<AddImageContentProps> = ({ description }) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  return (
    <div className="absolute my-auto h-full w-full text-center text-sm font-medium leading-4 text-color-dark">
      <div className="flex h-full flex-col items-center justify-center">
        <Image
          src="/images/upload.png"
          className="mb-3"
          width={30}
          height={30}
          alt="camera"
        />
        <span>{description}</span>
        <span className="text-blue-500">browse</span>
        <p className="text-normal mt-3 text-xs leading-4 text-gray-300" dir={langDir} translate="no">
          ({t("company_logo_spec")})
        </p>
      </div>
    </div>
  );
};

export default AddImageContent;
