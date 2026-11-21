import { useMemo, useState } from "react";
import { ArrowRight, Camera, ClipboardList, FileText, HeartPulse, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { ActionLink, Notice, PageHero, Reveal, SectionHeading, ShareButtons } from "../components";
import { StoryCard, StoryModal } from "../StoryComponents";
import { useSite } from "../SiteContext";
import { IMAGES, type RescueStory } from "../siteData";

const journeySteps = [
  { icon: FileText, title: "Intake record", text: "Document who reported the case, where and when, and the lawful basis for any response." },
  { icon: HeartPulse, title: "Welfare assessment", text: "Record qualified veterinary findings and the immediate needs of the individual animal." },
  { icon: ClipboardList, title: "Care pathway", text: "Set out treatment, nutrition, quarantine, rehabilitation and long-term welfare decisions." },
  { icon: Camera, title: "Recovery updates", text: "Add dated observations and approved photographs, with privacy and safety checks." },
  { icon: ShieldCheck, title: "Verified outcome", text: "Publish the outcome and associated documentation only after review and approval." },
];

export default function Stories() {
  const { content } = useSite();
  const [activeStory, setActiveStory] = useState<RescueStory | null>(null);
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("All species");

  const speciesOptions = useMemo(
    () => ["All species", ...Array.from(new Set(content.stories.map((story) => story.species)))],
    [content.stories],
  );

  const filteredStories = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return content.stories.filter((story) => {
      const matchesSpecies = species === "All species" || story.species === species;
      const matchesQuery =
        !needle ||
        [story.title, story.species, story.summary, story.location, story.progress]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesSpecies && matchesQuery;
    });
  }, [content.stories, query, species]);

  return (
    <div>
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
      <PageHero
        eyebrow="Our rescue stories"
        title="Every life has a story"
        description="A home for individual rescue journeys, photographs and recovery progress — published with care, context and verification."
        image={IMAGES.primateFamily}
        imageAlt="A chimpanzee family together in a natural setting"
      />

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Notice tone="amber" title="Editable templates — no rescue is claimed here">
              The cards below are clearly marked content templates. Replace them with approved case records in Content Manager before public launch. No animal name, location, outcome or recovery percentage has been invented.
            </Notice>
          </Reveal>
          <div className="mt-9 flex flex-col gap-4 rounded-3xl border border-forest/10 bg-cream p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="relative flex-1">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <label className="sr-only" htmlFor="story-search">Search rescue stories</label>
              <input
                id="story-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by species, story or progress"
                className="field min-h-12 pl-11"
              />
            </div>
            <div className="relative sm:w-64">
              <SlidersHorizontal size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <label className="sr-only" htmlFor="species-filter">Filter by species</label>
              <select
                id="species-filter"
                value={species}
                onChange={(event) => setSpecies(event.target.value)}
                className="field min-h-12 appearance-none pl-11 pr-9"
              >
                {speciesOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="px-2 text-center text-sm font-semibold text-muted sm:min-w-32">
              {filteredStories.length} record{filteredStories.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredStories.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStories.map((story, index) => (
                <StoryCard key={story.id} story={story} onOpen={setActiveStory} delay={(index % 3) * 90} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-forest/25 bg-white p-12 text-center">
              <h3 className="font-display text-2xl text-forest-dark">No matching records</h3>
              <p className="mt-2 text-sm text-muted">Try a different species or search term, or add a new verified record in Content Manager.</p>
              <button
                type="button"
                onClick={() => { setQuery(""); setSpecies("All species"); }}
                className="mt-5 rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:bg-forest-mid"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-forest-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            light
            eyebrow="Responsible storytelling"
            title={<>The recovery journey, <span className="text-gold">documented properly</span></>}
            description="This framework shows the information a published case record should contain. It is a workflow template, not a claim about a completed rescue."
          />
          <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20 lg:block" />
            {journeySteps.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80} className="relative">
                <div className="h-full rounded-3xl border border-white/12 bg-white/[0.06] p-6">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-forest-dark">
                    <Icon size={21} />
                  </span>
                  <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">Step {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Content manager"
              title={<>Add the next <span className="text-forest-mid">verified story</span></>}
              description="Administrators can add, edit and remove case records, choose an approved image, write the rescue journey and update recovery progress. Changes are stored in this browser until a secure CMS is connected."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="admin" variant="forest">Open Content Manager <ArrowRight size={17} /></ActionLink>
              <ActionLink to="transparency" variant="outline">See reporting standards</ActionLink>
            </div>
          </div>
          <Reveal className="rounded-3xl border border-forest/10 bg-white p-7 card-shadow sm:p-9">
            <h3 className="font-display text-2xl font-semibold text-forest-dark">Before a story goes live</h3>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-muted">
              {[
                "Confirm the case details with primary documentation.",
                "Obtain permission for every photograph and location detail.",
                "Remove any information that could put an animal or responder at risk.",
                "Date each recovery update and identify what is still unknown.",
                "Keep the story editable so new verified information can be added.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest-mid"><ShieldCheck size={14} /></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-forest/10 pt-6">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-forest-dark">Share our mission</p>
              <div className="rounded-2xl bg-forest-dark p-4">
                <ShareButtons />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
