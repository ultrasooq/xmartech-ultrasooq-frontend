"use client";
import { useMe } from "@/apis/queries/user.queries";
import BranchSection from "@/components/modules/companyProfileDetails/BranchSection";
import InformationSection from "@/components/modules/companyProfileDetails/InformationSection";
import MoreInformationSection from "@/components/modules/companyProfileDetails/MoreInformationSection";
import ProfileCard from "@/components/modules/companyProfileDetails/ProfileCard";
import ReviewSection from "@/components/modules/freelancerProfileDetails/ReviewSection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ServicesSection from "@/components/shared/ServicesSection";
import { PlusIcon } from "@radix-ui/react-icons";
import ProductsSection from "@/components/modules/freelancerProfileDetails/ProductsSection";
import { stripHTML } from "@/utils/helper";
import { useProducts } from "@/apis/queries/product.queries";

export default function CompanyProfileDetailsPage() {
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

  const handleCompanyProfilePage = () => router.push("/profile");
  const handleAddCompanyBranchPage = () => {
    if (!userDetails.data?.data?.userBranch?.length) {
      router.push("/company-profile");
    } else {
      router.push("/company-profile/add-branch");
    }
  };
  const handleEditCompanyPage = () =>
    router.push(
      `/company-profile/edit-profile?userId=${userDetails.data?.data.id}`,
    );
  const handleEditCompanyBranchPage = (branchId: number) =>
    router.push(`/company-profile/edit-branch?branchId=${branchId}`);

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
          sizes="(100vw, 100vh)"
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
                  className="w-full rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white sm:w-auto"
                >
                  Profile Info
                </TabsTrigger>
                <TabsTrigger
                  value="ratings"
                  className="w-full rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white sm:w-auto"
                >
                  Ratings & Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="w-full rounded-b-none !bg-[#d1d5db] py-4 text-base font-bold !text-[#71717A] data-[state=active]:!bg-dark-orange data-[state=active]:!text-white sm:w-auto"
                >
                  Products
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile-info" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  <InformationSection
                    userDetails={userDetails.data?.data}
                    onEdit={handleCompanyProfilePage}
                  />
                  {userDetails.data?.data?.userBranch?.length ? (
                    <MoreInformationSection
                      userDetails={userDetails.data?.data}
                      onEdit={handleEditCompanyPage}
                    />
                  ) : null}

                  {/* Branch Section */}
                  {!userDetails.data?.data?.userBranch?.length ? (
                    <p className="pt-5 text-center text-lg font-medium text-color-dark">
                      No Branch Exists
                    </p>
                  ) : null}
                  <div className="mb-4 w-full pt-4">
                    <div className="mb-5 flex w-full items-center justify-end">
                      <button
                        type="button"
                        onClick={handleAddCompanyBranchPage}
                        className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
                      >
                        <PlusIcon className="mr-1 h-5 w-5" />
                        Add
                      </button>
                    </div>
                    {userDetails.data?.data?.userBranch
                      .sort((a: any, b: any) => b?.mainOffice - a?.mainOffice)
                      .map((item: any) => (
                        <React.Fragment key={item.id}>
                          <BranchSection
                            branchDetails={item}
                            onEditBranch={() =>
                              handleEditCompanyBranchPage(item.id)
                            }
                          />
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ratings" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  {/* importing from freelancer details module */}
                  <ReviewSection />
                </div>
              </TabsContent>
              <TabsContent value="products" className="mt-0">
                <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                  {/* importing from freelancer details module */}
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
