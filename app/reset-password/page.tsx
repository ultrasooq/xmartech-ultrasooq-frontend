import React from "react";

export default function ResetPasswordPage() {
  return (
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
                Reset Password
              </h2>
              <p>Reset Your Password</p>
            </div>
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    New Password
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
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Re-enter new Password
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
                  <button
                    type="button"
                    className="bg-dark-orange h-14 w-full rounded text-center text-lg font-bold leading-6 text-white"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
