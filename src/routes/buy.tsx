import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SlidersHorizontal, RotateCcw, Loader2 } from "lucide-react";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

type PropertySearchFilters = {
  locality?: string;
  type?: string;
  budget?: string;
  bhk?: string;
};

export const Route = createFileRoute("/buy")({
  validateSearch: (search: Record<string, unknown>): PropertySearchFilters => {
    return {
      locality: (search.locality as string) || "All",
      type: (search.type as string) || "All",
      budget: (search.budget as string) || "All",
      bhk: (search.bhk as string) || "All",
    };
  },
  head: () => ({
    meta: [
      { title: "Buy Property in Navi Mumbai — Verified Listings" },
      { name: "description", content: "Browse verified residential properties for sale across Navi Mumbai." },
      { property: "og:title", content: "Buy Property in Navi Mumbai" },
      { property: "og:description", content: "Premium homes for sale, RERA-verified." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const searchFilters = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let url = `${STRAPI_URL}/api/properties?populate=*`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setProperties(json.data || []);
      } catch (error) {
        console.error("Failed to load properties from Strapi container context:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((item) => {
    // Strapi v5 delivers the payload flat on the object row directly
    const property = item.attributes ? { id: item.id, ...item.attributes } : { id: item.id, ...item };

    // FILTER 0: Only display purchase listings
    if (property.purpose !== "Buy") return false;

    // FILTER 1: Locality Match
    if (searchFilters.locality && searchFilters.locality !== "All" && property.locality !== searchFilters.locality) {
      return false;
    }

    // FILTER 2: Type Match
    if (searchFilters.type && searchFilters.type !== "All" && property.type !== searchFilters.type) {
      return false;
    }

    // FILTER 3: BHK Configuration Match
    if (searchFilters.bhk && searchFilters.bhk !== "All" && property.beds !== searchFilters.bhk) {
      return false;
    }

    // FILTER 4: Budget Range Match (Evaluating base prices stored in Lakhs)
    if (searchFilters.budget && searchFilters.budget !== "All") {
      const budget = searchFilters.budget;
      const basePrice = property.priceRaw;
      if (budget === "Under ₹1 Cr" && basePrice >= 100) return false;
      if (budget === "₹1 – 3 Cr" && (basePrice < 100 || basePrice > 300)) return false;
      if (budget === "₹3 Cr+" && basePrice <= 300) return false;
    }

    return true;
  });

  const handleFilterChange = (key: keyof PropertySearchFilters, value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value === "All" || value === "" ? undefined : value,
      }),
    });
  };

  const handleReset = () => {
    navigate({ search: () => ({}) });
  };

  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Properties for Sale</p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            Buy a Home in <span className="text-gradient-gold">Navi Mumbai</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Handpicked, verified, and ready when you are.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Search Filter Bar Component Row */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <select 
            value={searchFilters.locality || "All"} 
            onChange={(e) => handleFilterChange("locality", e.target.value)}
            className="rounded-lg bg-background border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition"
          >
            <option value="All">All Locations</option>
            <option value="NODE_Kharghar">Kharghar</option>
            <option value="NODE_Vashi">Vashi</option>
            <option value="NODE_Seawoods">Seawoods</option>
            <option value="NODE_Nerul">Nerul</option>
            <option value="NODE_Panvel">Panvel</option>
            <option value="NODE_Ulwe">Ulwe</option>
            <option value="NODE_Belapur">Belapur</option>
          </select>

          <select 
            value={searchFilters.type || "All"} 
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="rounded-lg bg-background border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition"
          >
            <option value="All">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Plot">Plot</option>
          </select>

          <select 
            value={searchFilters.budget || "All"} 
            onChange={(e) => handleFilterChange("budget", e.target.value)}
            className="rounded-lg bg-background border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition"
          >
            <option value="All">Any Budget</option>
            <option value="Under ₹1 Cr">Under ₹1 Cr</option>
            <option value="₹1 – 3 Cr">₹1 – 3 Cr</option>
            <option value="₹3 Cr+">₹3 Cr+</option>
          </select>

          <select 
            value={searchFilters.bhk || "All"} 
            onChange={(e) => handleFilterChange("bhk", e.target.value)}
            className="rounded-lg bg-background border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition"
          >
            <option value="All">Any BHK</option>
            <option value="BHK_1">1 BHK</option>
            <option value="BHK_2">2 BHK</option>
            <option value="BHK_3">3 BHK</option>
            <option value="BHK_4_Plus">4+ BHK</option>
          </select>

          <button 
            onClick={handleReset}
            className="ml-auto inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* Property Cards Render Pipeline Grid */}
        {loading ? (
          <div className="mt-20 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Fetching listings from database...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((item) => {
              const p = item.attributes ? { id: item.id, ...item.attributes } : { id: item.id, ...item };
              
              const fallbackImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
              let computedImage = fallbackImg;

              // ✅ STRAPI v5 MATCHING: Extracting directly from flat relation array structure
              if (p.image && Array.isArray(p.image) && p.image.length > 0) {
                const firstImage = p.image[0];
                if (firstImage.url) {
                  computedImage = `${STRAPI_URL}${firstImage.url}`;
                }
              }

              // Transform ugly backend Enum tags to clean string UI labels
              const cleanLocalityLabel = p.locality ? p.locality.replace("NODE_", "") : "Navi Mumbai";
              const cleanBhkNumber = p.beds ? parseInt(p.beds.replace("BHK_", ""), 10) || 2 : 2;

              return (
                <PropertyCard 
                  key={p.id} 
                  p={{ 
                    ...p, 
                    location: `${p.location || ""}, ${cleanLocalityLabel}`,
                    beds: cleanBhkNumber,
                    image: computedImage 
                  }} 
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-16 text-center py-12 border border-dashed border-border rounded-2xl">
            <SlidersHorizontal className="mx-auto h-10 w-10 text-muted-foreground/60 stroke-[1.5]" />
            <h3 className="mt-4 font-serif text-xl font-semibold">No properties match your filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try loosening your search criteria or hit reset to clear everything.</p>
          </div>
        )}
      </section>
    </>
  );
}