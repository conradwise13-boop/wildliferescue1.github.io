import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  FileSearch,
  FileText,
  LockKeyhole,
  PieChart,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { ActionLink, Notice, PageHero, Reveal, SectionHeading, StatStrip } from "../components";
import { useSite } from "../SiteContext";
import { IMAGES } from "../siteData";

const allocation = [
  { title: "Rescue & transport", note: "Awaiting reviewed expenditure" },
  { title: "Veterinary care & rehabilitation", note: "Awaiting reviewed expenditure" },
  { title: "Protection & habitat programs", note: "Awaiting reviewed expenditure" },
  { title: "Education, administration & reporting", note: "Awaiting reviewed expenditure" },
];

const documents = [
  { title: "Individual rescue case reports", type: "Case documentation", detail: "Published after welfare, privacy and source-document review." },
  { title: "Veterinary & recovery summaries", type: "Welfare reporting", detail: "Added only with qualified professional approval." },
  { title: "Donation allocation statements", type: "Financial reporting", detail: "Based on reviewed accounts and a defined reporting period." },
  { title: "Annual report & independent review", type: "Governance", detail: "Add a real document only when it exists and can be downloaded." },
];

const standards = [
  "Every published figure has a named source and reporting period.",
  "Estimated outcomes are never presented as confirmed results.",
  "Restricted and unrestricted funds are described separately.",
  "Case reports protect animal locations and responder privacy.",
  "Corrections are dated and visible rather than quietly overwritten.",
  "Templates remain clearly labeled until approved for publication.",
];

export default function Transparency() {
  const { content } = useSite();
  const [filter, setFilter] = useState("All updates");
  const categories = ["All updates", ...Array.from(new Set(content.updates.map((update) => update.category)))];
  const filteredUpdates = filter === "All updates" ? content.updates : content.updates.filter((update) => update.category === filter);

  return (
    <div>
      <PageHero
        eyebrow="Transparency"
        title="Trust is earned in the open"
        description="A clear view of what is known, what is awaiting verification and how future donations, project updates and rescue reports will be accounted for."
        image={IMAGES.acacia}
        imageAlt="A lone acacia tree in golden savanna light"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Notice tone="amber" title="No verified impact figures have been published">
              All statistics, story records, project updates and report documents on this site are editable placeholders. Nothing here should be read as an audited result, a completed project, an organizational credential or a partnership.
            </Notice>
          </Reveal>
          <div className="mt-10">
            <StatStrip />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="How donations are used"
              title={<>No percentages until <span className="text-gold-dark">the accounts are clear</span></>}
              description="These are the intended categories of support. A verified allocation breakdown will be published once reviewed financial information exists."
            />
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-forest/10 bg-white card-shadow">
                <div className="relative grid grid-cols-[1fr_auto] gap-4 overflow-hidden bg-gradient-to-r from-forest-dark via-forest to-forest-mid px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light sm:px-7">
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_180%_at_100%_0%,rgba(232,184,75,0.28),transparent)]" aria-hidden="true" />
                  <span className="relative">Support category</span>
                  <span className="relative">Verified allocation</span>
                </div>
                {allocation.map((item, index) => (
                  <div key={item.title} className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-5 transition hover:bg-cream/60 sm:px-7 ${index ? "border-t border-forest/10" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-soft text-forest-mid"><span className="font-display text-sm font-bold text-forest-dark">{String(index + 1).padStart(2, "0")}</span></span>
                      <div>
                        <p className="text-sm font-extrabold text-forest-dark">{item.title}</p>
                        <p className="mt-1 text-xs text-muted">{item.note}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-gradient-to-b from-gold-light to-gold px-4 py-2 font-display text-lg font-semibold text-forest-dark shadow-md shadow-gold/30">—</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">No financial percentages are invented. Edit this section after connecting reviewed accounting records.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Project updates"
              title={<>What we will <span className="text-forest-mid">report</span></>}
              description="Editable update templates for field activity, case documentation and financial summaries. Use Content Manager to publish verified updates."
            />
            <ActionLink to="admin" variant="outline" className="shrink-0">Manage updates <ArrowRight size={16} /></ActionLink>
          </div>
          <div className="mt-9 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${filter === category ? "bg-forest text-white" : "border border-forest/15 bg-white text-forest-dark hover:border-gold"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {filteredUpdates.length ? (
              filteredUpdates.map((update, index) => (
                <Reveal key={update.id} delay={index * 80}>
                  <article className="flex h-full flex-col rounded-3xl border border-forest/10 bg-cream p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-forest-mid">{update.category}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gold-dark"><LockKeyhole size={12} /> {update.status}</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-forest-dark">{update.title}</h3>
                    <p className="mt-2 text-xs font-semibold text-muted">{update.date}</p>
                    <p className="mt-4 flex-1 text-sm leading-7 text-muted">{update.body}</p>
                    <div className="mt-6 border-t border-forest/10 pt-4 text-xs font-bold text-forest-dark">Template · not a published report</div>
                  </article>
                </Reveal>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-forest/25 p-10 text-center text-sm text-muted lg:col-span-3">
                No updates in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-dark py-20 text-white sm:py-24">
        <div className="leaf-pattern absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            light
            eyebrow="Rescue reports"
            title={<>A library built for <span className="text-gold">evidence</span></>}
            description="The report library is ready for verified documents. No download buttons are active because no reports have been published."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {documents.map((doc, index) => (
              <Reveal key={doc.title} delay={index * 70}>
                <div className="flex items-start gap-5 rounded-3xl border border-white/12 bg-white/[0.06] p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest-dark"><FileText size={20} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-gold-light">{doc.type}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{doc.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/65">{doc.detail}</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold text-white/60 sm:inline-flex">
                    <Download size={12} /> Not published
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: FileSearch, title: "Source review", text: "Confirm records, dates and permissions." },
              { icon: PieChart, title: "Financial review", text: "Reconcile allocations with reviewed accounts." },
              { icon: ShieldCheck, title: "Approved publication", text: "Publish only after safeguarding and accuracy checks." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Icon size={19} className="text-gold" />
                <h4 className="mt-3 text-sm font-extrabold">{title}</h4>
                <p className="mt-1 text-xs leading-6 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Supporter impact"
              title={<>The difference your <span className="text-forest-mid">contribution makes</span></>}
              description="As reviewed donation data and verified program outcomes become available, this section will connect supporter contributions to documented outcomes."
            />
            <Reveal className="mt-8 rounded-3xl border border-forest/10 bg-cream p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <BarChart3 size={22} className="text-gold-dark" />
                <h3 className="font-display text-xl font-semibold text-forest-dark">Impact ledger</h3>
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-forest/20 bg-white p-8 text-center">
                <Wallet size={26} className="mx-auto text-forest-mid" />
                <p className="mt-3 text-sm font-bold text-forest-dark">No verified entries published yet</p>
                <p className="mt-1 text-xs leading-6 text-muted">This area will list reporting periods, reviewed expenditure and documented conservation outcomes — not estimates.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl bg-forest p-7 text-white sm:p-9">
              <ShieldCheck size={28} className="text-gold" />
              <h3 className="mt-5 font-display text-2xl font-semibold">Our publishing standards</h3>
              <div className="mt-6 space-y-3">
                {standards.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-7 text-white/75">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-gold" /> {item}
                  </p>
                ))}
              </div>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-sm font-bold">Have a question or concern?</p>
                <p className="mt-1 text-sm leading-7 text-white/65">Ask for the source behind any claim. Transparent organizations should be able to explain their evidence.</p>
                <ActionLink to="contact" variant="gold" className="mt-5">Contact us <ArrowRight size={16} /></ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
