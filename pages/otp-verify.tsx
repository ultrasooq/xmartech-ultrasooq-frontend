import React, { useState } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from "react-hot-toast";

const OtpVerification = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Otp Verification</title>
      </Head>

      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 before_login_box">
              <div className="before_login_heading">
                <h2>verify OTP</h2>
                <p>Enter the OTP which you received via email</p>
              </div>
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-12 form-group">
                    <div className="form_field_wrap otp_input_field">
                      <input type="text" className="form-control" />
                      <input type="text" className="form-control" />
                      <input type="text" className="form-control" />
                      <input type="text" className="form-control" />
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <button
                      type="button"
                      className="form-control submit_button verify_button"
                    >
                      Verify
                    </button>
                  </div>
                  <div className="col-lg-12 form-group text-center allready_account">
                    <span>
                      Didn&apos;t receive OTP? <a>Resend</a>
                    </span>
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

export default withRouter(OtpVerification);
