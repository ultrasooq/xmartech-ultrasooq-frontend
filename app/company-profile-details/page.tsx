"use client";
import { useMe } from "@/apis/queries/user.queries";
import BranchSection from "@/components/modules/companyProfileDetails/BranchSection";
import InformationSection from "@/components/modules/companyProfileDetails/InformationSection";
import MoreInformationSection from "@/components/modules/companyProfileDetails/MoreInformationSection";
import ProfileCard from "@/components/modules/companyProfileDetails/ProfileCard";
import TabViewSection from "@/components/modules/companyProfileDetails/TabViewSection";
import TagInformationSection from "@/components/modules/companyProfileDetails/TagInformationSection";
import RatingsSection from "@/components/shared/RatingsSection";
import Image from "next/image";
import React from "react";

export default function CompanyProfileDetailsPage() {
  const userDetails = useMe();

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
              Company Profile
            </h2>
          </div>
          <ProfileCard userDetails={userDetails.data?.data} />
          <div className="mt-12 w-full">
            <TabViewSection />
            <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
              <div className="w-full">
                <InformationSection userDetails={userDetails.data?.data} />
                <MoreInformationSection userDetails={userDetails.data?.data} />
                {/* Branch Section */}
                <div className="mb-4 w-full border-b-2 border-dashed border-gray-200 pt-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                    <h2 className="left-8 text-2xl font-semibold text-color-dark">
                      Branch Information
                    </h2>
                  </div>
                  {userDetails.data?.data?.userBranch.map((item: any) => (
                    <>
                      <BranchSection branchDetails={item} />
                      <TagInformationSection tagDetails={item} />
                    </>
                  ))}
                </div>
              </div>
              <RatingsSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
