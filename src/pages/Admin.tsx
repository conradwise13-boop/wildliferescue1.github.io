import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  PawPrint,
  Plus,
  RotateCcw,
  Settings,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import { ActionLink, BrandIcon, Notice, PageHero } from "../components";
import { useSite } from "../SiteContext";
import {
  IMAGES,
  PAYPAL_DONATE_ENDPOINT,
  STORY_IMAGE_OPTIONS,
  uid,
  type InstagramPost,
  type ProjectUpdate,
  type RescueStory,
} from "../siteData";

type AdminTab = "stories" | "stats" | "updates" | "instagram" | "settings";

const tabs: { key: AdminTab; label: string; description: string; icon: ReactNode }[] = [
  { key: "stories", label: "Rescue stories", description: "Case records & recovery progress", icon: <PawPrint size={16} /> },
  { key: "stats", label: "Statistics", description: "Verified impact figures", icon: <BarChart3 size={16} /> },
  { key: "updates", label: "Project updates", description: "Field & report templates", icon: <FileText size={16} /> },
  { key: "instagram", label: "Instagram", description: "Feed placeholders & post links", icon: <BrandIcon name="instagram" size={16} /> },
  { key: "settings", label: "Site settings", description: "Brand, contact & social URLs", icon: <Settings size={16} /> },
];

function AdminField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  placeholder,
  list,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  list?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-forest-dark">{label}</label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="field resize-y text-sm"
        />
      ) : (
        <input
          id={id}
          type={type}
          list={list}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="field text-sm"
        />
      )}
      {list && (
        <datalist id={list}>
          {STORY_IMAGE_OPTIONS.map((option) => <option key={option.label} value={option.value}>{option.label}</option>)}
        </datalist>
      )}
    </div>
  );
}

function AdminToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-forest/10 bg-cream p-4">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-4 w-4 accent-forest" />
      <span>
        <span className="block text-sm font-bold text-forest-dark">{label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-muted">{description}</span>
      </span>
    </label>
  );
}

