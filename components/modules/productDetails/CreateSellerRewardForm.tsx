import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/plate-ui/input";
import { useAddSellerReward } from "@/apis/queries/seller-reward.queries";
import { useMe } from "@/apis/queries/user.queries";
import { useAllManagedProducts } from "@/apis/queries/product.queries";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import { useTranslations } from "next-intl";

const addFormSchema = z.object({
    productId: z.string().min(1, "Product is required"),
    startDate: z.string().min(2, { message: "Start date is required" }),
    startTime: z.string().min(2, { message: "Start time is required" }),
    endDate: z.string().min(2, { message: "End date is required" }),
    endTime: z.string().min(2, { message: "End time is required" }),
    rewardPercentage: z.coerce.number().min(1, { message: 'Minimum value must be 1' }),
    rewardFixAmount: z.coerce.number().min(1, { message: 'Minimum value must be 1' }),
    minimumOrder: z.coerce.number().min(1, { message: 'Minimum order must be 1' }),
    stock: z.coerce.number().min(1, { message: 'Minimum stock must be 1' })
});

type CreateSellerRewardFormProps = {
    onClose: () => void;
};

const CreateSellerRewardForm: React.FC<CreateSellerRewardFormProps> = ({ onClose }) => {

    const t = useTranslations();

    const me = useMe();

    // Default values based on whether editing or adding a new member
    const addDefaultValues = {
        productId: "",
        startDate: "", //undefined as unknown as Date,
        startTime: "",
        endDate: "", //undefined as unknown as Date,
        endTime: "",
        rewardPercentage: 1,
        rewardFixAmount: 1,
        minimumOrder: 1,
        stock: 1
    };

    const form = useForm({
        resolver: zodResolver(addFormSchema),
        defaultValues: addDefaultValues,
    });

    const addSellerReward = useAddSellerReward();

    const [products, setProducts] = useState<any[]>([]);

    const productsQuery = useAllManagedProducts(
        {
            page: 1,
            limit: 50,
            selectedAdminId: me?.data?.data?.tradeRole == 'MEMBER' ? me?.data?.data?.addedBy : undefined
        },
        true,
    );

    useEffect(() => {
        setProducts((productsQuery?.data?.data || []).filter((item: any) => {
            return item?.productPrice_product?.id;
        }));
    }, [productsQuery?.data?.data]);

    const onSubmit = async (values: z.infer<typeof addFormSchema>) => {
        let startDateTime = values.startDate + ' ' + values.startTime + ':00';
        let endDateTime = values.endDate + ' ' + values.endTime + ':00';

        if (new Date(startDateTime).getTime() < new Date().getTime()) {
            toast({
                title: "Datetime error",
                description: 'Start datetime can not be in the past',
                variant: "danger",
            });
            return;
        }

        if (new Date(values.startDate).getTime() > new Date(values.endDate).getTime()) {
            toast({
                title: "Datetime error",
                description: 'Start date can not be greater than end date',
                variant: "danger",
            });
            return;
        }

        if (values.startDate == values.endDate && new Date(startDateTime).getTime() >= new Date(endDateTime).getTime()) {
            toast({
                title: "Datetime error",
                description: 'Start time must be less than end time',
                variant: "danger",
            });
            return;
        }

        const response = await addSellerReward.mutateAsync({
            productId: Number(values.productId),
            startTime: startDateTime,
            endTime: endDateTime,
            rewardPercentage: values.rewardPercentage,
            rewardFixAmount: values.rewardFixAmount,
            minimumOrder: values.minimumOrder,
            stock: values.stock
        });

        if (response.status) {
            toast({
                title: "Seller Reward Added Successfully",
                description: response.message,
                variant: "success",
            });

            form.reset();
            onClose();
        } else {
            toast({
                title: "Seller Reward Add Failed",
                description: response.message,
                variant: "danger",
            });
        }
    };

    return (
        <>
            <div className="modal-header !justify-between">
                <DialogTitle className="text-center text-xl font-bold">
                    {t("create_seller_reward")}
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
                    className="card-item card-payment-form px-5 pb-5"
                >
                    <ControlledSelectInput
                      label={t("product")}
                      name="productId"
                      options={products.map((item: any) => ({
                        value: item.productId?.toString(),
                        label: item.productPrice_product?.productName,
                      }))}
                    />
                    
                    <label className="text-sm font-medium leading-none text-color-dark">
                        {t("start_date")}
                    </label>
                    <ControlledTextInput
                        type="date"
                        label={t("start_date")}
                        name="startDate"
                        placeholder={t("start_date")}
                    />

                    <label className="text-sm font-medium leading-none text-color-dark">
                        {t("start_time")}
                    </label>
                    <ControlledTextInput
                        type="time"
                        label={t("start_time")}
                        name="startTime"
                        placeholder={t("start_time")}
                    />

                    <label className="text-sm font-medium leading-none text-color-dark">
                        {t("end_date")}
                    </label>
                    <ControlledTextInput
                        type="date"
                        label={t("end_date")}
                        name="endDate"
                        placeholder={t("end_date")}
                    />

                    <label className="text-sm font-medium leading-none text-color-dark">
                        {t("end_time")}
                    </label>
                    <ControlledTextInput
                        type="time"
                        label={t("end_time")}
                        name="endTime"
                        placeholder={t("end_time")}
                    />

                    <FormField
                        control={form.control}
                        name="rewardPercentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("reward_percentage")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="!h-[48px] rounded border-gray-300 focus-visible:!ring-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rewardFixAmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("reward_fix_amount")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="!h-[48px] rounded border-gray-300 focus-visible:!ring-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="minimumOrder"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("minimum_order")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="!h-[48px] rounded border-gray-300 focus-visible:!ring-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("stock")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="!h-[48px] rounded border-gray-300 focus-visible:!ring-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={addSellerReward?.isPending}
                        className="theme-primary-btn mt-2 h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
                    >
                        {!addSellerReward?.isPending ? "Create Reward" : "Processing"}
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default CreateSellerRewardForm;