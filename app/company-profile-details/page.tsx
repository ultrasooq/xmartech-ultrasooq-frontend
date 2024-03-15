"use client";
import { useMe } from "@/apis/queries/user.queries";
import BranchSection from "@/components/modules/companyProfileDetails/BranchSection";
import InformationSection from "@/components/modules/companyProfileDetails/InformationSection";
import MoreInformationSection from "@/components/modules/companyProfileDetails/MoreInformationSection";
import ProfileCard from "@/components/modules/companyProfileDetails/ProfileCard";
import TagInformationSection from "@/components/modules/companyProfileDetails/TagInformationSection";
import RatingsSection from "@/components/shared/RatingsSection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServicesSection from "@/components/shared/ServicesSection";

export default function CompanyProfileDetailsPage() {
  const router = useRouter();
  const userDetails = useMe();

  const handleCompanyProfilePage = () => router.push("/profile");
  const handleEditCompanyPage = () =>
    router.push("/company-profile/edit-profile");
  const handleEditCompanyBranchPage = (branchId: number) =>
    router.push(`/company-profile/edit-branch?branchId=${branchId}`);

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
              Profile
            </h2>
          </div>
          <ProfileCard
            userDetails={userDetails.data?.data}
            onEdit={handleEditCompanyPage}
          />

          <div className="mt-12 w-full">
            <Tabs defaultValue="profile-info">
              <TabsList className="mb-1 grid min-h-[80px] w-[560px] grid-cols-3 gap-x-6 rounded-none bg-transparent px-0 pt-7">
                <TabsTrigger
                  value="profile-info"
                  className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                >
                  Profile Info
                </TabsTrigger>
                <TabsTrigger
                  value="ratings"
                  className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                >
                  Ratings & Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                >
                  Services
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile-info" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <InformationSection
                    userDetails={userDetails.data?.data}
                    onEdit={handleCompanyProfilePage}
                  />
                  <MoreInformationSection
                    userDetails={userDetails.data?.data}
                    onEdit={handleEditCompanyPage}
                  />
                  {/* Branch Section */}
                  <div className="mb-4 w-full border-b-2 border-dashed border-gray-200 pt-4">
                    <div className="flex w-full flex-wrap items-center justify-between pb-5">
                      <h2 className="left-8 text-2xl font-semibold text-color-dark">
                        Branch Information
                      </h2>
                    </div>
                    {userDetails.data?.data?.userBranch.map((item: any) => (
                      <React.Fragment key={item.id}>
                        <BranchSection
                          branchDetails={item}
                          onEditBranch={() =>
                            handleEditCompanyBranchPage(item.id)
                          }
                        />
                        <div className="border-b-2 border-dashed border-gray-200" />
                        <TagInformationSection tagDetails={item} />
                        <div className="mb-5 border-b-2 border-dashed border-gray-200" />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ratings" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <RatingsSection />
                </div>
              </TabsContent>
              <TabsContent value="services" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <ServicesSection />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
