"use client";

import React from "react";
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
const RfqProductList = () => {
  return <>
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
                <TableRow>
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
                  <TableCell>00004125</TableCell>
                  <TableCell>Oct 21, 2024  10:40:23 pm</TableCell>
                  <TableCell>15</TableCell>
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
                <TableRow>
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
                  <TableCell>00004125</TableCell>
                  <TableCell>Oct 21, 2024  10:40:23 pm</TableCell>
                  <TableCell>15</TableCell>
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
                <TableRow>
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
                  <TableCell>00004125</TableCell>
                  <TableCell>Oct 21, 2024  10:40:23 pm</TableCell>
                  <TableCell>15</TableCell>
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
              </TableBody>
            </Table>
            <ul className="theme-pagination-s1">
              <li>
                <button type="button" className="theme-primary-btn first">
                  <Image
                    src="/images/pagination-first.svg"
                    alt="next-icon"
                    height={0}
                    width={0}
                    className="h-auto w-[7px]"
                  />
                  First
                </button>
              </li>
              <li>
                <button type="button" className="nextPrev">
                  <Image
                    src="/images/pagination-prev.svg"
                    alt="prev-icon"
                    height={0}
                    width={0}
                    className="h-auto w-[7px]"
                  />
                </button>
              </li>
              <li>
                <button type="button" className="current">
                  1
                </button>
              </li>

              <li>
                <button type="button" className="nextPrev">
                  <Image
                    src="/images/pagination-next.svg"
                    alt="next-icon"
                    height={0}
                    width={0}
                    className="h-auto w-[7px]"
                  />
                </button>
              </li>
              <li>
                <button type="button" className="theme-primary-btn last">
                  Last
                  <Image
                    src="/images/pagination-last.svg"
                    alt="next-icon"
                    height={0}
                    width={0}
                    className="h-auto w-[7px]"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default RfqProductList;
