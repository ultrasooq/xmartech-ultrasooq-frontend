import React from "react";

export default function CompanyProfileDetailsPage() {
  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <img
          src="images/before-login-bg.png"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container relative z-10 m-auto px-3">
        <div className="flex flex-wrap">
          <div className="mb-7 w-full">
            <h2 className="text-color-dark text-4xl font-semibold leading-10">
              Company Profile
            </h2>
          </div>
          <div className="flex w-full flex-wrap rounded-3xl border border-solid border-gray-300 bg-white p-4 shadow-md md:p-9">
            <div className="relative mt-4 h-40 w-40 rounded-full">
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <img
                  src="images/company-logo.png"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="w-full p-3 md:w-[calc(100%_-_10rem)] md:pl-7">
              <div className="flex w-full flex-wrap items-center justify-between">
                <h2 className="text-color-dark left-8 text-3xl font-semibold">
                  Vehement Capital Partners Pvt Ltd
                </h2>
                <div className="w-auto">
                  <button
                    type="button"
                    className="bg-dark-orange flex items-center rounded-md border-0 px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
                  >
                    <img src="images/edit-icon.svg" className="mr-1" /> edit
                  </button>
                </div>
              </div>
              <div className="mt-3 h-auto w-full">
              </div>
              <div className="text-normal mt-4 w-full text-sm font-normal leading-4 text-gray-500">
                <p>Annual Purchasing Volume: <span className="text-dark-cyan font-bold">$ 779.259</span></p>
              </div>
              <div className="text-normal mt-4 w-full text-sm font-normal leading-4 text-gray-500">
                <p>Business Type</p>
                <span className="text-dark-cyan mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-semibold leading-5 mr-3">
                  Trading Company
                </span>
                <span className="text-dark-cyan mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-semibold leading-5 mr-3">
                  Manufacturer / Factory 
                </span>
              </div>
              <div className="mt-4 flex w-full flex-wrap items-center justify-between">
                <div className="my-2 text-sm font-normal leading-4 text-gray-500">
                  <p>
                    Company ID:
                    <span className="text-base font-medium leading-4 text-gray-600">
                      VCP0001458
                    </span>
                  </p>
                </div>
                <div className="my-2 flex flex-wrap items-center justify-between">
                  <span className="text-light-green mr-2.5 text-sm font-medium leading-6">
                    Online.
                  </span>
                  <select className="text-color-dark h-auto rounded border border-solid border-gray-300 bg-white px-4 py-3 text-sm font-normal leading-6">
                    <option>Offline 9:30 pm</option>
                    <option>Online 10:30 am</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full">
            <div className="w-full">
              <ul className="flex flex-wrap items-center justify-start">
                <li className="mr-4 w-full sm:w-auto md:mr-6">
                  <a
                    href="#"
                    className="bg-dark-orange inline-block w-full px-6 py-3 text-center text-base font-semibold leading-6 text-white sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
                  >
                    Profile Info
                  </a>
                </li>
                <li className="mr-4 w-full sm:w-auto md:mr-6">
                  <a
                    href="#"
                    className="inline-block w-full bg-gray-300 px-6 py-3 text-center text-base font-semibold leading-6 text-zinc-500 sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
                  >
                    Ratings & Reviews
                  </a>
                </li>
                <li className="mr-4 w-full sm:w-auto md:mr-6">
                  <a
                    href="#"
                    className="inline-block w-full bg-gray-300 px-6 py-3 text-center text-base font-semibold leading-6 text-zinc-500 sm:w-auto sm:rounded-t-lg sm:px-9 sm:py-3.5"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-md sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
              <div className="w-full">
                <div className="w-full border-b-2 border-dashed border-gray-200 py-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                    <h2 className="text-color-dark left-8 text-2xl font-semibold">
                      Company Information
                    </h2>
                    <div className="w-auto">
                      <button
                        type="button"
                        className="bg-dark-orange flex items-center rounded-md border-0 px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
                      >
                        <img src="images/edit-icon.svg" className="mr-1" /> edit
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="w-full">
                      <div className="w-full mb-4">
                        <label className="text-lg font-bold text-color-dark">Registration Address</label>
                      </div>
                      <div className="w-full flex flex-wrap">
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                email:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                john.rosensky@gmail.com
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Phone:
                              </span>
                            </div>
                            <div className="w-7/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                +1 000 0000 0456
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Social Links:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                Facebook, LInkedin, Instagram
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full py-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                      <div className="w-full mb-4">
                        <label className="text-lg font-bold text-color-dark">More Information</label>
                      </div>
                    <div className="w-auto">
                      <button
                        type="button"
                        className="bg-dark-orange flex items-center rounded-md border-0 px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
                      >
                        <img src="images/edit-icon.svg" className="mr-1" /> edit
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="w-full flex flex-wrap">
                      <div className="w-7/12">
                        <div className="flex w-full flex-wrap py-4">
                          <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                            <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                              Year of Establishment:
                            </span>
                          </div>
                          <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                            <p className="text-color-dark text-base font-medium leading-4">
                              1957
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-5/12">
                        <div className="flex w-full flex-wrap py-4">
                          <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                            <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                              no. of employees:
                            </span>
                          </div>
                          <div className="w-7/12 sm:mr-0 mr-1  flex items-center justify-start">
                            <p className="text-color-dark text-base font-medium leading-4">
                              10,000+
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex w-full flex-wrap py-4">
                          <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                            <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                              About Us:
                            </span>
                          </div>
                          <div className="w-10/12 sm:mr-0 mr-1  flex items-center justify-start pl-7">
                            <p className="text-color-dark text-base font-medium leading-6">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full border-b-2 border-dashed border-gray-200 py-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                    <h2 className="text-color-dark left-8 text-2xl font-semibold">
                      Branch Information
                    </h2>
                  </div>
                  <div className="w-full border border-solid border-gray-300 rounded-lg mb-5">
                    <div className="w-full px-4 py-4 flex items-center justify-between">
                      <div className="w-auto flex items-start text-base font-medium text-color-dark">
                        <span className="mr-1.5">Online Shop,</span> 
                        <span className="mr-1.5">Manufacturer / Factory,</span> 
                        <span className="mr-1.5">Trading Company</span>        
                      </div>
                      <div className="w-auto">
                        <img src="images/social-arrow-icon.svg" alt="arrow"/>
                      </div>
                    </div>
                    <div className="w-full px-5 py-4 border-t border-solid border-gray-300">
                      <div className="w-full flex flex-wrap">
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Address:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                9890 S. Maryland Pkwy Cumbria, Northumberland,
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Contry:
                              </span>
                            </div>
                            <div className="w-7/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                USA
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                City:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                Los Angeles, United States
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Branch Contact Number:
                              </span>
                            </div>
                            <div className="w-7/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                +1 000 0000 0456
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Province:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                Lorem Ipsum
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Branch Contact Name:
                              </span>
                            </div>
                            <div className="w-7/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                John Doe
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Start Time:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                9:00 am
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-5/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-5/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                end time:
                              </span>
                            </div>
                            <div className="w-7/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                12:00 pm
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-7/12">
                          <div className="flex w-full flex-wrap py-4">
                            <div className="mr-1 flex w-4/12 items-center justify-start sm:mr-0">
                              <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                Working Days:
                              </span>
                            </div>
                            <div className="w-8/12 sm:mr-0 mr-1  flex items-center justify-start">
                              <p className="text-color-dark text-base font-medium leading-4">
                                Monday - Friday
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex flex-wrap">
                          <div className="w-7/12">
                            <div className="flex w-full flex-wrap py-4">
                              <div className="mr-1 flex w-full items-center justify-start sm:mr-0 mb-3">
                                <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                  Branch Front Picture:
                                </span>
                              </div>
                              <div className="w-full sm:mr-0 mr-1  flex items-center justify-start">
                                <div className="w-36 h-32 rounded-2xl">
                                  <img src="images/branch-front.png" alt="branch"/>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-5/12">
                            <div className="flex w-full flex-wrap py-4">
                              <div className="mr-1 flex w-full items-center justify-start sm:mr-0 mb-3">
                                <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                                  Proof of Address
                                </span>
                              </div>
                              <div className="w-full sm:mr-0 mr-1  flex items-center justify-start">
                                <div className="w-36 h-32 rounded-2xl">
                                  <img src="images/branch-address.png" alt="branch"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border border-solid border-gray-300 rounded-lg mb-5">
                    <div className="w-full px-4 py-4 flex items-center justify-between">
                      <div className="w-auto flex items-start text-base font-medium text-color-dark">
                        <span className="mr-1.5">Branch 2</span>      
                      </div>
                      <div className="w-auto">
                        <img src="images/social-arrow-icon.svg" alt="arrow"/>
                      </div>
                    </div>
                  </div>
                </div>
                 <div className="w-full my-6">
                    <div className="w-full">
                      <label className="text-color-dark mb-3 block text-lg font-semibold leading-5">
                        Tag
                      </label>
                      <div className="flex w-full flex-wrap">
                        <span className="text-dark-cyan mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5">
                          Online Shop
                        </span>
                        <span className="text-dark-cyan mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5">
                          manufacturer / factory{" "}
                        </span>
                        <span className="text-dark-cyan mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5">
                          Trading Company
                        </span>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="w-full">
                <div className="flex w-full flex-wrap items-center justify-between">
                  <div className="flex w-auto flex-wrap items-start justify-start">
                    <h2 className="text-color-dark mb-0 mr-7 text-2xl font-semibold leading-7">
                      Ratings & Reviews
                    </h2>
                    <div className="flex w-auto flex-col">
                      <div className="flex w-auto items-center justify-start">
                        <h4 className="text-color-dark mb-0 mr-2.5 text-2xl font-medium leading-7">
                          5.0
                        </h4>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                        <span>
                          <img src="images/star.svg" />
                        </span>
                      </div>
                      <div className="mt-1.5 w-auto text-sm font-medium leading-5 text-gray-500">
                        <p>Based on 139 Reviews</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto">
                    <button
                      type="button"
                      className="bg-dark-orange flex rounded-sm px-6 py-4 text-base font-bold leading-5 text-white"
                    >
                      <img src="images/pen-icon.svg" className="mr-2" />
                      <span>Write A Review</span>
                    </button>
                  </div>
                </div>
                <div className="w-full flex items-center justify-end py-6">
                  <ul className="flex items-center justify-end">
                    <li className="text-sm font-medium text-color-dark ml-2">Sort By :</li>
                    <li className="ml-2"><a href="" className="text-sm font-medium text-gray-500 py-3.5 px-10 rounded-full block border border-solid border-gray-300">Newest</a></li>
                    <li className="ml-2"><a href="" className="text-sm font-medium text-gray-500 py-3.5 px-10 rounded-full block border border-solid border-gray-300">Newest</a></li>
                    <li className="ml-2"><a href="" className="text-sm font-medium text-gray-500 py-3.5 px-10 rounded-full block border border-solid border-gray-300">Newest</a></li>
                  </ul>
                </div>
                <div className="w-full flex py-10 mt-5 border-t-2 border-dashed border-gray-300">
                  <div className="w-full flex flex-items justify-between">
                    <div className="w-2/6 px-3.5">
                      <div className="w-full border border-solid border-gray-300 rounded-2xl px-5 py-5">
                        <div className="w-full flex flex-wrap items-start justify-between">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="images/review-1.png" alt="review-icon"/>
                          </div>
                          <div className="w-[calc(100%_-_3rem)] text-sm font-normal leading-5 text-gray-500 pl-3.5">
                            <div className="w-full flex items-start justify-between">
                              <h4 className="text-lg font-semibold text-color-dark">John Doe</h4>
                              <img src="images/review-dot.svg" alt="review-dot-icon"/>
                            </div>
                            <div className="w-full">
                              <h5 className="text-xs font-normal text-gray-500 mb-1">2 reviews</h5>
                              <div className="w-full flex items-start text-xs leading-5 text-gray-500">
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="ml-1">3 Weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<a href="#" className="font-semibold">More.</a> </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/6 px-3.5">
                      <div className="w-full border border-solid border-gray-300 rounded-2xl px-5 py-5">
                        <div className="w-full flex flex-wrap items-start justify-between">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="images/review-1.png" alt="review-icon"/>
                          </div>
                          <div className="w-[calc(100%_-_3rem)] text-sm font-normal leading-5 text-gray-500 pl-3.5">
                            <div className="w-full flex items-start justify-between">
                              <h4 className="text-lg font-semibold text-color-dark">John Doe</h4>
                              <img src="images/review-dot.svg" alt="review-dot-icon"/>
                            </div>
                            <div className="w-full">
                              <h5 className="text-xs font-normal text-gray-500 mb-1">2 reviews</h5>
                              <div className="w-full flex items-start text-xs leading-5 text-gray-500">
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="ml-1">3 Weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<a href="#" className="font-semibold">More.</a> </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/6 px-3.5">
                      <div className="w-full border border-solid border-gray-300 rounded-2xl px-5 py-5">
                        <div className="w-full flex flex-wrap items-start justify-between">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src="images/review-1.png" alt="review-icon"/>
                          </div>
                          <div className="w-[calc(100%_-_3rem)] text-sm font-normal leading-5 text-gray-500 pl-3.5">
                            <div className="w-full flex items-start justify-between">
                              <h4 className="text-lg font-semibold text-color-dark">John Doe</h4>
                              <img src="images/review-dot.svg" alt="review-dot-icon"/>
                            </div>
                            <div className="w-full">
                              <h5 className="text-xs font-normal text-gray-500 mb-1">2 reviews</h5>
                              <div className="w-full flex items-start text-xs leading-5 text-gray-500">
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="mr-1"><img src="images/star.svg" alt="star-icon"/></span>
                                <span className="ml-1">3 Weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-3 text-sm font-normal leading-6 text-gray-500">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<a href="#" className="font-semibold">More.</a> </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center text-center text-base font-bold text-dark-orange">
                  <span className="flex"><img src="images/loader.png" className="mr-1.5"/> Load More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
