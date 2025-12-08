"use client";
import React, { useState, useEffect } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  XIcon,
  UserIcon,
  WrenchIcon,
  CreditCardIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  PackageIcon,
  MessageCircleIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronsLeftIcon,
  MenuIcon,
  Building2Icon,
  BriefcaseIcon,
  StoreIcon,
  ShoppingBagIcon,
  FileSearchIcon,
  BarChart3Icon,
  UserCheckIcon,
  WalletIcon
} from "lucide-react";
import { getCookie, deleteCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { useCurrentAccount } from "@/apis/queries/auth.queries";
import { useMe } from "@/apis/queries/user.queries";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type SidebarProps = {
  notificationCount?: any;
};

const Sidebar: React.FC<SidebarProps> = ({ notificationCount }) => {
  const { isHovered, setIsHovered, isOpen, closeSidebar } = useSidebar();
  const t = useTranslations();
  const { langDir, clearUser } = useAuth();
  const router = useRouter();
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const { data: currentAccountData } = useCurrentAccount();
  const me = useMe(!!accessToken);
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get current user's trade role - matching Header's logic
  const currentTradeRole =
    currentAccountData?.data?.data?.account?.tradeRole || me?.data?.data?.tradeRole || 'BUYER';

  // Role-based menu items
  const getMenuItems = () => {
    const baseItems = [
      {
        icon: <UserIcon className="h-5 w-5 text-blue-600" />,
        label: "Account switch",
        subLabel: "Dashboard",
        onClick: () => {
          router.push("/my-accounts");
        }
      }
    ];

    // BUYER specific items
    if (currentTradeRole === 'BUYER') {
      baseItems.push(
        {
          icon: <ShoppingBagIcon className="h-5 w-5 text-indigo-600" />,
          label: "My Orders",
          onClick: () => {
            router.push("/my-orders");
          }
        },
        {
          icon: <FileSearchIcon className="h-5 w-5 text-purple-600" />,
          label: "RFQ Requests",
          onClick: () => {
            router.push("/rfq-request");
          }
        },
        {
          icon: <ShoppingCartIcon className="h-5 w-5 text-orange-600" />,
          label: "Cart",
          onClick: () => {
            router.push("/cart");
          }
        },
        {
          icon: <StoreIcon className="h-5 w-5 text-pink-600" />,
          label: "Wishlist",
          onClick: () => {
            router.push("/wishlist");
          }
        }
      );
    }

    // FREELANCER specific items
    if (currentTradeRole === 'FREELANCER') {
      baseItems.push(
        {
          icon: <WrenchIcon className="h-5 w-5 text-teal-600" />,
          label: "My Services",
          onClick: () => {
            router.push("/manage-services");
          }
        },
        {
          icon: <FileSearchIcon className="h-5 w-5 text-purple-600" />,
          label: "RFQ Quotes",
          onClick: () => {
            router.push("/rfq-quotes");
          }
        },
        {
          icon: <MessageCircleIcon className="h-5 w-5 text-cyan-600" />,
          label: "Messages",
          onClick: () => {
            router.push("/messages");
          }
        },
        {
          icon: <BarChart3Icon className="h-5 w-5 text-green-600" />,
          label: "Analytics",
          onClick: () => {
            router.push("/analytics");
          }
        }
      );
    }

    // COMPANY specific items
    if (currentTradeRole === 'COMPANY') {
      baseItems.push(
        {
          icon: <PackageIcon className="h-5 w-5 text-blue-600" />,
          label: "My Products",
          onClick: () => {
            router.push("/manage-products");
          }
        },
        {
          icon: <WrenchIcon className="h-5 w-5 text-teal-600" />,
          label: "My Services",
          onClick: () => {
            router.push("/manage-services");
          }
        },
        {
          icon: <FileSearchIcon className="h-5 w-5 text-purple-600" />,
          label: "RFQ Quotes",
          onClick: () => {
            router.push("/rfq-quotes");
          }
        },
        {
          icon: <ShoppingCartIcon className="h-5 w-5 text-orange-600" />,
          label: "Orders",
          onClick: () => {
            router.push("/orders");
          }
        },
        {
          icon: <PackageIcon className="h-5 w-5 text-indigo-600" />,
          label: "Dropshipping",
          onClick: () => {
            router.push("/dropship-products");
          }
        },
        {
          icon: <UsersIcon className="h-5 w-5 text-violet-600" />,
          label: "Team Members",
          onClick: () => {
            router.push("/team-members");
          }
        },
        {
          icon: <BarChart3Icon className="h-5 w-5 text-green-600" />,
          label: "Analytics",
          onClick: () => {
            router.push("/analytics");
          }
        }
      );
    }

    // Common items for all roles
    baseItems.push(
      {
        icon: <UserCheckIcon className="h-5 w-5 text-blue-600" />,
        label: "Profile",
        onClick: () => {
          // Get the current trade role at click time to avoid closure issues
          // Match Header's logic exactly: currentAccount?.data?.data?.account?.tradeRole || me?.data?.data?.tradeRole
          const tradeRole = currentAccountData?.data?.data?.account?.tradeRole || me?.data?.data?.tradeRole || 'BUYER';
          
          // Debug log (remove in production if needed)
          if (process.env.NODE_ENV === 'development') {
            console.log('Sidebar Profile Click - Trade Role:', tradeRole);
            console.log('Current Account Data:', currentAccountData?.data?.data?.account);
            console.log('Me Data:', me?.data?.data);
          }
          
          // Redirect to role-specific profile - matching Header's handleProfile function
          if (tradeRole === 'BUYER') {
            router.push("/buyer-profile-details");
          } else if (tradeRole === 'FREELANCER') {
            router.push("/freelancer-profile-details");
          } else if (tradeRole === 'COMPANY') {
            router.push("/company-profile-details");
          } else if (tradeRole === 'MEMBER') {
            router.push("/member-profile-details");
          } else {
            router.push("/profile");
          }
        }
      },
      {
        icon: <WalletIcon className="h-5 w-5 text-amber-600" />,
        label: "My Wallet",
        onClick: () => {
          router.push("/wallet");
        }
      },
      {
        icon: <SettingsIcon className="h-5 w-5 text-gray-600" />,
        label: "Settings",
        onClick: () => {
          router.push("/my-settings");
        }
      },
      {
        icon: <LogOutIcon className="h-5 w-5 text-red-500" />,
        label: "Logout",
        isLogout: true,
        onClick: async () => {
          try {
            // Delete the token cookie
            deleteCookie(PUREMOON_TOKEN_KEY);
            // Clear React Query cache
            queryClient.clear();
            // Clear user from AuthContext
            clearUser();
            // Sign out from NextAuth
            await signOut({
              redirect: false,
              callbackUrl: "/home",
            });
            // Close sidebar on mobile
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              closeSidebar();
            }
            // Show success toast
            toast({
              title: t("logout_successful"),
              description: t("you_have_successfully_logged_out"),
              variant: "success",
            });
            // Force a full page reload to ensure all components re-initialize with updated cookie state
            // This ensures the Header component re-reads the cookie and shows login/register buttons
            window.location.href = "/home";
          } catch (error) {
            console.error("Logout error:", error);
            toast({
              title: t("error") || "Error",
              description: t("logout_failed") || "Failed to logout. Please try again.",
              variant: "destructive",
            });
          }
        }
      }
    );

    return baseItems;
  };

  const menuItems = getMenuItems();

  // Show loading state when not on client side
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Backdrop for mobile - only visible when sidebar is open on mobile */}
      {accessToken && isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden" 
          onClick={closeSidebar} 
        />
      )}
      
      {/* Sidebar - Mobile: slide in/out, Desktop: always visible with hover */}
      {accessToken && (
        <div
          className={cn(
            "fixed top-0 h-full bg-white shadow-xl z-[70]",
            langDir === "rtl" ? "right-0" : "left-0",
            // Mobile: slide in/out based on isOpen, full width when open
            isOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0",
            // Desktop: always visible, expand on hover
            "md:w-16",
            isHovered && "md:w-64"
          )}
          style={{ 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderRight: langDir === "rtl" ? "none" : "1px solid rgba(0, 0, 0, 0.05)",
            borderLeft: langDir === "rtl" ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
            // Optimize transitions - only transition width for better performance
            transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'width',
            // Force GPU acceleration
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex h-full flex-col">
            {/* Dark cyan header section - matches full header height (welcome row + main content row) */}
            {/* Header structure (reduced):
                - Container: pt-1.5 (6px) md:pt-2 (8px) lg:pt-2.5 (10px)
                - Welcome row: py-1 (4px*2 + ~20px content) md:py-1.5 (6px*2 + ~22px) lg:py-2 (8px*2 + ~24px)
                - Main content row: py-1.5 (6px*2 + ~50px content) md:py-2 (8px*2 + ~55px) lg:py-2 (8px*2 + ~60px)
                Total: ~96px md:~113px lg:~126px (increased slightly) */}
            <div className={cn(
              "bg-gradient-to-br from-dark-cyan via-dark-cyan to-blue-700 flex items-center justify-between relative overflow-hidden",
              // Match full header height including both welcome row and main content row (slightly decreased)
              "h-[116px] md:h-[133px] lg:h-[146px]",
              (isHovered || isOpen) ? "px-4" : "px-2"
            )}
            style={{
              transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
              </div>
              {(isHovered || isOpen) ? (
                <div className="text-white w-full relative z-10 flex items-center justify-center">
                  <span className="text-white text-lg font-bold tracking-wide">Ultrasooq</span>
                  {/* Close button for mobile - positioned absolutely */}
                  <button
                    onClick={closeSidebar}
                    className="md:hidden absolute right-4 flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <XIcon className="h-5 w-5 text-white" />
                  </button>
                </div>
              ) : (
                <div className="text-white text-2xl font-bold relative z-10 drop-shadow-lg w-full text-center">U</div>
              )}
            </div>

            {/* White Menu Items - starts at same level as bottom of header main content row */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white scrollbar-hide">
              {/* No top padding needed - sidebar header height already matches full header height */}
              <div className="py-1">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center cursor-pointer transition-all duration-200 group relative",
                      (isHovered || isOpen)
                        ? "justify-between px-4 py-2 mx-2 rounded-lg hover:bg-blue-50 hover:shadow-sm" 
                        : "justify-center px-2 py-2.5 mx-1 rounded-lg hover:bg-blue-50",
                      item.isLogout && "mt-3 pt-3 border-t-2 border-gray-200"
                    )}
                    onClick={() => {
                      item.onClick();
                      // Close sidebar on mobile when item is clicked
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        closeSidebar();
                      }
                    }}
                    title={!(isHovered || isOpen) ? item.label : undefined}
                  >
                    {/* Active indicator line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-600 rounded-r-full transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:h-8"></div>
                    
                    <div className={cn(
                      "flex items-center w-full",
                      (isHovered || isOpen) ? "space-x-3" : "justify-center"
                    )}>
                      <div className={cn(
                        "shrink-0 relative transition-all duration-200 flex items-center justify-center rounded-lg p-1.5",
                        !(isHovered || isOpen) && "group-hover:scale-110 group-hover:bg-blue-100"
                      )}>
                        <div className={cn(
                          "transition-all duration-200",
                          (isHovered || isOpen) && "group-hover:scale-110"
                        )}>
                          {item.icon}
                        </div>
                        {item.isLogout && (
                          <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>
                      {(isHovered || isOpen) && (
                        <div className="flex-1 min-w-0">
                          <div className={cn(
                            "text-sm font-medium whitespace-nowrap transition-colors duration-200",
                            item.isLogout ? 'text-red-600 group-hover:text-red-700' : 'text-gray-700 group-hover:text-blue-600'
                          )}>
                            {item.label}
                          </div>
                          {item.subLabel && (
                            <div className="text-xs text-gray-500 whitespace-nowrap mt-0.5">
                              {item.subLabel}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {(isHovered || isOpen) && !item.isLogout && (
                      <ChevronRightIcon className="h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer section - only visible when expanded */}
            {(isHovered || isOpen) && (
              <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white px-4 py-3">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span>© 2024 Ultrasooq</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;