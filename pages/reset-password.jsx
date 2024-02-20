import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const ResetPassword = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Forget Password</title>
      </Head>

      <section className='w-full py-7 relative'>
        <div className='w-full h-full absolute top-0 left-0 -z-10'>
          <img src='images/before-login-bg.png' className='w-full h-full object-cover object-bottom'/>
        </div>
        <div className='container m-auto relative z-10'>
          <div className='flex'>
            <div className='md:w-9/12 lg:w-7/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 sm:p-12 p-7'>
              <div className='w-full text-sm text-normal leading-6 text-light-gray text-center m-auto mb-7'>
                <h2 className='sm:text-4xl font-semibold sm:leading-10 text-center text-color-dark mb-3 text-3xl leading-8'>Reset Password</h2>
                <p>Reset Your Password</p>
              </div>
              <div className='w-full'>
                <div className='flex flex-wrap'>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>New Password</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='password' placeholder='**********' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                      <span className='w-6 h-6 absolute top-0 bottom-0 right-2.5 m-auto cursor-pointer'><img src="images/eyeslash.svg"/></span>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Re-enter new Password</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='password' placeholder='**********' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                      <span className='w-6 h-6 absolute top-0 bottom-0 right-2.5 m-auto cursor-pointer'><img src="images/eyeslash.svg"/></span>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <button type="button" class="w-full h-14 rounded text-white text-lg font-bold leading-6 text-center bg-dark-orange">Change Password</button>
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




export default withRouter(ResetPassword);