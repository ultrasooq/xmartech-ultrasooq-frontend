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
import { IOption, IUserRoles } from "@/utils/types/common.types";
import { useToast } from "@/components/ui/use-toast";
import {
  useUserRoles,
  useCreateUserRole,
} from "@/apis/queries/masters.queries";
import { useCreateMember } from "@/apis/queries/member.queries";
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
};

const addFormSchema = z.object({
  email: z.string().trim().min(2, { message: "Email is required" }),
  userRoleId: z.coerce.number().min(1, { message: "User Role is required" }), // Ensure it's a valid number (ID)
  tradeRole: z.coerce.string().optional(),
});

const addDefaultValues = {
  email: "",
  userRoleId: null,
  tradeRole: "MEMBER",
};

const AddToMemberForm: React.FC<AddToMemberFormProps> = ({ onClose }) => {
  // const formContext = useFormContext();
  const createUserRole = useCreateUserRole();
  const { toast } = useToast();
  const [, setValue] = useState<IOption | null>();
  const userRolesQuery = useUserRoles();
  const createMember = useCreateMember();

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
      setValue({ label: response.data.brandName, value: response.data.id });
      form.setValue("userRoleId", response.data.id);
    } else {
      toast({
        title: "User Role Create Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: addDefaultValues,
  });

  const onSubmit = async (formData: any) => {
    const updatedFormData = { ...formData };
    console.log(updatedFormData);
    const response = await createMember.mutateAsync(formData);
    if (response.status) {
      onClose();
      toast({
        title: "Membert Add Successful",
        description: response.message,
        variant: "success",
      });
    } else {
      toast({
        title: "Membert Add Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form px-5 pb-5 pt-3"
        >
          <ControlledTextInput
            label="Email"
            name="email"
            placeholder="Enter Email"
            type="text"
          />

          <div className="flex w-full items-center gap-1.5">
            <Label>User Role</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-pointer text-gray-500" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  Type a role in the select box and press <strong>Enter</strong>{" "}
                  to create a new User Role.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Controller
            name="userRoleId"
            control={form.control} // ✅ Use form.control instead
            render={({ field }) => (
              <CreatableSelect
                name={field.name}
                isClearable
                isDisabled={createUserRole.isPending}
                isLoading={createUserRole.isPending}
                onChange={(newValue) => {
                  field.onChange(newValue?.value);
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
              />
            )}
          />

          <Button
            type="submit"
            className="theme-primary-btn mt-2 h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            Add Member
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddToMemberForm;
