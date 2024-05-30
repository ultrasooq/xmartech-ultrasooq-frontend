import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ManageProductAside = () => {
  return (
    <aside className="manage_product_list">
      <div className="manage_product_list_wrap">
        <h2>Manage the product</h2>
        <div className="all_select_button">
          <button>Select All</button>
          <button>Clean Select</button>
        </div>
        <div className="select_main_wrap">
          <div className="select_type">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field">
              <select>
                <option>Select Brand</option>
                <option>New</option>
              </select>
            </div>
          </div>
          <div className="select_type">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field">
              <button>Hide all Selected</button>
            </div>
          </div>
          <div className="select_type">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field">
              <input
                type="text"
                placeholder="Ask for the Stock"
                className="form-control"
              />
            </div>
          </div>
          <div className="select_type">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field">
              <input
                type="text"
                placeholder="Ask for the Price"
                className="form-control"
              />
            </div>
          </div>
          <div className="select_type">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field">
              <select>
                <option>Customer Type</option>
                <option>Everyone</option>
              </select>
            </div>
          </div>
          <div className="select_type">
            <div className="select_type_checkbox">
              <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
            </div>
            <div className="select_type_field plus_minus_select">
              <button>Delivery After</button>
              <div className="theme-inputValue-picker-upDown">
                <button type="button" className="upDown-btn minus">
                  <img src="/images/minus-icon-dark.svg" alt=""></img>
                </button>
                <input type="number" className="form-control" value="0" />
                <button type="button" className="upDown-btn plus">
                  <img src="/images/plus-icon-dark.svg" alt=""></img>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ManageProductAside;
