import React, { Component } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from "next/dist/shared/lib/utils";

const CompanyProfile = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Company Profile</title>
      </Head>
      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-11 col-sm-11 col-12 before_login_box profile_box company_profile_box">
              <div className="before_login_heading">
                <h2>Company Profile</h2>
              </div>
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-12 form-group">
                    <div className="col-lg-12 information_head">
                      <label>Company Information</label>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 upload_logo_custom_box">
                        <label>Upload Company Logo</label>
                        <div class="drop">
                          <div class="cont">
                            <img src="images/upload.png" />
                            <div class="short_text">
                              <span>
                                {" "}
                                Drop your Company Logo here, or{" "}
                                <span>browse</span>
                              </span>
                              <p>(.jpg or .png only. Up to 16mb)</p>
                            </div>
                          </div>
                          <input
                            id="files"
                            multiple="true"
                            name="files[]"
                            type="file"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="row">
                          <div className="col-lg-12 form-group">
                            <label>company name</label>
                            <div className="form_field_wrap">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="company name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 form-group">
                            <label>Business Type</label>
                            <div className="form_field_wrap">
                              <select className="form-control">
                                <option>Select Business type</option>
                                <option>Select Business type</option>
                                <option>Select Business type</option>
                                <option>Select Business type</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12 form-group">
                            <label>Annual Purchasing Volume</label>
                            <div className="form_field_wrap">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Annual Purchasing Volume"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="col-lg-12 form-group separate_section_heading">
                          <label>Registration Address</label>
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
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="col-lg-12 form-group separate_section_heading">
                          <label>More information</label>
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Year of Establishment</label>
                        <div className="form_field_wrap">
                          <select className="form-control">
                            <option>1990</option>
                            <option>1991</option>
                            <option>1992</option>
                            <option>1993</option>
                            <option>1994</option>
                            <option>1995</option>
                            <option>1996</option>
                            <option>1997</option>
                            <option>1998</option>
                            <option>1999</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Total Number Of Employees</label>
                        <div className="form_field_wrap">
                          <select className="form-control">
                            <option>01-50</option>
                            <option>51-100</option>
                            <option>101-150</option>
                            <option>151-200</option>
                            <option>201-300</option>
                            <option>301-500</option>
                            <option>501-1000</option>
                            <option>1001-2000</option>
                            <option>2001-5000</option>
                            <option>5000 above</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 form-group">
                        <label>About Us</label>
                        <div className="form_field_wrap textarea_field">
                          <textarea
                            className="form-control"
                            rows="7"
                            placeholder="Write Here...."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="col-lg-12 form-group separate_section_heading">
                          <div className="add_text_wrap">
                            <label>Branch</label>
                            <div className="add_link_text">
                              <span>
                                <img src="images/add-icon.svg" /> add new branch
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 form-group choose_type">
                        <label>Business Type</label>
                        <div className="form_field_wrap choose_type_box">
                          <div className="choose_type_top">
                            <div className="choose_type_box_left">
                              <span>
                                online shope <img src="images/close.svg" />
                              </span>
                              <span>
                                manufacturer / factory{" "}
                                <img src="images/close.svg" />
                              </span>
                              <span>
                                trading company <img src="images/close.svg" />
                              </span>
                            </div>
                            <div className="choose_type_box_right">
                              <ul>
                                <li>
                                  <img src="images/social-arrow-icon.svg" />
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
                      <div className="col-lg-12 form-group">
                        <div className="row">
                          <div className="col-lg-12 upload_logo_custom_box">
                            <label>Upload Branch front picture</label>
                            <div class="drop">
                              <div class="cont">
                                <img src="images/upload.png" />
                                <div class="short_text">
                                  <span>
                                    {" "}
                                    Drop your Company Logo here, or{" "}
                                    <span>browse</span>
                                  </span>
                                  <p>(.jpg or .png only. Up to 16mb)</p>
                                </div>
                              </div>
                              <input
                                id="files"
                                multiple="true"
                                name="files[]"
                                type="file"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 upload_logo_custom_box">
                            <label>Proof of Address</label>
                            <div class="drop">
                              <div class="cont">
                                <img src="images/upload.png" />
                                <div class="short_text">
                                  <span>
                                    {" "}
                                    Drop your Company Logo here, or{" "}
                                    <span>browse</span>
                                  </span>
                                  <p>(.jpg or .png only. Up to 16mb)</p>
                                </div>
                              </div>
                              <input
                                id="files"
                                multiple="true"
                                name="files[]"
                                type="file"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 separate_section">
                    <div className="row">
                      <div className="col-lg-12 form-group">
                        <div className="col-lg-12 information_head">
                          <label>Branch location</label>
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
                          <label>Branch working hours</label>
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
                                online shope <img src="images/close.svg" />
                              </span>
                              <span>
                                manufacturer / factory{" "}
                                <img src="images/close.svg" />
                              </span>
                              <span>
                                trading company <img src="images/close.svg" />
                              </span>
                            </div>
                            <div className="choose_type_box_right">
                              <ul>
                                <li>
                                  <img src="images/social-arrow-icon.svg" />
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

export default withRouter(CompanyProfile);
