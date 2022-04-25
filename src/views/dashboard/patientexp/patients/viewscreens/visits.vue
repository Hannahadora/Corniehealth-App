<template>
  <div>
    <div class="mt-5 -mb-5 w-full">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>

    <div class="mt-5 mb-5 pb-2 w-ful border-b-2 border-gray-200">
      <span class="font-bold">Visits</span>
    </div>

    <div class="mt-16 mb-16">
     
     <cornie-table :columns="rawHeaders" v-model="items">
    
       <template #status="{ item }">
            <div class="flex items-center">
              <p
                class="text-xs bg-gray-300 p-1 rounded"
                v-if="item.status == 'Vitals acquired' || item.status == 'Visit Ended'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-yellow-100 text-yellow-500 p-1 rounded"
                v-if="item.status == 'Queued' || item.status == 'Waitlisted' || item.status == 'In-Progress' || item.status == 'Bill Processing'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-green-100 text-green-500 p-1 rounded"
                v-if="item.status == 'On-time | Late' || item.status == 'completed' || item.status == 'Diagnostics Completed' || item.status == 'Medication Dispensed' || item.status == 'Discharged' || item.status == 'checked-out' || item.status == 'checked-in'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-purple-100 text-purple-600 p-1 rounded"
                v-if="item.status == 'Referred'"
              >
                {{ item.status }}
              </p>
              <p
                class="text-xs bg-red-100 text-red-600 p-1 rounded"
                v-if="item.status == 'Cancelled'"
              >
                {{ item.status }}
              </p>
            </div>
      </template>
      <template #checkedInBy="{ item }">
           <div class="w-full flex space-x-4 mb-3">
                <div class="w-10 h-10">
                    <avatar
                        class="mr-2"
                        v-if="item.checkedInBy.image"
                        :src="item.checkedInBy.image"
                    />
                    <avatar class="mr-2" v-else :src="localSrc" />
                </div>
                <div class="w-full mt-2">
                    <p class="text-sm text-dark font-semibold">
                        {{ item.checkedInBy.firstName }}
                        {{ item.checkedInBy.lastName }}
                    </p>
                </div>
            </div>

        <!-- <div
          class="container cursor-pointer"
          @click="viewSchedule(item.id)"
        >
          <span class="rounded-full">
            <Actors :items="item.practitioners" />
          </span>
        </div> -->
      </template>
      
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" >
          <eye-icon class="mt-1" />
          <span class="ml-3 text-xs" @click="showTimeline(item.id,item.timelines,item.patient)"
            >View timeline</span >
        </div>
        <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <ArrowRight />
              <span class="ml-3 text-xs" @click="showCheckinPane(item.id)">Check-in</span>
              </div> -->
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="start(item.id)"
        >
          <EncounterIcon class="mr-3 mt-1" />
          <span class="ml-3 text-xs">Start Encounter</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="destroy(item.id)"
        >
          <CancelIcon />
          <span class="ml-3 text-xs">Cancel Visit</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <AddIcon />
          <span class="ml-3 text-xs">Add Vitals</span>
        </div> -->
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <ArrowRight />
          <span class="ml-3 text-xs">Refer Patient</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <ManageBillIcon />
          <span class="ml-3 text-xs">Manage Bill</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <AddIcon />
          <span class="ml-3 text-xs">Admit Patient</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="markAsNoShow(item.id)"
        >
          <NoshowIcon />
          <span class="ml-3 text-xs">No Show</span>
        </div> -->
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="showCheckoutPane(item.id,item.checkedInBy, item.patient,item)">
          <CheckoutIcon />
          <span class="ml-3 text-xs">Check-out</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCheckoutPane(item.id, item.checkedInBy, item.patient,item)">
          <UpdateIcon />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
      </template>
    </cornie-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import search from "@/plugins/search";

import IAppointment from "@/types/IAppointment";
import { IPatient } from "@/types/IPatient";

import CalendareIcon from "@/components/icons/calendar.vue";
import AccordionComponent from "@/components/accordion-component-care-team.vue";
import Avatar from "@/components/avatar.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import ActorsSection from "@/views/dashboard/ehr/appointment/actors.vue";

import ScreenHeader from "./Header.vue";

const visitsStore = namespace("visits");
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
  @visitsStore.Action
  getPatientVisits!: (patientId: string) => Promise<void>;

  @visitsStore.State
  patientVisits!: any[];

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  onePatientId = "";
  query  = "";

  rawHeaders = [
    {
      title: "Check-In Time",
      key: "checkInTime",
      show: true,
      noOrder: true
    },
    {
      title: "visit id",
      key: "id",
      show: true,
      noOrder: true
    },
    // {
    //   title: "visit type",
    //   key: "visittype",
    //   show: true,
    //   noOrder: true
    // },
    {
      title: "practitioner",
      key: "checkedInBy",
      show: true,
       noOrder: true
    },
    {
      title: "period",
      key: "period",
      show: true,
       noOrder: true
    },
     {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const visits = this.patientVisits.map((visit) => {
      visit.checkInTime = new Date(
          visit.checkInTime
        ).toLocaleDateString("en-US");
         visit.checkOutTime = new Date(
          visit.checkOutTime
        ).toLocaleDateString("en-US");
      return {
        ...visit,
        action: visit.id,
        visittype: 'xxxxxx',
        period: visit.checkInTime +'-'+ visit.checkOutTime
      };
    });
    if (!this.query) return visits;
    return search.searchObjectArray(visits, this.query);
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
    await this.getPatientVisits(this.patientId);
    await this.fetchPatients();
  }
}
</script>
