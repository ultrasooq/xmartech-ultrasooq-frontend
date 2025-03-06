import DealsCard from "@/components/modules/home/DealsCard";
import ProductCard from "@/components/modules/home/ProductCard";
import TrendingCard from "@/components/modules/home/TrendingCard";
import TrendingOptionCard from "@/components/modules/home/TrendingOptionCard";
import Footer from "@/components/shared/Footer";
import {
  bestSellerList,
  camerasVideosList,
  computerTechnologyList,
  dealsList,
  homeElectronicsList,
  trendingList,
  trendingTopicList,
} from "@/utils/dummyDatas";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import HeadphoneImage from "@/public/images/big-headphone.png";
import AdBannerOne from "@/public/images/hs-1.png";
import AdBannerTwo from "@/public/images/hs-2.png";
import AdBannerThree from "@/public/images/hs-3.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

function HomePage() {
  return (
    <>
      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="mb-4 w-full sm:mb-0 sm:w-1/2 sm:pr-3.5">
              <div className="relative h-auto w-full sm:h-96">
                <Image
                  src={AdBannerOne}
                  className="static h-full w-full object-cover object-right-top"
                  alt="hs-1"
                  fill
                />
                <div className="relative left-0 top-0 flex h-full w-full items-center justify-start bg-gradient-to-r from-slate-100 to-transparent p-8 md:absolute">
                  <div className="text-sm font-normal text-light-gray md:w-10/12 lg:w-9/12">
                    <h6 className="m-0 text-sm font-normal uppercase text-dark-orange">
                      SAMSUNG
                    </h6>
                    <h3 className="mb-2.5 text-2xl font-medium capitalize text-color-dark lg:text-4xl">
                      sed do eiusmod tempor incididunt
                    </h3>
                    <p>Only 2 days:</p>
                    <h5 className="mb-5 text-lg font-semibold text-olive-green">
                      21/10 &amp; 22/10
                    </h5>
                    <a
                      href="#"
                      className="inline-block rounded-sm bg-dark-orange px-6 py-3 text-sm font-bold text-white"
                    >
                      {" "}
                      Shop Now{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 sm:pl-3.5">
              <div className="relative mb-4 h-auto w-full sm:mb-8 sm:h-44">
                <Image
                  src={AdBannerTwo}
                  className="static h-full w-full object-cover"
                  alt="hs-2"
                  fill
                />
                <div className="relative left-0 top-0 flex h-full w-full items-center justify-start bg-gradient-to-r from-slate-100 to-transparent px-8 py-4 md:absolute">
                  <div className="w-4/5 text-sm font-normal text-light-gray lg:w-3/5">
                    <h3 className="mb-2.5 text-xl font-medium capitalize text-color-dark lg:text-2xl">
                      <b>Fluence</b> Minimal Speaker
                    </h3>
                    <p>Just Price</p>
                    <h5 className="mb-5 text-lg font-semibold text-olive-green">
                      $159.99
                    </h5>
                  </div>
                </div>
              </div>
              <div className="relative h-auto w-full sm:h-44">
                <Image
                  src={AdBannerThree}
                  className="static h-full w-full object-cover"
                  alt="hs-3"
                  fill
                />
                <div className="relative left-0 top-0 flex h-full w-full items-center justify-start bg-gradient-to-r from-slate-100 to-transparent px-8 py-2 md:absolute">
                  <div className="w-4/5 text-sm font-normal text-light-gray lg:w-3/5">
                    <h6 className="m-0 text-xs font-normal uppercase text-dark-orange">
                      CAMERA
                    </h6>
                    <h3 className="text-2xl font-medium capitalize text-color-dark">
                      <b>Camera</b> Sale
                    </h3>
                    <span className="mb-1.5 block text-xl font-medium capitalize text-dark-orange lg:text-2xl">
                      20% OFF
                    </span>
                    <p>Just Price</p>
                    <h5 className="mb-5 text-lg font-semibold text-olive-green">
                      $159.99
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="mb-5 w-full">
              <h3 className="text-lg font-normal capitalize text-color-dark md:text-2xl">
                Search Trending
              </h3>
            </div>
            <div className="w-full">
              <div className="bg-neutral-100 p-4 lg:p-8">
                <div className="block w-full">
                  <ul className="mb-2 grid grid-cols-3 gap-3 border-b border-solid border-gray-300 sm:grid-cols-5 md:grid-cols-8">
                    {trendingTopicList.map((item: any) => (
                      <TrendingOptionCard key={uuidv4()} item={item} />
                    ))}
                  </ul>
                </div>
                <div className="block w-full py-5">
                  <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                    {trendingList.map((item) => (
                      <TrendingCard key={uuidv4()} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 pb-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-lg font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Deal of the day
                </h4>
                <span className="rounded bg-dark-orange px-3 py-1.5 text-sm font-medium capitalize text-white md:px-5 md:py-2.5 md:text-lg">
                  End in: 26:22:00:19
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-end">
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black underline sm:mr-0"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {dealsList.map((item: any) => (
                <DealsCard key={uuidv4()} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-lg font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Best Seller In The Last Month
                </h4>
              </div>
              <div className="flex flex-wrap items-center justify-start sm:justify-end">
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Iphone
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Ipad
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Samsung
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {bestSellerList.map((item: any) => (
                <ProductCard key={uuidv4()} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto">
          <div className="flex">
            <div className="relative flex w-full flex-wrap bg-neutral-100 px-5 py-6 md:py-12 lg:px-10 lg:py-24">
              <div className="sm:w-12/12 w-12/12 flex flex-wrap content-center items-center pr-3.5 md:w-6/12">
                <h3 className="text-xl font-normal capitalize leading-8 text-color-dark md:text-2xl md:leading-10 lg:text-4xl">
                  Contrary to popular belief, Lorem Ipsum is not..
                </h3>
                <p className="text-base font-normal capitalize text-light-gray">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.{" "}
                </p>
              </div>
              <div className="w-12/12 flex flex-wrap content-center items-center px-3.5 sm:w-4/12 md:w-3/12">
                <h6 className="mb-1.5 text-base font-medium uppercase text-color-dark line-through">
                  $332.38
                </h6>
                <h4 className="w-full text-3xl font-medium uppercase text-olive-green">
                  <span className="line-through">$</span>219.05
                </h4>
                <div className="mt-5">
                  <a
                    href="#"
                    className="inline-block rounded-sm bg-dark-orange px-6 py-3 text-sm font-bold text-white"
                  >
                    Shop Now{" "}
                  </a>
                </div>
              </div>
              <div className="w-12/12 flex pl-3.5 sm:w-8/12 md:w-3/12">
                <div className="static bottom-0 right-0 top-0 m-auto h-full max-h-full w-auto max-w-full md:absolute">
                  <Image
                    src={HeadphoneImage}
                    className="h-[320px] w-[276px] object-cover"
                    alt="Big Headphone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Computers & Technology
                </h4>
              </div>
              <div className="flex flex-wrap items-center justify-start sm:justify-end">
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Laptop
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Desktop PC
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Smartphone
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Mainboars
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  PC Gaming
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Accessories
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {computerTechnologyList.map((item: any) => (
                <ProductCard key={uuidv4()} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Home Electronics
                </h4>
              </div>
              <div className="flex flex-wrap items-center justify-start sm:justify-end">
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Smart
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  TV LED
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Air Conditions
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Sony Speakers
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Panasonic Refrigerations
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {homeElectronicsList.map((item: any) => (
                <ProductCard key={uuidv4()} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="mr-3 whitespace-nowrap text-xl font-normal capitalize text-color-dark md:mr-6 md:text-2xl">
                  Cameras & Videos
                </h4>
              </div>
              <div className="flex flex-wrap items-center justify-start sm:justify-end">
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:mr-0"
                >
                  Videos
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Projectors
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Digital Cameras
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Printers & Scanners
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  Accessories
                </a>
                <a
                  href="#"
                  className="mr-3.5 text-sm font-normal text-black sm:ml-3.5 sm:mr-0"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {camerasVideosList.map((item: any) => (
                <ProductCard key={uuidv4()} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
