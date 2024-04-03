import { Button } from "@/components/ui/button";
import React from "react";

const SameBrandSection = () => {
  return (
    <div className="suggestion-list-s1-col">
      <div className="suggestion-same-branch-lists-s1">
        <div className="title-headerpart">
          <h3>Same Brand</h3>
        </div>
        <div className="contnet-bodypart">
          <div className="product-list-s1 outline-style">
            <div className="product-list-s1-col">
              <div className="product-list-s1-box">
                <div className="image-container">
                  <span className="discount">-6%</span>
                  <img src="/images/trending-product2.png" alt="" />
                </div>
                <div className="multiple-action-container">
                  <Button type="button" className="circle-btn">
                    <img src="/images/shopping-icon.svg" alt="" />
                  </Button>
                  <Button type="button" className="circle-btn">
                    <img src="/images/eye-icon.svg" alt="" />
                  </Button>
                  <Button type="button" className="circle-btn">
                    <img src="/images/heart-icon.svg" alt="" />
                  </Button>
                  <Button type="button" className="circle-btn">
                    <img src="/images/compare-icon.svg" alt="" />
                  </Button>
                </div>
                <div className="text-container">
                  <h4>young shop</h4>
                  <p>Lorem Ipsum is simply dummy text..</p>
                  <div className="rating_stars">
                    <img src="/images/rating_stars.svg" alt="" />
                    <span>02</span>
                  </div>
                  <h5>$332.38</h5>
                </div>
              </div>
            </div>{" "}
            <div className="product-list-s1-col">
              <div className="product-list-s1-box">
                <div className="image-container">
                  <span className="discount">-6%</span>
                  <img src="/images/trending-product2.png" alt="" />
                </div>
                <div className="multiple-action-container">
                  <Button type="button" className="circle-btn">
                    <img src="/images/shopping-icon.svg" alt="" />
                  </Button>
                  <Button type="button" className="circle-btn">
                    <img src="/images/eye-icon.svg" alt="" />
                  </Button>
                  <Button type="button" className="circle-btn">
                    <img src="/images/heart-icon.svg" alt="" />
                  </Button>
                  <Button type="button" className="circle-btn">
                    <img src="/images/compare-icon.svg" alt="" />
                  </Button>
                </div>
                <div className="text-container">
                  <h4>young shop</h4>
                  <p>Lorem Ipsum is simply dummy text..</p>
                  <div className="rating_stars">
                    <img src="/images/rating_stars.svg" alt="" />
                    <span>02</span>
                  </div>
                  <h5>$332.38</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SameBrandSection;
