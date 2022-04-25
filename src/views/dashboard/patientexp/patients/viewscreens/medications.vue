<template>
  <div>
    <div class="mt-5 -mb-5 w-full">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>

    <div class="mt-5 mb-5 pb-2 w-ful border-b-2 border-gray-200">
      <span class="font-bold">Medications</span>
    </div>

    <div class="mt-16 mb-16">
        <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showModal(item.id)">
          <edit-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDetailsModal(item)">
          <eye-icon class="text-purple-700 fill-current" />
          <span class="ml-3 text-xs">View Details</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showStatus(item)">
          <update-icon />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showRefillModal(item.medId)">
              <refill-icon />
              <span class="ml-3 text-xs">Refill Request</span>
            </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showPrintModal(item)">
          <print-icon />
          <span class="ml-3 text-xs">Print</span>
        </div>
      </template>
      <template #prescription="{ item }">
          <p>{{ item.identifier }}</p>
          <p class="text-gray-400">{{ new Date(item.createdAt).toLocaleDateString()}}</p>

      </template>
      <template #subject="{ item }">
          <p>{{ item.patient.firstname +''+ item.patient.lastname}}</p>
          <p class="text-gray-400">{{ item.patient.mrn }}</p>

      </template>
      <template #medication="{ item }">
        <div class="flex space-x-3">
          <div>
            <p>{{ item.genericName}}</p>
            <p class="text-gray-400">{{ item.durationInDays }} days</p>
          </div>
            <medication-drug v-if="item.substitutionAllowed == true" />
            <refill-drug v-else/>
        </div>
      </template>
       <template #dosage="{ item }">
          <p >{{ item.dosageInstruction }}/day</p>
      </template>
       <template #duration="{ item }">
          <p>{{ item.durationInDays }} Days</p>
      </template>
        <template #quantity="{ item }">
           <span>
             {{ item.quantity }}
           </span>
      </template>
      <template #status="{ item }">
          <div class="flex items-center">
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'draft'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-100 text-yellow-400 p-1 rounded"
              v-if="item.status == 'on-hold'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-500 p-1 rounded"
              v-if="item.status == 'active'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'unknown'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-100 text-green-400 p-1 rounded"
              v-if="item.status == 'completed'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-100 text-red-600 p-1 rounded"
              v-if="item.status == 'revoked' || item.status == 'cancelled'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'entered-in-error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'do-not-perform'"
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
import { Options, setup, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import search from "@/plugins/search";

import IRequest from "@/types/IRequest";
import { IPatient } from "@/types/IPatient";

import CalendareIcon from "@/components/icons/calendar.vue";
import AccordionComponent from "@/components/accordion-component-care-team.vue";
import Avatar from "@/components/avatar.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import ActorsSection from "@/views/dashboard/ehr/appointment/actors.vue";

import ScreenHeader from "./Header.vue";

const request = namespace("request");
const patients = namespace("patients");

@Options({
  name: "PateintMedication",
  components: {
    CalendareIcon,
    AccordionComponent,
    Avatar,
    CornieTable,
    ScreenHeader,
    ActorsSection,
  },
})
export default class PateintMedication extends Vue {
   @request.State
  patientrequests!: IRequest[];

  @request.Action
  fetchrequestsById!: (patientId: string) => Promise<void>;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  onePatientId = "";
  query = "";

 rawHeaders = [
    {
      title: "prescription id",
      key: "prescription",
      show: true,
      noOrder: true
    },
    { title: "subject (PATIENT)", key: "subject", show: true,  noOrder: true },
    {
      title: "medication",
      key: "medication",
      show: true,
      noOrder: true
    },
    {
      title: "",
      key: "drug",
      show: true,
      noOrder: true
    },
    {
      title: "dosage",
      key: "dosage",
      show: true,
      noOrder: true
    },
    {
      title: "duration",
      key: "duration",
      show: true,
       noOrder: true
    },
    {
      title: "quantity",
      key: "quantity",
      show: true,
      noOrder: true
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
    {
      title: "course of therapy",
      key: "course",
      show: false,
      noOrder: true
    },
    {
      title: "substitution?",
      key: "substitution",
      show: false,
      noOrder: true
    },
    {
      title: "reason code",
      key: "reasoncode",
      show: false,
      noOrder: true
    },
    {
      title: "refill?",
      key: "refill",
      show: false,
      noOrder: true
    },
    {
      title: "dispense interval",
      key: "interval",
      show: false,
      noOrder: true
    },
    {
      title: "validity period",
      key: "period",
      show: false,
      noOrder: true
    },
    {
      title: "no of refill",
      key: "refillno",
      show: false,
      noOrder: true
    },
    {
      title: "quantity",
      key: "qunatity",
      show: false,
       noOrder: true
    },
    {
      title: "supply duration",
      key: "duration",
      show: false,
       noOrder: true
    },
  ];

  get items() {
    const combined = this.patientrequests.map(this.medicationRequest)
    const requests = combined.flatMap(value => value);

    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }

 medicationRequest( request: any){
    const { medications, ...rest} = request;
    return medications.map((medication:any) => {
      return {...medication, ...rest, medicationId: medication.id, requestId: request.id, createdAt: new Date(request.createdAt).toLocaleDateString()}
    } )
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
    await this.fetchrequestsById(this.patientId);
    await this.fetchPatients();
  }
}
</script>
