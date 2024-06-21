import { Metadata } from "next";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Sidebar from "@/layout/MainLayout/Sidebar";
import Header from "@/layout/MainLayout/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import SessionWrapper from "@/components/SessionWrapper";
import { cookies } from 'next/headers'
import { PUREMOON_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";

export const metadata: Metadata = {
  title: "Puremoon",
  // description: "Welcome to Next.js",
};

async function authorizeUser() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(PUREMOON_TOKEN_KEY)
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await authorizeUser();

  return (
    <SessionWrapper>
      
      <html lang="en">
        <body className={`${inter.className}`}>
          <ReactQueryProvider>
            <AuthProvider user={{id: userData?.data?.id}}>
              <SocketProvider>
                <main className="overflow-x-visible">
                  <Sidebar />
                  <Header />
                  <NextTopLoader color="#DB2302" showSpinner={false} />
                  {children}
                  <Toaster />
                </main>
              </SocketProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
