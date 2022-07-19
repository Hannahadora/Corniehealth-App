<template>
  <div>
    <div class="mt-5 -mb-5 w-full">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>

    <div class="mt-5 mb-5 pb-2 w-ful border-b-2 border-gray-200">
      <span class="font-bold">Appointments</span>
    </div>

    <div class="mt-16 mb-16">
      <cornie-table :columns="rawHeaders" v-model="sortAppointments">
        <template #actions="{ item }">
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <newview-icon class="text-blue-300 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAppointment(item.id)"
          >
            <newview-icon class="text-blue-300 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            @click="showStatus(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showCheckinPane(item.id)"
          >
            <checkin-icon />
            <span class="ml-3 text-xs">Check-In</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="makeNotes(item.id)"
          >
            <note-icon class="text-green-600 fill-current" />
            <span class="ml-3 text-xs">Make Notes</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <cancel-icon />
            <span class="ml-3 text-xs">Cancel</span>
          </div>
        </template>
        <!-- <template #Participants="{ item }">
        <div class="flex items-center">
          <span class="text-xs">{{ item.Participants }}</span>
          <eye-icon
            class="cursor-pointer ml-3"
            @click="displayParticipants(item.id)"
          />
        </div>
      </template> -->
        <template #Practitioners="{ item }">
          <actors-section
            :items="item.Practitioners"
            class="cursor-pointer"
            @click="displayParticipants(item.id)"
          />
        </template>
        <template #date="{ item }">
          {{ item.date }}/{{ item.startTime }}
        </template>
        <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'Proposed'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
              v-if="item.status == 'Pending'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-200 text-green-500 p-1 rounded"
              v-if="item.status == 'Booked'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'Arrived'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-200 text-green-500 p-1 rounded"
              v-if="item.status == 'Fullfiled'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-300 text-red-600 p-1 rounded"
              v-if="item.status == 'Cancelled'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
              v-if="item.status == 'No show'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'Entered-in-Error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-200 text-green-500 p-1 rounded"
              v-if="item.status == 'Checked-in'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'Waitlist'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
      </cornie-table>
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { namespace } from "vuex-class";

  import IAppointment from "@/types/IAppointment";
  import { IPatient } from "@/types/IPatient";

  import AccordionComponent from "@/components/accordion-component-care-team.vue";
  import Avatar from "@/components/avatar.vue";
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import CalendareIcon from "@/components/icons/calendar.vue";

  import ActorsSection from "@/views/dashboard/ehr/appointment/actors.vue";

  import ScreenHeader from "./Header.vue";

  const appointment = namespace("appointment");
  const patients = namespace("patients");

  @Options({
    name: "PateintAppoitment",
    components: {
      CalendareIcon,
      AccordionComponent,
      Avatar,
      CornieTable,
      ScreenHeader,
      ActorsSection,
    },
  })
  export default class PateintAppoitment extends Vue {
    @appointment.State
    patientappointments!: IAppointment[];

    @appointment.Action
    fetchByIdAppointments!: (patientId: string) => Promise<void>;

    @patients.State
    patients!: IPatient[];

    @patients.Action
    fetchPatients!: () => Promise<void>;

    onePatientId = "";

    rawHeaders = [
      { title: "REquest date", key: "createdAt", show: true },
      { title: "Appointment Id", key: "idn", show: true },
      {
        title: "Appointment Type",
        key: "appointmentType",
        show: true,
      },
      {
        title: "Patient",
        key: "patient",
        show: false,
      },
      {
        title: "Practitioners",
        key: "Practitioners",
        show: true,
      },
      {
        title: "Appointment date/time",
        key: "date",
        show: true,
      },
      {
        title: "Status",
        key: "status",
        show: true,
      },
      {
        title: "Code",
        key: "reasonCode",
        show: false,
      },
      {
        title: "Reason Reference",
        key: "reasonRef",
        show: false,
      },
      {
        title: "Period",
        key: "newperiod",
        show: false,
      },
      {
        title: "Priority",
        key: "priority",
        show: false,
      },
      {
        title: "Description",
        key: "description",
        show: false,
      },
      {
        title: "Consultation Medium",
        kwy: "consultationMedium",
        show: false,
      },
    ];

    get items() {
      const filteritems = this.patientappointments.filter((c) => c !== null);
      const patientappointments = filteritems.map((patientappointment: any) => {
        (patientappointment as any).createdAt = new Date(
          (patientappointment as any).createdAt
        ).toLocaleDateString();

        (patientappointment as any).updatedAt = new Date(
          (patientappointment as any).updatedAt
        ).toLocaleDateString("en-US");

        const pateintId = patientappointment.Patients.map((patient: any) => {
          this.onePatientId = patient.patientId;
        });

        return {
          ...patientappointment,
          action: patientappointment.id,
          patient: this.getPatientName(this.onePatientId),
        };
      });
      return patientappointments;
    }

    getPatientName(id: string) {
      const pt = this.patients.find((i: any) => i.id === id);
      return pt ? `${pt.firstname} ${pt.lastname}` : "";
    }

    get patientId() {
      return this.$route.params.id as string;
    }
    get sortAppointments() {
      return this.items.slice().sort(function (a: any, b: any) {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
    }
    async created() {
      await this.fetchByIdAppointments(this.patientId);
      await this.fetchPatients();
    }
  }
</script>
