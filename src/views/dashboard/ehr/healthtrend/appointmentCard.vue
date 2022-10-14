<template>
  <detail-card
    height="337px"
    more="Manage Appointments"
    @add="showAppointment"
    :showTotal="true"
    :count="total"
    @view:all="
      $router.push(`/dashboard/provider/clinical/${patientId}/appointments`)
    "
    title="Appointments"
  >
    <template #empty>
      <div class="p-8" v-if="appointments?.length === 0">
        <noappoint-icon class="flex mt-2 justify-center w-full text-center" />
        <p class="mt-4 text-sm text-gray-500 text-center pb-5">
          Patient have no appoinntment saved. Add new by clicking the add icon
        </p>
      </div>
    </template>

    <div>
      <div
        class="w-full p-2 border-b"
        v-for="(item, index) in items.slice(0, 2)"
        :key="index"
      >
        <div class="w-full">
          <div class="text-xs flex flex-col">
            <div class="w-full flex items-start">
              <div
                class="w-2/12 flex flex-col items-cneter justify-center mr-4"
              >
                <img
                  :src="item.practitionerImage"
                  alt=""
                  class="w-10 h-10 rounded-full"
                />
              </div>
              <div class="w-9/12">
                <div class="w-full">
                  <span class="header">
                    {{ item.practitionerName }}
                  </span>
                </div>
                <div class="w-full">
                  <!-- <span class="subtext">
                    <h5>{{ item.performerSpecialty }}</h5></span
                  > -->
                  <span class="subtext">
                    <h5>{{ item.date }}</h5></span
                  >
                  <span class="text-primary text-sm font-bold">
                    <h5>{{ item.startTime }} {{ item.endTime }}</h5></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </detail-card>
</template>
<script lang="ts">
  import Actors from "@/components/actors.vue";
  import DetailCard from "@/components/detail-card.vue";
  import CalendarIcon from "@/components/icons/acalendar.vue";
  import AddIcon from "@/components/icons/add.vue";
  import NoappointIcon from "@/components/icons/noappoint.vue";
  import MoreActors from "@/views/dashboard/schedules/components/actors.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const appointment = namespace("appointment");
  const patients = namespace("patients");
  const location = namespace("location");

  @Options({
    name: "AppointmentCard",
    components: {
      DetailCard,
      CalendarIcon,
      NoappointIcon,
      MoreActors,
      Actors,
      AddIcon,
    },
  })
  export default class AppointmentCard extends Vue {
    @Prop({ type: Array, default: () => [] })
    appointments!: any[];

    get patientId() {
      return this.$route.params.id as string;
    }

    get total() {
      return this.appointments?.length;
    }

    get items() {
      const appointments = this.appointments?.map((appointment: any) => ({
        practitionerName: appointment.practitioner.name,
        practitionerSpecialty: appointment.practitioner.name,
        practitionerImage: appointment.practitioner.name,
        startTime: new Date(appointment?.endTime).getTime(),
        endTime: new Date(appointment?.endTime).getTime(),
        date: new Date(appointment?.date).toLocaleDateString("en-US"),
      }));
      return appointments;
    }

    showAppointment() {
      this.$emit("showAppointment");
    }
    async created() {}
  }
</script>
<style>
  table tbody tr {
    border-right: 0;
    border-left: 0;
  }
  .overflow-y-hidden {
    overflow-y: unset !important;
  }
</style>
