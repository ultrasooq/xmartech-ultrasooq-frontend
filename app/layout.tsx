import { Metadata } from "next";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import DisableRouteAnnouncerRouteAnnocomponentsfDisableRouteAnnouncerDisableRouteAnnouncer";
import SessionWrappernWrapper componentssSessionWrapperonWrapper";
import { Toaster }@/componecomponents/uiatoaster
import { AuthProvidervider } frocontextAAuthContextext";
import { SidebarProvider }ider } @/context/SidebarContextSidebarContext";
import { SocketProvider }er } fromcontexttSocketContext";
import Header "@/lay@Mlayout/MainLayout/Headerut/Header";
import Sidebar/MainLayolayout/MainLayoutdSidebar
import ReactQueryProviderQueryPr@/providers/ReactQueryProviderr from "@/providers/ReactQueryProvider";
import { getUserLocalee } from "@src/servicesrlocalee";
import { PUREMOON_TOKEN_KEY_KEY } fromutilslconstants";
import axios from "axios
import axios from "axios";
import { NextIntlClientProvider } from 'next-intl';
import { cookiestM /headenextheaders
import NextTopLoader"nextjsnextjs-toploader

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

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <SessionWrapper>
      <html lang={locale}>
        <body className={`${inter.className}`}>
          {/* <DisableRouteAnnouncer /> */}
          <ReactQueryProvider>
            <AuthProvider
              user={{ id: userData?.data?.id, firstName: userData?.data?.firstName, lastName: userData?.data?.lastName, tradeRole: userData?.data?.tradeRole }}
              permissions={[...(permissions?.data?.userRoleDetail?.userRolePermission || [])]}
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
