import Image from "next/image";
import React from "react";

type MoreInformationSectionProps = {
  userDetails: any;
  onEdit: () => void;
};

const MoreInformationSection: React.FC<MoreInformationSectionProps> = ({
  userDetails,
  onEdit,
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex w-full flex-wrap items-center justify-between pb-5">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-lg font-bold text-color-dark">
            More Information
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
      </div>
      <div className="w-full">
        <div className="flex w-full flex-wrap">
          <div className="w-7/12">
            <div className="flex w-full flex-wrap py-4">
              <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                  Year of Establishment:
                </span>
              </div>
              <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                <p className="text-base font-medium leading-4 text-color-dark">
                  {userDetails?.userProfile?.[0]?.yearOfEstablishment || "NA"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-5/12">
            <div className="flex w-full flex-wrap py-4">
              <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                  no. of employees:
                </span>
              </div>
              <div className="mr-1 flex w-7/12  items-center justify-start sm:mr-0">
                <p className="text-base font-medium leading-4 text-color-dark">
                  {userDetails?.userProfile?.[0]?.totalNoOfEmployee || "NA"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full flex-wrap py-4">
              <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                  About Us:
                </span>
              </div>
              <div className="mr-1 flex w-10/12  items-center justify-start pl-7 sm:mr-0">
                <p className="text-base font-medium leading-6 text-color-dark">
                  {userDetails?.userProfile?.[0]?.aboutUs || "NA"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInformationSection;
