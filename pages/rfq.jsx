import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const RFQ = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>RFQ</title>
            </Head>
            
            <section className="rfq_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 rfq_main_box">
                            <div className="rfq_left">
                                <div className="product_filter_box">
                                    <div className="product_filter_box_head">
                                        <h4>Categories</h4>
                                        <img src="images/symbol.svg"/>
                                    </div>
                                    <div className="check_filter">
                                        <div className="categori_list">
                                            <a href="">Clothing & Apparel</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Garden & Kitchen</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Consumer Electrics</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Health & Beauty</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Computers & Technologies</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Jewelry & Watches</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Phones & Accessories</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Sport & Outdoor</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Babies and Moms</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Books & Office</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Cars & Motocycles</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Fruits</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Meat</a>
                                        </div>
                                        <div className="categori_list">
                                            <a href="">Book</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="product_filter_box">
                                    <div className="product_filter_box_head">
                                        <h4>By Brand</h4>
                                        <img src="images/symbol.svg"/>
                                    </div>
                                    <div class="product_search_bar">
                                        <button type="button"><img src="images/search.png"/></button>
                                        <input type="search" name="" placeholder="Search Brand" form-control=""/>
                                    </div>
                                    <div className="check_filter">
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                SAMSUNG
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                vivo
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                oppo
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                apple
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                realme
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                poco
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                google
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                redmi
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                mi
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                lava
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                nokia
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                KARBONN
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                itel
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                OnePlus
                                            </label>
                                        </div>
                                        <div className="terms_check">
                                            <label className="remember_checkbox">
                                                <input type="checkbox" name=""/>
                                                <span className="checkmark"></span>
                                                Tecno
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rfq_middle">
                                <div className="rfq_middle_top">
                                    <div className="rfq_search">
                                        <input type="search" class="form-control" placeholder="Search Product"/>
                                        <button type="button"><img src="images/search-icon-rfq.png"/></button>
                                    </div>
                                    <div className="rfq_add_new_product">
                                        <button type="button"><img src="images/plus-icon-white.png"/> add new product in RFQ</button>
                                    </div>
                                </div>
                                <div className="product_section product_gray_n_box">
                                    <div className="row">
                                        <div className="col-lg-12 products_sec_wrap">
                                            <div className="products_sec_top">
                                                <div className="products_sec_top_left">
                                                    <h4> trending & high rate product</h4>
                                                </div>
                                                <div className="products_sec_top_right">
                                                    <div className="trending_filter">
                                                        <select>
                                                            <option>Sort by latest</option>
                                                            <option>Price Hight to Low</option>
                                                            <option>Price Low to High</option>
                                                            <option>Customer Rating</option>
                                                            <option>What's New</option>
                                                            <option>Popularity</option>
                                                        </select>
                                                    </div>
                                                    <div className="trending_view">
                                                        <ul>
                                                            <li>View</li>
                                                            <li><a href="#"><img src="images/view-t.svg"/></a></li>
                                                            <li><a href="#"><img src="images/view-l.svg"/></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product_sec_list">
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-6.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-5.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-1.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-2.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-6.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-5.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-1.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-2.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-6.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-5.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-1.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product_list_part">
                                                    <div className="product_list_image">
                                                        <img src="images/pro-2.png"/>
                                                    </div>
                                                    <div className="product_list_content">
                                                        <p><a href="#">Lorem Ipsum is simply dummy text..</a></p>
                                                        <div className="quantity_wrap">
                                                            <label>Quantity</label>
                                                            <div class="quantity">
                                                                <button class="adjust_field minus">-</button>
                                                                <input type="text" value="1"/>
                                                                <button class="adjust_field plus">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="cart_button">
                                                            <button type="button" className="add_to_cart_button">Add To RFQ Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pagination">
                                                <a href="#" className="first_pagination"><img src="images/pagination-left-white-arrow.svg"/> Frist</a>
                                                <a href="#"><img src="images/pagination-left-arrow.svg"/></a>
                                                <a href="#">1</a>
                                                <a class="active" href="#">2</a>
                                                <a href="#">3</a>
                                                <a href="#">4</a>
                                                <a href="#">5</a>
                                                <a href="#">6</a>
                                                <a href="#"><img src="images/pagination-right-arrow.svg"/></a>
                                                <a href="#" className="last_pagination">Last <img src="images/pagination-right-white-arrow.svg"/></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rfq_right">
                                <div className="rfq_right_top">
                                    <h4>RFQ Cart</h4>
                                    <p>Lorem ipsum dolor sit amet, </p>
                                    <button type="button">Request For Quote</button>
                                </div>
                                <div className="rfq_right_bottom">
                                    <h4>Your RFQ Cart (3 items)</h4>
                                    <div className="rfq_cart_wrap">
                                        <div className="rfq_cart_wrap_image">
                                            <img src="images/pro-6.png"/>
                                        </div>
                                        <div className="rfq_cart_wrap_content">
                                            <div className="rfq_cart_wrap_content_top">
                                                <a href="#">Lorem Ipsum is simply dummy text..</a>
                                                <div className="pen_gray_icon">
                                                    <img src="images/pen-gray-icon.png"/>
                                                </div>
                                            </div>
                                            <div className="rfq_cart_wrap_content_top_bottom">
                                                <div class="quantity">
                                                    <button class="adjust_field minus">-</button>
                                                    <input type="text" value="1"/>
                                                    <button class="adjust_field plus">+</button>
                                                </div>
                                                <div className="remove_text">
                                                    <span>Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rfq_cart_wrap">
                                        <div className="rfq_cart_wrap_image">
                                            <img src="images/pro-5.png"/>
                                        </div>
                                        <div className="rfq_cart_wrap_content">
                                            <div className="rfq_cart_wrap_content_top">
                                                <a href="#">Lorem Ipsum is simply dummy text..</a>
                                                <div className="pen_gray_icon">
                                                    <img src="images/pen-gray-icon.png"/>
                                                </div>
                                            </div>
                                            <div className="rfq_cart_wrap_content_top_bottom">
                                                <div class="quantity">
                                                    <button class="adjust_field minus">-</button>
                                                    <input type="text" value="1"/>
                                                    <button class="adjust_field plus">+</button>
                                                </div>
                                                <div className="remove_text">
                                                    <span>Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rfq_cart_wrap">
                                        <div className="rfq_cart_wrap_image">
                                            <img src="images/pro-2.png"/>
                                        </div>
                                        <div className="rfq_cart_wrap_content">
                                            <div className="rfq_cart_wrap_content_top">
                                                <a href="#">Lorem Ipsum is simply dummy text..</a>
                                                <div className="pen_gray_icon">
                                                    <img src="images/pen-gray-icon.png"/>
                                                </div>
                                            </div>
                                            <div className="rfq_cart_wrap_content_top_bottom">
                                                <div class="quantity">
                                                    <button class="adjust_field minus">-</button>
                                                    <input type="text" value="1"/>
                                                    <button class="adjust_field plus">+</button>
                                                </div>
                                                <div className="remove_text">
                                                    <span>Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            

        </SiteLayout>
    )

}


export default withRouter(RFQ);