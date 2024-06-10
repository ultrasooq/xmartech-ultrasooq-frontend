import React from "react";
import MemberCard from "@/components/modules/teamMembers/MemberCard";
// import Pagination from "@/components/shared/Pagination";
import { IoMdAdd } from "react-icons/io";

const TeamMembersPage = () => {
  return (
    <section className="team_members_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 team_members_heading">
            <h1>Team Members</h1>
            <button type="button">
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
                {[...Array(10)].map((_, i) => (
                  <MemberCard key={i} />
                ))}
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
    </section>
  );
};

export default TeamMembersPage;
