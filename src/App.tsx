import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Heart, Mail, MapPin, Menu, ShieldCheck, X } from "lucide-react";
import {
  BrandIcon,
  DonateActionLink,
  Logo,
  NewsletterForm,
  RouteLink,
  ShareButtons,
  type BrandName,
} from "./components";
import { SiteProvider, useSite } from "./SiteContext";
import { RouterContext, useRouter } from "./router";
import {
  NAV_ITEMS,
  PROGRAM_AREAS,
  ROUTE_META,
  safeExternalUrl,
  type RouteKey,
} from "./siteData";
import Home from "./pages/Home";
import About from "./pages/About";
import Stories from "./pages/Stories";
import Work from "./pages/Work";
import Donate from "./pages/Donate";
import ThankYou from "./pages/ThankYou";
import Transparency from "./pages/Transparency";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

const VALID_ROUTES = new Set(Object.keys(ROUTE_META));

const parseRoute = (): RouteKey => {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace(/^#\/?/, "").split(/[?&]/)[0].trim().toLowerCase();
  return VALID_ROUTES.has(raw) ? (raw as RouteKey) : "home";
};

function Header({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  const { route } = useRouter();
  const { content } = useSite();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      <div className="bg-forest-dark text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-5 py-2 text-center text-[11px] font-semibold text-white/75 sm:flex-row sm:px-8 sm:text-left">
          <span className="flex items-center gap-2"><ShieldCheck size={13} className="text-gold" /> <span className="sm:hidden">Verification-first wildlife conservation</span><span className="hidden sm:inline">Verification-first wildlife conservation · Placeholder content</span></span>
          <div className="hidden items-center gap-4 sm:flex">
            <a href={`mailto:${content.email}`} className="inline-flex items-center gap-1.5 transition hover:text-gold"><Mail size={12} /> {content.email}</a>
            <RouteLink to="admin" className="hidden transition hover:text-gold md:inline">Content Manager</RouteLink>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-forest/10 bg-white/92 shadow-[0_2px_20px_-10px_rgba(6,42,32,0.25)] backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <RouteLink
                key={item.key}
                to={item.key}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-bold transition ${route === item.key ? "bg-forest text-white shadow-md shadow-forest/20" : "text-ink/75 hover:bg-cream hover:text-forest"}`}
              >
                {item.label}
                {route === item.key && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold" />}
              </RouteLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <DonateActionLink
              aria-label="Donate now"
              className="btn-shine inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold px-4 text-xs font-extrabold uppercase tracking-[0.06em] text-forest-dark shadow-[0_12px_28px_-12px_rgba(232,184,75,0.85)] transition hover:-translate-y-0.5 hover:from-gold hover:to-gold-light sm:px-5 sm:text-sm"
            >
              <Heart size={16} fill="currentColor" /> Donate Now
            </DonateActionLink>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest transition hover:bg-cream lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function MobileMenu({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  const { route } = useRouter();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"] a, [role="dialog"] button'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, setMobileOpen]);

  // Trap focus to the menu while it is open
  useEffect(() => {
    if (mobileOpen) {
      const el = document.querySelector('[role="dialog"]');
      const first = el?.querySelector<HTMLElement>("a, button");
      first?.focus();
    }
  }, [mobileOpen]);

  if (!mobileOpen) return null;

  return (
    <div className="fixed inset-0 top-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-forest-dark/60 backdrop-blur-sm" />
      <div className="absolute left-0 right-0 top-0 flex max-h-[100dvh] flex-col rounded-b-[2rem] border-b border-forest/10 bg-white shadow-2xl">
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-dark">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest transition hover:bg-cream"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="hide-scrollbar grid gap-1.5 overflow-y-auto px-5 pb-6 pt-2">
          {NAV_ITEMS.map((item) => (
            <RouteLink
              key={item.key}
              to={item.key}
              onClick={() => setMobileOpen(false)}
              className={`flex min-h-14 items-center gap-3 rounded-2xl px-4 text-[15px] font-extrabold transition active:scale-[0.99] ${route === item.key ? "bg-forest text-white" : "text-forest-dark hover:bg-cream"}`}
            >
              <span className={`h-6 w-1 rounded-full ${route === item.key ? "bg-gold" : "bg-forest/15"}`} aria-hidden="true" />
              {item.label}
            </RouteLink>
          ))}
        </nav>
        <div className="safe-bottom grid gap-3 border-t border-forest/10 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <DonateActionLink onClick={() => setMobileOpen(false)} className="btn-shine flex min-h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold text-sm font-extrabold text-forest-dark">
            <Heart size={17} fill="currentColor" /> DONATE NOW
          </DonateActionLink>
          <RouteLink to="admin" onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center justify-center rounded-xl border border-forest/15 text-sm font-bold text-forest transition hover:bg-cream">
            Content Manager
          </RouteLink>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { content } = useSite();
  const instagram = safeExternalUrl(content.instagramUrl) || "https://www.instagram.com/";
  const socials: { name: BrandName; label: string; url: string }[] = [
    { name: "instagram", label: "Instagram", url: safeExternalUrl(content.instagramUrl) || "https://www.instagram.com/" },
    { name: "facebook", label: "Facebook", url: safeExternalUrl(content.facebookUrl) || "https://www.facebook.com/" },
    { name: "youtube", label: "YouTube", url: safeExternalUrl(content.youtubeUrl) || "https://www.youtube.com/" },
    { name: "twitter", label: "X / Twitter", url: safeExternalUrl(content.xUrl) || "https://x.com/" },
  ];

  return (
    <footer className="texture-grain relative overflow-hidden bg-forest-dark text-white">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      <div className="leaf-pattern absolute inset-0 opacity-50" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-gold/8 blur-3xl" />
      <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-forest-mid/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-8 text-white/65">
              Protecting wildlife from poaching, illegal captivity and exploitation. Caring for injured and abandoned animals. Giving wild lives a second chance.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/75 transition hover:border-gold hover:bg-gold hover:text-forest-dark"
                >
                  <BrandIcon name={social.name} size={18} />
                </a>
              ))}
            </div>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/60 px-5 text-xs font-extrabold uppercase tracking-[0.08em] text-gold-light transition hover:bg-gold hover:text-forest-dark"
            >
              <BrandIcon name="instagram" size={17} /> Follow our Instagram <ArrowUpRight size={14} />
            </a>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-light">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" /> Explore
            </h2>
            <nav aria-label="Footer navigation" className="mt-5 grid gap-2.5 text-sm text-white/70">
              {NAV_ITEMS.map((item) => (
                <RouteLink key={item.key} to={item.key} className="transition-colors hover:text-gold-light">{item.label}</RouteLink>
              ))}
              <DonateActionLink bare className="text-sm font-bold text-gold-light transition-colors hover:text-gold">Donate</DonateActionLink>
              <RouteLink to="admin" className="transition-colors hover:text-gold-light">Content Manager</RouteLink>
            </nav>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-light">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" /> Our work
            </h2>
            <div className="mt-5 grid gap-2.5 text-sm leading-6 text-white/70">
              {PROGRAM_AREAS.map((program) => (
                <RouteLink key={program.id} to="work" className="transition-colors hover:text-gold-light">{program.title}</RouteLink>
              ))}
            </div>
            <div className="mt-7 space-y-3 border-t border-white/10 pt-6 text-xs text-white/60">
              <a href={`mailto:${content.email}`} className="flex items-center gap-2 break-all transition hover:text-gold"><Mail size={14} /> {content.email}</a>
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {content.location}</p>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold">Stay connected</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">Sign up for future verified field notes and transparency updates.</p>
            <div className="mt-4"><NewsletterForm dark /></div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">Share this mission</p>
              <ShareButtons compact />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/12 pt-7 text-xs leading-6 text-white/50 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p>© {new Date().getFullYear()} {content.brand}. Editable website concept with placeholder content. No organizational credentials, partnerships or completed projects are claimed.</p>
            <p className="mt-1">Representative wildlife photography via Pexels contributors; images are not documentation of specific rescues. Payments are processed only on PayPal's hosted checkout.</p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <RouteLink to="transparency" className="font-bold text-white/70 transition hover:text-gold">Transparency</RouteLink>
            <RouteLink to="contact" className="font-bold text-white/70 transition hover:text-gold">Contact</RouteLink>
            <RouteLink to="admin" className="font-bold text-white/70 transition hover:text-gold">Edit content</RouteLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingDonate() {
  const { route } = useRouter();
  if (route === "donate" || route === "thankyou" || route === "admin") return null;
  return (
    <DonateActionLink
      bare
      ariaLabel="Donate now"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-forest-dark shadow-[0_18px_45px_-12px_rgba(11,61,46,0.7)] ring-4 ring-white/60 transition hover:-translate-y-1 hover:from-gold hover:to-gold-light [margin-bottom:env(safe-area-inset-bottom)] sm:bottom-6 sm:right-6 sm:px-6"
    >
      <Heart size={19} fill="currentColor" /> <span className="hidden min-[400px]:inline">Donate Now</span>
    </DonateActionLink>
  );
}

function AppShell() {
  const [route, setRoute] = useState<RouteKey>(parseRoute);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute());
      setMobileOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = ROUTE_META[route].title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", ROUTE_META[route].description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", ROUTE_META[route].title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", ROUTE_META[route].description);
    window.scrollTo(0, 0);
  }, [route]);

  const navigate = useCallback((to: RouteKey) => {
    const nextHash = `#/${to}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = `/${to}`;
    } else {
      setRoute(to);
    }
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, []);

  const routerValue = useMemo(() => ({ route, navigate }), [route, navigate]);

  const renderPage = () => {
    switch (route) {
      case "about": return <About />;
      case "stories": return <Stories />;
      case "work": return <Work />;
      case "donate": return <Donate />;
      case "thankyou": return <ThankYou />;
      case "transparency": return <Transparency />;
      case "contact": return <Contact />;
      case "admin": return <Admin />;
      default: return <Home />;
    }
  };

  return (
    <RouterContext.Provider value={routerValue}>
      <div className="min-h-screen bg-white">
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <MobileMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main key={route} className="animate-fade-up">{renderPage()}</main>
        <Footer />
        <FloatingDonate />
      </div>
    </RouterContext.Provider>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <AppShell />
    </SiteProvider>
  );
}
