"use client";
import { useMe } from "@/apis/queries/user.queries";
import { DAYS_NAME_LIST } from "@/utils/constants";
// import { useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function FreelancerProfileDetailsPage() {
  const userDetails = useMe();

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
    [userDetails.data?.data?.userBranch?.[0]?.workingDays],
  );

  const getInitials = useMemo(() => {
    const firstInitial = userDetails.data?.data?.firstName?.charAt(0) || "";
    const lastInitial = userDetails.data?.data?.lastName?.charAt(0) || "";
    return `${firstInitial}${lastInitial}`;
  }, [userDetails.data?.data?.firstName, userDetails.data?.data?.lastName]);

  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          src="/images/before-login-bg.png"
          className="h-full w-full object-cover object-center"
          alt="background"
          fill
          priority
        />
      </div>
      <div className="container relative z-10 m-auto px-3">
        <div className="flex flex-wrap">
          <div className="mb-7 w-full">
            <h2 className="text-4xl font-semibold leading-10 text-color-dark">
              Freelancer Profile
            </h2>
          </div>
          <div className="flex w-full flex-wrap rounded-3xl border border-solid border-gray-300 bg-white p-4 shadow-md md:p-9">
            <div className="relative m-auto h-40 w-40 rounded-full">
              <Avatar className="h-40 w-40">
                <AvatarImage src="null" alt="image-icon" />
                <AvatarFallback className="text-5xl font-bold">
                  {getInitials}
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
                  {userDetails.data?.data?.firstName || "NA"}{" "}
                  {userDetails.data?.data?.lastName}
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
                      {userDetails.data?.data?.email || "NA"}
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
                      {userDetails.data?.data?.cc}{" "}
                      {userDetails.data?.data?.phoneNumber || "NA"}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-normal mt-5 w-full text-sm font-normal leading-4 text-gray-500">
                <p>Business Type</p>
                <span className="mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan">
                  {
                    userDetails.data?.data?.userBranch?.[0]
                      ?.userBranchBusinessType?.[0]?.userBranch_BusinessType_Tag
                      ?.tagName
                  }
                </span>
              </div>
              <div className="mt-5 flex w-full flex-wrap items-center justify-between">
                <div className="my-2 text-sm font-normal leading-4 text-gray-500">
                  <p>
                    Freelancer ID:{" "}
                    <span className="text-base font-medium leading-4 text-gray-600">
                      NA
                    </span>
                  </p>
                </div>
                <div className="my-2 flex flex-wrap items-center justify-between">
                  <span className="mr-2.5 text-sm font-medium leading-6 text-light-green">
                    Online.
                  </span>
                  <select className="h-auto rounded border border-solid border-gray-300 bg-white px-4 py-3 text-sm font-normal leading-6 text-color-dark">
                    <option>Offline 9:30 pm</option>
                    <option>Online 10:30 am</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full">
            <div className="w-full">
              <ul className="flex flex-wrap items-center justify-start">
                <li className="mr-4 w-full sm:w-auto md:mr-6">
                  <a
                    href="#"
                    className="inline-block w-full bg-dark-orange px-6 py-3 text-center text-base font-semibold leading-6 text-white sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
                  >
                    Profile Info
                  </a>
                </li>
                <li className="mr-4 w-full sm:w-auto md:mr-6">
                  <a
                    href="#"
                    className="inline-block w-full bg-gray-300 px-6 py-3 text-center text-base font-semibold leading-6 text-zinc-500 sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
                  >
                    Ratings & Reviews
                  </a>
                </li>
                <li className="mr-4 w-full sm:w-auto md:mr-6">
                  <a
                    href="#"
                    className="inline-block w-full bg-gray-300 px-6 py-3 text-center text-base font-semibold leading-6 text-zinc-500 sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
              <div className="w-full">
                <div className="w-full border-b-2 border-dashed border-gray-200 py-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                    <h2 className="left-8 text-2xl font-semibold text-color-dark">
                      {userDetails.data?.data?.firstName || "NA"}{" "}
                      {userDetails.data?.data?.lastName}
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
                      <div className="flex w-full flex-wrap py-3.5">
                        <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                          <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                            email:
                          </span>
                        </div>
                        <div className="mr-1 flex w-10/12  items-center justify-start sm:mr-0">
                          <p className="text-base font-medium leading-4 text-color-dark">
                            {userDetails.data?.data?.email || "NA"}
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
                            {userDetails.data?.data?.cc}{" "}
                            {userDetails.data?.data?.phoneNumber || "NA"}
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
                          <p className="text-base font-medium leading-4 text-color-dark">
                            {/* Facebook, LInkedin, Instagram */}
                            NA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <p>
                          {userDetails.data?.data?.userProfile?.[0]?.aboutUs ||
                            "NA"}
                          {/* <a
                            href="#"
                            className="font-semibold text-dark-orange"
                          >
                            More
                          </a> */}
                        </p>
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
                              <p>
                                {userDetails.data?.data?.userBranch?.[0]
                                  ?.address || "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-5/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Country:</span>
                            </div>
                            <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                              <p>
                                {userDetails.data?.data?.userBranch?.[0]
                                  ?.country || "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                              <span>City:</span>
                            </div>
                            <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-9/12">
                              <p>
                                {userDetails.data?.data?.userBranch?.[0]
                                  ?.city || "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-5/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Branch Contact Number:</span>
                            </div>
                            <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                              <p>
                                {userDetails.data?.data?.userBranch?.[0]
                                  ?.contactName || "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                              <span>Province:</span>
                            </div>
                            <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-9/12">
                              <p>
                                {userDetails.data?.data?.userBranch?.[0]
                                  ?.province || "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-5/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Branch Contact Name:</span>
                            </div>
                            <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                              <p>
                                {
                                  userDetails.data?.data?.userBranch?.[0]
                                    ?.contactNumber
                                }
                              </p>
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
                              <span>
                                {
                                  userDetails.data?.data?.userBranch?.[0]
                                    ?.startTime
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>End Time:</span>
                            </div>
                            <div className="w-9/12 text-base font-medium leading-4 text-color-dark md:w-6/12">
                              <span>
                                {
                                  userDetails.data?.data?.userBranch?.[0]
                                    ?.endTime
                                }
                              </span>
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
                                {parsedDays(
                                  userDetails.data?.data?.userBranch?.[0]
                                    ?.workingDays,
                                )}
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
                        <span className="mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan">
                          Online Shop
                        </span>
                        <span className="mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan">
                          manufacturer / factory{" "}
                        </span>
                        <span className="mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan">
                          Trading Company
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex w-full flex-wrap items-center justify-between">
                  <div className="flex w-auto flex-wrap items-start justify-start">
                    <h2 className="mb-0 mr-7 text-2xl font-semibold leading-7 text-color-dark">
                      Ratings &amp; Reviews
                    </h2>
                    <div className="flex w-auto flex-col">
                      <div className="flex w-auto items-center justify-start">
                        <h4 className="mb-0 mr-2.5 text-2xl font-medium leading-7 text-color-dark">
                          5.0
                        </h4>
                        <span>
                          <Image
                            src="/images/star.svg"
                            width={19}
                            height={18}
                            alt="star-icon"
                          />
                        </span>
                        <span>
                          <Image
                            src="/images/star.svg"
                            width={19}
                            height={18}
                            alt="star-icon"
                          />
                        </span>
                        <span>
                          <Image
                            src="/images/star.svg"
                            width={19}
                            height={18}
                            alt="star-icon"
                          />
                        </span>
                        <span>
                          <Image
                            src="/images/star.svg"
                            width={19}
                            height={18}
                            alt="star-icon"
                          />
                        </span>
                        <span>
                          <Image
                            src="/images/star.svg"
                            width={19}
                            height={18}
                            alt="star-icon"
                          />
                        </span>
                      </div>
                      <div className="mt-1.5 w-auto text-sm font-medium leading-5 text-gray-500">
                        <p>Based on 139 Reviews</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto">
                    <button
                      type="button"
                      className="flex rounded-sm bg-dark-orange px-6 py-4 text-base font-bold leading-5 text-white"
                    >
                      <Image
                        src="/images/pen-icon.svg"
                        height={20}
                        width={20}
                        className="mr-2"
                        alt="pen-icon"
                      />
                      <span>Write A Review</span>
                    </button>
                  </div>
                </div>
                <div className="flex w-full items-center justify-end py-6">
                  <ul className="flex items-center justify-end">
                    <li className="ml-2 text-sm font-medium text-color-dark">
                      Sort By :
                    </li>
                    <li className="ml-2">
                      <a
                        href=""
                        className="block rounded-full border border-solid border-gray-300 px-10 py-3.5 text-sm font-medium text-gray-500"
                      >
                        Newest
                      </a>
                    </li>
                    <li className="ml-2">
                      <a
                        href=""
                        className="block rounded-full border border-solid border-gray-300 px-10 py-3.5 text-sm font-medium text-gray-500"
                      >
                        Newest
                      </a>
                    </li>
                    <li className="ml-2">
                      <a
                        href=""
                        className="block rounded-full border border-solid border-gray-300 px-10 py-3.5 text-sm font-medium text-gray-500"
                      >
                        Newest
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-5 flex w-full border-t-2 border-dashed border-gray-300 py-10">
                  <div className="flex-items flex w-full justify-between">
                    <div className="w-2/6 px-3.5">
                      <div className="w-full rounded-2xl border border-solid border-gray-300 px-5 py-5">
                        <div className="flex w-full flex-wrap items-start justify-between">
                          <div className="h-12 w-12 overflow-hidden rounded-full">
                            <img src="images/review-1.png" alt="review-icon" />
                          </div>
                          <div className="w-[calc(100%_-_3rem)] pl-3.5 text-sm font-normal leading-5 text-gray-500">
                            <div className="flex w-full items-start justify-between">
                              <h4 className="text-lg font-semibold text-color-dark">
                                John Doe
                              </h4>
                              <img
                                src="images/review-dot.svg"
                                alt="review-dot-icon"
                              />
                            </div>
                            <div className="w-full">
                              <h5 className="mb-1 text-xs font-normal text-gray-500">
                                2 reviews
                              </h5>
                              <div className="flex w-full items-start text-xs leading-5 text-gray-500">
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="ml-1">3 Weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                              <a href="#" className="font-semibold">
                                More.
                              </a>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/6 px-3.5">
                      <div className="w-full rounded-2xl border border-solid border-gray-300 px-5 py-5">
                        <div className="flex w-full flex-wrap items-start justify-between">
                          <div className="h-12 w-12 overflow-hidden rounded-full">
                            <img src="images/review-1.png" alt="review-icon" />
                          </div>
                          <div className="w-[calc(100%_-_3rem)] pl-3.5 text-sm font-normal leading-5 text-gray-500">
                            <div className="flex w-full items-start justify-between">
                              <h4 className="text-lg font-semibold text-color-dark">
                                John Doe
                              </h4>
                              <img
                                src="images/review-dot.svg"
                                alt="review-dot-icon"
                              />
                            </div>
                            <div className="w-full">
                              <h5 className="mb-1 text-xs font-normal text-gray-500">
                                2 reviews
                              </h5>
                              <div className="flex w-full items-start text-xs leading-5 text-gray-500">
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="ml-1">3 Weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                              <a href="#" className="font-semibold">
                                More.
                              </a>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/6 px-3.5">
                      <div className="w-full rounded-2xl border border-solid border-gray-300 px-5 py-5">
                        <div className="flex w-full flex-wrap items-start justify-between">
                          <div className="h-12 w-12 overflow-hidden rounded-full">
                            <img src="images/review-1.png" alt="review-icon" />
                          </div>
                          <div className="w-[calc(100%_-_3rem)] pl-3.5 text-sm font-normal leading-5 text-gray-500">
                            <div className="flex w-full items-start justify-between">
                              <h4 className="text-lg font-semibold text-color-dark">
                                John Doe
                              </h4>
                              <img
                                src="images/review-dot.svg"
                                alt="review-dot-icon"
                              />
                            </div>
                            <div className="w-full">
                              <h5 className="mb-1 text-xs font-normal text-gray-500">
                                2 reviews
                              </h5>
                              <div className="flex w-full items-start text-xs leading-5 text-gray-500">
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="mr-1">
                                  <img src="images/star.svg" alt="star-icon" />
                                </span>
                                <span className="ml-1">3 Weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                              <a href="#" className="font-semibold">
                                More.
                              </a>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center text-center text-base font-bold text-dark-orange">
                  <span className="flex">
                    <img src="images/loader.png" className="mr-1.5" /> Load More
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
