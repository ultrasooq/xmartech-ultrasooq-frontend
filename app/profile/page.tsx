"use client";
import { useMe, useUpdateProfile } from "@/apis/queries/user.queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  EMAIL_REGEX_LOWERCASE,
  PUREMOON_TOKEN_KEY,
  SOCIAL_MEDIA_ICON,
  SOCIAL_MEDIA_LIST,
} from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getCookie } from "cookies-next";
import { countryObjs } from "@/utils/helper";
import { useUploadFile } from "@/apis/queries/upload.queries";
import validator from "validator";

const formSchema = z.object({
  uploadImage: z.any().optional(),
  uploadIdentityImage: z.any().optional(),
  profilePicture: z.string().trim().optional(),
  identityProof: z.string().trim().optional(),
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First Name is required" })
    .max(50, { message: "First Name must be less than 50 characters" }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last Name is required" })
    .max(50, { message: "Last Name must be less than 50 characters" }),
  gender: z.string().trim().min(2, { message: "Gender is required" }),
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
  phoneNumberList: z.array(
    z.object({
      cc: z.string().trim().min(2, {
        message: "Country Code is required",
      }),
      phoneNumber: z
        .string()
        .trim()
        .min(2, {
          message: "Phone Number is required",
        })
        .min(8, {
          message: "Phone Number must be minimum of 8 digits",
        })
        .max(20, {
          message: "Phone Number cannot be more than 20 digits",
        }),
    }),
  ),
  socialLinkList: z.array(
    z.object({
      linkType: z.string().trim(),
      link: z.string().trim(),
    }),
  ),
  dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
});

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadImage: undefined,
      uploadIdentityImage: undefined,
      profilePicture: "",
      identityProof: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phoneNumberList: [
        {
          cc: "",
          phoneNumber: "",
        },
      ],
      dateOfBirth: undefined as unknown as Date,
      socialLinkList: [
        {
          linkType: "",
          link: "",
        },
      ],
    },
  });
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const [imageFile, setImageFile] = useState<FileList | null>();
  const [identityImageFile, setIdentityImageFile] = useState<FileList | null>();
  const me = useMe(!!accessToken);
  const upload = useUploadFile();
  const updateProfile = useUpdateProfile();

  const fieldArrayForPhoneNumber = useFieldArray({
    control: form.control,
    name: "phoneNumberList",
  });

  const fieldArrayForSocialMedia = useFieldArray({
    control: form.control,
    name: "socialLinkList",
  });

  const appendPhoneNumber = () =>
    fieldArrayForPhoneNumber.append({
      cc: "",
      phoneNumber: "",
    });

  const appendSocialLinks = () =>
    fieldArrayForSocialMedia.append({
      linkType: "",
      link: "",
    });

  const removePhoneNumber = (index: number) =>
    fieldArrayForPhoneNumber.remove(index);

  const removeSocialLinks = (index: number) =>
    fieldArrayForSocialMedia.remove(index);

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

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const data = {
      ...formData,
      phoneNumber: formData.phoneNumberList[0].phoneNumber,
      dateOfBirth: formData.dateOfBirth.toISOString(),
    };
    formData.uploadImage = imageFile;
    formData.uploadIdentityImage = identityImageFile;

    let getImageUrl;
    let getIdentityImageUrl;

    if (formData.uploadImage) {
      getImageUrl = await handleUploadedFile(formData.uploadImage);
    }
    if (formData.uploadIdentityImage) {
      getIdentityImageUrl = await handleUploadedFile(
        formData.uploadIdentityImage,
      );
    }
    //TODO: identity image upload
    delete data.uploadImage;
    delete data.uploadIdentityImage;
    if (getImageUrl) {
      data.profilePicture = getImageUrl;
    }
    if (getIdentityImageUrl) {
      data.identityProof = getIdentityImageUrl;
    }

    data.socialLinkList = data.socialLinkList.filter(
      (link) => link.link.trim() !== "" && link.linkType.trim() !== "",
    );

    if (
      data.socialLinkList.length &&
      data.socialLinkList.some((link) => !validator.isURL(link.link))
    ) {
      form.setError("socialLinkList", {
        type: "custom",
        message: "Invalid URL",
      });
      return;
    }
    console.log(data);
    // return;
    const response = await updateProfile.mutateAsync(data);
    if (response.status && response.data) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      form.reset();
      const tradeRole = response.data?.tradeRole;
      if (tradeRole === "BUYER") {
        router.push("/home");
      } else if (tradeRole === "COMPANY") {
        if (me.data?.data?.userBranch.length) {
          router.push("/company-profile-details");
        } else {
          router.push("/company-profile");
        }
      } else if (tradeRole === "FREELANCER") {
        if (me.data?.data?.userBranch.length) {
          router.push("/freelancer-profile-details");
        } else {
          router.push("/freelancer-profile");
        }
      }
    } else {
      toast({
        title: "Profile Update Failed",
        description: response.message,
      });
    }
  };

  const watchSocialMedia = form.watch("socialLinkList");

  useEffect(() => {
    if (me.data) {
      const {
        profilePicture,
        identityProof,
        firstName,
        lastName,
        gender,
        email,
        cc,
        phoneNumber,
        dateOfBirth,
        userPhone,
        userSocialLink,
      } = me.data?.data;

      const phoneNumberList = userPhone.length
        ? userPhone.map((item: any) => ({
            cc: item?.cc,
            phoneNumber: item?.phoneNumber,
          }))
        : [
            {
              cc: cc || "",
              phoneNumber: phoneNumber || "",
            },
          ];

      const socialLinkList = userSocialLink.length
        ? userSocialLink.map((item: any) => ({
            linkType: item?.linkType,
            link: item?.link,
          }))
        : [
            {
              linkType: "",
              link: "",
            },
          ];

      form.reset({
        profilePicture: profilePicture || "",
        identityProof: identityProof || "",
        firstName,
        lastName,
        gender,
        email,
        phoneNumberList: phoneNumberList,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        socialLinkList: socialLinkList,
      });
    }
  }, [me.data]);

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
          <div className="m-auto mb-12 w-11/12 rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-8 md:w-9/12 lg:w-7/12 lg:p-12">
            <div className="text-normal m-auto mb-7 w-full text-center text-sm leading-6 text-light-gray">
              <h2 className="mb-3 text-center text-3xl font-semibold leading-8 text-color-dark sm:text-4xl sm:leading-10">
                Profile
              </h2>
              <p>Update Profile</p>
            </div>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="flex flex-wrap"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="uploadImage"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormControl>
                          <div className="relative m-auto h-44 w-44 rounded-full border-2 border-dashed border-gray-300">
                            <div className="relative h-full w-full">
                              {imageFile || me.data?.data?.profilePicture ? (
                                <>
                                  <Image
                                    src={
                                      imageFile
                                        ? URL.createObjectURL(imageFile[0])
                                        : me.data?.data?.profilePicture
                                          ? me.data?.data?.profilePicture
                                          : "/images/company-logo.png"
                                    }
                                    alt="profile"
                                    fill
                                    className="rounded-full"
                                    priority
                                  />
                                  <div className="absolute bottom-3 right-4 rounded-full bg-white p-1 shadow-md">
                                    <Image
                                      src="/images/camera.png"
                                      width={29}
                                      height={29}
                                      alt="camera"
                                      className=""
                                    />
                                  </div>
                                </>
                              ) : (
                                <div className="absolute my-auto h-full w-full text-center text-sm font-medium leading-4 text-color-dark">
                                  <div className="flex h-full flex-col items-center justify-center">
                                    <Image
                                      src="/images/camera.png"
                                      className="mb-3"
                                      width={29}
                                      height={29}
                                      alt="camera"
                                    />
                                    <span>Upload Image</span>
                                  </div>
                                </div>
                              )}

                              <Input
                                type="file"
                                className="!bottom-0 h-44 !w-full opacity-0"
                                {...field}
                                onChange={(event) => {
                                  if (event.target.files?.[0]) {
                                    setImageFile(event.target.files);
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
                            className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
                            className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="mb-5 flex w-full flex-col items-start">
                        <FormLabel className="mb-3 mr-6 capitalize">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="!mt-0 flex items-center gap-4"
                            onValueChange={field.onChange}
                            defaultValue="MALE"
                            value={field.value}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="MALE" id="MALE" />
                              <Label htmlFor="MALE">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="FEMALE" id="FEMALE" />
                              <Label htmlFor="FEMALE">Female</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="mb-4 flex w-full flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "!h-12 rounded border-gray-300 pl-3 text-left font-normal focus-visible:!ring-0",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Enter Your Date of Birth</span>
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
                              toYear={new Date().getFullYear() - 18}
                              fromYear={new Date().getFullYear() - 100}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Email"
                            disabled
                            className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mb-1 w-full">
                    <div className="flex w-full items-center justify-between">
                      <label
                        className={
                          "block text-left text-sm font-medium capitalize leading-4 text-color-dark"
                        }
                      >
                        Phone Number
                      </label>

                      <Button
                        type="button"
                        onClick={appendPhoneNumber}
                        className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                      >
                        <Image
                          src="/images/add-icon.svg"
                          className="mr-1"
                          width={14}
                          height={14}
                          alt="add-icon"
                        />
                        <span>Add Phone Number</span>
                      </Button>
                    </div>
                  </div>

                  {fieldArrayForPhoneNumber.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative mb-4 flex w-full flex-row items-center gap-x-3.5"
                    >
                      <div className="flex w-full max-w-[125px] flex-col justify-between">
                        <Label
                          className={cn(
                            // form.formState.errors.cc?.message
                            //   ? "text-red-500"
                            //   : "",
                            "mb-3 mt-[6px]",
                          )}
                        >
                          Country Code
                        </Label>
                        <Controller
                          name={`phoneNumberList.${index}.cc`}
                          control={form.control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="!h-12 w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                            >
                              <option value="">Select</option>
                              {Object.keys(countryObjs).map((key) => (
                                <option
                                  key={key}
                                  value={
                                    countryObjs[key as keyof typeof countryObjs]
                                  }
                                >
                                  (
                                  {countryObjs[key as keyof typeof countryObjs]}
                                  )&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {key}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        <p className="text-[13px] font-medium text-red-500">
                          {form.formState.errors.phoneNumberList?.[index]?.cc
                            ? "Required"
                            : ""}
                        </p>
                      </div>

                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`phoneNumberList.${index}.phoneNumber`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Number</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                onWheel={(e) => e.currentTarget.blur()}
                                placeholder="Enter Your Phone Number"
                                className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {index !== 0 ? (
                        <Button
                          type="button"
                          onClick={() => removePhoneNumber(index)}
                          className="absolute right-4 flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
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
                  ))}

                  <div className="mb-1 w-full">
                    <div className="flex w-full items-center justify-between">
                      <label className="block text-left text-sm font-medium capitalize leading-4 text-color-dark">
                        Social Links
                      </label>

                      <Button
                        type="button"
                        onClick={appendSocialLinks}
                        className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                      >
                        <Image
                          src="/images/add-icon.svg"
                          className="mr-1"
                          width={14}
                          height={14}
                          alt="add-icon"
                        />
                        <span>Add Link</span>
                      </Button>
                    </div>
                  </div>

                  {fieldArrayForSocialMedia.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative mb-3.5 h-auto min-h-[65px] w-full rounded border border-solid border-gray-300 p-3.5"
                    >
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value="item-1"
                          className="mt-2 border-b-0"
                        >
                          <AccordionTrigger className="flex justify-between py-0 hover:!no-underline">
                            <div className="flex items-center text-sm font-normal leading-4 text-color-dark">
                              {watchSocialMedia[index]?.linkType !== "" ? (
                                <Image
                                  src={
                                    SOCIAL_MEDIA_ICON[
                                      watchSocialMedia[index]?.linkType
                                    ]
                                  }
                                  className="mr-1.5"
                                  width={20}
                                  height={20}
                                  alt="social-facebook-icon"
                                />
                              ) : (
                                <span className="capitalize">Select Type</span>
                              )}
                              <div className="wrap relative flex break-all">
                                <p
                                  className="min-w-auto flex max-w-[80%] items-center overflow-hidden pl-1 pr-1 text-left"
                                  title={watchSocialMedia[index]?.link}
                                >
                                  {watchSocialMedia[index]?.link}
                                </p>
                                {watchSocialMedia[index]?.link !== "" ? (
                                  <a
                                    href={watchSocialMedia[index]?.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className=" px-2 py-0"
                                  >
                                    <Image
                                      src="/images/share.png"
                                      height={20}
                                      width={20}
                                      alt="share-icon"
                                    />
                                  </a>
                                ) : null}
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-0">
                            <FormField
                              control={form.control}
                              name={`socialLinkList.${index}.linkType`}
                              render={({ field }) => (
                                <FormItem className="mt-3">
                                  <FormLabel>Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="!h-12 rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
                                        <SelectValue placeholder="Select Social Media" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {SOCIAL_MEDIA_LIST.map((item) => (
                                        <SelectItem
                                          key={item.type}
                                          value={item.type}
                                        >
                                          <div className="flex flex-row items-center py-2">
                                            <Image
                                              src={item.icon}
                                              className="mr-2"
                                              width={20}
                                              height={20}
                                              alt="social-icon"
                                            />

                                            <span className="capitalize">
                                              {item.type}
                                            </span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              key={field.id}
                              control={form.control}
                              name={`socialLinkList.${index}.link`}
                              render={({ field }) => (
                                <FormItem className="mb-4 mt-3 w-full">
                                  <FormLabel>Link</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter Your Link"
                                      className="!h-12 rounded border-gray-300 focus-visible:!ring-0"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <Button
                        type="button"
                        onClick={() => removeSocialLinks(index)}
                        className="absolute right-11 top-3.5 flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                      >
                        <Image
                          src="/images/social-delete-icon.svg"
                          height={35}
                          width={35}
                          alt="social-delete-icon"
                        />
                      </Button>
                    </div>
                  ))}

                  {me.data?.data?.tradeRole !== "BUYER" ? (
                    <FormField
                      control={form.control}
                      name="uploadIdentityImage"
                      render={({ field }) => (
                        <FormItem className="mb-3.5 w-full">
                          <FormLabel>Upload Identity Proof</FormLabel>
                          <FormControl>
                            <div className="relative m-auto h-48 w-full border-2 border-dashed border-gray-300">
                              <div className="relative h-full w-full">
                                {identityImageFile ||
                                me.data?.data?.identityProof ? (
                                  <Image
                                    src={
                                      identityImageFile
                                        ? URL.createObjectURL(
                                            identityImageFile[0],
                                          )
                                        : me.data?.data?.identityProof
                                          ? me.data?.data?.identityProof
                                          : "/images/company-logo.png"
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
                                        Drop your Identify proof here, or{" "}
                                      </span>
                                      <span className="text-blue-500">
                                        browse
                                      </span>
                                      <p className="text-normal mt-3 text-xs leading-4 text-gray-300">
                                        (.jpg or .png only. Up to 16mb)
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <Input
                                  type="file"
                                  className="!bottom-0 h-48 !w-full opacity-0"
                                  {...field}
                                  onChange={(event) => {
                                    if (event.target.files?.[0]) {
                                      setIdentityImageFile(event.target.files);
                                    }
                                  }}
                                  id="uploadIdentityImage"
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}

                  <p className="mb-3 text-[13px] text-red-500">
                    {form.formState.errors.socialLinkList?.message}
                  </p>

                  <Button
                    disabled={updateProfile.isPending || upload.isPending}
                    type="submit"
                    className="h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
                  >
                    {updateProfile.isPending || upload.isPending ? (
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
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
