import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const BuyGroupPage = () => {
  return (
    <div className="body-content-s1">
      <div className="product-view-s1-left-right">
        <div className="container m-auto px-3">
          <div className="product-view-s1-left">
            <div className="product-view-s1">
              <div className="product-view-s1-big-image">
                <div className="image-container">
                  <img src="/images/pic1.png" alt="" />
                </div>
              </div>
              <div className="product-view-s1-thumb-lists">
                <div className="thumb-item active">
                  <div className="image-container">
                    <img src="/images/pic1.png" alt="" />
                  </div>
                </div>
                <div className="thumb-item">
                  <div className="image-container">
                    <img src="/images/pic1.png" alt="" />
                  </div>
                </div>
                <div className="thumb-item">
                  <div className="image-container">
                    <img src="/images/pic1.png" alt="" />
                  </div>
                </div>
                <div className="thumb-item">
                  <div className="image-container">
                    <img src="/images/pic1.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-view-s1-right">
            <div className="info-col">
              <h2>Nike Zoom Running Shoes Size 33 Red</h2>
            </div>
            <div className="info-col">
              <h3>$115.00 <span>$170.99</span></h3>
            </div>
            <div className="info-col">
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <label>TIME LEFT:</label>
                    <div className="time-left-lists-s1">
                      <div className="time-left-list-col">
                        <div className="dayDigit">3</div>
                        <div className="dayText">days</div>
                      </div>
                      <div className="time-left-list-col">
                        <div className="dayDigit">18</div>
                        <div className="dayText">Hours</div>
                      </div>
                      <div className="time-left-list-col">
                        <div className="dayDigit">29</div>
                        <div className="dayText">Minutes</div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div className="form-group">
                    <p>Group Buy deal ends May 31, 2022, 12:00 am</p>
                    <p>Timezone: UTC+0</p>
                  </div>
                  <div className="col-12 col-md-12">
                    <div className="form-group">
                      <ul className="ul-lists-style-s1">
                        <li>Minimum: 50</li>
                        <li>Maximum: 100</li>
                        <li>Deals sold: 0</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-md-12">
                    <div className="form-group mb-0">
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                      />
                      <div className="slider-btm-range-value">
                        <div className="value_text">0</div>
                        <div className="value_text">100</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-col">
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="form-group mb-0">
                    <label>Quantity</label>
                    <div className="quantity_select_with_full_size_btn">
                      <div className="quantity_selector">
                        <span className="minus">
                          <img src="/images/quantity_selector_minus.svg" alt="" />
                        </span>
                        <input type="number" className="theme-form-control-s1"></input>
                        <span className="plus">
                          <img src="/images/quantity_selector_plus.svg" alt="" />
                        </span>
                      </div>
                      <div className="selector_submit_btn">
                        <Button type="button" className="theme-primary-btn">Buy Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-col">
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="form-group mb-0">
                    <label>HIGHLIGHTS</label>
                    <p><span className="color-text">colour:</span> Red & Black</p>
                    <p><span className="color-text">Outer Material:</span> Mesh</p>
                    <p><span className="color-text">Closure:</span> Laced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-view-s1-left-details-with-right-suggestion">
        <div className="container m-auto px-3">
          <div className="product-view-s1-left-details">
            <div className="theme-tab-s1">
              <ul>
                <li>
                  <a href="#" className="active">Description</a>
                </li>
                <li>
                  <a href="#">Specification</a>
                </li>
                <li>
                  <a href="#">Vendor</a>
                </li>
                <li>
                  <a href="#">Reviews</a>
                </li>
                <li>
                  <a href="#">Questions and Answers</a>
                </li>
                <li>
                  <a href="#">More Offers</a>
                </li>
              </ul>
            </div>
            <div className="details-lists">
              <div className="details-col">
                <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="custom-inner-banner-s1 size2">
                  <div className="custom-inner-banner-s1-captionBox">
                    <img src="/images/trending-product-inner-banner2.png" alt="" className="bg-image" />
                    <div className="text-container">
                      <div className="discount_text">
                        <span>SALE UP TO 30% OFF</span>
                      </div>
                      <h2 className="fwbold">Smart mobile shop start from$99</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                    </div>
                    <div className="image-container">
                      <img src="/images/trending-product-inner-banner-pic2.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="details-col">
                <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
              </div>
            </div>
          </div>
          <div className="product-view-s1-details-right-suggestion">
            <div className="suggestion-lists-s1">
              <div className="suggestion-list-s1-col">
                <div className="suggestion-banner">
                  <img src="/images/suggestion-pic1.png" alt="" />
                </div>
              </div>
              <div className="suggestion-list-s1-col">
                <div className="suggestion-same-branch-lists-s1">
                  <div className="title-headerpart">
                    <h3>Same Brand</h3>
                  </div>
                  <div className="contnet-bodypart">
                    <div className="product-list-s1 outline-style">
                      <div className="product-list-s1-col">
                        <div className="product-list-s1-box">
                          <div className="image-container">
                            <span className="discount">-6%</span>
                            <img src="/images/trending-product2.png" alt="" />
                          </div>
                          <div className="multiple-action-container">
                            <Button type="button" className="circle-btn"><img src="/images/shopping-icon.svg" alt="" /></Button>
                            <Button type="button" className="circle-btn"><img src="/images/eye-icon.svg" alt="" /></Button>
                            <Button type="button" className="circle-btn"><img src="/images/heart-icon.svg" alt="" /></Button>
                            <Button type="button" className="circle-btn"><img src="/images/compare-icon.svg" alt="" /></Button>
                          </div>
                          <div className="text-container">
                            <h4>young shop</h4>
                            <p>Lorem Ipsum is simply dummy text..</p>
                            <div className="rating_stars">
                              <img src="/images/rating_stars.svg" alt="" />
                              <span>02</span>
                            </div>
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div> <div className="product-list-s1-col">
                        <div className="product-list-s1-box">
                          <div className="image-container">
                            <span className="discount">-6%</span>
                            <img src="/images/trending-product2.png" alt="" />
                          </div>
                          <div className="multiple-action-container">
                            <Button type="button" className="circle-btn"><img src="/images/shopping-icon.svg" alt="" /></Button>
                            <Button type="button" className="circle-btn"><img src="/images/eye-icon.svg" alt="" /></Button>
                            <Button type="button" className="circle-btn"><img src="/images/heart-icon.svg" alt="" /></Button>
                            <Button type="button" className="circle-btn"><img src="/images/compare-icon.svg" alt="" /></Button>
                          </div>
                          <div className="text-container">
                            <h4>young shop</h4>
                            <p>Lorem Ipsum is simply dummy text..</p>
                            <div className="rating_stars">
                              <img src="/images/rating_stars.svg" alt="" />
                              <span>02</span>
                            </div>
                            <h5>$332.38</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-view-s1-details-more-suggestion-sliders">
          <section className="w-full py-8">
            <div className="container m-auto">
              <div className="products-header-filter">
                <div className="le-info">
                  <h3>Related products</h3>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                  <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                    <span>-6%</span>
                  </div>
                  <div className="flex h-40 w-full items-center justify-center lg:h-52">
                    <img src="images/trending-product2.png" />
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
                    <img src="images/pro-6.png" />
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
                    <img src="images/pro-5.png" />
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
                <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                  <div className="flex h-40 w-full items-center justify-center lg:h-52">
                    <img src="images/pro-2.png" />
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
                    <span className="mr-1 w-auto text-base font-normal text-dark-orange">
                      $332.38
                    </span>
                    <span className="w-auto text-base font-normal text-light-gray line-through">
                      $332.38
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
          <section className="w-full py-8">
            <div className="container m-auto">
              <div className="products-header-filter">
                <div className="le-info">
                  <h3>Similar products</h3>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <div className="relative border border-solid border-transparent px-2 py-1 pt-7 hover:border-gray-300">
                  <div className="absolute right-2.5 top-2.5 inline-block rounded bg-dark-orange px-2.5 py-2 text-lg font-medium capitalize leading-5 text-white">
                    <span>-6%</span>
                  </div>
                  <div className="flex h-40 w-full items-center justify-center lg:h-52">
                    <img src="/images/pro-mobile1.png" />
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
                    <img src="/images/pro-mobile2.png" />
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
                    <img src="/images/pro-mobile3.png" />
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
                    <img src="/images/pro-mobile4.png" />
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
                    <img src="/images/pro-mobile5.png" />
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
                    <span className="mr-1 w-auto text-base font-normal text-dark-orange">
                      $332.38
                    </span>
                    <span className="w-auto text-base font-normal text-light-gray line-through">
                      $332.38
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </div>
    </div>
  );
};

export default BuyGroupPage;
