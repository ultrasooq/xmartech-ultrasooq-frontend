import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllProducts } from "@/apis/queries/product.queries";
import { cn } from "@/lib/utils";

type ProductsProps = {
  onSelect?: (id: number) => void;
};

const Products: React.FC<ProductsProps> = ({ onSelect }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [productList, setProductList] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const allProductsQuery = useAllProducts(
    {
      page: page,
      limit: limit,
    },
    true,
  );

  useEffect(() => {
    const products = (allProductsQuery?.data?.data || []).map((item: any) => {
      item.image = null;
      if (item.productImages.length > 0) {
        item.image = item.productImages[0].image;
      }
      return item;
    });
    setProductList(products);
    if (products.length > 0) selectProduct(products[0].id);
  }, [allProductsQuery?.data?.data?.length]);

  const selectProduct = (id: number) => {
    setSelectedProductId(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className="w-full border-r border-solid border-gray-300 lg:w-[18%]">
      <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
        <span>Product</span>
      </div>
      <div className="h-auto w-full overflow-y-auto p-4 lg:h-[720px]">
        {allProductsQuery?.isLoading ? (
          <div className="my-2 space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : null}

        {!allProductsQuery?.isLoading && !productList?.length ? (
          <div className="my-2 space-y-2">
            <p className="text-center text-sm font-normal text-gray-500">
              No data found
            </p>
          </div>
        ) : null}

        {productList?.map((item: any) => (
          <button
            type="button"
            onClick={() => selectProduct(item.id)}
            className={cn(
              "flex w-full flex-wrap rounded-md px-[10px] py-[20px]",
              selectedProductId == item.id
                ? "bg-dark-orange text-white shadow-lg"
                : "",
            )}
            key={item.id}
          >
            <div className="relative h-[40px] w-[40px] rounded-full">
              <Image
                src={item.image || item.barcode}
                alt="global-icon"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex w-[calc(100%-2.5rem)] flex-wrap items-center justify-start gap-y-1 pl-3">
              <div className="flex w-full">
                <h4 className="text-color-[#333333] text-left text-[14px] font-normal uppercase">
                  {item.productName}
                </h4>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
