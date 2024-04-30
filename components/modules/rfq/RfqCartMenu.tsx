import {
  useDeleteRfqCartItem,
  useRfqCartListByUserId,
} from "@/apis/queries/rfq.queries";
import React, { useMemo } from "react";
import RfqCartMenuCard from "./RfqCartMenuCard";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RfqCartMenuProps = {
  onAdd: (args0: number, args1: number, args2: "add" | "remove") => void;
};

const RfqCartMenu: React.FC<RfqCartMenuProps> = ({ onAdd }) => {
  const router = useRouter();
  const { toast } = useToast();
  const rfqCartListByUser = useRfqCartListByUserId({
    page: 1,
    limit: 20,
  });

  // console.log(rfqCartListByUser.data?.data);
  const deleteRfqCartItem = useDeleteRfqCartItem();

  const memoizedRfqCartList = useMemo(() => {
    if (rfqCartListByUser.data?.data) {
      return rfqCartListByUser.data?.data || [];
    }
    return [];
  }, [rfqCartListByUser.data?.data]);

  const handleRemoveItemFromRfqCart = async (rfqCartId: number) => {
    console.log("cart id:", rfqCartId);
    // return;
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
      <div className="rfq_right_top">
        <h4>RFQ Cart</h4>
        <p>Lorem ipsum dolor sit amet, </p>
        <button type="button">Request For Quote</button>
      </div>
      <div className="rfq_right_bottom">
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
            productName={item?.rfqProductDetails?.rfqProductName}
            productQuantity={item.quantity}
            productImages={item?.rfqProductDetails?.rfqProductImage}
            onAdd={onAdd}
            onRemove={handleRemoveItemFromRfqCart}
          />
        ))}

        <div className="mt-4 w-full text-center">
          <Button
            onClick={() => router.push("/rfq-cart")}
            disabled={!memoizedRfqCartList.length}
          >
            Go To RFQ Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RfqCartMenu;
