import type { Metadata } from "next";
import { Poppins, Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const primary = Poppins({
  weight: ["400", "700", "100", "200", "300", "500", "600", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const secondry = Lexend({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese", "latin-ext"],
});

export const metadata: Metadata = {
  title: "postier",
  description: "Auto-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Postier</title>
        </head>
        <body
          className={`${primary.className} ${secondry.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
