import { DialogTitle } from "@/components/ui/dialog";
import React from "react";

const AddressForm = () => {
  return (
    <>
      <div className="modal-header">
        <DialogTitle className="text-center text-xl font-bold">
          Add New Address
        </DialogTitle>
      </div>
      <div className="card-item card-payment-form px-5 pb-5 pt-3">
        <div className="flex flex-wrap">
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pincode
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter Pincode"
                />
              </div>
            </div>
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                locality
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter locality"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 w-full space-y-2">
            <label
              className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Address (Area and Street)
            </label>
            <div className="relative">
              <input
                className="theme-form-control-s1 flex h-9 w-full rounded-md border
               border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors 
               file:border-0 file:bg-transparent file:text-sm file:font-medium 
               placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
               disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter Address (Area and Street)"
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                City/District/Town
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter City/District/Town"
                />
              </div>
            </div>
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Select</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Landmark (Optional)
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter Landmark"
                />
              </div>
            </div>
            <div className="mb-4 space-y-2 ">
              <label
                className="text-sm font-medium 
            leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Alternate Phone (Optional)
              </label>
              <div className="relative">
                <input
                  className="theme-form-control-s1 flex h-9 w-full rounded-md 
              border border-input bg-transparent px-3 py-1 text-sm
               shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm
                file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter Alternate Phone (Optional)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="order-action-btn">
          <a href="" className="theme-primary-btn order-btn">
            Save and deliver here
          </a>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
