import React from "react";
import Image from "next/image";
import PlateEditor from "@/components/shared/Plate/PlateEditor";
import { handleDescriptionParse } from "@/utils/helper";
import EditIcon from "@/public/images/edit-icon.svg";
import Link from "next/link";

type MoreInformationSectionProps = {
  userDetails: any;
};

const MoreInformationSection: React.FC<MoreInformationSectionProps> = ({
  userDetails,
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex w-full flex-wrap items-center justify-between pb-5">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-lg font-bold text-color-dark">
            More Information
          </h2>
          {userDetails?.userBranch?.length ? (
            <div className="w-auto">
              <Link
                href={`/company-profile/edit-profile?userId=${userDetails?.id}`}
                className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
              >
                <Image
                  src={EditIcon}
                  height={18}
                  width={18}
                  className="mr-1"
                  alt="edit-icon"
                />
                edit
              </Link>
            </div>
          ) : null}
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
            <div className="flex w-full flex-wrap items-start py-4">
              <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                  About Us:
                </span>
              </div>
            </div>

            <PlateEditor
              description={
                userDetails?.userProfile?.[0]?.aboutUs
                  ? handleDescriptionParse(
                      userDetails?.userProfile?.[0]?.aboutUs,
                    )
                  : undefined
              }
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInformationSection;
