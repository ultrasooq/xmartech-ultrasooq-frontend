"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import _ from "lodash";
import { useLogin } from "@/apis/queries/auth.queries";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { EMAIL_REGEX_LOWERCASE, PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { useUpdateUserCartByDeviceId } from "@/apis/queries/cart.queries";
import { getOrCreateDeviceId } from "@/utils/helper";

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
  password: z
    .string()
    .trim()
    .min(2, {
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be longer than or equal to 8 characters",
    }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const deviceId = getOrCreateDeviceId() || "";

  const login = useLogin();
  const updateCart = useUpdateUserCartByDeviceId();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(formData);
    // return;
    const response = await login.mutateAsync(values);

    if (response?.status && response?.accessToken) {
      // store in cookie
      setCookie(PUREMOON_TOKEN_KEY, response.accessToken);

      // update cart
      await updateCart.mutateAsync({ deviceId });
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        variant: "success",
      });
      form.reset();
      router.push("/home");
    } else {
      toast({
        title: "Login Failed",
        description: response.message,
        variant: "danger",
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
                Login
              </h2>
              <p>Login to your account</p>
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

                  <ControlledTextInput
                    label="Password"
                    name="password"
                    placeholder="**********"
                    type="password"
                  />

                  <div className="mb-4 w-full">
                    <div className="flex w-auto items-center justify-between p-0 lg:w-full">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="w-auto">
                        <span
                          className="cursor-pointer text-sm font-medium leading-8 text-dark-orange"
                          onClick={() => router.push("/forget-password")}
                        >
                          Forgot Password?
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <Button
                      disabled={login.isPending}
                      type="submit"
                      className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
                    >
                      {login.isPending ? (
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
                        "Login"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mb-4 w-full text-center">
                <span className="text-sm font-medium leading-4 text-light-gray">
                  Don&apos;t have an account?{" "}
                  <a
                    onClick={() => router.push("/register")}
                    className="cursor-pointer font-medium text-dark-orange"
                  >
                    Signup
                  </a>
                </span>
              </div>
            </div>
            <div className="relative w-full py-5 text-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:block before:h-px before:w-full before:bg-gray-200 before:content-['']">
              <span className="relative z-10 bg-white p-2.5 text-sm font-normal leading-8 text-gray-400">
                Or
              </span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
