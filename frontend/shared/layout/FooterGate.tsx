"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

/**
 * компонент для вибіркового показу підвалу
 * не показуємо підвал у дашборді
 */
export default function FooterGate() {
  const pathname = usePathname();
  
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  if (isDashboard || isLogin) return null;

  return <Footer />;
}

