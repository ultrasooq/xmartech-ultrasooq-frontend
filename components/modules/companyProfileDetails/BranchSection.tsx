import React, { useMemo } from "react";
import { getAmPm, parsedDays } from "@/utils/helper";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type BranchSectionProps = {
  branchDetails: any;
  onEditBranch: () => void;
};

const BranchSection: React.FC<BranchSectionProps> = ({
  branchDetails,
  onEditBranch,
}) => {
  const memoizedParsedDays = useMemo(
    () => parsedDays(branchDetails?.workingDays),
    [branchDetails?.workingDays],
  );

  return (
    <Accordion
      type="single"
      collapsible
      className="mb-5 w-full rounded-lg border border-solid border-gray-300 "
    >
      <AccordionItem value="item-1" className="border-b-0 !bg-[#FAFAFA] px-3">
        <AccordionTrigger className="flex h-auto min-h-[48px] justify-between py-0 hover:!no-underline">
          <div className="flex w-full items-center justify-between px-4 py-4">
            <div className="flex w-auto items-start text-base font-medium text-color-dark">
              {branchDetails?.userBranchBusinessType?.map(
                (item: any, index: number, array: any[]) => (
                  <span className="mr-1.5" key={item?.id}>
                    {`${item?.userBranch_BusinessType_Tag?.tagName}${index !== array.length - 1 ? ", " : ""}`}
                  </span>
                ),
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full border-t border-solid border-gray-300 bg-white px-5 py-4">
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={onEditBranch}
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
            <div className="flex w-full flex-wrap">
              <div className="w-7/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Address:
                    </span>
                  </div>
                  <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {branchDetails?.address || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-5/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Country:
                    </span>
                  </div>
                  <div className="mr-1 flex w-7/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium capitalize leading-4 text-color-dark">
                      {branchDetails?.country || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-7/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      City:
                    </span>
                  </div>
                  <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {branchDetails?.city || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-5/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Branch Contact Number:
                    </span>
                  </div>
                  <div className="mr-1 flex w-7/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {branchDetails?.cc} {branchDetails?.contactNumber || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-7/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Province:
                    </span>
                  </div>
                  <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {branchDetails?.province || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-5/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Branch Contact Name:
                    </span>
                  </div>
                  <div className="mr-1 flex w-7/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {branchDetails?.contactName || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-7/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Start Time:
                    </span>
                  </div>
                  <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {getAmPm(branchDetails?.startTime) || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-5/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      end time:
                    </span>
                  </div>
                  <div className="mr-1 flex w-7/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {getAmPm(branchDetails?.endTime) || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-7/12">
                <div className="flex w-full flex-wrap py-4">
                  <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                    <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                      Working Days:
                    </span>
                  </div>
                  <div className="mr-1 flex w-8/12  items-center justify-start sm:mr-0">
                    <p className="text-base font-medium leading-4 text-color-dark">
                      {memoizedParsedDays || "NA"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-wrap">
                <div className="w-7/12">
                  <div className="flex w-full flex-wrap py-4">
                    <div className="mb-3 mr-1 flex w-full items-center justify-start sm:mr-0">
                      <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                        Branch Front Picture:
                      </span>
                    </div>
                    <div className="mr-1 flex w-full  items-center justify-start sm:mr-0">
                      <div className="relative h-32 w-36 rounded-2xl border border-gray-300">
                        <Image
                          src={
                            branchDetails?.branchFrontPicture
                              ? branchDetails.branchFrontPicture
                              : "/images/no-image.jpg"
                          }
                          alt="branch-image"
                          className="object-cover"
                          fill
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-5/12">
                  <div className="flex w-full flex-wrap py-4">
                    <div className="mb-3 mr-1 flex w-full items-center justify-start sm:mr-0">
                      <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                        Proof of Address
                      </span>
                    </div>
                    <div className="mr-1 flex w-full  items-center justify-start sm:mr-0">
                      <div className="relative h-32 w-36 rounded-2xl border border-gray-300">
                        <Image
                          src={
                            branchDetails?.proofOfAddress
                              ? branchDetails.proofOfAddress
                              : "/images/no-image.jpg"
                          }
                          alt="branch-image"
                          className="object-cover"
                          fill
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BranchSection;
