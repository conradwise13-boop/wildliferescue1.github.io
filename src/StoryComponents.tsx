import { useEffect } from "react";
import { ArrowRight, ClipboardList, HeartPulse, MapPin, Route, X } from "lucide-react";
import { DonateActionLink, Reveal } from "./components";
import type { RescueStory } from "./siteData";

export function StoryCard({
  story,
  onOpen,
  delay = 0,
}: {
  story: RescueStory;
  onOpen: (story: RescueStory) => void;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="image-zoom group flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white card-shadow transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl">
        <button type="button" onClick={() => onOpen(story)} className="relative block h-60 w-full overflow-hidden text-left sm:h-64">
          <img src={story.image} alt={story.alt} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/75 via-forest-dark/5 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-forest-dark shadow-md backdrop-blur-sm">
            {story.verified ? "Verified case record" : "Story template"}
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-gradient-to-b from-gold-light to-gold px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-forest-dark shadow-md">
            {story.species}
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-700 group-hover:w-full" aria-hidden="true" />
        </button>
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <MapPin size={13} /> {story.location}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-forest-dark">
            {story.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted">{story.summary}</p>
          <div className="mt-5 rounded-2xl border border-forest/10 bg-gradient-to-b from-cream to-sand/40 p-4 ring-1 ring-forest/5">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold-dark">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" /> Recovery progress
            </p>
            <p className="mt-1 text-sm font-semibold text-forest-dark">{story.progress}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(story)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-forest-mid transition hover:gap-3 hover:text-gold-dark"
          >
            View case record <ArrowRight size={16} />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export function StoryModal({ story, onClose }: { story: RescueStory | null; onClose: () => void }) {
  useEffect(() => {
    if (!story) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [story, onClose]);

  if (!story) return null;

  const sections = [
    { icon: Route, title: "Rescue journey", body: story.journey },
    { icon: HeartPulse, title: "Care & rehabilitation", body: story.care },
    { icon: ClipboardList, title: "Recovery progress", body: story.progress },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-forest-dark/80 p-4 backdrop-blur-sm sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-modal-title"
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case record"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-forest-dark shadow-md transition hover:bg-gold"
        >
          <X size={20} />
        </button>
        <div className="relative h-56 sm:h-72">
          <img src={story.image} alt={story.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-8">
            <span className="mb-3 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-forest-dark">
              {story.verified ? "Verified case record" : "Editable story template"}
            </span>
            <h2 id="story-modal-title" className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {story.title}
            </h2>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-forest/10 pb-5 text-sm text-muted">
            <span className="flex items-center gap-1.5"><MapPin size={15} /> {story.location}</span>
            <span className="flex items-center gap-1.5"><HeartPulse size={15} /> {story.species}</span>
          </div>
          <p className="mt-6 text-base leading-8 text-ink">{story.summary}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {sections.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-forest/10 bg-cream p-5">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-forest text-gold">
                  <Icon size={17} />
                </span>
                <h3 className="text-sm font-extrabold text-forest-dark">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-gold/40 bg-[#fff8e5] p-5 text-sm leading-7 text-ink">
            <strong>Editorial note:</strong> {story.verified
              ? "Keep the source documentation, permissions and dated recovery updates attached to this verified record."
              : "This is a content template, not a claim that a rescue occurred. Only publish case details, photographs and outcomes after documentation, permissions and welfare review are complete."}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <DonateActionLink
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-extrabold text-forest-dark transition hover:bg-gold-light"
            >
              Support future rescue work <ArrowRight size={16} />
            </DonateActionLink>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-forest/25 px-6 text-sm font-extrabold text-forest transition hover:bg-forest hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
