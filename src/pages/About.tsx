import {
  ArrowRight,
  Ban,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Eye,
  Leaf,
  PawPrint,
  Scale,
  SearchCheck,
  ShieldAlert,
  Target,
} from "lucide-react";
import { ActionLink, DonateActionLink, Notice, PageHero, Reveal, SectionHeading, ValueIcon } from "../components";
import { useSite } from "../SiteContext";
import { IMAGES } from "../siteData";

const foundations = [
  {
    icon: "heart" as const,
    label: "Our mission",
    title: "Protect wild lives",
    text: "To protect wild animals from poaching, illegal captivity, abuse and exploitation; to support expert care for injured and abandoned wildlife; and to help endangered species survive in healthy habitats.",
  },
  {
    icon: "leaf" as const,
    label: "Our vision",
    title: "Wild, by nature",
    text: "A world where animals are not chained, traded or displayed for human gain — where welfare, habitat and coexistence guide the choices we make together.",
  },
  {
    icon: "shield" as const,
    label: "Our values",
    title: "Evidence with empathy",
    text: "Compassion starts the work; evidence keeps it honest. We value animal dignity, local expertise, lawful action, careful documentation and transparent public reporting.",
  },
];

const harms = [
  { icon: ShieldAlert, title: "Poaching", text: "The illegal killing and trafficking of wild animals." },
  { icon: Ban, title: "Chains & illegal captivity", text: "Keeping wild animals confined for exploitation or display." },
  { icon: PawPrint, title: "Abuse & abandonment", text: "Injury, neglect and separation from appropriate care." },
  { icon: Scale, title: "Exploitation", text: "Treating a sentient wild animal as a commodity." },
  { icon: Leaf, title: "Habitat loss", text: "The erosion of the landscapes that make wild life possible." },
];

const commitments = [
  {
    icon: SearchCheck,
    title: "Verify before publishing",
    text: "Impact figures, rescue outcomes and financial allocations stay blank until source documentation is available.",
  },
  {
    icon: ClipboardCheck,
    title: "Put welfare first",
    text: "Decisions about intervention, care and release are guided by qualified welfare assessment, not publicity.",
  },
  {
    icon: Scale,
    title: "Work lawfully and locally",
    text: "Rescue and protection must respect local law, community knowledge and the safety of people and animals.",
  },
  {
    icon: CheckCircle2,
    title: "Report plainly",
    text: "Supporters should be able to see what is known, what is pending and what cannot yet be claimed.",
  },
];

export default function About() {
  const { content } = useSite();
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="A promise to the wild"
        description={`${content.brand} exists to protect wild animals from cruelty and exploitation, support their recovery, and build a culture of conservation grounded in truth.`}
        image={IMAGES.elephantWild}
        imageAlt="A herd of elephants walking across a wide African savanna"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Mission, vision, values"
              title={<>Compassion with <span className="text-forest-mid">a clear conscience</span></>}
              description="Wildlife conservation asks us to care deeply and to act carefully. These principles define how we intend to do both."
            />
            <Reveal className="texture-grain relative mt-9 overflow-hidden rounded-3xl bg-forest p-7 text-white sm:p-9">
              <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
              <span className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-forest-mid/40 blur-3xl" aria-hidden="true" />
              <PawPrint size={28} className="relative text-gold" />
              <p className="relative mt-5 font-display text-2xl leading-snug sm:text-3xl">
                “A second chance is not a gift we give to an animal. It is a responsibility we choose to carry.”
              </p>
              <div className="relative mt-6 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
              <p className="relative mt-5 text-sm leading-7 text-white/70">Our guiding belief</p>
            </Reveal>
          </div>
          <div className="grid gap-5">
            {foundations.map((item, index) => (
              <Reveal key={item.label} delay={index * 100}>
                <article className="group relative grid gap-5 overflow-hidden rounded-3xl border border-forest/10 bg-cream p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-xl sm:grid-cols-[auto_1fr] sm:p-8">
                  <span className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/25" aria-hidden="true" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20 transition group-hover:scale-105">
                    <ValueIcon name={item.icon} />
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-dark">{item.label}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-forest-dark">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-dark py-20 text-white sm:py-28">
        <div className="leaf-pattern absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="image-zoom overflow-hidden rounded-[2rem]">
              <img src={IMAGES.rhino} alt="Rhinoceros grazing in an open grassy habitat" loading="lazy" className="h-[420px] w-full object-cover sm:h-[560px]" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              light
              eyebrow="What we stand against"
              title={<>The threats that <span className="text-gold">steal wild lives</span></>}
              description="Our work begins with a clear-eyed view of the harms facing wild animals. Naming them honestly is the first step toward preventing them."
            />
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {harms.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                  <Icon size={21} className="text-gold" />
                  <h3 className="mt-4 text-sm font-extrabold text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-6 text-white/65">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            center
            eyebrow="How we work"
            title={<>Integrity is <span className="text-gold-dark">the operating system</span></>}
            description="These commitments shape the way we plan programs, publish stories and communicate with supporters."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80}>
                <div className="group h-full rounded-3xl border border-forest/10 bg-white p-7 card-shadow transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl">
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-forest-mid text-gold shadow-md shadow-forest/25 transition group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-forest-dark">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Notice tone="green" title="A working publication framework">
                This website uses editable placeholders for the organization name, contact details, figures, stories and reports.
                No history, registration, credential, partnership or completed project is implied. Add only verified information.
              </Notice>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-forest/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-gold-dark" />
                  <h3 className="font-extrabold text-forest-dark">What supporters can expect</h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                  <li className="flex gap-2"><CheckCircle2 size={17} className="mt-1 shrink-0 text-forest-mid" /> Clearly labeled templates and pending data.</li>
                  <li className="flex gap-2"><CheckCircle2 size={17} className="mt-1 shrink-0 text-forest-mid" /> Case records supported by documentation.</li>
                  <li className="flex gap-2"><CheckCircle2 size={17} className="mt-1 shrink-0 text-forest-mid" /> Financial summaries based on reviewed accounts.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-dark">
              <Compass size={16} /> Where to go next
              <Target size={16} />
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-forest-dark sm:text-5xl">
              Learn what we do. See what we publish. Help build what comes next.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <ActionLink to="work" variant="forest">Explore our work <ArrowRight size={17} /></ActionLink>
            <ActionLink to="transparency" variant="outline">Read our transparency promise</ActionLink>
            <DonateActionLink variant="gold">DONATE NOW <ArrowRight size={17} /></DonateActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
