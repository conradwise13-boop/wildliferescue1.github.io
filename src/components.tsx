import {
  useEffect,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Check,
  Copy,
  HeartHandshake,
  Info,
  Leaf,
  LockKeyhole,
  MessageCircle,
  PawPrint,
  Share2,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { useRouter } from "./router";
import { useSite } from "./SiteContext";
import { PAYPAL_DONATE_ENDPOINT, safeExternalUrl, type RouteKey } from "./siteData";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export type BrandName = "instagram" | "facebook" | "twitter" | "linkedin" | "youtube";

export function BrandIcon({ name, size = 18 }: { name: BrandName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const };
  if (name === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M15.5 3H13a5 5 0 0 0-5 5v3H5.5v4H8v7h4v-7h3.2l.8-4H12V8a1 1 0 0 1 1-1h2.5V3Z" />
      </svg>
    );
  }
  if (name === "twitter") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M18.7 2H22l-7.1 8.1L23.2 22h-6.6l-5.2-6.8L5.5 22H2.2l7.6-8.7L1.6 2h6.8l4.7 6.2L18.7 2Zm-1.1 18h1.8L7.5 3.9H5.6L17.6 20Z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg {...common} fill="currentColor">
        <circle cx="5" cy="5" r="2.2" />
        <rect x="3" y="9" width="4" height="12" rx="1" />
        <path d="M10 9h3.8v1.8c.7-1.2 2-2 3.8-2 3 0 4.4 1.8 4.4 5V21h-4v-6.5c0-1.6-.5-2.5-1.9-2.5-1.5 0-2.1 1-2.1 2.6V21h-4V9Z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor">
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

interface RouteLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: RouteKey;
}

