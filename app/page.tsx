import LiquidMetalHero from "@/components/ui/liquid-metal-hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <LiquidMetalHero
        badge="Enterprise AI Solutions"
        title="Fluid Intelligence"
        subtitle="Unleashing the power of adaptive AI for modern enterprises. Seamlessly integrated, beautifully designed, and endlessly scalable."
        primaryCtaLabel="Get Started"
        secondaryCtaLabel="View Case Studies"
        features={[
          "Adaptive Models",
          "Real-time Analytics",
          "Secure Infrastructure"
        ]}
      />
    </main>
  );
}
