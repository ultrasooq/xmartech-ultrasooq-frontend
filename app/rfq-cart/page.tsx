import React from "react";
import { MdOutlineChevronLeft } from "react-icons/md";

const RfqCartPage = () => {
  return <>
    <section className="rfq_section">
      <div className="sec-bg">
        <img src="/images/rfq-sec-bg.png" alt="" />
      </div>
      <div className="container mx-auto px-3">
        <div className="rfq-cart-wrapper">
          <div className="headerPart">
            <button type="button" className="back-btn"><MdOutlineChevronLeft /></button>
            <h3>RFQ Cart Items</h3>
          </div>
          <div className="bodyPart">
            <div className="add-delivery-card">
              <h3>Add Delivery Address & date</h3>
              <div className="input-row">
                <div className="input-col">
                  <div className="space-y-2 mb-4 w-full">
                    <label className="text-sm font-medium leading-none 
                    peer-disabled:cursor-not-allowed 
                    peer-disabled:opacity-70">Address</label>
                    <div className="relative">
                      <select className="
                      theme-form-control-s1 select1">
                        <option>Address</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="input-col">
                  <div className="space-y-2 mb-4 w-full">
                    <label className="text-sm font-medium leading-none 
                    peer-disabled:cursor-not-allowed 
                    peer-disabled:opacity-70">Date</label>
                    <div className="relative">
                      <input className="
                      theme-form-control-s1" placeholder="Select date" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rfq-cart-item-lists">
              <h4>RFQ Cart Items</h4>
              <div className="rfq-cart-item-ul">
                <div className="rfq-cart-item-li">
                  <figure>
                    <div className="image-container">
                      <img src="images/pro-6.png" alt="pro-6" />
                    </div>
                    <figcaption>
                      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.. </h5>
                      <label>Quantity</label>
                      <div className="qty-with-remove">
                        <div className="quantity">
                          <button className="adjust_field minus">-</button>
                          <input type="text" defaultValue={1} />
                          <button className="adjust_field plus">+</button>
                        </div>
                        <div className="remove_text">
                          <span>Remove</span>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                  <div className="price-info">
                    <h5>Price</h5>
                    <p>$332.38</p>
                  </div>
                </div>
                <div className="rfq-cart-item-li">
                  <figure>
                    <div className="image-container">
                      <img src="images/pro-6.png" alt="pro-6" />
                    </div>
                    <figcaption>
                      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.. </h5>
                      <label>Quantity</label>
                      <div className="qty-with-remove">
                        <div className="quantity">
                          <button className="adjust_field minus">-</button>
                          <input type="text" defaultValue={1} />
                          <button className="adjust_field plus">+</button>
                        </div>
                        <button type="button" className="remove_text">
                          Remove
                        </button>
                      </div>
                    </figcaption>
                  </figure>
                  <div className="price-info">
                    <h5>Price</h5>
                    <p>$332.38</p>
                  </div>
                </div>
                <div className="rfq-cart-item-li">
                  <figure>
                    <div className="image-container">
                      <img src="images/pro-6.png" alt="pro-6" />
                    </div>
                    <figcaption>
                      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.. </h5>
                      <label>Quantity</label>
                      <div className="qty-with-remove">
                        <div className="quantity">
                          <button className="adjust_field minus">-</button>
                          <input type="text" defaultValue={1} />
                          <button className="adjust_field plus">+</button>
                        </div>
                        <button type="button" className="remove_text">
                          Remove
                        </button>
                      </div>
                    </figcaption>
                  </figure>
                  <div className="price-info">
                    <h5>Price</h5>
                    <p>$332.38</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-action">
              <button type="button" className="theme-primary-btn submit-btn">Request For RFQ</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
};

export default RfqCartPage;
