"use client";
import React, { useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { IBrands, ISelectOptions } from "@/utils/types/common.types";
import { useBrands } from "@/apis/queries/masters.queries";
import { Checkbox } from "@/components/ui/checkbox";
import { useAllProducts } from "@/apis/queries/product.queries";
import ProductCard from "@/components/modules/trending/ProductCard";

const TrendingPage = () => {
  const allProductsQuery = useAllProducts({
    page: 1,
    limit: 20,
    sort: "desc",
  });
  const brandsQuery = useBrands();

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
  }, [brandsQuery?.data?.data?.length]);

  console.log(allProductsQuery.data?.data);

  const memoizedProductList = useMemo(() => {
    return (
      allProductsQuery?.data?.data?.map((item: any) => ({
        id: item.id,
        productName: item?.productName || "",
        productPrice: item?.productPrice || 0,
        offerPrice: item?.offerPrice || 0,
        productImage: item?.productImages?.[0]?.image,
      })) || []
    );
  }, [allProductsQuery?.data?.data?.length]);

  return (
    <>
      <div className="body-content-s1">
        {/* start: custom-inner-banner-s1 */}
        <div className="custom-inner-banner-s1">
          <div className="container m-auto px-3">
            <div className="custom-inner-banner-s1-captionBox">
              <img
                src="/images/trending-product-inner-banner.png"
                alt=""
                className="bg-image"
              ></img>
              <div className="text-container">
                <ul className="page-indicator">
                  <li>
                    <a href="#">Home</a>
                    <img src="/images/nextarow.svg" alt="" />
                  </li>
                  <li>
                    <a href="#">Shop</a>
                    <img src="/images/nextarow.svg" alt="" />
                  </li>
                  <li>Phones & Accessories</li>
                </ul>
                <h2>sed do eiusmod tempor incididunt</h2>
                <h5>Only 2 days:</h5>
                <h4>21/10 & 22/10</h4>
                <div className="action-btns">
                  <button
                    type="button"
                    className="theme-primary-btn custom-btn"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="image-container">
                <img
                  src="/images/trending-product-inner-banner-pic.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
        {/* end: custom-inner-banner-s1 */}

        {/* start: trending-search-sec */}
        <div className="trending-search-sec">
          <div className="container m-auto px-3">
            <div className="left-filter">
              <div className="filter-col">
                <div className="filter-sub-header">
                  <div className="filter-name-with-arow">
                    <h3>By Brand</h3>
                    <button type="button" className="arow-btn">
                      <img src="/images/down-arow-lg.svg" alt="" />
                    </button>
                  </div>
                  {/* TODO: search brand */}
                  <input
                    type="text"
                    className="custom-form-control-s1 searchInput"
                    placeholder="Search Brand"
                  ></input>
                </div>
                <div className="filter-body-part">
                  <div className="filter-checklists">
                    {memoizedBrands.map((item: ISelectOptions) => (
                      <div key={item.value} className="div-li">
                        <Checkbox
                          id={item.label}
                          className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={item.label}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="filter-col">
                <div className="filter-sub-header">
                  <div className="filter-name-with-arow">
                    <h3>Price</h3>
                    <button type="button" className="arow-btn">
                      <img src="/images/down-arow-lg.svg" alt="" />
                    </button>
                  </div>
                </div>

                <div className="filter-body-part">
                  <div className="mb-4">
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="range-price-left-right-info">
                    <select className="custom-form-control-s1 select1">
                      <option>$0</option>
                    </select>
                    <div className="center-divider"></div>
                    <select className="custom-form-control-s1 select1">
                      <option>$500</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-products">
              <div className="products-header-filter">
                <div className="le-info">
                  <h3>Phones & Accessories</h3>
                </div>
                <div className="rg-filter">
                  <p>16 Products found</p>
                  <ul>
                    <li>
                      <select className="custom-form-control-s1 select">
                        <option>Sort by latest</option>
                      </select>
                    </li>
                    {/* <li>View</li> */}
                    <li>
                      <button type="button" className="view-type-btn active">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4.17392 0H0.463769C0.207628 0 0 0.207629 0 0.463769V4.17392C0 4.43006 0.207628 4.63769 0.463769 4.63769H4.17392C4.43006 4.63769 4.63769 4.43006 4.63769 4.17392V0.463769C4.63769 0.207629 4.43006 0 4.17392 0ZM9.73914 0H6.02899C5.77285 0 5.56523 0.207629 5.56523 0.463769V4.17392C5.56523 4.43006 5.77285 4.63769 6.02899 4.63769H9.73914C9.99528 4.63769 10.2029 4.43006 10.2029 4.17392V0.463769C10.2029 0.207629 9.99528 0 9.73914 0ZM4.17392 5.56523H0.463769C0.207628 5.56523 0 5.77285 0 6.02899V9.73914C0 9.99528 0.207628 10.2029 0.463769 10.2029H4.17392C4.43006 10.2029 4.63769 9.99528 4.63769 9.73914V6.02899C4.63769 5.77285 4.43006 5.56523 4.17392 5.56523ZM9.73914 5.56523H6.02899C5.77285 5.56523 5.56523 5.77285 5.56523 6.02899V9.73914C5.56523 9.99528 5.77285 10.2029 6.02899 10.2029H9.73914C9.99528 10.2029 10.2029 9.99528 10.2029 9.73914V6.02899C10.2029 5.77285 9.99528 5.56523 9.73914 5.56523ZM15.3044 0H11.5942C11.3381 0 11.1305 0.207629 11.1305 0.463769V4.17392C11.1305 4.43006 11.3381 4.63769 11.5942 4.63769H15.3044C15.5605 4.63769 15.7681 4.43006 15.7681 4.17392V0.463769C15.7681 0.207629 15.5605 0 15.3044 0ZM15.3044 5.56523H11.5942C11.3381 5.56523 11.1305 5.77285 11.1305 6.02899V9.73914C11.1305 9.99528 11.3381 10.2029 11.5942 10.2029H15.3044C15.5605 10.2029 15.7681 9.99528 15.7681 9.73914V6.02899C15.7681 5.77285 15.5605 5.56523 15.3044 5.56523ZM4.17392 11.3623H0.463769C0.207628 11.3623 0 11.5699 0 11.8261V15.5362C0 15.7924 0.207628 16 0.463769 16H4.17392C4.43006 16 4.63769 15.7924 4.63769 15.5362V11.8261C4.63769 11.5699 4.43006 11.3623 4.17392 11.3623ZM9.73914 11.3623H6.02899C5.77285 11.3623 5.56523 11.5699 5.56523 11.8261V15.5362C5.56523 15.7924 5.77285 16 6.02899 16H9.73914C9.99528 16 10.2029 15.7924 10.2029 15.5362V11.8261C10.2029 11.5699 9.99528 11.3623 9.73914 11.3623ZM15.3044 11.3623H11.5942C11.3381 11.3623 11.1305 11.5699 11.1305 11.8261V15.5362C11.1305 15.7924 11.3381 16 11.5942 16H15.3044C15.5605 16 15.7681 15.7924 15.7681 15.5362V11.8261C15.7681 11.5699 15.5605 11.3623 15.3044 11.3623Z"
                            fill="#7F818D"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="view-type-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={16}
                          viewBox="0 0 24 16"
                          fill="none"
                        >
                          <path
                            d="M22.1583 15.4365H7.94442C7.80514 15.4365 7.66722 15.409 7.53854 15.3557C7.40985 15.3024 7.29293 15.2243 7.19444 15.1258C7.09595 15.0273 7.01783 14.9104 6.96452 14.7817C6.91122 14.653 6.88379 14.5151 6.88379 14.3758C6.88379 14.2365 6.91122 14.0986 6.96452 13.9699C7.01783 13.8412 7.09595 13.7243 7.19444 13.6258C7.29293 13.5273 7.40985 13.4492 7.53854 13.3959C7.66722 13.3426 7.80514 13.3152 7.94442 13.3152H22.158C22.4393 13.3151 22.7091 13.4268 22.908 13.6257C23.1069 13.8246 23.2187 14.0943 23.2188 14.3756C23.2188 14.6569 23.1071 14.9267 22.9082 15.1257C22.7094 15.3246 22.4396 15.4364 22.1583 15.4365ZM22.1583 8.77886H7.94442C7.66312 8.77886 7.39335 8.66711 7.19444 8.46821C6.99553 8.2693 6.88379 7.99952 6.88379 7.71823C6.88379 7.43693 6.99553 7.16715 7.19444 6.96824C7.39335 6.76934 7.66312 6.65759 7.94442 6.65759H22.158C22.4393 6.65755 22.7091 6.76925 22.908 6.96812C23.1069 7.16699 23.2187 7.43675 23.2188 7.71805C23.2188 7.99935 23.1071 8.26914 22.9082 8.46808C22.7094 8.66702 22.4396 8.77881 22.1583 8.77886ZM22.1583 2.12127H7.94442C7.80514 2.12127 7.66722 2.09383 7.53854 2.04053C7.40985 1.98723 7.29293 1.9091 7.19444 1.81061C7.09595 1.71212 7.01783 1.5952 6.96452 1.46652C6.91122 1.33784 6.88379 1.19992 6.88379 1.06063C6.88379 0.921349 6.91122 0.783428 6.96452 0.654746C7.01783 0.526064 7.09595 0.409141 7.19444 0.310652C7.29293 0.212163 7.40985 0.134038 7.53854 0.0807358C7.66722 0.027434 7.80514 1.18171e-08 7.94442 1.47523e-08H22.158C22.4393 -4.68681e-05 22.7091 0.111653 22.908 0.310527C23.1069 0.509401 23.2187 0.779159 23.2188 1.06046C23.2188 1.34175 23.1071 1.61155 22.9082 1.81049C22.7094 2.00943 22.4396 2.12122 22.1583 2.12127Z"
                            fill="#7F818D"
                          />
                          <path
                            d="M2.30822 2.84886C3.09491 2.84886 3.73265 2.21112 3.73265 1.42443C3.73265 0.637739 3.09491 0 2.30822 0C1.52153 0 0.883789 0.637739 0.883789 1.42443C0.883789 2.21112 1.52153 2.84886 2.30822 2.84886Z"
                            fill="#7F818D"
                          />
                          <path
                            d="M2.30822 9.42442C3.09491 9.42442 3.73265 8.78668 3.73265 7.99999C3.73265 7.2133 3.09491 6.57556 2.30822 6.57556C1.52153 6.57556 0.883789 7.2133 0.883789 7.99999C0.883789 8.78668 1.52153 9.42442 2.30822 9.42442Z"
                            fill="#7F818D"
                          />
                          <path
                            d="M2.30822 16C3.09491 16 3.73265 15.3622 3.73265 14.5756C3.73265 13.7889 3.09491 13.1511 2.30822 13.1511C1.52153 13.1511 0.883789 13.7889 0.883789 14.5756C0.883789 15.3622 1.52153 16 2.30822 16Z"
                            fill="#7F818D"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="product-list-s1">
                {memoizedProductList.map((item: any) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* end: trending-search-sec */}
      </div>
    </>
  );
};

export default TrendingPage;
