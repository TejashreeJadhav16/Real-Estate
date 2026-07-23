import { createFileRoute } from "@tanstack/react-router";
import { PropertyCard } from "@/components/site/PropertyCard";
import { rentProperties } from "@/data/properties";

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Rent Property in Navi Mumbai — Verified Rentals" },
      { name: "description", content: "Find furnished and unfurnished rental homes across Navi Mumbai." },
      { property: "og:title", content: "Rent Property in Navi Mumbai" },
      { property: "og:description", content: "Verified rentals direct from owners." },
    ],
  }),
  component: RentPage,
});

function RentPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Rentals</p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            Homes to <span className="text-gradient-gold">Rent</span> in Navi Mumbai
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Move-in ready properties from verified owners.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rentProperties.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}