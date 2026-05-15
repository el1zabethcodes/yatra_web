"use client";

import { ComponentType, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/shared/lib/AuthContext";
import DashboardHeader from "@/features/dashboard/DashboardHeader";
import BottomNavBar from "@/features/dashboard/BottomNavBar";
import DashboardTab from "@/features/dashboard/DashboardTab";
import RoadmapTab from "@/features/dashboard/RoadmapTab";
import MentorTab from "@/features/dashboard/MentorTab";
import AccountTab from "@/features/dashboard/AccountTab";

export type DashboardTabKey = "dashboard" | "roadmap" | "mentor" | "account";

type DashboardTabComponent = ComponentType<{
  setActiveTab: (tab: DashboardTabKey) => void;
}>;

const TABS: Record<DashboardTabKey, DashboardTabComponent> = {
  dashboard: DashboardTab,
  roadmap: RoadmapTab,
  mentor: MentorTab,
  account: AccountTab,
};

/**
 * головна сторінка дашборду
 */
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>("dashboard");
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const ActiveComponent = TABS[activeTab];

  /* редирект на логін якщо не авторизований */
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-surface border-t-accent rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-primary">
      <DashboardHeader />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ActiveComponent setActiveTab={setActiveTab} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* плаваюча навігація */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(180deg,#FDFCFB_0%,#F7F4E8_100%)]" />
    </div>
  );
}

