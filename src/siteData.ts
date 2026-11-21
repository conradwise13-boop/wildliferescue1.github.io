export type RouteKey =
  | "home"
  | "about"
  | "stories"
  | "work"
  | "donate"
  | "thankyou"
  | "transparency"
  | "contact"
  | "admin";

export interface SiteStat {
  id: string;
  label: string;
  value: string;
  note: string;
}

export interface RescueStory {
  id: string;
  title: string;
  species: string;
  location: string;
  image: string;
  alt: string;
  summary: string;
  journey: string;
  care: string;
  progress: string;
  verified: boolean;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  date: string;
  category: string;
  body: string;
  status: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  caption: string;
  href: string;
  placeholder: boolean;
}

export const PAYPAL_CAMPAIGN_ID = "TSKDAKWYK6WLC";
export const PAYPAL_DONATE_ENDPOINT = "https://www.paypal.com/donate";

export interface SiteContent {
  brand: string;
  tagline: string;
  email: string;
  location: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  xUrl: string;
  paypalCampaignId: string;
  paypalCheckoutEnabled: boolean;
  stats: SiteStat[];
  stories: RescueStory[];
  updates: ProjectUpdate[];
  instagramPosts: InstagramPost[];
}

export const NAV_ITEMS: { key: RouteKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About Us" },
  { key: "stories", label: "Rescue Stories" },
  { key: "work", label: "Our Work" },
  { key: "transparency", label: "Transparency" },
  { key: "contact", label: "Contact" },
];

export const ROUTE_META: Record<RouteKey, { title: string; description: string }> = {
  home: {
    title: "Wild Haven | Wildlife Rescue & Conservation",
    description:
      "Protecting Wildlife. Saving Lives. Preserving Our Future. Learn about wildlife rescue, conservation, transparent giving, and how to support a second chance for wild animals.",
  },
  about: {
    title: "About Us | Wild Haven",
    description:
      "Our mission, vision and values for protecting wildlife from poaching, illegal captivity, abuse and exploitation.",
  },
  stories: {
    title: "Rescue Stories | Wild Haven",
    description:
      "Editable rescue story templates for verified animal rescue journeys, care pathways and recovery progress.",
  },
  work: {
    title: "Our Work | Wild Haven",
    description:
      "Our conservation program areas: rescue from captivity, anti-poaching, injured wildlife care, endangered species and education.",
  },
  donate: {
    title: "Donate | Wild Haven",
    description:
      "Support wildlife rescue with one-time or monthly giving. Secure payment is completed on PayPal's hosted donation campaign; no card data is collected on this website.",
  },
  thankyou: {
    title: "Thank You | Wild Haven",
    description:
      "Thank you for supporting wildlife rescue and conservation. PayPal's confirmation and receipt are authoritative for completed donations.",
  },
  transparency: {
    title: "Transparency | Wild Haven",
    description:
      "Verification-first reporting on donation use, project updates, rescue reports and supporter impact.",
  },
  contact: {
    title: "Contact | Wild Haven",
    description:
      "Get in touch about wildlife rescue, conservation, volunteering, media and supporter questions.",
  },
  admin: {
    title: "Content Manager | Wild Haven",
    description:
      "Browser-local prototype content manager for rescue stories, statistics, updates, Instagram placeholders and site settings.",
  },
};

const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMAGES = {
  hero: px(9154668, 2200, 1400),
  heroSmall: px(9154668, 1200, 800),
  elephant: px(30705675, 1200, 900),
  elephantHerd: px(35477869, 1200, 900),
  elephantClose: px(9154668, 1200, 900),
  elephantWild: px(19530815, 1200, 900),
  lion: px(18551623, 1200, 900),
  lionLandscape: px(35717988, 1400, 900),
  giraffe: px(37453094, 1200, 900),
  giraffeGroup: px(26893479, 1200, 900),
  rhino: px(29506188, 1200, 900),
  rhinoWaterhole: px(26442831, 1200, 900),
  primate: px(28517149, 1200, 900),
  primateFamily: px(32203489, 1200, 900),
  savanna: px(33720956, 1600, 1000),
  acacia: px(31875549, 1200, 900),
  habitat: px(28523280, 1200, 900),
  binoculars: px(5792970, 1200, 900),
  safariDusk: px(16448674, 1200, 900),
  calf: px(16266132, 1200, 900),
};

