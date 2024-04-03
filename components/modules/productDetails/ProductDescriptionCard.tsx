import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type ProductDescriptionCardProps = {
  productDetails: any;
};

const ProductDescriptionCard: React.FC<ProductDescriptionCardProps> = ({
  productDetails,
}) => {
  return (
    <div className="product-view-s1-right">
      <div className="info-col">
        <h2>{productDetails?.productName}</h2>
      </div>
      <div className="info-col">
        <h3>
          ${productDetails?.offerPrice}{" "}
          <span>${productDetails?.productPrice}</span>
        </h3>
      </div>
      <div className="info-col">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>TIME LEFT:</label>
              <div className="time-left-lists-s1">
                <div className="time-left-list-col">
                  <div className="dayDigit">3</div>
                  <div className="dayText">days</div>
                </div>
                <div className="time-left-list-col">
                  <div className="dayDigit">18</div>
                  <div className="dayText">Hours</div>
                </div>
                <div className="time-left-list-col">
                  <div className="dayDigit">29</div>
                  <div className="dayText">Minutes</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="form-group">
              <p>Group Buy deal ends May 31, 2022, 12:00 am</p>
              <p>Timezone: UTC+0</p>
            </div>
            <div className="col-12 col-md-12">
              <div className="form-group">
                <ul className="ul-lists-style-s1">
                  <li>Minimum: 50</li>
                  <li>Maximum: 100</li>
                  <li>Deals sold: 0</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div className="form-group mb-0">
                <Slider defaultValue={[50]} max={100} step={1} />
                <div className="slider-btm-range-value">
                  <div className="value_text">0</div>
                  <div className="value_text">100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-col">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group mb-0">
              <label>Quantity</label>
              <div className="quantity_select_with_full_size_btn">
                <div className="quantity_selector">
                  <span className="minus">
                    <img src="/images/quantity_selector_minus.svg" alt="" />
                  </span>
                  <input
                    type="number"
                    className="theme-form-control-s1"
                  ></input>
                  <span className="plus">
                    <img src="/images/quantity_selector_plus.svg" alt="" />
                  </span>
                </div>
                <div className="selector_submit_btn">
                  <Button type="button" className="theme-primary-btn">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-col">
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="form-group mb-0">
              <label>HIGHLIGHTS</label>
              <p>
                <span className="color-text">colour:</span> Red & Black
              </p>
              <p>
                <span className="color-text">Outer Material:</span> Mesh
              </p>
              <p>
                <span className="color-text">Closure:</span> Laced
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionCard;
