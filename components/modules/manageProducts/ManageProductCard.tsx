import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type ManageProductCardProps = {
  selectedIds?: number[];
  onSelectedId?: (args0: boolean | string, args1: number) => void;
  id: number;
};

const ManageProductCard: React.FC<ManageProductCardProps> = ({
  selectedIds,
  onSelectedId,
  id,
}) => {
  return (
    <div className="existing-product-add-item">
      <div className="existing-product-add-box">
        <div className="existing-product-add-box-row">
          <div className="leftdiv">
            <div className="image-container">
              <div className="existing_product_checkbox">
                <Checkbox
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                  checked={selectedIds?.includes(id)}
                  onCheckedChange={(checked) => onSelectedId?.(checked, id)}
                />
                <img src="/images/hide.png" alt="" />
              </div>
              <img src="/images/ts-6.png" alt="" />
            </div>
            <div className="text-container">
              <h3>
                <a href="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                    <label className="text-col" htmlFor="setUpPriceCheck">
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
                    <label className="text-col" htmlFor="setUpPriceCheck">
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
  );
};

export default ManageProductCard;
