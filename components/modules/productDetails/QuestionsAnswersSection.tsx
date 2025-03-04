import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";
import { useQuestions } from "@/apis/queries/question.queries";

type QuestionsAnswersSectionProps = {
  hasAccessToken?: boolean;
  productId?: string;
};

const QuestionsAnswersSection: React.FC<QuestionsAnswersSectionProps> = ({
  hasAccessToken,
  productId,
}) => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [sortType, setSortType] = useState<"newest" | "oldest">("newest");

  const handleToggleQuestionModal = () =>
    setIsQuestionModalOpen(!isQuestionModalOpen);

  const questionQuery = useQuestions(
    {
      page: 1,
      limit: 20,
      productId: productId ?? "",
      sortType,
    },
    !!productId,
  );

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex w-auto flex-wrap items-start justify-start">
          <h2 className="mb-0 text-2xl font-semibold leading-7 text-color-dark">
            Questions &amp; Answers
          </h2>
        </div>
        <div className="w-auto">
          {hasAccessToken ? (
            <button
              type="button"
              onClick={handleToggleQuestionModal}
              className="flex rounded-sm bg-dark-orange p-3 text-sm font-bold leading-5 text-white"
            >
              <Image
                src="/images/pen-icon.svg"
                height={20}
                width={20}
                className="mr-2"
                alt="pen-icon"
              />
              <span>Post a Question</span>
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex w-full items-center justify-end py-5">
        <ul className="flex items-center justify-end">
          <li className="ml-2 text-sm font-medium text-color-dark">Sort By:</li>
          <li className="ml-2">
            <Button
              variant={sortType === "newest" ? "secondary" : "ghost"}
              onClick={() => setSortType("newest")}
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Newest
            </Button>
          </li>

          <li className="ml-2">
            <Button
              variant={sortType === "oldest" ? "secondary" : "ghost"}
              onClick={() => setSortType("oldest")}
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Oldest
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex w-full border-t-2 border-dashed border-gray-300 py-5">
        <div className="w-full space-y-3">
          {!questionQuery?.data?.data?.length ? (
            <div className="w-full text-center text-sm font-bold text-dark-orange">
              No questions found
            </div>
          ) : null}

          {questionQuery.data?.data?.map(
            (
              question: {
                id: number;
                question: string;
                answer?: string;
                answerByuserIdDetail?: {
                  firstName: string;
                  lastName: string;
                };
                productQuestionAnswerDetail: {[key: string]: any}[]
              },
              index: number,
            ) => {
              return (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  answer={question.answer}
                  userName={`${question.answerByuserIdDetail?.firstName || ""} ${question.answerByuserIdDetail?.lastName || ""}`}
                  answers={question.productQuestionAnswerDetail}
                  isLastItem={index === questionQuery.data?.data?.length - 1}
                  hasAccessToken={hasAccessToken}
                />
              );
            },
          )}
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-center text-center text-sm font-bold text-dark-orange">
        <span className="flex">
          <Image
            src="/images/loader.png"
            className="mr-1.5"
            height={20}
            width={20}
            alt="loader-icon"
          />
          Load More
        </span>
      </div> */}

      <Dialog
        open={isQuestionModalOpen}
        onOpenChange={handleToggleQuestionModal}
      >
        <DialogContent className="max-h-[93vh] max-w-[90%] gap-0 md:!max-w-[90%] lg:!max-w-5xl">
          <QuestionForm onClose={handleToggleQuestionModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionsAnswersSection;
