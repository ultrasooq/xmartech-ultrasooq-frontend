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
import { Input } from "@/components/ui/input";
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
import { EMAIL_REGEX_LOWERCASE } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { countryObjs } from "@/utils/helper";

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
    cc: z.string().trim().min(2, {
      message: "Country Code is required",
    }),
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
      message: "You must accept the terms",
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
    const response = await register.mutateAsync(formData);

    if (response?.status && response?.otp) {
      toast({
        title: "Otp Sent",
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
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="BUYER" id="BUYER" />
                                <Label htmlFor="BUYER">Buyer</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="FREELANCER"
                                  id="FREELANCER"
                                />
                                <Label htmlFor="FREELANCER">Freelancer</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="COMPANY" id="COMPANY" />
                                <Label htmlFor="COMPANY">Company</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
                            className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
                            className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Email Address"
                            className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="initialPassword"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Login Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter Your Login Password"
                            className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter Your Login Password Again"
                            className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex w-full">
                    <div className="mb-4 flex w-full max-w-[120px] flex-col justify-between md:pr-3.5">
                      <Label
                        className={cn(
                          form.formState.errors.cc?.message
                            ? "text-red-500"
                            : "",
                          "mb-3 mt-[6px]",
                        )}
                      >
                        Country Code
                      </Label>
                      <Controller
                        name="cc"
                        control={form.control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="!h-[54px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                          >
                            <option value="">Select</option>
                            {Object.keys(countryObjs).map((key) => (
                              <option
                                key={key}
                                value={
                                  countryObjs[key as keyof typeof countryObjs]
                                }
                              >
                                ({countryObjs[key as keyof typeof countryObjs]}){" "}
                                {key}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      <p className="text-[13px] font-medium text-red-500">
                        {form.formState.errors.cc?.message ? "Required" : ""}
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              onWheel={(e) => e.currentTarget.blur()}
                              placeholder="Enter Your Phone Number"
                              className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      className="h-14 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
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
        <DialogContent className="md:!max-w-4xl">
          <DialogHeader className="border-b border-light-gray pb-3">
            <DialogTitle className="text-center">Terms Of Use</DialogTitle>
          </DialogHeader>
          <DialogDescription className="max-h-[500px] min-h-[300px] overflow-y-auto text-sm font-normal leading-7 text-color-dark">
            <p className="mb-3">Welcome to Puremoon!</p>

            <p className="mb-3">
              These terms and conditions outline the rules and regulations for
              the use of Puremoon Website, located at www.Puremoon.com.
            </p>

            <p className="mb-3">
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use [Website/Service] if you do not
              agree to take all of the terms and conditions stated on this page.
            </p>

            <p className="mb-3">
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company’s terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. All terms refer to the offer, acceptance and
              consideration of payment necessary to undertake the process of our
              assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client’s needs in respect of
              provision of the Company’s stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above
              terminology or other words in the singular, plural, capitalization
              and/or he/she or they, are taken as interchangeable and therefore
              as referring to same.
            </p>

            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Cookies
            </h4>

            <p className="mb-3">
              {" "}
              We employ the use of cookies. By accessing [Website/Service], you
              agreed to use cookies in agreement with the [Website/Service]'s
              Privacy Policy.
            </p>

            <p className="mb-3">
              Most interactive websites use cookies to let us retrieve the
              user’s details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </p>

            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              License
            </h4>

            <p className="mb-3">
              Unless otherwise stated, [Website/Service] and/or its licensors
              own the intellectual property rights for all material on
              [Website/Service]. All intellectual property rights are reserved.
              You may access this from [Website/Service] for your own personal
              use subjected to restrictions set in these terms and conditions.
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={isPrivacyModalOpen} onOpenChange={handleTogglePrivacyModal}>
        <DialogContent className="md:!max-w-4xl">
          <DialogHeader className="border-b border-light-gray pb-3">
            <DialogTitle className="text-center">Privacy Policy</DialogTitle>
          </DialogHeader>
          <DialogDescription className="max-h-[500px] min-h-[300px] overflow-y-auto text-sm font-normal leading-7 text-color-dark">
            <p className="mb-3">Welcome to Puremoon!</p>
            This Privacy Policy outlines how we collect, use, disclose, and
            manage your personal information when you use our services or
            interact with our website. Protecting your privacy is paramount to
            us, and we are committed to ensuring that your personal information
            remains confidential and secure.
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Information We Collect
            </h4>
            <p className="mb-3">
              We may collect personal information from you when you voluntarily
              provide it to us, such as when you sign up for an account, make a
              purchase, or contact us for support. This information may include
              your name, email address, billing information, and other details
              necessary to provide our services.
            </p>
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              How We Use Your Information
            </h4>
            <p className="mb-3">
              We use the information we collect to provide and improve our
              services, communicate with you, process transactions, and
              personalize your experience. Additionally, we may use your
              information to send you promotional materials or important updates
              about our services.
            </p>
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Information Sharing
            </h4>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third
              parties without your consent. However, we may share your
              information with trusted third-party service providers who assist
              us in operating our website, conducting our business, or servicing
              you, as long as those parties agree to keep this information
              confidential.
            </p>
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Data Security
            </h4>
            <p className="mb-3">
              We employ industry-standard security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet or electronic storage is completely secure, so
              we cannot guarantee absolute security.
            </p>
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Cookies
            </h4>
            <p className="mb-3">
              We may use cookies and similar tracking technologies to enhance
              your browsing experience, analyze usage patterns, and deliver
              personalized content. You have the option to accept or decline
              cookies. If you choose to decline cookies, you may not be able to
              fully experience all features of our website.
            </p>
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Changes to This Policy
            </h4>
            <p className="mb-3">
              We reserve the right to update or modify this Privacy Policy at
              any time without prior notice. Any changes will be effective
              immediately upon posting on our website. We encourage you to
              review this Privacy Policy periodically to stay informed about how
              we are protecting your information.
            </p>
            <h4 className="mt-4 text-lg font-bold capitalize text-color-dark">
              Contact Us
            </h4>
            <p className="mb-3">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at [contact email/phone
              number]. By using our services or accessing our website, you
              consent to the terms outlined in this Privacy Policy.
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
}
