import { Metadata } from "next";
import "@/app/ui/global.css";
import "../scss/before-login.scss";
import "../scss/header.scss";
import "../scss/home.scss";
import "../scss/main.scss";
import "../scss/profile-details.scss";
import "../scss/rfq.scss";
import "../scss/sidebar.scss";
import "../scss/team-members.scss";
import "../scss/trending.scss";
import { inter } from "@/app/ui/fonts";
import Sidebar from "@/layout/MainLayout/Sidebar";
import Header from "@/layout/MainLayout/Header";

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
        <main className="overflow-x-hidden">
          <Sidebar />
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
