import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const OrdersPage = () => {
  return (
    <div className="cart-page">
      <div className="container m-auto px-3">
        <div className="headerPart">
          <div className="lediv">
            <h3>Make payment</h3>
          </div>
        </div>
        <div className="cart-page-wrapper">

          <div className="cart-page-left">

            <div className="bodyPart">

              <div className="card-item card-payment-form px-5 pt-3 pb-5">
                <div className="flex flex-wrap">
                  <div className="space-y-2 mb-4 w-full">
                    <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Card Holder name</label>
                    <div className="relative">
                      <input className="flex h-9 w-full rounded-md border border-input
                       bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
                       file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
                       disabled:opacity-50 theme-form-control-s1" placeholder="card holder name" 
                       />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 w-full">
                    <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Card Number</label>
                    <div className="relative">
                      <input className="flex h-9 w-full
                       rounded-md border border-input bg-transparent px-3 py-1
                        text-sm shadow-sm transition-colors file:border-0 file:bg-transparent 
                        file:text-sm file:font-medium placeholder:text-muted-foreground 
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                        disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1" 
                        placeholder="card Number" id=":Rj2nnjkq:-form-item" 
                       />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="space-y-2 mb-4 ">
                    <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Valid through (MM/yY)</label>
                    <div className="relative">
                      <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1" 
                        placeholder="Valid through (MM/YY)"/>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 ">
                    <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >CVV</label>
                    <div className="relative">
                      <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1" 
                        placeholder="CVV"/>
                    </div>
                  </div>
                </div>
                </div>
                <div className="order-action-btn">
                  <a href="" className="theme-primary-btn order-btn">Payment</a>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-page-right">
            <div className="card-item priceDetails">
              <div className="top-heading">
                <h4>Price Details</h4>
              </div>
              <div className="priceDetails-body">
                <ul>
                  <li>
                    <p>Subtotal</p>
                    <h5>$3332.38</h5>
                  </li>
                  <li>
                    <p>Shipping</p>
                    <h5>Free</h5>
                  </li>
                  {/* <li>
                    <button type="button" className="apply-code-btn">Add coupon code <img src="/images/arow01.svg" alt=""/></button>
                  </li> */}
                </ul>
              </div>
              <div className="priceDetails-footer">
                <h4>Total Amount</h4>
                <h4 className="amount-value">$3332.38</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
