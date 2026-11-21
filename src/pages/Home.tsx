import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  HeartHandshake,
  PawPrint,
  Quote,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import {
  ActionLink,
  DonateActionLink,
  InstagramPreview,
  NewsletterForm,
  Notice,
  Reveal,
  RouteLink,
  SectionHeading,
  ShareButtons,
  StatStrip,
} from "../components";
import { StoryCard, StoryModal } from "../StoryComponents";
import { useSite } from "../SiteContext";
import { GALLERY_ITEMS, IMAGES, PROGRAM_AREAS, type RescueStory } from "../siteData";

const pillars = [
  {
    icon: HeartHandshake,
    title: "Rescue with dignity",
    text: "A welfare-first pathway for animals found in chains, illegal captivity, injury or abandonment.",
  },
  {
    icon: ShieldCheck,
    title: "Protect with evidence",
    text: "Lawful, locally informed action against poaching and the illegal trade in wild animals.",
  },
  {
    icon: Sprout,
    title: "Restore with patience",
    text: "Specialist care, habitat awareness and education that give conservation work a lasting future.",
  },
];

export default function Home() {
  const { content } = useSite();
  const [activeStory, setActiveStory] = useState<RescueStory | null>(null);

  const scrollToIntro = () => {
    document.getElementById("home-intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />

      <section className="texture-grain relative isolate flex min-h-[92svh] items-center overflow-hidden bg-forest-dark">
        <img
          src={IMAGES.hero}
          alt="Close-up of an African elephant with ivory tusks in natural light"
          className="hero-image absolute inset-0 -z-30 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-overlay absolute inset-0 -z-20" />
        <div className="leaf-pattern absolute inset-0 -z-10 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 -z-[5] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-5 pb-32 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-12 lg:pb-36 lg:pt-32">
          <div className="animate-fade-up lg:col-span-9 xl:col-span-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:mb-6 sm:text-[11px]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-forest-dark">
                <Sparkles size={11} />
              </span>
              Wildlife rescue & conservation
            </div>
            <h1 className="max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem] lg:leading-[1.03]">
              Protecting Wildlife.
              <br />
              <span className="gradient-gold-text">Saving Lives.</span>
              <br />
              Preserving Our Future.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:mt-7 sm:text-lg sm:leading-9">
              We are committed to protecting wild animals from poachers, rescuing those kept in chains or illegal captivity,
              caring for injured and abandoned wildlife, and giving endangered species a second chance at life. Our public
              reporting is built on a simple promise: publish only what can be verified.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DonateActionLink variant="gold" className="w-full px-8 py-3.5 text-[0.8rem] tracking-[0.1em] sm:w-auto">
                DONATE NOW <ArrowRight size={17} />
              </DonateActionLink>
              <ActionLink to="about" variant="ghost" className="w-full px-8 py-3.5 text-[0.8rem] tracking-[0.1em] sm:w-auto">
                OUR MISSION <ArrowRight size={17} />
              </ActionLink>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-white/75">
              <span className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold"><ShieldCheck size={14} /></span> Verification-first reporting</span>
              <span className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold"><PawPrint size={14} /></span> Welfare-led programs</span>
              <span className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold"><HeartHandshake size={14} /></span> Supporters worldwide</span>
            </div>
          </div>

          <div className="animate-gentle-float absolute bottom-32 right-6 hidden w-64 overflow-hidden rounded-2xl glass p-5 text-white shadow-2xl xl:block">
            <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/25 blur-2xl" aria-hidden="true" />
            <Quote size={22} className="text-gold" />
            <p className="relative mt-3 font-display text-xl leading-snug text-white">“Every wild life deserves the chance to simply be wild.”</p>
            <div className="mt-4 h-px w-full bg-white/20" />
            <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">Our guiding belief</p>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToIntro}
          aria-label="Scroll to introduction"
          className="absolute bottom-6 left-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/35 text-white backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-forest-dark sm:flex"
        >
          <ArrowDown size={18} />
        </button>
      </section>

      <div id="home-intro" className="relative z-20 mx-auto -mt-10 w-full max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-white p-2 shadow-[0_28px_80px_-35px_rgba(6,42,32,0.6)] sm:p-4">
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold" aria-hidden="true" />
          <StatStrip />
        </div>
      </div>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why we exist"
              title={<>A safer future for <span className="text-forest-mid">wild lives</span></>}
              description="Poaching, illegal captivity, exploitation and habitat loss separate animals from the lives they were born to live. A meaningful response requires more than compassion: it requires lawful action, skilled care and honest reporting."
            />
            <div className="mt-8 space-y-4 text-base leading-8 text-muted">
              <p>
                {content.brand} is a conservation platform dedicated to rescue readiness, endangered species protection and
                education. We design every program around animal welfare, local expertise and the dignity of each individual animal.
              </p>
              <p>
                As work develops, this website will publish verified case records, financial breakdowns and project updates —
                never estimated achievements or invented numbers.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Lawful, welfare-led response",
                "Specialist veterinary pathways",
                "Transparent supporter reporting",
                "Education rooted in evidence",
              ].map((item) => (
                <div key={item} className="group flex items-center gap-3 rounded-2xl border border-forest/10 bg-cream px-4 py-3.5 text-sm font-semibold text-forest-dark transition hover:border-gold/50 hover:bg-white hover:shadow-md">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest-mid to-forest text-gold transition group-hover:scale-110"><PawPrint size={13} /></span>
                  {item}
                </div>
              ))}
            </div>
            <ActionLink to="about" variant="forest" className="mt-9">
              Discover our mission <ArrowRight size={17} />
            </ActionLink>
          </div>

          <Reveal className="relative">
            <div className="relative grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
              <div className="pointer-events-none absolute -bottom-7 -right-7 hidden h-32 w-32 rounded-full bg-gold/20 blur-3xl sm:block" aria-hidden="true" />
              <div className="image-zoom col-span-3 row-span-6 overflow-hidden rounded-[2rem] ring-1 ring-forest/10 shadow-[0_25px_60px_-30px_rgba(6,42,32,0.45)]">
                <img src={IMAGES.elephantHerd} alt="Elephant family gathered at a waterhole" loading="lazy" className="h-full min-h-[420px] w-full object-cover sm:min-h-[540px]" />
              </div>
              <div className="image-zoom col-span-2 row-span-3 overflow-hidden rounded-3xl ring-1 ring-forest/10 shadow-[0_25px_60px_-30px_rgba(6,42,32,0.45)]">
                <img src={IMAGES.lion} alt="Lion resting in savanna grass" loading="lazy" className="h-full min-h-[200px] w-full object-cover" />
              </div>
              <div className="image-zoom col-span-2 row-span-3 overflow-hidden rounded-3xl ring-1 ring-forest/10 shadow-[0_25px_60px_-30px_rgba(6,42,32,0.45)]">
                <img src={IMAGES.primate} alt="Young chimpanzee sitting outdoors" loading="lazy" className="h-full min-h-[200px] w-full object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 overflow-hidden rounded-2xl border border-forest/10 bg-white px-5 py-4 shadow-xl sm:-left-8">
              <span className="absolute inset-x-0 bottom-px h-1/2 bg-gradient-to-t from-gold/10 to-transparent" aria-hidden="true" />
              <p className="relative flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-forest-dark">
                <Camera size={15} className="text-gold-dark" /> Representative wildlife photography
              </p>
              <p className="relative mt-1 text-xs text-muted">Images illustrate species and habitats, not specific rescues.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-dark py-20 text-white sm:py-28">
        <div className="leaf-pattern absolute inset-0 opacity-70" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            light
            eyebrow="Our commitment"
            title={<>Rescue. Protect. <span className="text-gold">Restore.</span></>}
            description="Three connected responsibilities shape every program we build and every claim we publish."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 100}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.1] sm:p-8">
                  <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/15 blur-2xl transition group-hover:bg-gold/25" aria-hidden="true" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold text-forest-dark shadow-md shadow-gold/25 transition group-hover:scale-110">
                    <Icon size={22} />
                  </span>
                  <h3 className="relative mt-7 font-display text-2xl font-semibold">{title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-white/70">{text}</p>
                  <div className="relative mt-7 h-px w-full bg-gradient-to-r from-gold/60 to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Notice tone="green" title="A note on this website">
              Program descriptions explain our intended areas of work. Photographs are representative; they are not evidence of
              completed rescues, organizational credentials or partnerships. Verified outcomes will be published in Transparency.
            </Notice>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Conservation in focus"
              title={<>The wild is worth <span className="text-gold-dark">protecting</span></>}
              description="A visual introduction to the habitats, species and field disciplines at the heart of our conservation focus."
            />
            <ActionLink to="work" variant="outline" className="shrink-0">
              Explore our work <ArrowRight size={17} />
            </ActionLink>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_ITEMS.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="image-zoom group relative h-72 overflow-hidden rounded-3xl bg-forest sm:h-80">
                  <img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/15 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-700 group-hover:w-full" aria-hidden="true" />
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gold/15 blur-2xl transition duration-700 group-hover:bg-gold/30" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">
                      <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" /> {item.label}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl text-white">{item.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Rescue stories"
              title={<>Every recovery begins with <span className="text-forest-mid">a name, a record, a chance</span></>}
              description="These editable layouts show how verified rescue journeys, care plans and recovery progress will be presented."
            />
            <RouteLink to="stories" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-forest-mid transition hover:gap-3 hover:text-gold-dark">
              View all stories <ArrowRight size={17} />
            </RouteLink>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.stories.slice(0, 3).map((story, index) => (
              <StoryCard key={story.id} story={story} onOpen={setActiveStory} delay={index * 90} />
            ))}
          </div>
          <Reveal className="mt-8">
            <Notice tone="amber" title="Story records are templates until verified">
              Replace each template in Content Manager with documented case notes, an approved photograph and a confirmed recovery update before publication.
            </Notice>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-forest py-20 sm:py-24">
        <img src={IMAGES.savanna} alt="Golden African savanna at sunset" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-forest-dark/88" />
        <div className="leaf-pattern absolute inset-0 -z-10 opacity-50" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              light
              eyebrow="A shared future"
              title={<>The wild cannot ask for help. <span className="text-gold">We can answer.</span></>}
              description="Your support can help build the rescue capacity, specialist care and transparent reporting that wildlife deserves. Secure payment is completed on PayPal's hosted donation page."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <DonateActionLink variant="gold" className="px-7">DONATE NOW <ArrowRight size={17} /></DonateActionLink>
              <ActionLink to="transparency" variant="ghost" className="px-7">See our transparency promise</ActionLink>
            </div>
          </div>
          <Reveal className="rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-md sm:p-9">
            <Quote size={28} className="text-gold" />
            <p className="mt-5 font-display text-2xl leading-relaxed text-white sm:text-3xl">
              “Conservation is not a moment of rescue. It is a long promise to protect a life, a habitat and a future.”
            </p>
            <div className="mt-7 border-t border-white/15 pt-6">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-gold-light">Share this mission</p>
              <ShareButtons />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <InstagramPreview />
        </div>
      </section>

      <section className="texture-grain relative overflow-hidden bg-forest-dark py-16 text-white sm:py-20">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-forest-mid/30 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Stay connected"
              title={<>Field notes, <span className="gradient-gold-text">straight to your inbox</span></>}
              description="Subscribe for future verified rescue reports, conservation education and transparency updates."
            />
          </div>
          <Reveal className="glass rounded-3xl p-6 sm:p-8">
            <NewsletterForm dark />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center sm:px-8 lg:flex-row lg:text-left">
          <div>
            <p className="font-display text-2xl font-semibold text-forest-dark">Explore the five areas of our work</p>
            <p className="mt-1 text-sm text-muted">From release from captivity to conservation education.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {PROGRAM_AREAS.slice(0, 3).map((program) => (
              <span key={program.id} className="rounded-full bg-cream px-4 py-2 text-xs font-bold text-forest-dark">
                {program.short}
              </span>
            ))}
            <ActionLink to="work" variant="forest" className="px-5 py-2.5">
              Learn more <ArrowRight size={15} />
            </ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
