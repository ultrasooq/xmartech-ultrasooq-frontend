"use client";
import React from "react";
import { useOrders } from "@/apis/queries/orders.queries";
import { FiSearch } from "react-icons/fi";
import { BiSolidCircle } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";

const MyOrdersPage = () => {
  const ordersQuery = useOrders({
    page: 1,
    limit: 20,
  });

  console.log(ordersQuery.data);

  return (
    <div className="my-order-main">
      <div className="container m-auto px-3">
        <ul className="page-indicator-s1">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">My Account</a>
          </li>
          <li>My Orders</li>
        </ul>
        <div className="my-order-wrapper">
          <div className="left-div">
            <div className="card-box">
              <h2>Filter</h2>
              <h3>Order Status</h3>
              <ul className="checkbox-with-label-filters">
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>On the way</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>Delivered</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>Cancelled</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>Returned</label>
                </li>
              </ul>
              <div className="divider"></div>
              <h3>Order time</h3>
              <ul className="checkbox-with-label-filters">
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>Last 30 days</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>2023</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>2022</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>2021</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>2020</label>
                </li>
                <li>
                  <div className="check-col">
                    <input type="checkbox" className="custom-checkbox-s1" />
                  </div>
                  <label>Older</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-div">
            <div className="order-search-bar">
              <input
                type="text"
                className="custom-form-control-s1"
                placeholder="Search..."
              ></input>
              <button type="button" className="search-btn theme-primary-btn">
                <FiSearch />
                Search Orders
              </button>
            </div>
            <div className="my-order-lists">
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
                      </figcaption>
                    </figure>
                    <div className="center-price-info">
                      <h4>₹65,000</h4>
                    </div>
                    <div className="right-info">
                      <h4>
                        <BiSolidCircle color="green" /> Delivered on Mar 29
                      </h4>
                      <p>Your Item has been delivered</p>
                      <a href="#" className="ratingLink">
                        <PiStarFill />
                        Rate & Review Product
                      </a>
                    </div>
                  </div>
                  <div className="my-order-box">
                    <figure>
                      <div className="image-container">
                        <img src="/images/iphone.png" alt=""></img>
                      </div>
                      <figcaption>
                        <h3>1 year free disney</h3>
                      </figcaption>
                    </figure>
                    <div className="center-price-info">
                      <h4 className="success">Free</h4>
                    </div>
                    <div className="right-info">
                      <h4>
                        <BiSolidCircle color="green" /> Delivered on Mar 29
                      </h4>
                      <p>Your Item has been delivered</p>
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
                      </figcaption>
                    </figure>
                    <div className="center-price-info">
                      <h4>₹65,000</h4>
                    </div>
                    <div className="right-info">
                      <h4>
                        <BiSolidCircle color="green" /> Delivered on Mar 29
                      </h4>
                      <p>Your Item has been delivered</p>
                      <a href="#" className="ratingLink">
                        <PiStarFill />
                        Rate & Review Product
                      </a>
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
                      </figcaption>
                    </figure>
                    <div className="center-price-info">
                      <h4>₹65,000</h4>
                    </div>
                    <div className="right-info">
                      <h4>
                        <BiSolidCircle color="green" /> Delivered on Mar 29
                      </h4>
                      <p>Your Item has been delivered</p>
                      <a href="#" className="ratingLink">
                        <PiStarFill />
                        Rate & Review Product
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
