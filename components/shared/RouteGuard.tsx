"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/apis/queries/user.queries";
import { getCookie } from "cookies-next";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import { isStatusAllowed, getUserStatusInfo } from "@/utils/statusCheck";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedStatuses?: string[];
  redirectTo?: string;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  allowedStatuses = ["ACTIVE"],
  redirectTo = "/home"
}) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);

  // Only fetch user data if there's an access token
  const { data: userData, isLoading, error } = useMe(!!accessToken);

  useEffect(() => {
    if (!accessToken) {
      // No token, redirect to login
      router.push("/login");
      return;
    }

    if (isLoading) {
      // Still loading, wait
      return;
    }

    if (error) {
      // Error fetching user data, redirect to login
      router.push("/login");
      return;
    }

    const userStatus = userData?.data?.status;
    const statusInfo = getUserStatusInfo(userData);
    
    if (!userStatus) {
      // No status found, redirect to login
      console.log("RouteGuard: No user status found, redirecting to login");
      router.push("/login");
      return;
    }

    if (!isStatusAllowed(userStatus, allowedStatuses)) {
      // User status not allowed, redirect
      console.log(`RouteGuard: User status ${userStatus} not allowed. Redirecting to ${redirectTo}`);
      console.log(`RouteGuard: Allowed statuses: ${allowedStatuses.join(', ')}`);
      console.log(`RouteGuard: Status info:`, statusInfo);
      router.push(redirectTo);
      return;
    }

    console.log(`RouteGuard: User status ${userStatus} is allowed. Rendering component.`);
    console.log(`RouteGuard: Status info:`, statusInfo);

    // User status is allowed, render children
    setIsChecking(false);
  }, [accessToken, userData, isLoading, error, allowedStatuses, redirectTo, router]);

  // Show loading while checking
  if (isChecking || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If we reach here, user is authenticated and has allowed status
  return <>{children}</>;
};

export default RouteGuard;
