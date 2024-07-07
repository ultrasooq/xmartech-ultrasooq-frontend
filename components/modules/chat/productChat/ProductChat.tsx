import React from 'react'
import Link from "next/link";
import { useGetProductDetails } from '@/apis/queries/chat.queries'
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import AttachIcon from "@/public/images/attach.svg";
import SmileIcon from "@/public/images/smile.svg";
import SendIcon from "@/public/images/send-button.png";
import ProductChatHistory from './ProductChatHistory';

interface ProductChatProps {
    productId: number
}

const ProductChat: React.FC<ProductChatProps> = ({ productId }) => {
    const product = useGetProductDetails(productId);
    const productDetails = product?.data?.data;

    return (
        <div>
            <div className="flex w-full rounded-sm border border-solid border-gray-300">
                <div className="w-[25%] border-r border-solid border-gray-300">
                    <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                        <span>Product</span>
                    </div>
                    {productDetails && (

                        <a target='_blank' href={`/trending/${productDetails?.id}`} className="max-h-[720px] w-full overflow-y-auto p-2">
                            <div className='px-4'>
                                <div className="flex w-full">
                                    <div className="text-xs font-normal text-gray-500">
                                        <div className="flex w-full flex-wrap">
                                            <div className="border-color-[#DBDBDB] relative h-[48px] w-[48px] border border-solid p-2">
                                                {productDetails?.productImages?.map((img: any) => (
                                                    <Image
                                                        key={img?.id}
                                                        src={img?.image}
                                                        fill
                                                        alt="preview"
                                                    />
                                                ))}
                                            </div>
                                            <div className="font-nromal flex w-[calc(100%-3rem)] items-center justify-start pl-3 text-xs text-black">
                                                {productDetails?.productName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[calc(100%-4rem)] items-center justify-start text-sm font-normal text-[#1D77D1] mt-2">
                                    <span className="text-[#828593]">SKU NO: {productDetails?.skuNo}</span>
                                </div>
                            </div>
                        </a>
                    )}

                    <div className="max-h-[720px] w-full overflow-y-auto p-2">
                        {product?.isPending ? (
                            <div className="my-2 space-y-2">
                                {Array.from({ length: 1 }).map((_, i) => (
                                    <Skeleton key={i} className="h-24 w-full" />
                                ))}
                            </div>
                        ) : null}

                        {!product?.isPending && !productDetails ? (
                            <div className="my-2 space-y-2">
                                <p className="text-center text-sm font-normal text-gray-500">
                                    No data found
                                </p>
                            </div>
                        ) : null}

                    </div>
                </div>
                <div className="w-[75%] border-r border-solid border-gray-300">
                    <div className="flex w-full flex-wrap p-[20px]">
                        <ProductChatHistory
                            selectedChatHistory={[]}
                        />
                    </div>
                    {productDetails ? (
                        <div className="mt-2 flex w-full flex-wrap border-t border-solid border-gray-300 px-[15px] py-[10px]">
                            <div className="flex w-full items-center">
                                <div className="relative flex h-[32px] w-[32px] items-center">
                                    <input type="file" className="z-10 hidden opacity-0" />
                                    <div className="absolute left-0 top-0 w-auto">
                                        <Image src={AttachIcon} alt="attach-icon" />
                                    </div>
                                </div>
                                <div className="flex w-[calc(100%-6.5rem)] items-center">
                                    <textarea
                                        placeholder="Type your message...."
                                        className="h-[32px] w-full resize-none text-sm focus:outline-none"
                                    ></textarea>
                                </div>
                                <div className="flex w-[72px] items-center justify-between">
                                    <div className="w-auto">
                                        <Image src={SmileIcon} alt="smile-icon" />
                                    </div>
                                    <div className="flex w-auto">
                                        <button type="button" className="">
                                            <Image src={SendIcon} alt="send-icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

export default ProductChat