export function RouteLink({ to, children, onClick, className, ...rest }: RouteLinkProps) {
  const { route, navigate } = useRouter();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };
  return (
    <a
      href={`#/${to}`}
      onClick={handleClick}
      aria-current={route === to ? "page" : undefined}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

type ButtonVariant = "gold" | "forest" | "outline" | "white" | "ghost";

const variants: Record<ButtonVariant, string> = {
  gold: "btn-shine bg-gradient-to-b from-gold-light to-gold text-forest-dark shadow-[0_18px_38px_-14px_rgba(232,184,75,0.85)] hover:from-gold hover:to-gold-light",
  forest: "btn-shine bg-gradient-to-b from-forest-mid to-forest text-white shadow-[0_18px_38px_-16px_rgba(11,61,46,0.9)] hover:from-forest hover:to-forest-mid",
  outline: "border border-forest/25 bg-white/40 text-forest backdrop-blur-sm hover:bg-forest hover:text-white hover:border-forest",
  white: "btn-shine bg-white text-forest shadow-[0_18px_38px_-18px_rgba(6,42,32,0.4)] hover:bg-cream",
  ghost: "border border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/60",
};

export function ActionLink({
  to,
  variant = "gold",
  className,
  children,
  ...rest
}: RouteLinkProps & { variant?: ButtonVariant }) {
  return (
    <RouteLink
      to={to}
      className={cx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </RouteLink>
  );
}

/**
 * Donation CTA that opens the live PayPal donation campaign directly.
 * When PayPal checkout is disabled by an administrator, falls back to the
 * internal Donate page, which explains the integration status.
 */
export function DonateActionLink({
  variant = "gold",
  className,
  children,
  onClick,
  ariaLabel,
  target = "_blank",
  bare = false,
}: {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
  target?: string;
  bare?: boolean;
}) {
  const { content } = useSite();
  const campaignId = content.paypalCampaignId.trim();
  const enabled = content.paypalCheckoutEnabled && campaignId.length > 0;
  const href = enabled
    ? `${PAYPAL_DONATE_ENDPOINT}?campaign_id=${encodeURIComponent(campaignId)}`
    : "#/donate";

  const isExternal = enabled;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!isExternal) {
      // Internal fallback: let the router handle navigation
      return;
    }
    if (event.defaultPrevented) return;
  };

  const base = bare
    ? "inline-flex items-center transition-colors"
    : "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";
  const withVariant = bare ? className : cx(base, variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        target={target === "_self" ? undefined : target}
        rel={target === "_self" ? undefined : "noopener noreferrer"}
        aria-label={ariaLabel}
        onClick={handleClick}
        className={withVariant}
      >
        {children}
      </a>
    );
  }

  return (
    <RouteLink
      to="donate"
      aria-label={ariaLabel}
      onClick={onClick}
      className={withVariant}
    >
      {children}
    </RouteLink>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const { content } = useSite();
  return (
    <RouteLink to="home" className="group flex items-center gap-3" aria-label={`${content.brand} home`}>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-gradient-to-br from-forest-mid to-forest-dark text-gold shadow-lg shadow-forest/25 ring-1 ring-gold/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6">
        <span className="pointer-events-none absolute inset-0 rounded-[0.9rem] bg-gradient-to-b from-white/15 to-transparent" />
        <svg viewBox="0 0 48 48" className="relative h-8 w-8" fill="none" aria-hidden="true">
          <path
            d="M37 9C20.5 10.3 10.7 19.2 10.7 30.8c0 5.4 3.7 8.7 8.4 8.7 10.1 0 14.7-11 17.9-30.5Z"
            fill="currentColor"
          />
          <path d="M11 40c5.6-8.8 12.2-15.2 21.6-21.8" stroke="#0b3d2e" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="17.5" cy="18" r="2.2" fill="currentColor" />
          <circle cx="12.5" cy="24" r="2" fill="currentColor" />
          <circle cx="21.5" cy="13.5" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className={cx("leading-tight", compact && "sm:hidden lg:block")}>
        <span
          className={cx(
            "block font-display text-[1.05rem] font-semibold tracking-[-0.03em] sm:text-[1.35rem]",
            light ? "text-white" : "text-forest-dark",
          )}
        >
          {content.brand}
        </span>
        <span
          className={cx(
            "mt-0.5 hidden text-[9px] font-extrabold uppercase tracking-[0.18em] sm:block",
            light ? "text-gold-light" : "text-forest-mid",
          )}
        >
          {content.tagline}
        </span>
      </span>
    </RouteLink>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={cx("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      <div className={cx("mb-5 flex items-center gap-3", center && "justify-center")}>
        <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent via-gold to-gold" />
        <span className={cx("text-[11px] font-extrabold uppercase tracking-[0.24em]", light ? "text-gold-light" : "text-gold-dark")}>
          {eyebrow}
        </span>
        {center && <span className="h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent via-gold to-gold" />}
      </div>
      <h2
        className={cx(
          "font-display text-3xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-4xl lg:text-[3.15rem]",
          light ? "text-white" : "text-forest-dark",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cx("mt-5 text-base leading-8 sm:text-lg", light ? "text-white/75" : "text-muted")}>{description}</p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  return (
      <section className="relative isolate flex min-h-[360px] items-end overflow-hidden bg-forest-dark sm:min-h-[450px]">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
          style={{ filter: "saturate(1.05) contrast(1.03)" }}
          fetchPriority="high"
        />
        <div className="page-hero-overlay absolute inset-0 -z-20" />
        <div className="leaf-pattern absolute inset-0 -z-10 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 -z-[5] h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-light sm:text-[11px]">
              <span className="h-[2px] w-9 rounded-full bg-gradient-to-r from-gold to-gold/20" />
              {eyebrow}
            </div>
            <h1 className="font-display text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.8rem] lg:leading-[1.04]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">{description}</p>
            {children}
          </div>
        </div>
      </section>
  );
}

export function Notice({
  title,
  children,
  tone = "cream",
  icon = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: "cream" | "green" | "amber";
  icon?: "info" | "lock" | "heart";
}) {
  const Icon = icon === "lock" ? LockKeyhole : icon === "heart" ? HeartHandshake : Info;
  const tones = {
    cream: "border-forest/12 bg-[linear-gradient(135deg,#faf6ec_0%,#f3ecdb_100%)] text-ink",
    green: "border-forest/20 bg-[linear-gradient(135deg,#e9f1ea_0%,#dce8dc_100%)] text-forest-dark",
    amber: "border-gold/45 bg-[linear-gradient(135deg,#fffaea_0%,#fbf0d3_100%)] text-ink",
  };
  return (
    <div className={cx("relative flex gap-4 overflow-hidden rounded-2xl border p-5 shadow-[0_1px_2px_rgba(6,42,32,0.05)] sm:p-6", tones[tone])}>
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold via-gold to-gold-dark" aria-hidden="true" />
      <span className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-gold shadow-md shadow-forest/25">
        <Icon size={19} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="font-bold leading-6">{title}</p>
        <div className="mt-1 text-sm leading-7 opacity-80">{children}</div>
      </div>
    </div>
  );
}

export function StatStrip({ dark = false }: { dark?: boolean }) {
  const { content } = useSite();
  const icons = [PawPrint, ShieldCheck, Sprout];
  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-forest/10 bg-forest/10 shadow-[0_24px_60px_-30px_rgba(6,42,32,0.35)] md:grid-cols-3">
        {content.stats.map((stat, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal
              key={stat.id}
              delay={index * 100}
              className={cx("relative p-7 text-center sm:p-9", dark ? "bg-forest-mid" : "bg-white")}
            >
              <span
                className={cx(
                  "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-md",
                  dark ? "bg-white/10 text-gold shadow-black/20" : "bg-gradient-to-br from-forest to-forest-mid text-gold shadow-forest/30",
                )}
              >
                <Icon size={22} />
              </span>
              <p className={cx("font-display text-[2.6rem] font-semibold leading-none tracking-[-0.05em]", dark ? "text-gold" : "gradient-gold-text")}>
                {stat.value.trim() || "—"}
              </p>
              <p className={cx("mt-3 text-sm font-bold", dark ? "text-white" : "text-forest-dark")}>{stat.label}</p>
              <p className={cx("mt-1 text-xs", dark ? "text-white/60" : "text-muted")}>{stat.note}</p>
            </Reveal>
          );
        })}
      </div>
      <p className={cx("mt-4 flex items-center justify-center gap-2 text-center text-xs", dark ? "text-white/55" : "text-muted")}>
        <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden="true" />
        Placeholder statistics. No impact figures are published until independently verified. Edit in Content Manager.
        <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden="true" />
      </p>
    </div>
  );
}

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const fieldId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setStatus("Subscription request captured for this preview. Connect an email service before sending campaigns. No email has been sent.");
        setEmail("");
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={fieldId}>
          Email address
        </label>
        <input
          id={fieldId}
          className={cx(
            "field min-h-12 flex-1",
            dark && "border-white/20 bg-white/10 text-white placeholder:text-white/50",
          )}
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          type="submit"
          className="btn-shine inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold px-6 text-sm font-extrabold text-forest-dark shadow-lg shadow-gold/30 transition hover:-translate-y-0.5 hover:from-gold hover:to-gold-light"
        >
          Subscribe <ArrowRight size={17} />
        </button>
      </div>
      <p className={cx("mt-3 text-xs leading-6", status ? "text-gold-light" : dark ? "text-white/55" : "text-muted")} aria-live="polite">
        {status || "Newsletter delivery is not connected. We only publish updates that can be verified."}
      </p>
    </form>
  );
}

export function ShareButtons({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState("");
  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = "Protecting Wildlife. Saving Lives. Preserving Our Future.";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const openShare = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer,width=720,height=620");
    setStatus("Share window opened.");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied to clipboard.");
    } catch {
      setStatus("Copy unavailable. Please copy the page URL from your browser.");
    }
  };

  const nativeShare = async () => {
    const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> };
    if (nav.share) {
      try {
        await nav.share({ title, text: "Discover wildlife rescue and conservation.", url });
        setStatus("Shared successfully.");
      } catch {
        setStatus("Sharing cancelled.");
      }
    } else {
      await copyLink();
    }
  };

  const actions: { label: string; node: ReactNode; action: () => void | Promise<void> }[] = [
    { label: "Share on Facebook", node: <BrandIcon name="facebook" size={15} />, action: () => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`) },
    { label: "Share on X", node: <BrandIcon name="twitter" size={15} />, action: () => openShare(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`) },
    { label: "Share on LinkedIn", node: <BrandIcon name="linkedin" size={15} />, action: () => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`) },
    { label: "Share on WhatsApp", node: <MessageCircle size={15} />, action: () => openShare(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`) },
    { label: "Copy page link", node: <Copy size={15} />, action: copyLink },
    { label: "Share this page", node: <Share2 size={15} />, action: nativeShare },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {!compact && <span className="mr-1 text-xs font-bold uppercase tracking-[0.16em] text-white/55">Share</span>}
        {actions.map(({ label, node, action }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            onClick={() => { void action(); }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/75 transition hover:border-gold hover:bg-gold hover:text-forest-dark"
          >
            {node}
          </button>
        ))}
      </div>
      {status && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-gold-light" aria-live="polite">
          <Check size={13} /> {status}
        </p>
      )}
    </div>
  );
}

export function InstagramPreview({ showHeading = true }: { showHeading?: boolean }) {
  const { content } = useSite();
  const instagram = safeExternalUrl(content.instagramUrl) || "https://www.instagram.com/";
  return (
    <div>
      {showHeading && (
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Instagram feed"
            title={<>From the wild, <span className="text-gold-dark">to your world</span></>}
            description="A preview area for your official Instagram feed. Live posts appear only after the account is connected and verified."
          />
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-forest px-6 text-sm font-extrabold text-forest transition hover:bg-forest hover:text-white"
          >
            <BrandIcon name="instagram" size={18} /> Follow on Instagram
          </a>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {content.instagramPosts.slice(0, 4).map((post, index) => {
          const href = safeExternalUrl(post.href);
          const inner = (
            <>
              <img src={post.image} alt={post.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <span className="mb-1 inline-flex rounded-full bg-gold px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-forest-dark">
                  {post.placeholder ? "Feed placeholder" : "Instagram"}
                </span>
                <p className="line-clamp-2 text-[11px] font-semibold leading-4 text-white sm:text-xs">{post.caption}</p>
              </div>
            </>
          );
          const className = "image-zoom group relative aspect-square overflow-hidden rounded-2xl bg-forest-soft shadow-sm";
          return (
            <Reveal key={post.id} delay={index * 80}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={cx(className, "block")} aria-label={`Open Instagram post: ${post.caption}`}>
                  {inner}
                </a>
              ) : (
                <div className={className}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted">
        Instagram integration is not connected. Replace these visual placeholders with official posts in Content Manager.
      </p>
    </div>
  );
}

export function ValueIcon({ name }: { name: "leaf" | "shield" | "heart" | "sprout" }) {
  const icons = { leaf: Leaf, shield: ShieldCheck, heart: HeartHandshake, sprout: Sprout };
  const Icon = icons[name];
  return <Icon size={22} strokeWidth={1.8} />;
}
