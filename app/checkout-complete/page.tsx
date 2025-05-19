"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const CheckoutCompletePage = () => {
    const t = useTranslations();
    const { langDir } = useAuth();
    const searchParams = useSearchParams();

    const success = searchParams?.get('success');

    return (
        <div className="text-center mt-10" dir={langDir}>
            <h1 className={`text-5xl ${success ? 'text-green-500' : 'text-red-500'}`} translate="no">
                {success ? t('success') : t('failed')}
            </h1>
            <p className="mt-2" translate="no">{t("transaction_id")}: {searchParams?.get('id')}</p>
            <p className="mt-2" translate="no">{t("order_id")}: {searchParams?.get('order')}</p>
            <p className="mt-2" translate="no">{t("transaction_note")}</p>
            <p className="mt-2">
                <Link 
                    className="cursor-pointer text-sm font-medium leading-8 text-dark-orange"
                    href="/my-orders"
                >
                    {t("track_your_order")}
                </Link>
            </p>
        </div>
    );
};

export default CheckoutCompletePage;