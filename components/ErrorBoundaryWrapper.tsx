"use client";
import ErrorBoundary from "./ErrorBoundary";
import { ErrorInfo } from "react";

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Log to error tracking service
    console.error("Root level error:", error, errorInfo);
    // Add your error tracking service here (Sentry, etc.)
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  };

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}
