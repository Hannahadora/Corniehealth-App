import { StoreOptions } from "vuex";
import {
    getShifts,
    getRoles,
    deleteShift,
    createShift,
    getOrg,
    transferRight,
    updateShift,
    activateShift,
    destroyShift,
} from "./helper";

interface RolesStore {
  privileges: any[];
  roles: any[];
  org: any;
  practitioners: [];
  shifts: any[];
}

export default {
    namespaced: true,
    state: {
        privileges: [],
        roles: [],
        org: {},
        practitioners: [],
        shifts: [],
    },
    mutations: {
        setShifts(state, shifts) {
            if (shifts) state.shifts = [...shifts];
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

        removeShift(state, shiftId) {
            if (shiftId) {
                const roles = state.shifts.filter(i => i.id !== shiftId);
                state.roles = [...roles];
            }
        },
    },

    actions: {
        async getShifts(ctx) {
            const shifts = await getShifts();
            ctx.commit("setShifts", shifts);
        },

        async getOrg(ctx) {
            const org = await getOrg();
            ctx.commit("setOrg", org);
        },

        async getRoles(ctx) {
            const roles = await getRoles();

            ctx.commit("setRoles", roles);
        },

        async deleteShift(ctx, id: string) {
            const deleted = await deleteShift(id);

            if (!deleted) return false;
            // ctx.commit("removeShift", id);
            return true;
        },

        async destroyShift(ctx, id: string) {
            const deleted = await destroyShift(id);

            if (!deleted) return false;
            ctx.commit("removeShift", id);
            return true;
        },

        async activateShift(ctx, id: string) {
            const deleted = await activateShift(id);

            if (!deleted) return false;
            // ctx.commit("removeShift", id);
            return true;
        },

        async createShift(ctx, shift: any) {
            const deleted = await createShift(shift);
            if (!deleted) return false;
            // ctx.commit("removeRole", id);
            return true;
        },

        async updateShift(ctx, shift: any) {
            const deleted = await updateShift(shift, shift.id);
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
    },
} as StoreOptions<RolesStore>;
