import ObjectSet from "@/lib/objectset";
import IFunction from "@/types/IFunction";
import { CornieUser } from "@/types/user";
import { StoreOptions } from "vuex";
import { deleteFunction, fetchFunctions } from "./helper";

interface FunctionState {
  functions: IFunction[];
}

export default {
  namespaced: true,
  state: {
    functions: [],
  },
  mutations: {
    setFunctions(state, payload: IFunction[]) {
      const functionsSet = new ObjectSet(
        [...state.functions, ...payload],
        "id"
      );
      state.functions = [...functionsSet];
    },
    deleteFunction(state, id: string) {
      state.functions = state.functions.filter((f) => f.id != id);
    },
  },
  actions: {
    async fetchFunctions(ctx) {
      const { organizationId } = ctx.rootGetters[
        "user/cornieUser"
      ] as CornieUser;
      const functions = await fetchFunctions(organizationId);
      ctx.commit("setFunctions", functions);
    },
    async removeFunction(ctx, id: string) {
      const removed = await deleteFunction(id);
      if (removed) ctx.commit("deleteFunction", id);
    },
  },
} as StoreOptions<FunctionState>;
