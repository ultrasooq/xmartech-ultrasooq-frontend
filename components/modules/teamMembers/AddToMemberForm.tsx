import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { IOption, IUserRoles } from "@/utils/types/common.types";
import { useToast } from "@/components/ui/use-toast";
import {
  useUserRoles,
  useCreateUserRole,
} from "@/apis/queries/masters.queries";
import { useCreateMember, useUpdateMember } from "@/apis/queries/member.queries";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Info } from "lucide-react";

const customStyles = {
  control: (base: any) => ({ ...base, height: 48, minHeight: 48 }),
};

type AddToMemberFormProps = {
  onClose: () => void;
  memberDetails: any;
};

const addFormSchema = z.object({
  firstName: z.string().trim().min(2, { message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string().trim().min(2, { message: "Email is required" }),
  userRoleId: z.number().min(1, { message: "User Role is required" }), // Ensure it stays a number
  tradeRole: z.string().optional(),
  phoneNumber: z.string().optional(),
});


const AddToMemberForm: React.FC<AddToMemberFormProps> = ({ onClose, memberDetails }) => {
  // const formContext = useFormContext();
  const createUserRole = useCreateUserRole();
  const { toast } = useToast();
  const [, setValue] = useState<IOption | null>();
  const userRolesQuery = useUserRoles();
  const createMember = useCreateMember();
  const updateMember = useUpdateMember();

  const memoizedUserRole = useMemo(() => {
    return userRolesQuery?.data?.data
      ? userRolesQuery.data.data.map((item: IUserRoles) => ({
          label: item.userRoleName,
          value: item.id,
        }))
      : [];
  }, [userRolesQuery?.data?.data]);

  const handleCreate = async (inputValue: string) => {
    const response = await createUserRole.mutateAsync({
      userRoleName: inputValue,
    });

    if (response.status && response.data) {
      toast({
        title: "User Role Create Successful",
        description: response.message,
        variant: "success",
      });
      setValue({ label: response.data.userRoleName, value: response.data.id });
      form.setValue("userRoleId", response.data.id);
    } else {
      toast({
        title: "User Role Create Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

    // Default values based on whether editing or adding a new member
    const addDefaultValues = {
      firstName: memberDetails?.firstName || "",
      lastName: memberDetails?.lastName || "",
      email: memberDetails?.email || "",
      userRoleId: Number(memberDetails?.userRoleId) || undefined,
      tradeRole: memberDetails?.tradeRole || "MEMBER",
      phoneNumber: memberDetails?.phoneNumber || "",
    };

  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: addDefaultValues,
  });

  const onSubmit = async (formData: any) => {
    const updatedFormData = { ...formData };
    console.log(updatedFormData);

    let response;
    if (memberDetails) {
      response = await updateMember.mutateAsync({ memberId: memberDetails.id, ...formData });
    } else {
      response = await createMember.mutateAsync(formData);
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
        title: response.message,
        description: response.message,
        variant: "danger",
      });
    }
  };
  return (
    <>
      <div className="modal-header !justify-between">
        <DialogTitle className="text-center text-xl font-bold">
          {memberDetails ? 'Edit Member' : 'Add Member' }
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
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            type="text"
          />

          <ControlledTextInput
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            type="text"
          />


          <ControlledTextInput
            label="Email"
            name="email"
            placeholder="Enter Email"
            type="text"
            readOnly={memberDetails}
          />

        <ControlledTextInput
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            type="number"
          />

          <div className="flex w-full items-center gap-1.5">
            <Label>User Role</Label>
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-pointer text-gray-500" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  Type a role in the select box and press <strong>Enter</strong>{" "}
                  to create a new User Role.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>

          <Controller
            name="userRoleId"
            control={form.control} // ✅ Use form.control instead
            render={({ field }) => (
              <>
              {/* <CreatableSelect
                name={field.name}
                isClearable
                isDisabled={createUserRole.isPending}
                isLoading={createUserRole.isPending}
                onChange={(newValue) => {
                  const numericValue = newValue ? Number(newValue.value) : 0; // Ensure it's a number
                  field.onChange(numericValue); // Pass the correct numeric value
                  setValue(newValue);
                }}
                onCreateOption={handleCreate}
                options={memoizedUserRole}
                value={memoizedUserRole.find(
                  (item: IOption) => Number(item.value) === field.value,
                )}
                styles={customStyles}
                instanceId="userRoleId"
                className="z-[999]"
              /> */}

                    <Select
                      name={field.name}
                      onChange={(newValue) => {
                        const numericValue = newValue ? Number(newValue.value) : 0; // Ensure it's a number
                        field.onChange(numericValue); // Pass the correct numeric value
                        setValue(newValue);
                      }}
                      options={memoizedUserRole}
                      value={memoizedUserRole.find(
                        (item: IOption) => Number(item.value) === field.value // Use form state value instead of fixed memberDetails value
                      ) || memoizedUserRole.find((item: IOption) => Number(item.value) === memberDetails?.userRoleId)} // Default to memberDetails value if not set
                      styles={customStyles}
                      instanceId="userRoleId"
                      className="z-[999]"
                      isSearchable={true} // Keep search enabled
                    />
               {/* Validation Error Message */}
                {form.formState.errors.userRoleId && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.userRoleId.message}
                  </p>
                )}
              </>
            )} 
          />

          <Button
            type="submit"
            className="theme-primary-btn mt-2 h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
             {memberDetails ? 'Edit Member' : 'Add Member' }
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddToMemberForm;
