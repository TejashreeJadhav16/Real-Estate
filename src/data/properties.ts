export interface Property {
  id: string;
  title: string;
  location: string;
  locality: "Kharghar" | "Vashi" | "Seawoods" | "Belapur" | "Nerul" | "Ulwe" | "Panvel" | "Ghansoli";
  type: "Apartment" | "Villa" | "Penthouse" | "Plot";
  price: string;       // For UI display
  priceRaw: number;    // For logic (In Lakhs for Buy, in absolute Rupees for Rent)
  image: string;
  beds: number;
  baths: number;
  area: string;
  tag?: string;
}

export const buyProperties: Property[] = [
  { 
    id: "b1", 
    title: "Luxury 4 BHK Villa", 
    location: "Seawoods, Navi Mumbai", 
    locality: "Seawoods",
    type: "Villa",
    price: "₹6.5 Cr", 
    priceRaw: 650, // 6.5 Cr = 650 Lakhs
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", 
    beds: 4, 
    baths: 5, 
    area: "3200 sqft", 
    tag: "Featured" 
  },
  { 
    id: "b2", 
    title: "Premium 3 BHK Apartment", 
    location: "Kharghar, Sector 35", 
    locality: "Kharghar",
    type: "Apartment",
    price: "₹2.8 Cr", 
    priceRaw: 280, 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", 
    beds: 3, 
    baths: 3, 
    area: "1850 sqft", 
    tag: "Ready to Move" 
  },
  { 
    id: "b3", 
    title: "Modern Sea-view Penthouse", 
    location: "Belapur, Navi Mumbai", 
    locality: "Belapur",
    type: "Penthouse",
    price: "₹9.2 Cr", 
    priceRaw: 920, 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", 
    beds: 5, 
    baths: 6, 
    area: "4500 sqft", 
    tag: "Premium" 
  },
  { 
    id: "b4", 
    title: "Smart 2 BHK Residence", 
    location: "Vashi, Sector 17", 
    locality: "Vashi",
    type: "Apartment",
    price: "₹1.6 Cr", 
    priceRaw: 160, 
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", 
    beds: 2, 
    baths: 2, 
    area: "1100 sqft" 
  },
  { 
    id: "b5", 
    title: "Garden-facing 3 BHK Apartment", 
    location: "Nerul West", 
    locality: "Nerul",
    type: "Apartment",
    price: "₹2.1 Cr", 
    priceRaw: 210, 
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80", 
    beds: 3, 
    baths: 3, 
    area: "1650 sqft" 
  },
  { 
    id: "b6", 
    title: "Designer 4 BHK Sky Villa", 
    location: "Ulwe, Navi Mumbai", 
    locality: "Ulwe",
    type: "Villa",
    price: "₹3.4 Cr", 
    priceRaw: 340, 
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", 
    beds: 4, 
    baths: 4, 
    area: "2400 sqft", 
    tag: "New Launch" 
  },
];

export const rentProperties: Property[] = [
  { 
    id: "r1", 
    title: "Furnished 2 BHK Flat", 
    location: "Kharghar, Sector 20", 
    locality: "Kharghar",
    type: "Apartment",
    price: "₹45,000/mo", 
    priceRaw: 45000, 
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", 
    beds: 2, 
    baths: 2, 
    area: "1050 sqft", 
    tag: "Furnished" 
  },
  { 
    id: "r2", 
    title: "Spacious 3 BHK with Balcony", 
    location: "Vashi, Sector 9", 
    locality: "Vashi",
    type: "Apartment",
    price: "₹65,000/mo", 
    priceRaw: 65000, 
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", 
    beds: 3, 
    baths: 3, 
    area: "1450 sqft" 
  },
  { 
    id: "r3", 
    title: "Sea-view 4 BHK Penthouse", 
    location: "Seawoods", 
    locality: "Seawoods",
    type: "Penthouse",
    price: "₹1.8 L/mo", 
    priceRaw: 180000, 
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80", 
    beds: 4, 
    baths: 4, 
    area: "2600 sqft", 
    tag: "Luxury" 
  },
  { 
    id: "r4", 
    title: "Compact 1 BHK Studio", 
    location: "Panvel", 
    locality: "Panvel",
    type: "Apartment",
    price: "₹18,000/mo", 
    priceRaw: 180000, 
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", 
    beds: 1, 
    baths: 1, 
    area: "560 sqft" 
  },
  { 
    id: "r5", 
    title: "Family 3 BHK Apartment", 
    location: "Nerul East", 
    locality: "Nerul",
    type: "Apartment",
    price: "₹55,000/mo", 
    priceRaw: 55000, 
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", 
    beds: 3, 
    baths: 2, 
    area: "1400 sqft" 
  },
  { 
    id: "r6", 
    title: "Modern 2 BHK Near Metro", 
    location: "Ghansoli", 
    locality: "Ghansoli",
    type: "Apartment",
    price: "₹38,000/mo", 
    priceRaw: 38000, 
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80", 
    beds: 2, 
    baths: 2, 
    area: "980 sqft" 
  },
];

export const blogs = [
  { id: "p1", title: "Top 10 Localities to Invest in Navi Mumbai (2026)", excerpt: "From Kharghar to Ulwe — where the smart money is flowing this year.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80", date: "May 12, 2026", category: "Investment" },
  { id: "p2", title: "RERA Compliance: What Every Home Buyer Must Know", excerpt: "A no-nonsense guide to making sure your dream home is on the right side of the law.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", date: "Apr 30, 2026", category: "Legal" },
  { id: "p3", title: "Navi Mumbai International Airport — Property Impact", excerpt: "How NMIA is reshaping property prices in Ulwe, Panvel and Dronagiri.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80", date: "Apr 18, 2026", category: "Market" },
  { id: "p4", title: "Home Loan Hacks: Save Up to ₹15 Lakhs in Interest", excerpt: "Smart strategies to slash your EMI burden without compromising lifestyle.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", date: "Mar 28, 2026", category: "Finance" },
];

export const locations = [
  { name: "Kharghar", count: 248, image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80" },
  { name: "Vashi", count: 186, image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80" },
  { name: "Seawoods", count: 142, image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80" },
  { name: "Nerul", count: 198, image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80" },
  { name: "Panvel", count: 167, image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80" },
  { name: "Ulwe", count: 124, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80" },
];