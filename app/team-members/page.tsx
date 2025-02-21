"use client"; // Add this at the top
import React, { useMemo, useRef, useState } from "react";
import MemberCard from "@/components/modules/teamMembers/MemberCard";
// import Pagination from "@/components/shared/Pagination";
import { IoMdAdd } from "react-icons/io";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddToMemberForm from "@/components/modules/teamMembers/AddToMemberForm";
import Pagination from "@/components/shared/Pagination";
import { useAllMembers } from "@/apis/queries/member.queries";
import { Info } from "lucide-react";

const TeamMembersPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [isAddToMemberModalOpen, setIsAddToMemberModalOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleToggleAddModal = () =>
    setIsAddToMemberModalOpen(!isAddToMemberModalOpen);

   const membersQuery = useAllMembers({  
       page,
       limit,
     });

  const memoizedMember = useMemo(() => {
        return membersQuery?.data?.data
          ? membersQuery.data.data.map((item: any) => ({
              id: item?.id,
              userDetailId: item?.userId,
              fullName: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
              email: item?.userDetail?.email,
              userRoleName: item?.userDetail?.userRoleName,
              employeeId: item?.userDetail?.employeeId,
              status: item?.userDetail?.status,
            }))
          : [];
      }, [membersQuery?.data?.data]);

  return (
    <section className="team_members_section">
      <div className="container relative z-10 m-auto px-3">
        <div className="flex w-full flex-wrap">
          <div className="team_members_heading w-full">
            <h1>Team Members</h1>
            <button type="button" onClick={handleToggleAddModal}>
              <IoMdAdd /> Add New Member
            </button>
          </div>
          <div className="team_members_table w-full">
            {memoizedMember.length ? <>
              <table cellPadding={0} cellSpacing={0} border={0}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Employee ID</th>
                  <th>Account Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
              {memoizedMember?.map((item: any) => (
                <>
                <tr>
                  <td>{item?.fullName || '--'}</td>
                  <td>{item.email || '--'}</td>
                  <td>{item.userRoleName || '--'}</td>
                  <td>{item.employeeId || '--'}</td>
                  <td>{item.status || '--'}</td>
                  <td> <Info className="h-4 w-4 cursor-pointer text-gray-500" /></td>
                </tr>
                </>
                
                 ))}
              </tbody>
            </table>
            </> : null}
            
            {!memoizedMember.length ? (
                <p className="py-10 text-center text-sm font-medium">
                  No Members Found
                </p>
              ) : null}

            <Pagination
              page={page}
              setPage={setPage}
              totalCount={membersQuery.data?.totalCount}
              limit={limit}
            />
          </div>
        </div>
      </div>
      <Dialog open={isAddToMemberModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent
          className="add-new-address-modal gap-0 p-0 md:!max-w-2xl"
          ref={wrapperRef}
        >
          <AddToMemberForm
            onClose={() => {
              setIsAddToMemberModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TeamMembersPage;
