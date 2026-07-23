import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Account Portal — Navi Mumbai Real Estate" },
      { name: "description", content: "Access your dashboard, manage property listings, and connect with premium buyers." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form States
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [formError, setFormError] = useState<string | null>(null);

  // Handle User Log In
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginForm.email,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Invalid email or password combination.");
      }

      // ✅ SUCCESS: Store the session data in LocalStorage
      localStorage.setItem("authToken", data.jwt);
      localStorage.setItem("username", data.user.username);

      // Fire global storage update event to instantly alert the Header component
      window.dispatchEvent(new Event("storage"));

      // Redirect user back to Home Page
      navigate({ to: "/" });
    } catch (err: any) {
      console.error("Login Error:", err);
      setFormError(err.message || "Something went wrong during login verification.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle User Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    if (registerForm.password !== registerForm.confirmPassword) {
      setFormError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerForm.name, // Display username saved to Strapi Manager
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Registration failed.");
      }

      // ✅ SUCCESS: Save registered session token 
      localStorage.setItem("authToken", data.jwt);
      localStorage.setItem("username", data.user.username);

      window.dispatchEvent(new Event("storage"));

      // Redirect user to Home Page
      navigate({ to: "/" });
    } catch (err: any) {
      console.error("Registration Error:", err);
      setFormError(err.message || "Account creation rejected by server parameters.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setFormError(null);
    try {
      // Points straight to your Strapi OAuth initial provider route redirect entrypoint
      window.location.href = `${STRAPI_URL}/api/connect/google`;
    } catch (err) {
      setFormError("Google provider sequence dropped connection.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-gold relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Toggle Switch Tabs */}
        <div className="flex rounded-xl bg-background p-1.5 border border-border/60 mb-8">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setFormError(null); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition duration-200 ${
              activeTab === "login" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn className="h-4 w-4" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("register"); setFormError(null); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition duration-200 ${
              activeTab === "register" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus className="h-4 w-4" /> Register
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5">
            {activeTab === "login" ? "Access verified properties across Navi Mumbai." : "List your space and connect with active local real estate investors."}
          </p>
        </div>

        {formError && (
          <p className="text-xs text-destructive font-medium border border-destructive/20 bg-destructive/5 rounded-xl p-3 mb-4 animate-in shake-x duration-300">
            ⚠️ {formError}
          </p>
        )}

        {/* Social Authentication */}
        <button
          type="button"
          disabled={isLoading || isGoogleLoading}
          onClick={handleGoogleAuth}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background hover:bg-muted/50 py-3 text-sm font-medium text-foreground transition duration-200 disabled:opacity-50"
        >
          {isGoogleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.932 11.932 0 0 0 12 .909a11.94 11.94 0 0 0-8.66 3.703z" />
              <path fill="#4285F4" d="M23.455 12.273c0-.818-.073-1.609-.209-2.373H12v4.509h6.418a5.486 5.486 0 0 1-2.382 3.6l3.7 2.873c2.164-1.991 3.418-4.918 3.418-8.609z" />
              <path fill="#FBBC05" d="M3.34 15.645A11.854 11.854 0 0 0 12 23.091c3.245 0 5.973-1.073 7.964-2.918l-3.7-2.873a7.127 7.127 0 0 1-4.264 1.191 7.077 7.077 0 0 1-6.734-4.855z" />
              <path fill="#34A853" d="M3.34 8.355l-3.7-2.873A11.944 11.944 0 0 0 .91 12c0 2.509.773 4.836 2.1 6.773z" />
            </svg>
          )}
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-border/60" />
          <span className="flex-shrink mx-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 bg-card px-1">Or</span>
          <div className="flex-grow border-t border-border/60" />
        </div>

        {/* Local Email Forms */}
        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <input required type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="name@example.com" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative flex items-center">
                <input required type={showPassword ? "text" : "password"} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" className="w-full rounded-lg border border-border bg-background pl-4 pr-11 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-muted-foreground/60 hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <button type="submit" disabled={isLoading || isGoogleLoading} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-gold hover:opacity-95 disabled:opacity-50">
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Logging in...</> : "Account Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
              <input required type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <input required type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} placeholder="name@example.com" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative flex items-center">
                <input required type={showPassword ? "text" : "password"} value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} placeholder="Minimum 6 characters" className="w-full rounded-lg border border-border bg-background pl-4 pr-11 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-muted-foreground/60 hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</label>
              <input required type="password" value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} placeholder="Re-enter password" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition" />
            </div>
            <button type="submit" disabled={isLoading || isGoogleLoading} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-gold hover:opacity-95 disabled:opacity-50">
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating Account...</> : "Register Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}