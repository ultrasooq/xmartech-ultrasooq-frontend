import React, { useMemo } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FREELANCER_UNIQUE_ID } from "@/utils/constants";
import { getInitials } from "@/utils/helper";

type ProfileCardProps = {
  userDetails: any;
  onEdit: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ userDetails, onEdit }) => {
  const memoizedInitials = useMemo(
    () => getInitials(userDetails?.firstName, userDetails?.lastName),
    [userDetails?.firstName, userDetails?.lastName],
  );

  return (
    <div className="flex w-full flex-wrap rounded-3xl border border-solid border-gray-300 bg-white p-4 shadow-md md:p-9">
      <div className="relative mx-auto h-40 w-40 rounded-full">
        <Avatar className="h-40 w-40">
          <AvatarImage src="null" alt="image-icon" />
          <AvatarFallback className="text-5xl font-bold">
            {memoizedInitials}
          </AvatarFallback>
        </Avatar>
        <div className="absolute bottom-2 right-0 z-10 h-11 w-11 rounded-full bg-gray-300">
          <div className="flex h-full w-full cursor-pointer flex-wrap items-center justify-center">
            <Image
              src="/images/camera-icon.png"
              width={20}
              height={20}
              alt="camera-icon"
            />
          </div>
          <input
            type="file"
            id="profile_impage_upload_input"
            accept="image/*"
            name="file"
            className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>
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
        <div className="mt-3 h-auto w-full">
          <ul className="flex flex-wrap items-center justify-start">
            <li className="justify-starts my-1.5 mr-3.5 flex items-center text-base font-normal leading-5 text-color-dark">
              <Image
                src="/images/profile-mail-icon.svg"
                className="mr-1.5"
                height={14}
                width={17}
                alt="profile-mail-icon"
              />
              <a href="mailto:john.rosensky@gmail.com">
                {userDetails?.email || "NA"}
              </a>
            </li>
            <li className="justify-starts my-1.5 mr-3.5 flex items-center text-base font-normal leading-5 text-color-dark">
              <Image
                src="/images/profile-call-icon.svg"
                className="mr-1.5"
                height={14}
                width={15}
                alt="profile-mail-icon"
              />
              <a href="tel:1 000 0000 0000">
                {userDetails?.cc} {userDetails?.phoneNumber || "NA"}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-normal mt-5 w-full text-sm font-normal leading-4 text-gray-500">
          <p>Business Type</p>
          {userDetails?.userBranch?.[0]?.userBranchBusinessType?.map(
            (item: any) => (
              <span
                key={item?.id}
                className="mr-3 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan"
              >
                {item?.userBranch_BusinessType_Tag?.tagName}
              </span>
            ),
          )}
        </div>
        <div className="mt-5 flex w-full flex-wrap items-center justify-between">
          <div className="my-2 text-sm font-normal leading-4 text-gray-500">
            <p>
              Freelancer ID:
              <span className="text-base font-medium leading-4 text-gray-600">
                {userDetails?.uniqueId
                  ? `${FREELANCER_UNIQUE_ID}${userDetails?.uniqueId}`
                  : "NA"}
              </span>
            </p>
          </div>
          <div className="my-2 flex flex-wrap items-center justify-between">
            <span className="mr-2.5 text-sm font-medium leading-6 text-light-green">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
