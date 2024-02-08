import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const CompanyProfileDetails = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Freelancer Profile Details</title>
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
                                    <img src="images/company-logo.png"/>
                                </div>
                            </div>
                            <div className="profile_details_box_right">
                                <div className="profile_details_box_right_top">
                                    <h2>Vehement Capital Partners Pvt Ltd</h2>
                                    <div className="edit_button">
                                        <button type="button"><img src="images/edit-icon.svg"/> edit</button>
                                    </div>
                                </div>
                                <div className="profile_details_box_right_middle">
                                    <ul>
                                        <li><span>Annual Purchasing Volume:</span> $ 779.259</li>
                                    </ul>
                                    <div className="business_type">
                                        <p>Business Type</p>
                                        <span>Trading Company</span>
                                        <span>Manufacturer / Factory </span>
                                    </div>
                                </div>
                                <div className="profile_details_box_right_bottom">
                                    <div className="profile_details_box_right_bottom_left">
                                        <p>Company ID: <span>VCP0001458</span></p>
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
                                                <button type="button"><img src="images/edit-icon.svg"/> edit</button>
                                            </div>
                                        </div>  
                                        <div className="profile_details_section_content">
                                            <div className="profile_details_content_list">
                                                <div className="row">
                                                    <div className="col-lg-12 profile_details_content_list_content">
                                                        <label>Registration Address</label>
                                                        <div className="row">
                                                            <div className="col-lg-7">
                                                                <div className="profile_details_content_list">
                                                                    <div className="row">
                                                                        <div className="col-lg-4 profile_details_content_list_label">
                                                                            <span>Address:</span>
                                                                        </div>
                                                                        <div className="col-lg-8 profile_details_content_list_content">
                                                                            <p>9890 S. Maryland Pkwy Cumbria, Northumberland,</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-5">
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
                                                            <div className="col-lg-7">
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
                                                            <div className="col-lg-5">
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
                                                            <div className="col-lg-7">
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
                                                            <div className="col-lg-5">
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
                                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...</p>
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
                                                <button type="button"><img src="images/edit-icon.svg"/> edit</button>
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
                                                                        <img src="images/social-arrow-icon.svg"/>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 branch_information_box_bottom">
                                                            <div className="col-lg-12 profile_details_content_list_content">
                                                                <div className="row">
                                                                    <div className="col-lg-7">
                                                                        <div className="profile_details_content_list">
                                                                            <div className="row">
                                                                                <div className="col-lg-4 profile_details_content_list_label">
                                                                                    <span>Address:</span>
                                                                                </div>
                                                                                <div className="col-lg-8 profile_details_content_list_content">
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
                                                                                <div className="col-lg-4 profile_details_content_list_label">
                                                                                    <span>City:</span>
                                                                                </div>
                                                                                <div className="col-lg-8 profile_details_content_list_content">
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
                                                                                <div className="col-lg-4 profile_details_content_list_label">
                                                                                    <span>Province:</span>
                                                                                </div>
                                                                                <div className="col-lg-8 profile_details_content_list_content">
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
                                                                    <div className="col-lg-7">
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
                                                                    <div className="col-lg-5">
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
                                                                    <div className="col-lg-7">
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
                                                                    <div className="col-lg-7">
                                                                        <div className="profile_details_content_list">
                                                                            <div className="row">
                                                                                <div className="col-lg-12 profile_details_content_list_label">
                                                                                    <span>Branch Front Picture:</span>
                                                                                </div>
                                                                                <div className="col-lg-12 profile_details_content_list_content">
                                                                                    <div className="branch_photo">
                                                                                        <img src="images/branch-front.png"/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-5">
                                                                        <div className="profile_details_content_list">
                                                                            <div className="row">
                                                                                <div className="col-lg-12 profile_details_content_list_label">
                                                                                    <span>Contry:</span>
                                                                                </div>
                                                                                <div className="col-lg-12 profile_details_content_list_content">
                                                                                    <div className="branch_photo">
                                                                                        <img src="images/branch-address.png"/>
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
                                                                        <img src="images/social-arrow-icon.svg"/>
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


export default withRouter(CompanyProfileDetails);