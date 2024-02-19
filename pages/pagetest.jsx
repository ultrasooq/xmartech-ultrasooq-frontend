import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const Pagetest = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Search Trending</title>
            </Head>
        
            <section className='w-full py-7 relative'>
                <div className='container m-auto px-3'>
                    <div className='w-full sm:px-10 sm:pt-16 sm:pb-10 px-5 pt-8 pb-4 relative text-sm font-normal text-light-gray capitalize'>
                        <div className='w-full h-full absolute top-0 left-0'>
                            <img src='images/trending-banner-bg.png' className='w-full h-full'/>
                        </div>
                        <div className='flex flex-wrap relative z-10'>
                            <div className='w-full lg:w-4/12 md:w-5/12 sm:w-5/12'>
                                <div className='w-auto'>
                                    <ul className='flex items-center'>
                                        <li className='text-sm leading-7 text-light-gray mr-2.5 flex'>
                                            <a href='#' className='text-dark-orange'>Home</a>
                                        </li>
                                        <li className='mr-2.5'><img src="images/symbol.svg"/></li>
                                        <li className='text-sm leading-7 text-light-gray mr-2.5 flex'>Shop</li>
                                    </ul>
                                </div>
                                <h3 className='w-auto text-color-dark text-xl md:text-2xl lg:text-4xl font-normal capitalize'>Sed Do Eiusmod Tempor Incididunt</h3>
                                <p className='text-sm leading-7 text-light-gray capitalize'>Only 2 Days:</p>
                                <h4 className='text-lg nd:text-xl font-medium text-olive-green'>21/10 & 22/10</h4>
                                <a href="#" className='text-sm font-bold py-3 px-6 bg-dark-orange text-white rounded-sm inline-block mt-3'> Shop Now </a>
                            </div>
                            <div className='w-full lg:w-8/12 flex items-end pb-5 md:w-7/12 sm:w-7/12'>
                                <img src="images/trending-banner.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-7 relative'>
                <div className='container m-auto px-3'>
                    <div className='flex'>
                        <ul className='w-full flex flex-wrap items-center justify-between'>
                            <li className='w-1/3 sm:w-auto px-2'>
                                <img src="images/cl-1.png" className='grayscale sm:w-20 sm:h-auto md:w-24 lg:w-auto'/>
                            </li>
                            <li className='w-1/3 sm:w-auto px-2'>
                                <img src="images/cl-2.png" className='grayscale sm:w-20 sm:h-auto md:w-24 lg:w-auto'/>
                            </li>
                            <li className='w-1/3 sm:w-auto px-2'>
                                <img src="images/cl-3.png" className='grayscale sm:w-20 sm:h-auto md:w-24 lg:w-auto'/>
                            </li>
                            <li className='w-1/3 sm:w-auto px-2'>
                                <img src="images/cl-4.png" className='grayscale sm:w-20 sm:h-auto md:w-24 lg:w-auto'/>
                            </li>
                            <li className='w-1/3 sm:w-auto px-2'>
                                <img src="images/cl-5.png" className='grayscale sm:w-20 sm:h-auto md:w-24 lg:w-auto'/>
                            </li>
                            <li className='w-1/3 sm:w-auto px-2'>
                                <img src="images/cl-6.png" className='grayscale sm:w-20 sm:h-auto md:w-24 lg:w-auto'/>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className='w-full py-7 relative'>
                <div className='container m-auto px-3'>
                    <div className='flex flex-wrap'>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-1.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Clothing & Apparel</h6>
                                        <p>Accessories Bags Kid's Fashion Mens</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-2.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Garden & Kitchen</h6>
                                        <p>Cookware Decoration Furniture Garden Tools</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-3.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Consumer Electrics</h6>
                                        <p>Air Conditioners Audios & Theaters Car Electronics Office Electronics</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-4.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Health & Beauty</h6>
                                        <p>Equipments Hair Care Perfumer Skin Care</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-5.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Computers & Technologies</h6>
                                        <p>Desktop PC Laptop Smartphones</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-6.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Jewelry & Watches</h6>
                                        <p>Gemstones Jewelry Men's Watches Women's Watches</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-7.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Phone & Accessories</h6>
                                        <p>Iphone 8 Iphone X Samsung Note 8</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-6/12 w-6/12 px-3 flex mb-7'>
                            <div className='w-full flex'>
                                <a href='#' className='w-full border border-solid border-gray-300 p-2.5 flex flex-wrap'>
                                    <div className='sm:w-24 w-full h-auto text-center flex justify-center'>
                                        <img src="images/ts-8.png"/>
                                    </div>
                                    <div className='sm:w-[calc(100%_-_6rem)] h-auto w-full text-center sm:text-left text-xs text-normal pl-2.5'>
                                        <h6 className='text-sm font-normal text-color-dark mb-2'>Sport & Outdoor</h6>
                                        <p>Freezer Burn Frigde Cooler Wine Cabinets</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-7 relative'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='lg:w-3/12 w-full px-3.5'>
                            <div className='w-full border border-solid border-gray-300 mb-7'>
                                <div className='w-full flex items-center justify-between py-2.5 px-3.5'>
                                    <h4 className='text-lg font-normal m-0'>By Brand</h4>
                                    <img src="images/symbol.svg" className='rotate-90'/>
                                </div>
                                <div className='w-full py-2.5 px-3.5 border-b border-solid border-gray-300 flex'>
                                    <button type='button' className='w-6 border-0 bg-transparent'><img src="images/search.png"/></button>
                                    <input type='search' placeholder="Search Brand" className='w-[calc(100%_-_1.5rem)] border-0 pl-2.5 text-sm focus:outline-none'/>
                                </div>
                                <div className='w-full p-3.5 flex flex-wrap'>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            SAMSUNG
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            vivo
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            oppo
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            apple
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            realme
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            poco
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            google
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            redmi
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            mi
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            lava
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            nokia
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            KARBONN
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            itel
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            OnePlus
                                        </label>
                                    </div>
                                    <div className='lg:w-full w-auto px-2 lg:px-0 flex items-center justify-between p-0'>
                                        <label className='w-full text-sm font-normal text-light-gray leading-8 flex items-center justify-start'>
                                            <input type="checkbox" name="" className='absolute opacity-0 w-0 h-0 cursor-pointer [&:checked+span]:bg-dark-orange [&:checked+span]:border-dark-orange'/>
                                            <span className="w-5 h-5 relative border-2 border-solid border-gray-400 bg-transparent rounded-sm inline-block mr-2.5 overflow-hidden before:content-[''] before:block before:absolute before:w-1.5 before:h-3 before:border-r-2 before:border-b-2 before:border-solid before:border-white before:rotate-45 before:left-0 before:-top-1 before:right-0 before:bottom-0 before:m-auto"></span>
                                            Tecno
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full border border-solid border-gray-300 mb-7'>
                                <div className='w-full flex items-center justify-between py-2.5 px-3.5'>
                                    <h4 className='text-lg font-normal m-0'>Price</h4>
                                    <img src="images/symbol.svg" className='rotate-90'/>
                                </div>
                                <div className='w-full flex items-center justify-between py-2.5 px-3.5'>
                                    <select className='w-20 h-auto py-2 px-1.5 border border-solid border-gray-300 text-sm font-normal leading-8 text-light-gray focus:outline-none'>
                                        <option>$0</option>
                                        <option>$100</option>
                                        <option>$200</option>
                                        <option>$400</option>
                                        <option>$500</option>
                                    </select>
                                    <select className='w-20 h-auto py-2 px-1.5 border border-solid border-gray-300 text-sm font-normal leading-8 text-light-gray focus:outline-none'>
                                        <option>$500</option>
                                        <option>$2000</option>
                                        <option>$5000</option>
                                        <option>$10000</option>
                                        <option>$50000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-9/12 w-full px-3.5'>
                            <div className='flex flex-wrap'>
                                <div className='w-full flex flex-wrap items-center justify-between py-3.5 px-3.5 border-b border-solid border-gray-300 bg-neutral-100'>
                                    <div className='flex flex-wrap items-center justify-start'>
                                        <h4 className='text-color-dark md:text-2xl text-xl font-normal capitalize md:mr-6 mr-3 whitespace-nowrap'>85 Products Found</h4>
                                    </div>
                                    <div className='flex flex-wrap items-center justify-start sm:justify-end'>
                                        <div className='w-auto'>
                                            <select className='bg-white text-sm font-normal py-2.5 px-3.5 text-light-gray border border-solid border-gray-300'>
                                                <option>Sort by latest</option>
                                                <option>Price Hight to Low</option>
                                                <option>Price Low to High</option>
                                                <option>Customer Rating</option>
                                                <option>What's New</option>
                                                <option>Popularity</option>
                                            </select>
                                        </div>
                                        <div className='w-auto ml-5'>
                                            <ul className='flex items-center justify-end gap-x-5'>
                                                <li className='text-sm font-normal leading-6 text-light-gray'>View</li>
                                                <li className='text-sm font-normal leading-6 text-light-gray'>
                                                    <a href="#">
                                                        <img src="images/view-t.svg"/>
                                                    </a>
                                                </li>
                                                <li className='text-sm font-normal leading-6 text-light-gray'>
                                                    <a href="#">
                                                        <img src="images/view-l.svg"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full pt-10 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>   
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                            <span>-14%</span>
                                        </div>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-6.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>                                            
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-5.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-1.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-2.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                            <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                            <span>-14%</span>
                                        </div>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-6.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>                                            
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-5.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-1.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-2.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                            <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                            <span>-14%</span>
                                        </div>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-6.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>                                            
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-5.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-1.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-2.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                            <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                            <span>-14%</span>
                                        </div>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-6.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>                                            
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-5.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-1.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                        </div>
                                    </div>
                                    <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                        <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                            <img src="images/pro-2.png"/>
                                        </div>
                                        <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                            <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                            <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                            <img src="images/star.png" className='mt-3'/>
                                            <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                            <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-center mt-6 mb-12'>
                                    <a href="#" class="w-auto h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-dark-orange bg-dark-orange text-white text-sm leading-4 rounded-sm">
                                        <img src="images/pagination-left-white-arrow.svg" className='mr-1'/> Frist
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        <img src="images/pagination-left-arrow.svg"/>
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        1
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        2
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        3
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        4
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        5
                                    </a>
                                    <a href="#" class="w-9 h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-gray-300 bg-white text-color-dark text-sm leading-4">
                                        <img src="images/pagination-right-arrow.svg"/>
                                    </a>
                                    <a href="#" class="w-auto h-9 sm:py-1 sm:px-3.5 py-1 px-1.5 sm:mx-1 mx-0.5 flex items-center justify-center border border-solid border-dark-orange bg-dark-orange text-white text-sm leading-4 rounded-sm">
                                    Last <img src="images/pagination-right-white-arrow.svg" className='ml-1'/> 
                                    </a>
                                </div>
                                <div className='w-full flex flex-wrap'>
                                    <div className='w-full flex flex-wrap items-center justify-between py-3.5 px-3.5 border-b border-solid border-gray-300 bg-neutral-100'>
                                        <div className='flex flex-wrap items-center justify-start'>
                                            <h4 className='text-color-dark md:text-2xl text-xl font-normal capitalize md:mr-6 mr-3 whitespace-nowrap'>Recommended Items</h4>
                                        </div>
                                    </div>
                                    <div className='w-full pt-10 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>
                                        <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                            <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                                <span>-6%</span>
                                            </div>
                                            <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                                <img src="images/pro-7.png"/>
                                            </div>
                                            <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                                <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                                <div className='w-full mt-2.5'>
                                                    <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                                </div>
                                                <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                <img src="images/star.png" className='mt-3'/>
                                                <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                            </div>
                                        </div>
                                        <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                            <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                                <span>-6%</span>
                                            </div>
                                            <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                                <img src="images/pro-8.png"/>
                                            </div>
                                            <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                                <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                                <div className='w-full mt-2.5'>
                                                    <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                                </div>
                                                <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                <img src="images/star.png" className='mt-3'/>
                                                <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                            </div>
                                        </div>
                                        <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                            <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                                <img src="images/pro-4.png"/>
                                            </div>
                                            <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                                <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                                <div className='w-full mt-2.5'>
                                                    <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                                </div>
                                                <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                <img src="images/star.png" className='mt-3'/>
                                                <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                            </div>
                                        </div>
                                        <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                            <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                                <span>-6%</span>
                                            </div>
                                            <div className='w-full lg:h-52 h-40 flex items-center justify-center'>
                                                <img src="images/pro-1.png"/>
                                            </div>
                                            <div className='w-full lg:text-base text-sm font-normal capitalize relative text-color-blue'>
                                                <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                                <div className='w-full mt-2.5'>
                                                    <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                                </div>
                                                <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                <img src="images/star.png" className='mt-3'/>
                                                <span className='w-auto text-light-gray text-base font-normal'>$332.38</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className='w-full pt-16'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full mb-5 px-3.5 lg:w-3/12 md:w-3/12 sm:w-6/12'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize md:mb-3.5 mb-2'>Quick Links</h3>
                            <ul>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Policy</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Term & Condition</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Shipping</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Return</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>FAQs</a>
                                </li>
                            </ul>
                        </div>
                        <div className='w-full mb-5 px-3.5 lg:w-3/12 md:w-2/12 sm:w-6/12'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize md:mb-3.5 mb-2'>Company</h3>
                            <ul>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>About Us</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Affilate</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Career</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className='w-full mb-5 px-3.5 lg:w-2/12 md:w-2/12 sm:w-6/12'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize md:mb-3.5 mb-2'>Business</h3>
                            <ul>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Our Press</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Checkout</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>My Account</a>
                                </li>
                                <li className='w-full text-base font-normal capitalize text-light-gray py-1.5'>
                                    <a href="#" className='text-light-gray'>Shop</a>
                                </li>
                            </ul>
                        </div>
                        <div className='w-full mb-5 px-3.5 lg:w-4/12 md:w-5/12 sm:w-6/12'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize md:mb-3.5 mb-2'>Newsletter</h3>
                            <div className='w-full mt-3 inline-block'>
                                <input type="email" name="" placeholder="Email Address" className='w-3/4 h-12 md:py-3.5 md:px-5 py-2.5 px-3 text-sm font-normal capitalize rounded-l border border-solid border-gray-200 focus:outline-none'/>
                                <button type="button" className='w-1/4 h-12 bg-dark-orange border border-solid border-dark-orange md:text-sm text-xs font-medium rounded-r text-white'>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-full border-t border-solid border-gray-200 py-5 flex flex-wrap items-center lg:justify-between justify-center'>
                            <div className='w-auto flex items-center justify-start text-base font-normal capitalize text-light-gray lg:mb-0 mb-3'>
                                <p>©2021 Puremoon All Rights Reserved</p>
                            </div>
                            <div className='w-auto flex flex-wrap items-center lg:justify-end justify-center text-base font-normal capitalize text-light-gray'>
                                <p className='w-full text-center sm:w-auto'>We Using Safe Payment For:</p>
                                <img src="images/all-card.png" className='sm:ml-3 sm:mt-0 mt-3'/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </SiteLayout>
    )

}


export default withRouter(Pagetest);