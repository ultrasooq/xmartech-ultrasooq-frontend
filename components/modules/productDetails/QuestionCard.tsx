import React from "react";

type QuestionCardProps = {
  id?: string;
  question: string;
  answer: string;
  userName: string;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  question,
  answer,
  userName,
}) => {
  return (
    <div className="w-full border-b border-solid border-gray-300 p-3">
      <article className="space-y-1">
        <h3>
          <span className="mr-2 font-bold">Q:</span>
          {question}
        </h3>
        <p>
          <span className="mr-2 font-bold">A:</span>
          {answer}
        </p>
        <p className="text-xs font-medium text-gray-500">{userName}</p>
      </article>
    </div>
  );
};

export default QuestionCard;
