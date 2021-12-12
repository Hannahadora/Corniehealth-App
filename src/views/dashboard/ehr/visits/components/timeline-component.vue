<template>
  <div class="w-full md px-4">
    <div class="w-full">
      <p class="md flex items-center justify-between px2" style="width: 440px">
        <span class="md text-primary p-2 text-xl" style="color: #667499"
          >Timeline</span
        >
        <span class="md text-danger cursor-pointer">
          <a class="md" @click="() => (showAll = !showAll)">
            {{ showAll && timeline?.length > 3 ? "See less" : "See all" }}
          </a>
        </span>
      </p>
    </div>
    <div class="w-full" style="max-height: 90vh; overflow-y: scroll">
      <div
        class="md w-4/12 px-4"
        style="width: 440px"
        v-for="(item, index) in actions"
        :key="index"
      >
        <div class="md w-full">
          <div class="md w-full">
            <p class="md font-weight-light">{{ item.action }}</p>
            <span class="flex items-center">
              <span
                class="md font-weight-light italic text-xs"
                style="color: #667499"
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
            style="height: 25px; border-left: 1px dashed #878e99"
            v-if="index !== actions.length - 1"
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
import Actors from "@/views/dashboard/schedules/components/actors.vue";

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
  timeline!: any[];

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  showAll = false;

  get actors() {
    if (!this.appointmentId) return [];
    const apmt = this.appointments.find(
      (i: any) => i.id === this.appointmentId
    );
    return apmt ? apmt.Practitioners : [];
  }

  get actions() {
    if (this.showAll || this.timeline?.length <= 3) return this.timeline;
    return this.timeline?.slice(0, 3);
  }

  async created() {
    if (!this.appointments || this.appointments.length === 0)
      await this.fetchAppointments();
    ;
  }
}
</script>
