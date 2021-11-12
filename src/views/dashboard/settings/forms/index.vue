<template>
  <div class="flex justify-center  bg-white shadow-md p-3 mt-2 mb-2 rounded w-full">
    <div class="w-full">
    <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
       Forms & Questionnaires
      </span>
      <span class="w-full h-screen">
          <!-- <forms-empty-state
              
          /> -->
          <forms-empty-state
                v-if="empty"
          />
          <forms-existing-state
        
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import ITask from "@/types/ITask";
import { Options, Vue } from "vue-class-component";
import FormsEmptyState from "./emptyState.vue";
import FormsExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const task = namespace("task");

@Options({
  name: "FormsIndex",
  components: {
    FormsEmptyState,
    FormsExistingState,
  },
})
export default class TasksIndex extends Vue {
  addTask = false;
  TaskToUpdate = {} as ITask;

  get empty() {
    return this.tasks.length < 1;
  }

 @task.State
  tasks!: ITask[];

  @task.Action
  fetchTasks!: () => Promise<void>;


created() {
  this.fetchTasks()
    if (this.tasks.length < 1) this.fetchTasks();
  }
}
</script>
