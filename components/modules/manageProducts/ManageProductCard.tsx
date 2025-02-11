import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import Image from "next/image";
import validator from "validator";
// import { cn } from "@/lib/utils";
import EditIcon from "@/public/images/edit-rfq.png";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { useRemoveProduct, useUpdateProductStatus, useUpdateSingleProduct } from "@/apis/queries/product.queries";
import CounterTextInputField from "../createProduct/CounterTextInputField";
import { useToast } from "@/components/ui/use-toast";
import { Dialog } from "@/components/ui/dialog";
import AddProductContent from "../products/AddProductContent";

type ManageProductCardProps = {
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  id: number;
  productId: number;
  status: string;
  askForPrice: string;
  askForStock: string;
  productImage: string | null;
  productName: string;
  productPrice: string;
  offerPrice: string;
  deliveryAfter: number;
  productLocation: string;
  stock: number;
  consumerType: string;
  sellType: string;
  timeOpen: number | null;
  timeClose: number | null;
  vendorDiscount: number | null;
  consumerDiscount: number | null;
  minQuantity: number | null;
  maxQuantity: number | null;
  minCustomer: number | null;
  maxCustomer: number | null;
  minQuantityPerCustomer: number | null;
  maxQuantityPerCustomer: number | null;
  productCondition: string;
  onRemove: (id: number) => void; // Ensure onRemove function is typed properly
};

