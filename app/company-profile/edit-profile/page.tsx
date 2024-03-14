"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useMemo } from "react";
import { useUpdateCompanyProfile } from "@/apis/queries/company.queries";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTags } from "@/apis/queries/tags.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMe } from "@/apis/queries/user.queries";

const formSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Company Name is required" })
    .max(50, { message: "Company Name must be less than 50 characters" }),
  businessTypeList: z
    .string()
    .transform((value) => [{ businessTypeId: Number(value) }]),
  annualPurchasingVolume: z
    .string()
    .trim()
    .min(2, { message: "Annual Purchasing Volume is required" })
    .max(50, {
      message: "Annual Purchasing Volume must be less than 20 characters",
    }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address is required" })
    .max(50, {
      message: "Address must be less than 50 characters",
    }),
  city: z.string().trim().min(2, { message: "City is required" }),
  province: z.string().trim().min(2, { message: "Province is required" }),
  country: z.string().trim().min(2, { message: "Country is required" }),
  yearOfEstablishment: z
    .string()
    .trim()
    .min(2, { message: "Year Of Establishment is required" })
    .transform((value) => Number(value)),
  totalNoOfEmployee: z
    .string()
    .trim()
    .min(2, { message: "Total No Of Employee is required" })
    .transform((value) => Number(value)),
  aboutUs: z.string().trim().min(2, { message: "About Us is required" }),
});

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileType: "COMPANY", // dont remove value
      companyLogo: "",
      companyName: "",
      annualPurchasingVolume: "",
      businessTypeList: undefined,
      address: "",
      city: "",
      province: "",
      country: "",
      yearOfEstablishment: "",
      totalNoOfEmployee: "",
      aboutUs: "",
    },
  });
  const userDetails = useMe();
  const tagsQuery = useTags();
  const updateCompanyProfile = useUpdateCompanyProfile();

  const onSubmit = async (formData: any) => {
    let data = {
      ...formData,
      profileType: "COMPANY",
      userProfileId: userDetails.data?.data?.userProfile?.[0]?.id as number,
    };

    console.log(data);
    // return;
    const response = await updateCompanyProfile.mutateAsync(data);

    if (response.status && response.data) {
      toast({
        title: "Profile Edit Successful",
        description: response.message,
      });
      form.reset();
      router.push("/company-profile-details");
    } else {
      toast({
        title: "Profile Edit Failed",
        description: response.message,
      });
    }
  };

  const memoizedTags = useMemo(() => {
    return (
      tagsQuery?.data?.data.map((item: { id: string; tagName: string }) => {
        return { label: item.tagName, value: item.id };
      }) || []
    );
  }, [tagsQuery?.data]);

  useEffect(() => {
    if (userDetails.data?.data) {
      console.log(userDetails.data?.data);
      const userProfile = userDetails.data?.data?.userProfile?.[0];

      form.reset({
        address: userProfile?.address || "",
        city: userProfile?.city || "",
        province: userProfile?.province || "",
        country: userProfile?.country || "",
        yearOfEstablishment: userProfile?.yearOfEstablishment?.toString() || "",
        totalNoOfEmployee: userProfile?.totalNoOfEmployee?.toString() || "",
        annualPurchasingVolume: userProfile?.annualPurchasingVolume || "",
        aboutUs: userProfile?.aboutUs || "",
        companyName: userProfile?.companyName || "",
        businessTypeList:
          userProfile?.userProfileBusinessType?.[0]?.businessTypeId?.toString() ||
          undefined,
      });
    }
  }, []);

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-10/12 lg:w-10/12 lg:p-12"
          >
            <div className="text-normal m-auto mb-7 w-full text-center text-sm leading-6 text-light-gray">
              <h2 className="mb-3 text-center text-3xl font-semibold leading-8 text-color-dark sm:text-4xl sm:leading-10">
                Company Profile
              </h2>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="mb-4 w-full">
                <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                  <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                    Company Information
                  </label>
                </div>
              </div>
              <div className="mb-3.5 w-full">
                <div className="flex flex-wrap">
                  <FormField
                    control={form.control}
                    name="companyLogo"
                    render={({ field }) => (
                      <FormItem className="mb-3.5 w-full md:w-6/12 md:pr-3.5">
                        <FormLabel>Upload Company Logo</FormLabel>
                        <FormControl>
                          <div className="relative m-auto flex h-64 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center">
                            <div className="text-sm font-medium leading-4 text-color-dark">
                              <Image
                                src="/images/upload.png"
                                className="m-auto mb-3"
                                width={30}
                                height={30}
                                alt="camera"
                              />
                              <span> Drop your Company Logo here, or </span>
                              <span className="text-blue-500">browse</span>
                              <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                                (.jpg or .png only. Up to 16mb)
                              </p>
                            </div>

                            <Input
                              type="file"
                              className="absolute h-full rounded-full bg-red-200 opacity-0"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mb-3.5 w-full md:w-6/12 md:pl-3.5">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Company Name"
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
                      name="businessTypeList"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel>Business Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
                                <SelectValue placeholder="Select Business Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {memoizedTags.map(
                                (item: { label: string; value: number }) => (
                                  <SelectItem
                                    value={item.value?.toString()}
                                    key={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualPurchasingVolume"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel>Annual Purchasing Volume</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Annual Purchasing Volume"
                              type="number"
                              className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
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

              <div className="mb-3.5 w-full">
                <div className="mb-4 w-full border-y border-solid border-gray-200 py-2.5">
                  <label className="m-0 block text-left text-base font-medium leading-5 text-color-dark">
                    Registration Address
                  </label>
                </div>
                <div className="flex flex-wrap">
                  <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Address"
                              className="!h-[54px] rounded border-gray-300 pr-10 focus-visible:!ring-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Image
                      src="/images/location.svg"
                      alt="location-icon"
                      height={17}
                      width={17}
                      className="absolute right-6 top-[50px]"
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full md:w-6/12 md:pl-3.5">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
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
                    name="province"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full md:w-6/12 md:pr-3.5">
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Province"
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
                    name="country"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full md:w-6/12 md:pl-3.5">
                        <FormLabel>Country</FormLabel>
                        <Select
                          //   onValueChange={field.onChange}
                          //   value={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="usa">USA</SelectItem>
                            <SelectItem value="uk">UK</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mb-3.5 w-full">
                <div className="mb-4 w-full border-y border-solid border-gray-200 py-2.5">
                  <label className="m-0 block text-left text-base font-medium leading-5 text-color-dark">
                    More Information
                  </label>
                </div>
                <div className="flex flex-wrap">
                  <FormField
                    control={form.control}
                    name="yearOfEstablishment"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full md:w-6/12 md:pr-3.5">
                        <FormLabel>Year Of Establishment</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
                              <SelectValue placeholder="Select Year Of Establishment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1990">1990</SelectItem>
                            <SelectItem value="1991">1991</SelectItem>
                            <SelectItem value="1992">1992</SelectItem>
                            <SelectItem value="1993">1993</SelectItem>
                            <SelectItem value="1994">1994</SelectItem>
                            <SelectItem value="1995">1995</SelectItem>
                            <SelectItem value="1996">1996</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalNoOfEmployee"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full md:w-6/12 md:pl-3.5">
                        <FormLabel>Total Number of Employees</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
                              <SelectValue placeholder="Select Number of Employees" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1000">1000</SelectItem>
                            <SelectItem value="2000">2000</SelectItem>
                            <SelectItem value="3000">3000</SelectItem>
                            <SelectItem value="4000">4000</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
              disabled={updateCompanyProfile.isPending}
              type="submit"
              className="h-14 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
            >
              {updateCompanyProfile.isPending ? (
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
    </section>
  );
}
