import React from "react";

export default function FreelancerProfileDetailsPage() {
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
              Freelancer Profile
            </h2>
          </div>
          <div className="flex w-full flex-wrap rounded-3xl border border-solid border-gray-300 bg-white p-4 shadow-sm md:p-9">
            <div className="relative m-auto h-40 w-40 rounded-full">
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-solid border-gray-300">
                <img
                  src="images/profile.png"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-0 z-10 h-11 w-11 rounded-full bg-gray-300">
                <div className="flex h-full w-full cursor-pointer flex-wrap items-center justify-center">
                  <img src="images/camera-icon.png" />
                </div>
                <input
                  type="file"
                  id="profile_impage_upload_input"
                  accept="image/*"
                  name="file"
                  className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
            <div className="w-full p-3 md:w-[calc(100%_-_10rem)] md:pl-7">
              <div className="flex w-full flex-wrap items-center justify-between">
                <h2 className="text-color-dark left-8 text-3xl font-semibold">
                  John Rosensky
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
                <ul className="flex flex-wrap items-center justify-start">
                  <li className="text-color-dark justify-starts my-1.5 mr-3.5 flex items-center text-base font-normal leading-5">
                    <img
                      src="images/profile-mail-icon.svg"
                      className="mr-1.5"
                    />
                    <a href="mailto:john.rosensky@gmail.com">
                      john.rosensky@gmail.com
                    </a>
                  </li>
                  <li className="text-color-dark justify-starts my-1.5 mr-3.5 flex items-center text-base font-normal leading-5">
                    <img
                      src="images/profile-call-icon.svg"
                      className="mr-1.5"
                    />
                    <a href="tel:1 000 0000 0000">+1 000 0000 0000</a>
                  </li>
                </ul>
              </div>
              <div className="text-normal mt-5 w-full text-sm font-normal leading-4 text-gray-500">
                <p>Business Type</p>
                <span className="text-dark-cyan mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5">
                  Service Provider
                </span>
              </div>
              <div className="mt-5 flex w-full flex-wrap items-center justify-between">
                <div className="my-2 text-sm font-normal leading-4 text-gray-500">
                  <p>
                    Freelancer ID:{" "}
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
            <div className="w-full rounded-b-3xl border border-solid border-gray-300 bg-white p-4 shadow-sm sm:px-6 sm:pb-4 sm:pt-8 md:px-9 md:pb-7 md:pt-12">
              <div className="w-full">
                <div className="w-full border-b-2 border-dashed border-gray-100 py-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                    <h2 className="text-color-dark left-8 text-2xl font-semibold">
                      John Rosensky
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
                      <div className="flex w-full flex-wrap py-3.5">
                        <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                          <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                            email:
                          </span>
                        </div>
                        <div className="w-10/12sm:mr-0 mr-1  flex items-center justify-start">
                          <p className="text-color-dark text-base font-medium leading-4">
                            john.rosensky@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap py-3.5">
                        <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                          <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                            Phone:
                          </span>
                        </div>
                        <div className="w-10/12sm:mr-0 mr-1  flex items-center justify-start">
                          <p className="text-color-dark text-base font-medium leading-4">
                            +1 000 0000 0456
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap py-3.5">
                        <div className="mr-1 flex w-2/12 items-center justify-start sm:mr-0">
                          <span className="text-sm font-normal capitalize leading-4 text-gray-500">
                            Social Links:
                          </span>
                        </div>
                        <div className="w-10/12sm:mr-0 mr-1  flex items-center justify-start">
                          <p className="text-color-dark text-base font-medium leading-4">
                            Facebook, LInkedin, Instagram
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full py-4">
                  <div className="flex w-full flex-wrap items-center justify-between pb-5">
                    <h2 className="text-color-dark left-8 text-2xl font-semibold">
                      Freelancer Information
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
                      <div className="text-color-dark flex w-full flex-wrap border-b-2 border-dashed border-gray-100 py-3.5 pb-5 text-base font-medium">
                        <label className="text-color-dark mb-3 text-lg font-semibold leading-5">
                          About Me
                        </label>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation.{" "}
                          <a
                            href="#"
                            className="text-dark-orange font-semibold"
                          >
                            More
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 w-full">
                      <label className="text-color-dark mb-3.5 block text-lg font-semibold leading-5">
                        Address
                      </label>
                      <div className="flex w-full flex-wrap">
                        <div className="w-full md:w-7/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                              <span>Address:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-9/12">
                              <p>
                                9890 S. Maryland Pkwy Cumbria, Northumberland
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-5/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Contry:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-6/12">
                              <p>USA</p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                              <span>City:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-9/12">
                              <p>Los Angeles, United States</p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-5/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Branch Contact Number:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-6/12">
                              <p>+1 000 0000 0456</p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-3/12">
                              <span>Province:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-9/12">
                              <p>Lorem Ipsum</p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-5/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Branch Contact Name:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-6/12">
                              <p>John Doe</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 w-full">
                      <label className="text-color-dark mb-3 block text-lg font-semibold leading-5">
                        Working Hours
                      </label>
                      <div className="flex w-full flex-wrap">
                        <div className="w-full md:w-6/12 lg:w-4/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Start Time:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-6/12">
                              <span>9:00 am</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>End Time:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-6/12">
                              <span>12:00 pm</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12">
                          <div className="flex w-full py-2.5 md:py-3.5">
                            <div className="w-3/12 text-sm font-normal capitalize leading-4 text-gray-500 md:w-6/12">
                              <span>Working Days:</span>
                            </div>
                            <div className="text-color-dark w-9/12 text-base font-medium leading-4 md:w-6/12">
                              <span>Monday - Friday</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 w-full">
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
              </div>

              <div className="w-full">
                <div className="flex w-full flex-wrap items-center justify-between">
                  <div className="flex w-auto flex-wrap items-start justify-start">
                    <h2 className="text-color-dark mb-0 mr-7 text-2xl font-semibold leading-7">
                      Ratings &amp; Reviews
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
