import React, { useMemo } from "react";
import Image from "next/image";
import { DAYS_NAME_LIST } from "@/utils/constants";

type MoreInformationSectionProps = {
  userDetails: any;
};

const MoreInformationSection: React.FC<MoreInformationSectionProps> = ({
  userDetails,
}) => {
  const parsedDays = useMemo(
    () => (data: string) => {
      if (!data) return;
      const days = JSON.parse(data);
      const response = Object.keys(days)
        .map((day) => {
          if (days[day] === 1) {
            return DAYS_NAME_LIST[day];
          }
        })
        .filter((item) => item)
        .join(", ");
      return response || "NA";
    },
    [userDetails?.userBranch?.[0]?.workingDays],
  );

  return (
    <div className="w-full py-4">
      <div className="flex w-full flex-wrap items-center justify-between pb-5">
        <h2 className="left-8 text-2xl font-semibold text-color-dark">
          Freelancer Information
        </h2>
        <div className="w-auto">
          <button
            type="button"
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
          <div className="flex w-full flex-col border-b-2 border-dashed border-gray-100 py-3.5 pb-5 text-base font-medium text-color-dark">
            <label className="mb-3 text-lg font-semibold leading-5 text-color-dark">
              About Me
            </label>
            <p>{userDetails?.userProfile?.[0]?.aboutUs || "NA"}</p>
          </div>
        </div>
        <div className="mt-6 w-full">
          <label className="mb-3.5 block text-lg font-semibold leading-5 text-color-dark">
            Address
          </label>
          <div className="flex w-full flex-wrap">
            <div className="w-full md:w-7/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                  <span>Address:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-9/12">
                  <p>{userDetails?.userBranch?.[0]?.address || "NA"}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                  <span>Country:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                  <p>{userDetails?.userBranch?.[0]?.country || "NA"}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-7/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                  <span>City:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-9/12">
                  <p>{userDetails?.userBranch?.[0]?.city || "NA"}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                  <span>Branch Contact Number:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                  <p>{userDetails?.userBranch?.[0]?.contactName || "NA"}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-7/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                  <span>Province:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-9/12">
                  <p>{userDetails?.userBranch?.[0]?.province || "NA"}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                  <span>Branch Contact Name:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                  <p>{userDetails?.userBranch?.[0]?.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <label className="mb-3 block text-lg font-semibold leading-5 text-color-dark">
            Working Hours
          </label>
          <div className="flex w-full flex-wrap">
            <div className="w-full md:w-6/12 lg:w-4/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                  <span>Start Time:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                  <span>{userDetails?.userBranch?.[0]?.startTime}</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                  <span>End Time:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                  <span>{userDetails?.userBranch?.[0]?.endTime}</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12">
              <div className="flex w-full py-2.5 md:py-3.5">
                <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                  <span>Working Days:</span>
                </div>
                <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                  <span>
                    {parsedDays(userDetails?.userBranch?.[0]?.workingDays)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <label className="mb-3 block text-lg font-semibold leading-5 text-color-dark">
            Tag
          </label>
          <div className="flex w-full flex-wrap">
            {userDetails?.userBranch?.[0]?.userBranchTags?.map((item: any) => (
              <span
                key={item.id}
                className="mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan"
              >
                {item?.userBranchTagsTag?.tagName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInformationSection;
