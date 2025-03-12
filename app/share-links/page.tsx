"use client"; // Add this at the top
import React, { useMemo, useRef, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { useCreateShareLink, useShareLinks } from "@/apis/queries/seller-reward.queries";
import { Link } from "lucide-react";
import Image from "next/image";
import validator from "validator";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import { Button } from "react-day-picker";
import { toast } from "@/components/ui/use-toast";
import { PERMISSION_SHARE_LINKS, checkPermission } from "@/helpers/permission";
import RedirectComponent from "@/components/RedirectComponent";

const ShareLinksPage = () => {
    if (!checkPermission(PERMISSION_SHARE_LINKS)) return (<RedirectComponent to={"/home"} />)

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const shareLinksQuery = useShareLinks({
        page: page,
        limit: limit,
        sortType: "desc"
    });

    const shareLinks = useMemo(() => {
        return shareLinksQuery?.data?.data || [];
    }, [
        shareLinksQuery?.data?.data,
        page,
        limit,
    ]);

    const copyShareLink = (id: number, productId: number) => {
        // navigator.clipboard.writeText();
        var textField = document.createElement('textarea')
        textField.innerText = `${location.origin}/share/${productId}?share=${id}`;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast({
            title: "Copied",
            description: '',
            variant: "success",
        });
    };

    return (
        <section className="team_members_section">
            <div className="container relative z-10 m-auto px-3">
                <div className="flex w-full flex-wrap">
                    <div className="team_members_heading w-full">
                        <h1>Share Links</h1>
                    </div>
                    <div className="team_members_table w-full">
                        {!shareLinksQuery?.isLoading && shareLinks.length ? (
                            <>
                                <table cellPadding={0} cellSpacing={0} border={0}>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {shareLinks?.filter((item: any) => item.productDetail).map((item: any) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>
                                                        {item?.productDetail?.productName}
                                                    </td>
                                                    <td>
                                                        <button type="button" onClick={() => copyShareLink(item.id, item.productId)}>
                                                            Copy Share Link
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : null}

                        {!shareLinksQuery?.isLoading && !shareLinks.length ? (
                            <p className="py-10 text-center text-sm font-medium">
                                No Data Found
                            </p>
                        ) : null}

                        {shareLinksQuery.data?.totalCount > limit && (
                            <Pagination
                                page={page}
                                setPage={setPage}
                                totalCount={shareLinksQuery.data?.totalCount}
                                limit={limit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShareLinksPage;