import {
  useDeleteRfqCartItem,
  useRfqCartListByUserId,
} from "@/apis/queries/rfq.queries";
import React, { useMemo } from "react";
import RfqCartMenuCard from "./RfqCartMenuCard";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type RfqCartMenuProps = {
  onAdd: (
    args0: number,
    args1: number,
    args2: "add" | "remove",
    args3: number,
    args4: string,
  ) => void;
  haveAccessToken: boolean;
};

const RfqCartMenu: React.FC<RfqCartMenuProps> = ({
  onAdd,
  haveAccessToken,
}) => {
  const { toast } = useToast();
  const rfqCartListByUser = useRfqCartListByUserId(
    {
      page: 1,
      limit: 20,
    },
    haveAccessToken,
  );

  const deleteRfqCartItem = useDeleteRfqCartItem();

  const memoizedRfqCartList = useMemo(() => {
    if (rfqCartListByUser.data?.data) {
      return rfqCartListByUser.data?.data || [];
    }
    return [];
  }, [rfqCartListByUser.data?.data]);

  const handleRemoveItemFromRfqCart = async (rfqCartId: number) => {
    const response = await deleteRfqCartItem.mutateAsync({ rfqCartId });
    if (response.status) {
      toast({
        title: "Item removed from cart",
        description: "Check your cart for more details",
        variant: "success",
      });
    }
  };

  return (
    <div className="rfq_right">
      <div className="rfq_right_bottom">
        {memoizedRfqCartList.length ? (
          <div className="mb-4 w-full text-center">
            <Link
              href="/rfq-cart"
              className="flex justify-center gap-x-2 bg-dark-orange px-3 py-2 text-sm text-white lg:text-base"
            >
              Go To RFQ Cart
            </Link>
          </div>
        ) : null}

        <h4 className="text-center">
          Your RFQ Cart ({memoizedRfqCartList.length} items)
        </h4>

        {!memoizedRfqCartList.length && (
          <div className="my-10 text-center">
            <h4>No items in cart</h4>
          </div>
        )}

        {memoizedRfqCartList.map((item: any) => (
          <RfqCartMenuCard
            key={item?.id}
            id={item?.id}
            rfqProductId={item?.productId}
            productName={item?.rfqCart_productDetails?.productName}
            productQuantity={item.quantity}
            productImages={item?.rfqCart_productDetails?.productImages}
            onAdd={onAdd}
            onRemove={handleRemoveItemFromRfqCart}
            offerPrice={item?.offerPrice}
            note={item?.note}
          />
        ))}
      </div>
    </div>
  );
};

export default RfqCartMenu;
