"use client";
import { useMe, useUpdateProfile } from "@/apis/queries/user.queries";
import React, { useState } from "react";
import Image from "next/image";
import ProfileCard from "@/components/modules/buyerProfileDetails/ProfileCard";
import InformationSection from "@/components/modules/freelancerProfileDetails/InformationSection";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/shared/Footer";
import { Dialog } from "@/components/ui/dialog";
import TradeRoleUpgradeContent from "@/components/modules/buyerProfileDetails/TradleRoleUpgradeContent";
import ConfirmContent from "@/components/shared/ConfirmContent";
import { useToast } from "@/components/ui/use-toast";

const BuyerProfileDetailsPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [role, setRole] = useState<"COMPANY" | "FREELANCER">();
  const handleRoleModal = () => setIsRoleModalOpen(!isRoleModalOpen);
  const handleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen);
    setIsRoleModalOpen(false);
    setRole(undefined);
  };
  const handleBuyerProfilePage = () => router.push("/profile");

  const userDetails = useMe();
  const updateProfile = useUpdateProfile();
  const handleTradeRole = (role: "COMPANY" | "FREELANCER") => setRole(role);

  const onSubmit = async () => {
    if (!role) return;

    const data: { tradeRole: string } = {
      tradeRole: role,
    };

    const response = await updateProfile.mutateAsync(data);
    if (response.status && response.data) {
      toast({
        title: "Trade Role Update Successful",
        description: response.message,
        variant: "success",
      });
      setIsConfirmModalOpen(false);
      setIsRoleModalOpen(false);
      setRole(undefined);
      if (response.data.tradeRole === "FREELANCER") {
        router.replace("/freelancer-profile");
      } else if (response.data.tradeRole === "COMPANY") {
        router.replace("/company-profile");
      }
    } else {
      setIsConfirmModalOpen(false);
      setIsRoleModalOpen(false);
      setRole(undefined);
      toast({
        title: "Trade Role Update Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

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

            <div className="mb-8 flex w-full items-center justify-between rounded-3xl bg-white p-9 font-normal shadow-md">
              <p className="text-2xl">Do you want to update your profile?</p>

              <button
                type="button"
                onClick={handleRoleModal}
                className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-xl font-medium capitalize leading-6 text-white"
              >
                Update
              </button>
            </div>

            <ProfileCard
              userDetails={userDetails.data?.data}
              onEdit={handleBuyerProfilePage}
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
                </TabsList>
                <TabsContent value="profile-info" className="mt-0">
                  <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
                    <InformationSection
                      userDetails={userDetails.data?.data}
                      onEdit={handleBuyerProfilePage}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <Dialog open={isRoleModalOpen} onOpenChange={handleRoleModal}>
          <TradeRoleUpgradeContent
            onClose={() => {
              setIsRoleModalOpen(false);
              setRole(undefined);
            }}
            onConfirmRole={(value) => {
              handleTradeRole(value);
              setIsConfirmModalOpen(true);
            }}
          />
        </Dialog>

        <Dialog open={isConfirmModalOpen} onOpenChange={handleConfirmModal}>
          <ConfirmContent
            onClose={() => {
              setIsRoleModalOpen(false);
              setIsConfirmModalOpen(false);
              setRole(undefined);
            }}
            onConfirm={() => onSubmit()}
            isLoading={updateProfile.isPending}
            description="change role"
          />
        </Dialog>
      </section>

      <Footer />
    </>
  );
};

export default BuyerProfileDetailsPage;
