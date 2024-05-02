import React, { useEffect } from "react";
// import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProductStatus } from "@/apis/queries/orders.queries";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { STATUS_LIST } from "@/utils/constants";

type UpdateProductStatusFormProps = {
  orderProductId: string;
  onClose: () => void;
  orderProductStatus?: string;
};

const formSchema = z.object({
  status: z
    .string()
    .trim()
    .min(2, { message: "Status is required" })
    .max(50, { message: "Status must be less than 50 characters" }),
});

const UpdateProductStatusForm: React.FC<UpdateProductStatusFormProps> = ({
  orderProductId,
  onClose,
  orderProductStatus,
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  });

  const updateProductStatusQuery = useUpdateProductStatus();
  // console.log(orderProductStatus);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log({ orderProductId, status: values.status });
    if (values.status === "") return;

    const response = await updateProductStatusQuery.mutateAsync(
      {
        orderProductId: Number(orderProductId),
        status: values.status,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["order-by-id", { orderProductId }],
          });
        },
      },
    );

    if (response.status) {
      toast({
        title: "Status Update Successful",
        description: response.message,
        variant: "success",
      });
      form.reset();
      onClose();
    } else {
      toast({
        title: "Status Update Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    if (orderProductStatus) {
      console.log(orderProductStatus);
      form.reset({
        status: orderProductStatus,
      });
    }
  }, [orderProductStatus]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="modal-body">
          {/* <ControlledSelectInput
            label="Status"
            name="status"
            options={STATUS_LIST}
          /> */}
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <select
                {...field}
                className="custom-form-control-s1 select1"
                name="status"
              >
                <option value="">Select Status</option>
                {STATUS_LIST.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          />
          <p className="text-[13px] text-red-500">
            {form.formState.errors.status?.message}
          </p>
        </div>
        <div className="modal-footer">
          <button type="submit" className="theme-primary-btn submit-btn">
            Save
          </button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProductStatusForm;
