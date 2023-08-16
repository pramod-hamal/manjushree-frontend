import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../antd.min.css";

import StoreProvider from "@/store/providerleanq_support_coordinator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Support Coordinator",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " " + "m-0"}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
