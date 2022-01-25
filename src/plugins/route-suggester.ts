import LocalStore from "@/lib/localstore";
import store from "@/store";
import localstore from "./localstore";

interface Route {
  path: string;
  name: string;
  position: number;
}

export class RouteSuggester {
  private readonly _recents: Map<string, Route> = new Map();
  private readonly MAX_SIZE = 4;

  constructor(
    private store: LocalStore,
    defaults: Route[],
    private reactiveCB: (recents: Route[]) => void
  ) {
    const storedRecents: Route[] = store.get("route-suggestion") || defaults;
    storedRecents.forEach(route => {
      this._recents.set(route.path, route);
    });
    this.makeReactive();
  }

  commit() {
    const recents = this.getRecentRoutes();
    this.store.put("route-suggestion", recents, 30);
  }

  getRecentRoutes() {
    return this.getEntries();
  }

  rememberRoute(path: string, name: string) {
    const route = { name, path, position: -1 };
    this._recents.set(path, route);
    const entries = this.getEntries();
    const updatedRoutes = this.rearrangeRoutes(entries);
    this._recents.clear();
    updatedRoutes.forEach(route => {
      this._recents.set(route.path, route);
    });
    this.makeReactive();
  }

  private makeReactive() {
    const recents = this.getRecentRoutes();
    this.reactiveCB(recents);
  }
  private rearrangeRoutes(routes: Route[]) {
    routes.sort((a, b) => a.position - b.position);
    let cursor = 0;
    const updatedRoutes = routes
      .map(route => {
        const position = cursor;
        cursor++;
        return { ...route, position };
      })
      .filter(({ position }) => position <= this.MAX_SIZE);
    return updatedRoutes;
  }

  private getEntries() {
    return [...this._recents.entries()].map(([_, route]) => route);
  }
}
const DEFAULT_ROUTES: Route[] = [
  {
    path: "/dashboard/provider/settings/practice-information",
    name: "Practice Information",
    position: 0,
  },
  {
    path: "/dashboard/provider/settings/location",
    name: "Location",
    position: 1,
  },
  {
    path: "/dashboard/provider/settings/contact-info",
    name: "Contact Information",
    position: 2,
  },
  {
    path: "/dashboard/provider/settings/practise-management/booking-site",
    name: "Booking Site",
    position: 3,
  },
  {
    path: "/dashboard/provider/settings/health-services",
    name: "Healthcare Services",
    position: 4,
  },
];

const cb = (recents: Route[]) =>
  store.commit("routerStore/setRecents", recents);

export const suggester = new RouteSuggester(localstore, DEFAULT_ROUTES, cb);
(window as any).suggester = suggester;
window.onbeforeunload = () => {
  suggester.commit();
  return null;
};
