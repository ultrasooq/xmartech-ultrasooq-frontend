"use client";
import { useUpdateFreelancerProfile } from "@/apis/queries/freelancer.queries";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMe } from "@/apis/queries/user.queries";

const formSchema = z.object({
  aboutUs: z.string().trim().min(2, { message: "About Us is required" }),
});

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutUs: "",
    },
  });

  const userDetails = useMe();
  const updateFreelancerProfile = useUpdateFreelancerProfile();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const data = {
      aboutUs: formData.aboutUs,
      profileType: "FREELANCER",
      userProfileId: userDetails.data?.data?.userProfile?.[0]?.id as number,
    };

    const response = await updateFreelancerProfile.mutateAsync(data);

    if (response.status && response.data) {
      toast({
        title: "Profile Edit Successful",
        description: response.message,
      });
      form.reset();
      router.push("/freelancer-profile-details");
    } else {
      toast({
        title: "Profile Edit Failed",
        description: response.message,
      });
    }
  };

  useEffect(() => {
    if (userDetails.data?.data) {
      form.reset({
        aboutUs: userDetails.data?.data?.userProfile?.[0]?.aboutUs || "",
      });
    }
  }, [userDetails.data?.status]);

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-10/12 lg:w-10/12 lg:p-12"
            >
              <div className="text-normal m-auto mb-7 w-full text-center text-sm leading-6 text-light-gray">
                <h2 className="mb-3 text-center text-3xl font-semibold leading-8 text-color-dark sm:text-4xl sm:leading-10">
                  Freelancer Profile
                </h2>
              </div>
              <div className="flex w-full flex-wrap">
                <div className="mb-4 w-full">
                  <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                    <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                      Freelancer Information
                    </label>
                  </div>
                </div>
                <div className="mb-3.5 w-full">
                  <div className="flex flex-wrap">
                    <FormField
                      control={form.control}
                      name="aboutUs"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel>About Us</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write Here...."
                              className="rounded border-gray-300 focus-visible:!ring-0"
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button
                disabled={updateFreelancerProfile.isPending}
                type="submit"
                className="h-14 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
              >
                {updateFreelancerProfile.isPending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Edit changes"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
