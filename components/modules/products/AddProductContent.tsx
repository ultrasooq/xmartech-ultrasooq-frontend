import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type AddProductContentProps = {
  onToExistingProduct: () => void;
  onToNewProduct: () => void;
};

const AddProductContent: React.FC<AddProductContentProps> = ({
  onToExistingProduct,
  onToNewProduct,
}) => {
  return (
    <DialogContent className="custom-action-type-chose-picker">
      <div className="modal-headerpart">
        <h5>Chose Add Product Type</h5>
        {/* <button type="button" className="closebtn"><img src="/images/close.svg" alt=""/></button> */}
      </div>
      <div className="modal-bodypart">
        <div className="import-pickup-type-selector-lists">
          <div className="import-pickup-type-selector-item">
            <input type="radio" className="select-controller" name="isStartNewImport" onClick={onToNewProduct} />
            <div className="import-pickup-type-selector-box">
              <div className="icon-container">
                <img src="/images/add-product.svg" alt="" />
              </div>
              <div className="text-container">
                <h5>Add a new product</h5>
                <p>Lorem Ipsum is simply Lorem 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </div>
          <div className="import-pickup-type-selector-item">
            <input type="radio" onClick={onToExistingProduct} className="select-controller" name="isStartNewImport" />
            <div className="import-pickup-type-selector-box">
              <div className="icon-container">
                <img src="/images/existing-product.svg" alt="" />
              </div>
              <div className="text-container">
                <h5>Choose from Existing product </h5>
                <p>Lorem Ipsum is simply Lorem  1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddProductContent;
