import { ComponentType } from "react";
import RouteGuard from "./RouteGuard";

interface WithRouteGuardOptions {
  allowedStatuses?: string[];
  redirectTo?: string;
}

export function withRouteGuard<P extends object>(
  Component: ComponentType<P>,
  options: WithRouteGuardOptions = {}
) {
  const { allowedStatuses = ["ACTIVE"], redirectTo = "/home" } = options;

  const WrappedComponent = (props: P) => {
    return (
      <RouteGuard allowedStatuses={allowedStatuses} redirectTo={redirectTo}>
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
  withRouteGuard(Component, { allowedStatuses: ["ACTIVE"] });

export const withAnyUserGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { allowedStatuses: ["ACTIVE", "INACTIVE"] });

export const withCompanyUserGuard = <P extends object>(Component: ComponentType<P>) =>
  withRouteGuard(Component, { 
    allowedStatuses: ["ACTIVE"], 
    redirectTo: "/home" 
  });
