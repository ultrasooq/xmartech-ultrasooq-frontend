"use client";
import { useMe } from "@/apis/queries/user.queries";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileCard from "@/components/modules/freelancerProfileDetails/ProfileCard";
import InformationSection from "@/components/modules/freelancerProfileDetails/InformationSection";
import ReviewSection from "@/components/modules/freelancerProfileDetails/ReviewSection";
import MoreInformationSection from "@/components/modules/freelancerProfileDetails/MoreInformationSection";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ServicesSection from "@/components/shared/ServicesSection";
import ProductsSection from "@/components/modules/freelancerProfileDetails/ProductsSection";
import { PlusIcon } from "@radix-ui/react-icons";
import Footer from "@/components/shared/Footer";
import { useVendorDetails } from "@/apis/queries/product.queries";
import VendorCard from "@/components/modules/companyProfileDetails/VendorCard";
import VendorInformationSection from "@/components/modules/freelancerProfileDetails/VendorInformationSection";
import VendorMoreInformationSection from "@/components/modules/freelancerProfileDetails/VendorMoreInformationSection";

export default function FreelancerProfileDetailsPage() {
  const router = useRouter();
  const userDetails = useMe();
  const [activeSellerId, setActiveSellerId] = useState<string | null>();

  const vendorQuery = useVendorDetails(
    {
      adminId: activeSellerId || "",
    },
    !!activeSellerId,
  );

  const vendor = vendorQuery.data?.data;

  const handleFreelancerProfilePage = () => router.push("/profile");
  const handleEditFreelancerProfilePage = () =>
    router.push(`/freelancer-profile/edit-profile`);
  const handleEditFreelancerBranchPage = () =>
    router.push(
      `/freelancer-profile/edit-branch?branchId=${userDetails.data?.data?.userBranch?.[0]?.id}`,
    );
  const handleAddFreelancerBranchPage = () =>
    router.push("/freelancer-profile");

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let sellerId = params.get("userId");
    setActiveSellerId(sellerId);
  }, []);

  return (
    <>
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
                My Profile
              </h2>
            </div>

            {!activeSellerId ? (
              <ProfileCard
                userDetails={userDetails.data?.data}
                onEdit={handleFreelancerProfilePage}
              />
            ) : null}

            {/* importing from company module */}
            {activeSellerId ? (
              <VendorCard vendor={vendor} isLoading={vendorQuery.isLoading} />
            ) : null}

            <div className="mt-12 w-full">
              <Tabs defaultValue="profile-info">
                <TabsList className="mb-1 grid min-h-[80px] w-[560px] grid-cols-3 gap-x-6 rounded-none bg-transparent px-0 pt-7">
                  <TabsTrigger
                    value="profile-info"
                    className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                  >
                    Profile Info
                  </TabsTrigger>
                  {!activeSellerId ? (
                    <TabsTrigger
                      value="ratings"
                      className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                    >
                      Ratings & Reviews
                    </TabsTrigger>
                  ) : null}
                  <TabsTrigger
                    value="products"
                    className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                  >
                    Products
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile-info" className="mt-0">
                  <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                    {!activeSellerId ? (
                      <InformationSection
                        userDetails={userDetails.data?.data}
                        onEdit={handleFreelancerProfilePage}
                      />
                    ) : null}

                    {activeSellerId ? (
                      <VendorInformationSection vendor={vendor} />
                    ) : null}

                    {!userDetails.data?.data?.userBranch?.length ? (
                      <>
                        <p className="pt-5 text-center text-lg font-medium text-color-dark">
                          No Branch Exists
                        </p>
                        {!activeSellerId ? (
                          <div className="mb-5 flex w-full items-center justify-end pt-4">
                            <button
                              type="button"
                              onClick={handleAddFreelancerBranchPage}
                              className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
                            >
                              <PlusIcon className="mr-1 h-5 w-5" />
                              Add
                            </button>
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    {!activeSellerId &&
                    userDetails?.data?.data?.userBranch?.length ? (
                      <MoreInformationSection
                        userDetails={userDetails.data?.data}
                        onEditProfile={handleEditFreelancerProfilePage}
                        onEditBranch={handleEditFreelancerBranchPage}
                      />
                    ) : null}

                    {activeSellerId &&
                    userDetails?.data?.data?.userBranch?.length ? (
                      <VendorMoreInformationSection vendor={vendor} />
                    ) : null}
                  </div>
                </TabsContent>
                <TabsContent value="ratings" className="mt-0">
                  <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                    <ReviewSection />
                  </div>
                </TabsContent>
                <TabsContent value="products" className="mt-0">
                  <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                    <ProductsSection sellerId={activeSellerId as string} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
