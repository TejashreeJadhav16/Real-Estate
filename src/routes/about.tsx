import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Building2, Users, HeartHandshake, Target, Eye } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Navi Mumbai Real Estate" },
      { name: "description", content: "15+ years of helping families and investors find their perfect property in Navi Mumbai." },
      { property: "og:title", content: "About Navi Mumbai Real Estate" },
      { property: "og:description", content: "Your trusted partner for premium real estate in Navi Mumbai." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">About Us</p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            Building Trust, <span className="text-gradient-gold">One Home at a Time</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            For over fifteen years we've been the quiet force behind thousands of property decisions in Navi Mumbai — from first homes in Kharghar to sea-facing penthouses in Seawoods.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Our team" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-gold" />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">A local team with <span className="text-gradient-gold">global standards</span></h2>
          <p className="mt-5 text-muted-foreground">
            Founded in 2010 by a small team of CIDCO-bred property advisors, we've grown into one of Navi Mumbai's most-referred real estate brands. Every listing is personally verified. Every client is treated like family.
          </p>
          <p className="mt-4 text-muted-foreground">
            We believe property buying should be transparent, simple, and even joyful — and we've built our entire process around that belief.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-3">
          {[
            { i: Target, t: "Our Mission", d: "To make every real estate decision in Navi Mumbai informed, transparent, and profitable." },
            { i: Eye, t: "Our Vision", d: "To be the most trusted real estate brand in Maharashtra by 2030 — built on integrity, not advertising." },
            { i: HeartHandshake, t: "Our Values", d: "Honesty over closure. People over commissions. Long-term relationships over short-term wins." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><I /></span>
              <h3 className="mt-5 font-serif text-xl font-bold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { i: Award, n: "15+", l: "Years of Experience" },
            { i: Users, n: "5,200+", l: "Happy Families" },
            { i: Building2, n: "800+", l: "Properties Closed" },
            { i: HeartHandshake, n: "98%", l: "Client Referrals" },
          ].map(({ i: I, n, l }) => (
            <div key={l} className="rounded-2xl border border-border bg-card p-8 text-center">
              <I className="mx-auto h-8 w-8 text-primary" />
              <div className="mt-4 font-serif text-4xl font-bold text-gradient-gold">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="font-serif text-3xl font-bold md:text-4xl">Come visit our <span className="text-gradient-gold">Kharghar office</span></h2>
        <p className="mt-4 text-muted-foreground">Tea is always on. Bring your questions — we'll bring honest answers.</p>
        <Link to="/contact" className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-gold">Get in Touch</Link>
      </section>
    </>
  );
}