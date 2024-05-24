import React from "react";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const RfqList = () => {
  return <>
    <div className="existing-product-add-page">
      <div className="container m-auto px-3">
        <div className="existing-product-add-lists">


          <div className="existing-product-add-item">
            <div className="existing-product-add-box">
              <div className="leftdiv">
                <div className="image-container">
                  <img src="/images/ts-6.png" alt="" />
                </div>
                <div className="text-container">
                  <h3><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h3>
                </div>
                <div className="form-container">
                  <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
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
                    <div className="space-y-2">
                      <Label>Deliver After</Label>
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
                </div>
              </div>
              <div className="rightdiv">
                <div className="form-container">

                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </>;
};

export default RfqList;
