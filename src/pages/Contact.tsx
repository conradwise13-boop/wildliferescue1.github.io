import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Globe2, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { BrandIcon, InstagramPreview, Notice, PageHero, Reveal, SectionHeading, type BrandName } from "../components";
import { useSite } from "../SiteContext";
import { IMAGES, safeExternalUrl } from "../siteData";

const faqs = [
  {
    question: "Can I make a donation right now?",
    answer: "PayPal hosted checkout is connected on the Donate page. This website never collects card or bank details; PayPal confirms the final amount, currency and monthly option and issues the receipt. Campaign ownership, auto-return settings and a live end-to-end test should be verified before public fundraising.",
  },
  {
    question: "Are the statistics and rescue stories real?",
    answer: "They are clearly labeled editable placeholders. No rescue totals, outcomes, credentials, partnerships or completed projects are claimed. Verified information can be added in Content Manager.",
  },
  {
    question: "How can I volunteer or collaborate?",
    answer: "Use the contact form to describe your skills and location. Add your organization's own screening, safeguarding and partnership process before making any public commitment.",
  },
];

export default function Contact() {
  const { content } = useSite();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General enquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const instagramUrl = safeExternalUrl(content.instagramUrl) || "https://www.instagram.com/";
  const socials: { name: BrandName; label: string; url: string; fallback: string }[] = [
    { name: "instagram", label: "Instagram", url: content.instagramUrl, fallback: "https://www.instagram.com/" },
    { name: "facebook", label: "Facebook", url: content.facebookUrl, fallback: "https://www.facebook.com/" },
    { name: "youtube", label: "YouTube", url: content.youtubeUrl, fallback: "https://www.youtube.com/" },
    { name: "twitter", label: "X / Twitter", url: content.xUrl, fallback: "https://x.com/" },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mailSubject = `[Website enquiry] ${subject}`;
    const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
    window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
    setStatus(`Your email app should open with a prepared message to ${content.email}. If it does not, copy that address and paste your message manually. No message has been sent by this website.`);
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact us"
        title="Let's speak for the wild"
        description="Questions, story tips, media enquiries, volunteering ideas or concerns about our reporting — we would like to hear from you."
        image={IMAGES.giraffeGroup}
        imageAlt="Giraffe and zebras roaming an African savanna"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Get in touch"
              title={<>Start a <span className="text-forest-mid">conversation</span></>}
              description="Use the form to prepare an email. Replace all placeholder contact details before this site goes live."
            />
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-forest/10 bg-cream p-7 sm:p-8">
                <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
                <div className="relative space-y-6">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20"><Mail size={20} /></span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">Organization email</p>
                      <a href={`mailto:${content.email}`} className="mt-1 block break-all font-display text-xl font-semibold text-forest-dark hover:text-forest-mid">{content.email}</a>
                      <p className="mt-1 text-xs text-muted">Placeholder address — edit in Content Manager.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 border-t border-forest/10 pt-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20"><MapPin size={20} /></span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">Location</p>
                      <p className="mt-1 text-sm font-semibold text-forest-dark">{content.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 border-t border-forest/10 pt-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest text-gold"><Globe2 size={20} /></span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-gold-dark">Supporters</p>
                      <p className="mt-1 text-sm font-semibold text-forest-dark">Worldwide enquiries welcome</p>
                      <p className="mt-1 text-xs text-muted">Add your team's response window here once confirmed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl bg-gradient-to-br from-forest to-forest-dark p-7 text-white shadow-lg shadow-forest/30">
                <div className="flex items-center gap-3">
                  <BrandIcon name="instagram" size={24} />
                  <h3 className="font-display text-2xl font-semibold">Follow our Instagram</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">See future field photography, conservation education and verified rescue updates. Replace the placeholder link with your official account URL.</p>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold px-6 text-sm font-extrabold text-forest-dark shadow-lg shadow-gold/30 transition hover:-translate-y-0.5 hover:from-gold hover:to-gold-light"
                >
                  <BrandIcon name="instagram" size={19} /> Open Instagram <ArrowRight size={16} />
                </a>
                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">Other social links</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((social) => {
                      const href = safeExternalUrl(social.url) || social.fallback;
                      return (
                        <a
                          key={social.label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          title={social.label}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-gold hover:bg-gold hover:text-forest-dark"
                        >
                          <BrandIcon name={social.name} size={18} />
                        </a>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-white/55">Links point to platform homepages until official account URLs are added.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-white p-6 card-shadow sm:p-9">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-forest-mid to-forest text-gold shadow-md shadow-forest/20"><MessageCircle size={20} /></span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-dark">Contact form</p>
                  <h2 className="font-display text-2xl font-semibold text-forest-dark">Send us a message</h2>
                </div>
              </div>
              <Notice tone="green" icon="info" title="Email draft, not a connected inbox">
                This static site has no message backend. Submitting opens your email application with a prepared draft; it does not send a message automatically.
              </Notice>
              <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold text-forest-dark">Your name</label>
                  <input id="contact-name" required autoComplete="name" className="field" placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold text-forest-dark">Email address</label>
                  <input id="contact-email" required type="email" autoComplete="email" className="field" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-bold text-forest-dark">What is this about?</label>
                  <select id="contact-subject" className="field" value={subject} onChange={(event) => setSubject(event.target.value)}>
                    {["General enquiry", "Wildlife concern", "Rescue story", "Donations & transparency", "Volunteering", "Media enquiry", "Report a concern"].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold text-forest-dark">Your message</label>
                  <textarea id="contact-message" required rows={6} className="field resize-y" placeholder="Tell us how we can help. Please do not include payment details." value={message} onChange={(event) => setMessage(event.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-forest px-7 text-sm font-extrabold text-white transition hover:bg-forest-mid sm:w-auto">
                    Prepare email <Send size={16} />
                  </button>
                </div>
              </form>
              {status && (
                <p className="mt-5 flex items-start gap-2 rounded-2xl border border-forest/15 bg-forest-soft p-4 text-sm leading-7 text-forest-dark" aria-live="polite">
                  <CheckCircle2 size={18} className="mt-1 shrink-0" /> {status}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <InstagramPreview />
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading center eyebrow="Good to know" title={<>Questions, <span className="text-gold-dark">answered plainly</span></>} />
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <Reveal key={faq.question} delay={index * 70}>
                  <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-extrabold text-forest-dark transition hover:bg-cream"
                    >
                      {faq.question}
                      <ChevronDown size={18} className={`shrink-0 text-gold-dark transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <p className="border-t border-forest/10 px-6 py-5 text-sm leading-7 text-muted">{faq.answer}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
