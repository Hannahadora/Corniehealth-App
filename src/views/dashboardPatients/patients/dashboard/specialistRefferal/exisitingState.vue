<template>
  <div class="w-full pb-7">
    <cornie-table
      :columns="rawHeaders"
      v-model="items"
      :check="false"
      :fixeHeight="true"
      class="hidden md:block"
    >
      <template #actions="{item}">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
           @click="showView(item)"
        >
          <eye-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <appointment-icon />
          <span class="ml-3 text-xs">Book Appointment</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <check-in class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Check-In</span>
        </div>
      </template>
       <template #status>
          <span
            class="bg-green-200 text-green-800 text-center rounded-md p-1 bg-opacity-20"
          >
            Active
          </span>
        </template>
      <!-- <template #status="{item}">
          <span
            :class="{
              'bg-green-200 text-green-800': item.status == 'Active',
              ' bg-red-500 text-red-400': item.status == 'Inactive',
            }"
            class="text-center rounded-md p-1 bg-opacity-20"
          >
            {{ item.status }}
          </span>
        </template> -->
        <template #familyId="{item}">
         <span class="text-blue-500">{{ item.familyId}}</span>
        </template>
         <template #patientName="{item}">
         <span class="text-blue-500">{{ item.patientName}}</span>
        </template>
    </cornie-table>
    <div class="block md:hidden">
        <div class="mb-5">
            <search-section :placeholder="'Search Table'"/>
        </div>
        <div class="bg-white shadow-lg py-2 px-8 w-full rounded-lg h-full">
            <div class="justify-between flex mb-5 border-b-2 py-2 border-gray-200">
                <p class="text-primary">#</p>
                <p>1</p>
            </div>
            <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">request date</p>
                <p>22/01/20</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">referral id</p>
                <p>A1XCD45</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">category</p>
                <p>Counselling</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">specialty</p>
                <p>XXXXXX</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">requester</p>
                <p>XXXXXX</p>
            </div>

             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">performer</p>
                <p>XXXXXX</p>
            </div>
            <div class="justify-between flex mb-5 border-b-2 border-gray-200">
                <p class="text-primary">status</p>
                <p class="bg-yellow-100 text-yellow-500 rounded py-1 text-sm px-2">On-Hold</p>
            </div>
            <div class="flex w-full justify-center py-2">
                    <DotsHorizontalIcon/>
            </div>


        </div>

    </div>
  </div>
  <refferal-modal v-model="showViewModal" :selectedItem="selectedItem"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import { Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import  ISpecialistrefferal  from "@/types/ISpecialistrefferal";

import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";

import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/deactivate.vue";
import CancelIcon from "@/components/icons/cancel-red-bg.vue"
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import CheckIn from "@/components/icons/checkin.vue";
import SearchSection from "@/components/search-input.vue";
import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";

import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import AppointmentIcon from "./icon/appointment.vue";
import RefferalModal from "./viewModal.vue";
import { Codeable } from "@/types/misc";
import { getDropdown } from "@/plugins/definitions";

const location = namespace("location");
const dropdown = namespace("dropdown");
const specialistrefferal = namespace("specialistrefferal");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    EditIcon,
    LocationIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    ChevronDownIcon,
    CancelIcon,
    CheckIn,
    AppointmentIcon,
    RefferalModal,
    SearchSection,
    DotsHorizontalIcon
  },
})
export default class FamilyAsscoation extends Vue {
  showColumnFilter = false;
  showMemeberList = false;
  showViewModal = false;
  query = "";
  selectedItem = {};

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  getKeyValue = getTableKeyValue;

  refreshing = false;
  showViewProvider = false;
  showMember = false;
  familyId = "";

  dropdowns = {} as IIndexableObject;
  Specilaitems: Codeable[] = [];

   
  @specialistrefferal.State
  specialistrefferals!: ISpecialistrefferal[];

  @specialistrefferal.Action
  fetchSpecialistRefferal!: () => Promise<void>;

  rawHeaders = [
    { title: "request date", key: "createdAt", show: true, noOrder:true },
    { title: "referral id", key: "identifier", show: true , noOrder:true},
    {
      title: "category",
      key: "category",
      show: true,
       noOrder:true
    },
    {
      title: "specialty",
      key: "specialty",
      show: true,
       noOrder:true
    },
    {
      title: "requester",
      key: "requester",
      show: true,
       noOrder:true
    },
    {
      title: "performer",
      key: "performer",
      show: true,
       noOrder:true
    },
     {
      title: "Status",
      key: "status",
      show: true,
       noOrder:true
    },

  ];

  showView(value:any){
    this.showViewModal = true;
    this.selectedItem = value;
  }


//  get items() {
//     return [{
//         date: "22/01/20",
//         referralId: "A1XCD45",
//         category: "Counselling",
//         specialty: "XXXXXX",
//         requester: "XXXXXX",
//         performer: "XXXXXX",
//     }]
//   }

  get items() {
    const specialistrefferals = this.specialistrefferals.map((specialistrefferal:any) => {
         (specialistrefferal as any).createdAt = new Date(
        (specialistrefferal as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...specialistrefferal,
        specialty: this.getspecialtyname(specialistrefferal.specialty),
        performer: specialistrefferal.performer.name,
        requester: 'XXXXXX'
      };
    });
    if (!this.query) return specialistrefferals;
    return search.searchObjectArray(specialistrefferals, this.query);
  }
  async setRefs() {
    const reference = "http://hl7.org/fhir/ValueSet/c80-practice-codes";
    const ref = reference.trim();
    const defs = await getDropdown(ref);
    if (defs && Array.isArray(defs)) {
      this.Specilaitems = defs;
    } else {
      window.notify({
        status: "error",
        msg: `Cannot get definitions for ${reference}`,
      });
    }
  }

  getspecialtyname(id: string) {
    const pt = this.Specilaitems.find((i: any) => i.code === id);
    return pt ? `${pt.display}` : "";
  }
  
  get sortAssocaitons() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  showMemberModal(value:string){
    this.showMember = true;
    this.familyId = value;
  }


  async created() {
    this.setRefs();
    await this.fetchSpecialistRefferal();
  }
}
</script>
