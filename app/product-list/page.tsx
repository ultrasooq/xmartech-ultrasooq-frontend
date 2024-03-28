"use client";
import React from "react";
import {
  Card, CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
const ProductListPage = () => {
  return <section className="body-content-s1">
    <div className="custom-container-s1">
      <Card className="body-content-s1-card">
        <CardHeader className="body-content-s1-search">
          <Input type="email" placeholder="Search Product" className="search-box" />
        </CardHeader>

        <CardContent className="main-content">
          <Card className="main-content-card">
            <div className="table-responsive theme-table-s1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU No</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell th-name="Product">
                      <figure className="product-image-with-text">
                        <div className="image-container">
                          <img src="/images/product-img1.png" alt="" />
                        </div>
                        <figcaption>Lorem Ipsum</figcaption>
                      </figure>
                    </TableCell>
                    <TableCell th-name="Category">eLECTRONICS</TableCell>
                    <TableCell th-name="SKU No">SF1133569600-1</TableCell>
                    <TableCell th-name="Brand">new</TableCell>
                    <TableCell th-name="Price">$1,150.00</TableCell>
                    <TableCell th-name="Action">
                      <div className="td-action-btns">
                        <Button type="button" className="td-circle-btn edit"><img src="/images/td-edit-icon.svg" alt="" /></Button>
                        <Button type="button" className="td-circle-btn trash"><img src="/images/td-trash-icon.svg" alt="" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell th-name="Product">
                      <figure className="product-image-with-text">
                        <div className="image-container">
                          <img src="/images/product-img2.png" alt="" />
                        </div>
                        <figcaption>Lorem Ipsum</figcaption>
                      </figure>
                    </TableCell>
                    <TableCell th-name="Category">eLECTRONICS</TableCell>
                    <TableCell th-name="SKU No">SF1133569600-1</TableCell>
                    <TableCell th-name="Brand">new</TableCell>
                    <TableCell th-name="Price">$1,150.00</TableCell>
                    <TableCell th-name="Action">
                      <div className="td-action-btns">
                        <Button type="button" className="td-circle-btn edit"><img src="/images/td-edit-icon.svg" alt="" /></Button>
                        <Button type="button" className="td-circle-btn trash"><img src="/images/td-trash-icon.svg" alt="" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell th-name="Product">
                      <figure className="product-image-with-text">
                        <div className="image-container">
                          <img src="/images/product-img3.png" alt="" />
                        </div>
                        <figcaption>Lorem Ipsum</figcaption>
                      </figure>
                    </TableCell>
                    <TableCell th-name="Category">eLECTRONICS</TableCell>
                    <TableCell th-name="SKU No">SF1133569600-1</TableCell>
                    <TableCell th-name="Brand">new</TableCell>
                    <TableCell th-name="Price">$1,150.00</TableCell>
                    <TableCell th-name="Action">
                      <div className="td-action-btns">
                        <Button type="button" className="td-circle-btn edit"><img src="/images/td-edit-icon.svg" alt="" /></Button>
                        <Button type="button" className="td-circle-btn trash"><img src="/images/td-trash-icon.svg" alt="" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell th-name="Product">
                      <figure className="product-image-with-text">
                        <div className="image-container">
                          <img src="/images/product-img4.png" alt="" />
                        </div>
                        <figcaption>Lorem Ipsum</figcaption>
                      </figure>
                    </TableCell>
                    <TableCell th-name="Category">eLECTRONICS</TableCell>
                    <TableCell th-name="SKU No">SF1133569600-1</TableCell>
                    <TableCell th-name="Brand">new</TableCell>
                    <TableCell th-name="Price">$1,150.00</TableCell>
                    <TableCell th-name="Action">
                      <div className="td-action-btns">
                        <Button type="button" className="td-circle-btn edit"><img src="/images/td-edit-icon.svg" alt="" /></Button>
                        <Button type="button" className="td-circle-btn trash"><img src="/images/td-trash-icon.svg" alt="" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell th-name="Product">
                      <figure className="product-image-with-text">
                        <div className="image-container">
                          <img src="/images/product-img5.png" alt="" />
                        </div>
                        <figcaption>Lorem Ipsum</figcaption>
                      </figure>
                    </TableCell>
                    <TableCell th-name="Category">eLECTRONICS</TableCell>
                    <TableCell th-name="SKU No">SF1133569600-1</TableCell>
                    <TableCell th-name="Brand">new</TableCell>
                    <TableCell th-name="Price">$1,150.00</TableCell>
                    <TableCell th-name="Action">
                      <div className="td-action-btns">
                        <Button type="button" className="td-circle-btn edit"><img src="/images/td-edit-icon.svg" alt="" /></Button>
                        <Button type="button" className="td-circle-btn trash"><img src="/images/td-trash-icon.svg" alt="" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell th-name="Product">
                      <figure className="product-image-with-text">
                        <div className="image-container">
                          <img src="/images/product-img6.png" alt="" />
                        </div>
                        <figcaption>Lorem Ipsum</figcaption>
                      </figure>
                    </TableCell>
                    <TableCell th-name="Category">eLECTRONICS</TableCell>
                    <TableCell th-name="SKU No">SF1133569600-1</TableCell>
                    <TableCell th-name="Brand">new</TableCell>
                    <TableCell th-name="Price">$1,150.00</TableCell>
                    <TableCell th-name="Action">
                      <div className="td-action-btns">
                        <Button type="button" className="td-circle-btn edit"><img src="/images/td-edit-icon.svg" alt="" /></Button>
                        <Button type="button" className="td-circle-btn trash"><img src="/images/td-trash-icon.svg" alt="" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <ul className="theme-pagination-s1">
              <li>
                <Button type="button" className="theme-primary-btn frist"><img src="/images/pagination-frist.svg" alt="" /> Frist</Button>
              </li>
              <li>
                <Button type="button" className="nextPrev"><img src="/images/pagination-prev.svg" alt="" /></Button>
              </li>
              <li>
                <Button type="button" className="current">1</Button>
              </li>
              <li>
                <Button type="button">2</Button>
              </li>
              <li>
                <Button type="button">3</Button>
              </li>
              <li>
                <Button type="button">4</Button>
              </li>
              <li>
                <Button type="button">5</Button>
              </li>
              <li>
                <Button type="button" className="nextPrev"><img src="/images/pagination-next.svg" alt="" /></Button>
              </li>
              <li>
                <Button type="button" className="theme-primary-btn last">Last <img src="/images/pagination-last.svg" alt="" /></Button>
              </li>
            </ul>
          </Card>
        </CardContent>

      </Card>
    </div>
  </section>;
};

export default ProductListPage;