const ManageProductCard: React.FC<ManageProductCardProps> = ({
  selectedIds,
  onSelectedId,
  id,
  productId,
  status: initialStatus,
  askForPrice,
  askForStock,
  productImage,
  productName,
  productPrice: initialProductPrice,
  offerPrice: initialPrice,
  deliveryAfter: initialDelivery,
  productLocation,
  stock: initialStock,
  consumerType: initialConsumerType,
  sellType: initialSellType,
  timeOpen: initialTimeOpen,
  timeClose: initialTimeClose,
  vendorDiscount: initialVendorDiscount,
  consumerDiscount: initialConsumerDiscount,
  minQuantity: initialMinQuantity,
  maxQuantity: initialMaxQuantity,
  minCustomer: initialMinCustomer,
  maxCustomer: initialMaxCustomer,
  minQuantityPerCustomer: initialMinQuantityPerCustomer,
  maxQuantityPerCustomer: initialMaxQuantityPerCustomer,
  productCondition: initialCondition,
  onRemove 
}) => {

  const { toast } = useToast();

  // Status update part

  const [status, setStatus] = useState(initialStatus); // Local state for status
  const statusUpdate = useUpdateProductStatus(); // Get the mutation function

  const updateStatus = async (status: string) => {
    try {
      const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const response = await statusUpdate.mutateAsync({
        productPriceId: id,
        status: newStatus,
      });

      if (response.status) {
        setStatus(newStatus); // Update local state to reflect the new status
        toast({
          title: "Status Update",
          description: "Status updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Status Update",
          description: "Oops! Something went wrong",
          variant: "danger",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "danger",
      });
    }
  };

  // Stock manage part

  const [stock, setStock] = useState(initialStock);
  const decreaseStock = () => {
    setStock((prevStock) => Math.max(prevStock - 1, 0)); // Prevent going below 0
  };

  const increaseStock = () => {
    setStock((prevStock) => Math.min(prevStock + 1, 1000)); // Prevent exceeding 200
  };

  // Price  part

 const [offerPrice, setPrice] = useState<number>(Number(initialPrice)); // Ensure it's a number
 const [productPrice, setProductPrice] = useState<number>(Number(initialProductPrice)); // Ensure it's a number
  const decreasePrice = () => {
    setPrice((prevPrice) => Math.max(Number(prevPrice) - 1, 0)); // Convert prevPrice to number before subtracting
    setProductPrice((prevPrice) => Math.max(Number(prevPrice) - 1, 0)); // Convert prevPrice to number before subtracting
  };

  const increasePrice = () => {
    setPrice((prevPrice) => Math.min(prevPrice + 1, 1000000)); // Prevent exceeding 200
    setProductPrice((prevPrice) => Math.min(prevPrice + 1, 1000000)); // Prevent exceeding 200
  };

  // Product condition part && customer type && sell type

  const [productCondition, setCondition] = useState<string>(initialCondition); 
  const [consumerType, setConsumer] = useState<string>(initialConsumerType); 
  const [sellType, setSell] = useState<string>(initialSellType); 

   // set Deliver After

 const [deliveryAfter, setDelivery] = useState<number>(Number(initialDelivery)); // Ensure it's a number
 const decreaseDeliveryDay = () => {
  setDelivery((prevDay) => Math.max(Number(prevDay) - 1, 0)); // Convert prevPrice to number before subtracting
 };

 const increaseDeliveryDay = () => {
  setDelivery((prevDay) => Math.min(prevDay + 1, 50)); // Prevent exceeding 200
 };

 // set Time open & close

 const [timeOpen, setTimeOpen] = useState<number>(Number(initialTimeOpen)); 
 const decreaseTimeOpen = () => {
  setTimeOpen((prevDay) => Math.max(Number(prevDay) - 1, 0)); 
 };

 const increaseTimeOpen = () => {
  setTimeOpen((prevDay) => Math.min(prevDay + 1, 50)); 
 };

 const [timeClose, setTimeClose] = useState<number>(Number(initialTimeClose)); 
 const decreaseTimeClose = () => {
  setTimeClose((prevDay) => Math.max(Number(prevDay) - 1, 0)); 
 };

 const increaseTimeClose = () => {
  setTimeClose((prevDay) => Math.min(prevDay + 1, 50)); 
 };

//  Remaining part 

const [vendorDiscount, setVendor] = useState<number>(Number(initialVendorDiscount)); 
 const decreaseVendorDiscount = () => {
  setVendor((prevDayDiscount) => Math.max(Number(prevDayDiscount) - 1, 0)); 
 };

 const increaseVendorDiscount = () => {
  setVendor((prevDayDiscount) => Math.min(prevDayDiscount + 1, 50)); 
 };

 const [consumerDiscount, setConsumerDiscount] = useState<number>(Number(initialConsumerDiscount)); 
 const decreaseConsumerDiscount = () => {
  setConsumerDiscount((prevDayDiscount) => Math.max(Number(prevDayDiscount) - 1, 0)); 
 };

 const increaseConsumerDiscount = () => {
  setConsumerDiscount((prevDayDiscount) => Math.min(prevDayDiscount + 1, 50)); 
 };

 const [minQuantity, setMinQuantity] = useState<number>(Number(initialMinQuantity)); 
 const decreaseMinQuantity = () => {
  setMinQuantity((prevDayQuantity) => Math.max(Number(prevDayQuantity) - 1, 0)); 
 };

 const increaseMinQuantity = () => {
  setMinQuantity((prevDayQuantity) => Math.min(prevDayQuantity + 1, 50)); 
 };

 const [maxQuantity, setMaxQuantity] = useState<number>(Number(initialMaxQuantity)); 
 const decreaseMaxQuantity = () => {
  setMaxQuantity((prevDayQuantity) => Math.max(Number(prevDayQuantity) - 1, 0)); 
 };

 const increaseMaxsQuantity = () => {
  setMaxQuantity((prevDayQuantity) => Math.min(prevDayQuantity + 1, 50)); 
 };

 const [minCustomer, setMinCustomer] = useState<number>(Number(initialMinCustomer)); 
 const decreaseMinCustomer = () => {
  setMinCustomer((prevCustomer) => Math.max(Number(prevCustomer) - 1, 0)); 
 };

 const increaseMinsCustomer = () => {
  setMinCustomer((prevCustomer) => Math.min(prevCustomer + 1, 50)); 
 };

 const [maxCustomer, setMaxCustomer] = useState<number>(Number(initialMaxCustomer)); 
 const decreaseMaxCustomer = () => {
  setMaxCustomer((prevCustomer) => Math.max(Number(prevCustomer) - 1, 0)); 
 };

 const increaseMaxsCustomer = () => {
  setMaxCustomer((prevCustomer) => Math.min(prevCustomer + 1, 50)); 
 };

 const [minQuantityPerCustomer, setMinQuantityCustomer] = useState<number>(Number(initialMinQuantityPerCustomer)); 
 const decreaseMinQuantityCustomer = () => {
  setMinQuantityCustomer((prevDayQuantity) => Math.max(Number(prevDayQuantity) - 1, 0)); 
 };

 const increaseMinQuantityCustomer = () => {
  setMinQuantityCustomer((prevDayQuantity) => Math.min(prevDayQuantity + 1, 50)); 
 };

 const [maxQuantityPerCustomer, setMaxQuantityCustomer] = useState<number>(Number(initialMaxQuantityPerCustomer)); 
 const decreaseMaxQuantityCustomer = () => {
  setMaxQuantityCustomer((prevDayQuantity) => Math.max(Number(prevDayQuantity) - 1, 0)); 
 };

 const increaseMaxQuantityCustomer = () => {
  setMaxQuantityCustomer((prevDayQuantity) => Math.min(prevDayQuantity + 1, 50)); 
 };


  // call update single product

  const productUpdate = useUpdateSingleProduct(); // Get the mutation function

  const handleUpdate = async () => {
   
    try {
      const response = await productUpdate.mutateAsync({
        productPriceId: id,
        stock,
        askForPrice,
        askForStock,
        offerPrice,
        productPrice,
        status,
        productCondition,
        consumerType,
        sellType,
        deliveryAfter,
        timeOpen,
        timeClose,
        vendorDiscount,
        consumerDiscount,
        minQuantity,
        maxQuantity,
        minCustomer,
        maxCustomer,
        minQuantityPerCustomer,
        maxQuantityPerCustomer
      });

      if (response.status) {
        toast({
          title: "Product Update",
          description: "The product has been successfully updated.",
          variant: "success",
        });
      } else {
        toast({
          title: "Product Update",
          description: "Oops! Something went wrong",
          variant: "danger",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "danger",
      });
    }
  };

  // For Add new product
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleAddProductModal = () =>
    setIsAddProductModalOpen(!isAddProductModalOpen);

  // For remove product
  const productRemove = useRemoveProduct(); // Get the mutation function
  const handleRemoveProduct = async() => {
    try {
      const response = await productRemove.mutateAsync({
        productPriceId: id,
      });

      if (response.status) {
        toast({
          title: "Product Remove",
          description: "The product has been successfully removed.",
          variant: "success",
        });
         // Call the function to remove the product from the UI
         onRemove(id);

      } else {
        toast({
          title: "Product Remove",
          description: "Oops! Something went wrong",
          variant: "danger",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove product",
        variant: "danger",
      });
    }
  }

  // Function to reset all values to initial state
const handleReset = () => {
  setStock(initialStock);
  setPrice(Number(initialPrice));
  setDelivery(Number(initialDelivery));
  setConsumer(initialConsumerType);
  setSell(initialSellType);
  setCondition(initialCondition);
  setTimeOpen(Number(initialTimeOpen));
  setTimeClose(Number(initialTimeClose));
  setVendor(Number(initialVendorDiscount));
  setConsumerDiscount(Number(initialConsumerDiscount));
  setMinQuantity(Number(initialMinQuantity));
  setMaxQuantity(Number(initialMaxQuantity));
  setMinCustomer(Number(initialMinCustomer));
  setMaxCustomer(Number(initialMaxCustomer));
  setMinQuantityCustomer(Number(initialMinQuantityPerCustomer));
  setMaxQuantityCustomer(Number(initialMaxQuantityPerCustomer));
};


  return (
    <>
    <div className="existing-product-add-item">
      <div className="existing-product-add-box">
        <div className="existing-product-add-box-row">
          <div className="leftdiv">
            <div className="image-container">
              <div className="existing_product_checkbox z-10">
                <Checkbox
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                  checked={selectedIds?.includes(id)}
                  onCheckedChange={(checked) => onSelectedId?.(checked, id)}
                />
              </div>
              <div className="existing_product_checkbox left-[30px] z-10 text-[20px] text-gray-500"
              onClick={() => updateStatus(status)} // Pass function reference correctly
              >
               {status === "ACTIVE" ? <IoIosEye /> : <IoIosEyeOff />}
                 
              </div>
              <div className="relative mx-auto h-[100%] w-[100%]">
                <Image
                  src={
                    productImage && validator.isURL(productImage)
                      ? productImage
                      : PlaceholderImage
                  }
                  alt="product-image"
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  className="object-contain"
                  blurDataURL="/images/product-placeholder.png"
                  placeholder="blur"
                />
              </div>
              {/* TODO: remove for now */}
              {/* <div
                className={cn(
                  status === "ACTIVE" ? "bg-green-500" : "bg-red-500",
                  "absolute right-0 top-0 rounded-md px-2 py-1 shadow-md",
                )}
              >
                <p className="text-xs font-semibold text-white">{status}</p>
              </div> */}
              {productCondition === "OLD" ? (
                <div className="absolute right-0 top-0 z-10">
                  <Link href={`/product/${productId}?productPriceId=${id}`}>
                    <Image
                      src={EditIcon}
                      alt="review-dot-icon"
                      height={21}
                      width={21}
                    />
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="text-container">
              <h3>{productName || "-"}</h3>
            </div>
            <div className="form-container">
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                {/* For Stock */}
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <input type="checkbox" className="h-[20px] w-[20px]"
                     checked={askForStock === 'false'} // Checkbox is checked when askForStock is false
                      />
                    <div className="text-[12px] font-semibold">Stock</div>
                  </div>
                  {askForStock === "false" ? (
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc] disabled:text-[#999]"
                    onClick={decreaseStock}
                    >
                      -
                    </a>
                    <input
                      type="text"
                      value={initialStock || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                      readOnly // Prevent manual editing
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                     onClick={increaseStock}
                     >
                      +
                    </a>
                  </div>
                  ) : (
                    <div className="text-center text-[16px] font-semibold text-gray-500">
                      Ask for Stock
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <input type="checkbox" className="h-[20px] w-[20px]"
                    checked={askForPrice === 'false'} // Checkbox is checked when askForStock is false
                     />
                    <div className="text-[12px] font-semibold">Price</div>
                  </div>
                  {askForStock === "false" ? (
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreasePrice} >
                      -
                    </a>
                    <input
                      type="text"
                      value={initialPrice || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]" onClick={increasePrice}>
                      +
                    </a>
                  </div>
                   ) : (
                    <div className="text-center text-[16px] font-semibold text-gray-500">
                      Ask for Price
                    </div>
                  )}
                </div>

                {/* <div className="space-y-1 rounded bg-[#f1f1f1] p-1">
                  <div className="text-with-checkagree">
                    <label className="text-col" htmlFor="setUpPriceCheck">
                      Stock
                    </label>
                  </div>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {askForStock === "true"
                        ? "Ask for Stock"
                        : stock
                          ? stock
                          : "-"}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 rounded bg-[#f1f1f1] p-1">
                  <div className="text-with-checkagree">
                    <label className="text-col" htmlFor="setUpPriceCheck">
                      Price
                    </label>
                  </div>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {askForPrice === "true"
                        ? "Ask for the Price"
                        : offerPrice || "-"}
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">Product Condition</div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <select className="m-0 w-[100%] text-center focus:border-none focus:outline-none"
                    value={initialCondition} // Bind the selected value to the state
                    onChange={(e) => setCondition(e.target.value)} // Update the state when the value changes
                    >
                      <option value={'NEW'}>New</option>
                      <option value={'OLD'}>Old</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Deliver After
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                     onClick={decreaseDeliveryDay}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialDelivery || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]" onClick={increaseDeliveryDay}>
                      +
                    </a>
                  </div>
                </div>
                {/* <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <Label>Deliver After</Label>
                  <span>
                    {deliveryAfter
                      ? `${deliveryAfter === 1 ? `${deliveryAfter} day` : `${deliveryAfter} days`}`
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <Label>Product Location</Label>
                  <span>{productLocation || "-"}</span>
                </div> */}
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <button
                    type="button"
                    className="flex h-[50px] w-full items-center justify-center border-none bg-[#5a82ca] text-[12px] text-white"
                    onClick={handleUpdate} // Attach the handleUpdate function here
                  >
                    Update
                  </button>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <button
                    type="button"
                    className="flex h-[50px] w-full items-center justify-center border-none bg-[#5a82ca] text-[12px] text-white"
                    onClick={handleAddProductModal}
                  >
                    Add New
                  </button>
                </div>
              </div>
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <button
                    type="button"
                    className="flex h-[50px] w-full items-center justify-center border-none bg-[#d56d26] text-[12px] text-white"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <button
                    type="button"
                    className="flex h-[50px] w-full items-center justify-center border-none bg-[#d56d26] text-[12px] text-white"
                    onClick={handleRemoveProduct}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rightdiv">
            <div className="form-container">
              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">Time Open</div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]" onClick={decreaseTimeOpen}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialTimeOpen || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseTimeOpen}>
                      +
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">Time Close</div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseTimeClose}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialTimeClose || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseTimeClose}>
                      +
                    </a>
                  </div>
                </div>

                {/* <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label>Time Open</label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{timeOpen || "-"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label>Time Close</label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{timeClose || "-"}</span>
                  </div>
                </div> */}
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex w-[40%] items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Customer Type
                    </div>
                  </div>
                  <div className="flex w-[60%] items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <select className="m-0 w-[100%] text-center text-[12x] focus:border-none focus:outline-none"
                     value={initialConsumerType} // Bind the selected value to the state
                     onChange={(e) => setConsumer(e.target.value)} // Update the state when the value changes
                     >
                      <option value={'CONSUMER'}>Consumer</option>
                      <option value={'VENDORS'}>Vendors</option>
                      <option value={'EVERYONE'}>Everyone</option>
                    </select>
                  </div>
                </div>

                {/* <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Consumer Type
                  </label>
                  <span>{consumerType || "-"}</span>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Sell Type
                  </label>
                  <span>{sellType || "-"}</span>
                </div> */}
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex w-[40%] items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">Sell Type</div>
                  </div>
                  <div className="flex w-[60%] items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <select className="m-0 w-[100%] text-center text-[12x] focus:border-none focus:outline-none"
                     value={initialSellType} // Bind the selected value to the state
                     onChange={(e) => setSell(e.target.value)} // Update the state when the value changes
                     >
                      <option value={'NORMALSELL'}>Normal Sell</option>
                      <option value={'BUYGROUP'}>By Group</option>
                      <option value={'OTHERS'}>Others</option>
                      <option value={'EVERYONE'}>Every One</option>
                      
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Vendor Discount
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseVendorDiscount}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialVendorDiscount || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseVendorDiscount}>
                      +
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Consumer Discount
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseConsumerDiscount}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialConsumerDiscount || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseConsumerDiscount}>
                      +
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Min Quantity
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseMinQuantity}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialMinQuantity || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseMinQuantity}>
                      +
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Max Quantity
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseMaxQuantity}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialMaxQuantity || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseMaxsQuantity}>
                      +
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Min Customer
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseMinCustomer}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialMinCustomer || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseMinsCustomer}>
                      +
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Max Customer
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]"
                    onClick={decreaseMaxCustomer}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialMaxCustomer || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseMaxsCustomer}>
                      +
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Min Qty Consumer
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]" 
                    onClick={decreaseMinQuantityCustomer}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialMinQuantityPerCustomer || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]"
                    onClick={increaseMinQuantityCustomer}>
                      +
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1">
                  <div className="flex items-center justify-start gap-2 text-black">
                    <div className="text-[12px] font-semibold">
                      Max Qty Consumer
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center rounded border-[1px] border-[#EBEBEB] border-[solid] p-2">
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold text-[#ccc]" 
                    onClick={decreaseMaxQuantityCustomer}>
                      -
                    </a>
                    <input
                      type="text"
                      value={initialMaxQuantityPerCustomer || 0}
                      className="m-0 w-[60%] text-center focus:border-none focus:outline-none"
                    />
                    <a href="javascript:void(0)" className="m-0 w-[20%] text-[24px] font-semibold  text-[#ccc]" 
                    onClick={increaseMaxQuantityCustomer}>
                      +
                    </a>
                  </div>
                </div>
              </div>

              {/* <div className="mb-2 grid w-full grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2">
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Vendor Discount
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{vendorDiscount ? `${vendorDiscount}%` : "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Consumer Discount
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>
                      {consumerDiscount ? `${consumerDiscount}%` : "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Min Quantity
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{minQuantity || "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Max Quantity
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{maxQuantity || "-"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Min Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{minCustomer || "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Max Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{maxCustomer || "-"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Min Qty Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{minQuantityPerCustomer || "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap space-y-1 rounded bg-[#f1f1f1] p-1">
                  <label className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Max Qty Consumer
                  </label>
                  <div className="theme-inputValue-picker-upDown">
                    <span>{maxQuantityPerCustomer || "-"}</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog open={isAddProductModalOpen} onOpenChange={handleAddProductModal}>
    <AddProductContent />
    </Dialog>
    </>
  );
  
};

export default ManageProductCard;
