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
    <DialogContent className="custom-ui-alert-popup danger-alert-popup">
      <DialogHeader className="alert-popup-headerpart">
        <h1>Choose</h1>
      </DialogHeader>
      <DialogDescription className="alert-popup-bodypart">
        <h4>Select an option</h4>
      </DialogDescription>
      <DialogFooter className="alert-actions">
        <div className="alert-actions-col">
          <Button onClick={onToExistingProduct} className="alert--cancel-btn">
            Add To Existing Product
          </Button>
        </div>
        <div className="alert-actions-col">
          <Button onClick={onToNewProduct} className="alert--submit-btn">
            Add New Product
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProductContent;
