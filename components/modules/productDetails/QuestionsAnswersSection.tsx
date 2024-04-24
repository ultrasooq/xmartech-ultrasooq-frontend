import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";

const QuestionsAnswersSection = () => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const handleToggleQuestionModal = () =>
    setIsQuestionModalOpen(!isQuestionModalOpen);

  return (
    <div className="w-full">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex w-auto flex-wrap items-start justify-start">
          <h2 className="mb-0 text-2xl font-semibold leading-7 text-color-dark">
            Questions &amp; Answers
          </h2>
        </div>
        <div className="w-auto">
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
        </div>
      </div>
      <div className="flex w-full items-center justify-end py-5">
        <ul className="flex items-center justify-end">
          <li className="ml-2 text-sm font-medium text-color-dark">
            Sort By :
          </li>
          <li className="ml-2">
            <Button
              variant="ghost"
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Newest
            </Button>
          </li>

          <li className="ml-2">
            <Button
              variant="ghost"
              className="block rounded-full border border-solid border-gray-300 text-sm font-medium text-gray-500"
            >
              Oldest
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex w-full border-t-2 border-dashed border-gray-300 py-5">
        <div className="w-full space-y-3">
          <QuestionCard
            question="Is there any warranty available for this product?"
            answer="No"
            userName="David"
          />
          <QuestionCard
            question="I got a remote in the box. Was it there purposely or by mistake? Could anyone please confirm?"
            answer="It is monitor, not CPU."
            userName="John Doe"
          />
          <QuestionCard
            question="Can I get a refund?"
            answer="Yes"
            userName="Smith"
          />
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
          <QuestionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionsAnswersSection;
