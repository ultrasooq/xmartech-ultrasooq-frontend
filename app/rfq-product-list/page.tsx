"use client";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import Pagination from "@/components/shared/Pagination";
import { useAllRfqQuotesByBuyerId } from "@/apis/queries/rfq.queries";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/shared/Footer";
import { MONTHS } from "@/utils/constants";
import validator from "validator";
import Image from "next/image";
import PlaceholderImage from "@/public/images/product-placeholder.png";
import Link from "next/link";

const RfqProductList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const rfqQuotesByBuyerIdQuery = useAllRfqQuotesByBuyerId({
    page,
    limit,
  });

  const memoizedRfqQuotesProducts = useMemo(() => {
    return (
      rfqQuotesByBuyerIdQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productImages:
            item?.rfqQuotesProducts?.map(
              (ele: any) => ele?.rfqProductDetails?.productImages?.[0]?.image,
            ) || [],
          rfqDate: item?.rfqQuotes_rfqQuoteAddress?.rfqDate || "-",
        };
      }) || []
    );
  }, [rfqQuotesByBuyerIdQuery.data?.data]);

  const formatDate = useMemo(
    () => (originalDateString: string) => {
      const originalDate = new Date(originalDateString);

      const year = originalDate.getFullYear();
      const monthIndex = originalDate.getMonth();
      const day = originalDate.getDate();
      const hours = originalDate.getHours();
      const minutes = originalDate.getMinutes();
      const seconds = originalDate.getSeconds();
      const amOrPm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const formattedDateString = `${MONTHS[monthIndex]} ${day}, ${year}  ${formattedHours}:${minutes}:${seconds} ${amOrPm}`;

      return formattedDateString;
    },
    [memoizedRfqQuotesProducts],
  );

  return (
    <>
      <div className="rfq-product-list-page">
        <div className="sec-bg">
          <img src="/images/rfq-product-list-sec-bg.png" alt="" />
        </div>
        <div className="container m-auto px-3">
          <div className="headerpart">
            <h2>RFQ Product</h2>
          </div>
          <div className="rfq-product-list-card">
            <div className="table-responsive theme-table-s1 min-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>RFQ ID</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>No Of Quote</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memoizedRfqQuotesProducts?.map((item: any) => (
                    <TableRow key={item?.id}>
                      <TableCell>
                        <Link href={`/rfq-request?rfqQuotesId=${item?.id}`}>
                          <div className="td-product-group-images">
                            {item?.productImages?.map((ele: any) => (
                              <div key={ele} className="img-item">
                                <div className="img-container relative h-[80px] w-[80px]">
                                  <Image
                                    src={
                                      ele && validator.isURL(ele)
                                        ? ele
                                        : PlaceholderImage
                                    }
                                    fill
                                    alt="preview"
                                  />
                                </div>
                              </div>
                            ))}
                            {/* <div className="img-item">
                            <div className="img-container">
                              <img src="/images/pro1.png" alt="" />
                            </div>
                          </div>
                          <div className="img-item">
                            <div className="img-container">
                              <img src="/images/pro2.png" alt="" />
                            </div>
                          </div>
                          <div className="img-item">
                            <div className="img-container">
                              <img src="/images/pro3.png" alt="" />
                            </div>
                          </div>
                          <div className="img-item">
                            <div className="img-container">
                              <img src="/images/pro4.png" alt="" />
                              <span>+5</span>
                            </div>
                          </div> */}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>RFQ000{item?.id}</TableCell>
                      <TableCell>
                        <p className="text-sm">{formatDate(item?.rfqDate)}</p>
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell th-name="Action">
                        <div className="td-dots-dropdown">
                          <button
                            className="td-dots-dropdown-btn"
                            type="button"
                          >
                            <HiOutlineDotsCircleHorizontal />
                          </button>
                          <div className="td-dots-dropdown-menu">
                            <Link
                              href={`/rfq-request?rfqQuotesId=${item?.id}`}
                              className="td-dots-dropdown-item"
                            >
                              <span className="icon-container">
                                <img
                                  src="/images/td-view-icon.svg"
                                  height={"auto"}
                                  width={"auto"}
                                  alt=""
                                />
                              </span>
                              View
                            </Link>
                            <button
                              type="button"
                              className="td-dots-dropdown-item"
                            >
                              <span className="icon-container">
                                <img
                                  src="/images/td-trash-icon.svg"
                                  height={"auto"}
                                  width={"auto"}
                                  alt=""
                                />
                              </span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {rfqQuotesByBuyerIdQuery?.isLoading ? (
                <div className="my-2 space-y-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full" />
                  ))}
                </div>
              ) : null}

              {!memoizedRfqQuotesProducts.length &&
              !rfqQuotesByBuyerIdQuery.isLoading ? (
                <p className="py-10 text-center text-sm font-medium">
                  No Product Found
                </p>
              ) : null}

              {rfqQuotesByBuyerIdQuery.data?.totalCount > 5 ? (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalCount={rfqQuotesByBuyerIdQuery.data?.totalCount}
                  limit={limit}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RfqProductList;
