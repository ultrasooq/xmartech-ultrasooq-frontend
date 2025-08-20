"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMyAccounts, useCreateAccount, useSwitchAccount } from "@/apis/queries/auth.queries";
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

const createAccountSchema = z.object({
  // Basic account info
  accountName: z.string().trim().min(2, {
    message: "Account name is required",
  }).refine((val) => {
    const trimmed = val.trim().toLowerCase();
    return trimmed !== 'undefined' && 
           trimmed !== 'undefined account' && 
           trimmed !== 'null';
  }, {
    message: "Please enter a valid account name",
  }),
  tradeRole: z.enum(["COMPANY", "FREELANCER"], {
    required_error: "Please select a trade role",
  }),
  
  // Company-specific fields (only for COMPANY role)
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyPhone: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyTaxId: z.string().optional(),
});

export default function MyAccountsPage() {
  const t = useTranslations();
  const { langDir } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: accountsData, isLoading, refetch, error } = useMyAccounts();
  const createAccount = useCreateAccount();
  const switchAccount = useSwitchAccount();

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("MyAccountsPage - accountsData:", accountsData);
    console.log("MyAccountsPage - isLoading:", isLoading);
    console.log("MyAccountsPage - error:", error);
  }

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      accountName: "",
      tradeRole: "COMPANY", // Default to company since buyer is not an option
      companyName: "",
      companyAddress: "",
      companyPhone: "",
      companyWebsite: "",
      companyTaxId: "",
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
        description: error?.response?.data?.message || "Failed to switch account",
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
        description: error?.response?.data?.message || "Failed to switch account",
        variant: "danger",
      });
    }
  };

  const handleCreateAccount = async (formData: z.infer<typeof createAccountSchema>) => {
    try {
      // Debug: Log the raw form data
      console.log("Raw form data received:", formData);
      console.log("Form data keys:", Object.keys(formData));
      
      // Send simplified sub-account data (personal info inherited from Master Account)
      const cleanedData = {
        accountName: formData.accountName?.trim() || 'New Account',
        tradeRole: formData.tradeRole as "COMPANY" | "FREELANCER",
        // Only include company fields if they have values
        ...(formData.companyName?.trim() && { companyName: formData.companyName.trim() }),
        ...(formData.companyAddress?.trim() && { companyAddress: formData.companyAddress.trim() }),
        ...(formData.companyPhone?.trim() && { companyPhone: formData.companyPhone.trim() }),
        ...(formData.companyWebsite?.trim() && { companyWebsite: formData.companyWebsite.trim() }),
        ...(formData.companyTaxId?.trim() && { companyTaxId: formData.companyTaxId.trim() }),
      };

      if (process.env.NODE_ENV === 'development') {
        console.log("Creating account with cleaned data:", cleanedData);
      }

      // Debug: Log the cleaned data being sent
      console.log("Cleaned data being sent to backend:", cleanedData);
      console.log("Cleaned data keys:", Object.keys(cleanedData));
      
      const result = await createAccount.mutateAsync(cleanedData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Account creation result:", result);
      }

      if (result?.status) {
        toast({
          title: "Account Created",
          description: result.message || "Successfully created new account",
          variant: "success",
        });
        form.reset();
        setShowCreateForm(false);
              // Force refetch after creation with a small delay to ensure backend transaction is committed
      setTimeout(async () => {
        if (process.env.NODE_ENV === 'development') {
          console.log("Refetching accounts after creation...");
        }
        const refetchResult = await refetch();
        if (process.env.NODE_ENV === 'development') {
          console.log("Refetch completed, new data:", refetchResult.data);
        }
      }, 500);
      } else {
        throw new Error(result?.message || "Account creation failed");
      }
    } catch (error: any) {
      console.error("Account creation error:", error);
      console.error("Error response:", error?.response);
      console.error("Error data:", error?.response?.data);
      console.error("Error message:", error?.response?.data?.message);
      
      let errorMessage = "Failed to create account";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      // Special handling for freelancer accounts
      if (formData.tradeRole === "FREELANCER" && 
          errorMessage.toLowerCase().includes("already have") && 
          errorMessage.toLowerCase().includes("freelancer")) {
        console.log("Detected freelancer duplicate error - this may be a backend restriction");
        errorMessage = "The backend currently restricts multiple freelancer accounts. This appears to be a business rule limitation.";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Accounts
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.response?.data?.message || "Failed to load your accounts"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const { mainAccount, accountsByType, allAccounts } = accountsData?.data || {};
  let currentAccount = allAccounts?.find(acc => acc.isCurrentAccount) || mainAccount;
  let accountType = 'Main Account';

  // Find the current sub-account
  const activeSubAccount = allAccounts?.find(acc => acc.isCurrentAccount);
  if (activeSubAccount) {
    currentAccount = activeSubAccount;
    accountType = 'Sub Account';
  }

  // Filter out main account from sub-accounts display
  const subAccounts = allAccounts?.filter(account => {
    // Don't include main account in sub-accounts
    // Note: Sub-accounts have userId that matches mainAccount.id, but they are different entities
    if (account.id === mainAccount?.id) {
      return false;
    }
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log("Filtering out main account from sub-accounts", account);
    }
    
    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  My Accounts
                </h1>
          <p className="text-gray-600">
            Manage your business accounts and switch between different roles
          </p>
        </div>

        {/* Current Account Card */}
        {currentAccount && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Account</span>
                <Badge variant="outline" className="text-sm">
                  {accountType}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentAccount.accountName || `${currentAccount.firstName} ${currentAccount.lastName}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Trade Role</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentAccount.tradeRole}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <StatusDisplayBadge 
                    status={getStatusInfo(currentAccount).status}
                    statusNote={getStatusInfo(currentAccount).statusNote}
                    size="sm"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentAccount.email}
                  </p>
                </div>
              </div>
              
              {/* Status Description */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  {getStatusDescription(getStatusInfo(currentAccount).status, getStatusInfo(currentAccount).statusNote)}
                </p>
                {/* Show Status Note if available */}
                {getStatusInfo(currentAccount).statusNote && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-yellow-800">
                          Admin Note:
                        </h4>
                        <p className="text-sm text-yellow-700 mt-1">
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
            <TabsTrigger value="all">All Accounts ({allAccounts?.length || 0})</TabsTrigger>
            <TabsTrigger value="company">Company ({accountsByType?.company?.length || 0})</TabsTrigger>
            <TabsTrigger value="freelancer">Freelancer ({accountsByType?.freelancer?.length || 0})</TabsTrigger>
            <TabsTrigger value="buyer">Buyer ({accountsByType?.buyer?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Create Account Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create New Account
              </Button>
            </div>

            {/* All Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Main Account */}
              {mainAccount && (
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{mainAccount.accountName || `${mainAccount.firstName} ${mainAccount.lastName}`}</span>
                      <Badge variant="secondary">Main Account</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Trade Role</p>
                      <p className="font-semibold">{mainAccount.tradeRole}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <StatusDisplayBadge 
                        status={getStatusInfo(mainAccount).status}
                        statusNote={getStatusInfo(mainAccount).statusNote}
                        size="sm"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-semibold">{mainAccount.email}</p>
                    </div>
                    {!mainAccount.isCurrentAccount && (
                      <Button
                        onClick={() => handleSwitchToMainAccount()}
                        variant="outline"
                        className="w-full"
                      >
                        Switch to Main Account
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Sub Accounts */}
              {subAccounts.map((account) => {
                const statusInfo = getStatusInfo(account);
                return (
                  <Card key={account.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{account.accountName}</span>
                        <Badge variant="outline">Sub Account</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Trade Role</p>
                        <p className="font-semibold">{account.tradeRole}</p>
                </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <StatusDisplayBadge 
                          status={statusInfo.status}
                          statusNote={statusInfo.statusNote}
                          size="sm"
                        />
                      </div>
                      {/* Show Status Note prominently for rejected/inactive accounts */}
                      {statusInfo.statusNote && (statusInfo.status === 'REJECT' || statusInfo.status === 'INACTIVE') && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <div className="flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xs font-medium text-red-800">
                                Admin Note:
                              </h4>
                              <p className="text-xs text-red-700 mt-1">
                                {statusInfo.statusNote}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {account.companyName && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Company</p>
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
                          Switch to This Account
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
                      </div>
                    </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accountsByType?.company?.map((account) => {
                const statusInfo = getStatusInfo(account);
                return (
                  <Card key={account.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{account.accountName}</span>
                        <Badge variant="outline">Company</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <StatusDisplayBadge 
                          status={statusInfo.status}
                          statusNote={statusInfo.statusNote}
                          size="sm"
                        />
                      </div>
                      {/* Show Status Note prominently for rejected/inactive accounts */}
                      {statusInfo.statusNote && (statusInfo.status === 'REJECT' || statusInfo.status === 'INACTIVE') && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <div className="flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xs font-medium text-red-800">
                                Admin Note:
                              </h4>
                              <p className="text-xs text-red-700 mt-1">
                                {statusInfo.statusNote}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {account.companyName && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Company Name</p>
                          <p className="font-semibold">{account.companyName}</p>
                          </div>
                      )}
                      {!account.isCurrentAccount && (
                        <Button
                          onClick={() => handleSwitchAccount(account.id)}
                          variant="outline"
                          className="w-full"
                        >
                          Switch to This Account
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
                    </TabsContent>

          <TabsContent value="freelancer" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accountsByType?.freelancer?.map((account) => {
                const statusInfo = getStatusInfo(account);
                return (
                  <Card key={account.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{account.accountName}</span>
                        <Badge variant="outline">Freelancer</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <StatusDisplayBadge 
                          status={statusInfo.status}
                          statusNote={statusInfo.statusNote}
                          size="sm"
                        />
                      </div>
                      {/* Show Status Note prominently for rejected/inactive accounts */}
                      {statusInfo.statusNote && (statusInfo.status === 'REJECT' || statusInfo.status === 'INACTIVE') && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <div className="flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xs font-medium text-red-800">
                                Admin Note:
                              </h4>
                              <p className="text-xs text-red-700 mt-1">
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
                          Switch to This Account
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
                          </div>
                    </TabsContent>

          <TabsContent value="buyer" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accountsByType?.buyer?.map((account) => {
                const statusInfo = getStatusInfo(account);
                return (
                  <Card key={account.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{account.accountName}</span>
                        <Badge variant="outline">Buyer</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <StatusDisplayBadge 
                          status={statusInfo.status}
                          statusNote={statusInfo.statusNote}
                          size="sm"
                        />
                      </div>
                      {/* Show Status Note prominently for rejected/inactive accounts */}
                      {statusInfo.statusNote && (statusInfo.status === 'REJECT' || statusInfo.status === 'INACTIVE') && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <div className="flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xs font-medium text-red-800">
                                Admin Note:
                              </h4>
                              <p className="text-xs text-red-700 mt-1">
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
                          Switch to This Account
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
          <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
            <DialogHeader className="pb-4 border-b border-gray-200 flex-shrink-0">
              <DialogTitle dir={langDir} className="text-dark-cyan text-xl font-semibold">
                Create New Account
              </DialogTitle>
              <DialogDescription dir={langDir} className="text-light-gray text-sm">
                Create a new business account with a different role. Personal information will be inherited from your main profile.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto pr-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateAccount)} className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark-cyan font-medium text-sm">Account Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter account name" 
                            {...field} 
                            className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange"
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
                        <FormLabel className="text-dark-cyan font-medium text-sm">Trade Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-2"
                          >
                            {TRADE_ROLE_LIST.filter(role => role.value !== "BUYER").map((role) => (
                              <FormItem
                                key={role.value}
                                className="flex items-center space-x-3 space-y-0 p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                              >
                                <FormControl>
                                  <RadioGroupItem value={role.value} className="border-dark-cyan" />
                                </FormControl>
                                <FormLabel className="font-normal text-sm text-dark-cyan cursor-pointer">
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
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">Personal Information Inherited</p>
                          <p className="text-blue-600">Your name, email, phone, and password will be automatically inherited from your main profile.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company-specific fields - show only when COMPANY is selected */}
                  {form.watch("tradeRole") === "COMPANY" && (
                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-dark-cyan text-sm">Company Details</h4>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan font-medium text-xs">Company Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter company name" 
                                  {...field} 
                                  className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange text-sm"
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
                              <FormLabel className="text-dark-cyan font-medium text-xs">Company Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter company address" 
                                  {...field} 
                                  className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange text-sm"
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
                              <FormLabel className="text-dark-cyan font-medium text-xs">Company Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                  placeholder="Enter company phone" 
                                    {...field} 
                                    className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange text-sm"
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
                              <FormLabel className="text-dark-cyan font-medium text-xs">Company Website</FormLabel>
                                <FormControl>
                                  <Input 
                                  placeholder="Enter company website" 
                                    {...field} 
                                    className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange text-sm"
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
                              <FormLabel className="text-dark-cyan font-medium text-xs">Company Tax ID</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter company tax ID" 
                                  {...field} 
                                  className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange text-sm"
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
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium">Account Status</p>
                          <p className="text-yellow-600">New accounts will be created with a "Waiting" status and require admin approval before activation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(handleCreateAccount)}
                disabled={createAccount.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {createAccount.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
