"use client";
import React, { useState } from "react";
import {
    useCartListByDevice,
    useCartListByUserId,
} from "@/apis/queries/cart.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getOrCreateDeviceId } from "@/utils/helper";
import PaymentForm from "@/components/modules/orders/PaymentForm";
import { initialOrderState, useOrderStore } from "@/lib/orderStore";
import { useToast } from "@/components/ui/use-toast";
import {
    useCreateOrder,
    useCreateOrderUnAuth,
    useCreatePaymentIntent
} from "@/apis/queries/orders.queries";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51QuptGPQ2VnoEyMPay2u4FyltporIQfMh9hWcp2EEresPjx07AuT4lFLuvnNrvO7ksqtaepmRQHfYs4FLia8lIV500i83tXYMR");

const CompleteOrderPage = () => {
    const t = useTranslations();
    const { langDir, currency } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const hasAccessToken = !!getCookie(PUREMOON_TOKEN_KEY);
    const deviceId = getOrCreateDeviceId() || "";
    const orderStore = useOrderStore();

    const createOrder = useCreateOrder();
    const createOrderUnAuth = useCreateOrderUnAuth();
    const createPaymentIntent = useCreatePaymentIntent();
    const [paymentType, setPaymentType] = useState<string>('DIRECT');
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const [isRedirectingToPaymob, setIsRedirectingToPaymob] = useState<boolean>(false);

    const handleCreateOrder = async () => {
        if (hasAccessToken) {
            if (orderStore.orders) {
                if (!orderStore.orders.cartIds?.length) {
                    toast({
                        title: t("order_cant_be_placed"),
                        description: t("order_placed_retry_info"),
                        variant: "danger",
                    });
                    return;
                }

                if (paymentType == 'ADVANCE') {
                    if (!advanceAmount) {
                        toast({
                            title: t("order_cant_be_placed"),
                            description: t("advance_payment_is_required"),
                            variant: "danger",
                        });
                        return;
                    }

                    if (advanceAmount > orderStore.total) {
                        toast({
                            title: t("order_cant_be_placed"),
                            description: t("advance_payment_must_be_less_than_total_amount"),
                            variant: "danger"
                        });
                        return;
                    }
                }
                
                const response = await createOrder.mutateAsync(orderStore.orders);
                if (response?.status) {
                    await handleCreatePaymentIntent(response?.data?.id);
                }
                else {
                    toast({
                        title: t("something_went_wrong"),
                        description: response.message,
                        variant: "danger",
                    });
                }
            }

        } else {
            
        }
    };

    const handleCreatePaymentIntent = async (orderId: number) => {
        const date = new Date;

        const response = await createPaymentIntent.mutateAsync({
            amount: paymentType == 'ADVANCE' ? advanceAmount * 1000 : orderStore.total * 1000,
            billing_data: {
                first_name: orderStore.orders.firstName,
                last_name: orderStore.orders.lastName,
                email: orderStore.orders.email,
                phone_number: orderStore.orders.phone,
                apartment: orderStore.orders.billingAddress,
                city: orderStore.orders.billingCity,
                state: orderStore.orders.billingProvince,
                country: orderStore.orders.billingCountry
            },
            extras: {
                orderId: orderId,
                paymentType: paymentType
            },
            special_reference: [
                orderId,
                date.getHours() < 10 ? `0${date.getHours()}` : String(date.getHours()),
                date.getMinutes() < 10 ? `0${date.getMinutes()}` : String(date.getMinutes()),
                date.getDate() < 10 ? `0${date.getDate()}` : String(date.getDate()),
                date.getMonth() < 10 ? `0${date.getMonth()}` : String(date.getMonth()),
                date.getFullYear() < 10 ? `0${date.getFullYear()}` : String(date.getFullYear()),
            ].join('-')
        })

        if (response?.status) {
            setIsRedirectingToPaymob(true);
            window.location.assign(`${process.env.NEXT_PUBLIC_PAYMOB_PAYMENT_URL}?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${response.data.client_secret}`);
        }
        else {
            toast({
                title: t("something_went_wrong"),
                description: response.message,
                variant: "danger",
            });
        }
    }

    return (
        <div className="cart-page">
            <div className="container m-auto px-3">
                <div className="headerPart" dir={langDir}>
                    <div className="lediv">
                        <h3>{t("make_payment")}</h3>
                    </div>
                </div>
                <div className="cart-page-wrapper">
                    <div className="cart-page-left">
                        <div className="sm:grid">
                            <Label>{t("direct_payment")}</Label>
                            <Switch
                                checked={paymentType == 'DIRECT'}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setPaymentType('DIRECT')
                                        setAdvanceAmount(0);
                                    }
                                }}
                                className="data-[state=checked]:!bg-dark-orange mt-2"
                            />
                        </div>
                        <div className="sm:grid mt-3">
                            <Label>{t("advance_payment")}</Label>
                            <Switch
                                checked={paymentType == 'ADVANCE'}
                                onCheckedChange={(checked) =>  {
                                    if (checked) setPaymentType('ADVANCE');
                                }}
                                className="data-[state=checked]:!bg-dark-orange mt-2"
                            />
                        </div>
                        {paymentType == 'ADVANCE' && <div className="sm:grid mt-3 sm:grid-cols-3">
                            <Input
                                onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                            />
                        </div>}
                    </div>
                    <div className="cart-page-right">
                        <div className="card-item priceDetails">
                            <div className="card-inner-headerPart" dir={langDir}>
                                <div className="lediv">
                                    <h3 dir={langDir}>{t("price_details")}</h3>
                                </div>
                            </div>
                            <div className="priceDetails-body">
                                <ul>
                                    <li>
                                        <p dir={langDir}>{t("subtotal")}</p>
                                        <h5>{currency.symbol}{orderStore.total|| 0}</h5>
                                    </li>
                                    {advanceAmount > 0 ? (
                                        <>
                                            <li>
                                                <p dir={langDir}>{t("advance_payment")}</p>
                                                <h5>{currency.symbol}{advanceAmount || 0}</h5>
                                            </li>
                                            <li>
                                                <p dir={langDir}>{t("shipping")}</p>
                                                <h5 dir={langDir}>{t("free")}</h5>
                                            </li>
                                        </>
                                    ) : null}
                                </ul>
                            </div>
                            <div className="priceDetails-footer">
                                <h4 dir={langDir}>{t("total_amount")}</h4>
                                <h4 className="amount-value">
                                    {currency.symbol}{advanceAmount > 0 ? (advanceAmount || 0) : (orderStore.total || 0)}
                                </h4><br />
                                {advanceAmount > 0 ? (
                                    <>
                                        <h4>{t("due_balance")}</h4>
                                        <h4 className="amount-value">
                                            {currency.symbol}{(orderStore.total - advanceAmount).toFixed(2)}
                                        </h4>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div className="order-action-btn">
                            <Button
                                onClick={handleCreateOrder}
                                disabled={createOrder?.isPending}
                                className="theme-primary-btn order-btn"
                            >
                                {createOrder?.isPending ? (
                                    <LoaderWithMessage message={t("placing_order")} />
                                ) : (createPaymentIntent?.isPending || isRedirectingToPaymob ? (
                                    <LoaderWithMessage message={t("initiating_payment")} />
                                ) : t("place_order"))}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteOrderPage;