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
  title: "Yatra | РЎРїРѕРєС–Р№РЅР° РЅР°РІС–РіР°С†С–СЏ РєР°СЂ'С”СЂРѕСЋ",
  description: "РџСЂРµРјС–Р°Р»СЊРЅР° РїР»Р°С‚С„РѕСЂРјР° РґР»СЏ РїР»Р°РЅСѓРІР°РЅРЅСЏ РєР°СЂ'С”СЂРё СЃС‚СѓРґРµРЅС‚С–РІ РЅР° Р±Р°Р·С– РЁР†.",
};

/**
 * РіРѕР»РѕРІРЅРёР№ РјР°РєРµС‚ Р·Р°СЃС‚РѕСЃСѓРЅРєСѓ
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

