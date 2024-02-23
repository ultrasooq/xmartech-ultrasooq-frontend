import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const FreelancerProfileDetails = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Freelancer Profile Details</title>
            </Head>
            
            <section className='w-full py-7 relative'>
                <div className='w-full h-full absolute top-0 left-0 -z-10'>
                    <img src='images/before-login-bg.png' className='w-full h-full object-cover object-center'/>
                </div>
                <div className='container m-auto px-3 relative z-10'>
                    <div className='flex flex-wrap'>
                        <div className='w-full mb-7'>
                            <h2 className='text-4xl font-semibold leading-10 text-color-dark'>Freelancer Profile</h2>
                        </div>
                        <div className='flex flex-wrap w-full bg-white md:p-9 p-4 rounded-3xl border border-solid border-gray-300 shadow-sm'>
                            <div className='w-40 h-40 rounded-full relative m-auto'>
                                <div className='w-full h-full rounded-full overflow-hidden border-4 border-solid border-gray-300'>
                                    <img src="images/profile.png" className='w-full h-full object-cover'/>
                                </div>
                                <div className='w-11 h-11 rounded-full bg-gray-300 absolute right-0 bottom-2 z-10'>
                                    <div className='w-full h-full flex flex-wrap items-center justify-center cursor-pointer'>
                                        <img src="images/camera-icon.png"/>
                                    </div>
                                    <input type="file" id="profile_impage_upload_input" accept="image/*" name="file" className='w-full h-full absolute top-0 left-0 z-10 cursor-pointer opacity-0'/>
                                </div>
                            </div>
                            <div className='md:w-[calc(100%_-_10rem)] md:pl-7 w-full p-3'>
                                <div className='w-full flex flex-wrap items-center justify-between'>
                                    <h2 className='text-3xl font-semibold left-8 text-color-dark'>John Rosensky</h2>
                                    <div className='w-auto'>
                                        <button type="button" className='flex items-center py-2 px-3 rounded-md bg-dark-orange text-white text-sm font-medium leading-6 border-0 capitalize'>
                                            <img src="images/edit-icon.svg" className='mr-1'/> edit</button>
                                    </div>
                                </div>
                                <div className='w-full h-auto mt-3'>
                                    <ul className='flex flex-wrap items-center justify-start'>
                                        <li className='mr-3.5 my-1.5 text-base font-normal leading-5 text-color-dark flex items-center justify-starts'> 
                                            <img src="images/profile-mail-icon.svg" className='mr-1.5'/> 
                                            <a href="mailto:john.rosensky@gmail.com">john.rosensky@gmail.com</a>
                                        </li>
                                        <li className='mr-3.5 my-1.5 text-base font-normal leading-5 text-color-dark flex items-center justify-starts'> 
                                            <img src="images/profile-call-icon.svg" className='mr-1.5'/> 
                                            <a href="tel:1 000 0000 0000">+1 000 0000 0000</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='w-full text-sm text-normal font-normal leading-4 mt-5 text-gray-500'>
                                    <p>Business Type</p>
                                    <span className='bg-gray-300 py-2.5 p-4 inline-block text-dark-cyan rounded text-base font-medium leading-5 mt-4'>Service Provider</span>
                                </div>
                                <div className='w-full flex flex-wrap items-center justify-between mt-5'>
                                    <div className='text-sm font-normal leading-4 text-gray-500 my-2'>
                                        <p>Freelancer ID: <span className='text-base font-medium leading-4 text-gray-600'>VCP0001458</span></p>
                                    </div>
                                    <div className='flex flex-wrap items-center justify-between my-2'>
                                        <span className='text-sm font-medium leading-6 mr-2.5 text-light-green'>Online.</span>
                                        <select className='h-auto py-3 px-4 rounded text-sm font-normal leading-6 text-color-dark bg-white border border-solid border-gray-300'>
                                            <option>Offline 9:30 pm</option>
                                            <option>Online 10:30 am</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mt-12'>
                            <div className='w-full'>
                                <ul className='flex flex-wrap items-center justify-start'>
                                    <li className='md:mr-6 mr-4 sm:w-auto w-full'>
                                        <a href="#" className='sm:w-auto w-full sm:py-3.5 sm:px-9 py-3 px-6 inline-block text-base font-semibold leading-6 text-white bg-dark-orange sm:rounded-t-lg text-center'>Profile Info</a>
                                    </li>
                                    <li className='md:mr-6 mr-4 sm:w-auto w-full'>
                                        <a href="#" className='sm:w-auto w-full sm:py-3.5 sm:px-9 py-3 px-6 inline-block text-base font-semibold leading-6 text-zinc-500 bg-gray-300 sm:rounded-t-lg text-center'>Ratings & Reviews</a>
                                    </li>
                                    <li className='md:mr-6 mr-4 sm:w-auto w-full'>
                                        <a href="#" className='sm:w-auto w-full sm:py-3.5 sm:px-9 py-3 px-6 inline-block text-base font-semibold leading-6 text-zinc-500 bg-gray-300 sm:rounded-t-lg text-center'>Services</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-full md:pt-12 md:pb-7 md:px-9 sm:pt-8 sm:pb-4 sm:px-6 p-4 bg-white shadow-sm border border-solid border-gray-300'>
                                <div className='w-full py-4 border-b-2 border-dashed border-gray-100'>
                                    <div className='w-full flex flex-wrap items-center justify-between pb-5'>
                                        <h2 className='text-2xl font-semibold left-8 text-color-dark'>John Rosensky</h2>
                                        <div className='w-auto'>
                                            <button type="button" className='flex items-center py-2 px-3 rounded-md bg-dark-orange text-white text-sm font-medium leading-6 border-0 capitalize'>
                                            <img src="images/edit-icon.svg" className='mr-1'/> edit</button>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div className='w-full flex flex-wrap py-3.5'>
                                                <div className='w-2/12 sm:mr-0 mr-1 flex items-center justify-start'>
                                                    <span className='text-sm font-normal leading-4 text-gray-500 capitalize'>email:</span>
                                                </div>
                                                <div className='w-10/12sm:mr-0 mr-1  flex items-center justify-start'>
                                                    <p className='text-base font-medium leading-4 text-color-dark'>john.rosensky@gmail.com</p>
                                                </div>
                                            </div>
                                            <div className='w-full flex flex-wrap py-3.5'>
                                                <div className='w-2/12 sm:mr-0 mr-1 flex items-center justify-start'>
                                                    <span className='text-sm font-normal leading-4 text-gray-500 capitalize'>Phone:</span>
                                                </div>
                                                <div className='w-10/12sm:mr-0 mr-1  flex items-center justify-start'>
                                                    <p className='text-base font-medium leading-4 text-color-dark'>+1 000 0000 0456</p>
                                                </div>
                                            </div>
                                            <div className='w-full flex flex-wrap py-3.5'>
                                                <div className='w-2/12 sm:mr-0 mr-1 flex items-center justify-start'>
                                                    <span className='text-sm font-normal leading-4 text-gray-500 capitalize'>Social Links:</span>
                                                </div>
                                                <div className='w-10/12sm:mr-0 mr-1  flex items-center justify-start'>
                                                    <p className='text-base font-medium leading-4 text-color-dark'>Facebook, LInkedin, Instagram</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full py-4'>
                                    <div className='w-full flex flex-wrap items-center justify-between pb-5'>
                                        <h2 className='text-2xl font-semibold left-8 text-color-dark'>Freelancer Information</h2>
                                        <div className='w-auto'>
                                            <button type="button" className='flex items-center py-2 px-3 rounded-md bg-dark-orange text-white text-sm font-medium leading-6 border-0 capitalize'>
                                            <img src="images/edit-icon.svg" className='mr-1'/> edit</button>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div className='w-full flex flex-wrap py-3.5 text-base font-medium text-color-dark pb-5 border-b-2 border-dashed border-gray-100'>
                                                <label className='text-lg font-semibold leading-5 text-color-dark mb-3'>About Me</label>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. <a href="#" className='font-semibold text-dark-orange'>More</a></p>
                                            </div>
                                        </div>
                                        <div className='w-full mt-6'>
                                            <label className='text-lg font-semibold leading-5 text-color-dark mb-3.5 block'>Address</label>
                                            <div className='w-full flex flex-wrap'>
                                                <div className='md:w-7/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-3/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Address:</span>
                                                        </div>
                                                        <div className='md:w-9/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <p>9890 S. Maryland Pkwy Cumbria, Northumberland</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:w-5/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-6/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Contry:</span>
                                                        </div>
                                                        <div className='md:w-6/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <p>USA</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:w-7/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-3/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>City:</span>
                                                        </div>
                                                        <div className='md:w-9/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <p>Los Angeles, United States</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:w-5/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-6/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Branch Contact Number:</span>
                                                        </div>
                                                        <div className='md:w-6/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <p>+1 000 0000 0456</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:w-7/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-3/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Province:</span>
                                                        </div>
                                                        <div className='md:w-9/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <p>Lorem Ipsum</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:w-5/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-6/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Branch Contact Name:</span>
                                                        </div>
                                                        <div className='md:w-6/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <p>John Doe</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full mt-6'>
                                            <label className='text-lg font-semibold leading-5 text-color-dark mb-3 block'>Working Hours</label>
                                            <div className='w-full flex flex-wrap'>
                                                <div className='lg:w-4/12 md:w-6/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-6/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Start Time:</span>
                                                        </div>
                                                        <div className='md:w-6/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <span>9:00 am</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='lg:w-4/12 md:w-6/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-6/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>End Time:</span>
                                                        </div>
                                                        <div className='md:w-6/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <span>12:00 pm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='lg:w-4/12 md:w-6/12 w-full'>
                                                    <div className='w-full md:py-3.5 py-2.5 flex'>
                                                        <div className='md:w-6/12 w-3/12 text-sm font-normal leading-4 text-gray-500 capitalize'>
                                                            <span>Working Days:</span>
                                                        </div>
                                                        <div className='md:w-6/12 w-9/12 text-base font-medium leading-4 text-color-dark'>
                                                            <span>Monday - Friday</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full mt-6'>
                                            <label className='text-lg font-semibold leading-5 text-color-dark mb-3 block'>Tag</label>
                                            <div className='w-full flex flex-wrap'>
                                                <span className='bg-gray-300 py-2.5 p-4 inline-block text-dark-cyan rounded text-base font-medium leading-5 mt-4 mr-4'>Online Shop</span>
                                                <span className='bg-gray-300 py-2.5 p-4 inline-block text-dark-cyan rounded text-base font-medium leading-5 mt-4 mr-4'>manufacturer / factory </span>
                                                <span className='bg-gray-300 py-2.5 p-4 inline-block text-dark-cyan rounded text-base font-medium leading-5 mt-4 mr-4'>Trading Company</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </SiteLayout>
    )

}


export default withRouter(FreelancerProfileDetails);