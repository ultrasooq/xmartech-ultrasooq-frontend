import { Metadata } from "next";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import Sidebar from "@/layout/MainLayout/Sidebar";
import Header from "@/layout/MainLayout/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Puremoon",
  // description: "Welcome to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReactQueryProvider>
          <main className="overflow-x-hidden">
            <Sidebar />
            <Header />
            <NextTopLoader color="#DB2302" showSpinner={false} />
            {children}
            <Toaster />
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
