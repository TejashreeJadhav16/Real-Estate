import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Building2, Plus, CheckCircle2, Loader2, Image as ImageIcon, X } from "lucide-react";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const Route = createFileRoute("/add-property")({
  head: () => ({
    meta: [
      { title: "List Your Property — Navi Mumbai Real Estate" },
      { name: "description", content: "Sell or Rent your property in Navi Mumbai with zero hassle." },
    ],
  }),
  component: AddPropertyPage,
});

const LOCALITY_OPTIONS = [
  { value: "NODE_Kharghar", label: "Kharghar" },
  { value: "NODE_Vashi", label: "Vashi" },
  { value: "NODE_Seawoods", label: "Seawoods" },
  { value: "NODE_Nerul", label: "Nerul" },
  { value: "NODE_Panvel", label: "Panvel" },
  { value: "NODE_Ulwe", label: "Ulwe" },
  { value: "NODE_Belapur", label: "Belapur" },
] as const;

const BHK_OPTIONS = [
  { value: "BHK_1", label: "1 BHK" },
  { value: "BHK_2", label: "2 BHK" },
  { value: "BHK_3", label: "3 BHK" },
  { value: "BHK_4_Plus", label: "4+ BHK" },
] as const;

interface PropertyForm {
  title: string;
  purpose: "Buy" | "Rent";
  locality: string;
  location: string;
  type: "Apartment" | "Villa" | "Penthouse" | "Plot";
  priceValue: string;
  beds: string;
  baths: string;
  area: string;
}

function AddPropertyPage() {
  const [formData, setFormData] = useState<PropertyForm>({
    title: "",
    purpose: "Buy",
    locality: "NODE_Kharghar",
    location: "",
    type: "Apartment",
    priceValue: "",
    beds: "BHK_2",
    baths: "2",
    area: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [strapiErrorMessage, setStrapiErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value,
      ...(name === "purpose" ? { priceValue: "" } : {})
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeSelectedImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStrapiErrorMessage(null);

    try {
      let uploadedImageIdsArray: number[] = [];

      // STEP 1: Upload Image file to the media asset library
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("files", selectedFile);

        const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
          method: "POST",
          body: fileData,
        });

        if (!uploadResponse.ok) {
          const uploadErr = await uploadResponse.json();
          throw new Error(uploadErr?.error?.message || "Image asset rejected by Strapi media configuration parameters.");
        }

        const uploadJson = await uploadResponse.json();
        if (uploadJson && uploadJson[0]?.id) {
          uploadedImageIdsArray.push(uploadJson[0].id);
        }
      }

      // Compute display layout price labels
      const numericPrice = parseFloat(formData.priceValue) || 0;
      const numericBaths = parseInt(formData.baths, 10) || 0;

      let computedPriceString = "";
      if (formData.purpose === "Rent") {
        computedPriceString = `₹${numericPrice.toLocaleString("en-IN")}/mo`;
      } else {
        if (numericPrice >= 100) {
          computedPriceString = `₹${(numericPrice / 100).toFixed(1).replace(/\.0$/, "")} Cr`;
        } else {
          computedPriceString = `₹${numericPrice} L`;
        }
      }

      // STEP 2: Wrap fields inside a strict 'data' block container to satisfy the Strapi parser
      const payload = {
        data: {
          title: formData.title,
          purpose: formData.purpose,
          type: formData.type,
          locality: formData.locality,
          location: formData.location,
          price: computedPriceString,
          priceRaw: numericPrice,
          beds: formData.beds,
          baths: numericBaths,
          area: `${formData.area} sqft`,
          // Maps to Multiple Media relation values cleanly as an array sequence
          image: selectedFile ? uploadedImageIdsArray : [],
        },
      };

      const response = await fetch(`${STRAPI_URL}/api/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Forces router to parse body as clean JSON
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json();
        const details = errJson?.error?.details?.errors 
          ? errJson.error.details.errors.map((d: any) => `${d.path.join('.')}: ${d.message}`).join(', ')
          : errJson?.error?.message;
          
        throw new Error(details || `HTTP validation exception code: ${response.status}`);
      }

      setSubmitStatus("success");
      removeSelectedImage();
      setFormData({
        title: "", purpose: "Buy", locality: "NODE_Kharghar", location: "",
        type: "Apartment", priceValue: "", beds: "BHK_2", baths: "2", area: ""
      });
    } catch (error: any) {
      console.error(error);
      setStrapiErrorMessage(error.message || "An unexpected system initialization fault occurred.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">List Your Property</p>
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">
            Post Your <span className="text-gradient-gold">Space</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        {submitStatus === "success" ? (
          <div className="flex flex-col items-center justify-center text-center rounded-3xl border border-primary/30 bg-card p-12 shadow-gold animate-in fade-in zoom-in-95 duration-300">
            <CheckCircle2 className="h-16 w-16 text-primary stroke-[1.5]" />
            <h2 className="mt-6 font-serif text-2xl font-bold">Listing Live!</h2>
            <button onClick={() => setSubmitStatus("idle")} className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90">
              List Another Property
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-gold space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Property Information</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Property Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Premium Sea-Facing 3 BHK Apartment" className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Listing Purpose</label>
                <select name="purpose" value={formData.purpose} onChange={handleChange} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition">
                  <option value="Buy">For Sale (Buy)</option>
                  <option value="Rent">For Rent</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Property Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition">
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary Node (Locality)</label>
                <select name="locality" value={formData.locality} onChange={handleChange} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition">
                  {LOCALITY_OPTIONS.map((loc) => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detailed Address</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Sector 20, Near Central Park" className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {formData.purpose === "Buy" ? "Target Asking Price (In Lakhs)" : "Monthly Rent Amount (In Absolute Rupees)"}
                </label>
                <input required type="number" name="priceValue" value={formData.priceValue} onChange={handleChange} placeholder={formData.purpose === "Buy" ? "e.g., 150" : "e.g., 35000"} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Configuration (BHK)</label>
                <select name="beds" value={formData.beds} onChange={handleChange} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary cursor-pointer transition">
                  {BHK_OPTIONS.map((bhk) => (
                    <option key={bhk.value} value={bhk.value}>{bhk.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bathrooms</label>
                <input required type="number" name="baths" min="0" value={formData.baths} onChange={handleChange} className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Carpet Area (sqft)</label>
                <input required type="number" name="area" value={formData.area} onChange={handleChange} placeholder="e.g., 1250" className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Property Showcase Image</label>
                {imagePreview ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted animate-in fade-in duration-200">
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    <button type="button" onClick={removeSelectedImage} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white hover:bg-black transition">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 bg-background/50 hover:bg-background hover:border-primary/50 cursor-pointer transition text-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/60 mb-2" />
                    <span className="text-sm font-medium text-foreground">Click to upload property photo</span>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>
                )}
              </div>
            </div>

            {submitStatus === "error" && (
              <div className="text-sm text-destructive font-medium border border-destructive/20 bg-destructive/5 rounded-xl p-4 animate-in shake-x duration-300">
                <strong>Strapi Rejection Reason:</strong>
                <p className="font-mono text-xs mt-1 bg-background p-2 rounded border border-border text-foreground select-text">
                  {strapiErrorMessage}
                </p>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-gold disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Plus className="h-4 w-4" /> Submit Property</>}
            </button>
          </form>
        )}
      </section>
    </>
  );
}