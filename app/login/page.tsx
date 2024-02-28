"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import SiteLayout from "../../layout/MainLayout/SiteLayout";
// import { toast } from "react-toastify";
import _ from "lodash";
// import { useRouter } from "next/router";
// import ToastHot from "react-hot-toast";

export default function LoginPage() {
  const Router = useRouter();
  return (
    <>
      <section className="relative w-full py-7">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <img
            src="images/before-login-bg.png"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="container relative z-10 m-auto">
          <div className="flex">
            <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-7 shadow-sm sm:p-12 md:w-9/12 lg:w-7/12">
              <div className="text-normal text-light-gray m-auto mb-7 w-full text-center text-sm leading-6">
                <h2 className="text-color-dark mb-3 text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-10">
                  Login
                </h2>
                <p>Login to your account</p>
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
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Password
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="password"
                        placeholder="**********"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                      <span className="absolute bottom-0 right-2.5 top-0 m-auto h-6 w-6 cursor-pointer">
                        <img src="images/eyeslash.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <div className="flex w-auto items-center justify-between p-0 lg:w-full">
                      <label className="text-color-dark flex w-auto items-center justify-start text-sm font-medium leading-4">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        Remembar me
                      </label>
                      <div className="w-auto">
                        <span
                          className="text-dark-orange cursor-pointer text-sm font-medium leading-8"
                          onClick={() => Router.push("/forget-password")}
                        >
                          Forgot Password{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <button
                      type="button"
                      className="bg-dark-orange h-14 w-full rounded text-center text-lg font-bold leading-6 text-white"
                    >
                      Login
                    </button>
                  </div>
                  <div className="mb-4 w-full text-center">
                    <span className="text-light-gray text-sm font-medium leading-4">
                      Don't have an account?{" "}
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
              <div className="relative w-full py-5 text-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-px before:w-full before:bg-gray-200 before:content-['']">
                <span className="relative z-10 bg-white p-2.5 text-sm font-normal leading-8 text-gray-400">
                  Or
                </span>
              </div>
              <div className="w-full">
                <ul className="flex w-full flex-wrap items-center justify-between">
                  <li className="mb-3 w-full p-0 sm:mb-0 sm:w-6/12 sm:pr-3">
                    <a
                      href="#"
                      className="text-light-gray inline-flex w-full items-center justify-center rounded-md border border-solid border-gray-300 px-5 py-2.5 text-sm font-normal leading-4"
                    >
                      <img src="images/facebook-icon.png" className="mr-1.5" />
                      <span>Sign In with Facebook</span>
                    </a>
                  </li>
                  <li className="w-full p-0 sm:w-6/12 sm:pl-3">
                    <a
                      href="#"
                      className="text-light-gray inline-flex w-full items-center justify-center rounded-md border border-solid border-gray-300 px-5 py-2.5 text-sm font-normal leading-4"
                    >
                      <img src="images/google-icon.png" className="mr-1.5" />
                      <span>Sign In with Facebook</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <img src="../images/favicon.ico" alt='favicon'/>
      <button onClick={()=> Router.push("/home")} className='button-sub'>Goto Home</button>
      <button onClick={()=> Router.push("/details/Loginpage")} className='button-sub'>Goto Page</button> */}
    </>
  );
}
