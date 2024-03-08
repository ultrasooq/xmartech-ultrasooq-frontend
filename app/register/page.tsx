"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { ReloadIcon } from "@radix-ui/react-icons";
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
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, {
        message: "First Name is Required",
      })
      .max(50, {
        message: "First Name must be less than 50 characters",
      }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Last Name is Required" })
      .max(50, {
        message: "Last Name must be less than 50 characters",
      }),
    email: z.string().trim().min(5, { message: "Email is Required" }).email({
      message: "Invalid Email Address",
    }),
    initialPassword: z
      .string()
      .trim()
      .min(2, {
        message: "Password is Required",
      })
      .min(8, {
        message: "Password must be longer than or equal to 8 characters",
      }),
    password: z
      .string()
      .trim()
      .min(2, {
        message: "Confirm Password is Required",
      })
      .min(8, {
        message: "Password must be longer than or equal to 8 characters",
      }),
    phoneNumber: z
      .string()
      .trim()
      .min(2, {
        message: "Phone Number is Required",
      })
      .min(10, {
        message: "Phone Number must be longer than or equal to 10 characters",
      })
      .max(10, {
        message: "Phone Number must be less than 10 characters",
      }),
    tradeRole: z.string().trim().min(2, {
      message: "Trade Role is Required",
    }),
    acceptTerms: z.boolean().refine((val) => val, {
      message: "You must accept the terms",
    }),
    cc: z.string().trim(),
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      initialPassword: "",
      password: "",
      phoneNumber: "",
      cc: "+91",
      tradeRole: "",
      acceptTerms: false,
    },
  });

  const register = useRegister();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      tradeRole: values.tradeRole,
      cc: "+91",
    };
    const response = await register.mutateAsync(data);

    if (response?.status && response?.otp) {
      toast({
        title: "Otp Sent",
        description: "OTP has been sent to your email/phone",
      });
      sessionStorage.setItem("email", values.email);
      sessionStorage.setItem("otp", response.otp.toString());
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
                    <span>Sign In with Facebook</span>
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
                            placeholder="Enter Your Confirm Password"
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
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Your Phone Number"
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
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="mb-4 flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:!bg-dark-orange"
                          />
                        </FormControl>
                        <div className="space-y-2 leading-none">
                          <FormLabel className="text-light-gray">
                            <Dialog>
                              <DialogTrigger>
                                I Agree The{" "}
                                <span className="underline">Terms Of Use</span>{" "}
                                &{" "}
                                <span className="underline">
                                  Privacy Policy
                                </span>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogDescription>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptate quas accusamus
                                    unde vero, earum, quo perspiciatis libero
                                    adipisci tempore magni ad quia vitae, sint
                                    dolore voluptatum repellendus exercitationem
                                    dolores! Esse. Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Voluptate quas
                                    accusamus unde vero, earum, quo perspiciatis
                                    libero adipisci tempore magni ad quia vitae,
                                    sint dolore voluptatum repellendus
                                    exercitationem dolores! Esse. Lorem ipsum
                                    dolor sit amet consectetur adipisicing elit.
                                    Voluptate quas accusamus unde vero, earum,
                                    quo perspiciatis libero adipisci tempore
                                    magni ad quia vitae, sint dolore voluptatum
                                    repellendus exercitationem dolores! Esse.
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </FormLabel>
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
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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
    </section>
  );
}
