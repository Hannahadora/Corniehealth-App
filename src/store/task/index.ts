import ObjectSet from "@/lib/objectset";
import ITask from "@/types/ITask";
import { StoreOptions } from "vuex";
import { deleteTask, fetchTasks } from "./helper";

interface TaskState {
  tasks: ITask[];
}

export default {
  namespaced: true,
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks: ITask[]) {
      state.tasks = [...tasks];
    },
    updateTasks(state, tasks: ITask[]) {
      const taskSet = new ObjectSet([...state.tasks, ...tasks], "id");
      state.tasks = [...taskSet];
    },
    deleteTask(state, id: string) {
      const index = state.tasks.findIndex(task => task.id == id);
      if (index < 0) return;
      const tasks = [...state.tasks];
      tasks.splice(index, 1);
      state.tasks = [...tasks];
    },
  },
  actions: {
    async fetchTasks(ctx) {
      const tasks = await fetchTasks();
      ctx.commit("setTasks", tasks);
    },
    async getTaskById(ctx, id: string) {
      if (ctx.state.tasks.length < 1) await ctx.dispatch("fetchTasks");
      return ctx.state.tasks.find(task => task.id == id);
    },
    async deleteTask(ctx, id: string) {
      const deleted = await deleteTask(id);
      if (!deleted) return false;
      ctx.commit("deleteTask", id);
      return true;
    },
  },
} as StoreOptions<TaskState>;
