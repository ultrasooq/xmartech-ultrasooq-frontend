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
  PUREMOON_TOKEN_KEY,
  SOCIAL_MEDIA_ICON,
  SOCIAL_MEDIA_LIST,
} from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getCookie } from "cookies-next";

const formSchema = z.object({
  profileImage: z.string().trim().optional(),
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
    .min(10, { message: "Email is required" })
    .email({
      message: "Invalid Email Address",
    })
    .toLowerCase(),
  phoneNumberList: z.array(
    z.object({
      phoneNumber: z
        .string()
        .trim()
        .min(2, {
          message: "Phone Number is required",
        })
        .min(10, {
          message: "Phone Number must be equal to 10 digits",
        })
        .max(10, {
          message: "Phone Number must be equal to 10 digits",
        }),
    }),
  ),
  socialLinkList: z.array(
    z.object({
      linkType: z.string().trim().min(2, { message: "Type is required" }),
      link: z
        .string()
        .trim()
        .min(2, { message: "Link is required" })
        .max(50, { message: "Link must be less than 50 characters" })
        .url({ message: "Invalid URL" }),
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
      profileImage: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phoneNumberList: [
        {
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
  const me = useMe(!!accessToken);
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

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const data = {
      ...formData,
      dateOfBirth: formData.dateOfBirth.toISOString(),
    };

    data.phoneNumberList = data.phoneNumberList.map((entry) =>
      JSON.stringify(entry),
    ) as any;
    data.socialLinkList = data.socialLinkList.map((entry) =>
      JSON.stringify(entry),
    ) as any;

    const response = await updateProfile.mutateAsync(data);
    if (response.status && response.data) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      form.reset();
      router.push("/home");
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
      const { firstName, lastName, gender, email, phoneNumber } = me.data?.data;

      form.reset({
        firstName,
        lastName,
        gender,
        email,
        phoneNumberList: [
          {
            phoneNumber: phoneNumber,
          },
        ],
        socialLinkList: [
          {
            linkType: "",
            link: "",
          },
        ],
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
                    name="profileImage"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormControl>
                          <div className="relative m-auto flex h-44 w-44 flex-wrap items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-center">
                            <div className="text-sm font-medium leading-4 text-color-dark">
                              <Image
                                src="/images/camera.png"
                                className="m-auto mb-3"
                                width={29}
                                height={29}
                                alt="camera"
                              />
                              <span> Upload Image</span>
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your First Name"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Last Name"
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
                                  "!h-[54px] rounded border-gray-300 pl-3 text-left font-normal focus-visible:!ring-0",
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
                            className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
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
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`phoneNumberList.${index}.phoneNumber`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter Your Phone Number"
                                className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                          <AccordionTrigger className="flex justify-between py-0">
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

                              <span className="capitalize">
                                {watchSocialMedia[index]?.linkType}
                              </span>
                            </div>
                            {/* TODO: remove this after discussing */}
                            {/* <div className="mr-3 flex flex-1 justify-end gap-x-3.5">
                              <Button
                                type="button"
                                onClick={() => {}}
                                className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                              >
                                <Image
                                  src="/images/social-edit-icon.svg"
                                  height={35}
                                  width={35}
                                  alt="social-edit-icon"
                                />
                              </Button>
                            </div> */}
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
                                      <SelectTrigger className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
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
                                      className="!h-[54px] rounded border-gray-300 focus-visible:!ring-0"
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

                  <p className="mb-3 text-[13px] text-red-500">
                    {form.formState.errors.socialLinkList?.length
                      ? "Social Link is required"
                      : null}
                  </p>

                  <Button
                    disabled={updateProfile.isPending}
                    type="submit"
                    className="h-14 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6 text-white hover:bg-dark-orange hover:opacity-90"
                  >
                    {updateProfile.isPending ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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
