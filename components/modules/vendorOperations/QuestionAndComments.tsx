import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuestions } from "@/apis/queries/question.queries";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnswerForm from "../productDetails/AnswerForm";

type QuestionAndAnswersProps = {
    productId: number;
};

const QuestionAndAnswers: React.FC<QuestionAndAnswersProps> = ({ productId }) => {
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [questionId, setQuestionId] = useState<number>(0);
    const questionQuery = useQuestions(
        {
            page: 1,
            limit: 10,
            productId: productId.toString(),
            sortType: "newest",
        },
        !!productId,
    );

    useEffect(() => {
        let questionList = questionQuery?.data?.data;
    }, [productId]);

    useEffect(() => {
        let questionList = questionQuery?.data?.data || [];
        setQuestions(
            questionList.map((question: any) => {
                if (question.answerByuserIdDetail) {
                    question.answeredBy = `${question.answerByuserIdDetail.firstName} ${question.answerByuserIdDetail.lastName}`;
                }
                return question;
            }),
        );
    }, [questionQuery?.data?.data]);

    const handleToggleQuestionModal = () => setIsQuestionModalOpen(!isQuestionModalOpen);

    const reply = (id: number) => {
        handleToggleQuestionModal();
        setQuestionId(id);
    };

    const onReplySuccess = (answer: string) => {
        setQuestions(questions.map((question: any) => {
            if (question.id == questionId) {
                question.answer = answer;
            }
            return question;
        }))
    };

    return (
        <div className="w-[67%] border-r border-solid border-gray-300">
            <div className="flex min-h-[55px] w-full items-center justify-between border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]">
                <span>Question & Comments</span>
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

                    {!questionQuery?.isLoading && !questions?.length && (
                        <p className="text-center text-sm font-normal text-gray-500">
                            No data found
                        </p>
                    )}

                    {!questionQuery.isLoading && questions.length > 0 && questions.map((question: any) => (
                        <div className="w-full border-b p-3" key={question.id}>
                            <article className="space-y-2">
                                <h3 className="solid w-full rounded-md border-[5px] border-[#b5b5b5] bg-gray-300 px-3 py-2 font-bold">
                                    <span className="mr-2">Q:</span>
                                    {question.question}
                                </h3>
                                <div className="w-full pl-3">
                                    {question.answer && 
                                    <div className="solid text-md mb-2 w-full rounded-md border-[5px] border-[#b5b5b5] bg-gray-300 px-3 py-2">
                                        <p>
                                            <span className="mr-2 font-bold">A:</span>
                                            {question.answer}
                                        </p>
                                    </div>}
                                    {question.answeredBy && (
                                        <p className="text-xs font-medium text-gray-500">
                                            {question.answeredBy}
                                        </p>
                                    )}
                                    {!question.answer && <div className="!my-2 text-center">
                                        <Button variant="secondary" onClick={() => reply(question.id)}>
                                            Reply
                                        </Button>
                                    </div>}
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog
                open={isQuestionModalOpen}
                onOpenChange={handleToggleQuestionModal}
            >
                <DialogContent className="max-h-[93vh] max-w-[90%] gap-0 md:!max-w-[90%] lg:!max-w-5xl">
                    <AnswerForm 
                        onClose={handleToggleQuestionModal} 
                        questionId={questionId} 
                        onReplySuccess={onReplySuccess}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default QuestionAndAnswers;