import {
  useDeleteRfqCartItem,
  useRfqCartListByUserId,
} from "@/apis/queries/rfq.queries";
import React, { useMemo } from "react";
import RfqCartMenuCard from "./RfqCartMenuCard";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useTranslations } from "next-intl";

type RfqCartMenuProps = {
  onAdd: (
    args0: number,
    args1: number,
    args2: "add" | "remove",
    args3?: number,
    args4?: number,
    args5?: string,
  ) => void;
  cartList: any[];
};

const RfqCartMenu: React.FC<RfqCartMenuProps> = ({
  onAdd,
  cartList
}) => {
  const t = useTranslations();
  const { toast } = useToast();

  const deleteRfqCartItem = useDeleteRfqCartItem();

  const handleRemoveItemFromRfqCart = async (rfqCartId: number) => {
    const response = await deleteRfqCartItem.mutateAsync({ rfqCartId });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    }
  };

  return (
    <div className="rfq_right">
      <div className="rfq_right_bottom">
        {cartList.length ? (
          <div className="mb-4 w-full text-center">
            <Link
              href="/rfq-cart"
              className="flex justify-center gap-x-2 bg-dark-orange px-3 py-2 text-sm text-white lg:text-base"
            >
              {t("go_to_rfq_cart")}
            </Link>
          </div>
        ) : null}

        <h4 className="text-center">
          {t("your_rfq_cart")} ({t("n_items", { n: cartList.length })})
        </h4>

        {!cartList.length && (
          <div className="my-10 text-center">
            <h4>{t("no_cart_items")}</h4>
          </div>
        )}

        {cartList.map((item: any) => (
          <RfqCartMenuCard
            key={item?.id}
            id={item?.id}
            rfqProductId={item?.productId}
            productName={item?.rfqCart_productDetails?.productName}
            productQuantity={item.quantity}
            productImages={item?.rfqCart_productDetails?.productImages}
            onAdd={onAdd}
            onRemove={handleRemoveItemFromRfqCart}
            offerPriceFrom={Number(item?.offerPriceFrom || 0)}
            offerPriceTo={Number(item?.offerPriceTo || 0)}
            note={item?.note}
          />
        ))}
      </div>
    </div>
  );
};

export default RfqCartMenu;
