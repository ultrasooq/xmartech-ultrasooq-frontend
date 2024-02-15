import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const Home = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Home Page</title>
            </Head>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex'>
                        <div className='w-1/2 pr-3.5'>
                            <div className='w-full h-96 relative'>
                                <img src="images/hs-1.png" className='w-full h-full object-cover object-right-top'/>
                                <div className='w-full h-full absolute top-0 left-0 p-8 bg-gradient-to-r from-slate-100 to-transparent flex items-center justify-start'>
                                    <div className='w-9/12 text-light-gray text-sm font-normal'>
                                        <h6 className='text-sm font-normal text-dark-orange uppercase m-0'>SAMSUNG</h6>
                                        <h3 className='text-4xl font-medium capitalize text-color-dark mb-2.5'>sed do eiusmod tempor incididunt</h3>
                                        <p>Only 2 days:</p>
                                        <h5 className='text-lg font-semibold mb-5 text-olive-green'>21/10 &amp; 22/10</h5>
                                        <a href="#" className='text-sm  font-bold py-3 px-6 bg-dark-orange text-white rounded-sm'> Shop Now </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2 pl-3.5'>
                            <div className='w-full h-44 relative mb-8'>
                                <img src="images/hs-2.png" className='w-full h-full object-cover'/>
                                <div className='w-full h-full absolute top-0 left-0 px-8 py-4 bg-gradient-to-r from-slate-100 to-transparent flex items-center justify-start'>
                                    <div className='w-2/5 text-light-gray text-sm font-normal'>
                                        <h3 className='text-2xl font-medium capitalize text-color-dark mb-2.5'><b>Fluence</b> Minimal Speaker</h3>
                                        <p>Just Price</p>
                                        <h5 className='text-lg font-semibold mb-5 text-olive-green'>$159.99</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-44 relative'>
                                <img src="images/hs-3.png" className='w-full h-full object-cover'/>
                                <div className='w-full h-full absolute top-0 left-0 px-8 py-2 bg-gradient-to-r from-slate-100 to-transparent flex items-center justify-start'>
                                    <div className='w-2/5 text-light-gray text-sm font-normal'>
                                        <h6 className='text-xs font-normal text-dark-orange uppercase m-0'>CAMERA</h6>
                                        <h3 className='text-2xl font-medium capitalize text-color-dark'><b>Camera</b> Sale</h3>
                                        <span className='text-2xl font-medium capitalize text-dark-orange mb-1.5 block'>20% OFF</span>
                                        <p>Just Price</p>
                                        <h5 className='text-lg font-semibold mb-5 text-olive-green'>$159.99</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full mb-5'>
                            <h3 className='text-color-dark text-2xl font-normal capitalize'>Search Trending</h3>
                        </div>
                        <div className='w-full'>
                            <div className='bg-neutral-100 p-8'>
                                <div className='w-full block'>
                                    <ul className='flex items-end justify-between border-b border-solid border-gray-300'>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-1.svg' className='mb-3'/>
                                                <span>Hot Trending</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-2.svg' className='mb-3'/>
                                                <span>Cell Phones</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-3.svg' className='mb-3'/>
                                                <span>Computers</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-4.svg' className='mb-3'/>
                                                <span>Furnitures</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-5.svg' className='mb-3'/>
                                                <span>T-Shirts</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-6.svg' className='mb-3'/>
                                                <span>Baby & Mom</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-7.svg' className='mb-3'/>
                                                <span>Sports</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-8.svg' className='mb-3'/>
                                                <span>Book & Office</span>
                                            </a>
                                        </li>
                                        <li className='text-center'>
                                            <a href='#' className='flex flex-col items-center text-light-gray text-sm font-normal capitalize p-3 border-b border-solid border-transparent'>
                                                <img src='images/tt-9.png' className='mb-3'/>
                                                <span>Cars</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='w-full block py-5'>
                                    <div className='w-full grid grid-cols-8'>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-1.png"/>
                                                </div>
                                                <span>#TELEVISION</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-2.png"/>
                                                </div>
                                                <span>#CAMERA</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-3.png"/>
                                                </div>
                                                <span>#WATCH</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-4.png"/>
                                                </div>
                                                <span>#CHAIR</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-5.png"/>
                                                </div>
                                                <span>#SNEAKER</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-6.png"/>
                                                </div>
                                                <span>#XBOX</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-7.png"/>
                                                </div>
                                                <span>#GOPRO</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-8.png"/>
                                                </div>
                                                <span>#LIPSTICK</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-9.png"/>
                                                </div>
                                                <span>#PHONE</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-10.png"/>
                                                </div>
                                                <span>#LAPTOP</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-11.png"/>
                                                </div>
                                                <span>#SPEAKER</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-12.png"/>
                                                </div>
                                                <span>#BOOK</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-13.png"/>
                                                </div>
                                                <span>#BLENDER</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-14.png"/>
                                                </div>
                                                <span>#BAG</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-15.png"/>
                                                </div>
                                                <span>#SMARTPHONE</span>
                                            </a>
                                        </div>
                                        <div className='w-auto my-3.5 text-center flex items-end justify-center'>
                                            <a href='#' className='text-light-gray text-base font-normal capitalize'>
                                                <div className='mb-3'>
                                                    <img src="images/tp-16.png"/>
                                                </div>
                                                <span>#CAMPING</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full flex items-center justify-between pb-3.5 border-b border-solid border-gray-300'>
                            <div className='flex flex-wrap items-center justify-start'>
                                <h4 className='text-color-dark text-2xl font-normal capitalize mr-6 whitespace-nowrap'>Deal of the day</h4>
                                <span className='text-lg font-medium capitalize px-5 py-2.5 rounded bg-dark-orange text-white'>End in: 26:22:00:19</span>
                            </div>
                            <div className='flex flex-wrap items-center justify-end'>
                                <a href="#" className='text-sm font-normal text-black underline'>View all</a>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap pt-10 grid grid-cols-5'>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative'>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-1.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <div className='w-full h-3 bg-gray-300 mt-3'>
                                        <div className='w-4/5 h-full bg-color-yellow'></div>
                                    </div>
                                    <span className='w-full text-light-gray text-sm font-normal capitalize'>Sold: 10</span>
                                </div>
                            </div>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative'>
                                <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                    <span>-6%</span>
                                </div>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-2.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <div className='w-full h-3 bg-gray-300 mt-3'>
                                        <div className='w-4/5 h-full bg-color-yellow'></div>
                                    </div>
                                    <span className='w-full text-light-gray text-sm font-normal capitalize'>Sold: 10</span>
                                </div>
                            </div>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative'>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-3.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <div className='w-full h-3 bg-gray-300 mt-3'>
                                        <div className='w-4/5 h-full bg-color-yellow'></div>
                                    </div>
                                    <span className='w-full text-light-gray text-sm font-normal capitalize'>Sold: 10</span>
                                </div>
                            </div>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative'>
                                <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                    <span>-14%</span>
                                </div>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-4.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <div className='w-full h-3 bg-gray-300 mt-3'>
                                        <div className='w-4/5 h-full bg-color-yellow'></div>
                                    </div>
                                    <span className='w-full text-light-gray text-sm font-normal capitalize'>Sold: 10</span>
                                </div>
                            </div>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative'>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-5.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <div className='w-full h-3 bg-gray-300 mt-3'>
                                        <div className='w-4/5 h-full bg-color-yellow'></div>
                                    </div>
                                    <span className='w-full text-light-gray text-sm font-normal capitalize'>Sold: 10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full flex items-center justify-between py-3.5 px-3.5 border-b border-solid border-gray-300 bg-neutral-100'>
                            <div className='flex flex-wrap items-center justify-start'>
                                <h4 className='text-color-dark text-2xl font-normal capitalize mr-6 whitespace-nowrap'>Best Seller In The Last Month</h4>
                            </div>
                            <div className='flex flex-wrap items-center justify-end'>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Iphone</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Ipad</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Samsung</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>View all</a>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap pt-10 grid grid-cols-5'>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                    <span>-6%</span>
                                </div>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-3.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-6.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-5.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-1.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-2.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                    <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex'>
                        <div className='w-full bg-neutral-100 py-24 px-10 relative flex'>
                            <div className='w-3/6 pr-3.5 flex flex-wrap items-center content-center'>
                                <h3 className='text-color-dark text-4xl font-normal leading-10 capitalize'>Contrary to popular belief, Lorem Ipsum is not..</h3>
                                <p className='text-base font-normal capitalize text-light-gray'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                            <div className='w-1/6 px-3.5 flex flex-wrap items-center content-center'>
                                <h6 className='text-color-dark text-base font-medium line-through uppercase mb-1.5'>$332.38</h6>
                                <h4 className='w-full text-olive-green text-3xl font-medium uppercase'><span className='line-through'>$</span>219.05</h4>
                                <div className='mt-5'>
                                    <a href="#" className='text-sm font-bold py-3 px-6 bg-dark-orange text-white rounded-sm inline-block'>Shop Now </a>
                                </div>
                            </div>
                            <div className='w-2/6 pl-3.5 flex'>
                                <div className='w-auto h-full max-w-full max-h-full absolute top-0 right-0 bottom-0 m-auto'>
                                    <img src="images/big-headphone.png" className='w-full h-full object-cover'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full flex items-center justify-between py-3.5 px-3.5 border-b border-solid border-gray-300 bg-neutral-100'>
                            <div className='flex flex-wrap items-center justify-start'>
                                <h4 className='text-color-dark text-2xl font-normal capitalize mr-6 whitespace-nowrap'>Computers & Technology</h4>
                            </div>
                            <div className='flex flex-wrap items-center justify-end'>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Laptop</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Desktop PC</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Smartphone</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Mainboars</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>PC Gaming</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Accessories</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>View all</a>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap pt-10 grid grid-cols-5'>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                    <span>-6%</span>
                                </div>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-7.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-8.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-4.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-1.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-6.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                    <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full flex items-center justify-between py-3.5 px-3.5 border-b border-solid border-gray-300 bg-neutral-100'>
                            <div className='flex flex-wrap items-center justify-start'>
                                <h4 className='text-color-dark text-2xl font-normal capitalize mr-6 whitespace-nowrap'>Home Electronics</h4>
                            </div>
                            <div className='flex flex-wrap items-center justify-end'>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Smart</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>TV LED</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Air Conditions</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Sony Speakers</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Panasonic Refrigerations</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>View all</a>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap pt-10 grid grid-cols-5'>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-9.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-9.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-10.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-1.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-11.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                    <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full py-8'>
                <div className='container m-auto'>
                    <div className='flex flex-wrap'>
                        <div className='w-full flex items-center justify-between py-3.5 px-3.5 border-b border-solid border-gray-300 bg-neutral-100'>
                            <div className='flex flex-wrap items-center justify-start'>
                                <h4 className='text-color-dark text-2xl font-normal capitalize mr-6 whitespace-nowrap'>Cameras & Videos</h4>
                            </div>
                            <div className='flex flex-wrap items-center justify-end'>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Videos</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Projectors</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Digital Cameras</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Printers & Scanners</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>Accessories</a>
                                <a href="#" className='text-sm font-normal text-black ml-3.5'>View all</a>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap pt-10 grid grid-cols-5'>
                            <div className='pt-7 px-2 py-1 border border-solid border-transparent relative hover:border-gray-300'>
                                <div className='bg-dark-orange py-2 px-2.5 text-white text-lg leading-5 font-medium capitalize rounded inline-block absolute right-2.5 top-2.5'>
                                    <span>-6%</span>
                                </div>
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-12.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-13.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-12.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-13.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
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
                                <div className='w-full h-52 flex items-center justify-center'>
                                    <img src="images/pro-14.png"/>
                                </div>
                                <div className='w-full text-base font-normal capitalize relative text-color-blue'>
                                    <h6 className='text-color-dark text-xs font-normal uppercase pb-2.5 mb-2.5 border-b border-solid border-gray-300'>young shop</h6>
                                    <div className='w-full mt-2.5'>
                                        <h4 className='text-olive-green font-lg font-normal uppercase'>$55.99</h4>
                                    </div>
                                    <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                    <img src="images/star.png" className='mt-3'/>
                                    <span className='w-auto text-dark-orange text-base font-normal mr-1'>$332.38</span>
                                    <span className='w-auto text-light-gray text-base font-normal line-through'>$332.38</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className='w-full pt-16'>
                <div className='container m-auto'>
                    <div className='flex'>
                        <div className='w-3/12 px-3.5'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize mb-3.5'>Quick Links</h3>
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
                        <div className='w-3/12 px-3.5'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize mb-3.5'>Company</h3>
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
                        <div className='w-2/12 px-3.5'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize mb-3.5'>Business</h3>
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
                        <div className='w-4/12 px-3.5'>
                            <h3 className='text-color-dark text-lg font-semibold capitalize mb-3.5'>Newsletter</h3>
                            <div className='w-full mt-3 inline-block'>
                                <input type="email" name="" placeholder="Email Address" className='w-3/4 h-12 py-3.5 px-5 text-sm font-normal capitalize rounded-l border border-solid border-gray-200 focus:outline-none'/>
                                <button type="button" className='w-1/4 h-12 bg-dark-orange border border-solid border-dark-orange text-sm font-medium rounded-r text-white'>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-full border-t border-solid border-gray-200 py-5 mt-5 flex items-center justify-between'>
                            <div className='w-auto flex items-center justify-start text-base font-normal capitalize text-light-gray'>
                                <p>©2021 Puremoon All Rights Reserved</p>
                            </div>
                            <div className='w-auto flex items-center justify-start text-base font-normal capitalize text-light-gray'>
                                <p>We Using Safe Payment For:</p>
                                <img src="images/all-card.png" className='ml-3'/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            {/* <div>Home page</div>
            <button onClick={() => Router.push("/login")}>Goto Login</button>
            <button onClick={() => Router.push("/details/page")}>Goto Page</button>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div> */}
        </SiteLayout>
    )

}


export default withRouter(Home);