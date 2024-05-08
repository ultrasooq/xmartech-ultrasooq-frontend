"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForgotPassword } from "@/apis/queries/auth.queries";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EMAIL_REGEX_LOWERCASE } from "@/utils/constants";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import BackgroundImage from "@/public/images/before-login-bg.png";
import LoaderIcon from "@/public/images/load.png";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, { message: "Email is required" })
    .email({
      message: "Invalid Email Address",
    })
    .refine((val) => (EMAIL_REGEX_LOWERCASE.test(val) ? true : false), {
      message: "Email must be in lower case",
    }),
});

export default function ForgetPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const forgotPassword = useForgotPassword();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await forgotPassword.mutateAsync(values);

    if (response?.status && response?.otp) {
      toast({
        title: "Verification code sent",
        description: response?.message,
        variant: "success",
      });

      sessionStorage.setItem("email", values.email.toLowerCase());
      form.reset();
      router.push("/password-reset-verify");
    } else {
      toast({
        title: "Verification error!",
        description: response?.message,
        variant: "danger",
      });
    }
  };

  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          src={BackgroundImage}
          className="h-full w-full object-cover object-center"
          alt="background"
          fill
          priority
        />
      </div>
      <div className="container relative z-10 m-auto">
        <div className="flex">
          <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-7 shadow-sm sm:p-12 md:w-9/12 lg:w-7/12">
            <div className="text-normal m-auto mb-7 w-full text-center text-sm leading-6 text-light-gray">
              <h2 className="mb-3 text-center text-3xl font-semibold leading-8 text-color-dark sm:text-4xl sm:leading-10">
                Forgot Your Password
              </h2>
              <p>Enter email address to receive password reset link</p>
            </div>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="flex flex-wrap"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <ControlledTextInput
                    label="Email or Phone number or ID"
                    name="email"
                    placeholder="Enter Your Email or Phone number or ID"
                  />

                  <div className="mb-4 w-full">
                    <Button
                      disabled={forgotPassword.isPending}
                      type="submit"
                      className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold  leading-6"
                    >
                      {forgotPassword.isPending ? (
                        <>
                          <Image
                            src={LoaderIcon}
                            alt="loader-icon"
                            width={20}
                            height={20}
                            className="mr-2 animate-spin"
                          />
                          Please wait
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
