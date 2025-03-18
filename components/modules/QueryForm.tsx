import React, { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { Form } from "@/components/ui/form";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";
import { useSubmitQuery } from "@/apis/queries/help-center.queries";
import { toast } from "@/components/ui/use-toast";

type QueryFormProps = {
    onClose: () => void;
};

const queryFormSchema = z.object({
    email: z.string()
        .trim()
        .min(2, { message: "Email is required" })
        .email({ message: "Invalid email format" }),

    query: z.string()
        .trim()
        .min(5, { message: "Query is required" }),
});

const QueryForm: React.FC<QueryFormProps> = ({ onClose }) => {
    const form = useForm({
        resolver: zodResolver(queryFormSchema),
        defaultValues: { email: '', query: '' },
    });

    const submitQuery = useSubmitQuery();

    const onSubmit = async (formData: any) => {
        const response = await submitQuery.mutateAsync(formData);

        if (response.status) {
            onClose();
            form.reset();
            toast({
                title: "Query submitted successfully",
                description: response.message,
                variant: "success",
            });
        } else {
            toast({
                title: "Query submit failed",
                description: response.message,
                variant: "danger",
            });
        }
    };

    return (
        <>
            <div className="modal-header !justify-between">
                <DialogTitle className="text-center text-xl font-bold">
                    Submit Your Query
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
                    <label className="text-sm font-medium leading-none text-color-dark">Email</label>
                    <ControlledTextInput
                        label="Email"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                    />

                    <ControlledTextareaInput
                        label="Query"
                        name="query"
                        placeholder="Enter Your Query"
                    />

                    <Button
                        type="submit"
                        className="theme-primary-btn mt-2 h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
                        disabled={submitQuery?.isPending}
                    >
                        {submitQuery?.isPending ? "Processing" : "Submit"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default QueryForm;