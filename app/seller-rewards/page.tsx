"use client"; // Add this at the top
import React, { useMemo, useRef, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { useCreateShareLink, useSellerRewards } from "@/apis/queries/seller-reward.queries";
import { Link } from "lucide-react";
import Image from "next/image";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Button } from "react-day-picker";
import { toast } from "@/components/ui/use-toast";

const SellerRewardsPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const sellerRewardsQuery = useSellerRewards({
        page: page,
        limit: limit
    });

    const sellerRewards = useMemo(() => {
        return sellerRewardsQuery?.data?.data || [];
    }, [sellerRewardsQuery?.data?.data]);

    const generateShareLink = useCreateShareLink();

    const createShareLink = async (sellerRewardId: number) => {
        const response = await generateShareLink.mutateAsync({
            sellerRewardId: sellerRewardId,
        });

        if (response.status) {
            toast({
                title: "Share Link Created Successfully",
                description: response.message,
                variant: "success",
            });
        } else {
            toast({
                title: "Share Link Create Failed",
                description: response.message,
                variant: "danger",
            });
        }
    };

    return (
        <section className="team_members_section">
            <div className="container relative z-10 m-auto px-3">
                <div className="flex w-full flex-wrap">
                    <div className="team_members_heading w-full">
                        <h1>Seller Rewards</h1>
                    </div>
                    <div className="team_members_table w-full">
                        {!sellerRewardsQuery?.isLoading && sellerRewards.length ? (
                            <>
                                <table cellPadding={0} cellSpacing={0} border={0}>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Reward Amount</th>
                                            <th>Reward Percentage</th>
                                            <th>Minimum Order</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sellerRewards?.filter((item: any) => item.productDetail).map((item: any) => {
                                            
                                            let image = item.productDetail?.productImages[0].image || PlaceholderImage;
                                            return (
                                                <tr key={item.id}>
                                                    <td>
                                                        {item?.productDetail?.productName}
                                                    </td>
                                                    <td>{item.startTime || "--"}</td>
                                                    <td>{item.endTime || "---"}</td>
                                                    <td>{item.rewardFixAmount || "--"}</td>
                                                    <td>{item.rewardPercentage || "--"}</td>
                                                    <td>{item.minimumOrder || "--"}</td>
                                                    <td>
                                                        <button onClick={() => createShareLink(item.id)}>
                                                            Generate Share Link
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : null}

                        {!sellerRewardsQuery?.isLoading && !sellerRewards.length ? (
                            <p className="py-10 text-center text-sm font-medium">
                                No Data Found
                            </p>
                        ) : null}

                        {sellerRewardsQuery.data?.totalCount > limit && (
                            <Pagination
                                page={page}
                                setPage={setPage}
                                totalCount={sellerRewardsQuery.data?.totalCount}
                                limit={limit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerRewardsPage;