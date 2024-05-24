import React from "react";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, Controller,
} from "@/components/ui/form";
const RfqList = () => {
  return <>
    <div className="existing-product-add-page">
      <div className="container m-auto px-3">
        <div className="existing-product-add-lists">


          <div className="existing-product-add-item">
            <div className="existing-product-add-box">
              <div className="existing-product-add-box-row">
                <div className="leftdiv">
                  <div className="image-container">
                    <img src="/images/ts-6.png" alt="" />
                  </div>
                  <div className="text-container">
                    <h3><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h3>
                  </div>
                  <div className="form-container">
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="text-with-checkagree">
                          <div className="check-col">
                            <input typeof="checkbox" className="custom-check-s1" type="checkbox" />
                          </div>
                          <label className="text-col" for="setUpPriceCheck">Stock</label>
                        </div>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-with-checkagree">
                          <div className="check-col">
                            <input typeof="checkbox" className="custom-check-s1" type="checkbox" />
                          </div>
                          <label className="text-col" for="setUpPriceCheck">Price</label>
                        </div>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
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
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="text"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label>Time Close</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Cosumer Type</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                          <option>Everyone</option>
                          <option>Consumer</option>
                          <option>Vendor</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Sell Type</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                          <option>Normal Sell</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Vendor Discount</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Consumer Discount</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Quantity</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Quantity</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Qty Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Qty Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
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
                <button type="button" className="custom-btn update">update</button>
                <button type="button" className="custom-btn theme-primary-btn">add</button>
                <button type="button" className="custom-btn edit">edit</button>
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
                    <h3><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h3>
                  </div>
                  <div className="form-container">
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="text-with-checkagree">
                          <div className="check-col">
                            <input typeof="checkbox" className="custom-check-s1" type="checkbox" />
                          </div>
                          <label className="text-col" for="setUpPriceCheck">Stock</label>
                        </div>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-with-checkagree">
                          <div className="check-col">
                            <input typeof="checkbox" className="custom-check-s1" type="checkbox" />
                          </div>
                          <label className="text-col" for="setUpPriceCheck">Price</label>
                        </div>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
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
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="text"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label>Time Close</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Cosumer Type</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                          <option>Everyone</option>
                          <option>Consumer</option>
                          <option>Vendor</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Sell Type</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                          <option>Normal Sell</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Vendor Discount</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Consumer Discount</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Quantity</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Quantity</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Qty Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Qty Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
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
                <button type="button" className="custom-btn update">update</button>
                <button type="button" className="custom-btn theme-primary-btn">add</button>
                <button type="button" className="custom-btn edit">edit</button>
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
                    <h3><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h3>
                  </div>
                  <div className="form-container">
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="text-with-checkagree">
                          <div className="check-col">
                            <input typeof="checkbox" className="custom-check-s1" type="checkbox" />
                          </div>
                          <label className="text-col" for="setUpPriceCheck">Stock</label>
                        </div>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-with-checkagree">
                          <div className="check-col">
                            <input typeof="checkbox" className="custom-check-s1" type="checkbox" />
                          </div>
                          <label className="text-col" for="setUpPriceCheck">Price</label>
                        </div>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
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
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="text"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label>Time Close</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt=""></img>
                          </button>
                          <input type="number"
                            className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0"
                          />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt=""></img>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Cosumer Type</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                          <option>Everyone</option>
                          <option>Consumer</option>
                          <option>Vendor</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Sell Type</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                          <option>Normal Sell</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4 grid w-full grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Vendor Discount</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Consumer Discount</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Quantity</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Quantity</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Min Qty Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
                          <button type="button" className="upDown-btn plus">
                            <img src="/images/plus-icon-dark.svg" alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Qty Consumer</label>
                        <div className="theme-inputValue-picker-upDown">
                          <button type="button" className="upDown-btn minus">
                            <img src="/images/minus-icon-dark.svg" alt="" />
                          </button>
                          <input className="theme-inputValue-picker-control !h-[48px] w-full rounded border !border-gray-300 text-sm focus-visible:!ring-0" type="number" />
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
                <button type="button" className="custom-btn update">update</button>
                <button type="button" className="custom-btn theme-primary-btn">add</button>
                <button type="button" className="custom-btn edit">edit</button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </>;
};

export default RfqList;
