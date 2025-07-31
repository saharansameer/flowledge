import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/Layout/HeroSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <HeroSection />
    </div>
  );
}
