import React, { Component } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from "next/dist/shared/lib/utils";

const Profile = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Profile</title>
      </Head>
      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-9 col-sm-10 col-12 before_login_box profile_box">
              <div className="before_login_heading">
                <h2>Profile</h2>
                <p>Update Profile</p>
              </div>
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-12 form-group">
                    <div className="drop">
                      <div className="cont">
                        <img src="images/camera.png" alt="camera-icon" />
                        <div className="short_text">
                          <span> Upload Image</span>
                        </div>
                      </div>
                      <input id="files" multiple name="files[]" type="file" />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>First Name</label>
                    <div className="form_field_wrap">
                      <input
                        type="text"
                        className="form-control"
                        value="John"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>Last Name</label>
                    <div className="form_field_wrap">
                      <input type="text" className="form-control" value="Doe" />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group custom_radio">
                    <label>Gender</label>
                    <div className="custom_radio_wrap">
                      <input type="radio" id="Male" name="trade" value="Male" />
                      <label htmlFor="css">Male</label>
                      <span className="checkmark"></span>
                    </div>
                    <div className="custom_radio_wrap">
                      <input
                        type="radio"
                        id="Company"
                        name="trade"
                        value="Female"
                      />
                      <label htmlFor="css">Female</label>
                      <span className="checkmark"></span>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>Date Of Birth</label>
                    <div className="form_field_wrap">
                      <input
                        type="date"
                        className="form-control"
                        value="19th December 1985 "
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>Email</label>
                    <div className="form_field_wrap">
                      <input
                        type="email"
                        className="form-control"
                        value="xeyes95396@beeplush.com "
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <div className="add_text_wrap">
                      <label>Phone Number</label>
                      <div className="add_link_text">
                        <span>
                          <img src="images/add-icon.svg" alt="add-icon" /> add
                          Phone Number
                        </span>
                      </div>
                    </div>
                    <div className="form_field_wrap">
                      <input
                        type="text"
                        className="form-control"
                        value="(011) 12458 74589 "
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group social_wrap">
                    <div className="add_text_wrap">
                      <label>Social Links</label>
                      <div className="add_link_text">
                        <span>
                          <img src="images/add-icon.svg" alt="add-icon" /> add
                          link
                        </span>
                      </div>
                    </div>
                    <div className="form_field_wrap social_wrap_box">
                      <div className="social_wrap_top">
                        <div className="social_wrap_top_left">
                          <span>
                            <img
                              src="images/social-facebook-icon.svg"
                              alt="facebook-icon"
                            />{" "}
                            Facebook
                          </span>
                        </div>
                        <div className="social_wrap_top_right">
                          <ul>
                            <li>
                              <img
                                src="images/social-edit-icon.svg"
                                alt="edit-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-delete-icon.svg"
                                alt="delete-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-arrow-icon.svg"
                                alt="arrow-icon"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <label>Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value="www.facebook_Lorem ipsum & 4115.com "
                      />
                    </div>
                    <div className="form_field_wrap social_wrap_box">
                      <div className="social_wrap_top">
                        <div className="social_wrap_top_left">
                          <span>
                            <img
                              src="images/social-linkedin-icon.svg"
                              alt="linkedin-icon"
                            />{" "}
                            Linkedin
                          </span>
                        </div>
                        <div className="social_wrap_top_right">
                          <ul>
                            <li>
                              <img
                                src="images/social-edit-icon.svg"
                                alt="edit-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-delete-icon.svg"
                                alt="delete-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-arrow-icon.svg"
                                alt="arrow-icon"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <label>Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value="www.facebook_Lorem ipsum & 4115.com "
                      />
                    </div>
                    <div className="form_field_wrap social_wrap_box">
                      <div className="social_wrap_top">
                        <div className="social_wrap_top_left">
                          <span>
                            <img
                              src="images/social-instagram-icon.svg"
                              alt="instagram-icon"
                            />{" "}
                            Instagram
                          </span>
                        </div>
                        <div className="social_wrap_top_right">
                          <ul>
                            <li>
                              <img
                                src="images/social-edit-icon.svg"
                                alt="edit-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-delete-icon.svg"
                                alt="delete-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-arrow-icon.svg"
                                alt="arrow-icon"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <label>Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value="www.facebook_Lorem ipsum & 4115.com "
                      />
                    </div>
                    <div className="form_field_wrap social_wrap_box">
                      <div className="social_wrap_top">
                        <div className="social_wrap_top_left">
                          <span>
                            <img
                              src="images/social-twitter-icon.svg"
                              alt="twitter-icon"
                            />{" "}
                            Twitter
                          </span>
                        </div>
                        <div className="social_wrap_top_right">
                          <ul>
                            <li>
                              <img
                                src="images/social-edit-icon.svg"
                                alt="edit-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-delete-icon.svg"
                                alt="delete-icon"
                              />
                            </li>
                            <li>
                              <img
                                src="images/social-arrow-icon.svg"
                                alt="arrow-icon"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <label>Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value="www.facebook_Lorem ipsum & 4115.com "
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <button
                      type="button"
                      className="form-control submit_button"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default withRouter(Profile);
