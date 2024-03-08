"use client";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import React, { useMemo } from "react";
import { useCreateCompanyProfile } from "@/apis/queries/company.queries";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { DAYS_OF_WEEK } from "@/utils/constants";
import AccordionMultiSelect from "@/components/shared/AccordionMultiSelect";
import { useTags } from "@/apis/queries/tags.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import TimePicker from "react-time-picker";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Company Name is Required" })
    .max(50, { message: "Company Name must be less than 50 characters" }),
  annualPurchasingVolume: z
    .string()
    .trim()
    .min(2, { message: "Annual Purchasing Volume is Required" })
    .max(50, {
      message: "Annual Purchasing Volume must be less than 20 characters",
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
  yearOfEstablishment: z
    .string()
    .trim()
    .min(2, { message: "Year Of Establishment is Required" }),
  totalNoOfEmployee: z
    .string()
    .trim()
    .min(2, { message: "Total No Of Employee is Required" }),
  aboutUs: z.string().trim().min(2, { message: "About Us is Required" }),
  branchList: z.array(
    z.object({
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
        .min(2, { message: "Branch Contact Number is Required" })
        .min(10, {
          message:
            "Branch Contact must be longer than or equal to 10 characters",
        })
        .max(10, {
          message: "Branch Contact must be less than 10 characters",
        }),
      contactName: z
        .string()
        .trim()
        .min(2, { message: "Branch Contact Name is Required" }),
      startTime: z.string().trim().min(1, {
        message: "Start Time is Required",
      }),
      endTime: z.string().trim().min(1, {
        message: "End Time is Required",
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
    }),
  ),
});

export default function CompanyProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileType: "COMPANY", // dont remove value
      companyLogo: "",
      companyName: "",
      //TODO: change to number
      annualPurchasingVolume: "",
      businessTypeList: undefined,
      address: "",
      city: "",
      province: "",
      country: "",
      yearOfEstablishment: "",
      totalNoOfEmployee: "",
      aboutUs: "",
      branchList: [
        {
          profileType: "COMPANY",
          businessTypeList: undefined,
          branchFrontPicture: "",
          proofOfAddress: "",
          address: "",
          city: "",
          province: "",
          country: "",
          contactNumber: "",
          contactName: "",
          startTime: "",
          endTime: "",
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
          mainOffice: 0,
        },
      ],
    },
  });
  const tagsQuery = useTags();
  const createCompanyProfile = useCreateCompanyProfile();

  const fieldArray = useFieldArray({
    control: form.control,
    name: "branchList",
  });

  const appendBranchList = () =>
    fieldArray.append({
      profileType: "COMPANY",
      businessTypeList: undefined,
      branchFrontPicture: "",
      proofOfAddress: "",
      address: "",
      city: "",
      province: "",
      country: "",
      contactNumber: "",
      contactName: "",
      startTime: "",
      endTime: "",
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
      mainOffice: 0,
    });

  const removeBranchList = (index: number) => fieldArray.remove(index);

  const onSubmit = async (formData: any) => {
    let data = {
      ...formData,
      profileType: "COMPANY",
    };

    if (data.branchList) {
      const updatedBranchList = data.branchList.map(
        (item: any, index: number) => ({
          ...item,
          profileType: "COMPANY",
          mainOffice: index === 0 ? 1 : 0,
        }),
      );
      data.branchList = updatedBranchList;
    }

    const response = await createCompanyProfile.mutateAsync(data);

    if (response.status && response.data) {
      toast({
        title: "Profile Created Successful",
        description: response.message,
      });
      form.reset();
      router.push("/home");
    } else {
      toast({
        title: "Profile Create Failed",
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
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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

            <div className="mb-3.5 w-full">
              <div className="mb-4 flex w-full items-center justify-between border-y border-solid border-gray-200 py-2.5">
                <label className="m-0 block text-left text-base font-medium leading-5 text-color-dark">
                  Branch
                </label>
                <Button
                  type="button"
                  onClick={appendBranchList}
                  className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                >
                  <Image
                    src="/images/add-icon.svg"
                    className="mr-1"
                    width={14}
                    height={14}
                    alt="add-icon"
                  />
                  <span>Add new branch</span>
                </Button>
              </div>
            </div>

            {fieldArray.fields.map((field, index) => (
              <div key={field.id}>
                <div className="mb-3.5 w-full">
                  <AccordionMultiSelect
                    label="Business Type"
                    name={`branchList.${index}.businessTypeList`}
                    options={memoizedTags || []}
                    placeholder="Business Type"
                    error={
                      form.formState.errors?.branchList?.[index]
                        ?.businessTypeList?.message
                    }
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

                    <FormField
                      control={form.control}
                      name={`branchList.${index}.contactNumber`}
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
                      name={`branchList.${index}.contactName`}
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
                      <div className="mb-4 flex w-full flex-col gap-y-3 md:w-6/12 md:pr-3.5">
                        <Label htmlFor="startTime" className="text-color-dark">
                          Start Time
                        </Label>
                        <Controller
                          name={`branchList.${index}.startTime`}
                          control={form.control}
                          render={({ field }) => (
                            <TimePicker
                              onChange={field.onChange}
                              value={field.value}
                              disableClock={true}
                              className="!h-[54px] rounded border border-gray-300 focus-visible:!ring-0"
                            />
                          )}
                        />
                        <p className="text-[13px] text-red-500">
                          {
                            form.formState.errors.branchList?.[index]?.startTime
                              ?.message
                          }
                        </p>
                      </div>

                      <div className="mb-4 flex w-full flex-col gap-y-3 md:w-6/12 md:pl-3.5">
                        <Label htmlFor="endTime" className="text-color-dark">
                          End Time
                        </Label>
                        <Controller
                          name={`branchList.${index}.endTime`}
                          control={form.control}
                          render={({ field }) => (
                            <TimePicker
                              onChange={field.onChange}
                              value={field.value}
                              disableClock={true}
                              className="!h-[54px] rounded border border-gray-300 focus-visible:!ring-0"
                            />
                          )}
                        />
                        <p className="text-[13px] text-red-500">
                          {
                            form.formState.errors.branchList?.[index]?.endTime
                              ?.message
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3.5 w-full border-b-2 border-dashed border-gray-300 pb-4">
                    <div className="flex flex-wrap">
                      {DAYS_OF_WEEK.map((item) => (
                        <FormField
                          key={item.value}
                          control={form.control}
                          name={`branchList.${index}.workingDays`}
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
                    name={`branchList.${index}.tagList`}
                    options={memoizedTags || []}
                    placeholder="Tag"
                    error={
                      form.formState.errors.branchList?.[index]?.tagList
                        ?.message
                    }
                  />
                </div>
                <div className="mb-3.5 flex w-full justify-end border-b-2 border-dashed border-gray-300 pb-4">
                  {index === 0 ? (
                    <div className="flex w-full items-center space-x-2 ">
                      <Label htmlFor="airplane-mode">Main Office:</Label>
                      <Switch
                        aria-readonly
                        checked
                        className="data-[state=checked]:!bg-dark-orange"
                      />
                    </div>
                  ) : null}

                  {index !== 0 ? (
                    <Button
                      type="button"
                      onClick={() => removeBranchList(index)}
                      className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                    >
                      <Image
                        src="/images/social-delete-icon.svg"
                        height={35}
                        width={35}
                        alt="social-delete-icon"
                      />
                    </Button>
                  ) : null}
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
