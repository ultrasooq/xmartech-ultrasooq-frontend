import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const Register = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Register</title>
      </Head>

    <section className="before_login_sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 before_login_box">
            <div className="before_login_heading">
              <h2>Registration</h2>
              <p>Create Your account</p>
            </div>
            <div className="social_login">
              <ul>
                <li>
                  <a href="#">
                    <img src="images/facebook-icon.png"/>
                    <span>Sign In with Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/google-icon.png"/>
                    <span>Sign In with Google</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="login_or">
              <span>Or</span>
            </div>
            <div className="before_login_form_wrap">
              <div className="row">
              <div className="col-lg-12 form-group custom_radio">
                  <label>Please select trade role :</label>
                  <div className="custom_radio_wrap">
                    <input type="radio" id="Buyer" name="trade" value="Buyer"/>
                    <label for="html">Buyer</label>
                    <span className="checkmark"></span>
                  </div>
                  <div className="custom_radio_wrap">
                    <input type="radio" id="Freelancer" name="trade" value="Freelancer"/>
                    <label for="css">Freelancer</label>
                    <span className="checkmark"></span>
                  </div>
                  <div className="custom_radio_wrap">
                    <input type="radio" id="Company" name="trade" value="Company"/>
                    <label for="css">Company</label>
                    <span className="checkmark"></span>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <label>First Name</label>
                  <div className="form_field_wrap">
                    <input type="text" className="form-control" placeholder="Enter Your First Name"/>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Last Name</label>
                  <div className="form_field_wrap">
                    <input type="text" className="form-control" placeholder="Enter Your Last Name"/>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Email Address</label>
                  <div className="form_field_wrap">
                    <input type="email" className="form-control" placeholder="Enter Your Email Address "/>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Login Password</label>
                  <div className="form_field_wrap">
                    <input type="password" className="form-control" placeholder="Enter Your Login Password "/>
                    <span className="show_password"><img src="images/eyeslash.svg"/></span>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Confirm Address</label>
                  <div className="form_field_wrap">
                    <input type="password" className="form-control" placeholder="Enter Your Login Password Again "/>
                    <span className="show_password"><img src="images/eyeslash.svg"/></span>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <label>Phone Number</label>
                  <div className="form_field_wrap">
                    <input type="number" className="form-control" placeholder="Enter Your Phone Number "/>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <div className="terms_check">
                      <label className="remember_checkbox">
                          <input type="checkbox" name=""/>
                          <span className="checkmark"></span>
                          I agree the terms of use & Privacy policy 
                      </label>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <button type="button" className="form-control submit_button">Agree & Register</button>
                </div>
                <div className="col-lg-12 form-group text-center allready_account">
                  <span>Do you already have an account? <a href="#" onClick={()=> Router.push("/login")}>Sign in</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      
      {/* <img src="../images/favicon.ico" />
      <button onClick={()=> Router.push("/home")} className='button-sub'>Goto Home</button>
      <button onClick={()=> Router.push("/details/page")} className='button-sub'>Goto Page</button> */}
    </SiteLayout>
  )
}




export default withRouter(Register);