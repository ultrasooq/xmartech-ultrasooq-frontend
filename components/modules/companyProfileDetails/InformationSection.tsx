import Image from "next/image";
import React from "react";

type InformationSectionProps = {
  userDetails: any;
  onEdit: () => void;
};

const InformationSection: React.FC<InformationSectionProps> = ({
  userDetails,
  onEdit,
}) => {
  return (
    <div className="w-full border-b-2 border-dashed border-gray-200 py-4">
      <div className="flex w-full flex-wrap items-center justify-between pb-5">
        <h2 className="left-8 text-2xl font-semibold text-color-dark">
          Company Information
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
          <div className="mb-4 w-full">
            <label className="text-lg font-bold text-color-dark">
              Registration Address
            </label>
          </div>
          <div className="flex w-full flex-wrap">
            <div className="w-7/12">
              <div className="flex w-full flex-wrap py-4">
                <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                  <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                    email:
                  </span>
                </div>
                <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                  <p className="text-base font-medium leading-4 text-color-dark">
                    {userDetails?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-5/12">
              <div className="flex w-full flex-wrap py-4">
                <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                  <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                    Phone:
                  </span>
                </div>
                <div className="mr-1 flex w-7/12  items-center justify-start sm:mr-0">
                  <p className="text-base font-medium leading-4 text-color-dark">
                    {userDetails?.cc} {userDetails?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-7/12">
              <div className="flex w-full flex-wrap py-4">
                <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                  <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                    Social Links:
                  </span>
                </div>
                <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                  <p className="text-base font-medium leading-4 text-color-dark">
                    NA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