export const STORY_IMAGE_OPTIONS = [
  { label: "Elephant", value: IMAGES.elephant },
  { label: "Elephant close-up", value: IMAGES.elephantClose },
  { label: "Lion", value: IMAGES.lion },
  { label: "Giraffe", value: IMAGES.giraffe },
  { label: "Rhino", value: IMAGES.rhino },
  { label: "Primate", value: IMAGES.primate },
  { label: "Primate family", value: IMAGES.primateFamily },
  { label: "Savanna", value: IMAGES.savanna },
];

const templateStory = (
  id: string,
  species: string,
  image: string,
  alt: string,
  summary: string,
): RescueStory => ({
  id,
  title: `${species} rescue story template`,
  species,
  location: "Add verified location",
  image,
  alt,
  summary,
  journey:
    "Replace this template with a verified, consent-checked account: how the animal was found, who responded, the intake assessment, and the date of each step.",
  care:
    "Add documented veterinary findings, the approved care plan, welfare checks, and any rehabilitation or sanctuary milestones here.",
  progress: "Awaiting verified case notes",
  verified: false,
});

export const DEFAULT_CONTENT: SiteContent = {
  brand: "Wild Haven",
  tagline: "Wildlife Rescue & Conservation",
  email: "hello@yourorganization.org",
  location: "Add your organization's registered location",
  instagramUrl: "https://www.instagram.com/",
  facebookUrl: "https://www.facebook.com/",
  youtubeUrl: "https://www.youtube.com/",
  xUrl: "https://x.com/",
  paypalCampaignId: PAYPAL_CAMPAIGN_ID,
  paypalCheckoutEnabled: true,
  stats: [
    {
      id: "rescued",
      label: "Animals rescued",
      value: "",
      note: "Awaiting verified figure",
    },
    {
      id: "protected",
      label: "Wildlife protected",
      value: "",
      note: "Awaiting verified figure",
    },
    {
      id: "projects",
      label: "Conservation projects supported",
      value: "",
      note: "Awaiting verified figure",
    },
  ],
  stories: [
    templateStory(
      "story-elephant",
      "Elephant",
      IMAGES.elephant,
      "African elephant and calf in a grassy landscape",
      "A ready-to-edit place for a documented elephant rescue: from first response to long-term recovery.",
    ),
    templateStory(
      "story-lion",
      "Lion",
      IMAGES.lion,
      "Male lion resting in golden savanna grass",
      "A structured template for publishing a verified lion rescue and care journey.",
    ),
    templateStory(
      "story-giraffe",
      "Giraffe",
      IMAGES.giraffe,
      "Close-up portrait of a giraffe in sunlight",
      "A story layout for a giraffe found injured or abandoned, with space for verified recovery notes.",
    ),
    templateStory(
      "story-rhino",
      "Rhino",
      IMAGES.rhino,
      "Rhinoceros grazing in an open grassy habitat",
      "A case-record template for anti-poaching response, veterinary care and protection updates.",
    ),
    templateStory(
      "story-primate",
      "Primate",
      IMAGES.primate,
      "Young chimpanzee sitting outdoors",
      "A template for documenting release from illegal captivity and a welfare-led rehabilitation pathway.",
    ),
  ],
  updates: [
    {
      id: "update-field",
      title: "Field response update template",
      date: "Date to be added",
      category: "Project update",
      body: "Add a verified summary of field activity, the people and permissions involved, and what supporters can independently review.",
      status: "Awaiting verification",
    },
    {
      id: "update-rescue",
      title: "Rescue report template",
      date: "Date to be added",
      category: "Rescue report",
      body: "Add a case reference, intake information, welfare decisions, outcomes and supporting documentation before publishing.",
      status: "Awaiting verification",
    },
    {
      id: "update-finance",
      title: "Donation allocation summary template",
      date: "Reporting period to be added",
      category: "Financial transparency",
      body: "Publish an audited breakdown of restricted and unrestricted funds here. No allocation percentages are shown until verified.",
      status: "Awaiting verification",
    },
  ],
  instagramPosts: [
    {
      id: "ig-1",
      image: IMAGES.elephantHerd,
      alt: "Elephants gathered at a waterhole",
      caption: "Feed post placeholder — connect your official account",
      href: "",
      placeholder: true,
    },
    {
      id: "ig-2",
      image: IMAGES.lionLandscape,
      alt: "Lion in the Maasai Mara landscape",
      caption: "Feed post placeholder — add a verified caption",
      href: "",
      placeholder: true,
    },
    {
      id: "ig-3",
      image: IMAGES.giraffeGroup,
      alt: "Giraffe and zebras on the savanna",
      caption: "Feed post placeholder — add a verified caption",
      href: "",
      placeholder: true,
    },
    {
      id: "ig-4",
      image: IMAGES.calf,
      alt: "Young elephant beside an adult elephant",
      caption: "Feed post placeholder — add a verified caption",
      href: "",
      placeholder: true,
    },
  ],
};

