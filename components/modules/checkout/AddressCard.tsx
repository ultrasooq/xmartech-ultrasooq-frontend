import React from "react";

const AddressCard = () => {
  return (
    <div className="selected-address-item">
      <div className="check-with-infocardbox">
        <div className="check-col">
          <input
            type="radio"
            id="addressSel1"
            name="addressSel"
            className="custom-radio-s1"
          />
        </div>
        <label htmlFor="addressSel1" className="infocardbox">
          {/* <div className="selectTag-lists">
        <div className="selectTag">Home</div>
      </div> */}
          <div className="left-address-with-right-btn">
            <div className="left-address">
              <h4>John Doe</h4>
              <ul>
                <li>
                  <p>
                    <span className="icon-container">
                      <img src="/images/phoneicon.svg" alt="" />
                    </span>
                    <span className="text-container">+1 000 0000 0000</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="icon-container">
                      <img src="/images/locationicon.svg" alt="" />
                    </span>
                    <span className="text-container">
                      2207 Jericho Turnpike Commack North Dakota 11725
                    </span>
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
                    Edit
                  </a>
                  <a href="" className="custom-hover-dropdown-item">
                    <img src="/images/trash.svg" alt="" />
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default AddressCard;
