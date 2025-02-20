import React, { useEffect, useRef } from "react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { IoCloseSharp } from "react-icons/io5";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";



type AddToRfqFormProps = {
    onClose: () => void;
  };
  

const AddToRfqForm: React.FC<AddToRfqFormProps> = ({
  onClose
}) => {
  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          Add Member
        </DialogTitle>
        <Button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 !bg-white !text-black shadow-none"
        >
          <IoCloseSharp size={20} />
        </Button>
      </div>
      

        Form Body Here
       
          <Button
           
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
           Add Member
          </Button>
      
    </>
  );
};

export default AddToRfqForm;
