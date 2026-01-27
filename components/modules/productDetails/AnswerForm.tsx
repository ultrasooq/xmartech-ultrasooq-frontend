/**
 * @file AnswerForm.tsx
 * @description A dialog form for submitting answers to product questions.
 *   Renders within a Dialog modal and allows users to type and submit a reply
 *   to a specific product question.
 *
 * @props
 *   - onClose {() => void} - Callback to close the answer dialog.
 *   - questionId {number} - The ID of the question being answered.
 *   - onReplySuccess {(answer: string) => void} - Optional callback invoked
 *     after a successful answer submission with the answer text.
 *
 * @behavior
 *   - Uses Zod schema validation: answer must be 2-200 characters, trimmed.
 *   - Submits via `useUpdateAnswer` mutation with questionId and answer text.
 *   - On success: shows success toast, calls `onReplySuccess` with the answer,
 *     closes the dialog, and resets the form.
 *   - On error: shows error toast with the response message.
 *   - Renders a header with title and close icon, a textarea input, an
 *     instruction list, and a submit button.
 *
 * @dependencies
 *   - useForm, zodResolver (React Hook Form + Zod) - Form validation.
 *   - useUpdateAnswer (TanStack Query) - Answer submission mutation.
 *   - ControlledTextareaInput - Textarea form component.
 *   - useToast (shadcn) - Toast notifications.
 *   - useTranslations (next-intl) - i18n translations.
 *   - useAuth (AuthContext) - Language direction.
 */
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
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

type AnswerFormProps = {
  onClose: () => void;
  questionId: number;
  onReplySuccess?: (answer: string) => void;
};

const formSchema = (t: any) => {
  return z.object({
    answer: z
      .string()
      .trim()
      .min(2, {
        message: t("answer_required"),
      })
      .max(200, {
        message: t("answer_must_be_less_than_n_chars", { n: 200 }),
      }),
  });
};

const AnswerForm: React.FC<AnswerFormProps> = ({ onClose, questionId, onReplySuccess }) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const { toast } = useToast();
  const defaultValues = {
    answer: "",
  }
  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: defaultValues,
  });

  const updateAnswer = useUpdateAnswer();

  const onSubmit = async (values: typeof defaultValues) => {
    const response = await updateAnswer.mutateAsync({
      productQuestionId: questionId,
      answer: values.answer,
    });

    if (response.status) {
      toast({
        title: t("answer_add_successful"),
        description: response.message,
        variant: "success",
      });

      form.reset();
      onClose();
      
      if (onReplySuccess) onReplySuccess(values.answer);
    } else {
      toast({
        title: t("answer_add_failed"),
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="mb-5 text-center text-xl font-semibold" dir={langDir} translate="no">
          {t("post_your_answer")}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card-item card-payment-form"
        >
          <ControlledTextareaInput
            label={t("type_your_answer_here")}
            name="answer"
            placeholder={t("enter_your_answer_here")}
            rows={6}
            dir={langDir}
            translate="no"
          />

          <Button
            disabled={updateAnswer.isPending}
            type="submit"
            className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
            dir={langDir}
            translate="no"
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
                {t("please_wait")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
