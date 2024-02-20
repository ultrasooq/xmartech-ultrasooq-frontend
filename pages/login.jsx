import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const Login = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Login</title>
      </Head>

      <section className='w-full py-7 relative'>
        <div className='w-full h-full absolute top-0 left-0 -z-10'>
          <img src='images/before-login-bg.png' className='w-full h-full object-cover object-center'/>
        </div>
        <div className='container m-auto relative z-10'>
          <div className='flex'>
            <div className='md:w-9/12 lg:w-7/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 sm:p-12 p-7'>
              <div className='w-full text-sm text-normal leading-6 text-light-gray text-center m-auto mb-7'>
                <h2 className='sm:text-4xl font-semibold sm:leading-10 text-center text-color-dark mb-3 text-3xl leading-8'>Login</h2>
                <p>Login to your account</p>
              </div>
              <div className='w-full'>
                <div className='flex flex-wrap'>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Email or Phone number or ID</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='text' placeholder='Email or Phone number or ID' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Password</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='password' placeholder='**********' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                      <span className='w-6 h-6 absolute top-0 bottom-0 right-2.5 m-auto cursor-pointer'><img src="images/eyeslash.svg"/></span>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <div className='lg:w-full w-auto flex items-center justify-between p-0'>
                      <label className='w-auto text-sm font-medium text-color-dark leading-4 flex items-center justify-start'>
                        <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                        <span className="w-5 h-5 relative rounded border-2 border-solid border-gray-400 bg-transparent inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                        Remembar me
                      </label>
                      <div className='w-auto'>
                        <span className='text-sm font-medium leading-8 text-dark-orange cursor-pointer' onClick={() => Router.push("/forget-password")}>Forgot Password </span>
                      </div>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <button type="button" class="w-full h-14 rounded text-white text-lg font-bold leading-6 text-center bg-dark-orange">Login</button>
                  </div>
                  <div className='w-full mb-4 text-center'>
                    <span className='text-sm font-medium leading-4 text-light-gray'>Don't have an account? <a onClick={() => Router.push("/register")} className='font-medium text-dark-orange cursor-pointer'>Signup</a></span>
                  </div>
                </div>
              </div>
              <div className="w-full text-center relative py-5 before:w-full before:h-px before:content-[''] before:block before:absolute before:bg-gray-200 before:left-0 before:top-0 before:bottom-0 before:right-0 before:m-auto">
                <span className='p-2.5 bg-white relative z-10 text-sm font-normal leading-8 text-gray-400'>Or</span>
              </div>
              <div className='w-full'>
                <ul className='w-full flex flex-wrap items-center justify-between'>
                  <li className='sm:w-6/12 sm:pr-3 sm:mb-0 w-full p-0 mb-3'>
                    <a href='#' className='w-full border border-solid border-gray-300 py-2.5 px-5 inline-flex items-center justify-center rounded-md text-sm font-normal leading-4 text-light-gray'>
                      <img src="images/facebook-icon.png" className='mr-1.5'/>
                      <span>Sign In with Facebook</span>
                    </a>
                  </li>
                  <li className='sm:w-6/12 sm:pl-3 w-full p-0'>
                    <a href='#' className='w-full border border-solid border-gray-300 py-2.5 px-5 inline-flex items-center justify-center rounded-md text-sm font-normal leading-4 text-light-gray'>
                      <img src="images/google-icon.png" className='mr-1.5'/>
                      <span>Sign In with Facebook</span>
                    </a>
                  </li>
                </ul>
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




export default withRouter(Login);