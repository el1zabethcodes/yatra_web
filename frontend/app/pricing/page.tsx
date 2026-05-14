import Header from "@/shared/layout/Header";
import YatraPricing from "@/features/landing/YatraPricing";

/**
 * СЃС‚РѕСЂС–РЅРєР° Р· С‚Р°СЂРёС„РЅРёРјРё РїР»Р°РЅР°РјРё
 */
export default function PricingPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <YatraPricing />
      </main>
    </div>
  );
}

