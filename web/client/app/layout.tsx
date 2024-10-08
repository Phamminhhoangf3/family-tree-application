import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/components/header.css";
import "@/styles/components/body.css";
import "@/styles/components/footer.css";
import "@/styles/components/section-1.css";
import "@/styles/components/section-2.css";
import "@/styles/components/member.css";
import "@/styles/components/tree.css";
import "@/styles/components/form-page.css";
import "@/styles/components/form-content.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
