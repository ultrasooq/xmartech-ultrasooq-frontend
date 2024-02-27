import React, { useState } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from "react-hot-toast";

const Login = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 before_login_box">
              <div className="before_login_heading">
                <h2>Login</h2>
                <p>Login To Your account</p>
              </div>
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-12 form-group">
                    <label>Email or Phone number or ID</label>
                    <div className="form_field_wrap">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Email or Phone number or ID"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>Password</label>
                    <div className="form_field_wrap">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Your Login Password "
                      />
                      <span className="show_password">
                        <img src="images/eyeslash.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <div className="terms_check remember_forgot">
                      <label className="remember_checkbox">
                        <input type="checkbox" name="" />
                        <span className="checkmark"></span>
                        Remember Me
                      </label>
                      <a onClick={() => Router.push("/forget-password")}>
                        Forgot Password{" "}
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <button
                      type="button"
                      className="form-control submit_button"
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-lg-12 form-group text-center allready_account">
                    <span>
                      Don't have an account?{" "}
                      <a onClick={() => Router.push("/register")}>Signup</a>
                    </span>
                  </div>
                  <div className="login_or">
                    <span>Or</span>
                  </div>
                  <div className="social_login">
                    <ul>
                      <li>
                        <a href="#">
                          <img src="images/facebook-icon.png" />
                          <span>Sign In with Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="images/google-icon.png" />
                          <span>Sign In with Google</span>
                        </a>
                      </li>
                    </ul>
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
  );
};

export default withRouter(Login);
