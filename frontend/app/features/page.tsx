import Header from "@/shared/layout/Header";
import FeaturesSection from "@/features/landing/FeaturesSection";

/**
 * СЃС‚РѕСЂС–РЅРєР° Р· РѕРїРёСЃРѕРј РјРѕР¶Р»РёРІРѕСЃС‚РµР№ РїР»Р°С‚С„РѕСЂРјРё
 */
export default function FeaturesPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FeaturesSection />
      </main>
    </div>
  );
}

