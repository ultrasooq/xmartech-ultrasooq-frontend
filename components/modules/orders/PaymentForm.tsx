import { Button } from "@/components/ui/button";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PaymentFormProps = {
  onCreateOrder: () => void;
  isLoading: boolean;
};

const PaymentForm: React.FC<PaymentFormProps> = ({
  onCreateOrder,
  isLoading,
}) => {
  return (
    <div className="cart-page-left">
      <Tabs className="flex w-full">
        <TabsList className="flex h-auto w-[50%] flex-col">
          <TabsTrigger value="cash">cash</TabsTrigger>
          <TabsTrigger value="diract-payment">diract payment</TabsTrigger>
          <TabsTrigger value="advance-payment">advance % payment</TabsTrigger>
          <TabsTrigger value="pay-me">pay it for me</TabsTrigger>
          <TabsTrigger value="installments">Installments</TabsTrigger>
        </TabsList>
        <div className="w-[50%]">
          <TabsContent value="cash" className="mt-0">
            <div className="w-full bg-white">
              <h2>cash</h2>
            </div>
          </TabsContent>
          <TabsContent value="diract-payment" className="mt-0">
            <div className="w-full bg-white">
              <h2>diract payment</h2>
            </div>
          </TabsContent>
          <TabsContent value="advance-payment" className="mt-0">
            <div className="w-full bg-white">
              <h2>advance % payment</h2>
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
              onClick={onCreateOrder}
              disabled={isLoading}
              className="theme-primary-btn order-btn"
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
