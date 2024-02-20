import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const Register = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Register</title>
      </Head>
      

      <section className='w-full py-7 relative'>
        <div className='w-full h-full absolute top-0 left-0 -z-10'>
          <img src='images/before-login-bg.png' className='w-full h-full object-cover object-center'/>
        </div>
        <div className='container m-auto relative z-10'>
          <div className='flex'>
            <div className='md:w-9/12 lg:w-7/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 sm:p-12 p-7'>
              <div className='w-full text-sm text-normal leading-6 text-light-gray text-center m-auto mb-7'>
                <h2 className='sm:text-4xl font-semibold sm:leading-10 text-center text-color-dark mb-3 text-3xl leading-8'>Registration</h2>
                <p>Create Your account</p>
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
              <div className="w-full text-center relative py-5 before:w-full before:h-px before:content-[''] before:block before:absolute before:bg-gray-200 before:left-0 before:top-0 before:bottom-0 before:right-0 before:m-auto">
                <span className='p-2.5 bg-white relative z-10 text-sm font-normal leading-8 text-gray-400'>Or</span>
              </div>
              <div className='w-full'>
                <div className='flex flex-wrap'>
                  <div className='w-full flex flex-wrap items-center justify-start mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative m-0 w-full sm:w-auto'>Please select trade role :</label>
                    <div className='flex items-center sm:ml-5 sm:w-auto sm:mt-0 relative w-full mt-2'>
                      <input type="radio" id="Buyer" name="trade" value="Buyer" className='peer w-full h-full absolute opacity-0 z-10 cursor-pointer [&:checked+span]:border-dark-orange'/>
                      <span className="w-3.5 h-3.5 bg-white rounded-full border-2 border-solid border-gray-400 absolute top-0 left-0 bottom-0 m-auto before:rounded-full before:peer-checked:bg-dark-orange before:content-[''] before:block before:absolute before:w-4/6 before:h-4/6 before:left-0 before:top-0 before:right-0 before:bottom-0 before:m-auto"></span>
                      <label for="html" className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative pl-5'>Buyer</label>
                    </div>
                    <div className='flex items-center sm:ml-5 sm:w-auto sm:mt-0 relative w-full mt-2'>
                      <input type="radio" id="Buyer" name="trade" value="Buyer" className='peer w-full h-full absolute opacity-0 z-10 cursor-pointer [&:checked+span]:border-dark-orange'/>
                      <span className="w-3.5 h-3.5 bg-white rounded-full border-2 border-solid border-gray-400 absolute top-0 left-0 bottom-0 m-auto before:rounded-full before:peer-checked:bg-dark-orange before:content-[''] before:block before:absolute before:w-4/6 before:h-4/6 before:left-0 before:top-0 before:right-0 before:bottom-0 before:m-auto"></span>
                      <label for="html" className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative pl-5'>Freelancer</label>
                    </div>
                    <div className='flex items-center sm:ml-5 sm:w-auto sm:mt-0 relative w-full mt-2'>
                      <input type="radio" id="Buyer" name="trade" value="Buyer" className='peer w-full h-full absolute opacity-0 z-10 cursor-pointer [&:checked+span]:border-dark-orange'/>
                      <span className="w-3.5 h-3.5 bg-white rounded-full border-2 border-solid border-gray-400 absolute top-0 left-0 bottom-0 m-auto before:rounded-full before:peer-checked:bg-dark-orange before:content-[''] before:block before:absolute before:w-4/6 before:h-4/6 before:left-0 before:top-0 before:right-0 before:bottom-0 before:m-auto"></span>
                      <label for="html" className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative pl-5'>Company</label>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>First Name</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='text' placeholder='Enter Your First Name' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Last Name</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='text' placeholder='Enter Your Last Name' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Email Address</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='email' placeholder='Enter Your Email Address' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Login Password</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='password' placeholder='Enter Your Login Password' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                      <span className='w-6 h-6 absolute top-0 bottom-0 right-2.5 m-auto cursor-pointer'><img src="images/eyeslash.svg"/></span>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Confirm Password</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='password' placeholder='Enter Your Confirm Password' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                      <span className='w-6 h-6 absolute top-0 bottom-0 right-2.5 m-auto cursor-pointer'><img src="images/eyeslash.svg"/></span>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Phone Number</label>
                    <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                      <input type='number' placeholder='Enter Your Phone Number' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <div className='lg:w-full w-auto flex items-center justify-between p-0'>
                      <label className='w-full text-sm font-medium text-light-gray leading-4 flex items-start justify-start'>
                        <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                        <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                        I Agree The Terms Of Use & Privacy Policy
                      </label>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <button type="button" class="w-full h-14 rounded text-white text-lg font-bold leading-6 text-center bg-dark-orange">Agree & Register</button>
                  </div>
                  <div className='w-full mb-4 text-center'>
                    <span className='text-sm font-medium leading-4 text-light-gray'>Do you already have an account? <a onClick={() => Router.push("/login")} className='font-medium text-dark-orange cursor-pointer'>Sign in</a></span>
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




export default withRouter(Register);