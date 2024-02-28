import React from "react";

export default function CompanyProfilePage() {
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
          <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-10/12 lg:w-10/12 lg:p-12">
            <div className="text-normal text-light-gray m-auto mb-7 w-full text-center text-sm leading-6">
              <h2 className="text-color-dark mb-3 text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-10">
                Company Profile
              </h2>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="mb-4 w-full">
                <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                  <label className="text-color-dark mb-3.5 block text-left text-lg font-medium capitalize leading-5">
                    Company Information
                  </label>
                </div>
              </div>
              <div className="mb-3.5 w-full">
                <div className="flex flex-wrap">
                  <div className="mb-3.5 w-full md:w-6/12 md:pr-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Upload Company Logo
                    </label>
                    <div className="relative m-auto flex h-64 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center">
                      <div className="text-color-dark text-sm font-medium leading-4">
                        <img src="images/upload.png" className="m-auto mb-3" />
                        <span> Drop your Company Logo here, or </span>
                        <span className="text-blue-500">browse</span>
                        <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                          (.jpg or .png only. Up to 16mb)
                        </p>
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
                  <div className="mb-3.5 w-full md:w-6/12 md:pl-3.5">
                    <div className="mb-4 w-full">
                      <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                        Company Name
                      </label>
                      <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                        <input
                          type="text"
                          placeholder="Company Name"
                          className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                        Business Type
                      </label>
                      <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                        <select className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none">
                          <option>Select Business Type</option>
                          <option>Select Business Type</option>
                          <option>Select Business Type</option>
                          <option>Select Business Type</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                        Annual Purchasing Volume
                      </label>
                      <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                        <input
                          type="text"
                          placeholder="Annual Purchasing Volume"
                          className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3.5 w-full">
                <div className="mb-4 w-full border-y border-solid border-gray-200 py-2.5">
                  <label className="text-color-dark m-0 block text-left text-base font-medium leading-5">
                    Registration Address
                  </label>
                </div>
                <div className="flex flex-wrap">
                  <div className="mb-4 w-full md:w-6/12 md:pr-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Address
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="text"
                        placeholder="Address"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full md:w-6/12 md:pl-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      City
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="text"
                        placeholder="City"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full md:w-6/12 md:pr-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Province
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="text"
                        placeholder="Province"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full md:w-6/12 md:pl-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Country
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <select className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none">
                        <option>Country</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>India</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3.5 w-full">
                <div className="mb-4 w-full border-y border-solid border-gray-200 py-2.5">
                  <label className="text-color-dark m-0 block text-left text-base font-medium leading-5">
                    More Information
                  </label>
                </div>
                <div className="flex flex-wrap">
                  <div className="mb-4 w-full md:w-6/12 md:pr-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Year Of Establishment
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <select className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none">
                        <option>1990</option>
                        <option>1991</option>
                        <option>1992</option>
                        <option>1993</option>
                        <option>1994</option>
                        <option>1995</option>
                        <option>1996</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 w-full md:w-6/12 md:pl-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      City
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <select className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none">
                        <option>1990</option>
                        <option>1991</option>
                        <option>1992</option>
                        <option>1993</option>
                        <option>1994</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      About Us
                    </label>
                    <div className="relative h-32 w-full rounded border border-solid border-gray-300">
                      <textarea
                        placeholder="Write Here...."
                        className="text-light-gray placeholder:text-light-gray h-full w-full resize-none rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3.5 w-full">
                <div className="mb-4 flex w-full items-center justify-between border-y border-solid border-gray-200 py-2.5">
                  <label className="text-color-dark m-0 block text-left text-base font-medium leading-5">
                    Branch
                  </label>
                  <div className="text-dark-orange flex cursor-pointer items-center text-sm font-semibold capitalize leading-8">
                    <img src="images/add-icon.svg" className="mr-1" />
                    <span> Add new branch</span>
                  </div>
                </div>
                <div className="mb-3.5 inline-block w-full">
                  <label className="text-color-dark mb-3 block text-left text-sm font-medium leading-5">
                    Business Type
                  </label>
                  <div className="relative mb-3.5 w-full rounded border border-solid border-gray-200 p-3">
                    <div className="flex w-full items-center justify-between">
                      <div className="w-auto">
                        <span className="text-dark-cyan my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4">
                          online shope
                          <img src="images/close.svg" className="ml-4" />
                        </span>
                        <span className="text-dark-cyan my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4">
                          manufacturer / factory
                          <img src="images/close.svg" className="ml-4" />
                        </span>
                        <span className="text-dark-cyan my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4">
                          trading company
                          <img src="images/close.svg" className="ml-4" />
                        </span>
                      </div>
                      <div className="w-auto">
                        <ul>
                          <li>
                            <img src="images/social-arrow-icon.svg" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-3.5 w-full rounded border border-solid border-gray-200 p-3">
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">online shop</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">manufacturer / factory</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">trading company</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">distributor / wholesaler</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">retailer</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">individual</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">other</span>
                      </label>
                    </div>
                    <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                      <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                        <input
                          type="checkbox"
                          name=""
                          className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                        />
                        <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                        <span className="tex">service provider</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-3.5 w-full">
                  <label className="text-color-dark mb-3 block text-left text-sm font-medium leading-5">
                    Upload Branch Front Picture
                  </label>
                  <div className="relative m-auto flex h-64 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center">
                    <div className="text-color-dark text-sm font-medium leading-4">
                      <img src="images/upload.png" className="m-auto mb-3" />
                      <span> Drop your Company Logo here, or </span>
                      <span className="text-blue-500">browse</span>
                      <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                        (.jpg or .png only. Up to 16mb)
                      </p>
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
                <div className="mb-3.5 w-full">
                  <label className="text-color-dark mb-3 block text-left text-sm font-medium leading-5">
                    Proof Of Address
                  </label>
                  <div className="relative m-auto flex h-64 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center">
                    <div className="text-color-dark text-sm font-medium leading-4">
                      <img src="images/upload.png" className="m-auto mb-3" />
                      <span> Drop your Company Logo here, or </span>
                      <span className="text-blue-500">browse</span>
                      <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                        (.jpg or .png only. Up to 16mb)
                      </p>
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
              </div>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="mb-4 w-full">
                <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                  <label className="text-color-dark mb-3.5 block text-left text-lg font-medium capitalize leading-5">
                    Branch Location
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="mb-4 w-full md:w-6/12 md:pr-3.5">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Address
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="text"
                      placeholder="Address"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full md:w-6/12 md:pl-3.5">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    City
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="text"
                      placeholder="City"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full md:w-6/12 md:pr-3.5">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Province
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <input
                      type="text"
                      placeholder="Province"
                      className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full md:w-6/12 md:pl-3.5">
                  <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                    Country
                  </label>
                  <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                    <select className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none">
                      <option>Country</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>India</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="mb-4 w-full">
                <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                  <label className="text-color-dark mb-3.5 block text-left text-lg font-medium capitalize leading-5">
                    Branch Working Hours
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-wrap">
                  <div className="mb-4 w-full md:w-6/12 md:pr-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      Start Time
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="date"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4 w-full md:w-6/12 md:pl-3.5">
                    <label className="text-color-dark mb-3.5 block text-left text-sm font-medium capitalize leading-4">
                      End Time
                    </label>
                    <div className="relative h-14 w-full rounded border border-solid border-gray-300">
                      <input
                        type="date"
                        className="text-light-gray placeholder:text-light-gray h-full w-full rounded border-0 px-4 py-2.5 text-left text-sm font-normal leading-4 placeholder:text-sm placeholder:font-normal placeholder:leading-4 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3.5 w-full border-b-2 border-dashed border-gray-300 pb-4">
                <div className="flex flex-wrap">
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Sun
                    </label>
                  </div>
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Mon
                    </label>
                  </div>
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Tue
                    </label>
                  </div>
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Wed
                    </label>
                  </div>
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Thu
                    </label>
                  </div>
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Fri
                    </label>
                  </div>
                  <div className="mr-4 flex w-auto items-center justify-between p-0 px-2 lg:px-0">
                    <label className="text-color-dark flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange absolute h-0 w-0 cursor-pointer opacity-0"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Sat
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3.5 mt-3 inline-block w-full">
                <label className="text-color-dark mb-3 block text-left text-sm font-medium leading-5">
                  Tag
                </label>
                <div className="relative mb-3.5 w-full rounded border border-solid border-gray-200 p-3">
                  <div className="flex w-full items-center justify-between">
                    <div className="w-auto">
                      <span className="text-dark-cyan my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4">
                        online shope
                        <img src="images/close.svg" className="ml-4" />
                      </span>
                      <span className="text-dark-cyan my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4">
                        manufacturer / factory
                        <img src="images/close.svg" className="ml-4" />
                      </span>
                      <span className="text-dark-cyan my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4">
                        trading company
                        <img src="images/close.svg" className="ml-4" />
                      </span>
                    </div>
                    <div className="w-auto">
                      <ul>
                        <li>
                          <img src="images/social-arrow-icon.svg" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative mb-3.5 w-full rounded border border-solid border-gray-200 p-3">
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">online shop</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">manufacturer / factory</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">trading company</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">distributor / wholesaler</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">retailer</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">individual</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">other</span>
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="text-light-gray flex w-auto items-center justify-start text-sm font-normal leading-8">
                      <input
                        type="checkbox"
                        name=""
                        className="[&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark absolute h-0 w-0 cursor-pointer opacity-0 "
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      <span className="tex">service provider</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                type="button"
                className="bg-dark-orange h-14 w-full rounded text-center text-lg font-bold leading-6 text-white focus:shadow-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
