import React, { Component } from "react";
import { withRouter } from "next/router";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from "next/dist/shared/lib/utils";

const TeamMembers = () => {
  const Router = useRouter();
  return (
    <div>
      <Head>
        <title>Team Members</title>
      </Head>

      <section className="team_members_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 team_members_heading">
              <h1>Team Members</h1>
              <button type="button">
                <img src="images/plus-icon.svg" alt="plus-icon" /> Add New
                Member
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
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                  <tr>
                    <td data-th="name">
                      <div className="team_user">
                        <div className="team_user_pic">
                          <img src="images/team.png" alt="team-user" />
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
                      <img src="images/review-dot.svg" alt="review-dot" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="pagination">
                <a href="#" className="first_pagination">
                  <img
                    src="images/pagination-left-white-arrow.svg"
                    alt="arrow"
                  />{" "}
                  Frist
                </a>
                <a href="#">
                  <img src="images/pagination-left-arrow.svg" alt="arrow" />
                </a>
                <a href="#">1</a>
                <a className="active" href="#">
                  2
                </a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">
                  <img src="images/pagination-right-arrow.svg" alt="arrow" />
                </a>
                <a href="#" className="last_pagination">
                  Last{" "}
                  <img
                    src="images/pagination-right-white-arrow.svg"
                    alt="arrow"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(TeamMembers);
