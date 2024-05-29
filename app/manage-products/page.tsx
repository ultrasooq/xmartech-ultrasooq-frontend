"use client";
import React, { useState } from "react";
import { useAllManagedProducts } from "@/apis/queries/product.queries";
import ManageProductCard from "@/components/modules/manageProducts/ManageProductCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

const ManageProductsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const allManagedProductsQuery = useAllManagedProducts({
    page,
    limit,
  });

  const handleProductIds = (checked: boolean | string, id: number) => {
    let tempArr = selectedProductIds || [];
    if (checked && !tempArr.find((ele: number) => ele === id)) {
      tempArr = [...tempArr, id];
    }

    if (!checked && tempArr.find((ele: number) => ele === id)) {
      tempArr = tempArr.filter((ele: number) => ele !== id);
    }

    setSelectedProductIds(tempArr);
  };

  console.log(selectedProductIds);

  return (
    <>
      <div className="existing-product-add-page">
        <div className="container m-auto flex px-3">
          <div className="existing-product-add-lists">
            {allManagedProductsQuery.isLoading ? (
              <div className="mx-2 grid w-full grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-80 w-full" />
                ))}
              </div>
            ) : null}

            {!allManagedProductsQuery.data?.data &&
            !allManagedProductsQuery.isLoading ? (
              <p className="w-full text-center text-base font-medium">
                No data found
              </p>
            ) : null}

            {allManagedProductsQuery.data?.data?.map(
              (product: { id: number }) => (
                <ManageProductCard
                  selectedIds={selectedProductIds}
                  onSelectedId={handleProductIds}
                  key={product?.id}
                  id={product?.id}
                />
              ),
            )}

            {allManagedProductsQuery.data?.totalCount > 6 ? (
              <Pagination
                page={page}
                setPage={setPage}
                totalCount={allManagedProductsQuery.data?.totalCount}
                limit={limit}
              />
            ) : null}
          </div>

          <div className="manage_product_list">
            <div className="manage_product_list_wrap">
              <h2>Manage the product</h2>
              <div className="all_select_button">
                <button
                  onClick={() =>
                    setSelectedProductIds(
                      allManagedProductsQuery.data?.data?.map(
                        (product: { id: number }) => product?.id,
                      ),
                    )
                  }
                >
                  Select All
                </button>
                <button onClick={() => setSelectedProductIds([])}>
                  Clean Select
                </button>
              </div>
              <div className="select_main_wrap">
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <select>
                      <option>Select Brand</option>
                      <option>New</option>
                    </select>
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <button>Hide all Selected</button>
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <input
                      type="text"
                      placeholder="Ask for the Stock"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <input
                      type="text"
                      placeholder="Ask for the Price"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field">
                    <select>
                      <option>Customer Type</option>
                      <option>Everyone</option>
                    </select>
                  </div>
                </div>
                <div className="select_type">
                  <div className="select_type_checkbox">
                    <Checkbox className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange" />
                  </div>
                  <div className="select_type_field plus_minus_select">
                    <button>Delivery After</button>
                    <div className="theme-inputValue-picker-upDown">
                      <button type="button" className="upDown-btn minus">
                        <img src="/images/minus-icon-dark.svg" alt=""></img>
                      </button>
                      <input type="number" className="form-control" value="0" />
                      <button type="button" className="upDown-btn plus">
                        <img src="/images/plus-icon-dark.svg" alt=""></img>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="manage_product_action">
                <button type="button" className="custom-btn update">
                  Update
                </button>
                <button type="button" className="custom-btn theme-primary-btn">
                  Add New
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProductsPage;
