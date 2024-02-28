"use client";
import React from "react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  teamHeaderSection?: any;
  userHeaderSection?: any;
};

const Header: React.FC<HeaderProps> = ({
  teamHeaderSection,
  userHeaderSection,
}) => {
  const Router = useRouter();
  return (
    <header className="w-full">
      <div className="bg-dark-cyan w-full">
        <div className="container m-auto px-3">
          <div className="hidden sm:hidden md:flex md:gap-x-2.5">
            <div className="py-4 text-sm font-normal text-white md:w-5/12 lg:w-4/12">
              <p>Welcome to Martfury Online Shopping Store !</p>
            </div>
            <div className="flex justify-end py-4 text-sm font-normal text-white md:w-7/12 lg:w-8/12">
              <ul className="flex justify-end">
                <li className="border-r border-solid border-white px-2 text-sm font-normal text-white">
                  <a href="#">Store Location</a>
                </li>
                <li className="border-r border-solid border-white px-2 text-sm font-normal text-white">
                  <a href="#">Track Your Order</a>
                </li>
                <li className="border-r border-solid border-white px-2 text-sm font-normal text-white">
                  <select className="border-0 bg-transparent text-white focus:outline-none">
                    <option className="bg-dark-cyan">USD</option>
                    <option className="bg-dark-cyan">INR</option>
                    <option className="bg-dark-cyan">AUD</option>
                  </select>
                </li>
                <li className="px-2 pr-0 text-sm font-normal text-white">
                  <select className="border-0 bg-transparent text-white focus:outline-none">
                    <option className="bg-dark-cyan">English</option>
                    <option className="bg-dark-cyan">German</option>
                    <option className="bg-dark-cyan">French</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex sm:flex-wrap md:flex md:flex-wrap">
            <div className="order-1 flex w-5/12 items-center py-4 sm:order-1 sm:w-5/12 md:order-1 md:w-2/12 lg:w-1/6">
              <a href="#">
                <img src="images/logo.png" />
              </a>
            </div>
            <div className="order-3 flex w-10/12 items-center py-4 sm:order-3 sm:w-10/12 md:order-2 md:w-7/12 md:px-3 lg:w-4/6">
              <div className="h-11 w-24 md:w-24 lg:w-auto">
                <select className="h-full w-full focus:outline-none">
                  <option>All</option>
                  <option>Apps & Games</option>
                  <option>Beauty</option>
                  <option>Car & Motorbike</option>
                  <option>Clothing & Accessories</option>
                  <option>Computers & Accessories</option>
                  <option>Electronics</option>
                  <option>Movies & TV Shows</option>
                </select>
              </div>
              <div className="h-11 w-4/6 border-l border-solid border-indigo-200">
                <input
                  type="search"
                  className="form-control h-full w-full p-2.5 text-black focus:outline-none"
                  placeholder="I’m shopping for..."
                />
              </div>
              <div className="h-11 w-1/6">
                <button
                  type="button"
                  className="btn bg-dark-orange h-full w-full text-sm font-semibold text-white"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="order-2 flex w-7/12 justify-end py-4 sm:order-2 sm:w-7/12 md:order-3 md:w-3/12 lg:w-1/6">
              <ul className="flex items-center justify-end gap-x-4">
                <li className="relative flex pb-3 pl-0 pr-1 pt-0">
                  <a className="flex flex-wrap items-center">
                    <img src="images/wishlist.svg" />
                    <div className="bg-dark-orange absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                      0
                    </div>
                  </a>
                </li>
                <li className="relative flex pb-3 pl-0 pr-1 pt-0">
                  <a className="flex flex-wrap items-center">
                    <img src="images/cart.svg" />
                    <div className="bg-dark-orange absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                      0
                    </div>
                  </a>
                </li>
                <li className="relative flex pb-3 pl-0 pr-1 pt-0">
                  <img src="images/login.svg" />
                  <a className="ml-1.5 flex cursor-pointer flex-col flex-wrap items-start text-sm font-bold text-white">
                    <span onClick={() => Router.push("/login")}>Login </span>
                    <span onClick={() => Router.push("/register")}>
                      {" "}
                      Register
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="order-4 flex w-2/12 items-center justify-end py-4 md:hidden">
              <img src="images/humberger-white-icon.svg" />
            </div>
          </div>
          <div className="bg-dark-cyan fixed left-0 top-0 z-20 hidden h-full w-full px-3 md:static md:flex md:px-0">
            <ul className="flex w-full flex-col flex-wrap items-start justify-start gap-x-1 md:flex-row md:justify-between">
              <li className="flex py-3 text-sm font-semibold uppercase text-white md:py-5 md:text-sm lg:text-base xl:text-lg">
                <a href="javascript:void(0);" className="flex gap-x-2">
                  {" "}
                  <img src="images/menu-icon-home.svg" /> Home
                </a>
              </li>
              <li className="flex py-3 text-sm font-semibold uppercase text-white md:py-5 md:text-sm lg:text-base xl:text-lg">
                <a href="javascript:void(0);" className="flex gap-x-2">
                  {" "}
                  <img src="images/menu-icon-trending.svg" /> Trending & Hot
                  Deals
                </a>
              </li>
              <li className="flex py-3 text-sm font-semibold uppercase text-white md:py-5 md:text-sm lg:text-base xl:text-lg">
                <a href="javascript:void(0);" className="flex gap-x-2">
                  {" "}
                  <img src="images/menu-icon-buy.svg" /> buygroup
                </a>
              </li>
              <li className="flex py-3 text-sm font-semibold uppercase text-white md:py-5 md:text-sm lg:text-base xl:text-lg">
                <a href="javascript:void(0);" className="flex gap-x-2">
                  {" "}
                  <img src="images/menu-icon-rfq.svg" /> rfq
                </a>
              </li>
              <li className="flex py-3 text-sm font-semibold uppercase text-white md:py-5 md:text-sm lg:text-base xl:text-lg">
                <a href="javascript:void(0);" className="flex gap-x-2">
                  {" "}
                  <img src="images/menu-icon-pos.svg" /> pos store
                </a>
              </li>
              <li className="flex py-3 text-sm font-semibold uppercase text-white md:py-5 md:text-sm lg:text-base xl:text-lg">
                <a href="javascript:void(0);" className="flex gap-x-2">
                  {" "}
                  <img src="images/menu-icon-service.svg" /> Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-solid border-gray-300 bg-white">
        <div className="container m-auto px-3">
          <div className="flex">
            <div className="flex w-5/12 py-3 md:w-2/6">
              <img src="images/humberger-icon.svg" />
              <span className="text-color-dark mx-3 text-sm font-normal capitalize sm:text-base md:text-lg">
                All Categories
              </span>
              <img src="images/humberger-down-icon.svg" />
            </div>
            <div className="flex w-7/12 items-center justify-end md:w-4/6">
              <ul className="flex items-center justify-end gap-x-4">
                <li className="text-light-gray py-1.5 text-sm font-normal capitalize sm:text-base md:text-lg">
                  <a href="#" className="text-light-gray">
                    Buyer Central
                  </a>
                </li>
                <li className="text-light-gray py-1.5 text-sm font-normal capitalize sm:text-base md:text-lg">
                  <a href="#" className="text-light-gray">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
