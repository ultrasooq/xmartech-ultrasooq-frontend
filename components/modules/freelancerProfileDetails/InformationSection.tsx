import React, { useMemo } from "react";
import Image from "next/image";

type InformationSectionProps = {
  userDetails: any;
  onEdit: () => void;
};

const InformationSection: React.FC<InformationSectionProps> = ({
  userDetails,
  onEdit,
}) => {
  const getSocialLinks = useMemo(() => {
    if (userDetails?.userSocialLink?.length > 0) {
      const socialLinks = userDetails?.userSocialLink?.map(
        (item: any, index: number, array: any[]) => {
          return (
            <div className="flex flex-row items-center" key={item?.id}>
              <a href={item?.link} target="_blank" rel="noreferrer">
                <Image
                  src="/images/share.png"
                  height={20}
                  width={20}
                  alt="share-icon"
                  className="mr-1"
                />
              </a>
              {`${item?.linkType}${index !== array.length - 1 ? ", " : ""}`}
            </div>
          );
        },
      );
      return socialLinks;
    }
  }, [userDetails?.userSocialLink?.length]);

  return (
    <div className="w-full border-b-2 border-dashed border-gray-200 py-4">
      <div className="flex w-full flex-wrap items-center justify-between pb-5">
        <h2 className="left-8 text-2xl font-semibold text-color-dark">
          Contact Information
        </h2>
        <div className="w-auto">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
          >
            <Image
              src="/images/edit-icon.svg"
              height={18}
              width={18}
              className="mr-1"
              alt="edit-icon"
            />
            edit
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          <div className="flex w-full flex-wrap py-3.5">
            <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                email:
              </span>
            </div>
            <div className="mr-1 flex w-10/12  items-center justify-start sm:mr-0">
              <p className="text-base font-medium leading-4 text-color-dark">
                {userDetails?.email || "NA"}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap py-3.5">
            <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                Phone:
              </span>
            </div>
            <div className="mr-1 flex w-10/12  items-center justify-start sm:mr-0">
              <p className="text-base font-medium leading-4 text-color-dark">
                {userDetails?.cc} {userDetails?.phoneNumber || "NA"}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap py-3.5">
            <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                Social Links:
              </span>
            </div>
            <div className="mr-1 flex w-10/12  items-center justify-start sm:mr-0">
              <div className="flex gap-x-3 text-base font-medium capitalize leading-4 text-color-dark">
                {getSocialLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
