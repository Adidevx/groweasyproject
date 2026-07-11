import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "GrowEasy AI CSV Importer",
  description:
    "AI powered CSV lead importer for GrowEasy CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
