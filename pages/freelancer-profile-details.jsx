import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const FreelancerProfileDetails = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Freelancer Profile Details</title>
            </Head>
            
            <section className="profile_details_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 profile_details_heading">
                            <h1>Freelancer Profile</h1>
                        </div>
                        <div className="col-lg-12 profile_details_box">
                            <div className="profile_details_box_left">
                                <div className="profile_details_box_image">
                                    <img src="images/profile.png"/>
                                </div>
                                <div class="edit_profile_icon">
                                    <div class="camera_icon">
                                        <img src="images/camera-icon.png"/>
                                    </div>
                                    <input id="profile_impage_upload_input" accept="image/*" name="file" type="file"/>
                                </div>
                            </div>
                            <div className="profile_details_box_right">
                                <div className="profile_details_box_right_top">
                                    <h2>John Rosensky</h2>
                                    <div className="edit_button">
                                        <button type="button"><img src="images/edit-icon.svg"/> edit</button>
                                    </div>
                                </div>
                                <div className="profile_details_box_right_middle">
                                    <ul>
                                        <li> <img src="images/profile-mail-icon.svg"/> <a href="mailto:john.rosensky@gmail.com">john.rosensky@gmail.com</a></li>
                                        <li> <img src="images/profile-call-icon.svg"/> <a href="tel:1 000 0000 0000">+1 000 0000 0000</a></li>
                                    </ul>
                                    <div className="business_type">
                                        <p>Business Type</p>
                                        <span>Service Provider</span>
                                    </div>
                                </div>
                                <div className="profile_details_box_right_bottom">
                                    <div className="profile_details_box_right_bottom_left">
                                        <p>Freelancer ID: <span>VCP0001458</span></p>
                                    </div>
                                    <div className="profile_details_box_right_bottom_right">
                                        <span>Online.</span>
                                        <select className="form-control">
                                            <option>Offline 9:30 pm</option>
                                            <option>Online 10:30 am</option>
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
                                            <h2>Contact Information</h2>
                                            <div className="edit_button">
                                                <button type="button"><img src="images/edit-icon.svg"/> edit</button>
                                            </div>
                                        </div>  
                                        <div className="profile_details_section_content">
                                            <div className="profile_details_content_list">
                                                <div className="row">
                                                    <div className="col-lg-2 profile_details_content_list_label">
                                                        <span>email:</span>
                                                    </div>
                                                    <div className="col-lg-10 profile_details_content_list_content">
                                                        <p>john.rosensky@gmail.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profile_details_content_list">
                                                <div className="row">
                                                    <div className="col-lg-2 profile_details_content_list_label">
                                                        <span>Phone:</span>
                                                    </div>
                                                    <div className="col-lg-10 profile_details_content_list_content">
                                                        <p>+1 000 0000 0456</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profile_details_content_list">
                                                <div className="row">
                                                    <div className="col-lg-2 profile_details_content_list_label">
                                                        <span>Social Links:</span>
                                                    </div>
                                                    <div className="col-lg-10 profile_details_content_list_content">
                                                        <p>Facebook, LInkedin, Instagram</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className="profile_details_section_wrap">
                                        <div className="profile_details_section_top">
                                            <h2>Freelancer Information</h2>
                                            <div className="edit_button">
                                                <button type="button"><img src="images/edit-icon.svg"/> edit</button>
                                            </div>
                                        </div>  
                                        <div className="profile_details_section_content">
                                            <div className="profile_details_content_list">
                                                <div className="row">
                                                    <div className="col-lg-12 profile_details_content_list_content">
                                                        <label>About Me</label>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. <a href="#">More</a></p>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <hr></hr>
                                                    </div>
                                                    <div className="col-lg-12 profile_details_content_list_content">
                                                        <label>Address</label>
                                                        <div className="row">
                                                            <div className="col-lg-7">
                                                                <div className="profile_details_content_list">
                                                                    <div className="row">
                                                                        <div className="col-lg-3 profile_details_content_list_label">
                                                                            <span>Address:</span>
                                                                        </div>
                                                                        <div className="col-lg-9 profile_details_content_list_content">
                                                                            <p>9890 S. Maryland Pkwy Cumbria, Northumberland,</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-5">
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
                                                            <div className="col-lg-7">
                                                                <div className="profile_details_content_list">
                                                                    <div className="row">
                                                                        <div className="col-lg-3 profile_details_content_list_label">
                                                                            <span>City:</span>
                                                                        </div>
                                                                        <div className="col-lg-9 profile_details_content_list_content">
                                                                            <p>Los Angeles, United States</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-5">
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
                                                            <div className="col-lg-7">
                                                                <div className="profile_details_content_list">
                                                                    <div className="row">
                                                                        <div className="col-lg-3 profile_details_content_list_label">
                                                                            <span>Province:</span>
                                                                        </div>
                                                                        <div className="col-lg-9 profile_details_content_list_content">
                                                                            <p>Lorem Ipsum</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-5">
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
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <hr></hr>
                                                    </div>
                                                    <div className="col-lg-12 profile_details_content_list_content">
                                                        <label>Working Hours</label>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="profile_details_content_list">
                                                                    <div className="row">
                                                                        <div className="col-lg-6 profile_details_content_list_label">
                                                                            <span>Start Time:</span>
                                                                        </div>
                                                                        <div className="col-lg-6 profile_details_content_list_content">
                                                                            <p>9:00 am</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
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
                                                            <div className="col-lg-4">
                                                                <div className="profile_details_content_list">
                                                                    <div className="row">
                                                                        <div className="col-lg-6 profile_details_content_list_label">
                                                                            <span>Working Days:</span>
                                                                        </div>
                                                                        <div className="col-lg-6 profile_details_content_list_content">
                                                                            <p>Monday - Friday</p>
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
                                                        <label>Tag</label>
                                                        <div className="row">
                                                            <div className="col-lg-12 tag">
                                                                <span>Online Shop</span>
                                                                <span>manufacturer / factory </span>
                                                                <span>Trading Company</span>
                                                                <span>Online Shop</span>
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
                                                <span><img src="images/star.svg"/></span>
                                                <span><img src="images/star.svg"/></span>
                                                <span><img src="images/star.svg"/></span>
                                                <span><img src="images/star.svg"/></span>
                                                <span><img src="images/star.svg"/></span>
                                                <p>Based on 139 Reviews</p>
                                            </div>
                                        </div>
                                        <div className="review_rating_box_top_right">
                                            <button type="button">
                                                <img src="images/pen-icon.svg"/> Write A Review
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
                                                        <img src="images/review-1.png"/>
                                                    </div>
                                                    <div className="review_box_top_user">
                                                        <div className="review_box_top_user_head">
                                                            <h4>John Doe</h4>
                                                            <img src="images/review-dot.svg"/>
                                                        </div>
                                                        <span>2 reviews</span>
                                                        <div className="review_box_top_user_bottom">
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span>3 Weeks ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review_box_bottom">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a href="#">More.</a> </p>
                                                </div>
                                            </div>
                                            <div className="review_box">
                                                <div className="review_box_top">
                                                    <div className="review_box_top_icon">
                                                        <img src="images/review-2.png"/>
                                                    </div>
                                                    <div className="review_box_top_user">
                                                        <div className="review_box_top_user_head">
                                                            <h4>John Doe</h4>
                                                            <img src="images/review-dot.svg"/>
                                                        </div>
                                                        <span>2 reviews</span>
                                                        <div className="review_box_top_user_bottom">
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span>3 Weeks ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review_box_bottom">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a href="#">More.</a> </p>
                                                </div>
                                            </div>
                                            <div className="review_box">
                                                <div className="review_box_top">
                                                    <div className="review_box_top_icon">
                                                        <img src="images/review-3.png"/>
                                                    </div>
                                                    <div className="review_box_top_user">
                                                        <div className="review_box_top_user_head">
                                                            <h4>John Doe</h4>
                                                            <img src="images/review-dot.svg"/>
                                                        </div>
                                                        <span>2 reviews</span>
                                                        <div className="review_box_top_user_bottom">
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span><img src="images/star.svg"/></span>
                                                            <span>3 Weeks ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="review_box_bottom">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a href="#">More.</a> </p>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </SiteLayout>
    )

}


export default withRouter(FreelancerProfileDetails);