import { createFileRoute } from "@tanstack/react-router";
import { blogs } from "@/data/properties";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Real Estate Blog — Navi Mumbai Property Insights" },
      { name: "description", content: "Market trends, legal guides, investment tips and locality reviews for Navi Mumbai." },
      { property: "og:title", content: "Navi Mumbai Real Estate Blog" },
      { property: "og:description", content: "Insights and guides for property buyers, sellers and investors." },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const [featured, ...rest] = blogs;
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Journal</p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            Real Estate <span className="text-gradient-gold">Insights</span>
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <article className="grid gap-8 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
          <img src={featured.image} alt={featured.title} className="aspect-[4/3] w-full object-cover lg:aspect-auto" />
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="text-xs uppercase tracking-wider text-primary">{featured.category} · {featured.date}</div>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <button className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary">Read article <ArrowRight className="h-4 w-4" /></button>
          </div>
        </article>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rest.map(b => (
            <article key={b.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={b.image} alt={b.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-primary">{b.category} · {b.date}</div>
                <h3 className="mt-2 font-serif text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{b.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}