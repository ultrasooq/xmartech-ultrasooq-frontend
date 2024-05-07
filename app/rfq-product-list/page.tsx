"use client";
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import Image from "next/image";
import Pagination from "@/components/shared/Pagination";
import { useAllRfqQuotesByBuyerId } from "@/apis/queries/rfq.queries";

const RfqProductList = () => {
  const rfqQuotesByBuyerIdQuery = useAllRfqQuotesByBuyerId({
    page: 1,
    limit: 10,
  });

  const memoizedRfqQuotesProducts = useMemo(() => {
    return (
      rfqQuotesByBuyerIdQuery.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          productImage: item?.productImages?.[0]?.image,
          productName: item?.productName || "-",
          categoryName: item?.category?.name || "-",
          skuNo: item?.skuNo || "-",
          brandName: item?.brand?.brandName || "-",
          productPrice: item?.productPrice || "-",
          status: item?.status || "-",
        };
      }) || []
    );
  }, [rfqQuotesByBuyerIdQuery.data?.data]);

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
                        <div className="td-product-group-images">
                          <div className="img-item">
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
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>RFQ000{item?.id}</TableCell>
                      <TableCell>-</TableCell>
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
                            <button
                              type="button"
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
                            </button>
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
              {memoizedRfqQuotesProducts.length > 10 ? <Pagination /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RfqProductList;
