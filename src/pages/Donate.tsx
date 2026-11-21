import { useEffect, useState } from "react";
import {
  ArrowRight,
  Copy,
  ExternalLink,
  Globe2,
  HeartHandshake,
  Leaf,
  LockKeyhole,
  PawPrint,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";
import { ActionLink, Notice, PageHero, Reveal, SectionHeading } from "../components";
import { useSite } from "../SiteContext";
import { IMAGES, PAYPAL_DONATE_ENDPOINT } from "../siteData";

const uses = [
  { icon: Truck, title: "Rescue response", text: "Safe transport, intake equipment and the logistics needed for a welfare-led response." },
  { icon: Stethoscope, title: "Veterinary care", text: "Assessment, treatment, nutrition, rehabilitation and long-term species-appropriate care." },
  { icon: ShieldCheck, title: "Protection work", text: "Lawful anti-poaching support, monitoring readiness and protection for vulnerable species." },
  { icon: Leaf, title: "Education & reporting", text: "Conservation learning, case documentation and transparent public updates." },
];

const trust = [
  { icon: LockKeyhole, text: "No card or bank details are requested on this website." },
  { icon: ShieldCheck, text: "PayPal's hosted campaign controls the amount, currency and monthly option." },
  { icon: ReceiptText, text: "PayPal issues a receipt only after a successful payment." },
];

const onPayPal = [
  { icon: PawPrint, title: "Choose your amount", text: "PayPal's campaign page shows the amount options, including any monthly choice." },
  { icon: ExternalLink, title: "Confirm securely", text: "Enter your payment details on PayPal's encrypted page — never on this website." },
  { icon: ReceiptText, title: "Get your receipt", text: "PayPal confirms the payment and emails its own receipt to you." },
];

export default function Donate() {
  const { content } = useSite();
  const [copyStatus, setCopyStatus] = useState("");

  const campaignId = content.paypalCampaignId.trim();
  const paypalEnabled = content.paypalCheckoutEnabled && campaignId.length > 0;
  const paypalCampaignUrl = paypalEnabled
    ? `${PAYPAL_DONATE_ENDPOINT}?campaign_id=${encodeURIComponent(campaignId)}`
    : "";

  const copyPaypalLink = async () => {
    if (!paypalCampaignUrl) return;
    try {
      await navigator.clipboard.writeText(paypalCampaignUrl);
      setCopyStatus("PayPal campaign link copied.");
    } catch {
      setCopyStatus(`Copy is unavailable. Open this address manually: ${paypalCampaignUrl}`);
    }
  };

  // Donating via any site button lands here, so bring the PayPal donation
  // button into view. Deferred so the route change finishes scrolling to the
  // top first, and instant for visitors who prefer reduced motion.
  useEffect(() => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      document
        .getElementById("donate-button")
        ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }, 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Donate"
        title="Give wildlife a second chance"
        description="Use the PayPal donation button below. PayPal collects your payment details on its own secure page — this website never sees or stores them."
        image={IMAGES.calf}
        imageAlt="A young African elephant standing beside an adult elephant"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Notice tone="green" icon="lock" title="PayPal hosted checkout is connected">
              The donation button opens the organization's PayPal campaign page. PayPal confirms the amount, currency and monthly option there. If it does not open, use the in-window link or copy the campaign address.
            </Notice>
          </Reveal>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-white card-shadow">
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-dark via-gold to-gold-light" aria-hidden="true" />
                <div className="border-b border-forest/10 bg-cream px-6 py-7 sm:px-9">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20"><HeartHandshake size={20} /></span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-dark">Make an impact</p>
                      <h2 className="font-display text-2xl font-semibold text-forest-dark sm:text-3xl">Donate securely</h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-9">
                  {paypalEnabled ? (
                    <div id="donate-button" className="scroll-mt-32 rounded-3xl border border-gold/45 bg-[#fff9e9] p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/25"><LockKeyhole size={22} /></span>
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-dark">Donate now</p>
                            <h3 className="font-display text-2xl font-semibold text-forest-dark">Give through PayPal</h3>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-forest-mid">
                          <ShieldCheck size={12} /> Hosted by PayPal
                        </span>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-muted">
                        Press the button to donate. No payment has been made yet — PayPal's receipt is the authoritative confirmation.
                      </p>

                      <form
                        action={PAYPAL_DONATE_ENDPOINT}
                        method="post"
                        target="_blank"
                        aria-label="PayPal donation button"
                        className="mt-6 flex flex-col items-center rounded-2xl bg-gradient-to-b from-white to-cream px-4 py-5 shadow-inner ring-1 ring-gold/30"
                      >
                        <input type="hidden" name="campaign_id" value={campaignId} />
                        <input
                          type="image"
                          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                          style={{ border: 0 }}
                          name="submit"
                          title="PayPal - The safer, easier way to pay online!"
                          alt="Donate with PayPal button"
                          className="h-16 w-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] transition hover:scale-[1.05]"
                        />
                        <img
                          alt=""
                          src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                          width={1}
                          height={1}
                          style={{ border: 0 }}
                          className="hidden"
                        />
                      </form>
                      <p className="mt-2 text-center text-xs text-muted">Official PayPal donation button. Opens PayPal's secure campaign page in a new tab.</p>

                      <div className="mt-4 flex flex-col items-center justify-center gap-2 text-xs sm:flex-row sm:gap-5">
                        <a
                          href={paypalCampaignUrl}
                          className="font-bold text-forest-mid underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
                        >
                          Button not opening? Continue in this window
                        </a>
                        <button
                          type="button"
                          onClick={() => { void copyPaypalLink(); }}
                          className="inline-flex items-center gap-1.5 font-bold text-forest-mid transition hover:text-gold-dark"
                        >
                          <Copy size={13} /> Copy PayPal link
                        </button>
                      </div>
                      {copyStatus && (
                        <p className="mt-3 break-all rounded-xl bg-white px-3 py-2 text-center text-xs text-forest-dark" aria-live="polite">
                          {copyStatus}
                        </p>
                      )}

                      <div className="mt-6 border-t border-gold/30 pt-6">
                        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-dark">What happens on PayPal</h4>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          {onPayPal.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="rounded-2xl border border-forest/10 bg-gradient-to-b from-white to-cream p-4 text-center shadow-[0_6px_20px_-14px_rgba(6,42,32,0.4)]">
                              <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20"><Icon size={16} /></span>
                              <h5 className="mt-3 text-xs font-extrabold text-forest-dark">{title}</h5>
                              <p className="mt-1 text-[11px] leading-5 text-muted">{text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-forest/10 bg-forest-soft p-4 text-xs leading-6 text-muted">
                        <Globe2 size={16} className="mb-1 text-forest-mid" />
                        International donors are welcome. PayPal sets which currencies, countries and local payment methods are available for this campaign, and handles any conversion itself.
                      </div>

                      <p className="mt-5 text-xs leading-6 text-muted">
                        Seeing a PayPal error? Confirm the campaign is active in your PayPal account and that this ID is from the live (not sandbox) campaign: <strong className="break-all text-forest-dark">{campaignId}</strong>.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3 border-t border-forest/10 pt-5">
                        <ActionLink to="transparency" variant="outline">How donations are used</ActionLink>
                        <ActionLink to="thankyou" variant="ghost" className="!border-forest/25 !text-forest hover:!bg-forest hover:!text-white">
                          Thank-you note
                        </ActionLink>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-gold/45 bg-[#fff9e9] p-6 sm:p-8">
                      <LockKeyhole size={24} className="text-gold-dark" />
                      <h3 className="mt-3 font-display text-2xl font-semibold text-forest-dark">PayPal checkout is disabled</h3>
                      <p className="mt-2 text-sm leading-7 text-forest-dark">
                        An administrator can enable it in Content Manager after verifying the campaign ID and completing a live test. No payment can be made here while it is disabled.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={100}>
                <div className="rounded-3xl border border-forest/10 bg-cream p-7 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/25"><PawPrint size={19} /></span>
                    <h2 className="font-display text-2xl font-semibold text-forest-dark">How donations help wildlife</h2>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">These are the intended areas of support. An audited allocation breakdown will be published only when verified financial data is available.</p>
                  <div className="mt-6 space-y-4">
                    {uses.map(({ icon: Icon, title, text }) => (
                      <div key={title} className="flex gap-4 border-t border-forest/10 pt-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-forest-mid"><Icon size={18} /></span>
                        <div>
                          <h3 className="text-sm font-extrabold text-forest-dark">{title}</h3>
                          <p className="mt-1 text-xs leading-6 text-muted">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="rounded-3xl bg-forest p-7 text-white sm:p-8">
                  <ShieldCheck size={26} className="text-gold" />
                  <h2 className="mt-4 font-display text-2xl font-semibold">Trust, without shortcuts</h2>
                  <div className="mt-6 space-y-4">
                    {trust.map(({ icon: Icon, text }) => (
                      <p key={text} className="flex gap-3 text-sm leading-7 text-white/75">
                        <Icon size={18} className="mt-1 shrink-0 text-gold" /> {text}
                      </p>
                    ))}
                  </div>
                  <ActionLink to="transparency" variant="gold" className="mt-7 w-full sm:w-auto">
                    Read transparency promise <ArrowRight size={16} />
                  </ActionLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            center
            eyebrow="How checkout works"
            title={<>A clear path from intention to <span className="text-gold-dark">PayPal confirmation</span></>}
            description="The PayPal campaign owns the payment experience. This website does not process payments, issue receipts or mark a donation as successful."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {onPayPal.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 80}>
                <div className="h-full rounded-3xl border border-forest/10 bg-white p-7 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold"><Icon size={21} /></span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-forest-dark">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white p-5 text-sm leading-7 text-muted">
                <Icon size={18} className="mt-1 shrink-0 text-forest-mid" /> {text}
              </div>
            ))}
          </div>
          <Reveal className="mt-8">
            <Notice tone="green" icon="heart" title="Questions about giving?">
              Contact us if PayPal does not open or shows a campaign error. Before public fundraising, verify the live campaign ID, test a real transaction and configure the successful-return URL in PayPal.
            </Notice>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
