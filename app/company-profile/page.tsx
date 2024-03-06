"use client";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import React from "react";
import { useCreateCompanyProfile } from "@/apis/queries/company.queries";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DAYS_OF_WEEK, TAG_LIST } from "@/utils/constants";
import AccordionMultiSelect from "@/components/shared/AccordionMultiSelect";

const formSchema = z.object({
  profileImage: z.string().trim(),
  firstName: z
    .string()
    .trim()
    .min(2, {
      message: "First Name must be at least 2 characters",
    })
    .max(50, {
      message: "First Name must be less than 50 characters",
    }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last Name must be at least 2 characters" })
    .max(50, {
      message: "Last Name must be less than 50 characters",
    }),
  email: z.string().trim().email({
    message: "Invalid Email Address",
  }),
  phoneNumber: z.string().trim().min(10, {
    message: "Phone Number must be at least 10 digits",
  }),
  gender: z.string().trim(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  branchList: z.array(z.object({})),
});

export default function CompanyProfilePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyLogo: "",
      profileType: "COMPANY",
      businessTypeList: undefined,
      annualPurchaceVolume: "",
      address: "",
      city: "",
      province: "",
      country: "",
      yearOfEstablishment: "",
      moreInfoCity: "",
      aboutUs: "",
      branchList: [
        {
          businessType: "",
          branchFrontPicture: "",
          proofOfAddress: "",
          address: "",
          city: "",
          province: "",
          country: "",
          startTime: new Date(),
          endTime: new Date(),
          workingDays: [],
        },
      ],
      // branchList: [
      //   {
      //     profileType: "COMPANY",
      //     branchFrontPicture: "abcd branchFrontPicture",
      //     proofOfAddress: "abcd proofOfAddress",
      //     address: "1/n aravali apartment",
      //     city: "tollygunge",
      //     province: "west bengal",
      //     country: "india",
      //     contactNumber: 8961039701,
      //     contactName: "Prem Nath Jha",
      //     startTime: new Date(),
      //     endTime: new Date(),
      //     workingDays: {
      //       sun: 0,
      //       mon: 1,
      //       tue: 1,
      //       wed: 1,
      //       thu: 1,
      //       fri: 1,
      //       sat: 0,
      //     },
      //     businessTypeList: [
      //       {
      //         businessTypeId: 2,
      //       },
      //     ],
      //     tagList: [
      //       {
      //         tagId: 2,
      //       },
      //     ],
      //     mainOffice: 1,
      //   },
      // ],
    },
  });

  const createCompanyProfile = useCreateCompanyProfile();

  const fieldArray = useFieldArray({
    control: form.control,
    name: "branchList",
  });

  const appendBranchList = () =>
    fieldArray.append({
      businessType: "",
      branchFrontPicture: "",
      proofOfAddress: "",
      address: "",
      city: "",
      province: "",
      country: "",
      startTime: new Date(),
      endTime: new Date(),
      workingDays: [],
    });

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
                              <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0">
                                <SelectValue placeholder="Select Business Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="type1">Type 1</SelectItem>
                              <SelectItem value="type2">Type 2</SelectItem>
                              <SelectItem value="type3">Type 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualPurchaceVolume"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel>Annual Purchasing Volume</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Annual Purchasing Volume"
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
                        <FormLabel>Business Type</FormLabel>
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
                            <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0">
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
                    name="moreInfoCity"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full md:w-6/12 md:pl-3.5">
                        <FormLabel>City</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0">
                              <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="west">West Texas</SelectItem>
                            <SelectItem value="east">East Texas</SelectItem>
                            <SelectItem value="south">South Texas</SelectItem>
                            <SelectItem value="north">North Texas</SelectItem>
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

            <div className="mb-3.5 w-full">
              <div className="mb-4 flex w-full items-center justify-between border-y border-solid border-gray-200 py-2.5">
                <label className="m-0 block text-left text-base font-medium leading-5 text-color-dark">
                  Branch
                </label>
                <div className="flex cursor-pointer items-center text-sm font-semibold capitalize leading-8 text-dark-orange">
                  <img src="images/add-icon.svg" className="mr-1" />
                  <span> Add new branch</span>
                </div>
              </div>
            </div>

            {fieldArray.fields.map((field, index) => (
              <div key={field.id}>
                <div className="mb-3.5 w-full">
                  <AccordionMultiSelect
                    label="Business Type"
                    name={`branchList.${index}.businessType`}
                    options={TAG_LIST}
                    placeholder="Business Type"
                  />

                  <FormField
                    control={form.control}
                    name={`branchList.${index}.branchFrontPicture`}
                    render={({ field }) => (
                      <FormItem className="mb-3.5 w-full">
                        <FormLabel>Upload Branch Front Picture</FormLabel>
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

                  <FormField
                    control={form.control}
                    name={`branchList.${index}.proofOfAddress`}
                    render={({ field }) => (
                      <FormItem className="mb-3.5 w-full">
                        <FormLabel>Proof Of Address</FormLabel>
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
                </div>

                <div className="flex w-full flex-wrap">
                  <div className="mb-4 w-full">
                    <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                      <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                        Branch Location
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <FormField
                      control={form.control}
                      name={`branchList.${index}.address`}
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
                      name={`branchList.${index}.city`}
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
                      name={`branchList.${index}.province`}
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
                      name={`branchList.${index}.country`}
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

                <div className="flex w-full flex-wrap">
                  <div className="mb-4 w-full">
                    <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                      <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                        Branch Working Hours
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-wrap">
                      <FormField
                        control={form.control}
                        name={`branchList.${index}.startTime`}
                        render={({ field }) => (
                          <FormItem className="mb-4 flex w-full flex-col md:w-6/12 md:pr-3.5">
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
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
                        name={`branchList.${index}.endTime`}
                        render={({ field }) => (
                          <FormItem className="mb-4 flex w-full flex-col md:w-6/12 md:pr-3.5">
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
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
                  </div>
                  <div className="mb-3.5 w-full border-b-2 border-dashed border-gray-300 pb-4">
                    <div className="flex flex-wrap">
                      {DAYS_OF_WEEK.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name={`branchList.${index}.workingDays`}
                          render={({ field }) => (
                            <FormItem className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
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
                    name={`branchList.${index}.tags`}
                    options={TAG_LIST}
                    placeholder="Tag"
                  />
                </div>
              </div>
            ))}

            <Button
              disabled={createCompanyProfile.isPending}
              type="submit"
              className="h-14 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
            >
              {createCompanyProfile.isPending ? (
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
    </section>
  );
}
