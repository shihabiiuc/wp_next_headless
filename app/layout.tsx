import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./global.css";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: { default: "Shihabiiuc", template: "%s | Shihabiiuc" },
  description: "Headless WordPress powered by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <SiteHeader />

        <main>{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
