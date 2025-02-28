import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { IOption, IUserRoles } from "@/utils/types/common.types";
import { useToast } from "@/components/ui/use-toast";
import {
  useUserRoles,
  useCreateUserRole,
  useUpdateUserRole
} from "@/apis/queries/masters.queries";


const customStyles = {
  control: (base: any) => ({ ...base, height: 48, minHeight: 48 }),
};

type AddToRoleFormProps = {
  onClose: () => void;
  roleDetails: any;
};

const addFormSchema = z.object({
    userRoleName: z.string().trim().min(2, { message: "Role Name is required" }),
});


const AddToRoleForm: React.FC<AddToRoleFormProps> = ({ onClose, roleDetails }) => {
  // const formContext = useFormContext();
  const createUserRole = useCreateUserRole();
  const updateUserRole = useUpdateUserRole();
  const { toast } = useToast();
//   const [, setValue] = useState<IOption | null>();

const addDefaultValues = {
  userRoleName: roleDetails?.label || "",
};

  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: addDefaultValues,
  });

  const onSubmit = async (formData: any) => {
    const updatedFormData = { ...formData };
    // console.log(updatedFormData);
    let response;
    if (roleDetails) {
      response = await updateUserRole.mutateAsync({ userRoleId: roleDetails.value, ...formData });
    } else {
      response = await createUserRole.mutateAsync(formData);
    }
    if (response.status) {
      onClose();
      toast({
        title: response.message,
        description: response.message,
        variant: "success",
      });
    } else {
      toast({
        title: "Role Add Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };
  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          {roleDetails ? 'Edit Role' : 'Add Role' }
        </DialogTitle>
        <Button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 !bg-white !text-black shadow-none"
        >
          <IoCloseSharp size={20} />
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form px-5 pb-5 pt-3"
        >
          <ControlledTextInput
            label="Role Name"
            name="userRoleName"
            placeholder="Enter Name"
            type="text"
          />

          <Button
            type="submit"
            className="theme-primary-btn mt-2 h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
             {roleDetails ? 'Edit Role' : 'Add Role' }
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddToRoleForm;
