import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const PasswordSuccessful = () => {
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
            <div className='md:w-9/12 lg:w-7/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 sm:p-20 p-8'>
              
              <div className='w-full'>
                <div className='flex flex-wrap'>
                  <div className='lg:w-8/12 w-9/12 m-auto text-center'>
                    <img src="images/successful.svg" className='m-auto'/>
                    <h3 className='xl:text-4xl sm:text-3xl text-2xl font-semibold sm:leading-10 leading-normal mt-3.5 text-color-dark'>Successful Changed Password</h3>
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




export default withRouter(PasswordSuccessful);