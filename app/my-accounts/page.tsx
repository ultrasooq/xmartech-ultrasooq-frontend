"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMyAccounts, useCreateAccount, useSwitchAccount } from "@/apis/queries/auth.queries";
import { useToast } from "@/components/ui/use-toast";
import { TRADE_ROLE_LIST } from "@/utils/constants";
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
        title: "Creation Failed",
        description: errorMessage,
        variant: "danger",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderWithMessage message="Loading accounts..." />
      </div>
    );
  }

  if (error) {
    console.error("Error loading accounts:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Accounts</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  const mainAccount = accountsData?.data?.mainAccount;
  const accountsByType = accountsData?.data?.accountsByType;
  const rawAllAccounts = accountsData?.data?.allAccounts || [];
  
  // Robust filtering function for valid accounts
  const isValidAccount = (account: any) => {
    if (!account) {
      if (process.env.NODE_ENV === 'development') {
        console.log("Invalid account: null/undefined");
      }
      return false;
    }
    
    // Check if account has required properties
    if (!account.accountName || typeof account.accountName !== 'string') {
      if (process.env.NODE_ENV === 'development') {
        console.log("Invalid account: missing or invalid accountName", account);
      }
      return false;
    }
    
    // Check for undefined values - be more specific to only filter truly corrupted accounts
    const trimmedName = account.accountName.trim();
    if (trimmedName === '' || 
        trimmedName === 'undefined' || 
        trimmedName.toLowerCase() === 'undefined account' ||
        trimmedName === 'null') {
      if (process.env.NODE_ENV === 'development') {
        console.log("Invalid account: undefined/empty name", account);
      }
      return false;
    }
    
    // Don't include main account in sub-accounts
    // Note: Sub-accounts have userId that matches mainAccount.id, but they are different entities
    // We should NOT filter them out unless account.id === mainAccount.id
    if (mainAccount && account.id === mainAccount.id) {
      if (process.env.NODE_ENV === 'development') {
        console.log("Filtering out main account from sub-accounts", account);
      }
      return false;
    }
    
    return true;
  };
  
  // Filter out invalid accounts and main account data from allAccounts
  const allAccounts = rawAllAccounts.filter(isValidAccount);

  if (process.env.NODE_ENV === 'development') {
    console.log("=== MY ACCOUNTS DEBUG ===");
    console.log("mainAccount:", mainAccount);
    console.log("accountsByType:", accountsByType);
    console.log("rawAllAccounts:", rawAllAccounts);
    console.log("filteredAllAccounts:", allAccounts);
    
    // Debug each account individually
    rawAllAccounts.forEach((account, index) => {
      console.log(`Account ${index}:`, {
        id: account.id,
        accountName: account.accountName,
        tradeRole: account.tradeRole,
        isCurrentAccount: account.isCurrentAccount,
        isValid: isValidAccount(account)
      });
    });
    
    console.log("=== END DEBUG ===");
  }

  return (
    <>
      <section className="min-h-screen bg-[#fff8f7] py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-dark-cyan mb-1" dir={langDir}>
                  My Accounts
                </h1>
                <p className="text-light-gray text-xs" dir={langDir}>
                  Manage your accounts and switch between different roles and companies
                </p>
              </div>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-dark-cyan to-blue-800 hover:from-blue-900 hover:to-dark-cyan text-white font-medium px-4 py-1 text-xs"
              >
                + Create New Account
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Left Column - Main Account (1/4 width) */}
            <div className="w-1/4">
              {/* Current Account Status - Above Main Account */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                  <h3 className="text-gray-700 font-medium text-sm">Current Account</h3>
                </div>
                <div className="p-3">
                  {(() => {
                    // Determine which account is currently active
                    let currentAccount = null;
                    let accountType = '';
                    
                    if (mainAccount?.isCurrentAccount) {
                      currentAccount = mainAccount;
                      accountType = 'Main Account';
                    } else {
                      // Find the current sub-account
                      const activeSubAccount = allAccounts?.find(acc => acc.isCurrentAccount);
                      if (activeSubAccount) {
                        currentAccount = activeSubAccount;
                        accountType = 'Sub Account';
                      }
                    }
                    
                    if (!currentAccount) {
                      return (
                        <div className="text-center py-2">
                          <p className="text-gray-400 text-xs">No account active</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Type:</span>
                          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {accountType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Name:</span>
                          <span className="text-xs font-medium text-gray-800">
                            {'firstName' in currentAccount ? `${currentAccount.firstName} ${currentAccount.lastName}` : currentAccount.accountName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Role:</span>
                          <span className="text-xs font-medium text-gray-700">
                            {currentAccount.tradeRole}
                          </span>
                        </div>
                        {'firstName' in currentAccount && currentAccount.accountName && currentAccount.accountName !== currentAccount.firstName && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Account:</span>
                            <span className="text-xs font-medium text-gray-700">
                              {currentAccount.accountName}
                            </span>
                          </div>
                        )}
                        
                        {/* Statistics */}
                        <div className="pt-2 border-t border-gray-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Messages:</span>
                            <span className="text-xs font-medium text-gray-800">
                              {currentAccount.messages || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Orders:</span>
                            <span className="text-xs font-medium text-gray-800">
                              {currentAccount.orders || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">RFQ:</span>
                            <span className="text-xs font-medium text-gray-800">
                              {currentAccount.rfq || 0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Tracking:</span>
                            <span className="text-xs font-medium text-gray-800">
                              {currentAccount.tracking || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Main Account */}
              {mainAccount && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-60">
                  <div className="bg-gray-100 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-700 font-medium text-sm">
                        Main Account
                      </h3>
                      <div className="flex items-center gap-2">
                        {mainAccount.isCurrentAccount ? (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Current
                          </span>
                        ) : (
                          <Button
                            onClick={handleSwitchToMainAccount}
                            disabled={switchAccount.isPending}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 text-xs h-6"
                          >
                            {switchAccount.isPending ? "Switching..." : "Switch"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-800">
                        {mainAccount.firstName} {mainAccount.lastName}
                      </h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        (mainAccount.status || 'active') === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : (mainAccount.status || 'active') === 'bended'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {mainAccount.status || 'active'}
                      </span>
                    </div>
                    
                    {/* Compact Account Statistics */}
                    <div className="flex flex-col space-y-1 text-xs mb-auto text-gray-600">
                      <span>Messages: <span className="font-medium text-gray-800">{mainAccount.messages || 0}</span></span>
                      <span>Orders: <span className="font-medium text-gray-800">{mainAccount.orders || 0}</span></span>
                      <span>RFQ: <span className="font-medium text-gray-800">{mainAccount.rfq || 0}</span></span>
                      <span>Tracking: <span className="font-medium text-gray-800">{mainAccount.tracking || 0}</span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Additional Accounts (3/4 width) */}
            <div className="w-3/4">
              {/* Account Types Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                  <h3 className="text-gray-700 font-medium text-sm">Additional Accounts</h3>
                </div>
                <div className="p-3">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                      <TabsTrigger value="all" className="text-xs data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                        All ({allAccounts?.length || 0})
                      </TabsTrigger>
                      <TabsTrigger value="company" className="text-xs data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                        Companies ({accountsByType?.company?.filter(isValidAccount)?.length || 0})
                      </TabsTrigger>
                      <TabsTrigger value="freelancer" className="text-xs data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                        Freelancers ({accountsByType?.freelancer?.filter(isValidAccount)?.length || 0})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-3">
                      <div className="space-y-3">
                        {allAccounts && allAccounts.length > 0 ? (
                          allAccounts.map((account) => (
                            <AccountCard 
                              key={account.id} 
                              account={account} 
                              onSwitch={handleSwitchAccount}
                              isPending={switchAccount.isPending}
                            />
                          ))
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-400 text-sm">No additional accounts found</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="company" className="mt-3">
                      {(() => {
                        const filteredCompanyAccounts = accountsByType?.company?.filter(isValidAccount) || [];
                        
                        return filteredCompanyAccounts.length > 0 ? (
                          <div className="space-y-3">
                            {filteredCompanyAccounts.map((account) => (
                              <AccountCard 
                                key={account.id} 
                                account={account} 
                                onSwitch={handleSwitchAccount}
                                isPending={switchAccount.isPending}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-400 text-sm">No company accounts found</p>
                          </div>
                        );
                      })()}
                    </TabsContent>

                    <TabsContent value="freelancer" className="mt-3">
                      {(() => {
                        const filteredFreelancerAccounts = accountsByType?.freelancer?.filter(isValidAccount) || [];
                        
                        return filteredFreelancerAccounts.length > 0 ? (
                          <div className="space-y-3">
                            {filteredFreelancerAccounts.map((account) => (
                              <AccountCard 
                                key={account.id} 
                                account={account} 
                                onSwitch={handleSwitchAccount}
                                isPending={switchAccount.isPending}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-400 text-sm">No freelancer accounts found</p>
                          </div>
                        );
                      })()}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>

        {/* Create Account Modal */}
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-lg max-h-[90vh] border-2 border-dark-cyan overflow-hidden flex flex-col">
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

                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="companyPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-dark-cyan font-medium text-xs">Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Phone number" 
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
                                <FormLabel className="text-dark-cyan font-medium text-xs">Website</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Website URL" 
                                    {...field} 
                                    className="border-gray-300 focus:border-dark-orange focus:ring-dark-orange text-sm"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="companyTaxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-dark-cyan font-medium text-xs">Tax ID / Business Registration</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter tax ID or business registration" 
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
                </form>
              </Form>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-gray-200 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createAccount.isPending}
                onClick={form.handleSubmit(handleCreateAccount)}
                className="flex-1 bg-gradient-to-r from-dark-orange to-red-600 hover:from-red-600 hover:to-dark-orange text-white"
              >
                {createAccount.isPending ? (
                  <LoaderWithMessage message="Creating..." />
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
          </div>
        </div>
      </section>
    </>
  );
}

// Account Card Component
function AccountCard({ account, onSwitch, isPending }: any) {
  // Extremely strict validation - refuse to render anything questionable
  if (!account || 
      !account.accountName || 
      typeof account.accountName !== 'string' ||
      account.accountName.trim() === '' ||
      account.accountName.trim() === 'undefined' ||
      account.accountName.toLowerCase().includes('undefined') ||
      account.accountName.trim() === 'null' ||
      !account.id ||
      !account.tradeRole) {
    
    if (process.env.NODE_ENV === 'development') {
      console.warn("AccountCard: Refusing to render invalid account:", account);
    }
    return null; // Absolutely refuse to render
  }

  const accountName = account.accountName.trim();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-700 font-medium text-sm capitalize">
            {account.tradeRole.toLowerCase()}
          </h3>
          <div className="flex items-center gap-2">
            {account.isCurrentAccount ? (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                Current
              </span>
            ) : (
              <Button
                onClick={() => onSwitch(account.id)}
                disabled={isPending}
                className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 text-xs h-6"
              >
                {isPending ? "Switching..." : "Switch"}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm text-gray-800">
            {accountName}
          </h4>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            (account.status || 'active') === 'active' 
              ? 'bg-green-100 text-green-700' 
              : (account.status || 'active') === 'bended'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {account.status || 'active'}
          </span>
        </div>
        
        {account.companyName && (
          <div className="text-xs text-gray-500 mb-2">• {account.companyName}</div>
        )}
        
        {/* Compact Account Statistics */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>msg: <span className="font-medium text-gray-800">{account.messages || 0}</span></span>
          <span>orders: <span className="font-medium text-gray-800">{account.orders || 0}</span></span>
          <span>RFQ: <span className="font-medium text-gray-800">{account.rfq || 0}</span></span>
          <span>track: <span className="font-medium text-gray-800">{account.tracking || 0}</span></span>
        </div>
      </div>
    </div>
  );
}
