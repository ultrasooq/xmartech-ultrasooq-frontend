import React from "react";
import Image from "next/image";
import TeamIcon from "@/public/images/team.png";
import ReviewDotIcon from "@/public/images/review-dot.svg";

/**
 * Static/placeholder team member table row card. Displays a hardcoded
 * member with avatar, name, email, role, employee ID, status badge,
 * and an action dot menu icon.
 *
 * Note: This component currently uses static data and is likely a
 * placeholder template for dynamic member rows.
 *
 * @returns A `<tr>` element for a team members table.
 */
const MemberCard = () => {
  return (
    <tr>
      <td data-th="name">
        <div className="team_user">
          <div className="team_user_pic">
            <Image src={TeamIcon} alt="team-user" />
          </div>
          <div className="team_user_name">
            <span>John Doe</span>
          </div>
        </div>
      </td>
      <td data-th="Email">JohnDoe15@gmail.com</td>
      <td data-th="Role">DESIGNER</td>
      <td data-th="Employee ID">EMP47890</td>
      <td data-th="Account Status">
        <span className="status">Active</span>
      </td>
      <td data-th="Action">
        <Image src={ReviewDotIcon} alt="review-dot" />
      </td>
    </tr>
  );
};

export default MemberCard;
