import React, { useEffect, useState } from "react";
import Image from "next/image";
import TaskIcon from "@/public/images/task-icon.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuestions } from "@/apis/queries/question.queries";
import Products from "@/components/modules/vendorOperations/Products";
import Operations from "@/components/modules/vendorOperations/Operations";
import QuestionAndAnswers from "./QuestionAndComments";

const VendorOperations = () => {
    const [selectedOperation, setSelectedOperation] = useState<string>("questions_n_comments");
    const [selectedProductId, setSelectedProductId] = useState<number>(0);

    return (
        <>
            <div className="flex w-full rounded-sm border border-solid border-gray-300">
                <Operations
                    onSelect={(operation) => setSelectedOperation(operation)}
                />

                <Products
                    onSelect={(id) => setSelectedProductId(id)}
                />

                {selectedOperation == 'admin_n_support' && selectedProductId &&
                    <div className="w-[67%] border-r border-solid border-gray-300">
                        <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                            <span>Admin & Support</span>
                        </div>
                    </div>
                }

                {selectedOperation == 'questions_n_comments' && selectedProductId &&
                    <QuestionAndAnswers
                        productId={selectedProductId}
                    />
                }

                {selectedOperation == 'rate_n_review' && selectedProductId &&
                    <div className="w-[67%] border-r border-solid border-gray-300">
                        <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                            <span>Rate & Review</span>
                        </div>
                    </div>
                }

                {selectedOperation == 'complains' && selectedProductId &&
                    <div className="w-[67%] border-r border-solid border-gray-300">
                        <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                            <span>Complains</span>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default VendorOperations;