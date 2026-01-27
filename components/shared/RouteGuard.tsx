/**
 * @file RouteGuard - Client-side route access control component.
 * @description Guards routes by checking the current user's authentication token
 * and account status before rendering children. Redirects unauthenticated users
 * to /login. For authenticated users, validates their status (ACTIVE, WAITING,
 * INACTIVE) against the requiredStatus prop. Supports ANY (all statuses allowed),
 * ACTIVE (full access only), and WAITING/INACTIVE (limited + full access).
 * Shows a loader while checking and renders fallback content when access is denied.
 *
 * @props
 *   - children {ReactNode} - Protected content to render when access is granted.
 *   - requiredStatus {"ACTIVE" | "WAITING" | "INACTIVE" | "ANY"} - Required user status (default "ACTIVE").
 *   - fallback {ReactNode} - Content to render when access is denied.
 *   - showLoader {boolean} - Whether to show a loader during status check (default true).
 *
 * @dependencies
 *   - next/navigation (useRouter) - Client-side navigation for redirects.
 *   - @/apis/queries/user.queries (useMe) - Fetches current user data.
 *   - @/apis/queries/auth.queries (useCurrentAccount) - Fetches current account data.
 *   - @/utils/statusCheck - Status validation utilities (hasRouteAccess, hasLimitedAccess, etc.).
 *   - @/utils/constants (PUREMOON_TOKEN_KEY) - Auth token cookie key.
 *   - cookies-next (getCookie) - Cookie access for auth token.
 *   - ./LoaderWithMessage - Loading indicator component.
 */
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/apis/queries/user.queries';
import { useCurrentAccount } from '@/apis/queries/auth.queries';
import { 
  hasRouteAccess, 
  hasLimitedAccess, 
  getUnauthorizedRedirect,
  hasFullAccess 
} from '@/utils/statusCheck';
import { PUREMOON_TOKEN_KEY } from '@/utils/constants';
import { getCookie } from 'cookies-next';
import LoaderWithMessage from './LoaderWithMessage';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredStatus?: 'ACTIVE' | 'WAITING' | 'INACTIVE' | 'ANY';
  fallback?: React.ReactNode;
  showLoader?: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredStatus = 'ACTIVE',
  fallback,
  showLoader = true,
}) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  const accessToken = getCookie(PUREMOON_TOKEN_KEY);
  const { data: me, isLoading: meLoading } = useMe(!!accessToken);
  const { data: currentAccount, isLoading: accountLoading } = useCurrentAccount();

  useEffect(() => {
    if (!accessToken) {
      // No token, redirect to login
      router.push('/login');
      return;
    }

    if (meLoading || accountLoading) {
      return; // Still loading
    }

    // Prevent redirect if we don't have account data yet
    if (!currentAccount?.data?.account && !me?.data?.data) {
      return;
    }

    // Get user status from current account or me data
    let userStatus = 'WAITING'; // Default fallback
    
    if (currentAccount?.data?.account?.status) {
      userStatus = currentAccount.data.account.status;
    } else if (me?.data?.data?.status) {
      userStatus = me.data.data.status;
    }



    // Check if user has access based on status
    let accessGranted = false;
    
    if (requiredStatus === 'ANY') {
      accessGranted = true; // Allow access for any status
    } else if (requiredStatus === 'ACTIVE') {
      accessGranted = hasFullAccess(userStatus);
    } else if (requiredStatus === 'WAITING' || requiredStatus === 'INACTIVE') {
      accessGranted = hasLimitedAccess(userStatus) || hasFullAccess(userStatus);
    }



    if (!accessGranted) {
      // User doesn't have access, redirect appropriately
      const redirectUrl = getUnauthorizedRedirect(userStatus);
      
      // Prevent infinite redirects - if we're already on the redirect URL, don't redirect again
      if (typeof window !== 'undefined' && window.location.pathname === redirectUrl) {
        return;
      }
      
      router.push(redirectUrl);
      return;
    }

    setHasAccess(true);
    setIsChecking(false);
  }, [accessToken, me, currentAccount, meLoading, accountLoading, requiredStatus, router]);

  if (meLoading || accountLoading || isChecking) {
    return showLoader ? (
      <LoaderWithMessage message="Checking access..." />
    ) : null;
  }

  if (!hasAccess) {
    return fallback || null;
  }

  return <>{children}</>;
};

export default RouteGuard;
