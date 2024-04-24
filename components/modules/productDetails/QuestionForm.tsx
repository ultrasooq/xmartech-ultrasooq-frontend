import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useAddReview } from "@/apis/queries/review.queries";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import ControlledTextareaInput from "@/components/shared/Forms/ControlledTextareaInput";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  question: z
    .string()
    .trim()
    .min(2, {
      message: "Question is required",
    })
    .max(50, {
      message: "Question must be less than 50 characters",
    }),
});

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const addReview = useAddReview();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              Reach out to Puremoon customer care for queries related to offers,
              orders, delivery etc.
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
              disabled={addReview.isPending}
              type="submit"
              className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
            >
              {addReview.isPending ? (
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
