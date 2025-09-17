import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css";
import "@/scss/main.scss";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { SocketProvider } from "@/context/SocketContext";
import Header from "@/layout/MainLayout/Header";
import Sidebar from "@/layout/MainLayout/Sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { getUserLocale } from "@/src/services/locale";
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    template: "%s | Ultrasooq",
    default: "Ultrasooq",
  },
};

async function authorizeUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(PUREMOON_TOKEN_KEY);
    if (token?.value) {
      const res = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token.value,
        },
      });
      return res.data;
    } else {
      return {
        status: 401,
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
}

async function getUserPermissions() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(PUREMOON_TOKEN_KEY);
    if (token?.value) {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/get-perrmision`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token.value,
        },
      });
      return res.data;
    } else {
      return {
        status: 401,
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await authorizeUser();

  const permissions = await getUserPermissions();

  const locale = await getUserLocale();
  const messages = (await import(`../translations/${locale}.json`)).default;

  return (
    <SessionWrapper>
      <html lang={locale}>
        <body className={`${inter.className}`}>
          {/* <DisableRouteAnnouncer /> */}
          <ReactQueryProvider>
            <AuthProvider
              user={{
                id: userData?.data?.id,
                firstName: userData?.data?.firstName,
                lastName: userData?.data?.lastName,
                tradeRole: userData?.data?.tradeRole,
              }}
              permissions={[
                ...(permissions?.data?.userRoleDetail?.userRolePermission ||
                  []),
              ]}
              locale={locale}
            >
              <SocketProvider>
                <SidebarProvider>
                  <main className="overflow-x-visible">
                    <NextIntlClientProvider messages={messages}>
                      <Sidebar />
                      <Header locale={locale} />
                      <NextTopLoader color="#DB2302" showSpinner={false} />
                      {children}
                      <Toaster />
                    </NextIntlClientProvider>
                  </main>
                </SidebarProvider>
              </SocketProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
