<template>
  <div class="w-full md">
    <div class="w-full" style="max-height: 90vh; overflow-y: scroll">
      <div
        class="md w-4/12 px-4"
        style="width: 440px"
        v-for="(item, index) in timeline"
        :key="index"
      >
        <div class="md w-full">
          <div class="md w-full">
            <p class="md font-weight-light">{{ item.action }}</p>
            <span class="flex items-center">
              <span
                class="md font-weight-light italic text-xs text-gray-400 mx-3"
                >{{ new Date(item.createdAt).toDateString() }}</span
              >
              <span
                class="md font-weight-light text-lg mx-3"
                style="color: #114ff5"
                >Open</span
              >
              <span class="md font-weight-light text-lg" style="color: #114ff5"
                ><Actors :items="actors"
              /></span>
            </span>
          </div>
          <div
            class="md w-full my-2"
            style="height: 50px; border-left: 1px dashed #878e99"
            v-if="index !== timeline.length - 1"
          ></div>
        </div>
      </div>

      <div class="w-full pb-5 md">
        <div class="container flex justify-end md">
          <a
            @click="() => $emit('closetimeline')"
            class="md cursor-pointer bg-white focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full"
          >
            Close
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Actors from "../../schedules/components/actors.vue";

const appointment = namespace("appointment");

@Options({
  components: {
    Actors,
  },
})
export default class CheckIn extends Vue {
  @Prop({ type: String, default: "" })
  appointmentId!: string;

  @Prop()
  timeline!: string;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  get actors() {
    if (!this.appointmentId) return [];
    const apmt = this.appointments.find(
      (i: any) => i.id === this.appointmentId
    );
    return apmt ? apmt.Practitioners : [];
  }

  async created() {
    if (!this.appointments || this.appointments.length === 0)
      await this.fetchAppointments();
  }
}
</script>
