"use client"; // Add this at the top
import React, { useMemo, useState } from "react";
import { useShareLinksBySellerReward } from "@/apis/queries/seller-reward.queries";
import Pagination from "@/components/shared/Pagination";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PERMISSION_SELLER_REWARDS, checkPermission } from "@/helpers/permission";
import RedirectComponent from "@/components/RedirectComponent";

const SellerRewardDetailPage = () => {
    if (!checkPermission(PERMISSION_SELLER_REWARDS)) return (<RedirectComponent to={"/home"} />)

    const searchParams = useParams();
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);

    const sharedLinksBySellerRewardQuery = useShareLinksBySellerReward({
        page: page,
        limit: limit,
        sellerRewardId: searchParams?.id ? (searchParams.id as string) : "",
        sortType: "desc"
    });

    const sharedLinks = useMemo(() => {
        return (sharedLinksBySellerRewardQuery?.data?.data || []).map((link: any) => {
            link.userName = '---';
            if (link.linkGeneratedByDetail) {
                link.userName = `${link?.linkGeneratedByDetail?.firstName} ${link?.linkGeneratedByDetail?.lastName}`;
            }
            return link;
        });
    }, [
        sharedLinksBySellerRewardQuery?.data?.data,
        page,
        limit
    ]);

    return (
        <section className="team_members_section">
            <div className="container relative z-10 m-auto px-3">
                <div className="flex w-full flex-wrap">
                    <div className="team_members_heading w-full">
                        <h1>Share Links</h1>
                        <div className="flex justify-end gap-3">
                            <Link
                                href={"/seller-rewards"}
                                className="flex items-center rounded-md border-0 bg-dark-orange px-3 py-2 text-sm font-medium capitalize leading-6 text-white"
                            >
                                Back
                            </Link>
                        </div>
                    </div>

                    <div className="team_members_table w-full">
                        {!sharedLinksBySellerRewardQuery?.isLoading && sharedLinks.length ? (
                            <>
                                <table cellPadding={0} cellSpacing={0} border={0}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>Total Sell</th>
                                            <th>Orders Placed</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sharedLinks?.map((item: any) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.userName}</td>
                                                    <td>{item?.linkGeneratedByDetail?.phoneNumber}</td>
                                                    <td>{item.myTotalSell || 0}</td>
                                                    <td>{item.ordersPlaced || 0}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : null}

                        {!sharedLinksBySellerRewardQuery?.isLoading && !sharedLinks.length ? (
                            <p className="py-10 text-center text-sm font-medium">
                                No Data Found
                            </p>
                        ) : null}

                        {sharedLinksBySellerRewardQuery.data?.totalCount > limit && (
                            <Pagination
                                page={page}
                                setPage={setPage}
                                totalCount={sharedLinksBySellerRewardQuery.data?.totalCount}
                                limit={limit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerRewardDetailPage;