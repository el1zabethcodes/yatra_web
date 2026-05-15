"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const hidden = ["/login", "/signup", "/dashboard"];

export default function FooterGate() {
  const path = usePathname();
  const skip = hidden.some((p) => path === p || path.startsWith(p + "/"));
  if (skip) return null;
  return <Footer />;
}
