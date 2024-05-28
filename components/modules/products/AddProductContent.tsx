import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import AddProductIcon from "@/public/images/add-product.svg";
import ExistingProductIcon from "@/public/images/existing-product.svg";

type AddProductContentProps = {};

const AddProductContent: React.FC<AddProductContentProps> = () => {
  return (
    <DialogContent className="custom-action-type-chose-picker">
      <div className="modal-headerpart">
        <h5>Chose Add Product Type</h5>
      </div>
      <div className="modal-bodypart">
        <div className="import-pickup-type-selector-lists">
          <div className="import-pickup-type-selector-item">
            <Link
              href="/product"
              className="import-pickup-type-selector-box hover:!bg-gray-100"
            >
              <div className="icon-container">
                <Image src={AddProductIcon} alt="add-product-icon" />
              </div>
              <div className="text-container">
                <h5>Add a new product</h5>
                <p>
                  Lorem Ipsum is simply Lorem 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </Link>
          </div>

          <div className="import-pickup-type-selector-item">
            <Link
              href="/manage-products"
              className="import-pickup-type-selector-box hover:!bg-gray-100"
            >
              <div className="icon-container">
                <Image src={ExistingProductIcon} alt="add-product-icon" />
              </div>
              <div className="text-container">
                <h5>Choose from Existing product </h5>
                <p>
                  Lorem Ipsum is simply Lorem 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddProductContent;
