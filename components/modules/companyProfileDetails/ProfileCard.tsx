import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  getCurrentDay,
  getCurrentTime,
  getInitials,
  parsedDays,
} from "@/utils/helper";
import { COMPANY_UNIQUE_ID } from "@/utils/constants";
import { cn } from "@/lib/utils";

type ProfileCardProps = {
  userDetails: any;
  onEdit: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ userDetails, onEdit }) => {
  const memoizedInitials = useMemo(
    () => getInitials(userDetails?.firstName, userDetails?.lastName),
    [userDetails?.firstName, userDetails?.lastName],
  );

  const isOnlineToday = useMemo(() => {
    const getActiveDays = userDetails?.userBranch
      ?.map((item: any) => {
        return parsedDays(item?.workingDays)?.includes(getCurrentDay());
      })
      .includes(true);

    const isActiveInCurrentDay = userDetails?.userBranch
      ?.map((item: any) => {
        return (
          item?.startTime <= getCurrentTime && item?.endTime >= getCurrentTime
        );
      })
      .includes(true);

    return getActiveDays && isActiveInCurrentDay;
  }, [
    userDetails?.userBranch?.map((item: any) => item?.workingDays),
    userDetails?.userBranch?.map((item: any) => item?.startTime),
    userDetails?.userBranch?.map((item: any) => item?.endTime),
  ]);

  return (
    <div className="flex w-full flex-wrap rounded-3xl border border-solid border-gray-300 bg-white p-4 shadow-md md:p-9">
      <Avatar className="h-40 w-40 rounded-2xl">
        <AvatarImage src={userDetails?.profilePicture} alt="image-icon" />
        <AvatarFallback className="text-5xl font-bold">
          {memoizedInitials || "NA"}
        </AvatarFallback>
      </Avatar>
      {/* <div className="relative mt-4 h-40 w-40 rounded-full">
        <div className="h-full w-full overflow-hidden rounded-2xl">
          <img
            src="images/company-logo.png"
            className="h-full w-full object-cover"
          />
        </div>
      </div> */}
      <div className="w-full p-3 md:w-[calc(100%_-_10rem)] md:pl-7">
        <div className="flex w-full flex-wrap items-center justify-between">
          <h2 className="left-8 text-3xl font-semibold text-color-dark">
            {userDetails?.firstName || "NA"} {userDetails?.lastName}
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
        <div className="mt-3 h-auto w-full"></div>
        <div className="text-normal mt-4 w-full text-sm font-normal leading-4 text-gray-500">
          <p>
            Annual Purchasing Volume:{" "}
            <span className="font-bold text-dark-cyan">
              {userDetails?.userProfile?.[0]?.annualPurchasingVolume
                ? `$${userDetails.userProfile[0].annualPurchasingVolume}`
                : "NA"}
            </span>
          </p>
        </div>
        <div className="text-normal mt-4 w-full text-sm font-normal leading-4 text-gray-500">
          <p>Business Type</p>
          {userDetails?.userProfile?.[0]?.userProfileBusinessType?.map(
            (item: any) => (
              <span
                key={item?.id}
                className="mr-3 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-semibold leading-5 text-dark-cyan"
              >
                {item?.userProfileBusinessTypeTag?.tagName}
              </span>
            ),
          )}
        </div>
        <div className="mt-4 flex w-full flex-wrap items-center justify-between">
          <div className="my-2 text-sm font-normal leading-4 text-gray-500">
            <p>
              Company ID:
              <span className="text-base font-medium leading-4 text-gray-600">
                {userDetails?.uniqueId
                  ? `${COMPANY_UNIQUE_ID}${userDetails?.uniqueId}`
                  : "NA"}
              </span>
            </p>
          </div>
          <div className="my-2 flex flex-wrap items-center justify-between">
            <span
              className={cn(
                "mr-2.5 text-sm font-bold leading-6",
                isOnlineToday ? "text-light-green" : "text-red-500",
              )}
            >
              {isOnlineToday ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
