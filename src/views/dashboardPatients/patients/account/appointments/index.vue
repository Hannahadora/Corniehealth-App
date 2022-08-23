<template>
  <div class="pb-40">
    <div
      class="bg-white mb-auto h-full shadow-lg p-3 mt-2 rounded-lg w-full"
    >
      <div class="w-full">
        <span
          class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
        >
          Apppointments
        </span>
      </div>

    <div>
      <empty-state v-if="noAppointment"/>
      <existing-state v-else />
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import EmptyState from './emptyState.vue';
import ExistingState from './existingState.vue'

@Options({
  name: "AppointmentPage",
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
    EmptyState,
    ExistingState,
  },
})
export default class AppointmentPage extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  currentTab = 0;
  appointments = <any>[];

  get noAppointment() {
    return this.appointments.length > 0
  }

  async created() {}
}
</script>

<style></style>
