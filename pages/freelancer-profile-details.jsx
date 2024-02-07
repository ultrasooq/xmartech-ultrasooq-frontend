import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const FreelancerProfile = () => {
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
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. More</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </SiteLayout>
    )

}


export default withRouter(FreelancerProfile);