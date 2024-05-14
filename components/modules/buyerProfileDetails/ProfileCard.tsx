import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/helper";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateProfile } from "@/apis/queries/user.queries";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import ConfirmContent from "@/components/shared/ConfirmContent";
import ReactSelect from "react-select";

const customStyles = {
  control: (base: any) => ({
    ...base,
    width: 200,
    minHeight: 48,
  }),
};

type ProfileCardProps = {
  userDetails: any;
  onEdit: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ userDetails, onEdit }) => {
  const { toast } = useToast();
  const router = useRouter();
  const updateProfile = useUpdateProfile();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [tradeRole, setTradeRole] = useState({
    label: "",
    value: "",
  });

  const memoizedInitials = useMemo(
    () => getInitials(userDetails?.firstName, userDetails?.lastName),
    [userDetails?.firstName, userDetails?.lastName],
  );

  const handleConfirmModal = () => setIsConfirmModalOpen(!isConfirmModalOpen);

  const handleTradeRole = async () => {
    if (!tradeRole.value) return;

    const data: { tradeRole: string } = {
      tradeRole: tradeRole.value,
    };

    console.log(data);
    // return;
    const response = await updateProfile.mutateAsync(data);
    if (response.status && response.data) {
      toast({
        title: "Trade Role Update Successful",
        description: response.message,
        variant: "success",
      });
      setIsConfirmModalOpen(false);
      if (response.data.tradeRole === "FREELANCER") {
        router.replace("/freelancer-profile-details");
      } else if (response.data.tradeRole === "COMPANY") {
        router.replace("/company-profile-details");
      }
    } else {
      setIsConfirmModalOpen(false);
      toast({
        title: "Trade Role Update Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (userDetails?.tradeRole === "BUYER") {
      setTradeRole({
        label:
          userDetails?.tradeRole?.charAt(0) +
          userDetails?.tradeRole?.substring(1).toLowerCase(),
        value: userDetails?.tradeRole,
      });
    }
  }, [userDetails?.tradeRole]);

  // console.log(tradeRole);

  return (
    <div className="flex w-full flex-wrap rounded-3xl border border-solid border-gray-300 bg-white p-4 shadow-md md:p-9">
      <div className="relative mx-auto h-40 w-40 rounded-full">
        <Avatar className="h-40 w-40">
          <AvatarImage src={userDetails?.profilePicture} alt="image-icon" />
          <AvatarFallback className="text-5xl font-bold">
            {memoizedInitials}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full p-3 md:w-[calc(100%_-_10rem)] md:pl-7">
        <div className="flex w-full flex-wrap items-center justify-between">
          <h2 className="left-8 text-3xl font-semibold text-color-dark">
            {userDetails?.firstName || "NA"} {userDetails?.lastName}
          </h2>
          <div className="w-auto">
            <button
              type="button"
              onClick={onEdit}
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
                {userDetails?.email || "NA"}
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
                {userDetails?.phoneNumber || "NA"}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-5 flex w-full flex-wrap items-center justify-end">
          <div className="my-2 flex flex-wrap items-center justify-between">
            <p className="mr-2.5 text-sm font-bold leading-6">Trade Role</p>
          </div>
          {/* <select
            className="!h-12 w-[200px] rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
            onChange={(e) => {
              setIsConfirmModalOpen(true);
              if (!isConfirmed) return;

              setTradeRole(e.target.value);
            }}
            value={tradeRole}
          >
            <option value="">Select</option>
            <option value="FREELANCER">Freelancer</option>
            <option value="COMPANY">Company</option>
          </select> */}

          <ReactSelect
            options={[
              { value: "", label: "Select" },
              { value: "BUYER", label: "Buyer" },
              { value: "FREELANCER", label: "Freelancer" },
              { value: "COMPANY", label: "Company" },
            ]}
            onChange={(e) => {
              if (e?.value === "" || e?.value === userDetails?.tradeRole) {
                return;
              }
              setTradeRole(e!);
              setIsConfirmModalOpen(true);
            }}
            value={tradeRole}
            styles={customStyles}
          />
        </div>
      </div>
      <Dialog open={isConfirmModalOpen} onOpenChange={handleConfirmModal}>
        <ConfirmContent
          onClose={() => {
            setIsConfirmModalOpen(false);
            setTradeRole({
              label:
                userDetails?.tradeRole?.charAt(0) +
                userDetails?.tradeRole?.substring(1).toLowerCase(),
              value: userDetails?.tradeRole,
            });
          }}
          onConfirm={() => handleTradeRole()}
          isLoading={updateProfile.isPending}
          description="change role"
        />
      </Dialog>
    </div>
  );
};

export default ProfileCard;
