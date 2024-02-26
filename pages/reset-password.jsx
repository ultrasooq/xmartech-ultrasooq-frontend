import React, { useState } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from "react-hot-toast";

const ResetPassword = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Forget Password</title>
      </Head>

      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 before_login_box">
              <div className="before_login_heading">
                <h2>Reset Password</h2>
                <p>Reset Your Password</p>
              </div>
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-12 form-group">
                    <label>New Password</label>
                    <div className="form_field_wrap">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="************ "
                      />
                      <span className="show_password">
                        <img src="images/eyeslash.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <label>Re-Enter New Password</label>
                    <div className="form_field_wrap">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="************ "
                      />
                      <span className="show_password">
                        <img src="images/eyeslash.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <button
                      type="button"
                      className="form-control submit_button"
                    >
                      Change Password
                    </button>
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

export default withRouter(ResetPassword);
