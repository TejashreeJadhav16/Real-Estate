import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";

// 1. Strapi API Endpoint Definition
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Navi Mumbai Real Estate" },
      { name: "description", content: "Talk to Navi Mumbai's most trusted real estate consultants." },
      { property: "og:title", content: "Contact Navi Mumbai Real Estate" },
      { property: "og:description", content: "Get in touch for personalized property advice in Navi Mumbai." },
    ],
  }),
  component: ContactPage,
});

interface EnquiryForm {
  fullName: string;
  email: string;
  phone: string;
  intent: "I want to Buy" | "I want to Rent" | "I want to Sell" | "Just exploring";
  message: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<EnquiryForm>({
    fullName: "",
    email: "",
    phone: "",
    intent: "I want to Buy",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. Updated Production Strapi Handler targeting /api/contacts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        data: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          intent: formData.intent,
          message: formData.message,
        },
      };

      // Changed endpoint route value from /api/enquiries down to /api/contacts
      const response = await fetch(`${STRAPI_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Strapi returned invalid response status: ${response.status}`);
      }

      setSubmitStatus("success");
      
      // Clear all fields on valid capture response
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        intent: "I want to Buy",
        message: "",
      });
    } catch (error) {
      console.error("Failed to sync message payload with Strapi database context:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            Let's find your <span className="text-gradient-gold">next address</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Reach out — a real human gets back within a few hours.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-5">
        {/* Info Cards */}
        <div className="space-y-6 lg:col-span-2">
          {[
            { i: MapPin, t: "Visit Us", d: "Plot 24, Sector 7, Kalamboli, Navi Mumbai 410210" },
            { i: Phone, t: "Call Us", d: "+91 98765 43210 · +91 98765 43211" },
            { i: Mail, t: "Email", d: "hello@nmredeals.com" },
            { i: Clock, t: "Hours", d: "Mon – Sat · 10:00 AM to 8:00 PM" },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <I className="h-5 w-5" />
              </span>
              <div>
                <div className="font-serif text-lg font-semibold">{t}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Form Block */}
        <div className="lg:col-span-3">
          {submitStatus === "success" ? (
            <div className="flex flex-col items-center justify-center text-center h-full rounded-3xl border border-primary/30 bg-card p-12 shadow-gold animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="h-16 w-16 text-primary stroke-[1.5]" />
              <h2 className="mt-6 font-serif text-3xl font-bold">Enquiry Sent Successfully!</h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Thank you for reaching out. Your specifications have been safely logged into our database, and our consultants will call you shortly.
              </p>
              <button 
                onClick={() => setSubmitStatus("idle")}
                className="mt-8 rounded-full border border-primary/40 px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form className="rounded-3xl border border-border bg-card p-8 shadow-gold" onSubmit={handleSubmit}>
              <h2 className="font-serif text-2xl font-bold">Tell us what you're looking for</h2>
              
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input 
                  required 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition" 
                />
                <input 
                  required 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition" 
                />
                <input 
                  required 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (e.g. +91...)" 
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition" 
                />
                <select 
                  name="intent"
                  value={formData.intent}
                  onChange={handleChange}
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary cursor-pointer transition"
                >
                  <option value="I want to Buy">I want to Buy</option>
                  <option value="I want to Rent">I want to Rent</option>
                  <option value="I want to Sell">I want to Sell</option>
                  <option value="Just exploring">Just exploring</option>
                </select>
              </div>

              <textarea 
                rows={5} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your dream property (preferred sectors, budget boundaries, square footage requirements...)" 
                className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition resize-none" 
              />

              {submitStatus === "error" && (
                <p className="mt-4 text-sm text-destructive font-medium">
                  Failed to process. Please ensure your local Strapi server container is active or public API token boundaries are accessible.
                </p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}