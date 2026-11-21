import { ArrowRight, CheckCircle2, HeartHandshake, PawPrint, ReceiptText, ShieldCheck } from "lucide-react";
import { ActionLink, DonateActionLink, Notice, PageHero, Reveal, SectionHeading, ShareButtons } from "../components";
import { IMAGES } from "../siteData";

const nextSteps = [
  { icon: ReceiptText, title: "Check your PayPal receipt", text: "PayPal sends the authoritative confirmation and receipt for a completed donation. Keep it for your records." },
  { icon: ShieldCheck, title: "Verified reporting", text: "Donation use and impact are published only after reviewed financial data and documented outcomes are available." },
  { icon: PawPrint, title: "Stay connected", text: "Follow future rescue stories, education and conservation updates as verified content becomes available." },
];

export default function ThankYou() {
  return (
    <div>
      <PageHero
        eyebrow="Thank you"
        title="Thank you for standing with wildlife"
        description="If your donation was completed through PayPal, your generosity helps build a future where wild animals are protected, cared for and given a second chance."
        image={IMAGES.elephantHerd}
        imageAlt="A family of elephants gathered at a waterhole"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-forest/10 bg-cream card-shadow">
              <div className="border-b border-forest/10 bg-white p-7 sm:p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-gold"><CheckCircle2 size={28} /></span>
                <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-dark">A note of gratitude</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-forest-dark sm:text-4xl">
                  Your compassion gives the wild a voice.
                </h2>
                <p className="mt-5 text-base leading-8 text-muted">
                  Thank you for choosing to support wildlife rescue and conservation. Every act of support strengthens the long, careful work of protecting animals from poaching, illegal captivity, injury and abandonment.
                </p>
              </div>
              <div className="p-7 sm:p-10">
                <Notice tone="amber" icon="lock" title="This page is not payment verification">
                  This thank-you page can be set as the successful-return URL inside the PayPal campaign settings. Visiting it does not prove that a transaction occurred. PayPal's confirmation, receipt and transaction record are authoritative. Auto-return must be enabled in PayPal, and not every donor is redirected automatically.
                </Notice>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ActionLink to="transparency" variant="forest">See how we report impact <ArrowRight size={16} /></ActionLink>
                  <DonateActionLink variant="outline">Return to Donate</DonateActionLink>
                  <ActionLink to="home" variant="gold">Back to Home <ArrowRight size={16} /></ActionLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            center
            eyebrow="What happens next"
            title={<>Clear records. <span className="text-gold-dark">Honest reporting.</span></>}
            description="Our commitment to supporters continues after checkout with careful documentation and transparent public updates."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {nextSteps.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 90}>
                <div className="h-full rounded-3xl border border-forest/10 bg-white p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold"><Icon size={21} /></span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-forest-dark">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-dark py-16 text-white sm:py-20">
        <div className="leaf-pattern absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest-dark"><HeartHandshake size={23} /></span>
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Inspire someone else to care</h2>
              <p className="mt-2 text-sm leading-7 text-white/70">Sharing the mission helps more people learn about wildlife rescue and verification-first conservation.</p>
            </div>
          </div>
          <Reveal className="rounded-3xl border border-white/15 bg-white/[0.06] p-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">Share this page</p>
            <ShareButtons />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
