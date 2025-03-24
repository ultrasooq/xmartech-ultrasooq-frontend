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
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
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
        title: t("question_add_successful"),
        description: response.message,
        variant: "success",
      });

      form.reset();
      onClose();
    } else {
      toast({
        title: t("question_add_failed"),
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-5 text-center text-xl font-semibold">
          {t("post_your_question")}
        </DialogTitle>
      </DialogHeader>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="pl-5">
          <ul className="list-disc">
            <li>{t("question_instruction_1")}</li>
            <li>{t("question_instruction_2")}</li>
            <li>{t("question_instruction_3")}</li>
          </ul>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="card-item card-payment-form"
          >
            <ControlledTextareaInput
              label={t("type_your_question_here")}
              name="question"
              placeholder={t("enter_your_question_here")}
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
                  {t("please_wait")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default QuestionForm;
