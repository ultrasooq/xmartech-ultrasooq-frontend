import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useCreateIntent } from "@/apis/queries/orders.queries";
import { useToast } from "@/components/ui/use-toast";

type PaymentFormProps = {
  onCreateOrder: (paymentType: string, paymentIntent: string) => void;
  calculateTotalAmount: () => void;
  isLoading: boolean;
  onManageAmount: (advanceAmount: string) => void;
};

// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51QuptGPQ2VnoEyMPay2u4FyltporIQfMh9hWcp2EEresPjx07AuT4lFLuvnNrvO7ksqtaepmRQHfYs4FLia8lIV500i83tXYMR');

const PaymentForm: React.FC<PaymentFormProps> = ({
  onCreateOrder,
  calculateTotalAmount,
  isLoading,
  onManageAmount
}) => {

  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const createIntent = useCreateIntent();
  const [name, setName] = useState("");
  const [clientSecret, setClientSecret] = useState(""); // State to store response data 
  // const [paymentIntentId, setPaymentIntentId] = useState(null); // State to store response data 
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false); // Track if card details are valid
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(""); // Temporary input value
  const [advanceAmount, setAdvanceAmount] = useState(""); // Stored amount when "Save" is clicked
  
    const handleCardPayment = async (paymentType: string) => {
      alert(paymentType)
      setSelectedPaymentType(paymentType); // Single state to track selected type
      if(paymentType === 'direct') handleIntentCreate()
    }

    const handleIntentCreate = async () => {
      const data = {
        amount: selectedPaymentType === 'direct' ? calculateTotalAmount() :Number(inputValue),
        paymentMethod: "CARD"
      }
  
      // console.log(data); return
      // if(data.amount !== 0){
        const response = await createIntent.mutateAsync(data);
  
        if (response?.data) {
          // console.log(response.data);
          setClientSecret(response.data?.client_secret); // Set response data in state
          // setPaymentIntentId(response.data?.id); // Set response data in state
          // router.push("/login");
        }
      // }
      
    }


  // Handle form submission for Stripe payment
  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsCardLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found");
      setIsCardLoading(false);
      return;
    }

    try {
  
      // Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name },
        },
      });

      if (result.error) {
        console.error("Payment Error:", result.error.message);
        toast({
          title: "Payment Error:",
          description: result.error.message,
          variant: "danger",
        });
      } else {
        console.log("Payment Success:", result.paymentIntent);
        toast({
          title: "Payment Success:",
          description: "Payment Sucessfully done",
          variant: "danger",
        });
        onCreateOrder("CARD", result.paymentIntent.id);
      }
    } catch (error) {
      console.error("Payment Failed", error);
    }
  };

   // Handle card input change
   const handleCardChange = (event: any) => {
    setCardComplete(event.complete); // event.complete is true when the card details are valid
  };

  
  return (
    <div className="cart-page-left">
      <div className="order_accordion w-full">
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Cash</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="w-full bg-white">
                <div className="bodyPart">
                  <div className="card-item card-payment-form px-5 pb-5 pt-3">
                    <div className="flex flex-wrap">
                      <div className="mb-4 w-full space-y-2">
                        <p>
                          Exercitation in fugiat est ut ad ea cupidatat ut in
                          cupidatat occaecat ut occaecat
                        </p>
                      </div>
                    </div>
                    <div className="order-action-btn half_button">
                      <Button
                       onClick={() => onCreateOrder('CASH', "")}
                        disabled={isLoading}
                        className="theme-primary-btn order-btn"
                      >
                        Confirm Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading onClick={() => handleCardPayment('direct')}>
              <AccordionItemButton>direct payment</AccordionItemButton>
            </AccordionItemHeading>
            {selectedPaymentType === 'direct' ? 
            <AccordionItemPanel>
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
                         type="text"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         placeholder="Card Holder Name"
                          className="theme-form-control-s1 flex h-9 w-full rounded-md border
           border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
           file:border-0 file:bg-transparent file:text-sm file:font-medium 
           placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
           disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    {/* <div className="mb-4 w-full space-y-2">
                      <label
                        className="text-sm font-medium 
        leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
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
                          Valid through (MM/YY)
                        </label>
                        <div className="relative">
                          <input
                            name="validThrough"
                            value={formData.validThrough}
                            onChange={handleInputChange}
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
                           name="cvv"
                           value={formData.cvv}
                           onChange={handleInputChange}
                           className="theme-form-control-s1 flex h-9 w-full rounded-md 
          border border-input bg-transparent px-3 py-1 text-sm
           shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
            file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
            focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    </div> */}
                     <div className="mb-4 w-full space-y-2" style={{width: '650px'}}>
              <label className="text-sm font-medium">Card Details</label>
              <div className="theme-form-control-s1 border p-2">
                <CardElement options={{ hidePostalCode: true }} onChange={handleCardChange} />
              </div>
            </div>
                  </div>
                  <div className="order-action-btn">
                  <Button onClick={handleSubmit} disabled={isLoading || !stripe || !name.trim() || !cardComplete} className="theme-primary-btn order-btn">
                {isLoading ? "Processing..." : "Confirm Payment"}
              </Button>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItemPanel>
          : null}
          </AccordionItem>

          
          <AccordionItem>
            <AccordionItemHeading onClick={() => handleCardPayment('advance')}>
              <AccordionItemButton>advance % payment</AccordionItemButton>
            </AccordionItemHeading>
            {selectedPaymentType === 'advance' ? 
            <AccordionItemPanel>
              <div className="w-full bg-white">
                <div className="bodyPart">
                  <div className="card-item card-payment-form px-5 pb-5 pt-3">
                  <div className="w-full">
                      <Button className="theme-primary-btn order-btn mt-2 h-14 w-full p-4">
                        attached transaction receipt
                      </Button>
                      <div className="mt-3 flex w-auto flex-wrap rounded-sm bg-[#B3B3B3] px-10 py-7">
                        <div className="relative mb-3 w-[80%]">
                          <label className="mb-2 text-lg font-semibold text-black">
                            Payment Amount($):
                          </label>
                          <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Allow empty value
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
                            onClick={() => {
                              setAdvanceAmount(inputValue);
                              onManageAmount(inputValue);
                              handleIntentCreate();
                            }} // Set saved amount 
                            disabled={!inputValue} // Disable if inputValue is empty
                            className="flex h-[50px] w-[150px] items-center justify-center rounded-sm bg-[#FFC7C2] p-3 text-center text-lg font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setInputValue(""); // Clear input field
                              setAdvanceAmount(""); // Clear saved amount
                              onManageAmount("")
                            }}
                            className="flex h-[50px] w-[150px] items-center justify-center rounded-sm bg-[#FFC7C2] p-3 text-center text-lg font-semibold text-black"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>


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
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Card Holder Name"
                      className="theme-form-control-s1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1"
                    />
                        </div>
                      </div>
                      <div className="mb-4 w-full space-y-2" style={{width: '650px'}}>
                        <label className="text-sm font-medium">Card Details</label>
                        <div className="theme-form-control-s1 border p-2">
                          <CardElement />
                        </div>
                      </div>
                    </div>
                    <div className="order-action-btn">
                    <div className="order-action-btn">
                    <Button onClick={handleSubmit} disabled={isLoading || !stripe} className="theme-primary-btn order-btn">
                  {isLoading ? "Processing..." : "Confirm Payment"}
                </Button>
                    </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
            : null}
          </AccordionItem> 

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>pay it for me</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="w-full bg-white">
                <div className="bodyPart">
                  <div className="card-item card-payment-form px-5 pb-5 pt-3">
                    <div className="flex flex-wrap">
                      <div className="mb-4 w-full space-y-2">
                        <p>
                          Exercitation in fugiat est ut ad ea cupidatat ut in
                          cupidatat occaecat ut occaecat
                        </p>
                      </div>
                    </div>
                    <div className="order-action-btn half_button">
                      <Button
                        onClick={() => onCreateOrder('payItForMe', "")}
                        disabled={isLoading}
                        className="theme-primary-btn order-btn"
                      >
                        Confirm Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Installments</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="w-full bg-white">
                <div className="bodyPart">
                  <div className="card-item card-payment-form px-5 pb-5 pt-3">
                    <div className="flex flex-wrap">
                      <div className="mb-4 w-full space-y-2">
                        <p>
                          Exercitation in fugiat est ut ad ea cupidatat ut in
                          cupidatat occaecat ut occaecat
                        </p>
                      </div>
                    </div>
                    <div className="order-action-btn half_button">
                      <Button
                        onClick={() => onCreateOrder('installment', "")}
                        disabled={isLoading}
                        className="theme-primary-btn order-btn"
                      >
                        Confirm Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PaymentForm;
