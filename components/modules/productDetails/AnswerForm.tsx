import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";
import { Button } from "@/components/ui/button";
import { useUpdateAnswer } from "@/apis/queries/question.queries";
import { useToast } from "@/components/ui/use-toast";

type AnswerFormProps = {
  onClose: () => void;
  questionId: number;
};

const formSchema = z.object({
  answer: z
    .string()
    .trim()
    .min(2, {
      message: "Answer is required",
    })
    .max(200, {
      message: "Answer must be less than 200 characters",
    }),
});

const AnswerForm: React.FC<AnswerFormProps> = ({ onClose, questionId }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  const updateAnswer = useUpdateAnswer();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await updateAnswer.mutateAsync({
      productQuestionId: questionId,
      answer: values.answer,
    });

    if (response.status) {
      toast({
        title: "Answer Add Successful",
        description: response.message,
        variant: "success",
      });

      form.reset();
      onClose();
    } else {
      toast({
        title: "Answer Add Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-5 text-center text-xl font-semibold">
          Post your answer
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form"
        >
          <ControlledTextareaInput
            label="Type your answer here"
            name="answer"
            placeholder="Enter your answer here"
            rows={6}
          />

          <Button
            disabled={updateAnswer.isPending}
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
          >
            {updateAnswer.isPending ? (
              <>
                <Image
                  src="/images/load.png"
                  alt="loader-icon"
                  width={20}
                  height={20}
                  className="mr-2 animate-spin"
                />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
