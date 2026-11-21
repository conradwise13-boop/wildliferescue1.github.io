import { createContext, useContext } from "react";
import type { RouteKey } from "./siteData";

export interface RouterValue {
  route: RouteKey;
  navigate: (route: RouteKey) => void;
}

export const RouterContext = createContext<RouterValue>({
  route: "home",
  navigate: () => undefined,
});

export const useRouter = () => useContext(RouterContext);
