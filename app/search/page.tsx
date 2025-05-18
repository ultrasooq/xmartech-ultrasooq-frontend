"use client";
import React, { useEffect, useState } from "react";
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

interface SearchPageProps {
    searchParams?: { term?: string };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
    const router = useRouter();
    const [haveAccessToken, setHaveAccessToken] = useState(false);
    const accessToken = getCookie(PUREMOON_TOKEN_KEY);
    const me = useMe();
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
        if (!searchParams?.term) router.push("/trending")
    }, []);

    return (
        <>
            <SearchedStoreProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
            />

            <SearchedBuygroupProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
            />

            {haveAccessToken ? (<SearchedFactoryProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
            />) : null}

            {haveAccessToken ? (<SearchedRfqProducts
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
            />) : null}

            {haveAccessToken ? (<SearchedServices
                searchTerm={searchParams?.term}
                haveAccessToken={haveAccessToken}
                cartList={cartList}
            />) : null}
        </>
    )
};

export default SearchPage;