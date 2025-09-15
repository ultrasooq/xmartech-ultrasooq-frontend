"use client";
import React, { useEffect, useState, use } from "react";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMe } from "@/apis/queries/user.queries";
import SearchedStoreProducts from "@/components/modules/serach/SearchedStoreProducts";
import SearchedBuygroupProducts from "@/components/modules/serach/SearchedBuygroupProducts";
import SearchedFactoryProducts from "@/components/modules/serach/SearchedFactoryProducts";
import SearchedRfqProducts from "@/components/modules/serach/SearchedRfqProducts";
import { useCartListByDevice, useCartListByUserId } from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import SearchedServices from "@/components/modules/serach/SearchedServices";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

interface SearchPageProps {
    searchParams?: Promise<{ term?: string }>;
}

const SearchPage = (props: SearchPageProps) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations();
    const { langDir } = useAuth();
    const router = useRouter();
    const [haveAccessToken, setHaveAccessToken] = useState(false);
    const accessToken = getCookie(PUREMOON_TOKEN_KEY);
    const me = useMe();
    const [storeProductsCount, setStoreProductsCount] = useState<number>();
    const [buygroupProductsCount, setBuygroupProductsCount] = useState<number>();
    const [factoryProductsCount, setFactoryProductsCount] = useState<number>();
    const [rfqProductsCount, setRfqProductsCount] = useState<number>();
    const [servicesCount, setServicesCount] = useState<number>();
    const [cartList, setCartList] = useState<any[]>([]);
    const deviceId = getOrCreateDeviceId() || '';

    const cartListByDeviceQuery = useCartListByDevice(
        {
            page: 1,
            limit: 100,
            deviceId,
        },
        !haveAccessToken,
    );

    const cartListByUser = useCartListByUserId(
        {
            page: 1,
            limit: 100,
        },
        haveAccessToken,
    );

    useEffect(() => {
        if (cartListByUser.data?.data) {
            setCartList((cartListByUser.data?.data || []).map((item: any) => item));
        } else if (cartListByDeviceQuery.data?.data) {
            setCartList(
                (cartListByDeviceQuery.data?.data || []).map((item: any) => item),
            );
        }
    }, [cartListByUser.data?.data, cartListByDeviceQuery.data?.data]);

    useEffect(() => {
        if (accessToken) {
            setHaveAccessToken(true);
        } else {
            setHaveAccessToken(false);
        }
    }, [accessToken]);

    useEffect(() => {
        if (!searchParams?.term) router.push("/trending");
    }, []);

    return (
        <>
            <SearchedStoreProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
                setRecordsCount={(count) => setStoreProductsCount(count)}
            />

            <SearchedBuygroupProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
                setRecordsCount={(count) => setBuygroupProductsCount(count)}
            />

            {haveAccessToken ? (<SearchedFactoryProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
                setRecordsCount={(count) => setFactoryProductsCount(count)}
            />) : null}

            {haveAccessToken ? (<SearchedRfqProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                setRecordsCount={(count) => setRfqProductsCount(count)}
            />) : null}

            {haveAccessToken ? (<SearchedServices
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
                setRecordsCount={(count) => setServicesCount(count)}
            />) : null}

            {!haveAccessToken && 
            storeProductsCount === 0 && 
            buygroupProductsCount === 0 ? (
                <p
                    className="text-center text-sm font-medium mt-2"
                    dir={langDir}
                    translate="no"
                >
                    {t("no_data_found")}
                </p>
            ) : null}

            {haveAccessToken && 
            storeProductsCount === 0 && 
            buygroupProductsCount === 0 && 
            factoryProductsCount === 0 && 
            rfqProductsCount === 0 && 
            servicesCount === 0 ? (
                <p
                    className="text-center text-sm font-medium mt-2"
                    dir={langDir}
                    translate="no"
                >
                    {t("no_data_found")}
                </p>
            ) : null}
        </>
    )
};

export default SearchPage;