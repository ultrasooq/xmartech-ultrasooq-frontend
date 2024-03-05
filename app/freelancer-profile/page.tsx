"use client";
import { useCreateFreelancerProfile } from "@/apis/queries/freelancer.queries";
import AccordionMultiSelect from "@/components/shared/AccordionMultiSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPE_LIST, DAYS_OF_WEEK, TAG_LIST } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  aboutUs: z.string().trim().min(2, { message: "About Us is Required" }),
  businessType: z.array(z.string()),
  address: z.string().trim().min(2, { message: "Address is Required" }),
  city: z.string().trim().min(2, { message: "City is Required" }),
  province: z.string().trim().min(2, { message: "Province is Required" }),
  country: z.string().trim().min(2, { message: "Country is Required" }),
  branchContactNumber: z
    .string()
    .trim()
    .min(2, { message: "Branch Contact Number is Required" }),
  branchContactName: z
    .string()
    .trim()
    .min(2, { message: "Branch Contact Name is Required" }),
  startTime: z.date(),
  endTime: z.date(),
  // days: z.array(z.string()),
  tags: z.array(z.string()),
});

export default function FreelancerProfilePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutUs: "",
      businessType: undefined,
      address: "",
      city: "",
      province: "",
      country: "",
      branchContactNumber: "",
      branchContactName: "",
      startTime: new Date(),
      endTime: new Date(),
      days: undefined,
      tags: undefined,
    },
  });

  const createFreelancerProfile = useCreateFreelancerProfile();

  const onSubmit = async (values: any) => {
    console.log(values);
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

                    <AccordionMultiSelect
                      label="Business Type"
                      name="businessType"
                      options={BUSINESS_TYPE_LIST}
                      placeholder="Business Type"
                    />

                    <div className="inline-block w-full">
                      <label className="mb-3 block text-left text-sm font-medium leading-5 text-color-dark">
                        Business Type
                      </label>
                      <div className="relative mb-3.5 w-full rounded border border-solid border-gray-200 p-3">
                        <div className="flex w-full items-center justify-between">
                          <div className="w-auto">
                            <span className="my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal leading-4 text-dark-cyan">
                              Individual
                              <img src="images/close.svg" className="ml-4" />
                            </span>
                          </div>
                          <div className="w-auto">
                            <ul>
                              <li>
                                <img src="images/social-arrow-icon.svg" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="relative mb-3.5 w-full rounded border border-solid border-gray-200 p-3">
                        <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                          <label className="flex w-auto items-center justify-start text-sm font-normal leading-8 text-light-gray">
                            <input
                              type="checkbox"
                              name=""
                              className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange [&:checked~span]:text-color-dark "
                            />
                            <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                            <span className="tex">Individual</span>
                          </label>
                        </div>
                        <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                          <label className="flex w-auto items-center justify-start text-sm font-normal leading-8 text-light-gray">
                            <input
                              type="checkbox"
                              name=""
                              className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange [&:checked~span]:text-color-dark "
                            />
                            <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                            <span className="tex">service provider</span>
                          </label>
                        </div>
                        <div className="flex w-auto items-center justify-between p-0 px-2 lg:w-full lg:px-0">
                          <label className="flex w-auto items-center justify-start text-sm font-normal leading-8 text-light-gray">
                            <input
                              type="checkbox"
                              name=""
                              className="absolute h-0 w-0 cursor-pointer opacity-0 [&:checked+span]:border-dark-orange [&:checked+span]:bg-dark-orange [&:checked~span]:text-color-dark "
                            />
                            <span className="relative mr-2.5 inline-block h-5 w-5 overflow-hidden rounded-sm border-2 border-solid border-gray-400 bg-transparent before:absolute before:-top-1 before:bottom-0 before:left-0 before:right-0 before:m-auto before:block before:h-3 before:w-1.5 before:rotate-45 before:border-b-2 before:border-r-2 before:border-solid before:border-white before:content-['']"></span>
                            <span className="tex">Other</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3.5 w-full">
                  <div className="flex flex-wrap">
                    <div className="mb-4 w-full">
                      <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                        <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                          Address
                        </label>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full md:w-6/12 md:pr-3.5">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Address"
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
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0">
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">USA</SelectItem>
                              <SelectItem value="m@google.com">UK</SelectItem>
                              <SelectItem value="m@support.com">
                                India
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="branchContactNumber"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full md:w-6/12 md:pr-3.5">
                          <FormLabel>Branch Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Branch Contact Number"
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
                      name="branchContactName"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full md:w-6/12 md:pl-3.5">
                          <FormLabel>Branch Contact Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Branch Contact Name"
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
              <div className="flex w-full flex-wrap">
                <div className="mb-4 w-full">
                  <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                    <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                      Working Hours
                    </label>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 gap-x-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem className="mb-4 flex w-full flex-col">
                        <FormLabel>Start Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "!h-[54px] rounded border-gray-300 pl-3 text-left font-normal focus-visible:!ring-0",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem className="mb-4 flex w-full flex-col">
                        <FormLabel>End Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "!h-[54px] rounded border-gray-300 pl-3 text-left font-normal focus-visible:!ring-0",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3.5 w-full border-b-2 border-dashed border-gray-300 pb-4">
                  <div className="flex flex-wrap">
                    {DAYS_OF_WEEK.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                          <FormItem className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value && field.value === item}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:!bg-dark-orange"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-light-gray">
                                {item}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <AccordionMultiSelect
                  label="Tag"
                  name="tags"
                  options={TAG_LIST}
                  placeholder="Tag"
                />
              </div>

              <Button
                disabled={createFreelancerProfile.isPending}
                type="submit"
                className="h-14 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
              >
                {createFreelancerProfile.isPending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
