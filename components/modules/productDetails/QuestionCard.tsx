import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AnswerForm from "./AnswerForm";
import { cn } from "@/lib/utils";

type QuestionCardProps = {
  id: number;
  question: string;
  answer?: string;
  userName?: string;
  answers: {[key: string]: any}[],
  isLastItem: boolean;
  hasAccessToken?: boolean;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  question,
  answer,
  userName,
  answers,
  isLastItem,
  hasAccessToken,
}) => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const handleToggleQuestionModal = () => setIsQuestionModalOpen(!isQuestionModalOpen);

  if (!answers?.length && answer) {
    answers.push({
      id: 0,
      answer: answer
    });
  }

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
        {answers?.length && answers.map((answer: any) => (
          <p key={answer.id}>
            <span className="mr-2 font-bold">A:</span>
            {answer.answer}
          </p>
        ))}
        {!answers?.length && (
          <>
            <p>
              <span className="mr-2 font-bold">A:</span>
              {"No answer yet"}
            </p>
            <p className="text-xs font-medium text-gray-500">{userName || ""}</p>
          </>
        )}

        {hasAccessToken && !answers?.length ? (
          <div className="!my-2 text-center">
            <Button variant="secondary" onClick={handleToggleQuestionModal}>
              Reply
            </Button>
          </div>
        ) : null}
      </article>

      <Dialog
        open={isQuestionModalOpen}
        onOpenChange={handleToggleQuestionModal}
      >
        <DialogContent>
          <AnswerForm onClose={handleToggleQuestionModal} questionId={id} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionCard;
