import type { Metadata } from "next";
import { spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataForge - Generate Fake Data Instantly",
  description: "Generate customizable and realistic fake data for applications, websites, and simulation needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
