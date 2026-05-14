import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/shared/lib/AuthContext";
import FooterGate from "@/shared/layout/FooterGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yatra | Спокійна навігація кар'єрою",
  description: "Преміальна платформа для планування кар'єри студентів на базі ШІ.",
};

/**
 * головний макет застосунку
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased font-sans text-primary bg-background selection:bg-surface selection:text-primary">
        <AuthProvider>
          {children}
          <FooterGate />
        </AuthProvider>
      </body>
    </html>
  );
}

