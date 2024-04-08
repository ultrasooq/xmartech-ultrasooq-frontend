"use client";
import React, { useMemo, useState } from "react";
import AccordionMultiSelectV2 from "@/components/shared/AccordionMultiSelectV2";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DAYS_OF_WEEK, HOURS_24_FORMAT } from "@/utils/constants";
import { getAmPm } from "@/utils/helper";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTags } from "@/apis/queries/tags.queries";
import { useUploadFile } from "@/apis/queries/upload.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCreateCompanyBranch } from "@/apis/queries/company.queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMe } from "@/apis/queries/user.queries";
import ControlledPhoneInput from "@/components/shared/Forms/ControlledPhoneInput";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import { ICountries, ISelectOptions } from "@/utils/types/common.types";
import { useCountries } from "@/apis/queries/masters.queries";

const formSchema = z.object({
  uploadBranchImage: z.any().optional(),
  uploadProofOfAddress: z.any().optional(),
  branchFrontPicture: z.string().trim().optional(),
  proofOfAddress: z.string().trim().optional(),
  businessTypeList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "Business Type is required",
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
    .min(2, { message: "Address is required" })
    .max(50, {
      message: "Address must be less than 50 characters",
    }),
  city: z.string().trim().min(2, { message: "City is required" }),
  province: z.string().trim().min(2, { message: "Province is required" }),
  country: z.string().trim().min(2, { message: "Country is required" }),
  cc: z.string().trim(),
  contactNumber: z
    .string()
    .trim()
    .min(2, { message: "Branch Contact Number is required" })
    .min(8, {
      message: "Branch Contact Number must be minimum of 8 digits",
    })
    .max(20, {
      message: "Branch Contact Number cannot be more than 20 digits",
    }),
  contactName: z
    .string()
    .trim()
    .min(2, { message: "Branch Contact Name is required" }),
  startTime: z.string().trim().min(1, {
    message: "Start Time is required",
  }),
  endTime: z.string().trim().min(1, {
    message: "End Time is required",
  }),
  workingDays: z
    .object({
      sun: z.number(),
      mon: z.number(),
      tue: z.number(),
      wed: z.number(),
      thu: z.number(),
      fri: z.number(),
      sat: z.number(),
    })
    .refine((value) => {
      return (
        value.sun !== 0 ||
        value.mon !== 0 ||
        value.tue !== 0 ||
        value.wed !== 0 ||
        value.thu !== 0 ||
        value.fri !== 0 ||
        value.sat !== 0
      );
    }),
  tagList: z
    .array(
      z.object({
        label: z.string().trim(),
        value: z.number(),
      }),
    )
    .min(1, {
      message: "Tag is required",
    })
    .transform((value) => {
      let temp: any = [];
      value.forEach((item) => {
        temp.push({ tagId: item.value });
      });
      return temp;
    }),
  mainOffice: z
    .boolean()
    .transform((value) => (value ? 1 : 0))
    .optional(),
});

const AddBranchPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadBranchImage: undefined,
      uploadProofOfAddress: undefined,
      profileType: "COMPANY",
      businessTypeList: undefined,
      branchFrontPicture: "",
      proofOfAddress: "",
      address: "",
      city: "",
      province: "",
      country: "",
      cc: "",
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
      mainOffice: false,
    },
  });
  const [branchImageFile, setBranchImageFile] = useState<FileList | null>();
  const [proofOfAddressImageFile, setProofOfAddressImageFile] =
    useState<FileList | null>();

  const userDetails = useMe();
  const countriesQuery = useCountries();
  const tagsQuery = useTags();
  const upload = useUploadFile();
  const createCompanyBranch = useCreateCompanyBranch();

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id };
      }) || []
    );
  }, [countriesQuery?.data?.data?.length]);

  const memoizedTags = useMemo(() => {
    return (
      tagsQuery?.data?.data.map((item: { id: string; tagName: string }) => {
        return { label: item.tagName, value: item.id };
      }) || []
    );
  }, [tagsQuery?.data]);

  const handleUploadedFile = async (files: FileList | null) => {
    if (files) {
      const formData = new FormData();
      formData.append("content", files[0]);
      const response = await upload.mutateAsync(formData);
      if (response.status && response.data) {
        return response.data;
      }
    }
  };

  const onSubmit = async (formData: any) => {
    let data = {
      ...formData,
      profileType: "COMPANY",
      userProfileId: userDetails.data?.data?.userProfile?.[0]?.id as number,
    };

    formData.uploadBranchImage = branchImageFile;
    formData.uploadProofOfAddress = proofOfAddressImageFile;

    let getBranchImageUrl;
    let getProofOfAddressImageUrl;
    if (formData.uploadBranchImage) {
      getBranchImageUrl = await handleUploadedFile(formData.uploadBranchImage);
    }

    if (formData.uploadProofOfAddress) {
      getProofOfAddressImageUrl = await handleUploadedFile(
        formData.uploadProofOfAddress,
      );
    }

    delete data.uploadBranchImage;
    delete data.uploadProofOfAddress;
    if (getBranchImageUrl) {
      data.branchFrontPicture = getBranchImageUrl;
    }
    if (getProofOfAddressImageUrl) {
      data.proofOfAddress = getProofOfAddressImageUrl;
    }

    console.log(data);
    // return;
    const response = await createCompanyBranch.mutateAsync(data);

    if (response.status && response.data) {
      toast({
        title: "Branch Add Successful",
        description: response.message,
      });
      form.reset();
      router.push("/company-profile-details");
    } else {
      toast({
        title: "Branch Add Failed",
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-10/12 lg:w-10/12 lg:p-12"
            >
              <div className="text-normal m-auto mb-7 w-full text-center text-sm leading-6 text-light-gray">
                <h2 className="mb-3 text-center text-3xl font-semibold leading-8 text-color-dark sm:text-4xl sm:leading-10">
                  Profile
                </h2>
              </div>

              <div className="mb-4 w-full">
                <div className="mt-2.5 w-full border-b-2 border-dashed border-gray-300">
                  <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                    Branch Information
                  </label>
                </div>
              </div>

              <div>
                <div className="mb-3.5 w-full">
                  <AccordionMultiSelectV2
                    label="Business Type"
                    name="businessTypeList"
                    options={memoizedTags || []}
                    placeholder="Business Type"
                    error={form.formState.errors?.businessTypeList?.message}
                  />

                  <FormField
                    control={form.control}
                    name="uploadBranchImage"
                    render={({ field }) => (
                      <FormItem className="mb-3.5 w-full">
                        <FormLabel>Upload Branch Front Picture</FormLabel>
                        <FormControl>
                          <div className="relative m-auto h-64 w-full border-2 border-dashed border-gray-300">
                            <div className="relative h-full w-full">
                              {branchImageFile ? (
                                <Image
                                  src={
                                    branchImageFile
                                      ? URL.createObjectURL(branchImageFile[0])
                                      : "/images/no-image.jpg"
                                  }
                                  alt="profile"
                                  fill
                                  priority
                                />
                              ) : (
                                <div className="absolute my-auto h-full w-full text-center text-sm font-medium leading-4 text-color-dark">
                                  <div className="flex h-full flex-col items-center justify-center">
                                    <Image
                                      src="/images/upload.png"
                                      className="mb-3"
                                      width={30}
                                      height={30}
                                      alt="camera"
                                    />
                                    <span>
                                      Drop your Branch Front Picture here, or{" "}
                                    </span>
                                    <span className="text-blue-500">
                                      browse
                                    </span>
                                    <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                                      (.jpg or .png only. Up to 1mb)
                                    </p>
                                  </div>
                                </div>
                              )}

                              <Input
                                type="file"
                                accept="image/*"
                                multiple={false}
                                className="!bottom-0 h-64 !w-full opacity-0"
                                {...field}
                                onChange={(event) => {
                                  if (event.target.files?.[0]) {
                                    if (event.target.files[0].size > 1048576) {
                                      toast({
                                        title:
                                          "Image size should be less than 1MB",
                                      });
                                      return;
                                    }
                                    setBranchImageFile(event.target.files);
                                  }
                                }}
                                id="uploadImage"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="uploadProofOfAddress"
                    render={({ field }) => (
                      <FormItem className="mb-3.5 w-full">
                        <FormLabel>Proof Of Address</FormLabel>
                        <FormControl>
                          <div className="relative m-auto h-64 w-full border-2 border-dashed border-gray-300">
                            <div className="relative h-full w-full">
                              {proofOfAddressImageFile ? (
                                <Image
                                  src={
                                    proofOfAddressImageFile
                                      ? URL.createObjectURL(
                                          proofOfAddressImageFile[0],
                                        )
                                      : "/images/no-image.jpg"
                                  }
                                  alt="profile"
                                  fill
                                  priority
                                />
                              ) : (
                                <div className="absolute my-auto h-full w-full text-center text-sm font-medium leading-4 text-color-dark">
                                  <div className="flex h-full flex-col items-center justify-center">
                                    <Image
                                      src="/images/upload.png"
                                      className="mb-3"
                                      width={30}
                                      height={30}
                                      alt="camera"
                                    />
                                    <span>
                                      Drop your Proof of Address here, or{" "}
                                    </span>
                                    <span className="text-blue-500">
                                      browse
                                    </span>
                                    <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                                      (.jpg or .png only. Up to 1mb)
                                    </p>
                                  </div>
                                </div>
                              )}

                              <Input
                                type="file"
                                accept="image/*"
                                multiple={false}
                                className="!bottom-0 h-64 !w-full opacity-0"
                                {...field}
                                onChange={(event) => {
                                  if (event.target.files?.[0]) {
                                    if (event.target.files[0].size > 1048576) {
                                      toast({
                                        title:
                                          "Image size should be less than 1MB",
                                      });
                                      return;
                                    }
                                    setProofOfAddressImageFile(
                                      event.target.files,
                                    );
                                  }
                                }}
                                id="uploadImage"
                              />
                            </div>
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
                                className="!h-12 rounded border-gray-300 pr-10 focus-visible:!ring-0"
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
                        height={16}
                        width={16}
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
                              className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                      <ControlledTextInput
                        label="Province"
                        name="province"
                        placeholder="Province"
                      />
                      <div className="mb-4 flex w-full flex-col justify-between">
                        <Label>Country</Label>

                        <Controller
                          name="country"
                          control={form.control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                            >
                              <option value="">Select Country</option>
                              {memoizedCountries.map((item: ISelectOptions) => (
                                <option value={item.label} key={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        <p className="text-[13px] font-medium text-red-500">
                          {form.formState.errors.country?.message}
                        </p>
                      </div>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                      <ControlledPhoneInput
                        label="Branch Contact Number"
                        name="contactNumber"
                        countryName="cc"
                        placeholder="Branch Contact Number"
                      />

                      <ControlledTextInput
                        label="Branch Contact Name"
                        name="contactName"
                        placeholder="Branch Contact Name"
                      />
                    </div>
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
                          name="startTime"
                          control={form.control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="!h-12 w-full rounded border !border-gray-300 px-3 text-base focus-visible:!ring-0"
                            >
                              <option value="">Select</option>
                              {HOURS_24_FORMAT.map(
                                (hour: string, index: number) => (
                                  <option key={index} value={hour}>
                                    {getAmPm(hour)}
                                  </option>
                                ),
                              )}
                            </select>
                          )}
                        />
                        <p className="text-[13px] text-red-500">
                          {form.formState.errors.startTime?.message}
                        </p>
                      </div>

                      <div className="mb-4 flex w-full flex-col gap-y-3 md:w-6/12 md:pl-3.5">
                        <Label htmlFor="endTime" className="text-color-dark">
                          End Time
                        </Label>
                        <Controller
                          name="endTime"
                          control={form.control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="!h-12 w-full rounded border !border-gray-300 px-3 text-base focus-visible:!ring-0"
                            >
                              <option value="">Select</option>
                              {HOURS_24_FORMAT.map(
                                (hour: string, index: number) => (
                                  <option key={index} value={hour}>
                                    {getAmPm(hour)}
                                  </option>
                                ),
                              )}
                            </select>
                          )}
                        />
                        <p className="text-[13px] text-red-500">
                          {form.formState.errors.endTime?.message}
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
                                  checked={
                                    !!field.value[
                                      item.value as keyof typeof field.value
                                    ]
                                  }
                                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
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
                    {form.formState.errors.workingDays?.message ? (
                      <p className="text-[13px] text-red-500">
                        Working Day is required
                      </p>
                    ) : null}
                  </div>

                  <AccordionMultiSelectV2
                    label="Tag"
                    name="tagList"
                    options={memoizedTags || []}
                    placeholder="Tag"
                    error={form.formState.errors.tagList?.message}
                  />
                </div>

                <div className="mb-3.5 flex w-full border-b-2 border-dashed border-gray-300 pb-4">
                  <FormField
                    control={form.control}
                    name="mainOffice"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between gap-x-2 rounded-lg">
                        <FormLabel>Main Office:</FormLabel>
                        <FormControl>
                          <Switch
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="!mt-0 data-[state=checked]:!bg-dark-orange"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                disabled={createCompanyBranch.isPending || upload.isPending}
                type="submit"
                className="h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
              >
                {createCompanyBranch.isPending || upload.isPending ? (
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
                  "Add Branch"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddBranchPage;
