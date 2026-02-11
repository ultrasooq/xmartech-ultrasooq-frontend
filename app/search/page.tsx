"use client";
import React, { useEffect, useState, use } from "react";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import SearchedStoreProducts from "@/components/modules/serach/SearchedStoreProducts";
import SearchedBuygroupProducts from "@/components/modules/serach/SearchedBuygroupProducts";
import SearchedFactoryProducts from "@/components/modules/serach/SearchedFactoryProducts";
import { useCartListByDevice, useCartListByUserId } from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";
import SearchedServices from "@/components/modules/serach/SearchedServices";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Search, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SearchPageProps {
    searchParams?: Promise<{ term?: string }>;
}

const SearchPage = (props: SearchPageProps) => {
    const searchParams = props.searchParams ? use(props.searchParams) : { term: undefined };
    const t = useTranslations();
    const { langDir } = useAuth();
    const router = useRouter();
    const [haveAccessToken, setHaveAccessToken] = useState(false);
    const accessToken = getCookie(PUREMOON_TOKEN_KEY);
    const [cartList, setCartList] = useState<any[]>([]);
    const deviceId = getOrCreateDeviceId() || '';
    const [storeProductsCount, setStoreProductsCount] = useState<number>();
    const [buygroupProductsCount, setBuygroupProductsCount] = useState<number>();
    const [factoryProductsCount, setFactoryProductsCount] = useState<number>();
    const [servicesCount, setServicesCount] = useState<number>();

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

    const hasResults = (storeProductsCount || 0) + (buygroupProductsCount || 0) + (factoryProductsCount || 0) + (servicesCount || 0) > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full px-6 lg:px-12 py-6">
                {/* Search Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                            <Search className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-900" dir={langDir}>
                                Search Results
                            </h1>
                            <p className="text-gray-500 text-xs mt-1" dir={langDir}>
                                {searchParams?.term ? `Results for "${searchParams.term}"` : 'Searching...'}
                            </p>
                        </div>
                        {searchParams?.term && hasResults && (
                            <div className="hidden md:block">
                                <span className="text-xs text-gray-600">
                                    {(storeProductsCount || 0) + (buygroupProductsCount || 0) + (factoryProductsCount || 0) + (servicesCount || 0)} results
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* RFQ Banner Message - Show when search term exists */}
                {searchParams?.term && (
                    <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 md:p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900 mb-1 md:text-base" dir={langDir}>
                                    {t("search_rfq_banner_title") || "Can't find what you're looking for?"}
                                </h3>
                                <p className="text-xs text-gray-600 mb-3 md:text-sm" dir={langDir}>
                                    {t("search_rfq_banner_message") || "If you can't find the product you're looking for, make an RFQ and we will answer you within 72 hours."}
                                </p>
                                <Link href="/rfq">
                                    <Button
                                        className="h-8 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white md:h-9 md:px-6 md:text-sm"
                                        dir={langDir}
                                    >
                                        {t("create_rfq") || "Create RFQ"}
                                        <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Combined Product Grid */}
                <>
                    {/* Store Products */}
                    <SearchedStoreProducts
                        searchTerm={searchParams?.term}
                        haveAccessToken={haveAccessToken}
                        cartList={cartList}
                        setRecordsCount={(count) => setStoreProductsCount(count)}
                        hideHeader={true}
                    />

                    {/* Buygroup Products */}
                    <SearchedBuygroupProducts
                        searchTerm={searchParams?.term}
                        haveAccessToken={haveAccessToken}
                        cartList={cartList}
                        setRecordsCount={(count) => setBuygroupProductsCount(count)}
                        hideHeader={true}
                    />

                    {/* Factory Products (only for logged in users) */}
                    {haveAccessToken && (
                        <SearchedFactoryProducts
                            searchTerm={searchParams?.term}
                            haveAccessToken={haveAccessToken}
                            cartList={cartList}
                            setRecordsCount={(count) => setFactoryProductsCount(count)}
                            hideHeader={true}
                        />
                    )}

                    {/* Services (only for logged in users) */}
                    {haveAccessToken && (
                        <SearchedServices
                            searchTerm={searchParams?.term}
                            haveAccessToken={haveAccessToken}
                            cartList={cartList}
                            setRecordsCount={(count) => setServicesCount(count)}
                            hideHeader={true}
                        />
                    )}
                </>

                {/* No Results Message */}
                {!hasResults && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2" dir={langDir}>
                            No Results Found
                        </h3>
                        <p className="text-gray-500 text-sm text-center max-w-md mb-4" dir={langDir}>
                            We couldn't find any results for "{searchParams?.term}". Try searching with different keywords.
                        </p>
                        {/* Add RFQ button in no results section too */}
                        <Link href="/rfq">
                            <Button
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                                dir={langDir}
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                {t("create_rfq_request") || "Create RFQ Request"}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
};

export default SearchPage;