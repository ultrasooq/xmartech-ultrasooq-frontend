"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResendOtp, useVerifyOtp } from "@/apis/queries/auth.queries";
import { useToast } from "@/components/ui/use-toast";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";

export default function OtpVerifyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [count, setCount] = useState(600);
  const refs = React.useRef<HTMLInputElement[]>([]);
  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const verifyOtp = useVerifyOtp();
  const resendOtp = useResendOtp();

  const formatTime = useMemo(
    () =>
      (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      },
    [],
  );

  const startTimer = () => {
    return setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
  };

  const onSubmit = async (formData: any) => {
    if (otp.join("") === "") {
      toast({
        title: "OTP is required",
      });
      return;
    }
    // TODO: fix z.infer for formvalue
    const combinedOtp = otp.join("");

    if (combinedOtp.length !== 4) {
      toast({
        title: "OTP length should be 4 digits",
      });
      return;
    }
    const data = {
      email: formData.email?.toLowerCase(),
      otp: Number(combinedOtp),
    };
    const response = await verifyOtp.mutateAsync(data);

    if (response?.status && response?.accessToken) {
      // store in cookie
      setCookie(PUREMOON_TOKEN_KEY, response.accessToken);
      toast({
        title: "Verification Successful",
        description: response.message,
      });
      form.reset();
      setOtp(new Array(4).fill(""));
      sessionStorage.clear();
      router.push("/profile");
    } else {
      toast({
        title: "Verification Failed",
        description: response.message,
      });
    }
  };

  const handleResendOtp = async () => {
    const email = sessionStorage.getItem("email") || "";
    const data = {
      email: email.toLowerCase(),
    };

    if (!data.email) {
      toast({
        title: "Email is required",
      });
      return;
    }
    const response = await resendOtp.mutateAsync(data);

    if (response.status && response.otp) {
      toast({
        title: "Otp Sent",
        description: response.message,
      });
      setCount(600);
      setOtp(new Array(4).fill(""));
    } else {
      toast({
        title: "Otp Failed",
        description: response.message,
      });
    }
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

  useEffect(() => {
    if (window) {
      const storedEmail = sessionStorage.getItem("email");

      if (storedEmail) {
        form.setValue("email", storedEmail.toLowerCase());
      }
    }
  }, []);

  useEffect(() => {
    const countDown = startTimer();

    return () => clearInterval(countDown);
  }, [count]);

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
                    <Button
                      disabled={verifyOtp.isPending || resendOtp.isPending}
                      type="submit"
                      className="m-auto h-12 rounded bg-dark-orange px-10 text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
                    >
                      {verifyOtp.isPending ? (
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
                        "Verify"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mb-4 w-full space-x-2 text-center">
                <span className="text-sm font-medium leading-4 text-light-gray">
                  Didn&apos;t receive OTP?
                </span>
                <Button
                  type="button"
                  variant="link"
                  disabled={verifyOtp.isPending || resendOtp.isPending}
                  onClick={handleResendOtp}
                  className="cursor-pointer p-0 font-medium text-dark-orange"
                >
                  Resend
                </Button>
              </div>
              <p className="text-center text-sm font-medium leading-4 text-dark-orange">
                OTP will expire in {formatTime(count)} minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
