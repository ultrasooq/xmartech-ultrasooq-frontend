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
  UserCheckIcon
} from "lucide-react";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { useCurrentAccount } from "@/apis/queries/auth.queries";

type SidebarProps = {
  notificationCount?: any;
};

const Sidebar: React.FC<SidebarProps> = ({ notificationCount }) => {
  const { isOpen, closeSidebar, openSidebar } = useSidebar();
  const t = useTranslations();
  const { langDir } = useAuth();
  const router = useRouter();
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const { data: currentAccountData } = useCurrentAccount();
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get current user's trade role
  const currentTradeRole = currentAccountData?.data?.data?.account?.tradeRole || 'BUYER';

  // Role-based menu items
  const getMenuItems = () => {
    const baseItems = [
      {
        icon: <UserIcon className="h-4 w-4 text-gray-600" />,
        label: "Account switch",
        subLabel: "Dashboard",
        onClick: () => {
          closeSidebar();
          router.push("/my-accounts");
        }
      }
    ];

    // BUYER specific items
    if (currentTradeRole === 'BUYER') {
      baseItems.push(
        {
          icon: <ShoppingBagIcon className="h-4 w-4 text-gray-600" />,
          label: "My Orders",
          onClick: () => {
            closeSidebar();
            router.push("/my-orders");
          }
        },
        {
          icon: <FileSearchIcon className="h-4 w-4 text-gray-600" />,
          label: "RFQ Requests",
          onClick: () => {
            closeSidebar();
            router.push("/rfq-request");
          }
        },
        {
          icon: <ShoppingCartIcon className="h-4 w-4 text-gray-600" />,
          label: "Cart",
          onClick: () => {
            closeSidebar();
            router.push("/cart");
          }
        },
        {
          icon: <StoreIcon className="h-4 w-4 text-gray-600" />,
          label: "Wishlist",
          onClick: () => {
            closeSidebar();
            router.push("/wishlist");
          }
        }
      );
    }

    // FREELANCER specific items
    if (currentTradeRole === 'FREELANCER') {
      baseItems.push(
        {
          icon: <WrenchIcon className="h-4 w-4 text-gray-600" />,
          label: "My Services",
          onClick: () => {
            closeSidebar();
            router.push("/manage-services");
          }
        },
        {
          icon: <FileSearchIcon className="h-4 w-4 text-gray-600" />,
          label: "RFQ Quotes",
          onClick: () => {
            closeSidebar();
            router.push("/rfq-quotes");
          }
        },
        {
          icon: <MessageCircleIcon className="h-4 w-4 text-gray-600" />,
          label: "Messages",
          onClick: () => {
            closeSidebar();
            router.push("/messages");
          }
        },
        {
          icon: <BarChart3Icon className="h-4 w-4 text-gray-600" />,
          label: "Analytics",
          onClick: () => {
            closeSidebar();
            router.push("/analytics");
          }
        }
      );
    }

    // COMPANY specific items
    if (currentTradeRole === 'COMPANY') {
      baseItems.push(
        {
          icon: <PackageIcon className="h-4 w-4 text-gray-600" />,
          label: "My Products",
          onClick: () => {
            closeSidebar();
            router.push("/manage-products");
          }
        },
        {
          icon: <WrenchIcon className="h-4 w-4 text-gray-600" />,
          label: "My Services",
          onClick: () => {
            closeSidebar();
            router.push("/manage-services");
          }
        },
        {
          icon: <FileSearchIcon className="h-4 w-4 text-gray-600" />,
          label: "RFQ Quotes",
          onClick: () => {
            closeSidebar();
            router.push("/rfq-quotes");
          }
        },
        {
          icon: <ShoppingCartIcon className="h-4 w-4 text-gray-600" />,
          label: "Orders",
          onClick: () => {
            closeSidebar();
            router.push("/orders");
          }
        },
        {
          icon: <UsersIcon className="h-4 w-4 text-gray-600" />,
          label: "Team Members",
          onClick: () => {
            closeSidebar();
            router.push("/team-members");
          }
        },
        {
          icon: <BarChart3Icon className="h-4 w-4 text-gray-600" />,
          label: "Analytics",
          onClick: () => {
            closeSidebar();
            router.push("/analytics");
          }
        }
      );
    }

    // Common items for all roles
    baseItems.push(
      {
        icon: <UserCheckIcon className="h-4 w-4 text-gray-600" />,
        label: "Profile",
        onClick: () => {
          closeSidebar();
          // Redirect to role-specific profile
          if (currentTradeRole === 'BUYER') {
            router.push("/buyer-profile-details");
          } else if (currentTradeRole === 'FREELANCER') {
            router.push("/freelancer-profile");
          } else if (currentTradeRole === 'COMPANY') {
            router.push("/company-profile");
          } else {
            router.push("/profile");
          }
        }
      },
      {
        icon: <SettingsIcon className="h-4 w-4 text-gray-600" />,
        label: "Settings",
        onClick: () => {
          closeSidebar();
          router.push("/my-settings");
        }
      },
      {
        icon: <LogOutIcon className="h-4 w-4 text-red-500" />,
        label: "Logout",
        isLogout: true,
        onClick: () => {
          closeSidebar();
          // Add logout functionality here
          router.push("/logout");
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
      {/* Invisible Backdrop for click-to-close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-40" 
          onClick={closeSidebar} 
        />
      )}
      
      {/* Sidebar */}
      {accessToken && (
        <div
          className={`fixed top-0 ${langDir === "rtl" ? "right-0" : "left-0"} w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : langDir === "rtl" ? "translate-x-full" : "-translate-x-full"
          }`}
          style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
        >
        <div className="flex h-full flex-col">
          {/* Dark cyan header section */}
          <div className="bg-dark-cyan h-48 flex items-center justify-between px-4">
          </div>

          {/* White Menu Items */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="py-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  onClick={item.onClick}
                >
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 relative">
                      {item.icon}
                      {item.isLogout && (
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${item.isLogout ? 'text-red-500' : 'text-gray-700'}`}>
                        {item.label}
                      </div>
                      {item.subLabel && (
                        <div className="text-xs text-gray-500">
                          {item.subLabel}
                        </div>
                      )}
                    </div>
                  </div>
                  {!item.isLogout && (
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;