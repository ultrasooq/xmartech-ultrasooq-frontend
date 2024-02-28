import React, { useState } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from "react-hot-toast";

const ForgetPassword = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Forget Password</title>
      </Head>

      <section className="relative w-full py-7">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <img
            src="images/before-login-bg.png"
            className="h-full w-full object-cover object-bottom"
          />
        </div>
        <div className="container relative z-10 m-auto">
          <div className="flex">
            <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-7 shadow-sm sm:p-12 md:w-9/12 lg:w-7/12">
              <div className="text-normal text-light-gray m-auto mb-7 w-full text-center text-sm leading-6">
                <h2 className="text-color-dark mb-3 text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-10">
                  Forgot Your Password
                </h2>
                <p>Enter email address to receive password reset link</p>
              </div>
              <div className="w-full">
                <div className="flex flex-wrap">
                  <div className="mb-4 w-full">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Email or Phone number or ID
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="text"
                        placeholder="Email or Phone number or ID"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <button
                      type="button"
                      className="bg-dark-orange h-14 w-full rounded text-center text-lg font-bold leading-6 text-white"
                    >
                      Reset Password
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

export default withRouter(ForgetPassword);