export default function Admin() {
  const { content, setContent, resetContent, importContent } = useSite();
  const [tab, setTab] = useState<AdminTab>("stories");
  const [status, setStatus] = useState("");
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const notify = (message: string) => setStatus(message);

  const patch = (partial: Partial<typeof content>) => setContent((previous) => ({ ...previous, ...partial }));

  const updateStory = (id: string, changes: Partial<RescueStory>) =>
    setContent((previous) => ({
      ...previous,
      stories: previous.stories.map((story) => (story.id === id ? { ...story, ...changes } : story)),
    }));

  const addStory = () => {
    const story: RescueStory = {
      id: uid(),
      title: "New rescue story",
      species: "Add species",
      location: "Add verified location",
      image: IMAGES.elephant,
      alt: "Representative wildlife photograph",
      summary: "Add a short, verified summary of this individual animal's rescue.",
      journey: "Add the documented rescue journey here.",
      care: "Add the approved veterinary and rehabilitation care plan here.",
      progress: "Awaiting verified case notes",
      verified: false,
    };
    setContent((previous) => ({ ...previous, stories: [story, ...previous.stories] }));
    setExpandedStory(story.id);
    notify("New story template added. Keep it unverified until documentation is reviewed.");
  };

  const removeStory = (id: string) => {
    setContent((previous) => ({ ...previous, stories: previous.stories.filter((story) => story.id !== id) }));
    setExpandedStory((current) => (current === id ? null : current));
    notify("Story removed.");
  };

  const updateStat = (id: string, changes: Partial<{ value: string; note: string; label: string }>) =>
    setContent((previous) => ({
      ...previous,
      stats: previous.stats.map((stat) => (stat.id === id ? { ...stat, ...changes } : stat)),
    }));

  const updateProjectUpdate = (id: string, changes: Partial<ProjectUpdate>) =>
    setContent((previous) => ({
      ...previous,
      updates: previous.updates.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }));

  const addUpdate = () => {
    const item: ProjectUpdate = {
      id: uid(),
      title: "New project update",
      date: "Date to be added",
      category: "Project update",
      body: "Add a verified update with a source and reporting date.",
      status: "Awaiting verification",
    };
    setContent((previous) => ({ ...previous, updates: [item, ...previous.updates] }));
    notify("Project update template added.");
  };

  const removeUpdate = (id: string) => {
    setContent((previous) => ({ ...previous, updates: previous.updates.filter((item) => item.id !== id) }));
    notify("Project update removed.");
  };

  const updateInstagramPost = (id: string, changes: Partial<InstagramPost>) =>
    setContent((previous) => ({
      ...previous,
      instagramPosts: previous.instagramPosts.map((post) => (post.id === id ? { ...post, ...changes } : post)),
    }));

  const addInstagramPost = () => {
    const post: InstagramPost = {
      id: uid(),
      image: IMAGES.savanna,
      alt: "Representative wildlife photograph",
      caption: "Feed post placeholder — add a verified caption",
      href: "",
      placeholder: true,
    };
    setContent((previous) => ({ ...previous, instagramPosts: [post, ...previous.instagramPosts] }));
    notify("Instagram feed placeholder added.");
  };

  const removeInstagramPost = (id: string) => {
    setContent((previous) => ({ ...previous, instagramPosts: previous.instagramPosts.filter((post) => post.id !== id) }));
    notify("Instagram placeholder removed.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "wild-haven-content.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    notify("Content exported as JSON.");
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const success = importContent(String(reader.result ?? ""));
      notify(success ? "Content imported successfully." : "Import failed: the JSON structure is not valid.");
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleReset = () => {
    if (window.confirm("Reset all browser-local content to the original templates?")) {
      resetContent();
      notify("All content reset to the original templates.");
    }
  };

  const currentTab = tabs.find((item) => item.key === tab) ?? tabs[0];

  return (
    <div>
      <PageHero
        eyebrow="Content manager"
        title="Keep every story honest"
        description="Edit website content, add verified rescue stories and replace placeholders. This prototype saves changes in your browser only."
        image={IMAGES.habitat}
        imageAlt="Sunlight filtering through a green forest"
      />

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Notice tone="amber" icon="lock" title="Prototype editor — connect a secure CMS before public use">
            There is no authentication, server database or audit log here. Anyone with access to this browser can edit the content. Before launch, move this data to a permission-controlled backend and require approval for verified claims.
          </Notice>

          <div className="mt-8 grid gap-6 lg:grid-cols-[250px_1fr]">
            <aside className="hide-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {tabs.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key)}
                  aria-current={tab === item.key ? "page" : undefined}
                  className={`flex min-w-[210px] items-center gap-3 rounded-2xl border p-4 text-left transition lg:min-w-0 ${tab === item.key ? "border-forest bg-forest text-white shadow-lg" : "border-forest/10 bg-white text-forest-dark hover:border-gold"}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tab === item.key ? "bg-white/10 text-gold" : "bg-forest-soft text-forest-mid"}`}>{item.icon}</span>
                  <span>
                    <span className="block text-sm font-extrabold">{item.label}</span>
                    <span className={`mt-0.5 block text-[11px] leading-4 ${tab === item.key ? "text-white/65" : "text-muted"}`}>{item.description}</span>
                  </span>
                </button>
              ))}
            </aside>

            <main className="min-w-0 rounded-[2rem] border border-forest/10 bg-white p-5 card-shadow sm:p-8">
              <div className="flex flex-col justify-between gap-5 border-b border-forest/10 pb-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-dark">Editing</p>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-forest-dark">{currentTab.label}</h2>
                  <p className="mt-1 text-sm text-muted">Changes save automatically to this browser.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={exportJson} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/20 px-4 text-xs font-extrabold text-forest-dark transition hover:bg-cream">
                    <Download size={14} /> Export JSON
                  </button>
                  <label htmlFor="import-json" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-forest/20 px-4 text-xs font-extrabold text-forest-dark transition hover:bg-cream">
                    <Upload size={14} /> Import JSON
                  </label>
                  <input id="import-json" type="file" accept="application/json,.json" className="hidden" onChange={handleImport} />
                  <button type="button" onClick={handleReset} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/20 px-4 text-xs font-extrabold text-forest-dark transition hover:bg-cream">
                    <RotateCcw size={14} /> Reset
                  </button>
                  <ActionLink to="home" variant="forest" className="min-h-11 px-4 py-2 text-xs">View site <ArrowRight size={14} /></ActionLink>
                </div>
              </div>

              {status && (
                <p className="mt-5 flex items-center gap-2 rounded-xl bg-forest-soft px-4 py-3 text-sm font-semibold text-forest-dark" aria-live="polite">
                  <CheckCircle2 size={16} /> {status}
                </p>
              )}

              <div className="mt-7">
                {tab === "stories" && (
                  <div className="space-y-5">
                    <div className="flex flex-col justify-between gap-4 rounded-2xl bg-cream p-5 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-forest-dark">Rescue story records</h3>
                        <p className="mt-1 text-xs leading-6 text-muted">Mark a story verified only when case notes, permissions and photographs have been reviewed.</p>
                      </div>
                      <button type="button" onClick={addStory} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-forest px-5 text-xs font-extrabold text-white transition hover:bg-forest-mid">
                        <Plus size={15} /> Add story
                      </button>
                    </div>
                    {content.stories.map((story) => (
                      <div key={story.id} className="overflow-hidden rounded-2xl border border-forest/10 bg-white">
                        <button
                          type="button"
                          aria-expanded={expandedStory === story.id}
                          aria-controls={`story-panel-${story.id}`}
                          onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                          className="flex w-full cursor-pointer items-center justify-between gap-3 bg-cream/60 px-5 py-4 text-left transition hover:bg-cream"
                        >
                          <span className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${story.verified ? "bg-forest-mid" : "bg-gold"}`} />
                            <span className="text-sm font-extrabold text-forest-dark">{story.title || "Untitled story"}</span>
                            <span className="hidden rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-muted sm:inline">{story.verified ? "Verified" : "Template"}</span>
                          </span>
                          <span className="shrink-0 text-xs font-bold text-forest-mid">{expandedStory === story.id ? "Close" : "Edit"}</span>
                        </button>
                        {expandedStory === story.id && (
                        <div id={`story-panel-${story.id}`} className="space-y-5 border-t border-forest/10 p-5">
                          <div className="grid gap-4 sm:grid-cols-3">
                            <AdminField label="Story title" value={story.title} onChange={(value) => updateStory(story.id, { title: value })} />
                            <AdminField label="Species" value={story.species} onChange={(value) => updateStory(story.id, { species: value })} />
                            <AdminField label="Location" value={story.location} onChange={(value) => updateStory(story.id, { location: value })} />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                            <AdminField label="Image URL" value={story.image} onChange={(value) => updateStory(story.id, { image: value })} list={`story-images-${story.id}`} />
                            <img src={story.image} alt="Story preview" className="h-20 w-28 rounded-xl border border-forest/10 object-cover" />
                          </div>
                          <AdminField label="Image alt text" value={story.alt} onChange={(value) => updateStory(story.id, { alt: value })} />
                          <AdminField label="Short summary" value={story.summary} onChange={(value) => updateStory(story.id, { summary: value })} multiline />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <AdminField label="Rescue journey" value={story.journey} onChange={(value) => updateStory(story.id, { journey: value })} multiline rows={5} />
                            <AdminField label="Care & rehabilitation" value={story.care} onChange={(value) => updateStory(story.id, { care: value })} multiline rows={5} />
                          </div>
                          <AdminField label="Recovery progress" value={story.progress} onChange={(value) => updateStory(story.id, { progress: value })} />
                          <AdminToggle
                            label="Mark as verified case record"
                            description="Only check this after documentation, image permissions and welfare review are complete."
                            checked={story.verified}
                            onChange={(checked) => updateStory(story.id, { verified: checked })}
                          />
                          <button type="button" onClick={() => removeStory(story.id)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-extrabold text-red-700 transition hover:bg-red-50">
                            <Trash2 size={14} /> Delete story
                          </button>
                         </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {tab === "stats" && (
                  <div className="space-y-5">
                    <Notice tone="green" title="Leave a value blank until verified">
                      Empty values display as an em dash (—) on the website. Never use an estimate as a published impact figure.
                    </Notice>
                    {content.stats.map((stat) => (
                      <div key={stat.id} className="grid gap-4 rounded-2xl border border-forest/10 bg-cream/50 p-5 sm:grid-cols-3">
                        <AdminField label="Label" value={stat.label} onChange={(value) => updateStat(stat.id, { label: value })} />
                        <AdminField label="Verified value" value={stat.value} onChange={(value) => updateStat(stat.id, { value })} placeholder="—" />
                        <AdminField label="Status note" value={stat.note} onChange={(value) => updateStat(stat.id, { note: value })} />
                      </div>
                    ))}
                  </div>
                )}

                {tab === "updates" && (
                  <div className="space-y-5">
                    <div className="flex flex-col justify-between gap-4 rounded-2xl bg-cream p-5 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-forest-dark">Project & report updates</h3>
                        <p className="mt-1 text-xs leading-6 text-muted">Updates appear on the Transparency page. Keep status honest while evidence is pending.</p>
                      </div>
                      <button type="button" onClick={addUpdate} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-forest px-5 text-xs font-extrabold text-white transition hover:bg-forest-mid">
                        <Plus size={15} /> Add update
                      </button>
                    </div>
                    {content.updates.map((item) => (
                      <div key={item.id} className="space-y-4 rounded-2xl border border-forest/10 p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <AdminField label="Title" value={item.title} onChange={(value) => updateProjectUpdate(item.id, { title: value })} />
                          <AdminField label="Date / reporting period" value={item.date} onChange={(value) => updateProjectUpdate(item.id, { date: value })} />
                          <AdminField label="Category" value={item.category} onChange={(value) => updateProjectUpdate(item.id, { category: value })} />
                          <AdminField label="Status" value={item.status} onChange={(value) => updateProjectUpdate(item.id, { status: value })} />
                        </div>
                        <AdminField label="Update body" value={item.body} onChange={(value) => updateProjectUpdate(item.id, { body: value })} multiline rows={4} />
                        <button type="button" onClick={() => removeUpdate(item.id)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-extrabold text-red-700 transition hover:bg-red-50">
                          <Trash2 size={14} /> Delete update
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "instagram" && (
                  <div className="space-y-5">
                    <Notice tone="green" title="Live Instagram feed is not connected">
                      Add official post URLs and captions here, or connect an authenticated Instagram API before publishing a live feed. Placeholder cards are clearly labeled on the website.
                    </Notice>
                    <div className="flex justify-end">
                      <button type="button" onClick={addInstagramPost} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-xs font-extrabold text-white transition hover:bg-forest-mid">
                        <Plus size={15} /> Add feed card
                      </button>
                    </div>
                    {content.instagramPosts.map((post) => (
                      <div key={post.id} className="space-y-4 rounded-2xl border border-forest/10 p-5">
                        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                          <AdminField label="Image URL" value={post.image} onChange={(value) => updateInstagramPost(post.id, { image: value })} list={`ig-images-${post.id}`} />
                          <img src={post.image} alt="Feed card preview" className="h-20 w-20 rounded-xl border border-forest/10 object-cover" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <AdminField label="Alt text" value={post.alt} onChange={(value) => updateInstagramPost(post.id, { alt: value })} />
                          <AdminField label="Post URL (optional)" type="url" value={post.href} onChange={(value) => updateInstagramPost(post.id, { href: value })} placeholder="https://www.instagram.com/p/..." />
                        </div>
                        <AdminField label="Caption" value={post.caption} onChange={(value) => updateInstagramPost(post.id, { caption: value })} />
                        <AdminToggle
                          label="Show as feed placeholder"
                          description="Uncheck only when this card links to a real, approved post."
                          checked={post.placeholder}
                          onChange={(checked) => updateInstagramPost(post.id, { placeholder: checked })}
                        />
                        <button type="button" onClick={() => removeInstagramPost(post.id)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-extrabold text-red-700 transition hover:bg-red-50">
                          <Trash2 size={14} /> Delete card
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "settings" && (
                  <div className="space-y-5">
                    <Notice tone="green" icon="heart" title="Replace every placeholder before launch">
                      Add your real organization name, registered location, monitored email address and official social account URLs only when they are ready for public use.
                    </Notice>
                    <div className="grid gap-4 rounded-2xl border border-forest/10 bg-cream/50 p-5 sm:grid-cols-2">
                      <AdminField label="Organization name" value={content.brand} onChange={(value) => patch({ brand: value })} />
                      <AdminField label="Tagline" value={content.tagline} onChange={(value) => patch({ tagline: value })} />
                      <AdminField label="Email address" type="email" value={content.email} onChange={(value) => patch({ email: value })} />
                      <AdminField label="Registered location" value={content.location} onChange={(value) => patch({ location: value })} />
                      <AdminField label="Instagram URL" type="url" value={content.instagramUrl} onChange={(value) => patch({ instagramUrl: value })} />
                      <AdminField label="Facebook URL" type="url" value={content.facebookUrl} onChange={(value) => patch({ facebookUrl: value })} />
                      <AdminField label="YouTube URL" type="url" value={content.youtubeUrl} onChange={(value) => patch({ youtubeUrl: value })} />
                      <AdminField label="X / Twitter URL" type="url" value={content.xUrl} onChange={(value) => patch({ xUrl: value })} />
                      <div className="border-t border-forest/10 pt-5 sm:col-span-2">
                        <h3 className="font-display text-xl font-semibold text-forest-dark">PayPal hosted checkout</h3>
                        <p className="mt-1 text-xs leading-6 text-muted">The campaign form redirects donors to PayPal. Confirm campaign ownership, PayPal auto-return settings and an end-to-end live test before public fundraising.</p>
                      </div>
                      <AdminField label="PayPal campaign ID" value={content.paypalCampaignId} onChange={(value) => patch({ paypalCampaignId: value })} />
                      <div className="sm:col-span-2">
                        <AdminToggle
                          label="Enable PayPal checkout"
                          description="Leave enabled only after the correct campaign account and a live transaction flow have been verified. Disable it to remove the functional PayPal button."
                          checked={content.paypalCheckoutEnabled}
                          onChange={(checked) => patch({ paypalCheckoutEnabled: checked })}
                        />
                      </div>
                      {content.paypalCampaignId.trim() && (
                        <div className="sm:col-span-2">
                          <a
                            href={`${PAYPAL_DONATE_ENDPOINT}?campaign_id=${encodeURIComponent(content.paypalCampaignId.trim())}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/20 bg-white px-4 text-xs font-extrabold text-forest-dark transition hover:border-gold"
                          >
                            Test this PayPal campaign <ExternalLink size={14} />
                          </a>
                          <p className="mt-2 text-xs leading-6 text-muted">If this link shows an error or a different organization, stop and fix the campaign ID in PayPal before launching.</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-[#fff9e9] p-5 text-sm leading-7 text-ink">
                      <ShieldAlert size={20} className="mt-1 shrink-0 text-gold-dark" />
                      Do not enter payment provider keys, passwords or private donor information here. Browser-local storage is not a secure content backend.
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
