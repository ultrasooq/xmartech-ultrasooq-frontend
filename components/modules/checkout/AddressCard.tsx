import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type AddressCardProps = {
  id: number;
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
  id,
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
    <div className="selected-address-item flex gap-x-3">
      <RadioGroupItem value={id?.toString()} id="r3" className="mt-1" />
      <Label htmlFor={id?.toString()} className="infocardbox">
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
      </Label>
    </div>
  );
};

export default AddressCard;
