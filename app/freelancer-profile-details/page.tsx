"use client";
import { useMe } from "@/apis/queries/user.queries";
import React from "react";
import Image from "next/image";
import ProfileCard from "@/components/modules/freelancerProfileDetails/ProfileCard";
import InformationSection from "@/components/modules/freelancerProfileDetails/InformationSection";
import RatingsSection from "@/components/shared/RatingsSection";
import TabViewSection from "@/components/modules/freelancerProfileDetails/TabViewSection";
import MoreInformationSection from "@/components/modules/freelancerProfileDetails/MoreInformationSection";

export default function FreelancerProfileDetailsPage() {
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
              Freelancer Profile
            </h2>
          </div>
          <ProfileCard userDetails={userDetails.data?.data} />
          <div className="mt-12 w-full">
            <TabViewSection />
            <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
              <div className="w-full">
                <InformationSection userDetails={userDetails.data?.data} />
                <MoreInformationSection userDetails={userDetails.data?.data} />
              </div>
              <RatingsSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
