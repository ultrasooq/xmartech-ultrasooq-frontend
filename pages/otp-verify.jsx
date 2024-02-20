import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const OtpVerification = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Otp Verification</title>
      </Head>


      <section className='w-full py-7 relative'>
        <div className='w-full h-full absolute top-0 left-0 -z-10'>
          <img src='images/before-login-bg.png' className='w-full h-full object-cover object-bottom'/>
        </div>
        <div className='container m-auto relative z-10'>
          <div className='flex'>
            <div className='md:w-9/12 lg:w-7/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 sm:p-12 p-7'>
              <div className='w-full text-sm text-normal leading-6 text-light-gray text-center m-auto mb-7'>
                <h2 className='sm:text-4xl font-semibold sm:leading-10 text-center text-color-dark mb-3 text-3xl leading-8'>Verify OTP</h2>
                <p>Enter the OTP which you received via email</p>
              </div>
              <div className='w-full'>
                <div className='flex flex-wrap'>
                  <div className='w-full mb-4'>
                    <div className='w-3/4 h-auto border-0 m-auto flex items-center justify-between'>
                      <input type="text" class="w-1/6 h-16 py-2.5 px-3.5 text-2xl font-normal leading-4 text-center rounded-lg border border-solid border-gray-300 focus:outline-none"/>
                      <input type="text" class="w-1/6 h-16 py-2.5 px-3.5 text-2xl font-normal leading-4 text-center rounded-lg border border-solid border-gray-300 focus:outline-none"/>
                      <input type="text" class="w-1/6 h-16 py-2.5 px-3.5 text-2xl font-normal leading-4 text-center rounded-lg border border-solid border-gray-300 focus:outline-none"/>
                      <input type="text" class="w-1/6 h-16 py-2.5 px-3.5 text-2xl font-normal leading-4 text-center rounded-lg border border-solid border-gray-300 focus:outline-none"/>
                      <input type="text" class="w-1/6 h-16 py-2.5 px-3.5 text-2xl font-normal leading-4 text-center rounded-lg border border-solid border-gray-300 focus:outline-none"/>
                    </div>
                  </div>
                  <div className='w-full mb-4 text-center'>
                    <button type="button" class="w-auto h-14 px-10 m-auto rounded text-white text-lg font-bold leading-6 text-center bg-dark-orange">Verify</button>
                  </div>
                  <div className='w-full mb-4 text-center'>
                    <span className='text-sm font-medium leading-4 text-light-gray'>Didn't receive OTP? <a onClick={() => Router.push("/register")} className='font-medium text-dark-orange cursor-pointer'>Signup</a></span>
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




export default withRouter(OtpVerification);