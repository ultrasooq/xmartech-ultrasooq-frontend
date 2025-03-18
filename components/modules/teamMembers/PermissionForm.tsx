import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
} from "@/apis/queries/masters.queries";
import BackgroundImage from "@/public/images/before-login-bg.png";
import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import {
  usePermissions,
  useSetPermission,
  useGetPermission,
  useUpdatePermission,
} from "@/apis/queries/member.queries";

const customStyles = {
  control: (base: any) => ({ ...base, height: 48, minHeight: 48 }),
};

type PermissionFormProps = {
  roleId: number;
  onClosePer: () => void;
};

const addFormSchema = z.object({
  permissionIdList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "permission Type is required",
    })
    .transform((value) => {
      let temp: any = [];
      value.forEach((item) => {
        temp.push({ permissionId: item.value });
      });
      return temp;
    }),
});

const PermissionForm: React.FC<PermissionFormProps> = ({
  roleId,
  onClosePer,
}) => {
  const permissionsQuery = usePermissions();
  const addPermission = useSetPermission();
  const updatePermission = useUpdatePermission();
  const getPermissionquery = useGetPermission({ userRoleId: roleId });
  const { toast } = useToast();

  const memoizedPermissions = useMemo(() => {
    return (
      permissionsQuery?.data?.data.map((item: { id: string; name: string }) => {
        return { label: item.name, value: item.id };
      }) || []
    );
  }, [permissionsQuery?.data]);

  // Get Role Id wise Permissions

  const memoizedGetPermission = useMemo(() => {
    return getPermissionquery?.data?.data?.userRolePermission
      ? getPermissionquery.data.data.userRolePermission.map((item: any) => ({
          label: item?.permissionDetail.name,
          value: item.permissionId,
        }))
      : [];
  }, [getPermissionquery?.data?.data]);

  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: { permissionIdList: [] },
  });

  useEffect(() => {
    if (memoizedGetPermission.length > 0) {
      form.setValue("permissionIdList", memoizedGetPermission);
    }
  }, [memoizedGetPermission, form]);

  const onSubmit = async (formData: any) => {
    let response;
    if (memoizedGetPermission) {
      response = await updatePermission.mutateAsync({
        userRoleId: roleId,
        ...formData,
      });
    } else {
      response = await addPermission.mutateAsync({
        userRoleId: roleId,
        ...formData,
      });
    }

    if (response.status) {
      onClosePer();
      toast({
        title: response.message,
        description: response.message,
        variant: "success",
      });
    } else {
      toast({
        title: "Permission Set Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };
  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          src={BackgroundImage}
          className="h-full w-full object-cover object-center"
          alt="background"
          fill
          priority
        />
      </div>
      <div className="container relative z-10 m-auto">
        <div className="flex">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-auto mb-0 max-h-[95vh] w-11/12 overflow-y-auto rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-10/12 lg:w-10/12 lg:p-10"
            >
              <div className="text-normal m-auto mb-7 w-full text-center text-sm leading-6 text-light-gray">
                <h2 className="mb-3 text-center text-3xl font-semibold leading-8 text-color-dark sm:text-4xl sm:leading-10">
                  {memoizedGetPermission.length
                    ? "Update Permission"
                    : "Add Permission"}
                </h2>
              </div>

              <div className="mb-4 w-full">
                <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                  <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                    Permission Information
                  </label>
                </div>
              </div>

              <div>
                <div className="mb-3.5 w-full">
                  <AccordionMultiSelectV2
                    label="Permission Type"
                    name="permissionIdList"
                    options={memoizedPermissions || []}
                    // value={selectedValues} // Ensure checked state
                    placeholder="Permission Type"
                    error={
                      form.formState.errors?.permissionIdList?.message !==
                      undefined
                        ? String(
                            form.formState.errors?.permissionIdList?.message,
                          )
                        : ""
                    }
                  />
                </div>
              </div>

              <Button
                disabled={addPermission.isPending || updatePermission.isPending}
                type="submit"
                className="h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
              >
                {addPermission.isPending || updatePermission.isPending ? (
                  <>
                    <Image
                      src="/images/load.png"
                      alt="loader-icon"
                      width={20}
                      height={20}
                      className="mr-2 animate-spin"
                    />
                    Please wait
                  </>
                ) : memoizedGetPermission.length ? (
                  "Update Permission"
                ) : (
                  "Add Permission"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default PermissionForm;
