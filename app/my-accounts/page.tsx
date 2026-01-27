/**
 * @file My Accounts Page - app/my-accounts/page.tsx
 * @route /my-accounts
 * @description Multi-account management page. Displays all user sub-accounts (useMyAccounts)
 *   in a tabbed interface (Tabs) with "My Accounts" and "Create Account" tabs. Each account
 *   card shows trade role, status (Badge), and a "Switch" button (useSwitchAccount). The
 *   Create Account tab provides a form (Zod-validated) to create new sub-accounts with
 *   trade role selection (RadioGroup: BUYER/COMPANY/FREELANCER), name, email, phone, and
 *   Terms of Use / Privacy Policy acceptance. On switch, sets new auth token cookie and
 *   redirects based on trade role.
 * @authentication Required; uses auth-based account queries and mutations.
 * @key_components Tabs, Card, Badge, Dialog, RadioGroup, Form (react-hook-form + Zod),
 *   Input, ControlledPhoneInput, Checkbox, LoaderWithMessage, Button
 * @data_fetching
 *   - useMyAccounts for sub-account list
 *   - useCreateAccount mutation for new sub-account creation
 *   - useSwitchAccount mutation for account switching
 *   - useUpdateProfile mutation for profile updates
 * @state_management AuthContext (setUser, setPermissions) for account switch;
 *   react-hook-form for create account form; local state for activeTab, dialogs.
 */
"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useMyAccounts,
  useCreateAccount,
  useSwitchAccount,
} from "@/apis/queries/auth.queries";
import { useUpdateProfile } from "@/apis/queries/user.queries";
import { useToast } from "@/components/ui/use-toast";
import { TRADE_ROLE_LIST, DEFAULT_SUB_ACCOUNT_STATUS } from "@/utils/constants";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
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
import { Checkbox } from "@/components/ui/checkbox";
import ControlledPhoneInput from "@/components/shared/Forms/ControlledPhoneInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoaderWithMessage from "@/components/shared/LoaderWithMessage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusDisplayBadge from "@/components/shared/StatusDisplayBadge";
import { useUploadFile } from "@/apis/queries/upload.queries";
import Image from "next/image";
import AddImageContent from "@/components/modules/profile/AddImageContent";
import ClostIcon from "@/public/images/close-white.svg";

const createAccountSchema = z.object({
  // Basic account info
  accountName: z
    .string()
    .trim()
    .min(2, {
      message: "Account name is required",
    })
    .refine(
      (val) => {
        const trimmed = val.trim().toLowerCase();
        return (
          trimmed !== "undefined" &&
          trimmed !== "undefined account" &&
          trimmed !== "null"
        );
      },
      {
        message: "Please enter a valid account name",
      },
    ),
  tradeRole: z.enum(["COMPANY", "FREELANCER"], {
    required_error: "Please select a trade role",
  }),

  // Company-specific fields (only for COMPANY role)
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyPhone: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyTaxId: z.string().optional(),

  // Identity card uploads (mandatory for COMPANY and FREELANCER)
  uploadIdentityFrontImage: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Identity card front side is required",
    }),
  uploadIdentityBackImage: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Identity card back side is required",
    }),
});

