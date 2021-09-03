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
       Tasks
      </span>
      <span class="w-full h-screen">
          <tasks-empty-state
                v-if="empty"
          />
          <tasks-existing-state
        
          v-else

          />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import IAppointment from "@/types/IAppointment";
import { Options, Vue } from "vue-class-component";
import TasksEmptyState from "./emptyState.vue";
import TasksExistingState from "./existingState.vue";
import { namespace } from "vuex-class";

const appointment = namespace("appointment");

@Options({
  name: "TasksIndex",
  components: {
    TasksEmptyState,
    TasksExistingState,
  },
})
export default class TasksIndex extends Vue {
  addAppointment = false;
  AppointmentToUpdate = {} as IAppointment;

  get empty() {
    return this.appointments.length < 1;
  }

 @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;


created() {
  this.fetchAppointments()
    if (this.appointments.length < 1) this.fetchAppointments();
  }
}
</script>
