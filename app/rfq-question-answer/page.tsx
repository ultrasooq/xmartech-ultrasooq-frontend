"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TaskIcon from "@/public/images/task-icon.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllProducts } from "@/apis/queries/product.queries";
import { useQuestions } from "@/apis/queries/question.queries";

const RfqQuestionAnswerPage = () => {
  const pathname = usePathname();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [productList, setProductList] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const allProductsQuery = useAllProducts({
    page: page,
    limit: limit,
  }, true);

  const [questions, setQuestions] = useState<any[]>([]);
  const questionQuery = useQuestions(
    {
      page: 1,
      limit: 10,
      productId: selectedProductId,
      sortType: 'newest'
    },
    !!selectedProductId,
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
    if (products.length > 0) setSelectedProductId(products[0].id);
  }, [allProductsQuery?.data?.data?.length]);

  useEffect(() => {
    let questionList = questionQuery?.data?.data;
  }, [selectedProductId]);

  useEffect(() => {
    let questionList = questionQuery?.data?.data || [];
    setQuestions(questionList.map((question: any) => {
      if (question.answerByuserIdDetail) {
        question.answeredBy = `${question.answerByuserIdDetail.firstName} ${question.answerByuserIdDetail.lastName}`;
      }
      return question;
    }));
  }, [questionQuery?.data?.data]);

  return (
    <section className="m-auto flex w-full max-w-[1400px] py-8">
      <div className="w-[15%]">
        <div className="w-full px-0 py-0 shadow-lg">
          <ul>
            <li className="w-full py-1">
              <Link
                href="#"
                className="flex items-center justify-start rounded-xl p-2"
              >
                <div className="flex h-[20px] w-[20px] items-center justify-center ">
                  <Image src={TaskIcon} alt="Task Icon" />
                </div>
                <div className="pl-1 text-sm font-medium text-[#828593]">
                  Ultrasooq
                </div>
              </Link>
            </li>
            <li
              className={cn(
                pathname?.includes("rfq-request") ? "bg-dark-orange" : "",
                "w-full py-1",
              )}
            >
              <Link
                href={'/rfq-request'}
                className="flex items-center justify-start rounded-xl p-2"
              >
                <div className="flex h-[20px] w-[20px] items-center justify-center ">
                  <Image
                    src={TaskIcon}
                    alt="Task Icon"
                    className="brightness-0 invert"
                  />
                </div>
                <div className="pl-1 text-sm font-medium">RFQ</div>
              </Link>
            </li>
            <li
              className={cn(
                pathname?.includes("rfq-question-answer") ? "bg-dark-orange" : "",
                "w-full py-1",
              )}
            >
              <Link
                href={`/rfq-question-answer`}
                className="flex items-center justify-start rounded-xl p-2 text-white"
              >
                <div className="flex h-[20px] w-[20px] items-center justify-center ">
                  <Image
                    src={TaskIcon}
                    alt="Task Icon"
                    className="brightness-0 invert"
                  />
                </div>
                <div className="pl-1 text-sm font-medium text-white">Question Answer</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[85%] px-2">
        <div className="flex w-full rounded-sm border border-solid border-gray-300">
          <div className="w-[15%] border-r border-solid border-gray-300">
              <div className="flex min-h-[55px] w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                  <span></span>
              </div>
          </div>

          {/* product list => will be extracted to a component */}
          <div className="w-[18%] border-r border-solid border-gray-300">
              <div className="flex h-[55px] min-w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                  <span>Products</span>
              </div>
              <div className="h-[720px] w-full overflow-y-auto p-4">
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

                  {productList?.map(
                      (item: any) => (
                        <button
                          type="button"
                          onClick={() => setSelectedProductId(item.id.toString())}
                          className={cn(
                            "flex w-full flex-wrap rounded-md px-[10px] py-[20px]",
                            selectedProductId == item.id ? "shadow-lg" : "",
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
                              <h4 className="text-color-[#333333] text-left text-[15px] font-normal uppercase">
                                {item.productName}
                              </h4>
                            </div>
                          </div>
                        </button>
                      ),
                  )}
              </div>
          </div>
          {/* ---- */}

          {/* questions & answers => will be extracted to a component */}
          <div className="w-[67%] border-r border-solid border-gray-300">
              <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                  <span>Q&A</span>
              </div>
              <div className="flex w-full border-t-2 border-gray-300 py-5">
                <div className="w-full space-y-3">
                  {questionQuery?.isLoading ? (
                      <>
                          {Array.from({ length: 2 }).map((_, i) => (
                              <Skeleton key={i} className="h-24 w-full" />
                          ))}
                      </>
                  ) : null}

                  {!questionQuery?.isLoading && !questions?.length && 
                    <p className="text-center text-sm font-normal text-gray-500">
                      No data found
                    </p>
                  }

                  {!questionQuery.isLoading && questions.length > 0 && questions.map((question: any) => (
                    <div className="border-b w-full p-3" key={question.id}>
                      <article className="space-y-1">
                        <h3 className="font-bold">
                          <span className="mr-2">Q:</span>{question.question}
                        </h3>
                        <p>
                          <span className="mr-2 font-bold">A:</span>{question.answer}
                        </p>
                        {question.answeredBy && <p className="text-xs font-medium text-gray-500">
                          {question.answeredBy}
                        </p>}
                      </article>
                    </div>
                  ))}
                </div>
              </div>
          </div>
          {/* ---- */}

        </div>
      </div>
    </section>
  );
};

export default RfqQuestionAnswerPage;
