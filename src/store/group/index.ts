import ObjectSet from "@/lib/objectset";
import IGroup from "@/types/IGroup";
import { StoreOptions } from "vuex";
import { deleteGroup, fetchGroups, fetchGroupMembers, deleteGroupMembers } from "./helper";
import IGroupMembers from "@/types/IGroupMembers";

interface GroupState {
  groups: IGroup[];
  groupMembers: IGroupMembers[];
}

export default {
  namespaced: true,
  state: {
    groups: [],
    groupMembers: []
  },
  mutations: {
    setGroups(state, groups: IGroup[]) {
      state.groups = [...groups];
    },
    setGroupMembers(state, groupMembers: IGroupMembers[]) {
      state.groupMembers = [...groupMembers];
    },
    updateGroups(state, groups: IGroup[]) {
      const groupSet = new ObjectSet([...state.groups, ...groups], "id");
      state.groups = [...groupSet];
    },
    deleteGroup(state, id: string) {
      const index = state.groups.findIndex(group => group.id == id);
      if (index < 0) return;
      const groups = [...state.groups];
      groups.splice(index, 1);
      state.groups = [...groups];
    },
    deleteGroupMembers(state, id: string) {
      const index = state.groupMembers.findIndex(groupMember => groupMember.id == id);
      if (index < 0) return;
      const groupMembers = [...state.groupMembers];
      groupMembers.splice(index, 1);
      state.groupMembers = [...groupMembers];
    },
  },
  actions: {
    async fetchGroups(ctx) {
      const groups = await fetchGroups();
      ctx.commit("setGroups", groups);
    },
    async fetchGroupMembers(ctx, groupId: string) {
      const groupMembers = await fetchGroupMembers(groupId);
      ctx.commit("setGroupMembers", groupMembers);
    },
    async getGroupById(ctx, id: string) {
      if (ctx.state.groups.length < 1) await ctx.dispatch("fetchGroups");
      return ctx.state.groups.find(group => group.id == id);
    },
    async getGroupMemberById(ctx, id: string) {
      if (ctx.state.groupMembers.length < 1) await ctx.dispatch("fetchGroupMembers");
      return ctx.state.groupMembers.find(groupMember => groupMember.id == id);
    },
    async deleteGroup(ctx, id: string) {
      const deleted = await deleteGroup(id);
      if (!deleted) return false;
      ctx.commit("deleteGroup", id);
      return true;
    },
    async deleteGroupMembers(ctx, id: string) {
      const deleted = await deleteGroupMembers(id);
      if (!deleted) return false;
      ctx.commit("deleteGroupMembers", id);
      return true;
    },
  },
} as StoreOptions<GroupState>;
