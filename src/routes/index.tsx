import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react"; // Added for state management
import { Search, Star, Shield, BadgeCheck, Award, ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { buyProperties, locations, blogs } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Navi Mumbai Real Estate — Buy, Sell & Rent Premium Properties" },
      { name: "description", content: "Discover premium residential and commercial properties across Navi Mumbai. RERA-verified listings in Kharghar, Vashi, Seawoods & more." },
      { property: "og:title", content: "Navi Mumbai Real Estate — Premium Properties" },
      { property: "og:description", content: "Find your perfect home in Navi Mumbai with verified listings and zero brokerage." },
    ],
  }),
  component: Index,
});

function Index() {
  // 1. Dynamic States
  const [activeTab, setActiveTab] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("Any Budget");

  const tabs = ["Buy", "Rent", "Sell", "Commercial", "Plots/Land", "PG/Co-Living"];

  // 2. Search Submission Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", {
      type: activeTab,
      query: searchQuery,
      budget: budget
    });
    // You can redirect using TanStack router here, e.g.:
    // navigate({ to: '/properties', search: { type: activeTab, q: searchQuery, budget } })
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Star className="h-3 w-3 fill-primary" /> #1 Real Estate Portal in Navi Mumbai
          </div>
          <h1 className="mt-8 font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl">
            Find Your Perfect <br />
            <span className="text-gradient-gold">Space in Navi Mumbai</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Discover premium residential and commercial properties. Seamlessly buy, sell, or rent with
            Navi Mumbai's most trusted and experienced real estate experts.
          </p>

          {/* Dynamic Search Box */}
          <form onSubmit={handleSearch} className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-card/80 p-2 backdrop-blur shadow-gold">
            {/* Clickable Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-border px-4 pt-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeTab === t 
                      ? "border-b-2 border-primary text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Form Inputs */}
            <div className="flex flex-col gap-2 p-3 md:flex-row">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()} properties by locality, project or builder…`} 
                className="flex-1 rounded-lg bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40" 
              />
              <select 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="rounded-lg bg-background px-4 py-3 text-sm text-foreground outline-none cursor-pointer"
              >
                <option>Any Budget</option>
                <option>Under ₹50L</option>
                <option>₹50L – ₹1Cr</option>
                <option>₹1Cr – ₹3Cr</option>
                <option>₹3Cr+</option>
              </select>
              <button 
                type="submit" 
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </form>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[{n:"15+",l:"Years Experience"},{n:"5,200+",l:"Happy Families"},{n:"800+",l:"Verified Listings"},{n:"100%",l:"RERA Compliant"}].map(s => (
              <div key={s.l}>
                <div className="font-serif text-3xl font-bold text-gradient-gold md:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Buy Properties</p>
            <h2 className="font-serif text-3xl font-bold md:text-5xl">
              Verified Residential <span className="text-gradient-gold">Properties</span>
            </h2>
          </div>
          <Link to="/buy" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buyProperties.slice(0, 6).map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Locations */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Explore Locations</p>
            <h2 className="font-serif text-3xl font-bold md:text-5xl">Premium Nodes of <span className="text-gradient-gold">Navi Mumbai</span></h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
            {locations.map(loc => (
              <Link 
                key={loc.name} 
                to="/buy" 
                search={{ locality: loc.name }} // Dynamic search param passing
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <img src={loc.image} alt={loc.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-serif text-lg font-semibold">{loc.name}</div>
                  <div className="text-xs text-primary">{loc.count} Properties</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
            <h2 className="font-serif text-3xl font-bold md:text-5xl">
              Your Trusted Real Estate Partner in <span className="text-gradient-gold">Navi Mumbai</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              More than just consultants, we are your dedicated navigators in the complex world of property acquisition. With deep roots in the CIDCO planned city, we leverage RERA compliance and local insights to help you find your forever home.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                { i: Shield, t: "Verified & Legal Properties Only" },
                { i: BadgeCheck, t: "Zero Brokerage on New Projects" },
                { i: Award, t: "End-to-End Home Loan Assistance" },
                { i: Star, t: "Transparent & Honest Dealings" },
              ].map(({ i: I, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary"><I className="h-4 w-4" /></span>
                  <span className="text-foreground">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">Discover Our Journey</Link>
              <Link to="/contact" className="rounded-full border border-primary/40 px-6 py-3 text-sm font-medium text-primary">Talk to our experts</Link>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" alt="Luxury Navi Mumbai property" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-gold" />
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-6 shadow-gold">
              <div className="font-serif text-4xl font-bold text-gradient-gold">15+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Latest Insights</p>
              <h2 className="font-serif text-3xl font-bold md:text-5xl">From our <span className="text-gradient-gold">Journal</span></h2>
            </div>
            <Link to="/blogs" className="hidden text-sm font-medium text-primary md:inline">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {blogs.map(b => (
              <article key={b.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wider text-primary">{b.category} · {b.date}</div>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">{b.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-12 text-center shadow-gold md:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.78_0.13_85/0.15),transparent_60%)]" />
          <div className="relative">
            <h2 className="font-serif text-3xl font-bold md:text-5xl">Ready to find your <span className="text-gradient-gold">dream home?</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Talk to a Navi Mumbai real estate expert today. Zero brokerage on new projects.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-gold">
              Schedule a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}