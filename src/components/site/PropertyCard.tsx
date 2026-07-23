import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  area: string;
  tag?: string;
  type?: string;
}

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/60 hover:shadow-gold">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {p.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {p.tag}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-xs uppercase tracking-wider opacity-80">{p.type ?? "Residential"}</div>
          <div className="font-serif text-xl font-bold text-gradient-gold">{p.price}</div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" /> {p.location}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-primary" /> {p.beds} Beds</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-primary" /> {p.baths} Baths</span>
          <span className="flex items-center gap-1"><Maximize className="h-4 w-4 text-primary" /> {p.area}</span>
        </div>
      </div>
    </article>
  );
}