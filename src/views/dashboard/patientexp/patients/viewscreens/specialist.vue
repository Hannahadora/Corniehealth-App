<template>
  <div>
    <div class="mt-5 -mb-5 w-full">
      <screen-header :properties="properties"> Bio </screen-header>
    </div>

    <div class="mt-5 mb-5 pb-2 w-ful border-b-2 border-gray-200">
      <span class="font-bold">Specialist Referrals</span>
    </div>

    <div class="mt-16 mb-16">
      <cornie-table :columns="rawHeaders" v-model="items">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showView(item)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showModal(item.id)"
          >
            <edit-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showPrintModal(item)"
          >
            <print-icon />
            <span class="ml-3 text-xs">Print</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showStatus(item)"
          >
            <update-icon />
            <span class="ml-3 text-xs">Update</span>
          </div>
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
              v-if="item.status == 'on-hold' || item.status == 'do-not-perform'"
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
              class="text-xs bg-red-300 text-red-600 p-1 rounded"
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
              v-if="item.status == 'do-Not-perform'"
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

import IRefferal from "@/types/IRefferal";
import ISpecial from "@/types/ISpecial";
import { IPatient } from "@/types/IPatient";

import CalendareIcon from "@/components/icons/calendar.vue";
import AccordionComponent from "@/components/accordion-component-care-team.vue";
import Avatar from "@/components/avatar.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";

import ActorsSection from "@/views/dashboard/ehr/appointment/actors.vue";

import ScreenHeader from "./Header.vue";

const patients = namespace("patients");
const refferal = namespace("refferal");
const special = namespace("special");
const request = namespace("request");

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
  @refferal.State
  patientrefferals!: IRefferal[];

  @refferal.Action
  fetchRefferalById!: (patientId: string) => Promise<void>;

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  @patients.State
  patients!: IPatient[];

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @request.State
  practitioners!: any[];

  @request.Action
  getPractitioners!: () => Promise<void>;

  onePatientId = "";
  query = "";

  rawHeaders = [
    {
      title: "requisition id",
      key: "identifier",
      show: true,
    },
    { title: "category", key: "category", show: true },
    {
      title: "specialty",
      key: "specialty",
      show: true,
    },
    {
      title: "subject",
      key: "subject",
      show: true,
    },
    {
      title: "requester",
      key: "requester",
      show: true,
    },
    {
      title: "PERFORMER",
      key: "performer",
      show: true,
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const refferals = this.patientrefferals.map((refferal: any) => {
      return {
        ...refferal,
        action: refferal.id,
        specialty: this.getspecialtyname(refferal.specialty),
        subject:
          refferal?.patient?.firstname + " " + refferal?.patient?.lastname,
        requester:
          refferal?.patient?.firstname + " " + refferal?.patient?.lastname,
        performer: this.getPractitionerName(refferal.performerId),
      };
    });
    if (!this.query) return refferals;
    return search.searchObjectArray(refferals, this.query);
  }

  getspecialtyname(id: string) {
    const pt = this.specials.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.organizationId === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
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
    await this.fetchRefferalById(this.patientId);
    await this.fetchPatients();
    await this.fetchSpecials();
    await this.getPractitioners();
  }
}
</script>
