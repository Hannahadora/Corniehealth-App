<template>
  <div class="conatainer-fluid h-screen mt-6 bg-white p-4">
    <div class="w-full flex items-center">
      <p class="mb-4 mr-4">View Timeline</p>
      <CornieSelect
        v-model="data.type"
        :items="['Daily', 'Weekly', 'Monthly']"
        style="width: 150px"
      />
    </div>
    <div class="w-full px-2 flex">
      <div class="w-9/12">
        <div
          class="w-full flex"
          v-for="(item, index) in timelines"
          :key="index"
        >
          <div class="w-1/12 py-2 border-t-2 mx-1">
            <span class="text-gray-500 text-xs font-semibold">{{
              new Date(item.createdAt)
                .toTimeString()
                .split(" ")[0]
                .substring(0, 5)
            }}</span>
          </div>
          <div
            class="w-11/12 py-2 flex border-t-2 items-center"
            style="background: #f3fcf8"
          >
            <div class="w-full flex items-center">
              <div class="w-9/12 px-5">
                <AllActors :items="appointment.Practitioners" />
              </div>
              <div class="w-3/12 text-right flex justify-end">
                <span class="flex items-center">
                  <span class="uppercase text-xs font-semibold text-success">{{
                    item.action
                  }}</span>
                  <span class="ml-3 mr-2"><Elipsis /></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/12">
        <div class="w-full ml-3 mb-1">
          <span class="flex items-center w-full border rounded-md py-2">
            <span><CalendarIcon /></span>
            <span class="flex items-center justify-between w-full px-1">
              <span class="">{{
                data.date ? data.date.toLocaleDateString() : ""
              }}</span>
              <span>{{ data.time }}</span>
            </span>
          </span>
        </div>
        <div class="w-full ml-3 border p-2">
          <v-date-picker
            color="red"
            v-model="data.date"
            style="border: none"
          ></v-date-picker>
          <div class="w-12/12">
            <label class="block uppercase mb-1 text-xs font-bold">
              Time
              <input
                type="time"
                name=""
                class="p-3 border rounded-md w-full"
                id=""
                v-model="data.time"
              />
            </label>
          </div>
          <div class="w-full flex justify-end">
            <a class="font-semibold text-primary text-sm">Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CornieSelect from "@/components/cornieselect.vue";
import Elipsis from "@/components/icons/threedot.vue";
import DatetimePicker from "./datetime-picker.vue";
import CalendarIcon from "@/components/icons/red-calendar.vue";
import { namespace } from "vuex-class";
import { Options, Vue } from "vue-class-component";

const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    CornieSelect,
    Elipsis,
    DatetimePicker,
    CalendarIcon,
  },
})
export default class TimelineTable extends Vue {
  @visitsStore.State
  visits!: any[];

  @visitsStore.Action
  getVisits!: () => Promise<void>;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  data: any = {
    date: new Date(),
    time: new Date(Date.now()).toTimeString().split(" ")[0].substring(0, 5),
  };

  get timelines() {
    if (!this.visits || this.visits.length === 0) return [];
    const visit = this.visits.find(
      (i: any) => i.id === this.$route.query.visit
    );

    if (!visit || !visit.timelines) return [];
    return visit.timelines;
  }

  get appointment() {
    if (!this.appointments || this.appointments.length === 0) return {};
    const visit = this.visits.find(
      (i: any) => i.id === this.$route.query.visit
    );

    const appmnt = this.appointments.find(
      (i: any) => i.id === visit.appointmentId
    );
    this.data.date = new Date(appmnt.period.start);
    this.data.time = new Date(appmnt.period.start)
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5);
    return appmnt;
  }

  async created() {
    if (!this.visits || this.visits.length === 0) await this.getVisits();
    if (!this.appointments || this.appointments.length === 0)
      await this.fetchAppointments();
  }
}
</script>

<style scoped></style>
