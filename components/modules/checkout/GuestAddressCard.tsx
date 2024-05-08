import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import DropdownIcon from "@/public/images/custom-hover-dropdown-btn.svg";

type GuestAddressCardProps = {
  firstName?: string;
  lastName?: string;
  cc?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  province?: string;
  postCode?: string;
  onEdit: () => void;
};

const GuestAddressCard: React.FC<GuestAddressCardProps> = ({
  firstName,
  lastName,
  cc,
  phoneNumber,
  address,
  city,
  country,
  province,
  postCode,
  onEdit,
}) => {
  return (
    <div className="selected-address-item flex gap-x-3">
      <div className="left-address-with-right-btn">
        <div>
          <h4 className="!mt-0">
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
                src={DropdownIcon}
                height={25}
                width={25}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default GuestAddressCard;
