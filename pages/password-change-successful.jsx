import React, { useState } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from "react-hot-toast";

const PasswordSuccessful = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Forget Password</title>
      </Head>

      <section className="before_login_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 before_login_box successful_box">
              <div className="before_login_form_wrap">
                <div className="row">
                  <div className="col-lg-9 text-center m-auto successful_box_under">
                    <img src="images/successful.svg" />
                    <h3>Successful Changed Password</h3>
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

export default withRouter(PasswordSuccessful);
