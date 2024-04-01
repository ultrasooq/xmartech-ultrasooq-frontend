import { url } from "inspector";
import React from "react";

const TrendingPage = () => {
  return (
    <>
      <div className="body-content-s1">
        {/* start: custom-inner-banner-s1 */}
        <div className="custom-inner-banner-s1">
          <div className="container m-auto px-3">
            <div className="custom-inner-banner-s1-captionBox">
              <img src="/images/trending-product-inner-banner.png" alt="" className="bg-image"></img>
              <div className="text-container">
                <ul className="page-indicator">
                  <li>
                    <a href="#">Home</a>
                    <img src="/images/nextarow.svg" alt="" />
                  </li>
                  <li>
                    <a href="#">Shop</a>
                    <img src="/images/nextarow.svg" alt="" />
                  </li>
                  <li>
                    Phones & Accessories
                  </li>
                </ul>
                <h2>sed do eiusmod tempor incididunt</h2>
                <h5>Only 2 days:</h5>
                <h4>21/10 & 22/10</h4>
                <div className="action-btns">
                  <button type="button" className="theme-primary-btn custom-btn">Shop Now</button>
                </div>
              </div>
              <div className="image-container">
                <img src="/images/trending-product-inner-banner-pic.png" alt=""></img>
              </div>
            </div>
          </div>
        </div>
        {/* end: custom-inner-banner-s1 */}
      </div>
    </>
  );
};

export default TrendingPage;