export default function MyAccountsPage() {
  const t = useTranslations();
  const { langDir } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const { data: accountsData, isLoading, refetch, error } = useMyAccounts();
  const createAccount = useCreateAccount();
  const switchAccount = useSwitchAccount();
  const upload = useUploadFile();
  const updateProfile = useUpdateProfile();

  // Identity card upload state
  const [identityFrontImageFile, setIdentityFrontImageFile] =
    useState<FileList | null>(null);
  const [identityBackImageFile, setIdentityBackImageFile] =
    useState<FileList | null>(null);
  const frontIdentityRef = useRef<HTMLInputElement>(null);
  const backIdentityRef = useRef<HTMLInputElement>(null);

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === "development") {
  }

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      accountName: "",
      tradeRole: "FREELANCER", // Default to freelancer
      companyName: "",
      companyAddress: "",
      companyPhone: "",
      companyWebsite: "",
      companyTaxId: "",
      uploadIdentityFrontImage: undefined,
      uploadIdentityBackImage: undefined,
    },
  });

  const handleSwitchAccount = async (userAccountId: number) => {
    try {
      await switchAccount.mutateAsync({ userAccountId });
      toast({
        title: "Account Switched",
        description: "Successfully switched to the selected account",
        variant: "success",
      });
      router.push("/home");
    } catch (error: any) {
      toast({
        title: "Switch Failed",
        description:
          error?.response?.data?.message || "Failed to switch account",
        variant: "danger",
      });
    }
  };

  const handleSwitchToMainAccount = async () => {
    try {
      await switchAccount.mutateAsync({ userAccountId: 0 });
      toast({
        title: "Account Switched",
        description: "Successfully switched to main account",
        variant: "success",
      });
      router.push("/home");
    } catch (error: any) {
      toast({
        title: "Switch Failed",
        description:
          error?.response?.data?.message || "Failed to switch account",
        variant: "danger",
      });
    }
  };

  const handleUploadedFile = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("content", files[0]);
      const response = await upload.mutateAsync(formData);
      if (response.status && response.data) {
        return response.data;
      }
    }
    return null;
  };

  const handleCreateAccount = async (
    formData: z.infer<typeof createAccountSchema>,
  ) => {
    setIsCreatingAccount(true);
    try {
      // Upload identity card images first
      const identityProof = await handleUploadedFile(identityFrontImageFile);
      const identityProofBack = await handleUploadedFile(identityBackImageFile);

      if (!identityProof || !identityProofBack) {
        setIsCreatingAccount(false);
        toast({
          title: "Upload Failed",
          description:
            "Please upload both front and back sides of your identity card",
          variant: "danger",
        });
        return;
      }

      // Send simplified sub-account data (personal info inherited from Master Account)
      const cleanedData = {
        accountName: formData.accountName?.trim() || "New Account",
        tradeRole: formData.tradeRole as "COMPANY" | "FREELANCER",
        identityProof,
        identityProofBack,
        // Only include company fields if they have values
        ...(formData.companyName?.trim() && {
          companyName: formData.companyName.trim(),
        }),
        ...(formData.companyAddress?.trim() && {
          companyAddress: formData.companyAddress.trim(),
        }),
        ...(formData.companyPhone?.trim() && {
          companyPhone: formData.companyPhone.trim(),
        }),
        ...(formData.companyWebsite?.trim() && {
          companyWebsite: formData.companyWebsite.trim(),
        }),
        ...(formData.companyTaxId?.trim() && {
          companyTaxId: formData.companyTaxId.trim(),
        }),
      };

      const result = await createAccount.mutateAsync(cleanedData);

      if (process.env.NODE_ENV === "development") {
      }

      if (result?.status) {
        // After account creation, update the profile with identity cards
        // The backend createAccount might not save identity cards, so we update the profile separately
        try {
          const createdAccount = result?.data;
          const createdAccountId = createdAccount?.id;

          if (createdAccountId) {
            // Switch to the newly created account to update its profile
            await switchAccount.mutateAsync({
              userAccountId: createdAccountId,
            });

            // Wait for the account switch to complete and backend to process
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update the profile with identity cards for the newly created sub-account
            await updateProfile.mutateAsync({
              identityProof,
              identityProofBack,
            });
          } else {
            // Fallback: try updating current account profile
            await updateProfile.mutateAsync({
              identityProof,
              identityProofBack,
            });
          }
        } catch (profileError: any) {
          // Log error but don't fail the account creation
          console.error(
            "Failed to update profile with identity cards:",
            profileError,
          );
          toast({
            title: "Account Created",
            description:
              "Account created successfully. However, identity card update failed. Please update your profile manually from the profile page.",
            variant: "warning",
          });
        }

        toast({
          title: "Account Created",
          description:
            result.message ||
            "Successfully created new account with identity cards",
          variant: "success",
        });
        setIsCreatingAccount(false);
        form.reset();
        setIdentityFrontImageFile(null);
        setIdentityBackImageFile(null);
        if (frontIdentityRef.current) frontIdentityRef.current.value = "";
        if (backIdentityRef.current) backIdentityRef.current.value = "";
        setShowCreateForm(false);
        // Force refetch after creation with a small delay to ensure backend transaction is committed
        setTimeout(async () => {
          if (process.env.NODE_ENV === "development") {
          }
          const refetchResult = await refetch();
          if (process.env.NODE_ENV === "development") {
          }
        }, 500);
      } else {
        setIsCreatingAccount(false);
        throw new Error(result?.message || "Account creation failed");
      }
    } catch (error: any) {
      setIsCreatingAccount(false);
      let errorMessage = "Failed to create account";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      // Special handling for freelancer accounts
      if (
        formData.tradeRole === "FREELANCER" &&
        errorMessage.toLowerCase().includes("already have") &&
        errorMessage.toLowerCase().includes("freelancer")
      ) {
        errorMessage =
          "The backend currently restricts multiple freelancer accounts. This appears to be a business rule limitation.";
      }

      toast({
        title: "Account Creation Failed",
        description: errorMessage,
        variant: "danger",
      });
    }
  };

  // Helper function to get status display info
  const getStatusInfo = (account: any) => {
    const status = account?.status || DEFAULT_SUB_ACCOUNT_STATUS;
    const statusNote = account?.statusNote;

    return {
      status,
      statusNote,
      isWaiting: status === "WAITING",
      isActive: status === "ACTIVE",
      isRejected: status === "REJECT",
      isInactive: status === "INACTIVE",
      isWaitingForSuperAdmin: status === "WAITING_FOR_SUPER_ADMIN",
    };
  };

  // Helper function to get status description
  const getStatusDescription = (status: string, statusNote?: string) => {
    switch (status) {
      case "WAITING":
        return "Your account is pending approval. You'll be notified once it's reviewed.";
      case "ACTIVE":
        return "Your account is active and you can use all features.";
      case "REJECT":
        if (statusNote) {
          return "Your account was rejected. Please see the admin note below for details.";
        }
        return "Your account was rejected. Please contact support for more information.";
      case "INACTIVE":
        if (statusNote) {
          return "Your account is temporarily inactive. Please see the admin note below for details.";
        }
        return "Your account is temporarily inactive. Please contact support to reactivate.";
      case "WAITING_FOR_SUPER_ADMIN":
        if (statusNote) {
          return `Your account has been escalated to super admin for review: ${statusNote}`;
        }
        return "Your account has been escalated to super admin for final review.";
      default:
        return "Account status information not available.";
    }
  };

  if (isLoading) {
    return (
      <LoaderWithMessage
        message="Loading your accounts..."
        className="min-h-screen"
      />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            {t("error_loading_accounts")}
          </h2>
          <p className="mb-4 text-gray-600">
            {error?.response?.data?.message || t("failed_to_load_accounts")}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            {t("try_again")}
          </Button>
        </div>
      </div>
    );
  }

  const { mainAccount, accountsByType, allAccounts } = accountsData?.data || {};
  let currentAccount =
    allAccounts?.find((acc) => acc.isCurrentAccount) || mainAccount;
  let accountType = t("main_account");

  // Find the current sub-account
  const activeSubAccount = allAccounts?.find((acc) => acc.isCurrentAccount);
  if (activeSubAccount) {
    currentAccount = activeSubAccount;
    accountType = t("sub_account");
  }

  // Filter out main account from sub-accounts display
  const subAccounts =
    allAccounts?.filter((account) => {
      // Don't include main account in sub-accounts
      // Note: Sub-accounts have userId that matches mainAccount.id, but they are different entities
      if (account.id === mainAccount?.id) {
        return false;
      }

      // Debug logging
      if (process.env.NODE_ENV === "development") {
      }

      return true;
    }) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {t("my_accounts")}
          </h1>
          <p className="text-gray-600">{t("manage_your_business_accounts")}</p>
        </div>

        {/* Current Account Card */}
        {currentAccount && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t("current_account")}</span>
                <Badge variant="outline" className="text-sm">
                  {accountType}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t("account_name")}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentAccount.accountName ||
                      ("firstName" in currentAccount &&
                      "lastName" in currentAccount
                        ? `${currentAccount.firstName} ${currentAccount.lastName}`
                        : t("account_name"))}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t("trade_role")}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentAccount.tradeRole}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t("status")}
                  </p>
                  <StatusDisplayBadge
                    status={getStatusInfo(currentAccount).status}
                    size="sm"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t("email")}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {"email" in currentAccount ? currentAccount.email : "N/A"}
                  </p>
                </div>
              </div>

              {/* Notification Counts for Current Account - Only show if there are notifications */}
              {(((currentAccount.tradeRole === "COMPANY" ||
                currentAccount.tradeRole === "FREELANCER") &&
                (("orders" in currentAccount ? currentAccount.orders : 0) ||
                  0) > 0) ||
                (("messages" in currentAccount ? currentAccount.messages : 0) ||
                  0) > 0) && (
                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                    {t("notifications")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {/* Orders Count - Only for COMPANY and FREELANCER */}
                    {(currentAccount.tradeRole === "COMPANY" ||
                      currentAccount.tradeRole === "FREELANCER") &&
                      (("orders" in currentAccount
                        ? currentAccount.orders
                        : 0) || 0) > 0 && (
                        <div className="flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1.5">
                          <svg
                            className="h-4 w-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          <span className="text-xs font-semibold text-blue-700">
                            {t("new_orders")}:{" "}
                            {("orders" in currentAccount
                              ? currentAccount.orders
                              : 0) || 0}
                          </span>
                        </div>
                      )}

                    {/* Messages Count - For all account types */}
                    {(("messages" in currentAccount
                      ? currentAccount.messages
                      : 0) || 0) > 0 && (
                      <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1.5">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-green-700">
                          {t("new_messages")}:{" "}
                          {("messages" in currentAccount
                            ? currentAccount.messages
                            : 0) || 0}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Description */}
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-sm text-blue-800">
                  {getStatusDescription(
                    getStatusInfo(currentAccount).status,
                    getStatusInfo(currentAccount).statusNote,
                  )}
                </p>
                {/* Show Status Note if available */}
                {getStatusInfo(currentAccount).statusNote && (
                  <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <div className="flex items-start space-x-2">
                      <div className="shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-yellow-800">
                          {t("admin_note")}:
                        </h4>
                        <p className="mt-1 text-sm text-yellow-700">
                          {getStatusInfo(currentAccount).statusNote}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Accounts Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              {t("all_accounts")} ({subAccounts?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="company">
              {t("company")} (
              {accountsByType?.company?.filter(
                (acc) => acc.id !== mainAccount?.id,
              ).length || 0}
              )
            </TabsTrigger>
            <TabsTrigger value="freelancer">
              {t("freelancer")} (
              {accountsByType?.freelancer?.filter(
                (acc) => acc.id !== mainAccount?.id,
              ).length || 0}
              )
            </TabsTrigger>
            <TabsTrigger value="buyer">
              {t("buyer")} (
              {accountsByType?.buyer?.filter(
                (acc) => acc.id !== mainAccount?.id,
              ).length || 0}
              )
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Create Account Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t("create_new_account")}
              </Button>
            </div>

            {/* All Accounts Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sub Accounts */}
              {subAccounts.map((account) => {
                const statusInfo = getStatusInfo(account);
                const isCompanyOrFreelancer =
                  account.tradeRole === "COMPANY" ||
                  account.tradeRole === "FREELANCER";
                return (
                  <Card
                    key={account.id}
                    className="transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{account.accountName}</span>
                        <Badge variant="outline">{t("sub_account")}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {t("trade_role")}
                        </p>
                        <p className="font-semibold">{account.tradeRole}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {t("status")}
                        </p>
                        <StatusDisplayBadge
                          status={statusInfo.status}
                          size="sm"
                        />
                      </div>

                      {/* Notification Counts - Only show if there are notifications */}
                      {((isCompanyOrFreelancer && (account.orders || 0) > 0) ||
                        (account.messages || 0) > 0) && (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                          <p className="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                            {t("notifications")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {/* Orders Count - Only for COMPANY and FREELANCER */}
                            {isCompanyOrFreelancer &&
                              (account.orders || 0) > 0 && (
                                <div className="flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1.5">
                                  <svg
                                    className="h-4 w-4 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                  </svg>
                                  <span className="text-xs font-semibold text-blue-700">
                                    {t("new_orders")}: {account.orders || 0}
                                  </span>
                                </div>
                              )}

                            {/* Messages Count - For all account types */}
                            {(account.messages || 0) > 0 && (
                              <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1.5">
                                <svg
                                  className="h-4 w-4 text-green-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                  />
                                </svg>
                                <span className="text-xs font-semibold text-green-700">
                                  {t("new_messages")}: {account.messages || 0}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* Show Status Note prominently for rejected/inactive accounts */}
                      {statusInfo.statusNote &&
                        (statusInfo.status === "REJECT" ||
                          statusInfo.status === "INACTIVE") && (
                          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                            <div className="flex items-start space-x-2">
                              <div className="shrink-0">
                                <svg
                                  className="mt-0.5 h-4 w-4 text-red-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xs font-medium text-red-800">
                                  {t("admin_note")}:
                                </h4>
                                <p className="mt-1 text-xs text-red-700">
                                  {statusInfo.statusNote}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      {account.companyName && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {t("company")}
                          </p>
                          <p className="font-semibold">{account.companyName}</p>
                        </div>
                      )}
                      {/* <div>
                        <p className="text-sm font-medium text-gray-500">Created</p>
                        <p className="font-semibold">
                          {new Date(account.createdAt).toLocaleDateString()}
                        </p>
                      </div> */}
                      {!account.isCurrentAccount && (
                        <Button
                          onClick={() => handleSwitchAccount(account.id)}
                          variant="outline"
                          className="w-full"
                        >
                          {t("switch_to_this_account")}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accountsByType?.company
                ?.filter((acc) => acc.id !== mainAccount?.id)
                .map((account) => {
                  const statusInfo = getStatusInfo(account);
                  return (
                    <Card
                      key={account.id}
                      className="transition-shadow hover:shadow-lg"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{account.accountName}</span>
                          <Badge variant="outline">{t("company")}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Status
                          </p>
                          <StatusDisplayBadge
                            status={statusInfo.status}
                            statusNote={statusInfo.statusNote}
                            size="sm"
                          />
                        </div>

                        {/* Notification Counts - Only show if there are notifications */}
                        {((account.orders || 0) > 0 ||
                          (account.messages || 0) > 0) && (
                          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                              {t("notifications")}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {/* Orders Count */}
                              {(account.orders || 0) > 0 && (
                                <div className="flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1.5">
                                  <svg
                                    className="h-4 w-4 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                  </svg>
                                  <span className="text-xs font-semibold text-blue-700">
                                    {t("new_orders")}: {account.orders || 0}
                                  </span>
                                </div>
                              )}

                              {/* Messages Count */}
                              {(account.messages || 0) > 0 && (
                                <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1.5">
                                  <svg
                                    className="h-4 w-4 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                  </svg>
                                  <span className="text-xs font-semibold text-green-700">
                                    {t("new_messages")}: {account.messages || 0}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {/* Show Status Note prominently for rejected/inactive accounts */}
                        {statusInfo.statusNote &&
                          (statusInfo.status === "REJECT" ||
                            statusInfo.status === "INACTIVE") && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                              <div className="flex items-start space-x-2">
                                <div className="shrink-0">
                                  <svg
                                    className="mt-0.5 h-4 w-4 text-red-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xs font-medium text-red-800">
                                    {t("admin_note")}:
                                  </h4>
                                  <p className="mt-1 text-xs text-red-700">
                                    {statusInfo.statusNote}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        {account.companyName && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {t("company_name")}
                            </p>
                            <p className="font-semibold">
                              {account.companyName}
                            </p>
                          </div>
                        )}
                        {!account.isCurrentAccount && (
                          <Button
                            onClick={() => handleSwitchAccount(account.id)}
                            variant="outline"
                            className="w-full"
                          >
                            {t("switch_to_this_account")}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="freelancer" className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accountsByType?.freelancer
                ?.filter((acc) => acc.id !== mainAccount?.id)
                .map((account) => {
                  const statusInfo = getStatusInfo(account);
                  return (
                    <Card
                      key={account.id}
                      className="transition-shadow hover:shadow-lg"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{account.accountName}</span>
                          <Badge variant="outline">{t("freelancer")}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Status
                          </p>
                          <StatusDisplayBadge
                            status={statusInfo.status}
                            statusNote={statusInfo.statusNote}
                            size="sm"
                          />
                        </div>

                        {/* Notification Counts - Only show if there are notifications */}
                        {((account.orders || 0) > 0 ||
                          (account.messages || 0) > 0) && (
                          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                              {t("notifications")}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {/* Orders Count */}
                              {(account.orders || 0) > 0 && (
                                <div className="flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-1.5">
                                  <svg
                                    className="h-4 w-4 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                  </svg>
                                  <span className="text-xs font-semibold text-blue-700">
                                    {t("new_orders")}: {account.orders || 0}
                                  </span>
                                </div>
                              )}

                              {/* Messages Count */}
                              {(account.messages || 0) > 0 && (
                                <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1.5">
                                  <svg
                                    className="h-4 w-4 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                  </svg>
                                  <span className="text-xs font-semibold text-green-700">
                                    {t("new_messages")}: {account.messages || 0}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {/* Show Status Note prominently for rejected/inactive accounts */}
                        {statusInfo.statusNote &&
                          (statusInfo.status === "REJECT" ||
                            statusInfo.status === "INACTIVE") && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                              <div className="flex items-start space-x-2">
                                <div className="shrink-0">
                                  <svg
                                    className="mt-0.5 h-4 w-4 text-red-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xs font-medium text-red-800">
                                    {t("admin_note")}:
                                  </h4>
                                  <p className="mt-1 text-xs text-red-700">
                                    {statusInfo.statusNote}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        {!account.isCurrentAccount && (
                          <Button
                            onClick={() => handleSwitchAccount(account.id)}
                            variant="outline"
                            className="w-full"
                          >
                            {t("switch_to_this_account")}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="buyer" className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accountsByType?.buyer
                ?.filter((acc) => acc.id !== mainAccount?.id)
                .map((account) => {
                  const statusInfo = getStatusInfo(account);
                  return (
                    <Card
                      key={account.id}
                      className="transition-shadow hover:shadow-lg"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{account.accountName}</span>
                          <Badge variant="outline">{t("buyer")}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {t("status")}
                          </p>
                          <StatusDisplayBadge
                            status={statusInfo.status}
                            statusNote={statusInfo.statusNote}
                            size="sm"
                          />
                        </div>

                        {/* Notification Counts - Only Messages for Buyer */}
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                          <p className="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                            {t("notifications")}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {/* Messages Count */}
                            <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-2.5 py-1.5">
                              <svg
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                              </svg>
                              <span className="text-xs font-semibold text-green-700">
                                {t("new_messages")}: {account.messages || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Show Status Note prominently for rejected/inactive accounts */}
                        {statusInfo.statusNote &&
                          (statusInfo.status === "REJECT" ||
                            statusInfo.status === "INACTIVE") && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                              <div className="flex items-start space-x-2">
                                <div className="shrink-0">
                                  <svg
                                    className="mt-0.5 h-4 w-4 text-red-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xs font-medium text-red-800">
                                    {t("admin_note")}:
                                  </h4>
                                  <p className="mt-1 text-xs text-red-700">
                                    {statusInfo.statusNote}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        {!account.isCurrentAccount && (
                          <Button
                            onClick={() => handleSwitchAccount(account.id)}
                            variant="outline"
                            className="w-full"
                          >
                            {t("switch_to_this_account")}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Account Modal */}
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="flex max-h-[90vh] max-w-md flex-col">
            <DialogHeader className="shrink-0 border-b border-gray-200 pb-4">
              <DialogTitle
                dir={langDir}
                className="text-dark-cyan text-xl font-semibold"
              >
                {t("create_new_account_title")}
              </DialogTitle>
              <DialogDescription
                dir={langDir}
                className="text-light-gray text-sm"
              >
                {t("create_new_account_description")}
              </DialogDescription>
            </DialogHeader>

            <div className="relative flex-1 overflow-y-auto pr-2">
              {(isCreatingAccount ||
                createAccount.isPending ||
                updateProfile.isPending) && (
                <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <svg
                      className="h-8 w-8 animate-spin text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p className="text-sm font-medium text-gray-700">
                      {isCreatingAccount
                        ? t("creating_your_account")
                        : t("processing")}
                    </p>
                    <p className="text-xs text-gray-500">{t("please_wait")}</p>
                  </div>
                </div>
              )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateAccount)}
                  className="space-y-4 pt-4"
                >
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-cyan text-sm font-medium">
                          {t("account_name")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("enter_account_name")}
                            {...field}
                            className="focus:border-dark-orange focus:ring-dark-orange border-gray-300"
                            dir={langDir}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tradeRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-cyan text-sm font-medium">
                          {t("trade_role")}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {TRADE_ROLE_LIST.filter(
                              (role) => role.value !== "BUYER",
                            ).map((role) => (
                              <FormItem
                                key={role.value}
                                className="flex items-center space-y-0 space-x-3 rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={role.value}
                                    className="border-dark-cyan"
                                  />
                                </FormControl>
                                <FormLabel className="text-dark-cyan cursor-pointer text-sm font-normal">
                                  {role.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Personal information is inherited from Master Account */}
                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                      <div className="flex items-start space-x-2">
                        <div className="shrink-0">
                          <svg
                            className="mt-0.5 h-5 w-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">
                            {t("personal_information_inherited")}
                          </p>
                          <p className="text-blue-600">
                            {t("personal_information_inherited_description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Identity Card Upload - Mandatory for COMPANY and FREELANCER */}
                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <h4 className="text-dark-cyan text-sm font-medium">
                      {t("identity_card")}{" "}
                      <span className="text-red-500">*</span>
                    </h4>
                    <p className="text-xs text-gray-600">
                      {t("identity_card_description")}
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Front Side */}
                      <FormField
                        control={form.control}
                        name="uploadIdentityFrontImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-dark-cyan text-xs font-medium">
                              {t("front_side")}{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
                                <div className="relative h-48 w-full">
                                  {identityFrontImageFile ? (
                                    <>
                                      <button
                                        type="button"
                                        className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setIdentityFrontImageFile(null);
                                          form.setValue(
                                            "uploadIdentityFrontImage",
                                            undefined,
                                          );
                                          if (frontIdentityRef.current)
                                            frontIdentityRef.current.value = "";
                                        }}
                                      >
                                        <Image
                                          src={ClostIcon}
                                          alt="close-icon"
                                          width={16}
                                          height={16}
                                        />
                                      </button>
                                      <Image
                                        src={
                                          identityFrontImageFile &&
                                          typeof identityFrontImageFile ===
                                            "object"
                                            ? URL.createObjectURL(
                                                identityFrontImageFile[0],
                                              )
                                            : "/images/company-logo.png"
                                        }
                                        alt="Identity front"
                                        fill
                                        className="z-0 object-contain"
                                      />
                                    </>
                                  ) : (
                                    <div className="absolute inset-0 z-0">
                                      <AddImageContent
                                        description={t(
                                          "drop_identity_card_front",
                                        )}
                                      />
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple={false}
                                    className="absolute bottom-0 z-10 h-48 w-full cursor-pointer opacity-0"
                                    onChange={(event) => {
                                      if (event.target.files?.[0]) {
                                        if (
                                          event.target.files[0].size > 5242880
                                        ) {
                                          toast({
                                            title: "File too large",
                                            description:
                                              "Image size should be less than 5MB",
                                            variant: "danger",
                                          });
                                          return;
                                        }
                                        setIdentityFrontImageFile(
                                          event.target.files,
                                        );
                                        form.setValue(
                                          "uploadIdentityFrontImage",
                                          event.target.files,
                                        );
                                      }
                                    }}
                                    id="uploadIdentityFrontImage"
                                    ref={frontIdentityRef}
                                  />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Back Side */}
                      <FormField
                        control={form.control}
                        name="uploadIdentityBackImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-dark-cyan text-xs font-medium">
                              {t("back_side")}{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300">
                                <div className="relative h-48 w-full">
                                  {identityBackImageFile ? (
                                    <>
                                      <button
                                        type="button"
                                        className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setIdentityBackImageFile(null);
                                          form.setValue(
                                            "uploadIdentityBackImage",
                                            undefined,
                                          );
                                          if (backIdentityRef.current)
                                            backIdentityRef.current.value = "";
                                        }}
                                      >
                                        <Image
                                          src={ClostIcon}
                                          alt="close-icon"
                                          width={16}
                                          height={16}
                                        />
                                      </button>
                                      <Image
                                        src={
                                          identityBackImageFile &&
                                          typeof identityBackImageFile ===
                                            "object"
                                            ? URL.createObjectURL(
                                                identityBackImageFile[0],
                                              )
                                            : "/images/company-logo.png"
                                        }
                                        alt="Identity back"
                                        fill
                                        className="z-0 object-contain"
                                      />
                                    </>
                                  ) : (
                                    <div className="absolute inset-0 z-0">
                                      <AddImageContent
                                        description={t(
                                          "drop_identity_card_back",
                                        )}
                                      />
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple={false}
                                    className="absolute bottom-0 z-10 h-48 w-full cursor-pointer opacity-0"
                                    onChange={(event) => {
                                      if (event.target.files?.[0]) {
                                        if (
                                          event.target.files[0].size > 5242880
                                        ) {
                                          toast({
                                            title: "File too large",
                                            description:
                                              "Image size should be less than 5MB",
                                            variant: "danger",
                                          });
                                          return;
                                        }
                                        setIdentityBackImageFile(
                                          event.target.files,
                                        );
                                        form.setValue(
                                          "uploadIdentityBackImage",
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Company-specific fields - show only when COMPANY is selected */}
                  {form.watch("tradeRole") === "COMPANY" && (
                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <h4 className="text-dark-cyan text-sm font-medium">
                        {t("company_details")}
                      </h4>

                      <div className="grid grid-cols-1 gap-3">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan text-xs font-medium">
                                {t("company_name")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("enter_company_name")}
                                  {...field}
                                  className="focus:border-dark-orange focus:ring-dark-orange border-gray-300 text-sm"
                                  dir={langDir}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companyAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan text-xs font-medium">
                                {t("company_address")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("enter_company_address")}
                                  {...field}
                                  className="focus:border-dark-orange focus:ring-dark-orange border-gray-300 text-sm"
                                  dir={langDir}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companyPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan text-xs font-medium">
                                {t("company_phone")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("enter_company_phone")}
                                  {...field}
                                  className="focus:border-dark-orange focus:ring-dark-orange border-gray-300 text-sm"
                                  dir={langDir}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companyWebsite"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan text-xs font-medium">
                                {t("company_website")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("enter_company_website")}
                                  {...field}
                                  className="focus:border-dark-orange focus:ring-dark-orange border-gray-300 text-sm"
                                  dir={langDir}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companyTaxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan text-xs font-medium">
                                {t("company_tax_id")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("enter_company_tax_id")}
                                  {...field}
                                  className="focus:border-dark-orange focus:ring-dark-orange border-gray-300 text-sm"
                                  dir={langDir}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Information */}
                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                      <div className="flex items-start space-x-2">
                        <div className="shrink-0">
                          <svg
                            className="mt-0.5 h-5 w-5 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium">{t("account_status")}</p>
                          <p className="text-yellow-600">
                            {t("account_status_description")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            <div className="flex shrink-0 justify-end space-x-2 border-t border-gray-200 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                  setIdentityFrontImageFile(null);
                  setIdentityBackImageFile(null);
                  if (frontIdentityRef.current)
                    frontIdentityRef.current.value = "";
                  if (backIdentityRef.current)
                    backIdentityRef.current.value = "";
                  setShowCreateForm(false);
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={form.handleSubmit(handleCreateAccount)}
                disabled={
                  isCreatingAccount ||
                  createAccount.isPending ||
                  updateProfile.isPending
                }
                className="bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreatingAccount ||
                createAccount.isPending ||
                updateProfile.isPending ? (
                  <>
                    <svg
                      className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isCreatingAccount
                      ? t("creating_account")
                      : t("processing")}
                  </>
                ) : (
                  t("create_account")
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
