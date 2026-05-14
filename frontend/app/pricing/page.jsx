import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import YatraPricing from "@/components/YatraPricing";

export default function PricingPage() {
  return (
    <div className="bg-[#E9E6D1] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <YatraPricing />
      </div>
    </div>
  );
}
