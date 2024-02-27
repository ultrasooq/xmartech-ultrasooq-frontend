import React, { Component } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from "next/dist/shared/lib/utils";

const CompanyProfileDetails = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Company Profile Details</title>
      </Head>

      <section className="profile_details_section company_profile_details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 profile_details_heading">
              <h1>Company Profile</h1>
            </div>
            <div className="col-lg-12 profile_details_box">
              <div className="profile_details_box_left">
                <div className="profile_details_box_image">
                  <img src="images/company-logo.png" />
                </div>
              </div>
              <div className="profile_details_box_right">
                <div className="profile_details_box_right_top">
                  <h2>Vehement Capital Partners Pvt Ltd</h2>
                  <div className="edit_button">
                    <button type="button">
                      <img src="images/edit-icon.svg" /> edit
                    </button>
                  </div>
                </div>
                <div className="profile_details_box_right_middle">
                  <ul>
                    <li>
                      <span>Annual Purchasing Volume:</span> $ 779.259
                    </li>
                  </ul>
                  <div className="business_type">
                    <p>Business Type</p>
                    <span>Trading Company</span>
                    <span>Manufacturer / Factory </span>
                  </div>
                </div>
                <div className="profile_details_box_right_bottom">
                  <div className="profile_details_box_right_bottom_left">
                    <p>
                      Company ID: <span>VCP0001458</span>
                    </p>
                  </div>
                  <div className="profile_details_box_right_bottom_right">
                    <span>Open.</span>
                    <select className="form-control">
                      <option>Closes 9:30 pm</option>
                      <option>Open 10:30 am</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile_info_main">
              <div className="profile_info_tab_list">
                <ul>
                  <li className="active">
                    <a href="#">Profile Info</a>
                  </li>
                  <li>
                    <a href="#">Ratings & Reviews</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                </ul>
              </div>
              <div className="profile_info_tab_content">
                <div className="profile_info_main_box">
                  <div className="profile_details_section_wrap">
                    <div className="profile_details_section_top">
                      <h2>Company Information</h2>
                      <div className="edit_button">
                        <button type="button">
                          <img src="images/edit-icon.svg" /> edit
                        </button>
                      </div>
                    </div>
                    <div className="profile_details_section_content">
                      <div className="profile_details_content_list">
                        <div className="row">
                          <div className="col-lg-12 profile_details_content_list_content">
                            <label>Registration Address</label>
                            <div className="row">
                              <div className="col-lg-7 col-md-6">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-4 profile_details_content_list_label">
                                      <span>Address:</span>
                                    </div>
                                    <div className="col-lg-8 profile_details_content_list_content">
                                      <p>
                                        9890 S. Maryland Pkwy Cumbria,
                                        Northumberland,
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5 col-md-6">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-5 profile_details_content_list_label">
                                      <span>City:</span>
                                    </div>
                                    <div className="col-lg-7 profile_details_content_list_content">
                                      <p>Los Angeles, United States</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-7 col-md-6">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-4 profile_details_content_list_label">
                                      <span>Province:</span>
                                    </div>
                                    <div className="col-lg-8 profile_details_content_list_content">
                                      <p>Lorem Ipsum</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5 col-md-6">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-5 profile_details_content_list_label">
                                      <span>Contry:</span>
                                    </div>
                                    <div className="col-lg-7 profile_details_content_list_content">
                                      <p>USA</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <hr></hr>
                          </div>
                          <div className="col-lg-12 profile_details_content_list_content">
                            <label>More Information</label>
                            <div className="row">
                              <div className="col-lg-7 col-md-6">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-4 profile_details_content_list_label">
                                      <span>Year of Establishment:</span>
                                    </div>
                                    <div className="col-lg-8 profile_details_content_list_content">
                                      <p>1957</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5 col-md-6">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-5 profile_details_content_list_label">
                                      <span>no. of employees:</span>
                                    </div>
                                    <div className="col-lg-7 profile_details_content_list_content">
                                      <p>10,000+</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="profile_details_content_list">
                                  <div className="row">
                                    <div className="col-lg-2 profile_details_content_list_label">
                                      <span>About Us:</span>
                                    </div>
                                    <div className="col-lg-10 profile_details_content_list_content">
                                      <div className="col-lg-12 company_about_box">
                                        <p>
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipiscing elit, sed do
                                          eiusmod tempor incididunt ut labore et
                                          dolore magna aliqua. Ut enim ad minim
                                          veniam, quis nostrud exercitation...
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_details_section_wrap">
                    <div className="profile_details_section_top">
                      <h2>Branch Information</h2>
                      <div className="edit_button">
                        <button type="button">
                          <img src="images/edit-icon.svg" /> edit
                        </button>
                      </div>
                    </div>
                    <div className="profile_details_section_content">
                      <div className="profile_details_content_list">
                        <div className="col-lg-12 branch_information_box">
                          <div className="row">
                            <div className="col-lg-12 branch_information_box_top">
                              <div className="branch_information_box_top_left">
                                <ul>
                                  <li>Online Shop,</li>
                                  <li>Manufacturer / Factory, </li>
                                  <li>Trading Company</li>
                                </ul>
                              </div>
                              <div className="branch_information_box_top_right">
                                <ul>
                                  <li>
                                    <img src="images/social-arrow-icon.svg" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-12 branch_information_box_bottom">
                              <div className="col-lg-12 profile_details_content_list_content">
                                <div className="row">
                                  <div className="col-lg-7 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-4 profile_details_content_list_label">
                                          <span>Address:</span>
                                        </div>
                                        <div className="col-lg-8 profile_details_content_list_content">
                                          <p>
                                            9890 S. Maryland Pkwy Cumbria,
                                            Northumberland,
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-5 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-6 profile_details_content_list_label">
                                          <span>Contry:</span>
                                        </div>
                                        <div className="col-lg-6 profile_details_content_list_content">
                                          <p>USA</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-7 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-4 profile_details_content_list_label">
                                          <span>City:</span>
                                        </div>
                                        <div className="col-lg-8 profile_details_content_list_content">
                                          <p>Los Angeles, United States</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-5 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-6 profile_details_content_list_label">
                                          <span>Branch Contact Number:</span>
                                        </div>
                                        <div className="col-lg-6 profile_details_content_list_content">
                                          <p>+1 000 0000 0456</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-7 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-4 profile_details_content_list_label">
                                          <span>Province:</span>
                                        </div>
                                        <div className="col-lg-8 profile_details_content_list_content">
                                          <p>Lorem Ipsum</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-5 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-6 profile_details_content_list_label">
                                          <span>Branch Contact Name:</span>
                                        </div>
                                        <div className="col-lg-6 profile_details_content_list_content">
                                          <p>John Doe</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-7 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-4 profile_details_content_list_label">
                                          <span>Start Time:</span>
                                        </div>
                                        <div className="col-lg-8 profile_details_content_list_content">
                                          <p>9:00 am</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-5 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-6 profile_details_content_list_label">
                                          <span>end time:</span>
                                        </div>
                                        <div className="col-lg-6 profile_details_content_list_content">
                                          <p>12:00 pm</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-7 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-4 profile_details_content_list_label">
                                          <span>Working Days:</span>
                                        </div>
                                        <div className="col-lg-8 profile_details_content_list_content">
                                          <p>Monday - Friday</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 profile_details_content_list_content">
                                <div className="row">
                                  <div className="col-lg-7 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-12 profile_details_content_list_label">
                                          <span>Branch Front Picture:</span>
                                        </div>
                                        <div className="col-lg-12 profile_details_content_list_content">
                                          <div className="branch_photo">
                                            <img src="images/branch-front.png" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-5 col-md-6">
                                    <div className="profile_details_content_list">
                                      <div className="row">
                                        <div className="col-lg-12 profile_details_content_list_label">
                                          <span>Contry:</span>
                                        </div>
                                        <div className="col-lg-12 profile_details_content_list_content">
                                          <div className="branch_photo">
                                            <img src="images/branch-address.png" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 branch_information_box">
                          <div className="row">
                            <div className="col-lg-12 branch_information_box_top">
                              <div className="branch_information_box_top_left">
                                Branch 2
                              </div>
                              <div className="branch_information_box_top_right">
                                <ul>
                                  <li>
                                    <img src="images/social-arrow-icon.svg" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <hr></hr>
                          </div>
                          <div className="col-lg-12 profile_details_content_list_content">
                            <label>Tag</label>
                            <div className="row">
                              <div className="col-lg-12 tag">
                                <span>Online Shop</span>
                                <span>manufacturer / factory </span>
                                <span>Trading Company</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review_rating_main_box">
                  <div className="review_rating_box_top">
                    <div className="review_rating_box_top_left">
                      <h2>Ratings & Reviews</h2>
                      <div className="rating_part">
                        <h5>5.0</h5>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <p>Based on 139 Reviews</p>
                      </div>
                    </div>
                    <div className="review_rating_box_top_right">
                      <button type="button">
                        <img src="images/pen-icon.svg" /> Write A Review
                      </button>
                    </div>
                  </div>
                  <div className="review_rating_box_middle">
                    <ul>
                      <li>Sort By :</li>
                      <li>
                        <button className="active_button">Newest</button>
                      </li>
                      <li>
                        <button>Highest</button>
                      </li>
                      <li>
                        <button>Lowest</button>
                      </li>
                    </ul>
                  </div>
                  <hr></hr>
                  <div className="review_rating_box_bottom">
                    <div className="review_main_box">
                      <div className="review_box">
                        <div className="review_box_top">
                          <div className="review_box_top_icon">
                            <img src="images/review-1.png" />
                          </div>
                          <div className="review_box_top_user">
                            <div className="review_box_top_user_head">
                              <h4>John Doe</h4>
                              <img src="images/review-dot.svg" />
                            </div>
                            <span>2 reviews</span>
                            <div className="review_box_top_user_bottom">
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>3 Weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="review_box_bottom">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. <a href="#">More.</a>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="review_box">
                        <div className="review_box_top">
                          <div className="review_box_top_icon">
                            <img src="images/review-2.png" />
                          </div>
                          <div className="review_box_top_user">
                            <div className="review_box_top_user_head">
                              <h4>John Doe</h4>
                              <img src="images/review-dot.svg" />
                            </div>
                            <span>2 reviews</span>
                            <div className="review_box_top_user_bottom">
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>3 Weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="review_box_bottom">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. <a href="#">More.</a>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="review_box">
                        <div className="review_box_top">
                          <div className="review_box_top_icon">
                            <img src="images/review-3.png" />
                          </div>
                          <div className="review_box_top_user">
                            <div className="review_box_top_user_head">
                              <h4>John Doe</h4>
                              <img src="images/review-dot.svg" />
                            </div>
                            <span>2 reviews</span>
                            <div className="review_box_top_user_bottom">
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>
                                <img src="images/star.svg" />
                              </span>
                              <span>3 Weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="review_box_bottom">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. <a href="#">More.</a>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="loading_sec">
                      <div className="lds-default">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        {/* <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div> */}
                      </div>
                      <span>Load More</span>
                    </div>
                  </div>
                </div>
                <div className="product_main_box product_section product_gray_n_box">
                  <div className="profile_details_section_top">
                    <h2>Products</h2>
                  </div>
                  <div className="products_sec_wrap">
                    <div className="product_sec_list">
                      <div className="product_list_part">
                        <div className="product_discount">
                          <span>-6%</span>
                        </div>
                        <div className="product_list_image">
                          <img src="images/pro-3.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-6.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-5.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-1.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-2.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price old_new">
                            <div className="new_price">
                              <h5>$100.38</h5>
                            </div>
                            <div className="old_price">
                              <h5>$106.99</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_discount">
                          <span>-6%</span>
                        </div>
                        <div className="product_list_image">
                          <img src="images/pro-3.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-6.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-5.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-1.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price">
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                      <div className="product_list_part">
                        <div className="product_list_image">
                          <img src="images/pro-2.png" />
                        </div>
                        <div className="product_list_content">
                          <div className="product_short_show">
                            <ul>
                              <li>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="126"
                                  height="36"
                                  viewBox="0 0 126 36"
                                  fill="none"
                                >
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="18"
                                    fill="#FCB800"
                                  />
                                  <path
                                    d="M22.675 13.2826H22.575V13.1826C22.575 12.1554 22.2128 11.2812 21.4859 10.5543C20.7591 9.82751 19.8849 9.46526 18.8577 9.46526C17.8304 9.46526 16.9562 9.82751 16.2294 10.5543C15.5025 11.2812 15.1403 12.1554 15.1403 13.1826V13.2826H15.0403H12.2772V22.2489C12.2772 22.8783 12.5002 23.4146 12.9488 23.8632C13.3974 24.3118 13.9337 24.5348 14.5631 24.5348H23.1522C23.7816 24.5348 24.3179 24.3118 24.7665 23.8632C25.2151 23.4146 25.4381 22.8783 25.4381 22.2489V13.2826H22.675ZM16.4718 13.2826H16.3718V13.1826C16.3718 12.4998 16.6161 11.9128 17.1019 11.4269C17.5878 10.9411 18.1748 10.6968 18.8577 10.6968C19.5175 10.6968 19.999 10.8126 20.263 11.0765L20.5258 11.3393L20.5915 11.405L20.6079 11.4214L20.612 11.4255L20.613 11.4266L20.6133 11.4268L20.6134 11.4269L20.6134 11.4269L20.5427 11.4976L20.6134 11.4269C21.0992 11.9128 21.3435 12.4998 21.3435 13.1826V13.2826H21.2435H16.4718ZM24.1065 14.5142H24.2065V14.6142V22.2489C24.2065 22.5349 24.1009 22.7837 23.8939 22.9906C23.687 23.1976 23.4382 23.3032 23.1522 23.3032H14.5631C14.2771 23.3032 14.0283 23.1976 13.8214 22.9906C13.6144 22.7837 13.5088 22.5349 13.5088 22.2489V14.6142V14.5142H13.6088H15.0403H15.1403V14.6142V15.8071C15.1403 15.9797 15.1995 16.1232 15.3198 16.2434C15.44 16.3636 15.5834 16.4228 15.756 16.4228C15.9286 16.4228 16.0721 16.3636 16.1923 16.2434C16.3125 16.1232 16.3718 15.9797 16.3718 15.8071V14.6142V14.5142H16.4718H21.2435H21.3435V14.6142V15.8071C21.3435 15.9797 21.4028 16.1232 21.523 16.2434C21.6432 16.3636 21.7867 16.4228 21.9593 16.4228C22.1319 16.4228 22.2753 16.3636 22.3956 16.2434C22.5158 16.1232 22.575 15.9797 22.575 15.8071V14.6142V14.5142H22.675H24.1065Z"
                                    fill="white"
                                    stroke="#FCB800"
                                    stroke-width="0.2"
                                  />
                                  <path
                                    d="M60.2325 16.7591L60.2325 16.7591C60.2836 16.829 60.3112 16.9134 60.3112 16.9999C60.3112 17.0865 60.2836 17.1709 60.2325 17.2407C60.1629 17.3359 59.2696 18.5412 57.8471 19.7216C56.4221 20.904 54.483 22.0473 52.3195 22.0473C50.156 22.0473 48.2168 20.904 46.7918 19.7216C45.3692 18.5412 44.4759 17.3358 44.4065 17.2407C44.3554 17.1707 44.3279 17.0864 44.3279 16.9998C44.3279 16.9132 44.3554 16.8289 44.4065 16.7589C44.4758 16.664 45.3691 15.4586 46.7918 14.2781C48.2168 13.0957 50.156 11.9524 52.3195 11.9524C54.483 11.9524 56.4221 13.0957 57.8471 14.2781C59.2698 15.4586 60.163 16.6641 60.2325 16.7591ZM45.3196 16.9187L45.253 16.9996L45.3197 17.0804C45.74 17.5902 46.6599 18.6249 47.8862 19.5332C49.1107 20.4401 50.6544 21.2312 52.3195 21.2312C53.988 21.2312 55.5319 20.4406 56.7558 19.5338C57.9813 18.6259 58.8996 17.5913 59.3193 17.0811L59.3859 17.0001L59.3193 16.9193C58.8988 16.4092 57.9788 15.3745 56.7525 14.4664C55.5281 13.5595 53.9845 12.7686 52.3195 12.7686C50.651 12.7686 49.107 13.5592 47.8832 14.4659C46.6576 15.3738 45.7394 16.4084 45.3196 16.9187Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M49.2344 17C49.2344 15.2992 50.6183 13.9153 52.3191 13.9153C54.0198 13.9153 55.4037 15.2992 55.4037 17C55.4037 18.7007 54.0198 20.0846 52.3191 20.0846C50.6183 20.0846 49.2344 18.7007 49.2344 17ZM50.0506 17C50.0506 18.2509 51.068 19.2684 52.3191 19.2684C53.5701 19.2684 54.5875 18.2509 54.5875 17C54.5875 15.749 53.57 14.7315 52.3191 14.7315C51.0681 14.7315 50.0506 15.749 50.0506 17Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.254492"
                                  />
                                  <path
                                    d="M87.5001 11.4526L87.3502 11.6026L87.2002 11.4526C86.3342 10.5866 85.303 10.1099 84.0988 10.0173C82.8963 9.92479 81.8629 10.2469 80.985 10.9815C80.2416 11.622 79.7516 12.3704 79.5065 13.228C79.259 14.0942 79.2499 14.9288 79.4747 15.7363C79.7018 16.5516 80.0923 17.2441 80.6456 17.8181L86.2775 23.5466C86.5822 23.851 86.9363 23.9989 87.3502 23.9989C87.764 23.9989 88.1181 23.851 88.4228 23.5466C88.423 23.5464 88.4232 23.5461 88.4234 23.5459L94.054 17.8188C94.0542 17.8186 94.0545 17.8184 94.0547 17.8181C94.6084 17.2436 94.9989 16.5561 95.2258 15.7517C95.4503 14.9558 95.4415 14.1213 95.1936 13.2434C94.9484 12.3749 94.4582 11.6215 93.7153 10.9815C92.8374 10.2469 91.804 9.92479 90.6015 10.0173C89.3973 10.1099 88.3661 10.5866 87.5001 11.4526ZM93.2647 17.019L93.2647 17.019L93.263 17.0207L87.6063 22.7416C87.5584 22.8014 87.4743 22.8779 87.3502 22.8779C87.2261 22.8779 87.1419 22.8014 87.094 22.7416L81.4373 17.0207L81.4373 17.0207L81.4356 17.019C80.7733 16.3338 80.4425 15.4915 80.4425 14.5056C80.4425 13.5054 80.8593 12.6203 81.6678 11.8567L81.6742 11.8507L81.681 11.8453C82.3681 11.2955 83.1674 11.0551 84.0667 11.1234C84.9666 11.1917 85.7387 11.5581 86.3748 12.2163L87.3502 13.1917L88.3255 12.2163C88.9616 11.5581 89.7337 11.1917 90.6336 11.1234C91.533 11.0551 92.3322 11.2955 93.0193 11.8453L93.0261 11.8507L93.0325 11.8567C93.841 12.6203 94.2578 13.5054 94.2578 14.5056C94.2578 15.4915 93.927 16.3338 93.2647 17.019Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.424153"
                                  />
                                  <path
                                    d="M120.131 9.87389C120.242 9.87389 120.348 9.91796 120.427 9.99639C120.505 10.0748 120.549 10.1812 120.549 10.2921V10.9629C120.549 11.1023 120.662 11.2154 120.802 11.2154C120.912 11.2154 121.019 11.2595 121.097 11.3379C121.176 11.4163 121.22 11.5227 121.22 11.6336C121.22 11.7446 121.176 11.8509 121.097 11.9294C121.019 12.0078 120.912 12.0519 120.802 12.0519C120.735 12.0519 120.67 12.0785 120.623 12.1258C120.576 12.1732 120.549 12.2374 120.549 12.3044V21.6949C120.549 21.8343 120.662 21.9475 120.802 21.9475C120.912 21.9475 121.019 21.9915 121.097 22.07C121.176 22.1484 121.22 22.2548 121.22 22.3657C121.22 22.4766 121.176 22.583 121.097 22.6614C121.019 22.7399 120.912 22.7839 120.802 22.7839C120.735 22.7839 120.67 22.8105 120.623 22.8579C120.576 22.9052 120.549 22.9695 120.549 23.0364V23.7072C120.549 23.8181 120.505 23.9245 120.427 24.0029C120.348 24.0814 120.242 24.1254 120.131 24.1254C120.02 24.1254 119.914 24.0814 119.835 24.0029C119.757 23.9245 119.713 23.8181 119.713 23.7072V23.2041C119.713 23.0927 119.668 22.9858 119.59 22.907C119.511 22.8282 119.404 22.7839 119.292 22.7839H116.106C115.64 22.7839 115.192 22.5985 114.862 22.2685C114.532 21.9385 114.347 21.4909 114.347 21.0242V12.9751C114.347 12.5084 114.532 12.0608 114.862 11.7308C115.192 11.4008 115.64 11.2154 116.106 11.2154H119.292C119.404 11.2154 119.511 11.1711 119.589 11.0923C119.668 11.0135 119.713 10.9066 119.713 10.7952V10.2921C119.713 10.1812 119.757 10.0748 119.835 9.99639C119.914 9.91796 120.02 9.87389 120.131 9.87389ZM119.713 12.4721C119.713 12.3606 119.668 12.2537 119.589 12.1749C119.511 12.0961 119.404 12.0519 119.292 12.0519H116.106C115.597 12.0519 115.183 12.4655 115.183 12.9751V21.0242C115.183 21.5339 115.597 21.9475 116.106 21.9475H119.292C119.404 21.9475 119.511 21.9032 119.589 21.8244C119.668 21.7456 119.713 21.6387 119.713 21.5272V12.4721ZM123.066 11.6336C123.066 11.5227 123.11 11.4163 123.189 11.3379C123.267 11.2595 123.374 11.2154 123.485 11.2154H124.155C124.622 11.2154 125.07 11.4008 125.4 11.7308C125.73 12.0608 125.915 12.5084 125.915 12.9751V13.6459C125.915 13.7568 125.871 13.8632 125.793 13.9416C125.714 14.0201 125.608 14.0641 125.497 14.0641C125.386 14.0641 125.28 14.0201 125.201 13.9416C125.123 13.8632 125.079 13.7568 125.079 13.6459V12.9751C125.079 12.4655 124.665 12.0519 124.155 12.0519H123.485C123.374 12.0519 123.267 12.0078 123.189 11.9294C123.11 11.8509 123.066 11.7446 123.066 11.6336ZM125.497 15.9107C125.608 15.9107 125.714 15.9547 125.793 16.0332C125.871 16.1116 125.915 16.218 125.915 16.3289V17.6704C125.915 17.7813 125.871 17.8877 125.793 17.9662C125.714 18.0446 125.608 18.0886 125.497 18.0886C125.386 18.0886 125.28 18.0446 125.201 17.9662C125.123 17.8877 125.079 17.7813 125.079 17.6704V16.3289C125.079 16.218 125.123 16.1116 125.201 16.0332C125.28 15.9547 125.386 15.9107 125.497 15.9107ZM125.497 19.9352C125.608 19.9352 125.714 19.9793 125.793 20.0577C125.871 20.1361 125.915 20.2425 125.915 20.3534V21.0242C125.915 21.4909 125.73 21.9385 125.4 22.2685C125.07 22.5985 124.622 22.7839 124.155 22.7839H123.485C123.374 22.7839 123.267 22.7399 123.189 22.6614C123.11 22.583 123.066 22.4766 123.066 22.3657C123.066 22.2548 123.11 22.1484 123.189 22.07C123.267 21.9915 123.374 21.9475 123.485 21.9475H124.155C124.665 21.9475 125.079 21.5339 125.079 21.0242V20.3534C125.079 20.2425 125.123 20.1361 125.201 20.0577C125.28 19.9793 125.386 19.9352 125.497 19.9352Z"
                                    fill="#7F818D"
                                    stroke="white"
                                    stroke-width="0.169661"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <h6>young shop</h6>
                          <p>
                            <a href="#">Lorem Ipsum is simply dummy text..</a>
                          </p>
                          <img src="images/star.png" />
                          <div className="product_price old_new">
                            <div className="new_price">
                              <h5>$100.38</h5>
                            </div>
                            <div className="old_price">
                              <h5>$106.99</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default withRouter(CompanyProfileDetails);
