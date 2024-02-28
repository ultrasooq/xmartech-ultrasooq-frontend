"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const Router = useRouter();
  return (
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
                Registration
              </h2>
              <p>Create Your account</p>
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
            <div className="relative w-full py-5 text-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-px before:w-full before:bg-gray-200 before:content-['']">
              <span className="relative z-10 bg-white p-2.5 text-sm font-normal leading-8 text-gray-400">
                Or
              </span>
            </div>
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="mb-4 flex w-full flex-wrap items-center justify-start">
                  <label className="text-color-dark relative m-0 w-full text-left text-sm font-medium capitalize leading-4 sm:w-auto">
                    Please select trade role :
                  </label>
                  <div className="relative mt-2 flex w-full items-center sm:ml-5 sm:mt-0 sm:w-auto">
                    <input
                      type="radio"
                      id="Buyer"
                      name="trade"
                      value="Buyer"
                      className="[&:checked+span]:border-dark-orange peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    />
                    <span className="before:peer-checked:bg-dark-orange absolute bottom-0 left-0 top-0 m-auto h-3.5 w-3.5 rounded-full border-2 border-solid border-gray-400 bg-white before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-4/6 before:w-4/6 before:rounded-full before:content-['']"></span>
                    <label
                      htmlFor="html"
                      className="text-color-dark relative pl-5 text-left text-sm font-medium capitalize leading-4"
                    >
                      Buyer
                    </label>
                  </div>
                  <div className="relative mt-2 flex w-full items-center sm:ml-5 sm:mt-0 sm:w-auto">
                    <input
                      type="radio"
                      id="Buyer"
                      name="trade"
                      value="Buyer"
                      className="[&:checked+span]:border-dark-orange peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    />
                    <span className="before:peer-checked:bg-dark-orange absolute bottom-0 left-0 top-0 m-auto h-3.5 w-3.5 rounded-full border-2 border-solid border-gray-400 bg-white before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-4/6 before:w-4/6 before:rounded-full before:content-['']"></span>
                    <label
                      htmlFor="html"
                      className="text-color-dark relative pl-5 text-left text-sm font-medium capitalize leading-4"
                    >
                      Freelancer
                    </label>
                  </div>
                  <div className="relative mt-2 flex w-full items-center sm:ml-5 sm:mt-0 sm:w-auto">
                    <input
                      type="radio"
                      id="Buyer"
                      name="trade"
                      value="Buyer"
                      className="[&:checked+span]:border-dark-orange peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    />
                    <span className="before:peer-checked:bg-dark-orange absolute bottom-0 left-0 top-0 m-auto h-3.5 w-3.5 rounded-full border-2 border-solid border-gray-400 bg-white before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-4/6 before:w-4/6 before:rounded-full before:content-['']"></span>
                    <label
                      htmlFor="html"
                      className="text-color-dark relative pl-5 text-left text-sm font-medium capitalize leading-4"
                    >
                      Company
                    </label>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    First Name
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Last Name
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Email Address
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="email"
                      placeholder="Enter Your Email Address"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Login Password
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="password"
                      placeholder="Enter Your Login Password"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                    <span className="absolute bottom-0 right-2.5 top-0 m-auto h-6 w-6 cursor-pointer">
                      <img src="images/eyeslash.svg" />
                    </span>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Confirm Password
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="password"
                      placeholder="Enter Your Confirm Password"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                    <span className="absolute bottom-0 right-2.5 top-0 m-auto h-6 w-6 cursor-pointer">
                      <img src="images/eyeslash.svg" />
                    </span>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Phone Number
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="number"
                      placeholder="Enter Your Phone Number"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <div className="flex w-auto items-center justify-between p-0 lg:w-full">
                    <label className="text-light-gray flex w-full items-start justify-start text-sm font-medium leading-4">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      I Agree The Terms Of Use & Privacy Policy
                    </label>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <button
                    type="button"
                    className="bg-dark-orange h-14 w-full rounded text-center text-lg font-bold leading-6 text-white"
                  >
                    Agree & Register
                  </button>
                </div>
                <div className="mb-4 w-full text-center">
                  <span className="text-light-gray text-sm font-medium leading-4">
                    Do you already have an account?{" "}
                    <a
                      onClick={() => Router.push("/login")}
                      className="text-dark-orange cursor-pointer font-medium"
                    >
                      Sign in
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
