import { Button } from "@/components/ui/button";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PaymentFormProps = {
  onCreateOrder: (paymentType: string) => void;
  isLoading: boolean;
};

const PaymentForm: React.FC<PaymentFormProps> = ({
  onCreateOrder,
  isLoading,
}) => {
  return (
    <div className="cart-page-left">
      <Tabs className="flex w-full flex-wrap">
        <TabsList className="flex h-auto w-[50%] flex-col gap-3">
          <TabsTrigger
            value="cash"
            className="theme-primary-btn order-btn w-full p-3"
          >
            cash
          </TabsTrigger>
          <TabsTrigger
            value="diract-payment"
            className="theme-primary-btn order-btn w-full p-3"
          >
            diract payment
          </TabsTrigger>
          <TabsTrigger
            value="advance-payment"
            className="theme-primary-btn order-btn w-full p-3"
          >
            advance % payment
          </TabsTrigger>
          <TabsTrigger
            value="pay-me"
            className="theme-primary-btn order-btn w-full p-3"
          >
            pay it for me
          </TabsTrigger>
          <TabsTrigger
            value="installments"
            className="theme-primary-btn order-btn w-full p-3"
          >
            Installments
          </TabsTrigger>
        </TabsList>
        <div className="mt-3 w-full">
          <TabsContent value="cash" className="mt-0">
            <div className="w-full bg-white">
              <h2>cash</h2>
              <div className="order-action-btn">
                <Button
                  onClick={() => onCreateOrder('cash')}
                  disabled={isLoading}
                  className="theme-primary-btn order-btn"
                >
                  Payment
                </Button>
                  </div>
            </div>
          </TabsContent>
          <TabsContent value="diract-payment" className="mt-0">
            <div className="w-full bg-white">
              <div className="bodyPart">
                <div className="card-item card-payment-form px-5 pb-5 pt-3">
                  <div className="flex flex-wrap">
                    <div className="mb-4 w-full space-y-2">
                      <label
                        className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Card Holder name
                      </label>
                      <div className="relative">
                        <input
                          className="theme-form-control-s1 flex h-9 w-full rounded-md border
             border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
             file:border-0 file:bg-transparent file:text-sm file:font-medium 
             placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
             disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="card holder name"
                        />
                      </div>
                    </div>
                    <div className="mb-4 w-full space-y-2">
                      <label
                        className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          className="theme-form-control-s1 flex h-9
             w-full rounded-md border border-input bg-transparent px-3
              py-1 text-sm shadow-sm transition-colors file:border-0 
              file:bg-transparent file:text-sm file:font-medium 
              placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
              focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="card Number"
                          id=":Rj2nnjkq:-form-item"
                        />
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="mb-4 space-y-2 ">
                        <label
                          className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Valid through (MM/yY)
                        </label>
                        <div className="relative">
                          <input
                            className="theme-form-control-s1 flex h-9 w-full rounded-md 
            border border-input bg-transparent px-3 py-1 text-sm
             shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
              file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Valid through (MM/YY)"
                          />
                        </div>
                      </div>
                      <div className="mb-4 space-y-2 ">
                        <label
                          className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            className="theme-form-control-s1 flex h-9 w-full rounded-md 
            border border-input bg-transparent px-3 py-1 text-sm
             shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
              file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-action-btn">
                    <Button
                      onClick={() => onCreateOrder('directPayment')}
                      disabled={isLoading}
                      className="theme-primary-btn order-btn"
                    >
                      Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="advance-payment" className="mt-0">
            <div className="w-full bg-white">
              <div className="bodyPart">
                <div className="card-item card-payment-form px-5 pb-5 pt-3">
                  <div className="flex flex-wrap">
                    <div className="mb-4 w-full space-y-2">
                      <label
                        className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Card Holder name
                      </label>
                      <div className="relative">
                        <input
                          className="theme-form-control-s1 flex h-9 w-full rounded-md border
             border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
             file:border-0 file:bg-transparent file:text-sm file:font-medium 
             placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
             disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="card holder name"
                        />
                      </div>
                    </div>
                    <div className="mb-4 w-full space-y-2">
                      <label
                        className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          className="theme-form-control-s1 flex h-9
             w-full rounded-md border border-input bg-transparent px-3
              py-1 text-sm shadow-sm transition-colors file:border-0 
              file:bg-transparent file:text-sm file:font-medium 
              placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
              focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="card Number"
                          id=":Rj2nnjkq:-form-item"
                        />
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="mb-4 space-y-2 ">
                        <label
                          className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Valid through (MM/yY)
                        </label>
                        <div className="relative">
                          <input
                            className="theme-form-control-s1 flex h-9 w-full rounded-md 
            border border-input bg-transparent px-3 py-1 text-sm
             shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
              file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Valid through (MM/YY)"
                          />
                        </div>
                      </div>
                      <div className="mb-4 space-y-2 ">
                        <label
                          className="text-sm font-medium 
          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            className="theme-form-control-s1 flex h-9 w-full rounded-md 
            border border-input bg-transparent px-3 py-1 text-sm
             shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
              file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-action-btn">
                    <Button
                      onClick={() => onCreateOrder('advancePayment')}
                      disabled={isLoading}
                      className="theme-primary-btn order-btn"
                    >
                      Payment
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button className="theme-primary-btn order-btn mt-2 h-14 w-full p-4">
                      attached transaction receipt
                    </Button>
                    <div className="mt-3 flex w-auto flex-wrap rounded-sm bg-[#B3B3B3] px-10 py-7">
                      <div className="relative mb-3 w-[80%]">
                        <label className="mb-2 text-lg font-semibold text-black">
                          Payment Amount:
                        </label>
                        <input
                          type="text"
                          className="h-12 w-full rounded-[5px] bg-white px-4 py-3 text-lg text-black focus:shadow-none focus:outline-none"
                        />
                      </div>
                      <div className="relative mb-3 flex w-[20%] items-end justify-center text-center">
                        <input
                          type="file"
                          className="absolute left-0 top-0 h-full w-full opacity-0"
                        />
                        <img
                          src="/images/attach.png"
                          alt=""
                          className="h-auto w-[38px]"
                        />
                      </div>
                      <div className="mt-2 flex h-auto w-full items-center justify-center gap-5">
                        <button
                          type="button"
                          className="flex h-[50px] w-[150px] items-center justify-center rounded-sm bg-[#FFC7C2] p-3 text-center text-lg font-semibold text-black"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="flex h-[50px] w-[150px] items-center justify-center rounded-sm bg-[#FFC7C2] p-3 text-center text-lg font-semibold text-black"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pay-me" className="mt-0">
            <div className="w-full bg-white">
              <h2>pay it for me</h2>
            </div>
          </TabsContent>
          <TabsContent value="installments" className="mt-0">
            <div className="w-full bg-white">
              <h2>cash</h2>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PaymentForm;
