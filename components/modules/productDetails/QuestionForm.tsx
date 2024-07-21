import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";
import { Button } from "@/components/ui/button";
import { useAddQuestion } from "@/apis/queries/question.queries";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";

type QuestionFormProps = {
  onClose: () => void;
};

const formSchema = z.object({
  question: z
    .string()
    .trim()
    .min(2, {
      message: "Question is required",
    })
    .max(200, {
      message: "Question must be less than 200 characters",
    }),
});

const QuestionForm: React.FC<QuestionFormProps> = ({ onClose }) => {
  const searchParams = useParams();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const addQuestion = useAddQuestion();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await addQuestion.mutateAsync({
      productId: Number(searchParams?.id),
      question: values.question,
    });

    if (response.status) {
      toast({
        title: "Question Add Successful",
        description: response.message,
        variant: "success",
      });

      form.reset();
      onClose();
    } else {
      toast({
        title: "Question Add Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-5 text-center text-xl font-semibold">
          Post your question
        </DialogTitle>
      </DialogHeader>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="pl-5">
          <ul className="list-disc">
            <li>Be specific, ask questions only about the product.</li>
            <li>
              Ensure you have gone through the product specifications before
              posting your question.
            </li>
            <li>
              Reach out to Ultrasooq customer care for queries related to
              offers, orders, delivery etc.
            </li>
          </ul>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="card-item card-payment-form"
          >
            <ControlledTextareaInput
              label="Type your question here"
              name="question"
              placeholder="Enter your question here"
              rows={6}
            />

            <Button
              disabled={addQuestion.isPending}
              type="submit"
              className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
            >
              {addQuestion.isPending ? (
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
      </section>
    </div>
  );
};

export default QuestionForm;
