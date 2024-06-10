import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const RfqList = () => {
  return (
    <>
      <div className="existing-product-add-page">
        <div className="container m-auto flex px-3">
          <div className="existing-product-add-lists">
            <div className="existing-product-add-item">
              <div className="existing-product-add-box">
                <div className="existing-product-add-box-row">
                  <div className="leftdiv">
                    <div className="image-container">
                      <div className="existing_product_checkbox">
                        <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                        <img src="/images/hide.png" alt="" />
                      </div>
                      <img src="/images/ts-6.png" alt="" />
                    </div>
                    <div className="text-container">
                      <h3>
                        <a href="">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </a>
                      </h3>
                    </div>
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Stock
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <span>100</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Price
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <Label>Deliver After</Label>
                          <span>2 days</span>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <Label>Product Location</Label>
                          <span>Kolkata</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightdiv">
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label>Time Open</label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>10:00am</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label>Time Close</label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>7:00pm</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Cosumer Type
                          </label>
                          <span>Everyone</span>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Sell Type
                          </label>
                          <span>Normal Sell</span>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vendor Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>20%</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Consumer Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>20%</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>2</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>10</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>50</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>100</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="existing-product-add-box-action">
                    <button type="button" className="custom-btn update">
                      update
                    </button>
                    <button
                      type="button"
                      className="custom-btn theme-primary-btn"
                    >
                      add
                    </button>
                    <button type="button" className="custom-btn edit">
                      edit
                    </button>
                  </div> */}
              </div>
            </div>

            <div className="existing-product-add-item">
              <div className="existing-product-add-box">
                <div className="existing-product-add-box-row">
                  <div className="leftdiv">
                    <div className="image-container">
                      <div className="existing_product_checkbox">
                        <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                        <img src="/images/hide.png" alt="" />
                      </div>
                      <img src="/images/ts-6.png" alt="" />
                    </div>
                    <div className="text-container">
                      <h3>
                        <a href="">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </a>
                      </h3>
                    </div>
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Stock
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <span>100</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Price
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <Label>Deliver After</Label>
                          <span>2 days</span>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <Label>Product Location</Label>
                          <span>Kolkata</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightdiv">
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label>Time Open</label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>10:00am</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label>Time Close</label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>7:00pm</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Cosumer Type
                          </label>
                          <span>Everyone</span>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Sell Type
                          </label>
                          <span>Normal Sell</span>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vendor Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>20%</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Consumer Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>20%</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>2</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>10</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>50</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>100</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="existing-product-add-box-action">
                    <button type="button" className="custom-btn update">
                      update
                    </button>
                    <button
                      type="button"
                      className="custom-btn theme-primary-btn"
                    >
                      add
                    </button>
                    <button type="button" className="custom-btn edit">
                      edit
                    </button>
                  </div> */}
              </div>
            </div>

            <div className="existing-product-add-item">
              <div className="existing-product-add-box">
                <div className="existing-product-add-box-row">
                  <div className="leftdiv">
                    <div className="image-container">
                      <div className="existing_product_checkbox">
                        <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                        <img src="/images/hide.png" alt="" />
                      </div>
                      <img src="/images/ts-6.png" alt="" />
                    </div>
                    <div className="text-container">
                      <h3>
                        <a href="">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </a>
                      </h3>
                    </div>
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Stock
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <span>100</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Price
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <Label>Deliver After</Label>
                          <span>2 days</span>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <Label>Product Location</Label>
                          <span>Kolkata</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightdiv">
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label>Time Open</label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>10:00am</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label>Time Close</label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>7:00pm</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Cosumer Type
                          </label>
                          <span>Everyone</span>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Sell Type
                          </label>
                          <span>Normal Sell</span>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vendor Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>20%</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Consumer Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>20%</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>2</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>10</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>50</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>100</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <span>1000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="existing-product-add-box-action">
                    <button type="button" className="custom-btn update">
                      update
                    </button>
                    <button
                      type="button"
                      className="custom-btn theme-primary-btn"
                    >
                      add
                    </button>
                    <button type="button" className="custom-btn edit">
                      edit
                    </button>
                  </div> */}
              </div>
            </div>

            {/* <div className="existing-product-add-item">
              <div className="existing-product-add-box">
                <div className="existing-product-add-box-row">
                  <div className="leftdiv">
                    <div className="image-container">
                      <img src="/images/ts-6.png" alt="" />
                    </div>
                    <div className="text-container">
                      <h3>
                        <a href="">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </a>
                      </h3>
                    </div>
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Stock
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="number"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Price
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="number"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <Label>Deliver After</Label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option>1 day</option>
                            <option>2 day</option>
                            <option>3 day</option>
                            <option>4 day</option>
                            <option>5 day</option>
                            <option>6 day</option>
                            <option>7 day</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <Label>Product Location</Label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option value="">Select Location</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightdiv">
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <label>Time Open</label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="text"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label>Time Close</label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="number"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Cosumer Type
                          </label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option>Everyone</option>
                            <option>Consumer</option>
                            <option>Vendor</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Sell Type
                          </label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option>Normal Sell</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vendor Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Consumer Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="existing-product-add-box-action">
                  <button type="button" className="custom-btn update">
                    update
                  </button>
                  <button
                    type="button"
                    className="custom-btn theme-primary-btn"
                  >
                    add
                  </button>
                  <button type="button" className="custom-btn edit">
                    edit
                  </button>
                </div>
              </div>
            </div>

            <div className="existing-product-add-item">
              <div className="existing-product-add-box">
                <div className="existing-product-add-box-row">
                  <div className="leftdiv">
                    <div className="image-container">
                      <img src="/images/ts-6.png" alt="" />
                    </div>
                    <div className="text-container">
                      <h3>
                        <a href="">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </a>
                      </h3>
                    </div>
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Stock
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="number"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-with-checkagree">
                            <div className="check-col">
                              <input
                                typeof="checkbox"
                                className="custom-check-s1"
                                type="checkbox"
                              />
                            </div>
                            <label
                              className="text-col"
                              htmlFor="setUpPriceCheck"
                            >
                              Price
                            </label>
                          </div>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="number"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <Label>Deliver After</Label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option>1 day</option>
                            <option>2 day</option>
                            <option>3 day</option>
                            <option>4 day</option>
                            <option>5 day</option>
                            <option>6 day</option>
                            <option>7 day</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <Label>Product Location</Label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option value="">Select Location</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rightdiv">
                    <div className="form-container">
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <label>Time Open</label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="text"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label>Time Close</label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img
                                src="/images/minus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="number"
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img
                                src="/images/plus-icon-dark.svg"
                                alt=""
                              ></img>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Cosumer Type
                          </label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option>Everyone</option>
                            <option>Consumer</option>
                            <option>Vendor</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Sell Type
                          </label>
                          <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                            <option>Normal Sell</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vendor Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Consumer Discount
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Quantity
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Min Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Max Qty Consumer
                          </label>
                          <div className="theme-inputValue-picker-upDown">
                            <button type="button" className="upDown-btn minus">
                              <img src="/images/minus-icon-dark.svg" alt="" />
                            </button>
                            <input
                              className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                              type="number"
                            />
                            <button type="button" className="upDown-btn plus">
                              <img src="/images/plus-icon-dark.svg" alt="" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="existing-product-add-box-action">
                  <button type="button" className="custom-btn update">
                    update
                  </button>
                  <button
                    type="button"
                    className="custom-btn theme-primary-btn"
                  >
                    add
                  </button>
                  <button type="button" className="custom-btn edit">
                    edit
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="manage_product_list">
            <div className="manage_product_list_wrap">
              <h2>Manage the product</h2>
              <div className="all_select_button">
                <button>Select All</button>
                <button>Clean Select</button>
              </div>
              <div className="select_main_wrap">
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <select>
                      <option>Select Brand</option>
                      <option>New</option>
                    </select>
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <button>Hide all Selected</button>
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <input
                      type="text"
                      placeholder="Ask for the Stock"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <input
                      type="text"
                      placeholder="Ask for the Price"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <select>
                      <option>Customer Type</option>
                      <option>Everyone</option>
                    </select>
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field plus_minus_select">
                    <button>Delivery After</button>
                    <div className="theme-inputValue-picker-upDown">
                      <button type="button" className="upDown-btn minus">
                        <img src="/images/minus-icon-dark.svg" alt=""></img>
                      </button>
                      <input type="number" className="form-control" value="0" />
                      <button type="button" className="upDown-btn plus">
                        <img src="/images/plus-icon-dark.svg" alt=""></img>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="manage_product_action">
                <button type="button" className="custom-btn update">
                  Update
                </button>
                <button type="button" className="custom-btn theme-primary-btn">
                  Add New
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RfqList;
