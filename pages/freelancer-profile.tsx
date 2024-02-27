import React, { Component } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from "next/dist/shared/lib/utils";

const FreelancerProfile = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Freelancer Profile</title>
      </Head>
      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-11 col-sm-11 col-12 before_login_box profile_box company_profile_box">
              <div className="before_login_heading">
                <h2>Freelancer Profile</h2>
              </div>
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-12 form-group">
                    <div className="col-lg-12 information_head">
                      <label>Freelancer Information</label>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <label>About Us</label>
                        <div className="form_field_wrap textarea_field">
                          <textarea
                            className="form-control"
                            rows={7}
                            placeholder="Write Here...."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12 form-group choose_type">
                        <label>Business Type</label>
                        <div className="form_field_wrap choose_type_box">
                          <div className="choose_type_top">
                            <div className="choose_type_box_left">
                              <span>
                                Individual{" "}
                                <img src="images/close.svg" alt="close" />
                              </span>
                            </div>
                            <div className="choose_type_box_right">
                              <ul>
                                <li>
                                  <img
                                    src="images/social-arrow-icon.svg"
                                    alt="arrow"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="form_field_wrap choose_type_box">
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Individual </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>service provider </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Other </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <div className="col-lg-12 information_head">
                          <label>Address</label>
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Address</label>
                        <div className="form_field_wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>City</label>
                        <div className="form_field_wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Province</label>
                        <div className="form_field_wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Province"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Country</label>
                        <div className="form_field_wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Branch contact number</label>
                        <div className="form_field_wrap">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Branch contact number"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Branch contact name</label>
                        <div className="form_field_wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Branch contact name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <div className="col-lg-12 information_head">
                          <label>working hours</label>
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Start Time</label>
                        <div className="form_field_wrap">
                          <input
                            type="time"
                            className="form-control"
                            value="9:00 AM"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>End Time</label>
                        <div className="form_field_wrap">
                          <input
                            type="time"
                            className="form-control"
                            placeholder="8:00 pM"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 form-group">
                        <div className="branch_weekly">
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Sun</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Mon</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Tue</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Wed</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Thu</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Fri</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>Sat</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12 form-group choose_type">
                        <label>Tag</label>
                        <div className="form_field_wrap choose_type_box">
                          <div className="choose_type_top">
                            <div className="choose_type_box_left">
                              <span>
                                online shope{" "}
                                <img src="images/close.svg" alt="close" />
                              </span>
                              <span>
                                manufacturer / factory{" "}
                                <img src="images/close.svg" alt="close" />
                              </span>
                              <span>
                                trading company{" "}
                                <img src="images/close.svg" alt="close" />
                              </span>
                            </div>
                            <div className="choose_type_box_right">
                              <ul>
                                <li>
                                  <img
                                    src="images/social-arrow-icon.svg"
                                    alt="arrow"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="form_field_wrap choose_type_box">
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>online shop </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>manufacturer / factory </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>trading company </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>distributor / wholesaler</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>retailer</span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>individual </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>other </span>
                            </label>
                          </div>
                          <div className="terms_check">
                            <label className="remember_checkbox">
                              <input type="checkbox" name="" />
                              <span className="checkmark"></span>
                              <span>service provider </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <button
                      type="button"
                      className="form-control submit_button"
                    >
                      Save changes
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

export default withRouter(FreelancerProfile);