export const PROGRAM_AREAS = [
  {
    id: "captivity",
    number: "01",
    title: "Freedom from chains & illegal captivity",
    short: "Rescue pathways for animals held unlawfully or kept in exploitative conditions.",
    description:
      "We are committed to working with lawful authorities, qualified welfare teams and appropriate sanctuaries so animals kept in chains or illegal captivity can be assessed, safely transported and given species-appropriate long-term care.",
    points: [
      "Welfare-led intake and documentation",
      "Safe transport and quarantine planning",
      "Lifelong sanctuary or carefully assessed return to the wild",
    ],
    image: IMAGES.primate,
    alt: "Young primate sitting outdoors",
  },
  {
    id: "poaching",
    number: "02",
    title: "Protection from poachers",
    short: "Supporting prevention, response and protection for species targeted by illegal wildlife trade.",
    description:
      "Anti-poaching work depends on local expertise, lawful coordination and reliable evidence. Our focus is on supporting protection capacity, responsible reporting and the safety of both wildlife and the people who defend it.",
    points: [
      "Protection and monitoring readiness",
      "Responsible incident reporting",
      "Wildlife-trade awareness and advocacy",
    ],
    image: IMAGES.rhino,
    alt: "Rhinoceros grazing in grassy habitat",
  },
  {
    id: "injured",
    number: "03",
    title: "Care for injured & abandoned wildlife",
    short: "A care pathway centred on veterinary judgement, quiet recovery and minimal stress.",
    description:
      "Injured, orphaned and abandoned animals need specialist assessment before any intervention. We aim to support qualified veterinary care, appropriate nutrition, rehabilitation and outcome decisions based on welfare rather than publicity.",
    points: [
      "Qualified veterinary assessment",
      "Species-appropriate rehabilitation",
      "Transparent outcome reporting",
    ],
    image: IMAGES.calf,
    alt: "Young African elephant beside an adult",
  },
  {
    id: "endangered",
    number: "04",
    title: "Support for endangered species",
    short: "Long-horizon conservation for species whose future depends on sustained protection.",
    description:
      "Protecting endangered species means protecting the relationships between animals, habitat and communities. Our program framework prioritises evidence, local leadership and measurable welfare outcomes.",
    points: [
      "Species-focused protection planning",
      "Habitat and corridor awareness",
      "Long-term, independently reviewable reporting",
    ],
    image: IMAGES.elephantWild,
    alt: "Elephant herd walking through a wide savanna",
  },
  {
    id: "education",
    number: "05",
    title: "Conservation & education",
    short: "Making coexistence, welfare and informed giving part of a global conversation.",
    description:
      "Education helps prevent harm before a rescue is ever needed. We plan accessible materials about illegal captivity, wildlife trade, habitat protection and how supporters can evaluate conservation claims.",
    points: [
      "Clear, source-led learning resources",
      "Community-focused conservation dialogue",
      "Practical guidance for ethical support",
    ],
    image: IMAGES.binoculars,
    alt: "Person looking through binoculars over a green landscape",
  },
];

export const GALLERY_ITEMS = [
  {
    image: IMAGES.safariDusk,
    alt: "Safari vehicle observing wildlife at dusk",
    title: "Field observation",
    label: "Program imagery",
  },
  {
    image: IMAGES.elephantHerd,
    alt: "Elephant family at a waterhole",
    title: "Habitat & herds",
    label: "Program imagery",
  },
  {
    image: IMAGES.primateFamily,
    alt: "Chimpanzee family together outdoors",
    title: "Welfare & social bonds",
    label: "Program imagery",
  },
  {
    image: IMAGES.acacia,
    alt: "Lone acacia tree in golden savanna light",
    title: "Protected landscapes",
    label: "Program imagery",
  },
];

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "CAD", symbol: "$", label: "CAD — Canadian Dollar" },
  { code: "AUD", symbol: "$", label: "AUD — Australian Dollar" },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee" },
  { code: "ZAR", symbol: "R", label: "ZAR — South African Rand" },
  { code: "KES", symbol: "KSh", label: "KES — Kenyan Shilling" },
];

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "India",
  "Kenya",
  "South Africa",
  "United Arab Emirates",
  "Singapore",
  "Other / International",
];

export const safeExternalUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : "";
  } catch {
    return "";
  }
};

export const uid = () =>
  `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
