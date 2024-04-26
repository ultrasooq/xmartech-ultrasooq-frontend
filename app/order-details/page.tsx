"use client";
import React, { useState } from "react";
import { BiSolidCircle } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdHelpCenter } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const OrderDetailsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleToggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);

  return (
    <>
      <div className="my-order-main">
        <div className="container m-auto px-3">
          <div className="my-order-wrapper">
            <div className="right-div mx-w-100">
              <div className="my-order-lists for-delivery-address">
                <div className="my-order-item">
                  <div className="my-order-card">
                    <div className="delivery-address">
                      <div className="delivery-address-col deliveryAddress">
                        <h2>Delivery Address</h2>
                        <h3>Somnath Bhowmick</h3>
                        <address>
                          Nodakhali budge budge block 2, Howri Bhowmick Para,{" "}
                          <br /> pin - 743318
                        </address>
                        <p>
                          Phone Number <a href="tel: 1234567890">1234567890</a>
                        </p>
                        <h5>This order is also tracked by 1234567890</h5>
                      </div>
                      {/* <div className='delivery-address-col yourRewards'>
                        <h2>Your Rewards</h2>
                      </div> */}
                      <div className="delivery-address-col moreActions">
                        <h2>More actions</h2>
                        <figure className="downloadInvoice">
                          <figcaption>
                            <a
                              href="javascript"
                              className="downloadInvoice-btn theme-primary-btn"
                            >
                              <LiaFileInvoiceSolid /> Download Invoice
                            </a>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-order-item">
                  <div className="my-order-card">
                    <div className="delivery-address">
                      <div className="delivery-address-col mx-w-100">
                        <h2 className="mb-1">GST Number</h2>
                        <address>xyhfwytrwsfsf-T-web expo</address>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-order-item">
                  <div className="my-order-card">
                    <div className="my-order-box">
                      <figure>
                        <div className="image-container">
                          <img src="/images/iphone.png" alt=""></img>
                        </div>
                        <figcaption>
                          <h3>Iphone 5 (Black)</h3>
                          <p>Color: B.A.E Black</p>
                          <p className="mt-1">Seller: Mythsx-Retail</p>
                          <h4 className="mt-1">₹65,000</h4>
                        </figcaption>
                      </figure>
                      <div className="center-div">
                        <div className="order-delivery-progess-s1">
                          <ul>
                            <li className="complted">
                              <div className="orderStatusText">
                                Order Received
                              </div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">Fri, 29th Mar</div>
                            </li>
                            <li className="complted">
                              <div className="orderStatusText">
                                Order Confirmed
                              </div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">Fri, 29th Mar</div>
                            </li>
                            <li className="complted">
                              <div className="orderStatusText">Shipped</div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">Fri, 29th Mar</div>
                            </li>
                            <li className="current">
                              <div className="orderStatusText">
                                Out for delivery
                              </div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">Fri, 29th Mar</div>
                            </li>
                            <li>
                              <div className="orderStatusText">Delivered</div>
                              <div className="dot">
                                <small></small>
                              </div>
                              <div className="orderDateText">Fri, 29th Mar</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="right-info">
                        <a href="#" className="ratingLink mt-0">
                          <PiStarFill />
                          Rate & Review Product
                        </a>
                        <a href="#" className="ratingLink">
                          <MdHelpCenter />
                          Need Help?
                        </a>
                        <div className="more-actions">
                          <button
                            type="button"
                            className="theme-primary-btn update-status-btn"
                            onClick={handleToggleAddModal}
                          >
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="my-order-box">
                      <figure>
                        <div className="image-container">
                          <img src="/images/iphone.png" alt=""></img>
                        </div>
                        <figcaption>
                          <h3>Iphone 5 (Black)</h3>
                          <p>Color: B.A.E Black</p>
                          <p className="mt-1">Seller: Mythsx-Retail</p>
                          <h4 className="mt-1">₹65,000</h4>
                        </figcaption>
                      </figure>
                      <div className="center-div">
                        <h4>
                          Coupon Code - <strong>FLTBPIPGL7UBTF</strong>, claim
                          before Jun 30,2024
                        </h4>
                        <a href="#" className="ratingLink">
                          How To claim?
                        </a>
                      </div>
                      <div className="right-info">
                        <a href="#" className="ratingLink">
                          <PiStarFill />
                          Rate & Review Product
                        </a>
                        <a href="#" className="ratingLink">
                          <MdHelpCenter />
                          Need Help?
                        </a>
                      </div>
                    </div>
                    <p className="mt-2">Return policy ended on Mar 28</p>
                  </div>
                </div>

                <div className="my-order-item">
                  <div className="my-order-card">
                    <div className="cardTitle">Other Items in this order</div>
                    <div className="my-order-box">
                      <figure>
                        <div className="image-container">
                          <img src="/images/iphone.png" alt=""></img>
                        </div>
                        <figcaption>
                          <h3>Iphone 5 (Black)</h3>
                          <p>Color: B.A.E Black</p>
                          <p className="mt-1">Seller: Mythsx-Retail</p>
                          <h4 className="mt-1">₹65,000</h4>
                        </figcaption>
                      </figure>
                      <div className="right-info">
                        <h4>
                          <BiSolidCircle color="green" /> Delivered on Mar 21
                        </h4>
                        <p>Return policy ended on Mar 28</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={handleToggleAddModal}>
        <DialogContent className="customModal-s1">
          <DialogHeader className="modal-header">
            <DialogTitle className="modal-title">Update Delivery Status</DialogTitle>
          </DialogHeader>

          <div className="modal-body">
            <div className="form-content">
              <select className="custom-form-control-s1 select1">
                <option>Order Received</option>
                <option>Order Confirmed</option>
                <option>Shipped</option>
                <option>Out for delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="theme-primary-btn submit-btn">Save</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDetailsPage;
