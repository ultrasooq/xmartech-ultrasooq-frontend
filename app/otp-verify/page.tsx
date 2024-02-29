"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { number } from "prop-types";

export default function OtpVerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const refs = React.useRef<HTMLInputElement[]>([]);

  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(otp.join(""));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const regex = /[^0-9]/g;
    if (regex.test(e.target.value)) {
      return;
    }
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp([...newOtp]);
    // Move to next input if current input is filled
    if (value && index < otp.length - 1 && refs.current[index + 1]) {
      refs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    if (refs.current[index]) {
      refs.current[index].setSelectionRange(1, 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Move to the previous input field on backspace
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      refs.current[index - 1]
    ) {
      refs.current[index - 1].focus();
    }
  };

  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <img
          src="images/before-login-bg.png"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
      <div className="container relative z-10 m-auto">
        <div className="flex">
          <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-7 shadow-sm sm:p-12 md:w-9/12 lg:w-7/12">
            <div className="text-normal text-light-gray m-auto mb-7 w-full text-center text-sm leading-6">
              <h2 className="text-color-dark mb-3 text-center text-3xl font-semibold leading-8 sm:text-4xl sm:leading-10">
                Verify OTP
              </h2>
              <p>Enter the OTP which you received via email</p>
            </div>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="flex flex-wrap"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="mb-4 w-full">
                    <div className="m-auto flex h-auto w-3/4 items-center justify-center gap-x-5 border-0">
                      {otp?.map((value, index) => (
                        <Input
                          value={value}
                          ref={(el) => el && (refs.current[index] = el)}
                          type="text"
                          onChange={(e) => handleChange(e, index)}
                          onClick={() => handleClick(index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="h-16 !w-16 rounded-lg border-gray-300 text-center text-2xl focus-visible:!ring-0"
                          autoFocus={index === 0}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 w-full text-center">
                    <button
                      type="submit"
                      className="bg-dark-orange m-auto h-14 w-auto rounded px-10 text-center text-lg font-bold leading-6 text-white"
                    >
                      Verify
                    </button>
                  </div>
                </form>
              </Form>
              <div className="mb-4 w-full text-center">
                <span className="text-light-gray text-sm font-medium leading-4">
                  Didn't receive OTP?{" "}
                  <a
                    onClick={() => router.push("/register")}
                    className="text-dark-orange cursor-pointer font-medium"
                  >
                    Signup
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
