import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const CompanyProfile = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Company Profile</title>
            </Head>
            
            <section className='w-full py-7 relative'>
                <div className='w-full h-full absolute top-0 left-0 -z-10'>
                    <img src='images/before-login-bg.png' className='w-full h-full object-cover object-center'/>
                </div>
                <div className='container m-auto relative z-10'>
                    <div className='flex'>
                        <div className='md:w-10/12 lg:w-10/12 w-11/12 shadow-sm border border-solid border-gray-300 rounded-lg bg-white m-auto mb-12 lg:p-12 sm:p-8 p-6'>
                            <div className='w-full text-sm text-normal leading-6 text-light-gray text-center m-auto mb-7'>
                                <h2 className='sm:text-4xl font-semibold sm:leading-10 text-center text-color-dark mb-3 text-3xl leading-8'>Company Profile</h2>
                            </div>
                            <div className='w-full flex flex-wrap'>
                                <div className='w-full mb-4'>
                                    <div className='w-full mt-2.5 border-b-2 border-dashed border-gray-300'>
                                        <label className='text-lg font-medium leading-5 text-left text-color-dark mb-3.5 block capitalize'>Company Information</label>
                                    </div>
                                </div>
                                <div className='w-full mb-3.5'>
                                    <div className='flex flex-wrap'>
                                        <div className='md:w-6/12 w-full mb-3.5 md:pr-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Upload Company Logo</label>
                                            <div className='w-full h-64 relative border-2 border-dashed border-gray-300 m-auto flex flex-wrap items-center justify-center text-center'>
                                                <div className='text-sm font-medium leading-4 text-color-dark'>
                                                    <img src="images/upload.png" className='m-auto mb-3'/>
                                                    <span>  Drop your Company Logo here, or </span><span className='text-blue-500'>browse</span>
                                                    <p className='text-xs text-normal leading-4 text-gray-300 mt-3'>(.jpg or .png only. Up to 16mb)</p>
                                                </div>
                                                <input type="file" id="files" multiple="" name="files[]" className='w-full h-full cursor-pointer opacity-0 m-auto absolute top-0 left-0 right-0 bottom-0'/>
                                            </div>
                                        </div>
                                        <div className='md:w-6/12 w-full mb-3.5 md:pl-3.5'>
                                            <div className='w-full mb-4'>
                                                <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Company Name</label>
                                                <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                    <input type='text' placeholder='Company Name' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                                </div>
                                            </div>
                                            <div className='w-full mb-4'>
                                                <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Business Type</label>
                                                <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                    <select className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'>
                                                        <option>Select Business Type</option>
                                                        <option>Select Business Type</option>
                                                        <option>Select Business Type</option>
                                                        <option>Select Business Type</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='w-full mb-4'>
                                                <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Annual Purchasing Volume</label>
                                                <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                    <input type='text' placeholder='Annual Purchasing Volume' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mb-3.5'>
                                    <div className='w-full border-y border-solid border-gray-200 py-2.5 mb-4'>
                                        <label className='text-base font-medium leading-5 text-left text-color-dark m-0 block'>Registration Address</label>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='md:w-6/12 w-full mb-4 md:pr-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Address</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <input type='text' placeholder='Address' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                            </div>
                                        </div>
                                        <div className='md:w-6/12 w-full mb-4 md:pl-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>City</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <input type='text' placeholder='City' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                            </div>
                                        </div>
                                        <div className='md:w-6/12 w-full mb-4 md:pr-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Province</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <input type='text' placeholder='Province' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                            </div>
                                        </div>
                                        <div className='md:w-6/12 w-full mb-4 md:pl-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Country</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <select className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'>
                                                <option>Country</option>
                                                <option>USA</option>
                                                <option>UK</option>
                                                <option>India</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mb-3.5'>
                                    <div className='w-full border-y border-solid border-gray-200 py-2.5 mb-4'>
                                        <label className='text-base font-medium leading-5 text-left text-color-dark m-0 block'>More Information</label>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='md:w-6/12 w-full mb-4 md:pr-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Year Of Establishment</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <select className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'>
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
                                        <div className='md:w-6/12 w-full mb-4 md:pl-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>City</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <select className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'>
                                                    <option>1990</option>
                                                    <option>1991</option>
                                                    <option>1992</option>
                                                    <option>1993</option>
                                                    <option>1994</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='w-full mb-4'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>About Us</label>
                                            <div className='w-full h-32 rounded border border-solid border-gray-300 relative'>
                                                <textarea placeholder='Write Here....' className='w-full h-full resize-none rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mb-3.5'>
                                    <div className='w-full border-y border-solid border-gray-200 py-2.5 mb-4 flex items-center justify-between'>
                                        <label className='text-base font-medium leading-5 text-left text-color-dark m-0 block'>Branch</label>
                                        <div className='flex items-center text-sm font-semibold leading-8 text-dark-orange capitalize cursor-pointer'>
                                            <img src="images/add-icon.svg" className='mr-1'/>
                                            <span> Add new branch</span>
                                        </div>
                                    </div>
                                    <div className='w-full mb-3.5 inline-block'>
                                        <label className='text-sm font-medium leading-5 text-left text-color-dark mb-3 block'>Business Type</label>
                                        <div className='w-full p-3 mb-3.5 rounded relative border border-solid border-gray-200'>
                                            <div className='w-full flex items-center justify-between'>
                                                <div className='w-auto'>
                                                    <span className='bg-zinc-100 py-3 px-3.5 text-sm font-normal leading-4 text-dark-cyan rounded my-1 mr-2 inline-flex items-center justify-between'>
                                                        online shope
                                                        <img src="images/close.svg" className='ml-4'/>
                                                    </span>
                                                    <span className='bg-zinc-100 py-3 px-3.5 text-sm font-normal leading-4 text-dark-cyan rounded my-1 mr-2 inline-flex items-center justify-between'>
                                                        manufacturer / factory
                                                        <img src="images/close.svg" className='ml-4'/>
                                                    </span>
                                                    <span className='bg-zinc-100 py-3 px-3.5 text-sm font-normal leading-4 text-dark-cyan rounded my-1 mr-2 inline-flex items-center justify-between'>
                                                        trading company
                                                        <img src="images/close.svg" className='ml-4'/>
                                                    </span>
                                                </div>
                                                <div className='w-auto'>
                                                    <ul>
                                                        <li>
                                                            <img src="images/social-arrow-icon.svg"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full p-3 mb-3.5 rounded relative border border-solid border-gray-200'>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>online shop</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>manufacturer / factory</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>trading company</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>distributor / wholesaler</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>retailer</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>individual</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>other</span>
                                                </label>
                                            </div>
                                            <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                                <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                    <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                    <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                    <span className='tex'>service provider</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full mb-3.5'>
                                        <label className='text-sm font-medium leading-5 text-left text-color-dark mb-3 block'>Upload Branch Front Picture</label>
                                        <div className='w-full h-64 relative border-2 border-dashed border-gray-300 m-auto flex flex-wrap items-center justify-center text-center'>
                                            <div className='text-sm font-medium leading-4 text-color-dark'>
                                                <img src="images/upload.png" className='m-auto mb-3'/>
                                                <span>  Drop your Company Logo here, or </span><span className='text-blue-500'>browse</span>
                                                <p className='text-xs text-normal leading-4 text-gray-300 mt-3'>(.jpg or .png only. Up to 16mb)</p>
                                            </div>
                                            <input type="file" id="files" multiple="" name="files[]" className='w-full h-full cursor-pointer opacity-0 m-auto absolute top-0 left-0 right-0 bottom-0'/>
                                        </div>
                                    </div>
                                    <div className='w-full mb-3.5'>
                                        <label className='text-sm font-medium leading-5 text-left text-color-dark mb-3 block'>Proof Of Address</label>
                                        <div className='w-full h-64 relative border-2 border-dashed border-gray-300 m-auto flex flex-wrap items-center justify-center text-center'>
                                            <div className='text-sm font-medium leading-4 text-color-dark'>
                                                <img src="images/upload.png" className='m-auto mb-3'/>
                                                <span>  Drop your Company Logo here, or </span><span className='text-blue-500'>browse</span>
                                                <p className='text-xs text-normal leading-4 text-gray-300 mt-3'>(.jpg or .png only. Up to 16mb)</p>
                                            </div>
                                            <input type="file" id="files" multiple="" name="files[]" className='w-full h-full cursor-pointer opacity-0 m-auto absolute top-0 left-0 right-0 bottom-0'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-wrap'>
                                <div className='w-full mb-4'>
                                    <div className='w-full mt-2.5 border-b-2 border-dashed border-gray-300'>
                                        <label className='text-lg font-medium leading-5 text-left text-color-dark mb-3.5 block capitalize'>Branch Location</label>
                                    </div>
                                </div>
                                <div className='flex flex-wrap'>
                                    <div className='md:w-6/12 w-full mb-4 md:pr-3.5'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Address</label>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <input type='text' placeholder='Address' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                        </div>
                                    </div>
                                    <div className='md:w-6/12 w-full mb-4 md:pl-3.5'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>City</label>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <input type='text' placeholder='City' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                        </div>
                                    </div>
                                    <div className='md:w-6/12 w-full mb-4 md:pr-3.5'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Province</label>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                            <input type='text' placeholder='Province' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                        </div>
                                    </div>
                                    <div className='md:w-6/12 w-full mb-4 md:pl-3.5'>
                                        <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Country</label>
                                        <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                        <select className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'>
                                            <option>Country</option>
                                            <option>USA</option>
                                            <option>UK</option>
                                            <option>India</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-wrap'>
                                <div className='w-full mb-4'>
                                    <div className='w-full mt-2.5 border-b-2 border-dashed border-gray-300'>
                                        <label className='text-lg font-medium leading-5 text-left text-color-dark mb-3.5 block capitalize'>Branch Working Hours</label>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='flex flex-wrap'>
                                        <div className='md:w-6/12 w-full mb-4 md:pr-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>Start Time</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <input type='date' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                            </div>
                                        </div>
                                        <div className='md:w-6/12 w-full mb-4 md:pl-3.5'>
                                            <label className='text-sm font-medium leading-4 text-left text-color-dark mb-3.5 block capitalize'>End Time</label>
                                            <div className='w-full h-14 rounded border border-solid border-gray-300 relative'>
                                                <input type='date' className='w-full h-full rounded py-2.5 px-4 text-sm font-normal leading-4 text-left border-0 text-light-gray placeholder:text-sm placeholder:font-normal placeholder:leading-4 placeholder:text-light-gray focus:outline-none'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mb-3.5 pb-4 border-b-2 border-dashed border-gray-300'>
                                    <div className='flex flex-wrap'>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Sun
                                            </label>
                                        </div>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Mon
                                            </label>
                                        </div>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Tue
                                            </label>
                                        </div>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Wed
                                            </label>
                                        </div>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Thu
                                            </label>
                                        </div>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Fri
                                            </label>
                                        </div>
                                        <div className='w-auto px-2 lg:px-0 flex items-center justify-between p-0 mr-4'>
                                            <label className='w-auto text-sm font-normal text-color-dark leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                Sat
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mt-3 mb-3.5 inline-block'>
                                    <label className='text-sm font-medium leading-5 text-left text-color-dark mb-3 block'>Tag</label>
                                    <div className='w-full p-3 mb-3.5 rounded relative border border-solid border-gray-200'>
                                        <div className='w-full flex items-center justify-between'>
                                            <div className='w-auto'>
                                                <span className='bg-zinc-100 py-3 px-3.5 text-sm font-normal leading-4 text-dark-cyan rounded my-1 mr-2 inline-flex items-center justify-between'>
                                                    online shope
                                                    <img src="images/close.svg" className='ml-4'/>
                                                </span>
                                                <span className='bg-zinc-100 py-3 px-3.5 text-sm font-normal leading-4 text-dark-cyan rounded my-1 mr-2 inline-flex items-center justify-between'>
                                                    manufacturer / factory
                                                    <img src="images/close.svg" className='ml-4'/>
                                                </span>
                                                <span className='bg-zinc-100 py-3 px-3.5 text-sm font-normal leading-4 text-dark-cyan rounded my-1 mr-2 inline-flex items-center justify-between'>
                                                    trading company
                                                    <img src="images/close.svg" className='ml-4'/>
                                                </span>
                                            </div>
                                            <div className='w-auto'>
                                                <ul>
                                                    <li>
                                                        <img src="images/social-arrow-icon.svg"/>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full p-3 mb-3.5 rounded relative border border-solid border-gray-200'>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>online shop</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>manufacturer / factory</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>trading company</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>distributor / wholesaler</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>retailer</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>individual</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>other</span>
                                            </label>
                                        </div>
                                        <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                            <label className='w-auto text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                                <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange [&:checked~span]:text-color-dark '/>
                                                <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                                <span className='tex'>service provider</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <button type="button" class="w-full h-14 rounded text-white text-lg font-bold leading-6 text-center bg-dark-orange focus:shadow-none">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </SiteLayout>
    )

}


export default withRouter(CompanyProfile);