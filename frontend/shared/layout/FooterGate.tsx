"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

/**
 * РєРѕРјРїРѕРЅРµРЅС‚ РґР»СЏ РІРёР±С–СЂРєРѕРІРѕРіРѕ РїРѕРєР°Р·Сѓ РїС–РґРІР°Р»Сѓ
 * РЅРµ РїРѕРєР°Р·СѓС”РјРѕ РїС–РґРІР°Р» Сѓ РґР°С€Р±РѕСЂРґС–
 */
export default function FooterGate() {
  const pathname = usePathname();
  
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  if (isDashboard || isLogin) return null;

  return <Footer />;
}

