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

      <section className="relative w-full py-7">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <img
            src="images/before-login-bg.png"
            className="h-full w-full object-cover object-bottom"
            alt="before-login-bg-icon"
          />
        </div>
        <div className="container relative z-10 m-auto">
          <div className="flex">
            <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-8 shadow-sm sm:p-20 md:w-9/12 lg:w-7/12">
              <div className="w-full">
                <div className="flex flex-wrap">
                  <div className="m-auto w-9/12 text-center lg:w-8/12">
                    <img
                      src="images/successful.svg"
                      className="m-auto"
                      alt="successful-icon"
                    />
                    <h3 className="mt-3.5 text-2xl font-semibold leading-normal text-color-dark sm:text-3xl sm:leading-10 xl:text-4xl">
                      Successful Changed Password
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <img src="../images/favicon.ico" alt='logo'/>
      <button onClick={()=> Router.push("/home")} className='button-sub'>Goto Home</button>
      <button onClick={()=> Router.push("/details/page")} className='button-sub'>Goto Page</button> */}
    </SiteLayout>
  );
};

export default withRouter(PasswordSuccessful);
