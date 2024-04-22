import { Button } from "@/components/ui/button";
import React from "react";

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
