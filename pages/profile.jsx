import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const Profile = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Profile</title>
            </Head>
    
            <section className='w-full py-7 relative'>
                <div className='w-full h-full absolute top-0 left-0 -z-10'>
                    <img src='images/before-login-bg.png' className='w-full h-full object-cover object-center'/>
                </div>
                <div className='container m-auto relative z-10'>
                    <div className='flex'>
                        <div className='md:w-9/12 lg:w-7/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 lg:p-12 sm:p-8 p-6'>
                            <div className='w-full text-sm text-normal leading-6 text-light-gray text-center m-auto mb-7'>
                                <h2 className='sm:text-4xl font-semibold sm:leading-10 text-center text-color-dark mb-3 text-3xl leading-8'>Profile</h2>
                                <p>Update Profile</p>
                            </div>
                            <div className='w-full'>
                                <div className='flex flex-wrap'>
                                    <div className='w-full mb-4'>
                                        <div className='w-44 h-44 relative rounded-full border-2 border-dashed border-gray-300 m-auto flex flex-wrap items-center justify-center text-center'>
                                            <div className='text-sm font-medium leading-4 text-color-dark'>
                                                <img src="images/camera.png" className='m-auto mb-3'/>
                                                <span> Upload Image</span>
                                            </div>
                                            <input type="file" id="files" multiple="" name="files[]" className='w-full h-full cursor-pointer opacity-0 m-auto absolute top-0 left-0 right-0 bottom-0'/>
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
                                    <div className='w-full flex flex-wrap items-center justify-start mb-4'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative m-0 w-full'>Gender</label>
                                        <div className='flex items-center w-auto relative mt-2 mr-5'>
                                            <input type="radio" id="Buyer" name="trade" value="Buyer" className='peer w-full h-full absolute opacity-0 z-10 cursor-pointer [&:checked+span]:border-dark-orange'/>
                                            <span className="w-3.5 h-3.5 bg-white rounded-full border-2 border-solid border-gray-400 absolute top-0 left-0 bottom-0 m-auto before:rounded-full before:peer-checked:bg-dark-orange before:content-[''] before:block before:absolute before:w-4/6 before:h-4/6 before:left-0 before:top-0 before:right-0 before:bottom-0 before:m-auto"></span>
                                            <label for="html" className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative pl-5'>Male</label>
                                        </div>
                                        <div className='flex items-center w-auto relative mt-2 mr-5'>
                                            <input type="radio" id="Buyer" name="trade" value="Buyer" className='peer w-full h-full absolute opacity-0 z-10 cursor-pointer [&:checked+span]:border-dark-orange'/>
                                            <span className="w-3.5 h-3.5 bg-white rounded-full border-2 border-solid border-gray-400 absolute top-0 left-0 bottom-0 m-auto before:rounded-full before:peer-checked:bg-dark-orange before:content-[''] before:block before:absolute before:w-4/6 before:h-4/6 before:left-0 before:top-0 before:right-0 before:bottom-0 before:m-auto"></span>
                                            <label for="html" className='text-sm font-medium leading-4 text-left text-color-dark capitalize relative pl-5'>Female</label>
                                        </div>
                                    </div>
                                    <div className='w-full mb-4'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Date Of Birth</label>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <input type='date' placeholder='Enter Your Last Name' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                        </div>
                                    </div>
                                    <div className='w-full mb-4'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Email</label>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <input type='email' placeholder='Enter Your Last Name' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                        </div>
                                    </div>
                                    <div className='w-full mb-4'>
                                        <div className='w-full flex items-center justify-between'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Phone Number</label>
                                            <div className='flex items-center mb-3.5 text-sm font-semibold leading-8 text-dark-orange capitalize cursor-pointer'>
                                                <img src="images/add-icon.svg" className='mr-1'/>
                                                <span> Add Phone Number</span>
                                            </div>
                                        </div>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <input type='number' placeholder='Enter Your Last Name' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                        </div>
                                    </div>
                                    <div className='w-full mb-4'>
                                        <div className='w-full flex items-center justify-between'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark capitalize mb-3.5 block'>Phone Number</label>
                                            <div className='flex items-center mb-3.5 text-sm font-semibold leading-8 text-dark-orange capitalize cursor-pointer'>
                                                <img src="images/add-icon.svg" className='mr-1'/>
                                                <span> Add Link</span>
                                            </div>
                                        </div>
                                        <div className='w-full h-auto p-3.5 mb-3.5 rounded border border-solid border-gray-300'>
                                            <div className='w-full flex flex-wrap items-center justify-between'>
                                                <div className='flex items-center text-sm font-normal leading-4 text-color-dark'>
                                                    <img src="images/social-facebook-icon.svg" className='mr-1.5'/>
                                                    <span>Facebook</span>
                                                </div>
                                                <div className='flex'>
                                                    <ul className='flex items-center justify-end gap-x-3.5'>
                                                        <li>
                                                            <img src="images/social-edit-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-delete-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-arrow-icon.svg"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='w-full '>
                                                <label className='text-xs font-medium leading-4 text-color-dark capitalize mb-3.5 inline-block'>Link</label>
                                                <input type="text" placeholder='www.facebook_Lorem ipsum & 4115.com' className='w-full h-11 border border-solid border-gray-100 px-3.5 py-2.5 text-sm font-normal left-4 text-left text-light-gray rounded-md shadow-sm focus:outline-none focus:shadow-lg'/>
                                            </div>
                                        </div>
                                        <div className='w-full h-auto p-3.5 mb-3.5 rounded border border-solid border-gray-300'>
                                            <div className='w-full flex flex-wrap items-center justify-between'>
                                                <div className='flex items-center text-sm font-normal leading-4 text-color-dark'>
                                                    <img src="images/social-linkedin-icon.svg" className='mr-1.5'/>
                                                    <span>Linkedin</span>
                                                </div>
                                                <div className='flex'>
                                                    <ul className='flex items-center justify-end gap-x-3.5'>
                                                        <li>
                                                            <img src="images/social-edit-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-delete-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-arrow-icon.svg"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='w-full '>
                                                <label className='text-xs font-medium leading-4 text-color-dark capitalize mb-3.5 inline-block'>Link</label>
                                                <input type="text" placeholder='www.facebook_Lorem ipsum & 4115.com' className='w-full h-11 border border-solid border-gray-100 px-3.5 py-2.5 text-sm font-normal left-4 text-left text-light-gray rounded-md shadow-sm focus:outline-none focus:shadow-lg'/>
                                            </div>
                                        </div>
                                        <div className='w-full h-auto p-3.5 mb-3.5 rounded border border-solid border-gray-300'>
                                            <div className='w-full flex flex-wrap items-center justify-between'>
                                                <div className='flex items-center text-sm font-normal leading-4 text-color-dark'>
                                                    <img src="images/social-instagram-icon.svg" className='mr-1.5'/>
                                                    <span>Instagram</span>
                                                </div>
                                                <div className='flex'>
                                                    <ul className='flex items-center justify-end gap-x-3.5'>
                                                        <li>
                                                            <img src="images/social-edit-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-delete-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-arrow-icon.svg"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='w-full '>
                                                <label className='text-xs font-medium leading-4 text-color-dark capitalize mb-3.5 inline-block'>Link</label>
                                                <input type="text" placeholder='www.facebook_Lorem ipsum & 4115.com' className='w-full h-11 border border-solid border-gray-100 px-3.5 py-2.5 text-sm font-normal left-4 text-left text-light-gray rounded-md shadow-sm focus:outline-none focus:shadow-lg'/>
                                            </div>
                                        </div>
                                        <div className='w-full h-auto p-3.5 mb-3.5 rounded border border-solid border-gray-300'>
                                            <div className='w-full flex flex-wrap items-center justify-between'>
                                                <div className='flex items-center text-sm font-normal leading-4 text-color-dark'>
                                                    <img src="images/social-twitter-icon.svg" className='mr-1.5'/>
                                                    <span>Twitter</span>
                                                </div>
                                                <div className='flex'>
                                                    <ul className='flex items-center justify-end gap-x-3.5'>
                                                        <li>
                                                            <img src="images/social-edit-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-delete-icon.svg"/>
                                                        </li>
                                                        <li>
                                                            <img src="images/social-arrow-icon.svg"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='w-full '>
                                                <label className='text-xs font-medium leading-4 text-color-dark capitalize mb-3.5 inline-block'>Link</label>
                                                <input type="text" placeholder='www.facebook_Lorem ipsum & 4115.com' className='w-full h-11 border border-solid border-gray-100 px-3.5 py-2.5 text-sm font-normal left-4 text-left text-light-gray rounded-md shadow-sm focus:outline-none focus:shadow-lg'/>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <button type="button" class="w-full h-14 rounded text-white text-lg font-bold leading-6 text-center bg-dark-orange focus:shadow-none">Update Profile</button>
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


export default withRouter(Profile);