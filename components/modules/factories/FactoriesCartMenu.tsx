import {
  useDeleteFactoriesCartItem,
    useDeleteRfqCartItem,
    useFactoriesCartListByUserId,
    useRfqCartListByUserId,
  } from "@/apis/queries/rfq.queries";
  import React, { useMemo } from "react";
  
  import { useToast } from "@/components/ui/use-toast";
  import Link from "next/link";
import FactoriesCartMenuCard from "./FactoriesCartMenuCard";
  
  type FactoryCartMenuProps = {
    // onAdd: (
    //   args0: number,
    //   args1: number,
    //   args2: "add" | "remove",
    //   args3: number,
    //   args4: string,
    // ) => void;
    haveAccessToken: boolean;
  };
  
  const FactoryCartMenu: React.FC<FactoryCartMenuProps> = ({
    // onAdd,
    haveAccessToken,
  }) => {
    const { toast } = useToast();
    const factoriesCartListByUser = useFactoriesCartListByUserId(
      {
        page: 1,
        limit: 20,
      },
      haveAccessToken,
    );
  
    const deleteFactoriesCartItem = useDeleteFactoriesCartItem();
  
    const memoizedFactoriseCartList = useMemo(() => {
      if (factoriesCartListByUser.data?.data) {
        return factoriesCartListByUser.data?.data || [];
      }
      return [];
    }, [factoriesCartListByUser.data?.data]);
  
    const handleRemoveItemFromFactoriesCart = async (customizeProductId: number) => {
      const response = await deleteFactoriesCartItem.mutateAsync({ customizeProductId });
      if (response.status) {
        toast({
          title: "Item removed from cart",
          description: "Check your cart for more details",
          variant: "success",
        });
      }
    };

    // For Add Cart

    
  
    return (
      <div className="rfq_right">
        <div className="rfq_right_bottom">
          {memoizedFactoriseCartList.length ? (
            <div className="mb-4 w-full text-center">
              <Link
                href="/factories-cart"
                className="flex justify-center gap-x-2 bg-dark-orange px-3 py-2 text-white"
              >
                Go To Factories Cart
              </Link>
            </div>
          ) : null}
  
          <h4 className="text-center">
            Your Factories Cart ({memoizedFactoriseCartList.length} items)
          </h4>
  
          {!memoizedFactoriseCartList.length && (
            <div className="my-10 text-center">
              <h4>No items in cart</h4>
            </div>
          )}
  
          {memoizedFactoriseCartList.map((item: any) => (
            <FactoriesCartMenuCard
              key={item?.id}
              customizeProductId={item?.customizeProductId}
              productId={item?.productId}
              productName={item?.productDetails?.productName}
              productQuantity={item.quantity}
              productImages={item?.productDetails?.productImages}
              customizeProductImages={
                item?.customizeProductDetail?.customizeProductImageDetail
              }
            //   onAdd={onAdd}
              onRemove={handleRemoveItemFromFactoriesCart}
              offerPrice={item?.offerPrice}
              note={item?.note}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default FactoryCartMenu;
  