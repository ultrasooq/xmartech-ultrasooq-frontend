"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleToggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);

  return (
    <div className="cart-page">
      <div className="container m-auto px-3">

        <div className="cart-page-wrapper">
          <div className="cart-page-left">
            <div className="bodyPart">
              <div className="card-item cart-items">
              <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>cart items</h3>
                  </div>
                </div>
               
                <div className="cart-item-lists">
                  <div className="cart-item-list-col">
                    <figure>
                      <div className="image-container">
                        <img src="/images/prodvr1.png" alt="" />
                      </div>
                      <figcaption>
                        <h4><a href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</a></h4>
                        <div className="custom-form-group">
                          <label>Quantity</label>
                          <div className="qty-up-down-s1-with-rgMenuAction">
                            <div className="qty-up-down-s1">
                              <input type="number" className="custom-form-control-s1"></input>
                              <button type="button" className="upDownBtn minus">
                                <img src="images/upDownBtn-minus.svg" alt="" />
                              </button>
                              <button type="button" className="upDownBtn plus">
                                <img src="images/upDownBtn-plus.svg" alt="" />
                              </button>
                            </div>
                            <ul className="rgMenuAction-lists">
                              <li>
                                <a>Remove</a>
                              </li>
                              <li>
                                <a>Move to wishlist</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                    <div className="right-info">
                      <h6>Price</h6>
                      <h5>$332.38</h5>
                    </div>
                  </div>
                  <div className="cart-item-list-col">
                    <figure>
                      <div className="image-container">
                        <img src="/images/prodvr1.png" alt="" />
                      </div>
                      <figcaption>
                        <h4><a href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</a></h4>
                        <div className="custom-form-group">
                          <label>Quantity</label>
                          <div className="qty-up-down-s1-with-rgMenuAction">
                            <div className="qty-up-down-s1">
                              <input type="number" className="custom-form-control-s1"></input>
                              <button type="button" className="upDownBtn minus">
                                <img src="images/upDownBtn-minus.svg" alt="" />
                              </button>
                              <button type="button" className="upDownBtn plus">
                                <img src="images/upDownBtn-plus.svg" alt="" />
                              </button>
                            </div>
                            <ul className="rgMenuAction-lists">
                              <li>
                                <a>Remove</a>
                              </li>
                              <li>
                                <a>Move to wishlist</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                    <div className="right-info">
                      <h6>Price</h6>
                      <h5>$332.38</h5>
                    </div>
                  </div>

                </div>
              </div>
              <div className="card-item selected-address">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Select Shipping address</h3>
                  </div>
                </div>
                <div className="selected-address-lists">
                  <div className="selected-address-item">
                    <div className="check-with-infocardbox">
                      <div className="check-col">
                        <input type="radio" id="addressSel1" name="addressSel" className="custom-radio-s1" />
                      </div>
                      <label htmlFor="addressSel1" className="infocardbox">
                        <div className="selectTag-lists">
                          <div className="selectTag">Home</div>
                        </div>
                        <div className="left-address-with-right-btn">
                          <div className="left-address">
                            <h4>John Doe</h4>
                            <ul>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/phoneicon.svg" alt="" /></span>
                                  <span className="text-container">+1 000 0000 0000</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/locationicon.svg" alt="" /></span>
                                  <span className="text-container">2207 Jericho Turnpike Commack North Dakota 11725</span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="right-action">
                            <div className="custom-hover-dropdown">
                              <button type="button" className="btn">
                                <img src="/images/custom-hover-dropdown-btn.svg" alt="" />
                              </button>
                              <div className="custom-hover-dropdown-menu">
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/edit.svg" alt="" />
                                  Edit</a>
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/trash.svg" alt="" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="selected-address-item">
                    <div className="check-with-infocardbox">
                      <div className="check-col">
                        <input type="radio" id="addressSel1" name="addressSel" className="custom-radio-s1" />
                      </div>
                      <label htmlFor="addressSel1" className="infocardbox">
                        <div className="selectTag-lists">
                          <div className="selectTag">Home</div>
                        </div>
                        <div className="left-address-with-right-btn">
                          <div className="left-address">
                            <h4>John Doe</h4>
                            <ul>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/phoneicon.svg" alt="" /></span>
                                  <span className="text-container">+1 000 0000 0000</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/locationicon.svg" alt="" /></span>
                                  <span className="text-container">2207 Jericho Turnpike Commack North Dakota 11725</span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="right-action">
                            <div className="custom-hover-dropdown">
                              <button type="button" className="btn">
                                <img src="/images/custom-hover-dropdown-btn.svg" alt="" />
                              </button>
                              <div className="custom-hover-dropdown-menu">
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/edit.svg" alt="" />
                                  Edit</a>
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/trash.svg" alt="" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-item selected-address">
                <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Select Billing address</h3>
                  </div>
                  <div className="rgdiv">
                    <div className="textwithcheckbox">
                      <input type="checkbox" id="sameas" className="custom-checkbox-s1"></input>
                      <label htmlFor="sameas">Same As Shipping address</label>
                    </div>
                  </div>
                </div>
                <div className="selected-address-lists">
                  <div className="selected-address-item">
                    <div className="check-with-infocardbox">
                      <div className="check-col">
                        <input type="radio" id="addressSel1" name="addressSel" className="custom-radio-s1" />
                      </div>
                      <label htmlFor="addressSel1" className="infocardbox">
                        <div className="selectTag-lists">
                          <div className="selectTag">Home</div>
                        </div>
                        <div className="left-address-with-right-btn">
                          <div className="left-address">
                            <h4>John Doe</h4>
                            <ul>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/phoneicon.svg" alt="" /></span>
                                  <span className="text-container">+1 000 0000 0000</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/locationicon.svg" alt="" /></span>
                                  <span className="text-container">2207 Jericho Turnpike Commack North Dakota 11725</span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="right-action">
                            <div className="custom-hover-dropdown">
                              <button type="button" className="btn">
                                <img src="/images/custom-hover-dropdown-btn.svg" alt="" />
                              </button>
                              <div className="custom-hover-dropdown-menu">
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/edit.svg" alt="" />
                                  Edit</a>
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/trash.svg" alt="" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="selected-address-item">
                    <div className="check-with-infocardbox">
                      <div className="check-col">
                        <input type="radio" id="addressSel1" name="addressSel" className="custom-radio-s1" />
                      </div>
                      <label htmlFor="addressSel1" className="infocardbox">
                        <div className="selectTag-lists">
                          <div className="selectTag">Home</div>
                        </div>
                        <div className="left-address-with-right-btn">
                          <div className="left-address">
                            <h4>John Doe</h4>
                            <ul>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/phoneicon.svg" alt="" /></span>
                                  <span className="text-container">+1 000 0000 0000</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="icon-container"><img src="/images/locationicon.svg" alt="" /></span>
                                  <span className="text-container">2207 Jericho Turnpike Commack North Dakota 11725</span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="right-action">
                            <div className="custom-hover-dropdown">
                              <button type="button" className="btn">
                                <img src="/images/custom-hover-dropdown-btn.svg" alt="" />
                              </button>
                              <div className="custom-hover-dropdown-menu">
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/edit.svg" alt="" />
                                  Edit</a>
                                <a href="" className="custom-hover-dropdown-item">
                                  <img src="/images/trash.svg" alt="" />Delete</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-item cart-items for-add">
                <div className="top-heading">
                  <Button
                    variant="outline"
                    type="button"
                    className="add-new-address-btn border-none p-0 shadow-none"
                    onClick={handleToggleAddModal}
                  >
                    <img src="/images/addbtn.svg" alt="" /> add a new Address
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-page-right">
            <div className="card-item priceDetails">
            <div className="card-inner-headerPart">
                  <div className="lediv">
                    <h3>Price Details</h3>
                  </div>
                </div>
              <div className="priceDetails-body">
                <ul>
                  <li>
                    <p>Subtotal</p>
                    <h5>$3332.38</h5>
                  </li>
                  <li>
                    <p>Shipping</p>
                    <h5>Free</h5>
                  </li>
                  {/* <li>
                    <button type="button" className="apply-code-btn">Add coupon code <img src="/images/arow01.svg" alt=""/></button>
                  </li> */}
                </ul>
              </div>
              <div className="priceDetails-footer">
                <h4>Total Amount</h4>
                <h4 className="amount-value">$3332.38</h4>
              </div>
            </div>
            <div className="order-action-btn">
              <a href="" className="theme-primary-btn order-btn">
                Continue
              </a>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={handleToggleAddModal}>

        <DialogContent className="gap-0 p-0 add-new-address-modal">
          <div className="modal-header">
            <DialogTitle className="text-center text-xl font-bold">
              Add New Address
            </DialogTitle>
          </div>
          <div className="card-item card-payment-form px-5 pt-3 pb-5">
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >Name</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter Name" />
                  </div>
                </div>
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >Phone Number</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter Phone Number" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >Pincode</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter Pincode" />
                  </div>
                </div>
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >locality</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter locality" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4 w-full">
                <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Address (Area and Street)</label>
                <div className="relative">
                  <input className="flex h-9 w-full rounded-md border border-input
                       bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
                       file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
                       disabled:opacity-50 theme-form-control-s1" placeholder="Enter Address (Area and Street)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >City/District/Town</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter City/District/Town" />
                  </div>
                </div>
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >State</label>
                  <div className="relative">
                    <select className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1">
                      <option>Select</option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >Landmark (Optional)</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter Landmark" />
                  </div>
                </div>
                <div className="space-y-2 mb-4 ">
                  <label className="text-sm font-medium 
                    leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >Alternate Phone (Optional)</label>
                  <div className="relative">
                    <input className="flex h-9 w-full rounded-md border 
                      border-input bg-transparent px-3 py-1 text-sm shadow-sm
                       transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
                        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 theme-form-control-s1"
                      placeholder="Enter Alternate Phone (Optional)" />
                  </div>
                </div>
              </div>

            </div>
            <div className="order-action-btn">
              <a href="" className="theme-primary-btn order-btn">Save and deliver here</a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
