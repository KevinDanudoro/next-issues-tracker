import "@radix-ui/themes/styles.css";
import "./theme.config.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from "@radix-ui/themes";
import NotifContextProvider from "@/context/NotifContext";
import Notif from "@/components/Notif";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issues Tracker",
  description: "Track any issue you create",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <NotifContextProvider>
          <Theme appearance="light" accentColor="brown">
            <Notif />
            <main>{children}</main>
          </Theme>
        </NotifContextProvider>
      </body>
    </html>
  );
}
