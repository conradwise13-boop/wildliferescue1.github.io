import { ArrowRight, CheckCircle2, ClipboardCheck, Compass, Leaf, PawPrint, ShieldCheck } from "lucide-react";
import { ActionLink, DonateActionLink, Notice, PageHero, Reveal, SectionHeading } from "../components";
import { IMAGES, PROGRAM_AREAS } from "../siteData";

const workflow = [
  { title: "Concern reported", text: "Information is received and logged without publishing identifying details." },
  { title: "Lawful assessment", text: "Qualified people assess welfare, safety, jurisdiction and the need for intervention." },
  { title: "Care plan", text: "A species-appropriate plan is agreed before transport, treatment or rehabilitation." },
  { title: "Ongoing review", text: "Dated observations guide changes to care and determine the most humane outcome." },
  { title: "Verified reporting", text: "Only reviewed facts, outcomes and financial information are shared publicly." },
];

const reporting = [
  { icon: ClipboardCheck, title: "Case documentation", text: "What happened, when, and who authorized each decision." },
  { icon: ShieldCheck, title: "Welfare safeguards", text: "How animal safety and dignity were protected throughout." },
  { icon: Leaf, title: "Habitat context", text: "The wider conservation considerations behind each program." },
];

export default function Work() {
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <PageHero
        eyebrow="Our work"
        title="Protection in practice"
        description="Five connected program areas respond to the ways wild animals are harmed — and to the long work of helping them live wild again."
        image={IMAGES.savanna}
        imageAlt="Golden African savanna landscape at sunset"
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {PROGRAM_AREAS.map((program) => (
            <button
              key={program.id}
              type="button"
              onClick={() => jumpTo(`program-${program.id}`)}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:border-gold hover:bg-gold hover:text-forest-dark"
            >
              {program.number} · {program.title}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Notice tone="green" icon="info" title="Program areas, not completed-project claims">
              These sections describe the work we are committed to building and supporting. No project is presented as completed, no partnership is implied, and the photographs are representative wildlife imagery.
            </Notice>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-8 sm:py-12">
        <div className="mx-auto max-w-7xl space-y-16 px-5 sm:px-8 sm:space-y-24">
          {PROGRAM_AREAS.map((program, index) => (
            <article key={program.id} id={`program-${program.id}`} className="scroll-mt-28">
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <Reveal className={index % 2 ? "lg:order-2" : ""}>
                  <div className="image-zoom relative overflow-hidden rounded-[2rem] shadow-[0_28px_60px_-30px_rgba(6,42,32,0.5)] ring-1 ring-forest/10">
                    <img src={program.image} alt={program.alt} loading="lazy" className="h-[330px] w-full object-cover sm:h-[460px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent" />
                    <span className="absolute inset-x-5 top-5 h-[3px] rounded-full bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-5 left-5 rounded-full bg-gradient-to-b from-gold-light to-gold px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-dark shadow-lg shadow-gold/30">
                      Program area {program.number}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={100} className={index % 2 ? "lg:order-1" : ""}>
                  <div>
                    <div className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-dark">
                      <span className="h-px w-8 bg-gold" /> {program.number} / 05
                    </div>
                    <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-forest-dark sm:text-4xl">
                      {program.title}
                    </h2>
                    <p className="mt-3 text-base font-semibold text-forest-mid">{program.short}</p>
                    <p className="mt-5 text-base leading-8 text-muted">{program.description}</p>
                    <div className="mt-7 space-y-3">
                      {program.points.map((point) => (
                        <div key={point} className="flex items-center gap-3 rounded-xl border border-forest/10 bg-white px-4 py-3 text-sm font-semibold text-forest-dark">
                          <CheckCircle2 size={17} className="shrink-0 text-forest-mid" /> {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-dark py-20 text-white sm:py-28">
        <div className="leaf-pattern absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            light
            center
            eyebrow="A responsible pathway"
            title={<>From first report to <span className="text-gold">verified outcome</span></>}
            description="A proposed case-handling workflow. Each stage exists to protect the animal, the people involved and the accuracy of the public record."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div className="h-full rounded-3xl border border-white/12 bg-white/[0.06] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-extrabold text-forest-dark">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/55">Illustrative workflow only. It does not describe a completed rescue or imply operational capacity.</p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="What we will report"
              title={<>Conservation you can <span className="text-forest-mid">look into</span></>}
              description="Future program updates will separate what is documented, what is under review and what remains unknown."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="transparency" variant="forest">Visit Transparency <ArrowRight size={17} /></ActionLink>
              <ActionLink to="stories" variant="outline">View story templates</ActionLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {reporting.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 90}>
                <div className="h-full rounded-3xl border border-forest/10 bg-cream p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-gold"><Icon size={20} /></span>
                  <h3 className="mt-6 text-base font-extrabold text-forest-dark">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/25 bg-[linear-gradient(135deg,#fdf4e0_0%,#f8ebc8_100%)] py-14">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 text-center sm:px-8 lg:flex-row lg:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20"><Compass size={22} /></span>
            <div>
              <p className="font-display text-2xl font-semibold text-forest-dark">Help build a safer future for wildlife</p>
              <p className="mt-1 text-sm text-muted">See how PayPal-hosted donations are handled and transparently reported.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <DonateActionLink variant="gold">DONATE NOW <PawPrint size={17} /></DonateActionLink>
            <ActionLink to="contact" variant="outline">Contact us <ArrowRight size={17} /></ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
