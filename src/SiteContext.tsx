import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_CONTENT, type SiteContent } from "./siteData";

const STORAGE_KEY = "wild-haven-content-v1";

interface SiteContextValue {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  resetContent: () => void;
  importContent: (raw: string) => boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const freshDefaults = (): SiteContent => JSON.parse(JSON.stringify(DEFAULT_CONTENT)) as SiteContent;

const loadContent = (): SiteContent => {
  if (typeof window === "undefined") return freshDefaults();
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return freshDefaults();
    const parsed = JSON.parse(saved) as Partial<SiteContent>;
    const defaults = freshDefaults();
    return {
      ...defaults,
      ...parsed,
      paypalCampaignId: typeof parsed.paypalCampaignId === "string" ? parsed.paypalCampaignId : defaults.paypalCampaignId,
      paypalCheckoutEnabled: typeof parsed.paypalCheckoutEnabled === "boolean" ? parsed.paypalCheckoutEnabled : defaults.paypalCheckoutEnabled,
      stats: Array.isArray(parsed.stats) && parsed.stats.length ? parsed.stats : defaults.stats,
      stories: Array.isArray(parsed.stories) ? parsed.stories : defaults.stories,
      updates: Array.isArray(parsed.updates) ? parsed.updates : defaults.updates,
      instagramPosts: Array.isArray(parsed.instagramPosts) ? parsed.instagramPosts : defaults.instagramPosts,
    };
  } catch {
    return freshDefaults();
  }
};

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // Content remains available for this session if storage is unavailable.
    }
  }, [content]);

  const resetContent = useCallback(() => setContent(freshDefaults()), []);

  const importContent = useCallback((raw: string) => {
    try {
      const parsed = JSON.parse(raw) as Partial<SiteContent>;
      if (
        !parsed ||
        typeof parsed !== "object" ||
        !Array.isArray(parsed.stories) ||
        !Array.isArray(parsed.stats) ||
        !Array.isArray(parsed.updates) ||
        !Array.isArray(parsed.instagramPosts)
      ) {
        return false;
      }
      const defaults = freshDefaults();
      setContent({
        ...defaults,
        ...parsed,
        paypalCampaignId: typeof parsed.paypalCampaignId === "string" ? parsed.paypalCampaignId : defaults.paypalCampaignId,
        paypalCheckoutEnabled: typeof parsed.paypalCheckoutEnabled === "boolean" ? parsed.paypalCheckoutEnabled : defaults.paypalCheckoutEnabled,
        stats: parsed.stats,
        stories: parsed.stories,
        updates: parsed.updates,
        instagramPosts: parsed.instagramPosts,
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({ content, setContent, resetContent, importContent }),
    [content, resetContent, importContent],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}
