import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type AddressCardProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  province: string;
  postCode: string;
  onEdit: () => void;
  onDelete: () => void;
};

const AddressCard: React.FC<AddressCardProps> = ({
  firstName,
  lastName,
  phoneNumber,
  address,
  city,
  country,
  province,
  postCode,
  onEdit,
  onDelete,
}) => {
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
          <div className="left-address-with-right-btn">
            <div className="left-address">
              <h4>
                {firstName} {lastName}
              </h4>
              <ul>
                <li>
                  <p>
                    <span className="icon-container">
                      <img src="/images/phoneicon.svg" alt="" />
                    </span>
                    <span className="text-container">{phoneNumber}</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="icon-container">
                      <img src="/images/locationicon.svg" alt="" />
                    </span>
                    <span className="text-container">
                      {address} {city}, {province}, {postCode}, {country}
                    </span>
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    alt="image-icon"
                    src="/images/custom-hover-dropdown-btn.svg"
                    height={25}
                    width={25}
                    className="rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default AddressCard;
