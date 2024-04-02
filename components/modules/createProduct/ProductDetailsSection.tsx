import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CustomFieldContent from "@/components/shared/CustomFieldContent";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

type ProductDetailsSectionProps = {};

type Field = {
  key: string;
  type: string;
  field: JSX.Element;
};

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = () => {
  const formContext = useFormContext();
  const [isCustomFieldModalOpen, setIsCustomFieldModalOpen] = useState(false);
  const [customfields, setCustomFields] = useState<Field[]>([]);
  const [customFieldType, setCustomFieldType] = useState<string>();

  const handleToggleCustomFieldModal = () => {
    setIsCustomFieldModalOpen(!isCustomFieldModalOpen);
  };

  const deleteCustomField = (key: string) => {
    setCustomFields(customfields.filter((item) => item.key !== key));
    setCustomFieldType(undefined);
  };

  const handleCustomFields = (type: string) => {
    const tempArr: Field[] = [];

    switch (type) {
      case "text":
        tempArr.push({
          key: uuidv4(),
          type: "text",
          field: (
            <FormField
              key={uuidv4()}
              control={formContext.control}
              name="brandName"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Input Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Input Name"
                      className="!h-[48px] rounded border-gray-300 pr-10 focus-visible:!ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
        });
        break;
      case "textarea":
        tempArr.push({
          key: uuidv4(),
          type: "textarea",
          field: (
            <FormField
              key={uuidv4()}
              control={formContext.control}
              name="aboutUs"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Input Name</FormLabel>
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
          ),
        });
        break;
      case "dropdown":
        tempArr.push({
          key: uuidv4(),
          type: "dropdown",
          field: (
            <div key={uuidv4()} className="mb-4 flex w-full flex-col gap-y-2">
              <Label>Input Name</Label>
              <Controller
                name="memorySize"
                control={formContext.control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0"
                  >
                    <option value="">Select</option>
                    <option value="Memory Size 1">Memory Size 1</option>
                    <option value="Memory Size 2">Memory Size 2</option>
                  </select>
                )}
              />
              <p className="text-[13px] font-medium text-red-500">
                {formContext.formState.errors["memorySize"]?.message as string}
              </p>
            </div>
          ),
        });
        break;
      case "checkbox":
        tempArr.push({
          key: uuidv4(),
          type: "checkbox",
          field: (
            <FormField
              control={formContext.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="mb-4 mr-4 flex flex-col items-start space-x-3 space-y-0">
                  <FormLabel className="mb-3 mr-6 capitalize">
                    Input Name
                  </FormLabel>
                  <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Input Name
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          ),
        });
        break;
      case "radio":
        tempArr.push({
          key: uuidv4(),
          type: "radio",
          field: (
            <FormField
              control={formContext.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="mb-5 flex w-full flex-col items-start">
                  <FormLabel className="mb-3 mr-6 capitalize">
                    Input Name
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
                        <Label htmlFor="MALE">Option A</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FEMALE" id="FEMALE" />
                        <Label htmlFor="FEMALE">Option B</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
        });
        break;
      case "date":
        tempArr.push({
          key: uuidv4(),
          type: "date",
          field: (
            <FormField
              control={formContext.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="mb-4 flex w-full flex-col">
                  <FormLabel>Input Name</FormLabel>
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
                            <span>Select</span>
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
                          date > new Date() || date < new Date("1900-01-01")
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
          ),
        });

        break;
      default:
        break;
    }

    setCustomFields((prevState) => [...prevState, ...tempArr]);
  };

  return (
    <div className="grid w-full grid-cols-4 gap-x-5">
      <div className="col-span-3 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
        <div className="flex w-full flex-wrap">
          <div className="mt-2.5 w-full">
            <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
              Product Details
            </label>
          </div>

          <div className="mb-3.5 w-full">
            <div className="flex flex-wrap">
              {customfields.map((item) => (
                <div key={uuidv4()} className="flex w-full items-start">
                  <button
                    type="button"
                    className="w-full flex-1 text-left"
                    onClick={() => setCustomFieldType(item.type)}
                  >
                    {item.field}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCustomField(item.key)}
                    className="flex cursor-pointer items-center bg-transparent p-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:bg-transparent"
                  >
                    <Image
                      src="/images/social-delete-icon.svg"
                      height={35}
                      width={35}
                      alt="social-delete-icon"
                    />
                  </button>
                </div>
              ))}

              <div className="relative w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleToggleCustomFieldModal}
                  className="border-0 text-sm font-semibold capitalize text-dark-orange shadow-none hover:text-dark-orange"
                >
                  <Image
                    src="/images/plus-orange.png"
                    className="mr-2"
                    alt="plus-orange-icon"
                    height={14}
                    width={14}
                  />
                  Add Custom Field
                </Button>
              </div>
            </div>
          </div>

          <Dialog
            open={isCustomFieldModalOpen}
            onOpenChange={handleToggleCustomFieldModal}
          >
            <DialogContent className="gap-0 p-0">
              <CustomFieldContent
                setFieldType={handleCustomFields}
                onClose={handleToggleCustomFieldModal}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="col-span-1 w-full">
        {customFieldType === "text" ? (
          <Card className="w-full pt-6">
            <CardContent>
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Label</Label>
                <Input />
              </div>

              <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                />
                <Label className="text-sm font-normal">Required</Label>
              </div>

              <div className="mb-4 flex w-full flex-col gap-y-2">
                <Label>Size</Label>
                <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                  <option value="">Select</option>
                  <option value="full">Full</option>
                  <option value="small">Small</option>
                </select>
              </div>

              <div className="mb-4 flex w-full flex-col gap-y-2">
                <Label>Input Type</Label>
                <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                  <option value="">Select</option>
                  <option value="characters">Characters</option>
                  <option value="numbers">Numbers</option>
                </select>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Placeholder</Label>
                <Input />
              </div>
            </CardContent>
          </Card>
        ) : customFieldType === "textarea" ? (
          <Card className="w-full pt-6">
            <CardContent>
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Label</Label>
                <Input />
              </div>

              <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                />
                <Label className="text-sm font-normal">Required</Label>
              </div>

              <div className="mb-4 flex w-full flex-col gap-y-2">
                <Label>Size</Label>
                <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                  <option value="">Select</option>
                  <option value="full">Full</option>
                  <option value="small">Small</option>
                </select>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Placeholder</Label>
                <Input />
              </div>
            </CardContent>
          </Card>
        ) : customFieldType === "dropdown" ? (
          <Card className="w-full pt-6">
            <CardContent>
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Label</Label>
                <Input />
              </div>

              <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                />
                <Label className="text-sm font-normal">Required</Label>
              </div>

              <div className="mb-4 flex w-full flex-col gap-y-2">
                <Label>Size</Label>
                <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                  <option value="">Select</option>
                  <option value="full">Full</option>
                  <option value="small">Small</option>
                </select>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Add</Label>
              </div>
            </CardContent>
          </Card>
        ) : customFieldType === "checkbox" ? (
          <Card className="w-full pt-6">
            <CardContent>
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Label</Label>
                <Input />
              </div>

              <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                />
                <Label className="text-sm font-normal">Required</Label>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Add</Label>
              </div>
            </CardContent>
          </Card>
        ) : customFieldType === "radio" ? (
          <Card className="w-full pt-6">
            <CardContent>
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Label</Label>
                <Input />
              </div>

              <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                />
                <Label className="text-sm font-normal">Required</Label>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Add</Label>
              </div>
            </CardContent>
          </Card>
        ) : customFieldType === "date" ? (
          <Card className="w-full pt-6">
            <CardContent>
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-normal">Label</Label>
                <Input />
              </div>

              <div className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  // checked={field.value}
                  // onCheckedChange={field.onChange}
                  className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                />
                <Label className="text-sm font-normal">Required</Label>
              </div>

              <div className="mb-4 flex w-full flex-col gap-y-2">
                <Label>Size</Label>
                <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus-visible:!ring-0">
                  <option value="">Select</option>
                  <option value="full">Full</option>
                  <option value="small">Small</option>
                </select>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailsSection;
