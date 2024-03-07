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
import { DAYS_OF_WEEK } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import TimePicker from "react-time-picker";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useTags } from "@/apis/queries/tags.queries";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  aboutUs: z.string().trim().min(2, { message: "About Us is Required" }),
  businessTypeList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "Business Type is Required",
    })
    .transform((value) => {
      let temp: any = [];
      value.forEach((item) => {
        temp.push({ businessTypeId: item.value });
      });
      return temp;
    }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address is Required" })
    .max(50, {
      message: "Address must be less than 50 characters",
    }),
  city: z.string().trim().min(2, { message: "City is Required" }),
  province: z.string().trim().min(2, { message: "Province is Required" }),
  country: z.string().trim().min(2, { message: "Country is Required" }),
  contactNumber: z
    .string()
    .trim()
    .min(2, { message: "Branch Contact Number is Required" }),
  contactName: z
    .string()
    .trim()
    .min(2, { message: "Branch Contact Name is Required" }),
  startTime: z.date().transform((value) => {
    const date = new Date(value);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }),
  endTime: z.date().transform((value) => {
    const date = new Date(value);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }),
  workingDays: z.object({
    sun: z.number(),
    mon: z.number(),
    tue: z.number(),
    wed: z.number(),
    thu: z.number(),
    fri: z.number(),
    sat: z.number(),
  }),
  tagList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "Tag is Required",
    })
    .transform((value) => {
      let temp: any = [];
      value.forEach((item) => {
        temp.push({ tagId: item.value });
      });
      return temp;
    }),
});

export default function FreelancerProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutUs: "Hello",
      businessTypeList: undefined,
      address: "50F south sinthee",
      city: "Kolkata",
      province: "WB",
      country: "",
      contactNumber: "9879879870",
      contactName: "Branches",
      startTime: new Date(),
      endTime: new Date(),
      workingDays: {
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
      },
      tagList: undefined,
    },
  });

  const tagsQuery = useTags();
  const createFreelancerProfile = useCreateFreelancerProfile();

  const onSubmit = async (formData: any) => {
    const data = {
      aboutUs: formData.aboutUs,
      profileType: "FREELANCER",
      branchList: [
        {
          ...formData,
          profileType: "FREELANCER",
          mainOffice: 1,
        },
      ],
    };

    delete data.branchList[0].aboutUs;

    const response = await createFreelancerProfile.mutateAsync(data);

    if (response.status && response.data) {
      console.log(response);
      toast({
        title: "Profile Created Successful",
        description: response.message,
      });
      form.reset();
      router.push("/home");
    } else {
      toast({
        title: "Profile Created Failed",
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
                      name="businessTypeList"
                      options={memoizedTags || []}
                      placeholder="Business Type"
                      error={form.formState.errors.businessTypeList?.message}
                    />
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
                              <SelectItem value="USA">USA</SelectItem>
                              <SelectItem value="UK">UK</SelectItem>
                              <SelectItem value="India">India</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNumber"
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
                      name="contactName"
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
                  <div className="mb-4 w-full">
                    <Label htmlFor="startTime" className="text-color-dark">
                      Start Time
                    </Label>
                    <Controller
                      name="startTime"
                      control={form.control}
                      defaultValue={new Date()}
                      render={({ field }) => (
                        <TimePicker
                          onChange={field.onChange}
                          value={field.value}
                          disableClock={true}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <Label htmlFor="endTime" className="text-color-dark">
                      End Time
                    </Label>
                    <Controller
                      name="endTime"
                      control={form.control}
                      defaultValue={new Date()}
                      render={({ field }) => (
                        <TimePicker
                          onChange={field.onChange}
                          value={field.value}
                          disableClock={true}
                        />
                      )}
                    />
                  </div>
                  {/* <FormField
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
                  /> */}

                  {/* <FormField
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
                  /> */}
                </div>
                <div className="mb-3.5 w-full border-b-2 border-dashed border-gray-300 pb-4">
                  <div className="flex flex-wrap">
                    {DAYS_OF_WEEK.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="workingDays"
                        render={({ field }) => (
                          <FormItem className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                onCheckedChange={(e) => {
                                  field.onChange({
                                    ...field.value,
                                    [item.value]: e ? 1 : 0,
                                  });
                                }}
                                className="data-[state=checked]:!bg-dark-orange"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-light-gray">
                                {item.label}
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
                  name="tagList"
                  options={memoizedTags || []}
                  placeholder="Tag"
                  error={form.formState.errors.tagList?.message}
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
