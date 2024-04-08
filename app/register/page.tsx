"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegister } from "@/apis/queries/auth.queries";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EMAIL_REGEX_LOWERCASE, TRADE_ROLE_LIST } from "@/utils/constants";
import { cn } from "@/lib/utils";
import PolicyContent from "@/components/shared/PolicyContent";
import TermsContent from "@/components/shared/TermsContent";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";

const formSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, {
        message: "First Name is required",
      })
      .max(50, {
        message: "First Name must be less than 50 characters",
      }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Last Name is required" })
      .max(50, {
        message: "Last Name must be less than 50 characters",
      }),
    email: z
      .string()
      .trim()
      .min(5, { message: "Email Address is required" })
      .email({
        message: "Invalid Email Address",
      })
      .refine((val) => (EMAIL_REGEX_LOWERCASE.test(val) ? true : false), {
        message: "Email must be in lower case",
      }),
    initialPassword: z
      .string()
      .trim()
      .min(2, {
        message: "Login Password is required",
      })
      .min(8, {
        message: "Password must be longer than or equal to 8 characters",
      }),
    password: z
      .string()
      .trim()
      .min(2, {
        message: "Confirm Password is required",
      })
      .min(8, {
        message: "Password must be longer than or equal to 8 characters",
      }),
    cc: z.string().trim(),
    phoneNumber: z
      .string()
      .trim()
      .min(2, {
        message: "Phone Number is required",
      })
      .min(8, {
        message: "Phone Number must be minimum of 8 digits",
      })
      .max(20, {
        message: "Phone Number cannot be more than 20 digits",
      }),
    tradeRole: z.string().trim().min(2, {
      message: "Trade Role is required",
    }),
    acceptTerms: z.boolean().refine((val) => val, {
      message: "You must accept the Terms Of Use & Privacy Policy",
    }),
  })
  .superRefine(({ initialPassword, password }, ctx) => {
    if (initialPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["password"],
      });
    }
  });

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      initialPassword: "",
      password: "",
      phoneNumber: "",
      cc: "",
      tradeRole: "",
      acceptTerms: false,
    },
  });

  const handleToggleTermsModal = () => setIsTermsModalOpen(!isTermsModalOpen);
  const handleTogglePrivacyModal = () =>
    setIsPrivacyModalOpen(!isPrivacyModalOpen);

  const register = useRegister();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const data = {
      ...formData,
      phoneNumber: `+${formData.phoneNumber}`,
    };

    // console.log(data);
    // return;

    const response = await register.mutateAsync(data);

    if (response?.status && response?.otp) {
      toast({
        title: "Verification code sent",
        description: "OTP has been sent to your email/phone",
      });
      sessionStorage.setItem("email", formData.email.toLowerCase());
      form.reset();
      router.push("/otp-verify");
    } else {
      toast({
        title: "Registration Failed",
        description: response.message,
      });
    }
  };

  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          src="/images/before-login-bg.png"
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
                Registration
              </h2>
              <p>Create Your account</p>
            </div>
            <div className="w-full">
              <ul className="flex w-full flex-wrap items-center justify-between">
                <li className="mb-3 w-full p-0 sm:mb-0 sm:w-6/12 sm:pr-3">
                  <a
                    href="#"
                    className="inline-flex w-full items-center justify-center rounded-md border border-solid border-gray-300 px-5 py-2.5 text-sm font-normal leading-4 text-light-gray"
                  >
                    <Image
                      src="/images/facebook-icon.png"
                      className="mr-1.5"
                      alt="facebook-icon"
                      height={26}
                      width={26}
                    />
                    <span>Sign In with Facebook</span>
                  </a>
                </li>
                <li className="w-full p-0 sm:w-6/12 sm:pl-3">
                  <a
                    href="#"
                    className="inline-flex w-full items-center justify-center rounded-md border border-solid border-gray-300 px-5 py-2.5 text-sm font-normal leading-4 text-light-gray"
                  >
                    <Image
                      src="/images/google-icon.png"
                      className="mr-1.5"
                      alt="google-icon"
                      height={26}
                      width={26}
                    />
                    <span>Sign In with Google</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="relative w-full py-5 text-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-px before:w-full before:bg-gray-200 before:content-['']">
              <span className="relative z-10 bg-white p-2.5 text-sm font-normal leading-8 text-gray-400">
                Or
              </span>
            </div>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="flex flex-wrap"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="tradeRole"
                    render={({ field }) => (
                      <FormItem className="mb-4 flex w-full flex-col items-center md:flex-row md:items-start">
                        <FormLabel className="mb-3 mr-6 capitalize md:mb-0">
                          Please select trade role:
                        </FormLabel>
                        <div className="!mt-0">
                          <FormControl className="mb-2">
                            <RadioGroup
                              className="!mt-0 flex items-center gap-4"
                              onValueChange={field.onChange}
                            >
                              {TRADE_ROLE_LIST.map((role) => (
                                <FormItem
                                  key={role.value}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <div
                                      key={role.value}
                                      className="flex items-center space-x-2"
                                    >
                                      <RadioGroupItem
                                        value={role.value}
                                        id={role.value}
                                      />
                                      <FormLabel htmlFor={role.value}>
                                        {role.label}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <ControlledTextInput
                    label="First Name"
                    name="firstName"
                    placeholder="Enter Your First Name"
                  />

                  <ControlledTextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                  />

                  <ControlledTextInput
                    label="Email Address"
                    name="email"
                    placeholder="Enter Your Email Address"
                  />

                  <ControlledTextInput
                    label="Login Password"
                    name="initialPassword"
                    placeholder="Enter Your Login Password"
                    type="password"
                  />

                  <ControlledTextInput
                    label="Confirm Password"
                    name="password"
                    placeholder="Enter Your Login Password Again"
                    type="password"
                  />

                  <div className="mb-4 flex w-full flex-col justify-between space-y-3">
                    <Label
                      className={cn(
                        form.formState.errors.phoneNumber
                          ? "!text-red-500"
                          : "",
                      )}
                    >
                      Phone Number
                    </Label>
                    <Controller
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <PhoneInput
                          country={"eg"}
                          enableSearch={true}
                          value={field.value}
                          onChange={(phone: string, country: CountryData) => {
                            form.setValue("cc", `+${country.dialCode}`);
                            field.onChange(phone);
                          }}
                          inputClass="!h-12 !w-full text-sm"
                          placeholder="Enter Your Phone Number"
                        />
                      )}
                    />
                    <p className="text-[13px] font-medium text-red-500">
                      {form.formState.errors.phoneNumber?.message
                        ? "Phone Number is required"
                        : ""}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="mb-4 flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                          />
                        </FormControl>
                        <div className="flex flex-col leading-none">
                          <div className="text-sm text-light-gray">
                            <span>I Agree the </span>
                            <Button
                              onClick={handleToggleTermsModal}
                              type="button"
                              className="ml-1 bg-transparent p-0 shadow-none hover:bg-transparent"
                            >
                              <span className="text-light-gray underline">
                                Terms Of Use
                              </span>
                            </Button>
                            <span className="mx-1 text-light-gray">&</span>
                            <Button
                              onClick={handleTogglePrivacyModal}
                              type="button"
                              className="ml-1 bg-transparent p-0 shadow-none hover:bg-transparent"
                            >
                              <span className="text-light-gray underline">
                                Privacy Policy
                              </span>
                            </Button>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="mb-4 w-full">
                    <Button
                      disabled={register.isPending}
                      type="submit"
                      className="theme-primary-btn h-12 w-full rounded text-center text-lg font-bold leading-6"
                    >
                      {register.isPending ? (
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
                        "Agree & Register"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mb-4 w-full text-center">
                <span className="text-sm font-medium leading-4 text-light-gray">
                  Do you already have an account?{" "}
                  <a
                    onClick={() => router.push("/login")}
                    className="cursor-pointer font-medium text-dark-orange"
                  >
                    Sign in
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isTermsModalOpen} onOpenChange={handleToggleTermsModal}>
        <DialogContent className="max-h-[93vh] max-w-[90%] gap-0 p-0 md:!max-w-[90%] lg:!max-w-5xl">
          <DialogHeader className="border-b border-light-gray py-4">
            <DialogTitle className="text-center text-xl font-bold">
              Terms Of Use
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="max-h-[82vh] overflow-y-scroll p-4 text-sm font-normal leading-7 text-color-dark">
            <TermsContent />
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={isPrivacyModalOpen} onOpenChange={handleTogglePrivacyModal}>
        <DialogContent className="max-h-[93vh] max-w-[90%] gap-0 p-0 md:!max-w-[90%] lg:!max-w-5xl">
          <DialogHeader className="border-b border-light-gray py-4">
            <DialogTitle className="text-center text-xl font-bold">
              Privacy Policy
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="max-h-[82vh] overflow-y-scroll p-4 text-sm font-normal leading-7 text-color-dark">
            <PolicyContent />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
}
