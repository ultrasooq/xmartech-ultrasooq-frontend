"use client";
import React, { useState } from "react";
import Footer from "@/components/shared/Footer";
import BannerImage from "@/public/images/rfq-sec-bg.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
import WishlistCard from "@/components/modules/wishlist/WishlistCard";
import {
  useDeleteFromWishList,
  useWishlist,
} from "@/apis/queries/wishlist.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/shared/Pagination";

const WishlistPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const wishlistQuery = useWishlist({ page, limit });
  const deleteFromWishlist = useDeleteFromWishList();

  const handleDeleteFromWishlist = async (productId: number) => {
    const response = await deleteFromWishlist.mutateAsync({
      productId,
    });
    if (response.status) {
      toast({
        title: "Item removed from wishlist",
        description: "Check your wishlist for more details",
        variant: "success",
      });
    } else {
      toast({
        title: "Item not removed from wishlist",
        description: "Check your wishlist for more details",
        variant: "danger",
      });
    }
  };

  return (
    <>
      <section className="w-full py-[50px]">
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <Image src={BannerImage} alt="background-banner" fill />
        </div>
        <div className="container m-auto px-3">
          <div>
            <div className="mb-4 flex items-center gap-x-4">
              <Button
                variant="outline"
                className="px-1"
                onClick={() => router.back()}
              >
                <MdOutlineChevronLeft size="24" />
              </Button>
              <h3 className="text-3xl font-semibold">My Wishlist</h3>
            </div>
            <div className="min-h-[400px] rounded-2xl border border-solid border-[#E4E3E3] bg-white p-4 shadow-[0px_4px_23px_0px_#EEF1F5]">
              {wishlistQuery.data?.data?.length ? (
                <p className="px-5 text-xl font-medium">
                  My Wishlist {wishlistQuery.data?.data?.length} items
                </p>
              ) : null}

              {!wishlistQuery.isLoading && !wishlistQuery.data?.data?.length ? (
                <p className="mt-10 text-center text-xl font-medium">
                  No items in wishlist
                </p>
              ) : null}

              {wishlistQuery.isLoading ? (
                <div className="grid gap-5 p-5 md:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-80 w-full" />
                  ))}
                </div>
              ) : null}

              {wishlistQuery.data?.data?.length ? (
                <div className="grid gap-5 p-5 md:grid-cols-5">
                  {wishlistQuery.data?.data.map((item: any) => (
                    <WishlistCard
                      key={item?.id}
                      id={item?.id}
                      productId={item?.productId}
                      wishlistData={item?.wishlist_productDetail}
                      onDeleteFromWishlist={handleDeleteFromWishlist}
                    />
                  ))}
                </div>
              ) : null}
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              totalCount={wishlistQuery.data?.totalCount}
              limit={limit}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WishlistPage;
