"use client";
import { usePathname } from "next/navigation";
import Header from "@/layout/MainLayout/Header";
import Sidebar from "@/layout/MainLayout/Sidebar";
import ContentWrapper from "@/components/ContentWrapper";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  locale: string;
}

// Pages that should not show sidebar and header
const authPages = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
  "/password-reset-verify",
  "/otp-verify",
];

export default function ConditionalLayout({
  children,
  locale,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    // For auth pages, render children without sidebar, header, or content wrapper padding
    return <>{children}</>;
  }

  // For regular pages, render with sidebar, header, and content wrapper
  return (
    <>
      <Sidebar />
      <Header locale={locale} />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}

