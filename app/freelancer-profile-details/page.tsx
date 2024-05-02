"use client";
import { useMe } from "@/apis/queries/user.queries";
import React, { useMemo } from "react";
import Image from "next/image";
import ProfileCard from "@/components/modules/freelancerProfileDetails/ProfileCard";
import InformationSection from "@/components/modules/freelancerProfileDetails/InformationSection";
import ReviewSection from "@/components/modules/freelancerProfileDetails/ReviewSection";
import MoreInformationSection from "@/components/modules/freelancerProfileDetails/MoreInformationSection";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ServicesSection from "@/components/shared/ServicesSection";
import ProductsSection from "@/components/modules/freelancerProfileDetails/ProductsSection";
import { useProducts } from "@/apis/queries/product.queries";
import { stripHTML } from "@/utils/helper";

export default function FreelancerProfileDetailsPage() {
  const router = useRouter();
  const userDetails = useMe();
  const productsQuery = useProducts(
    {
      userId: String(userDetails?.data?.data?.id),
      page: 1,
      limit: 10,
      status: "ALL",
    },
    !!userDetails?.data?.data?.id,
  );

  const handleFreelancerProfilePage = () => router.push("/profile");
  const handleEditFreelancerProfilePage = () =>
    router.push(`/freelancer-profile/edit-profile`);
  const handleEditFreelancerBranchPage = () =>
    router.push(
      `/freelancer-profile/edit-branch?branchId=${userDetails.data?.data?.userBranch?.[0]?.id}`,
    );

  const memoizedProducts = useMemo(() => {
    return (
      productsQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productName: item?.productName || "-",
          productPrice: item?.productPrice || 0,
          offerPrice: item?.offerPrice || 0,
          productImage: item?.productImages?.[0]?.image,
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo,
          brandName: item?.brand?.brandName || "-",
          productReview: item?.productReview || [],
          shortDescription: item?.shortDescription
            ? stripHTML(item?.shortDescription)
            : "-",
          status: item?.status || "-",
        };
      }) || []
    );
  }, [productsQuery.data?.data]);

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
              My Profile
            </h2>
          </div>
          <ProfileCard
            userDetails={userDetails.data?.data}
            onEdit={handleFreelancerProfilePage}
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
                  value="products"
                  className="rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white"
                >
                  Products
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile-info" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <InformationSection
                    userDetails={userDetails.data?.data}
                    onEdit={handleFreelancerProfilePage}
                  />
                  <MoreInformationSection
                    userDetails={userDetails.data?.data}
                    onEditProfile={handleEditFreelancerProfilePage}
                    onEditBranch={handleEditFreelancerBranchPage}
                  />
                </div>
              </TabsContent>
              <TabsContent value="ratings" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <ReviewSection />
                </div>
              </TabsContent>
              <TabsContent value="products" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <ProductsSection list={memoizedProducts} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
