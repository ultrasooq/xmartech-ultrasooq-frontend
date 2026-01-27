/**
 * @file Root Layout - app/layout.tsx
 * @route All routes (root layout wrapping every page)
 *
 * @description
 * The top-level server-side layout for the entire Ultrasooq / Puremoon B2B/B2C
 * marketplace frontend. It bootstraps all global providers, performs server-side
 * user authentication, fetches permissions and locale, and renders the shared
 * conditional layout (header / sidebar / footer).
 *
 * @authentication
 * - Reads the PUREMOON_TOKEN_KEY cookie on the server.
 * - Calls POST /user/me to authorize the current user.
 * - Calls GET /user/get-perrmision to fetch role-based permissions.
 * - Passes user object and permissions into AuthProvider context.
 *
 * @providers
 * - SessionWrapper (next-auth session)
 * - ReactQueryProvider (TanStack Query)
 * - AuthProvider (user, permissions, locale)
 * - SocketProvider (real-time WebSocket)
 * - SidebarProvider (sidebar open/close state)
 * - NotificationProvider (notification badge / list)
 * - LocaleProvider / NextIntlClientProvider (i18n translations)
 *
 * @key_components
 * - NextTopLoader - page-transition progress bar (red #DB2302)
 * - ConditionalLayout - renders Header/Sidebar based on the current route
 * - TitleProtection - guards against title manipulation
 * - Toaster - global toast notification container
 *
 * @data_fetching
 * - authorizeUser() - server function, POST /user/me
 * - getUserPermissions() - server function, GET /user/get-perrmision
 * - getUserLocale() - reads locale preference from cookie/service
 * - Dynamic import of translations/${locale}.json
 */
import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css";
import "@/scss/main.scss";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { SocketProvider } from "@/context/SocketContext";
import { NotificationProvider } from "@/context/NotificationContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import LocaleProvider from "@/components/LocaleProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import TitleProtection from "@/components/TitleProtection";
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

  // Create user object only if we have valid data
  const userObject = userData?.data?.id
    ? {
        id: userData.data.id,
        firstName: userData.data.firstName || "",
        lastName: userData.data.lastName || "",
        tradeRole: userData.data.tradeRole || "",
      }
    : null;

  return (
    <SessionWrapper>
      <html lang={locale} className="h-full overflow-x-hidden">
        <body className={`${inter.className} h-full overflow-x-hidden`}>
          {/* <DisableRouteAnnouncer /> */}
          <ReactQueryProvider>
            <AuthProvider
              user={userObject}
              permissions={[
                ...(permissions?.data?.userRoleDetail?.userRolePermission ||
                  []),
              ]}
              locale={locale}
            >
              <SocketProvider>
                <SidebarProvider>
                  <TitleProtection />
                  <main className="overflow-x-hidden">
                    <LocaleProvider messages={messages} initialLocale={locale}>
                      <NotificationProvider>
                        <NextTopLoader color="#DB2302" showSpinner={false} />
                        <ConditionalLayout locale={locale}>
                          {children}
                        </ConditionalLayout>
                        <Toaster />
                      </NotificationProvider>
                    </LocaleProvider>
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
