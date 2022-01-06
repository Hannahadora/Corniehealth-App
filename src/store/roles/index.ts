// import ObjectSet from "@/lib/objectset";
// import ICareteam from "@/types/ICareteam";
import { StoreOptions } from "vuex";
import {
  getPractitioner,
  getRoles,
  deleteRole,
  createRole,
  getOrg,
  transferRight,
  fetchPractitioners,
} from "./helper";

interface RolesStore {
  privileges: any[];
  roles: any[];
  org: any;
  practitioners: [];
}

export default {
  namespaced: true,
  state: {
    privileges: [],
    roles: [],
    org: {},
    practitioners: [],
  },
  mutations: {
    setPrivileges(state, privileges) {
      if (privileges) state.privileges = [...privileges];
    },

    setRoles(state, roles) {
      if (roles) state.roles = [...roles];
    },

    setOrg(state, org) {
      if (org) state.org = org;
    },

    setPractitioners(state, prs) {
      if (prs) state.practitioners = prs;
    },

    removeRole(state, roleId) {
      if (roleId) {
        const roles = state.roles.filter(i => i.id !== roleId);
        state.roles = [...roles];
      }
    },
  },

  actions: {
    async getPractitioner(ctx) {
      const p = await getPractitioner();
      ctx.commit("setPractioner", p);
    },

    async getOrg(ctx) {
      const org = await getOrg();
      ctx.commit("setOrg", org);
    },

    async getRoles(ctx) {
      const roles = await getRoles();
      ctx.commit("setRoles", roles);
    },
    // async getCareteamById(ctx, id: string) {
    //   if (ctx.state.careteams.length < 1) await ctx.dispatch("fetchCareteams");
    //   return ctx.state.careteams.find((careteam: any) => careteam.id == id);
    // },
    async deleteRole(ctx, id: string) {
      const deleted = await deleteRole(id);

      if (!deleted) return false;
      ctx.commit("removeRole", id);
      return true;
    },

    async createRole(ctx, role: any) {
      const deleted = await createRole(role);
      if (!deleted) return false;
      // ctx.commit("removeRole", id);
      return true;
    },

    async transferRight(ctx, body: any) {
      const deleted = await transferRight(body);
      if (!deleted) return false;
      // ctx.commit("removeRole", id);
      return true;
    },

    async fetchPractitioners(ctx) {
      const practitioners = await fetchPractitioners();
      ctx.commit("setPractitioners", practitioners);
      return practitioners;
    },
  },
} as StoreOptions<RolesStore>;
