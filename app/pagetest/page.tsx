import React from "react";

export default function PageTestPage() {
  return (
    <>
      <section className="relative w-full py-7">
        <div className="container m-auto px-3">
          <div className="relative w-full px-5 pb-4 pt-8 text-sm font-normal capitalize text-light-gray sm:px-10 sm:pb-10 sm:pt-16">
            <div className="absolute left-0 top-0 h-full w-full">
              <img
                src="images/trending-banner-bg.png"
                className="h-full w-full"
              />
            </div>
            <div className="relative z-10 flex flex-wrap">
              <div className="w-full sm:w-5/12 md:w-5/12 lg:w-4/12">
                <div className="w-auto">
                  <ul className="flex items-center">
                    <li className="mr-2.5 flex text-sm leading-7 text-light-gray">
                      <a href="#" className="text-dark-orange">
                        Home
                      </a>
                    </li>
                    <li className="mr-2.5">
                      <img src="images/symbol.svg" />
                    </li>
                    <li className="mr-2.5 flex text-sm leading-7 text-light-gray">
                      Shop
                    </li>
                  </ul>
                </div>
                <h3 className="w-auto text-xl font-normal capitalize text-color-dark md:text-2xl lg:text-4xl">
                  Sed Do Eiusmod Tempor Incididunt
                </h3>
                <p className="text-sm capitalize leading-7 text-light-gray">
                  Only 2 Days:
                </p>
                <h4 className="nd:text-xl text-lg font-medium text-olive-green">
                  21/10 & 22/10
                </h4>
                <a
                  href="#"
                  className="mt-3 inline-block rounded-sm bg-dark-orange px-6 py-3 text-sm font-bold text-white"
                >
                  {" "}
                  Shop Now{" "}
                </a>
              </div>
              <div className="flex w-full items-end pb-5 sm:w-7/12 md:w-7/12 lg:w-8/12">
                <img src="images/trending-banner.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-7">
        <div className="container m-auto px-3">
          <div className="flex">
            <ul className="flex w-full flex-wrap items-center justify-between">
              <li className="w-1/3 px-2 sm:w-auto">
                <img
                  src="images/cl-1.png"
                  className="grayscale sm:h-auto sm:w-20 md:w-24 lg:w-auto"
                />
              </li>
              <li className="w-1/3 px-2 sm:w-auto">
                <img
                  src="images/cl-2.png"
                  className="grayscale sm:h-auto sm:w-20 md:w-24 lg:w-auto"
                />
              </li>
              <li className="w-1/3 px-2 sm:w-auto">
                <img
                  src="images/cl-3.png"
                  className="grayscale sm:h-auto sm:w-20 md:w-24 lg:w-auto"
                />
              </li>
              <li className="w-1/3 px-2 sm:w-auto">
                <img
                  src="images/cl-4.png"
                  className="grayscale sm:h-auto sm:w-20 md:w-24 lg:w-auto"
                />
              </li>
              <li className="w-1/3 px-2 sm:w-auto">
                <img
                  src="images/cl-5.png"
                  className="grayscale sm:h-auto sm:w-20 md:w-24 lg:w-auto"
                />
              </li>
              <li className="w-1/3 px-2 sm:w-auto">
                <img
                  src="images/cl-6.png"
                  className="grayscale sm:h-auto sm:w-20 md:w-24 lg:w-auto"
                />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative w-full py-7">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-1.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Clothing & Apparel
                    </h6>
                    <p>Accessories Bags Kid&apos;s Fashion Mens</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-2.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Garden & Kitchen
                    </h6>
                    <p>Cookware Decoration Furniture Garden Tools</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-3.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Consumer Electrics
                    </h6>
                    <p>
                      Air Conditioners Audios & Theaters Car Electronics Office
                      Electronics
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-4.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Health & Beauty
                    </h6>
                    <p>Equipments Hair Care Perfumer Skin Care</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-5.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Computers & Technologies
                    </h6>
                    <p>Desktop PC Laptop Smartphones</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-6.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Jewelry & Watches
                    </h6>
                    <p>
                      Gemstones Jewelry Men&apos;s Watches Women&apos;s Watches
                    </p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-7.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Phone & Accessories
                    </h6>
                    <p>Iphone 8 Iphone X Samsung Note 8</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mb-7 flex w-6/12 px-3 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
              <div className="flex w-full">
                <a
                  href="#"
                  className="flex w-full flex-wrap border border-solid border-gray-300 p-2.5"
                >
                  <div className="flex h-auto w-full justify-center text-center sm:w-24">
                    <img src="images/ts-8.png" />
                  </div>
                  <div className="text-normal h-auto w-full pl-2.5 text-center text-xs sm:w-[calc(100%_-_6rem)] sm:text-left">
                    <h6 className="mb-2 text-sm font-normal text-color-dark">
                      Sport & Outdoor
                    </h6>
                    <p>Freezer Burn Frigde Cooler Wine Cabinets</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-7">
        <div className="container m-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-3.5 lg:w-3/12">
              <div className="mb-7 w-full border border-solid border-gray-300">
                <div className="flex w-full items-center justify-between px-3.5 py-2.5">
                  <h4 className="m-0 text-lg font-normal">By Brand</h4>
                  <img src="images/symbol.svg" className="rotate-90" />
                </div>
                <div className="flex w-full border-b border-solid border-gray-300 px-3.5 py-2.5">
                  <button type="button" className="w-6 border-0 bg-transparent">
                    <img src="images/search.png" />
                  </button>
                  <input
                    type="search"
                    placeholder="Search Brand"
                    className="w-[calc(100%_-_1.5rem)] border-0 pl-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex w-full flex-wrap p-3.5">
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      SAMSUNG
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      vivo
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      oppo
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      apple
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      realme
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      poco
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      google
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      redmi
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      mi
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      lava
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      nokia
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      KARBONN
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      itel
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      OnePlus
                    </label>
                  </div>
                  <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                    <label className="flex w-full items-center justify-start text-sm font-normal leading-8 text-light-gray">
                      <input
                        type="checkbox"
                        name=""
                        className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange"
                      />
                      <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                      Tecno
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-7 w-full border border-solid border-gray-300">
                <div className="flex w-full items-center justify-between px-3.5 py-2.5">
                  <h4 className="m-0 text-lg font-normal">Price</h4>
                  <img src="images/symbol.svg" className="rotate-90" />
                </div>
                <div className="flex w-full items-center justify-between px-3.5 py-2.5">
                  <select className="h-auto w-20 border border-solid border-gray-300 px-1.5 py-2 text-sm font-normal leading-8 text-light-gray focus:outline-none">
                    <option>$0</option>
                    <option>$100</option>
                    <option>$200</option>
                    <option>$400</option>
                    <option>$500</option>
                  </select>
                  <select className="h-auto w-20 border border-solid border-gray-300 px-1.5 py-2 text-sm font-normal leading-8 text-light-gray focus:outline-none">
                    <option>$500</option>
                    <option>$2000</option>
                    <option>$5000</option>
                    <option>$10000</option>
                    <option>$50000</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full px-3.5 lg:w-9/12">
              <div className="flex flex-wrap">
                <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
                  <div className="flex flex-wrap items-center justify-start">
                    <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                      85 Products Found
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center justify-start sm:justify-end">
                    <div className="w-auto">
                      <select className="border border-solid border-gray-300 bg-white px-3.5 py-2.5 text-sm font-normal text-light-gray">
                        <option>Sort by latest</option>
                        <option>Price Hight to Low</option>
                        <option>Price Low to High</option>
                        <option>Customer Rating</option>
                        <option>What&apos;s New</option>
                        <option>Popularity</option>
                      </select>
                    </div>
                    <div className="ml-5 w-auto">
                      <ul className="flex items-center justify-end gap-x-5">
                        <li className="text-sm font-normal leading-6 text-light-gray">
                          View
                        </li>
                        <li className="text-sm font-normal leading-6 text-light-gray">
                          <a href="#">
                            <img src="images/view-t.svg" />
                          </a>
                        </li>
                        <li className="text-sm font-normal leading-6 text-light-gray">
                          <a href="#">
                            <img src="images/view-l.svg" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                      <span>-14%</span>
                    </div>
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-6.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-5.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-1.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-2.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="mr-1 w-auto text-base font-normal text-dark-orange">
                        $332.38
                      </span>
                      <span className="w-auto text-base font-normal text-light-gray line-through">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                      <span>-14%</span>
                    </div>
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-6.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-5.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-1.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-2.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="mr-1 w-auto text-base font-normal text-dark-orange">
                        $332.38
                      </span>
                      <span className="w-auto text-base font-normal text-light-gray line-through">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                      <span>-14%</span>
                    </div>
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-6.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-5.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-1.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-2.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="mr-1 w-auto text-base font-normal text-dark-orange">
                        $332.38
                      </span>
                      <span className="w-auto text-base font-normal text-light-gray line-through">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                      <span>-14%</span>
                    </div>
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-6.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-5.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-1.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="w-auto text-base font-normal text-light-gray">
                        $332.38
                      </span>
                    </div>
                  </div>
                  <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                    <div className="flex h-40 w-full items-center justify-center lg:h-52">
                      <img src="images/pro-2.png" />
                    </div>
                    <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                      <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                        young shop
                      </h6>
                      <p>
                        <a href="#">Lorem Ipsum is simply dummy text..</a>
                      </p>
                      <img src="images/star.png" className="mt-3" />
                      <span className="mr-1 w-auto text-base font-normal text-dark-orange">
                        $332.38
                      </span>
                      <span className="w-auto text-base font-normal text-light-gray line-through">
                        $332.38
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-12 mt-6 flex w-full items-center justify-center">
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-auto items-center justify-center rounded-sm border border-solid border-dark-orange bg-dark-orange px-1.5 py-1 text-sm leading-4 text-white sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    <img
                      src="images/pagination-left-white-arrow.svg"
                      className="mr-1"
                    />{" "}
                    Frist
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    <img src="images/pagination-left-arrow.svg" />
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    4
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    5
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-9 items-center justify-center border border-solid border-gray-300 bg-white px-1.5 py-1 text-sm leading-4 text-color-dark sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    <img src="images/pagination-right-arrow.svg" />
                  </a>
                  <a
                    href="#"
                    className="mx-0.5 flex h-9 w-auto items-center justify-center rounded-sm border border-solid border-dark-orange bg-dark-orange px-1.5 py-1 text-sm leading-4 text-white sm:mx-1 sm:px-3.5 sm:py-1"
                  >
                    Last{" "}
                    <img
                      src="images/pagination-right-white-arrow.svg"
                      className="ml-1"
                    />
                  </a>
                </div>
                <div className="flex w-full flex-wrap">
                  <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
                    <div className="flex flex-wrap items-center justify-start">
                      <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                        Recommended Items
                      </h4>
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                      <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                        <span>-6%</span>
                      </div>
                      <div className="flex h-40 w-full items-center justify-center lg:h-52">
                        <img src="images/pro-7.png" />
                      </div>
                      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                        <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                          young shop
                        </h6>
                        <div className="mt-2.5 w-full">
                          <h4 className="font-lg font-normal uppercase text-olive-green">
                            $55.99
                          </h4>
                        </div>
                        <p>
                          <a href="#">Lorem Ipsum is simply dummy text..</a>
                        </p>
                        <img src="images/star.png" className="mt-3" />
                        <span className="w-auto text-base font-normal text-light-gray">
                          $332.38
                        </span>
                      </div>
                    </div>
                    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                      <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                        <span>-6%</span>
                      </div>
                      <div className="flex h-40 w-full items-center justify-center lg:h-52">
                        <img src="images/pro-8.png" />
                      </div>
                      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                        <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                          young shop
                        </h6>
                        <div className="mt-2.5 w-full">
                          <h4 className="font-lg font-normal uppercase text-olive-green">
                            $55.99
                          </h4>
                        </div>
                        <p>
                          <a href="#">Lorem Ipsum is simply dummy text..</a>
                        </p>
                        <img src="images/star.png" className="mt-3" />
                        <span className="w-auto text-base font-normal text-light-gray">
                          $332.38
                        </span>
                      </div>
                    </div>
                    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                      <div className="flex h-40 w-full items-center justify-center lg:h-52">
                        <img src="images/pro-4.png" />
                      </div>
                      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                        <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                          young shop
                        </h6>
                        <div className="mt-2.5 w-full">
                          <h4 className="font-lg font-normal uppercase text-olive-green">
                            $55.99
                          </h4>
                        </div>
                        <p>
                          <a href="#">Lorem Ipsum is simply dummy text..</a>
                        </p>
                        <img src="images/star.png" className="mt-3" />
                        <span className="w-auto text-base font-normal text-light-gray">
                          $332.38
                        </span>
                      </div>
                    </div>
                    <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                      <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                        <span>-6%</span>
                      </div>
                      <div className="flex h-40 w-full items-center justify-center lg:h-52">
                        <img src="images/pro-1.png" />
                      </div>
                      <div className="relative w-full text-sm font-normal capitalize text-color-blue lg:text-base">
                        <h6 className="mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase text-color-dark">
                          young shop
                        </h6>
                        <div className="mt-2.5 w-full">
                          <h4 className="font-lg font-normal uppercase text-olive-green">
                            $55.99
                          </h4>
                        </div>
                        <p>
                          <a href="#">Lorem Ipsum is simply dummy text..</a>
                        </p>
                        <img src="images/star.png" className="mt-3" />
                        <span className="w-auto text-base font-normal text-light-gray">
                          $332.38
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full pt-16">
        <div className="container m-auto">
          <div className="flex flex-wrap">
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-3/12 lg:w-3/12">
              <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
                Quick Links
              </h3>
              <ul>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Policy
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Term & Condition
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Shipping
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Return
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-2/12 lg:w-3/12">
              <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
                Company
              </h3>
              <ul>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    About Us
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Affilate
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Career
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-2/12 lg:w-2/12">
              <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
                Business
              </h3>
              <ul>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Our Press
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Checkout
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    My Account
                  </a>
                </li>
                <li className="w-full py-1.5 text-base font-normal capitalize text-light-gray">
                  <a href="#" className="text-light-gray">
                    Shop
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-5/12 lg:w-4/12">
              <h3 className="mb-2 text-lg font-semibold capitalize text-color-dark md:mb-3.5">
                Newsletter
              </h3>
              <div className="mt-3 inline-block w-full">
                <input
                  type="email"
                  name=""
                  placeholder="Email Address"
                  className="h-12 w-3/4 rounded-l border border-solid border-gray-200 px-3 py-2.5 text-sm font-normal capitalize focus:outline-none md:px-5 md:py-3.5"
                />
                <button
                  type="button"
                  className="h-12 w-1/4 rounded-r border border-solid border-dark-orange bg-dark-orange text-xs font-medium text-white md:text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-center border-t border-solid border-gray-200 py-5 lg:justify-between">
              <div className="mb-3 flex w-auto items-center justify-start text-base font-normal capitalize text-light-gray lg:mb-0">
                <p>©2021 Puremoon All Rights Reserved</p>
              </div>
              <div className="flex w-auto flex-wrap items-center justify-center text-base font-normal capitalize text-light-gray lg:justify-end">
                <p className="w-full text-center sm:w-auto">
                  We Using Safe Payment For:
                </p>
                <img
                  src="images/all-card.png"
                  className="mt-3 sm:ml-3 sm:mt-0"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
