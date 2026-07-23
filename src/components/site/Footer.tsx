import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        
        {/* Company */}
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            Navi Mumbai{" "}
            <span className="text-gradient-gold">Real Estate</span>
          </h3>

          <p className="mt-4 text-sm text-muted-foreground">
            Your trusted partner for buying, selling and renting premium
            properties across Navi Mumbai.
          </p>

          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/buy" className="hover:text-primary">
                Buy Property
              </Link>
            </li>

            <li>
              <Link to="/rent" className="hover:text-primary">
                Rent Property
              </Link>
            </li>

            <li>
              <Link to="/blogs" className="hover:text-primary">
                Blogs
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Top Locations
          </h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Kharghar</li>
            <li>Vashi</li>
            <li>Seawoods</li>
            <li>Nerul</li>
            <li>Panvel</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Get in Touch
          </h4>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Kalmboli, Navi Mumbai
            </li>

            <li className="flex gap-2">
              <Phone className="h-4 w-4 text-primary" />
              +91 98765 43210
            </li>

            <li className="flex gap-2">
              <Mail className="h-4 w-4 text-primary" />
              hello@nmredeals.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Navi Mumbai Real Estate. All rights reserved.
      </div>
    </footer>
  );
}