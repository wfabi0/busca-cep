import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getCookie } from "@/modules/theme/theme-server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Busca CEP",
  description: "Site para realizar busca de CEP.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = await getCookie();
  return (
    <html lang="en" className={cookies === "dark" ? "dark" : ""}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
