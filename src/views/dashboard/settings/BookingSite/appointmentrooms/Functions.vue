<template>
  <main class="">
    <div class="flex justify-items-end">
      <span class="flex-grow"></span>
    </div>
    <!-- <empty-state heading="No function recorded" v-if="isEmpty">
      <template #icon>
        <img src="@/assets/img/functions.svg" class="inline-block mr-2" />
      </template>
      <template #actions>
        <div class="mt-2">
          <button
            class="
              bg-danger
              rounded-full
              text-white
              py-2
              px-6
              focus:outline-none
              hover:opacity-90
            "
            @click="addFunction = true"
          >
            <img src="@/assets/img/plus.svg" class="inline-block mr-2" />
            New Function
          </button>
          <button
            class="
              border-primary border-2
              rounded-full
              text-black
              ml-2
              py-2
              px-6
              focus:outline-none
              outline
              hover:bg-primary
              hover:text-white
            "
          >
            View Org. Structure
          </button>
        </div>
      </template>
    </empty-state> -->
    <!-- <existing-state :functions="functions" v-else /> -->
        <existing-state :appointmentrooms="appointmentrooms" />

    <add-function v-model="addFunction" />
  </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EmptyState from "@/components/CornieEmptyState.vue";
import ExistingState from "./ExistingState.vue";
import AddFunction from "./add-function.vue";
import { namespace } from "vuex-class";
import IFunction from "@/types/IFunction";

import IAppointmentRoom from "@/types/IAppointmentRoom";


const orgFunctions = namespace("OrgFunctions");
const AppointmentRoom = namespace("AppointmentRoom");

@Options({
  name: "Functions",
  components: {
    EmptyState,
    AddFunction,
    ExistingState,
  },
})
export default class Functions extends Vue {
  addFunction = false;

  @orgFunctions.State
  functions!: IFunction[];

  @AppointmentRoom.State
  appointmentrooms!: IAppointmentRoom[];

  @AppointmentRoom.Action
  fetchAppointmentrooms !: () => Promise<void>;

  @orgFunctions.Action
  fetchFunctions!: () => Promise<void>;

  get isEmpty() {
    return this.functions.length < 1;
  }

  created() {
    if (!this.functions?.length) this.fetchFunctions();
    if (!this.appointmentrooms?.length) this.fetchAppointmentrooms();
  }
}
</script>

<style></style>
