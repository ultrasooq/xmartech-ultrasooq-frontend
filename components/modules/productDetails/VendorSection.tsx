import React from "react";
import Image from "next/image";
import EmailIcon from "@/public/images/email.svg";
import PhoneCallIcon from "@/public/images/phone-call.svg";

const VendorSection = () => {
  return (
    <div className="vendor-information-card-ui">
      <div className="vendor-image">DK</div>
      <div className="vendor-info">
        <h2>Vendor Name</h2>
        <ul className="vendor-contact-info">
          <li>
            <a href="mailto:test@gmail.com">
              <span className="icon">
                <Image src={EmailIcon} alt="email-icon" />
              </span>
              <span className="text">test@gmail.com</span>
            </a>
          </li>
          <li>
            <a href="tel:1234567890">
              <span className="icon">
                <Image src={PhoneCallIcon} alt="phone-icon" />
              </span>
              <span className="text">1234567890</span>
            </a>
          </li>
        </ul>
        <h5>Business Type</h5>
        <div className="tagLists">
          <div className="tagItem">
            <div className="tagIbox">Online Shop</div>
          </div>
        </div>
        <h5>
          Company ID: <strong>PUREFC0000058</strong>
        </h5>
      </div>
    </div>
  );
};

export default VendorSection;
