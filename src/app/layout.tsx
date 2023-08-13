import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/store/providerleanq_support_coordinator";
import StyledComponentsRegistry from "@/lib/AntDesignRegistryleanq_support_coordinator";

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
        <StoreProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
