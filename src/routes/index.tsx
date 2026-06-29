import { createFileRoute } from '@tanstack/react-router';
import {
  CapabilitiesGrid,
  CtaSection,
  HeroSection,
  MetricsBar,
  ProductGrid,
  Testimonials,
} from '#/components/sections/index.ts';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <main>
      <HeroSection />
      <MetricsBar />
      <ProductGrid />
      <CapabilitiesGrid />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
