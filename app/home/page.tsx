export default function HomePage() {
  return (
    <>
      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="mb-4 w-full sm:mb-0 sm:w-1/2 sm:pr-3.5">
              <div className="relative h-auto w-full sm:h-96">
                <img
                  src="images/hs-1.png"
                  className="h-full w-full object-cover object-right-top"
                />
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start bg-gradient-to-r from-slate-100 to-transparent p-8">
                  <div className="text-light-gray text-sm font-normal md:w-10/12 lg:w-9/12">
                    <h6 className="text-dark-orange m-0 text-sm font-normal uppercase">
                      SAMSUNG
                    </h6>
                    <h3 className="text-color-dark mb-2.5 text-2xl font-medium capitalize lg:text-4xl">
                      sed do eiusmod tempor incididunt
                    </h3>
                    <p>Only 2 days:</p>
                    <h5 className="text-olive-green mb-5 text-lg font-semibold">
                      21/10 &amp; 22/10
                    </h5>
                    <a
                      href="#"
                      className="bg-dark-orange inline-block rounded-sm px-6 py-3 text-sm font-bold text-white"
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
                <img
                  src="images/hs-2.png"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start bg-gradient-to-r from-slate-100 to-transparent px-8 py-4">
                  <div className="text-light-gray w-4/5 text-sm font-normal lg:w-3/5">
                    <h3 className="text-color-dark mb-2.5 text-xl font-medium capitalize lg:text-2xl">
                      <b>Fluence</b> Minimal Speaker
                    </h3>
                    <p>Just Price</p>
                    <h5 className="text-olive-green mb-5 text-lg font-semibold">
                      $159.99
                    </h5>
                  </div>
                </div>
              </div>
              <div className="relative h-auto w-full sm:h-44">
                <img
                  src="images/hs-3.png"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start bg-gradient-to-r from-slate-100 to-transparent px-8 py-2">
                  <div className="text-light-gray w-4/5 text-sm font-normal lg:w-3/5">
                    <h6 className="text-dark-orange m-0 text-xs font-normal uppercase">
                      CAMERA
                    </h6>
                    <h3 className="text-color-dark text-2xl font-medium capitalize">
                      <b>Camera</b> Sale
                    </h3>
                    <span className="text-dark-orange mb-1.5 block text-xl font-medium capitalize lg:text-2xl">
                      20% OFF
                    </span>
                    <p>Just Price</p>
                    <h5 className="text-olive-green mb-5 text-lg font-semibold">
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
              <h3 className="text-color-dark text-2xl font-normal capitalize">
                Search Trending
              </h3>
            </div>
            <div className="w-full">
              <div className="bg-neutral-100 p-4 lg:p-8">
                <div className="block w-full">
                  <ul className="flex flex-wrap items-end justify-between border-b border-solid border-gray-300">
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img
                          src="images/tt-1.svg"
                          className="md:max-w-7 mb-3 lg:max-w-none"
                        />
                        <span>Hot Trending</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-2.svg" className="mb-3" />
                        <span>Cell Phones</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-3.svg" className="mb-3" />
                        <span>Computers</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-4.svg" className="mb-3" />
                        <span>Furnitures</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-5.svg" className="mb-3" />
                        <span>T-Shirts</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-6.svg" className="mb-3" />
                        <span>Baby & Mom</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-7.svg" className="mb-3" />
                        <span>Sports</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-8.svg" className="mb-3" />
                        <span>Book & Office</span>
                      </a>
                    </li>
                    <li className="mb-2 w-2/6 text-center sm:w-1/5 md:w-auto">
                      <a
                        href="#"
                        className="text-light-gray flex flex-col items-center border-b border-solid border-transparent p-1 text-xs font-normal capitalize lg:p-3 lg:text-sm"
                      >
                        <img src="images/tt-9.png" className="mb-3" />
                        <span>Cars</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="block w-full py-5">
                  <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-1.png" />
                        </div>
                        <span>#TELEVISION</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-2.png" className="m-auto" />
                        </div>
                        <span>#CAMERA</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-3.png" className="m-auto" />
                        </div>
                        <span>#WATCH</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-4.png" className="m-auto" />
                        </div>
                        <span>#CHAIR</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-5.png" className="m-auto" />
                        </div>
                        <span>#SNEAKER</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-6.png" className="m-auto" />
                        </div>
                        <span>#XBOX</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-7.png" className="m-auto" />
                        </div>
                        <span>#GOPRO</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-8.png" className="m-auto" />
                        </div>
                        <span>#LIPSTICK</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-9.png" className="m-auto" />
                        </div>
                        <span>#PHONE</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-10.png" className="m-auto" />
                        </div>
                        <span>#LAPTOP</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-11.png" className="m-auto" />
                        </div>
                        <span>#SPEAKER</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-12.png" className="m-auto" />
                        </div>
                        <span>#BOOK</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-13.png" className="m-auto" />
                        </div>
                        <span>#BLENDER</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-14.png" className="m-auto" />
                        </div>
                        <span>#BAG</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-15.png" className="m-auto" />
                        </div>
                        <span>#SMARTPHONE</span>
                      </a>
                    </div>
                    <div className="my-3.5 flex w-auto items-end justify-center text-center">
                      <a
                        href="#"
                        className="text-light-gray max-w-full text-xs font-normal capitalize lg:text-base"
                      >
                        <div className="mb-3">
                          <img src="images/tp-16.png" className="m-auto" />
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

      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 pb-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="text-color-dark mr-3 whitespace-nowrap text-xl font-normal capitalize md:mr-6 md:text-2xl">
                  Deal of the day
                </h4>
                <span className="bg-dark-orange rounded px-3 py-1.5 text-sm font-medium capitalize text-white md:px-5 md:py-2.5 md:text-lg">
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
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-1.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <div className="mt-3 h-3 w-full bg-gray-300">
                    <div className="bg-color-yellow h-full w-4/5"></div>
                  </div>
                  <span className="text-light-gray w-full text-sm font-normal capitalize">
                    Sold: 10
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-2.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <div className="mt-3 h-3 w-full bg-gray-300">
                    <div className="bg-color-yellow h-full w-4/5"></div>
                  </div>
                  <span className="text-light-gray w-full text-sm font-normal capitalize">
                    Sold: 10
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-3.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <div className="mt-3 h-3 w-full bg-gray-300">
                    <div className="bg-color-yellow h-full w-4/5"></div>
                  </div>
                  <span className="text-light-gray w-full text-sm font-normal capitalize">
                    Sold: 10
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-14%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-4.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <div className="mt-3 h-3 w-full bg-gray-300">
                    <div className="bg-color-yellow h-full w-4/5"></div>
                  </div>
                  <span className="text-light-gray w-full text-sm font-normal capitalize">
                    Sold: 10
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-5.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <div className="mt-3 h-3 w-full bg-gray-300">
                    <div className="bg-color-yellow h-full w-4/5"></div>
                  </div>
                  <span className="text-light-gray w-full text-sm font-normal capitalize">
                    Sold: 10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto px-3">
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-between border-b border-solid border-gray-300 bg-neutral-100 px-3.5 py-3.5">
              <div className="flex flex-wrap items-center justify-start">
                <h4 className="text-color-dark mr-3 whitespace-nowrap text-xl font-normal capitalize md:mr-6 md:text-2xl">
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
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-3.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-6.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-5.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-1.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-2.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-dark-orange mr-1 w-auto text-base font-normal">
                    $332.38
                  </span>
                  <span className="text-light-gray w-auto text-base font-normal line-through">
                    $332.38
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container m-auto">
          <div className="flex">
            <div className="relative flex w-full flex-wrap bg-neutral-100 px-5 py-12 lg:px-10 lg:py-24">
              <div className="sm:w-12/12 w-12/12 flex flex-wrap content-center items-center pr-3.5 md:w-6/12">
                <h3 className="text-color-dark text-2xl font-normal capitalize leading-10 lg:text-4xl">
                  Contrary to popular belief, Lorem Ipsum is not..
                </h3>
                <p className="text-light-gray text-base font-normal capitalize">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.{" "}
                </p>
              </div>
              <div className="w-12/12 flex flex-wrap content-center items-center px-3.5 sm:w-4/12 md:w-3/12">
                <h6 className="text-color-dark mb-1.5 text-base font-medium uppercase line-through">
                  $332.38
                </h6>
                <h4 className="text-olive-green w-full text-3xl font-medium uppercase">
                  <span className="line-through">$</span>219.05
                </h4>
                <div className="mt-5">
                  <a
                    href="#"
                    className="bg-dark-orange inline-block rounded-sm px-6 py-3 text-sm font-bold text-white"
                  >
                    Shop Now{" "}
                  </a>
                </div>
              </div>
              <div className="w-12/12 flex pl-3.5 sm:w-8/12 md:w-3/12">
                <div className="static bottom-0 right-0 top-0 m-auto h-full max-h-full w-auto max-w-full md:absolute">
                  <img
                    src="images/big-headphone.png"
                    className="h-full w-full object-cover"
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
                <h4 className="text-color-dark mr-3 whitespace-nowrap text-xl font-normal capitalize md:mr-6 md:text-2xl">
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
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-7.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-8.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-4.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-1.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-6.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-dark-orange mr-1 w-auto text-base font-normal">
                    $332.38
                  </span>
                  <span className="text-light-gray w-auto text-base font-normal line-through">
                    $332.38
                  </span>
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
                <h4 className="text-color-dark mr-3 whitespace-nowrap text-xl font-normal capitalize md:mr-6 md:text-2xl">
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
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-9.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-9.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-10.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-1.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-11.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-dark-orange mr-1 w-auto text-base font-normal">
                    $332.38
                  </span>
                  <span className="text-light-gray w-auto text-base font-normal line-through">
                    $332.38
                  </span>
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
                <h4 className="text-color-dark mr-3 whitespace-nowrap text-xl font-normal capitalize md:mr-6 md:text-2xl">
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
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-12.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-13.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-12.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="bg-dark-orange absolute right-2.5 top-2.5 inline-block rounded px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                  <span>-6%</span>
                </div>
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-13.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-light-gray w-auto text-base font-normal">
                    $332.38
                  </span>
                </div>
              </div>
              <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                <div className="flex h-40 w-full items-center justify-center lg:h-52">
                  <img src="images/pro-14.png" />
                </div>
                <div className="text-color-blue relative w-full text-sm font-normal capitalize lg:text-base">
                  <h6 className="text-color-dark mb-2.5 border-b border-solid border-gray-300 pb-2.5 text-xs font-normal uppercase">
                    young shop
                  </h6>
                  <div className="mt-2.5 w-full">
                    <h4 className="text-olive-green font-lg font-normal uppercase">
                      $55.99
                    </h4>
                  </div>
                  <p>
                    <a href="#">Lorem Ipsum is simply dummy text..</a>
                  </p>
                  <img src="images/star.png" className="mt-3" />
                  <span className="text-dark-orange mr-1 w-auto text-base font-normal">
                    $332.38
                  </span>
                  <span className="text-light-gray w-auto text-base font-normal line-through">
                    $332.38
                  </span>
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
              <h3 className="text-color-dark mb-2 text-lg font-semibold capitalize md:mb-3.5">
                Quick Links
              </h3>
              <ul>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Policy
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Term & Condition
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Shipping
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Return
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-2/12 lg:w-3/12">
              <h3 className="text-color-dark mb-2 text-lg font-semibold capitalize md:mb-3.5">
                Company
              </h3>
              <ul>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    About Us
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Affilate
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Career
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-2/12 lg:w-2/12">
              <h3 className="text-color-dark mb-2 text-lg font-semibold capitalize md:mb-3.5">
                Business
              </h3>
              <ul>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Our Press
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Checkout
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    My Account
                  </a>
                </li>
                <li className="text-light-gray w-full py-1.5 text-base font-normal capitalize">
                  <a href="#" className="text-light-gray">
                    Shop
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5 w-full px-3.5 sm:w-6/12 md:w-5/12 lg:w-4/12">
              <h3 className="text-color-dark mb-2 text-lg font-semibold capitalize md:mb-3.5">
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
                  className="bg-dark-orange border-dark-orange h-12 w-1/4 rounded-r border border-solid text-xs font-medium text-white md:text-sm"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="flex w-full flex-wrap items-center justify-center border-t border-solid border-gray-200 py-5 lg:justify-between">
              <div className="text-light-gray mb-3 flex w-auto items-center justify-start text-base font-normal capitalize lg:mb-0">
                <p>©2021 Puremoon All Rights Reserved</p>
              </div>
              <div className="text-light-gray flex w-auto flex-wrap items-center justify-center text-base font-normal capitalize lg:justify-end">
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
    </>
  );
}
