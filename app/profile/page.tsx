import React from "react";

function ProfilePage() {
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
          <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-9/12 lg:w-7/12 lg:p-12">
            <div className="text-normal text-light-gray m-auto mb-7 w-full text-center text-sm leading-6">
              <h2 className="text-color-dark mb-3 text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-10">
                Profile
              </h2>
              <p>Update Profile</p>
            </div>
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="mb-4 w-full">
                  <div className="relative m-auto flex h-44 w-44 flex-wrap items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-center">
                    <div className="text-color-dark text-sm font-medium leading-4">
                      <img src="images/camera.png" className="m-auto mb-3" />
                      <span> Upload Image</span>
                    </div>
                    <input
                      type="file"
                      id="files"
                      multiple
                      name="files[]"
                      className="absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-full cursor-pointer opacity-0"
                    />
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
                <div className="mb-4 flex w-full flex-wrap items-center justify-start">
                  <label className="text-color-dark relative m-0 w-full text-left text-sm font-medium capitalize leading-4">
                    Gender
                  </label>
                  <div className="relative mr-5 mt-2 flex w-auto items-center">
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
                      Male
                    </label>
                  </div>
                  <div className="relative mr-5 mt-2 flex w-auto items-center">
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
                      Female
                    </label>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Date Of Birth
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="date"
                      placeholder="Enter Your Last Name"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Email
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="email"
                      placeholder="Enter Your Last Name"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <div className="flex w-full items-center justify-between">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Phone Number
                    </label>
                    <div className="text-dark-orange mb-3.5 flex cursor-pointer items-center text-sm font-semibold capitalize leading-8">
                      <img src="images/add-icon.svg" className="mr-1" />
                      <span> Add Phone Number</span>
                    </div>
                  </div>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="number"
                      placeholder="Enter Your Last Name"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <div className="flex w-full items-center justify-between">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Phone Number
                    </label>
                    <div className="text-dark-orange mb-3.5 flex cursor-pointer items-center text-sm font-semibold capitalize leading-8">
                      <img src="images/add-icon.svg" className="mr-1" />
                      <span> Add Link</span>
                    </div>
                  </div>
                  <div className="mb-3.5 h-auto w-full rounded border border-solid border-gray-300 p-3.5">
                    <div className="flex w-full flex-wrap items-center justify-between">
                      <div className="text-color-dark flex items-center text-sm font-normal leading-4">
                        <img
                          src="images/social-facebook-icon.svg"
                          className="mr-1.5"
                        />
                        <span>Facebook</span>
                      </div>
                      <div className="flex">
                        <ul className="flex items-center justify-end gap-x-3.5">
                          <li>
                            <img src="images/social-edit-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-delete-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-arrow-icon.svg" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full ">
                      <label className="text-color-dark mb-3.5 inline-block text-xs font-medium capitalize leading-4">
                        Link
                      </label>
                      <input
                        type="text"
                        placeholder="www.facebook_Lorem ipsum & 4115.com"
                        className="text-light-gray left-4 h-11 w-full rounded-md border border-solid border-gray-100 px-3.5 py-2.5 text-left text-sm font-normal shadow-sm focus:shadow-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-3.5 h-auto w-full rounded border border-solid border-gray-300 p-3.5">
                    <div className="flex w-full flex-wrap items-center justify-between">
                      <div className="text-color-dark flex items-center text-sm font-normal leading-4">
                        <img
                          src="images/social-linkedin-icon.svg"
                          className="mr-1.5"
                        />
                        <span>Linkedin</span>
                      </div>
                      <div className="flex">
                        <ul className="flex items-center justify-end gap-x-3.5">
                          <li>
                            <img src="images/social-edit-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-delete-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-arrow-icon.svg" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full ">
                      <label className="text-color-dark mb-3.5 inline-block text-xs font-medium capitalize leading-4">
                        Link
                      </label>
                      <input
                        type="text"
                        placeholder="www.facebook_Lorem ipsum & 4115.com"
                        className="text-light-gray left-4 h-11 w-full rounded-md border border-solid border-gray-100 px-3.5 py-2.5 text-left text-sm font-normal shadow-sm focus:shadow-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-3.5 h-auto w-full rounded border border-solid border-gray-300 p-3.5">
                    <div className="flex w-full flex-wrap items-center justify-between">
                      <div className="text-color-dark flex items-center text-sm font-normal leading-4">
                        <img
                          src="images/social-instagram-icon.svg"
                          className="mr-1.5"
                        />
                        <span>Instagram</span>
                      </div>
                      <div className="flex">
                        <ul className="flex items-center justify-end gap-x-3.5">
                          <li>
                            <img src="images/social-edit-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-delete-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-arrow-icon.svg" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full ">
                      <label className="text-color-dark mb-3.5 inline-block text-xs font-medium capitalize leading-4">
                        Link
                      </label>
                      <input
                        type="text"
                        placeholder="www.facebook_Lorem ipsum & 4115.com"
                        className="text-light-gray left-4 h-11 w-full rounded-md border border-solid border-gray-100 px-3.5 py-2.5 text-left text-sm font-normal shadow-sm focus:shadow-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-3.5 h-auto w-full rounded border border-solid border-gray-300 p-3.5">
                    <div className="flex w-full flex-wrap items-center justify-between">
                      <div className="text-color-dark flex items-center text-sm font-normal leading-4">
                        <img
                          src="images/social-twitter-icon.svg"
                          className="mr-1.5"
                        />
                        <span>Twitter</span>
                      </div>
                      <div className="flex">
                        <ul className="flex items-center justify-end gap-x-3.5">
                          <li>
                            <img src="images/social-edit-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-delete-icon.svg" />
                          </li>
                          <li>
                            <img src="images/social-arrow-icon.svg" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full ">
                      <label className="text-color-dark mb-3.5 inline-block text-xs font-medium capitalize leading-4">
                        Link
                      </label>
                      <input
                        type="text"
                        placeholder="www.facebook_Lorem ipsum & 4115.com"
                        className="text-light-gray left-4 h-11 w-full rounded-md border border-solid border-gray-100 px-3.5 py-2.5 text-left text-sm font-normal shadow-sm focus:shadow-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <button
                      type="button"
                      className="bg-dark-orange h-14 w-full rounded text-center text-lg font-bold leading-6 text-white focus:shadow-none"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
