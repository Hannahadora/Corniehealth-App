<template>
  <div class="col-span-2">
    <chart-card
      height="422px"
      title="Today's Appointments"
      action="View appointment"
      @more="$router.push('/dashboard/provider/experience/calendar')"
    >
      <div class="w-full flex flex-col overflow-y-scroll">
        <div
          class="w-full flex items-center mb-4"
          v-for="(appointment, index) in appointments"
          :key="index"
        >
          <span class="text-lg" style="color: #667499">
            {{ appointment.startTime }}
          </span>
          <div class="w-11/12 p-4 ml-8 flex items-center hover:bg-blue-100">
            <img
              class="w-12 h-12 mr-4 rounded-full"
              :src="appointment.image"
              alt=""
            />
            <span class="w-10/12 mr-4">{{ appointment.patientName }}</span>
            <img src="@/assets/icon(2).png" alt="" />
          </div>
        </div>
      </div>

      <div
        v-if="appointments.length === 0"
        class="flex flex-col items-center justify-center"
      >
        <div class="mt-8 w-11/12 mx-auto">
          <img src="@/assets/patientanddoctor.png" alt="" />
        </div>
        <div class="mt-6 flex flex-col items-center justify-center text-center">
          <span class="text-lg font-bold">There's no Active Appointment</span>
          <span style="color: #667499" class="text-sm">
            Active and upcoming appointment will be displayed here
          </span>
        </div>
      </div>
    </chart-card>
  </div>
</template>
<script lang="ts">
import { cornieClient } from "@/plugins/http";
import { splitDate } from "@/plugins/utils";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ChartCard from "./chart-card.vue";

interface AppointmentPatient {
  patientName: string;
  startTime: string;
  endTime: string;
  image: string;
}

@Options({
  components: {
    ChartCard,
  },
})
export default class ApppointmentSummary extends Vue {
  appointments: AppointmentPatient[] = [];

  @Prop({ type: String, required: true })
  locationId!: string;

  async fetchAppointments() {
    try {
      const response = await cornieClient().get(
        `/api/v1/appointment/practitioner/get-day/${this.locationId}`,
        { date: splitDate(new Date()) }
      );
      this.appointments = response.data;
    } catch (error) {
      window.notify({ msg: "Failed to fetch appointments", status: "error" });
    }
  }

  created() {
    this.fetchAppointments();
  }
  _appointments = [
    {
      time: "10:30",
      pImage: require("@/assets/avatar(1).png"),
      pName: "Oluwafunmilayo Adeola Sarah",
    },
    {
      time: "13:45",
      pImage: require("@/assets/avatar(2).png"),
      pName: "Busayo Akindele Deborah",
    },
    {
      time: "16:30",
      pImage: require("@/assets/avatar(3).png"),
      pName: "Group Meeting",
    },
  ];
}
</script>
