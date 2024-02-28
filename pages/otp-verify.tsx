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
                  Verify OTP
                </h2>
                <p>Enter the OTP which you received via email</p>
              </div>
              <div className="w-full">
                <div className="flex flex-wrap">
                  <div className="mb-4 w-full">
                    <div className="m-auto flex h-auto w-3/4 items-center justify-between border-0">
                      <input
                        type="text"
                        className="h-16 w-1/6 rounded-lg border border-solid border-gray-300 px-3.5 py-2.5 text-center text-2xl font-normal leading-4 focus:outline-none"
                      />
                      <input
                        type="text"
                        className="h-16 w-1/6 rounded-lg border border-solid border-gray-300 px-3.5 py-2.5 text-center text-2xl font-normal leading-4 focus:outline-none"
                      />
                      <input
                        type="text"
                        className="h-16 w-1/6 rounded-lg border border-solid border-gray-300 px-3.5 py-2.5 text-center text-2xl font-normal leading-4 focus:outline-none"
                      />
                      <input
                        type="text"
                        className="h-16 w-1/6 rounded-lg border border-solid border-gray-300 px-3.5 py-2.5 text-center text-2xl font-normal leading-4 focus:outline-none"
                      />
                      <input
                        type="text"
                        className="h-16 w-1/6 rounded-lg border border-solid border-gray-300 px-3.5 py-2.5 text-center text-2xl font-normal leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full text-center">
                    <button
                      type="button"
                      className="bg-dark-orange m-auto h-14 w-auto rounded px-10 text-center text-lg font-bold leading-6 text-white"
                    >
                      Verify
                    </button>
                  </div>
                  <div className="mb-4 w-full text-center">
                    <span className="text-light-gray text-sm font-medium leading-4">
                      Didn't receive OTP?{" "}
                      <a
                        onClick={() => Router.push("/register")}
                        className="text-dark-orange cursor-pointer font-medium"
                      >
                        Signup
                      </a>
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
