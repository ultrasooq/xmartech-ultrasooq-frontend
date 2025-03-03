"use client";
import { useMe, useUpdateProfile } from "@/apis/queries/user.queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  EMAIL_REGEX_LOWERCASE,
  GENDER_LIST,
  PUREMOON_TOKEN_KEY,
  SOCIAL_MEDIA_ICON,
  SOCIAL_MEDIA_LIST,
} from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getCookie } from "cookies-next";
import { useUploadFile } from "@/apis/queries/upload.queries";
import validator from "validator";
import ControlledTextInput from "@/components/shared/Forms/ControlledTextInput";
import ControlledDatePicker from "@/components/shared/Forms/ControlledDatePicker";
import ControlledSelectInput from "@/components/shared/Forms/ControlledSelectInput";
import ControlledPhoneInput from "@/components/shared/Forms/ControlledPhoneInput";
import AddImageContent from "@/components/modules/profile/AddImageContent";
import ClostIcon from "@/public/images/close-white.svg";
import BackgroundImage from "@/public/images/before-login-bg.png";

const formSchema = z.object({
  uploadImage: z.any().optional(),
  uploadIdentityFrontImage: z.any().optional(),
  uploadIdentityBackImage: z.any().optional(),
  profilePicture: z.string().trim().optional(),
  identityProof: z.string().trim().optional(),
  identityProofBack: z.string().trim().optional(),
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
  userName: z.string().trim().min(5, { message: "Username is required" }),
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
      cc: z.string().trim(),
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
  const frontIdentityRef = useRef<HTMLInputElement>(null);
  const backIdentityRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadImage: undefined,
      uploadIdentityFrontImage: undefined,
      uploadIdentityBackImage: undefined,
      profilePicture: "",
      identityProof: "",
      identityProofBack: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      userName: "",
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
  const [identityFrontImageFile, setIdentityFrontImageFile] =
    useState<FileList | null>();
  const [identityBackImageFile, setIdentityBackImageFile] =
    useState<FileList | null>();
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
    const data = { ...formData, phoneNumber: formData.phoneNumberList[0].phoneNumber, dateOfBirth: formData.dateOfBirth.toISOString(), };

    formData.uploadImage = imageFile;
    formData.uploadIdentityFrontImage = identityFrontImageFile;
    formData.uploadIdentityBackImage = identityBackImageFile;

    let getImageUrl;
    let getIdentityImageUrl;
    let getIdentityBackImageUrl;

    if (formData.uploadImage) {
      getImageUrl = await handleUploadedFile(formData.uploadImage);
    }
    if (formData.uploadIdentityFrontImage && typeof formData.uploadIdentityFrontImage === "object") {
      getIdentityImageUrl = await handleUploadedFile(formData.uploadIdentityFrontImage,);
    }
    if (formData.uploadIdentityBackImage && typeof formData.uploadIdentityBackImage === "object") {
      getIdentityBackImageUrl = await handleUploadedFile(formData.uploadIdentityBackImage,);
    }

    //TODO: identity image upload
    delete data.uploadImage;
    delete data.uploadIdentityFrontImage;
    delete data.uploadIdentityBackImage;
    if (getImageUrl) {
      data.profilePicture = getImageUrl;
    }
    if (getIdentityImageUrl) {
      data.identityProof = getIdentityImageUrl;
    }
    if (getIdentityBackImageUrl) {
      data.identityProofBack = getIdentityBackImageUrl;
    }

    data.socialLinkList = data.socialLinkList.filter((link) => link.link.trim() !== "" && link.linkType.trim() !== "",);

    if (data.socialLinkList.length && data.socialLinkList.some((link) => !validator.isURL(link.link))) {
      form.setError("socialLinkList", { type: "custom", message: "Invalid URL", });
      return;
    }
    // console.log(data);
    // return;
    const response = await updateProfile.mutateAsync(data);
    if (response.status && response.data) {
      toast({ title: "Profile Updated", description: "Your profile has been updated successfully", variant: "success", });
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
      } else if (tradeRole == "MEMBER") {
        router.push("/member-profile-details");
      }
    } else {
      toast({ title: "Profile Update Failed", description: response.message, variant: "danger", });
    }
  };

  const watchSocialMedia = form.watch("socialLinkList");

  useEffect(() => {
    if (me.data) {
      const { profilePicture, identityProof, identityProofBack, firstName, lastName, gender, email, cc, phoneNumber, dateOfBirth, userPhone, userSocialLink, userName } = me.data?.data;

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
        identityProofBack: identityProofBack || "",
        firstName,
        lastName,
        gender,
        email,
        userName,
        phoneNumberList: phoneNumberList,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        socialLinkList: socialLinkList,
      });
      setIdentityFrontImageFile(identityProof || "");
      setIdentityBackImageFile(identityProofBack || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.data]);

  return (
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          src={BackgroundImage}
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
                <form className="flex flex-wrap" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField control={form.control} name="uploadImage" render={({ field }) => (
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
                                  className="rounded-full object-contain"
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
                              accept="image/*"
                              multiple={false}
                              className="!bottom-0 h-44 !w-full opacity-0"
                              {...field}
                              onChange={(event) => {
                                if (event.target.files?.[0]) {
                                  if (
                                    event.target.files[0].size > 524288000
                                  ) {
                                    toast({
                                      title:
                                        "Image size should be less than 500MB",
                                      variant: "danger",
                                    });
                                    return;
                                  }
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

                  <ControlledTextInput
                    label="First Name"
                    name="firstName"
                    placeholder="Enter Your First Name"
                  />

                  <ControlledTextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Your Last Name"
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
                            {GENDER_LIST.map((type) => (
                              <FormItem
                                key={type.value}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value={type.value}
                                      id={type.value}
                                    />
                                    <FormLabel htmlFor={type.value}>
                                      {type.label}
                                    </FormLabel>
                                  </div>
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ControlledDatePicker
                    label="Date of Birth"
                    name="dateOfBirth"
                  />

                  <ControlledTextInput label="User Name" name="userName" placeholder="Enter Your User Name" />
                  <ControlledTextInput label="Email" name="email" placeholder="Enter Your Email" disabled />
                  <ControlledTextInput label="New Password" name="newPassword" placeholder="**********" type="password" />

                  <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <label
                        className={cn(
                          "block text-left text-sm font-medium capitalize leading-4 text-color-dark",
                          form.formState.errors.phoneNumberList
                            ? "!text-red-500"
                            : "",
                        )}
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
                    <div key={field.id} className="relative w-full">
                      <ControlledPhoneInput name={`phoneNumberList.${index}.phoneNumber`} countryName={`phoneNumberList.${index}.cc`} placeholder="Enter Your Phone Number" />

                      {index !== 0 ? (
                        <Button
                          type="button"
                          onClick={() => removePhoneNumber(index)}
                          className="absolute right-2 top-9 flex -translate-y-2/4 cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                        >
                          <Image
                            src="/images/social-delete-icon.svg"
                            height={32}
                            width={32}
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
                            <div className="mb-2 flex items-center text-sm font-normal leading-4 text-color-dark">
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
                                  className="min-w-auto flex max-w-[240px] items-center overflow-hidden truncate pl-1 pr-1 text-left"
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
                            <ControlledSelectInput
                              label="Type"
                              name={`socialLinkList.${index}.linkType`}
                              options={SOCIAL_MEDIA_LIST}
                            />

                            <ControlledTextInput
                              label="Link"
                              name={`socialLinkList.${index}.link`}
                              placeholder="Enter Your Link"
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
                      name="uploadIdentityFrontImage"
                      render={({ field }) => (
                        <FormItem className="mb-3.5 w-full">
                          <FormLabel className="block">
                            Upload Identity Proof
                          </FormLabel>
                          <div className="upload-identity-proof-both-side">
                            <div className="upload-identity-proof-both-side-col">
                              <FormLabel className="block">Front</FormLabel>
                              <FormControl>
                                <div className="upload-identity-proof-box relative w-full border-2 border-dashed border-gray-300">
                                  <div className="relative h-full w-full">
                                    {identityFrontImageFile ? (
                                      <button
                                        type="button"
                                        className="common-close-btn-uploader-s1"
                                        onClick={() => {
                                          setIdentityFrontImageFile(null);
                                          form.setValue(
                                            "uploadIdentityFrontImage",
                                            undefined,
                                          );
                                          form.setValue("identityProof", "");
                                          if (frontIdentityRef.current)
                                            frontIdentityRef.current.value = "";
                                          // TODO: remove from S3
                                        }}
                                      >
                                        <Image
                                          src={ClostIcon}
                                          alt="close-icon"
                                        />
                                      </button>
                                    ) : null}
                                    {identityFrontImageFile ? (
                                      <Image
                                        src={
                                          identityFrontImageFile &&
                                            typeof identityFrontImageFile ===
                                            "object"
                                            ? URL.createObjectURL(
                                              identityFrontImageFile[0],
                                            )
                                            : me.data?.data?.identityProof
                                              ? me.data?.data?.identityProof
                                              : "/images/company-logo.png"
                                        }
                                        alt="profile"
                                        fill
                                        priority
                                        className="object-contain"
                                      />
                                    ) : (
                                      <AddImageContent description="Drop your Identify proof here, or " />
                                    )}

                                    <Input
                                      type="file"
                                      accept="image/*"
                                      multiple={false}
                                      className="!bottom-0 h-48 !w-full opacity-0"
                                      {...field}
                                      onChange={(event) => {
                                        if (event.target.files?.[0]) {
                                          if (
                                            event.target.files[0].size >
                                            524288000
                                          ) {
                                            toast({
                                              title:
                                                "Image size should be less than 500MB",
                                              variant: "danger",
                                            });
                                            return;
                                          }

                                          setIdentityFrontImageFile(
                                            event.target.files,
                                          );
                                        }
                                      }}
                                      id="uploadIdentityImage"
                                      ref={frontIdentityRef}
                                    />
                                  </div>
                                </div>
                              </FormControl>
                            </div>
                            <div className="upload-identity-proof-both-side-col">
                              <FormLabel className="block">Back</FormLabel>
                              <FormControl>
                                <div className="upload-identity-proof-box relative w-full border-2 border-dashed border-gray-300">
                                  <div className="relative h-full w-full">
                                    {identityBackImageFile ? (
                                      <button
                                        type="button"
                                        className="common-close-btn-uploader-s1"
                                        onClick={() => {
                                          setIdentityBackImageFile(null);
                                          form.setValue(
                                            "uploadIdentityBackImage",
                                            undefined,
                                          );
                                          form.setValue(
                                            "identityProofBack",
                                            "",
                                          );
                                          if (backIdentityRef.current)
                                            backIdentityRef.current.value = "";
                                          // TODO: remove from S3
                                        }}
                                      >
                                        <Image
                                          src={ClostIcon}
                                          alt="close-icon"
                                        />
                                      </button>
                                    ) : null}
                                    {identityBackImageFile ? (
                                      <Image
                                        src={
                                          identityBackImageFile &&
                                            typeof identityBackImageFile ===
                                            "object"
                                            ? URL.createObjectURL(
                                              identityBackImageFile[0],
                                            )
                                            : me.data?.data?.identityProofBack
                                              ? me.data?.data?.identityProofBack
                                              : "/images/company-logo.png"
                                        }
                                        alt="profile"
                                        fill
                                        priority
                                        className="object-contain"
                                      />
                                    ) : (
                                      <AddImageContent description="Drop your Identify proof here, or " />
                                    )}

                                    <Input
                                      type="file"
                                      accept="image/*"
                                      multiple={false}
                                      className="!bottom-0 h-48 !w-full opacity-0"
                                      {...field}
                                      onChange={(event) => {
                                        if (event.target.files?.[0]) {
                                          if (
                                            event.target.files[0].size >
                                            524288000
                                          ) {
                                            toast({
                                              title:
                                                "Image size should be less than 500MB",
                                              variant: "danger",
                                            });
                                            return;
                                          }

                                          setIdentityBackImageFile(
                                            event.target.files,
                                          );
                                        }
                                      }}
                                      id="uploadIdentityBackImage"
                                      ref={backIdentityRef}
                                    />
                                  </div>
                                </div>
                              </FormControl>
                            </div>
                          </div>
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
                    className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold  leading-6"
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
