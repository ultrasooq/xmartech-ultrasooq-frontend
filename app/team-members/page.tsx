"use client"; // Add this at the top
import React, { useRef, useState } from "react";
import MemberCard from "@/components/modules/teamMembers/MemberCard";
// import Pagination from "@/components/shared/Pagination";
import { IoMdAdd } from "react-icons/io";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddToMemberForm from "@/components/modules/teamMembers/AddToMemberForm";

const TeamMembersPage = () => {

   const [isAddToMemberModalOpen, setIsAddToMemberModalOpen] = useState(false);
   const wrapperRef = useRef(null);

  const handleToggleAddModal = () =>
    setIsAddToMemberModalOpen(!isAddToMemberModalOpen);

  return (
    <section className="team_members_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 team_members_heading">
            <h1>Team Members</h1>
            <button type="button" onClick={handleToggleAddModal}>
              <IoMdAdd /> Add New Member
            </button>
          </div>
          <div className="col-lg-12 team_members_box">
            <table cellPadding={0} cellSpacing={0} border={0}>
              <thead>
                <tr>
                  <th>name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Employee ID</th>
                  <th>Account Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mrinmoyee</td>
                  <td>mrin@yopmail.com</td>
                  <td>User Role</td>
                  <td>145256</td>
                  <td>Active</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>Mrinmoyee</td>
                  <td>mrin@yopmail.com</td>
                  <td>User Role</td>
                  <td>145256</td>
                  <td>Active</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <td>Mrinmoyee</td>
                  <td>mrin@yopmail.com</td>
                  <td>User Role</td>
                  <td>145256</td>
                  <td>Active</td>
                  <td>Action</td>
                </tr>
                
                {/* {[...Array(10)].map((_, i) => (
                  <MemberCard key={i} />
                ))} */}
              </tbody>
            </table>
            {/* <Pagination
              page={page}
              setPage={setPage}
              totalCount={productsQuery.data?.totalCount}
              limit={limit}
            /> */}
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
