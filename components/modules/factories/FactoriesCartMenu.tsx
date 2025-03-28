import {
  useDeleteFactoriesCartItem,
  useDeleteRfqCartItem,
  useFactoriesCartListByUserId,
  useRfqCartListByUserId,
} from "@/apis/queries/rfq.queries";
import React, { useEffect, useMemo } from "react";

import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import FactoriesCartMenuCard from "./FactoriesCartMenuCard";
import { useTranslations } from "next-intl";

type FactoryCartMenuProps = {
  onInitCart?: (cartList: any[]) => void; 
  haveAccessToken: boolean;
};

const FactoryCartMenu: React.FC<FactoryCartMenuProps> = ({
  onInitCart,
  haveAccessToken,
}) => {
  const t = useTranslations();
  const { toast } = useToast();
  const factoriesCartListByUser = useFactoriesCartListByUserId(
    {
      page: 1,
      limit: 100,
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

  const handleRemoveItemFromFactoriesCart = async (factoriesCartId: number) => {
    const response = await deleteFactoriesCartItem.mutateAsync({
      factoriesCartId,
    });
    if (response.status) {
      toast({
        title: t("item_removed_from_cart"),
        description: t("check_your_cart_for_more_details"),
        variant: "success",
      });
    }
  };

  useEffect(() => {
    if (onInitCart) onInitCart([...(factoriesCartListByUser.data?.data || [])]);
  }, [factoriesCartListByUser.data?.data]);

  return (
    <div className="rfq_right">
      <div className="rfq_right_bottom">
        {memoizedFactoriseCartList.length ? (
          <div className="mb-4 w-full text-center">
            <Link
              href="/factories-cart"
              className="flex justify-center gap-x-2 bg-dark-orange px-3 py-2 text-sm text-white lg:text-base"
            >
              {t("go_to_factories_cart")}
            </Link>
          </div>
        ) : null}

        <h4 className="text-center">
          {t("your_factories_cart")} ({t("n_items", { n: memoizedFactoriseCartList.length })})
        </h4>

        {!memoizedFactoriseCartList.length && (
          <div className="my-10 text-center">
            <h4>{t("no_cart_items")}</h4>
          </div>
        )}

        {memoizedFactoriseCartList.map((item: any) => (
          <FactoriesCartMenuCard
            key={item?.id}
            factoriesCartId={item?.id}
            customizeProductId={item?.customizeProductId}
            productId={item?.productId}
            productName={item?.productDetails?.productName}
            productQuantity={item.quantity}
            productImages={item?.productDetails?.productImages}
            customizeProductImages={
              item?.customizeProductDetail?.customizeProductImageDetail
            }
            onRemove={handleRemoveItemFromFactoriesCart}
            fromPrice={item?.customizeProductDetail?.fromPrice}
            toPrice={item?.customizeProductDetail?.toPrice}
            note={item?.customizeProductDetail?.note}
          />
        ))}
      </div>
    </div>
  );
};

export default FactoryCartMenu;
