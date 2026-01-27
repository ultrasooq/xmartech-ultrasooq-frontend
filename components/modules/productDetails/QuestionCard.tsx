/**
 * @file QuestionCard.tsx
 * @description A Q&A display card showing a single product question with its
 *   asker's name and a list of associated answers. Used within the
 *   QuestionsAnswersSection to render each question entry.
 *
 * @props
 *   - id {number} - The question ID.
 *   - question {string} - The question text content.
 *   - questionByUserDetail {{ id, firstName, lastName }} - The user who asked
 *     the question.
 *   - answers {Object[]} - Array of answer objects associated with this question.
 *   - isLastItem {boolean} - Whether this is the last question in the list
 *     (controls bottom border rendering).
 *
 * @behavior
 *   - Displays the question text with the asker's full name.
 *   - Iterates over answers to render each answer's text and author name.
 *   - Includes a modal state for a question reply dialog (currently commented out).
 *   - Applies conditional bottom border based on `isLastItem`.
 *   - Supports RTL layout via `langDir` from AuthContext.
 *
 * @dependencies
 *   - cn (utility) - Conditional class name merging.
 *   - useTranslations (next-intl) - i18n translations.
 *   - useAuth (AuthContext) - Language direction.
 */
import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import AnswerForm from "./AnswerForm";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type QuestionCardProps = {
  id: number;
  question: string;
  questionByUserDetail?: {
    id: number,
    firstName: string;
    lastName: string;
  };
  answers: {[key: string]: any}[],
  isLastItem: boolean;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  question,
  questionByUserDetail,
  answers,
  isLastItem,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // const handleToggleQuestionModal = () => setIsQuestionModalOpen(!isQuestionModalOpen);

  return (
    <div
      className={cn(
        !isLastItem ? "border-b border-solid border-gray-300" : "",
        "w-full p-3",
      )}
    >
      <article className="space-y-1">
        <h3 className="font-bold">
          <span className="mr-2">Q:</span>
          {question}
        </h3>
        {questionByUserDetail ? <p className="text-xs font-medium text-gray-500">
          {`${questionByUserDetail.firstName} ${questionByUserDetail.lastName}`}
        </p> : ''}
        {answers?.length ? answers.map((answer: any) => (
          <React.Fragment key={answer.id}>
            <p>
              <span className="mr-2 font-bold">A:</span>
              {answer.answer}
            </p>
            <p className="text-xs font-medium text-gray-500">{answer.userName || ""}</p>
          </React.Fragment>
        )) : null}
        {!answers?.length ? (
          <>
            <p dir={langDir} translate="no">
              <span className="mr-2 font-bold">A:</span>
              {t("no_answer_yet")}
            </p>
            <p className="text-xs font-medium text-gray-500"></p>
          </>
        ) : null}

        {/* {hasAccessToken && !answers?.length ? (
          <div className="my-2! text-center">
            <Button variant="secondary" onClick={handleToggleQuestionModal}>
              Reply
            </Button>
          </div>
        ) : null} */}
      </article>

      {/* <Dialog
        open={isQuestionModalOpen}
        onOpenChange={handleToggleQuestionModal}
      >
        <DialogContent>
          <AnswerForm onClose={handleToggleQuestionModal} questionId={id} />
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default QuestionCard;
