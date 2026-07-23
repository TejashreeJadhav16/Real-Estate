import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Home, LogIn, User, LogOut } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/buy", label: "Buy" },
  { to: "/rent", label: "Rent" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Read current active session state dynamically
  const checkAuthSession = () => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  };

  useEffect(() => {
    // Run evaluation instantly on mount
    checkAuthSession();

    // Listen for local tab events fired on auth completion
    window.addEventListener("storage", checkAuthSession);
    return () => window.removeEventListener("storage", checkAuthSession);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUsername(null);
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-primary/40 bg-primary/10">
            <Home className="h-5 w-5 text-primary" />
          </span>
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold text-foreground">Navi Mumbai</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Real Estate</div>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Call To Actions Row */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/add-property"
            className="rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
          >
            Add Property
          </Link>

          {/* ✅ DYNAMIC CONDITION: Render Username or Sign In Button */}
          {username ? (
            <div className="flex items-center gap-3 bg-muted/60 pl-3 pr-4 py-1.5 rounded-full border border-border">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {username.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                Hi, {username}
              </span>
              <button 
                onClick={handleLogout} 
                title="Log Out"
                className="text-muted-foreground hover:text-destructive p-1 transition ml-1"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Action Menu Burger */}
        <button className="md:hidden text-foreground p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {open && (
        <div className="border-t border-border/60 md:hidden bg-background animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col px-6 py-6 gap-3">
            {username && (
              <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl border border-primary/20 mb-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {username.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-foreground">Logged in as {username}</span>
              </div>
            )}

            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-muted-foreground text-sm font-medium hover:text-primary transition">
                {l.label}
              </Link>
            ))}
            
            <hr className="border-border/60 my-1" />
            
            <Link to="/add-property" onClick={() => setOpen(false)} className="flex items-center justify-center rounded-xl border border-primary/30 py-3 text-primary text-sm font-semibold">
              Add Your Property
            </Link>

            {username ? (
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-xl border border-destructive/30 text-destructive py-3 text-sm font-semibold hover:bg-destructive/5 transition"
              >
                <LogOut className="h-4 w-4" /> Sign Out Account
              </button>
            ) : (
              <Link to="/sign-in" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-gold">
                <LogIn className="h-4 w-4" /> Sign In Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}