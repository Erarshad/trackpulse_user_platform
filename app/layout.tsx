import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {appName} from "./global_const";

const inter = Inter({ subsets: ["latin"], variable:'--font-inter'});




export const metadata: Metadata = {
  title: appName,
  description: "A next generation lead tracker platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={`${inter.variable}  font-sans`}>{children}</body>
    </html>
  );
}
