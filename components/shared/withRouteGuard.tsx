/**
 * @file withRouteGuard - Higher-Order Component for route-level access control.
 * @description Wraps a component with the RouteGuard component, enforcing user
 * status requirements before rendering. Provides predefined guard variants for
 * common use cases (active user, any user, limited access, company user).
 *
 * @exports withRouteGuard - Generic HOC factory accepting a component and guard options.
 * @exports withActiveUserGuard - Requires ACTIVE user status.
 * @exports withAnyUserGuard - Allows any authenticated user status.
 * @exports withLimitedUserGuard - Requires WAITING user status.
 * @exports withCompanyUserGuard - Requires ACTIVE status (company context).
 * @exports withLimitedAccessGuard - Requires WAITING status (limited access).
 *
 * @props Options:
 *   - requiredStatus {"ACTIVE" | "WAITING" | "INACTIVE" | "ANY"} - Required user status.
 *   - fallback {ReactNode} - Custom fallback when guard blocks access.
 *   - showLoader {boolean} - Whether to show a loader while checking status.
 *
 * @dependencies
 *   - ./RouteGuard - The actual guard component performing status checks.
 */
import { ComponentType } from "react";
import RouteGuard from "./RouteGuard";

interface WithRouteGuardOptions {
  requiredStatus?: 'ACTIVE' | 'WAITING' | 'INACTIVE' | 'ANY';
  fallback?: React.ReactNode;
  showLoader?: boolean;
}

export function withRouteGuard<P extends object>(
  Component: ComponentType<P>,
  options: WithRouteGuardOptions = {}
) {
  const { requiredStatus = 'ACTIVE', fallback, showLoader = true } = options;

  const WrappedComponent = (props: P) => {
    return (
      <RouteGuard 
        requiredStatus={requiredStatus} 
        fallback={fallback}
        showLoader={showLoader}
      >
        <Component {...props} />
      </RouteGuard>
    );
  };

  // Set display name for debugging
  WrappedComponent.displayName = `withRouteGuard(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Predefined route guards for common use cases
export const withActiveUserGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { requiredStatus: 'ACTIVE' });

export const withAnyUserGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { requiredStatus: 'ANY' });

export const withLimitedUserGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { requiredStatus: 'WAITING' });

export const withCompanyUserGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { 
    requiredStatus: 'ACTIVE'
  });

// New guard for users with limited access (WAITING, INACTIVE)
export const withLimitedAccessGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { 
    requiredStatus: 'WAITING' 
  });
