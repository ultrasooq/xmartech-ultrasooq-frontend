import React from "react";

const CheckoutPage = () => {
  return (
    <div className="cart-page">
      <div className="container m-auto px-3">
        <div className="headerPart">
          <div className="lediv">
            <h3>Select Delivery address</h3>
          </div>
        </div>
        <div className="cart-page-wrapper">

          <div className="cart-page-left">

            <div className="bodyPart">
              <div className="card-item selected-address">
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
                              <a href="tel:100000000000">
                                <span className="icon-container"><img src="/images/phoneicon.svg" alt="" /></span>
                                <span className="text-container">+1 000 0000 0000</span>
                              </a>
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
                              <a href="tel:100000000000">
                                <span className="icon-container"><img src="/images/phoneicon.svg" alt="" /></span>
                                <span className="text-container">+1 000 0000 0000</span>
                              </a>
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
                  <a href="" className="add-new-address-btn"><img src="/images/addbtn.svg" alt=""/> add a new Address</a>
                </div>

              </div>

            </div>
          </div>
          <div className="cart-page-right">
            <div className="card-item priceDetails">
              <div className="top-heading">
                <h4>Price Details</h4>
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
              <a href="" className="theme-primary-btn order-btn">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
