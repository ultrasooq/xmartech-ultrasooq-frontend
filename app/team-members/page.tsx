"use client"; // Add this at the top
import React, { useEffect, useMemo, useRef, useState } from "react";
// import Pagination from "@/components/shared/Pagination";
import { IoMdAdd } from "react-icons/io";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddToMemberForm from "@/components/modules/teamMembers/AddToMemberForm";
import Pagination from "@/components/shared/Pagination";
import { useAllMembers } from "@/apis/queries/member.queries";
import { Info } from "lucide-react";
import Link from "next/link";
import { PERMISSION_TEAM_MEMBERS, checkPermission } from "@/helpers/permission";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const TeamMembersPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const hasPermission = checkPermission(PERMISSION_TEAM_MEMBERS);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [isAddToMemberModalOpen, setIsAddToMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const wrapperRef = useRef(null);

  const handleToggleAddModal = () =>
    setIsAddToMemberModalOpen(!isAddToMemberModalOpen);

  const membersQuery = useAllMembers(
    {
      page,
      limit,
    },
    hasPermission,
  );

  const memoizedMember = useMemo(() => {
    return membersQuery?.data?.data
      ? membersQuery.data.data.map((item: any) => ({
          id: item?.id,
          userDetailId: item?.userId,
          firstName: item?.userDetail?.firstName,
          lastName: item?.userDetail?.lastName,
          email: item?.userDetail?.email,
          phoneNumber: item?.userDetail?.phoneNumber,
          userRoleId: item?.userRoleId,
          userRoleName: item?.userRolDetail?.userRoleName,
          employeeId: item?.userDetail?.employeeId,
          status: item?.status,
        }))
      : [];
  }, [membersQuery?.data?.data]);

  const handleClose = () => {
    setIsAddToMemberModalOpen(false);
    setSelectedMember("");
  };

  const handleEditMode = (memBerInfo: any) => {
    setSelectedMember(memBerInfo);
    handleToggleAddModal();
  };

  useEffect(() => {
    if (!hasPermission) router.push("/home");
  }, []);

  if (!hasPermission) return <div></div>;

  return (
    <section className="team_members_section">
      <div className="container relative z-10 m-auto px-3">
        <div className="flex w-full flex-wrap">
          <div className="mb-5 w-full">
            <ul className="flex w-full items-center justify-start gap-1">
              <Link
                href={"/team-members"}
                className="flex items-center border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
              >
                {t("team_members")}
              </Link>
              <Link
                href={"/role-settings"}
                className="flex items-center border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
              >
                {t("role")}
              </Link>
            </ul>
          </div>
          <div className="team_members_heading w-full">
            <h1>{t("team_members")}</h1>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={handleToggleAddModal}>
                <IoMdAdd /> {t("add_new_member")}
              </button>
              {/* <Link
                href={"/role-settings"}
                className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
              >
                <IoMdAdd />
                Go to Role
              </Link> */}
            </div>
          </div>
          <div className="team_members_table w-full">
            {!membersQuery?.isLoading && memoizedMember.length ? (
              <>
                <table cellPadding={0} cellSpacing={0} border={0}>
                  <thead>
                    <tr>
                      <th>{t("name")}</th>
                      <th>{t("email")}</th>
                      <th>{t("phone_number")}</th>
                      <th>{t("role")}</th>
                      <th>{t("employee_id")}</th>
                      <th>{t("account_status")}</th>
                      <th>{t("action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {memoizedMember?.map((item: any) => (
                      <>
                        <tr>
                          <td>
                            {item?.firstName} {item?.lastName}
                          </td>
                          <td>{item.email || "--"}</td>
                          <td>{item.phoneNumber || "---"}</td>
                          <td>{item.userRoleName || "--"}</td>
                          <td>{item.employeeId || "--"}</td>
                          <td>{item.status || "--"}</td>
                          <td>
                            {" "}
                            <Info
                              className="h-4 w-4 cursor-pointer text-gray-500"
                              onClick={() => handleEditMode(item)}
                            />
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </>
            ) : null}

            {!membersQuery?.isLoading && !memoizedMember.length ? (
              <p className="py-10 text-center text-sm font-medium">
                {t("no_members_found")}
              </p>
            ) : null}

            {membersQuery.data?.totalCount > limit && (
              <Pagination
                page={page}
                setPage={setPage}
                totalCount={membersQuery.data?.totalCount}
                limit={limit}
              />
            )}
          </div>
        </div>
      </div>
      <Dialog open={isAddToMemberModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent
          className="add-new-address-modal add_member_modal gap-0 p-0 md:!max-w-2xl"
          ref={wrapperRef}
        >
          <AddToMemberForm
            onClose={handleClose}
            memberDetails={selectedMember}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamMembersPage;
