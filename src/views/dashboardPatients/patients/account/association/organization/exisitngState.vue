<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-3">
      <button
        @click="showMemeberList = !showMemeberList"
        class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
      >
      <span>
           Search Organisation
      </span>
      <span>
        |
      </span>   
       <chevron-down-icon class="stroke-current text-white"/>
      </button>
      <div
        :class="[
            !showMemeberList ? 'hidden' : 'o',
        ]"
        class="absolute shadow h-auto overflow-x-hidden bg-white py-4 border-gray-400 border top-100 z-10 right-8 m-3 rounded overflow-y-auto mt-2"
        style="width: 14%;top: 500px;"
        >
            
           <div class="mb-2 w-full">
               <span class="text-black cursor-pointer w-full px-4 flex text-left text-sm hover:bg-blue-100 rounded-full py-3" @click="showOrgModal = true">Search Organisation</span>
           </div>
            <div class="mb-2 w-full">
                <span class="text-black cursor-pointer w-full px-4 flex text-left text-sm hover:bg-blue-100 rounded-full py-3">Create New</span>
            </div>
        </div>
    </span>
    <cornie-table
      :columns="rawHeaders"
      v-model="items"
      :check="false"
      :fixeHeight="true"
    >
      <template #actions>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showViewProvider = true"
        >
          <eye-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showDependant = true"
        >
          <family-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Dependants</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
      <template #status>
          <span
            class="bg-green-200 text-green-700 text-center rounded-md py-2 px-4 bg-opacity-20"
          >
            Active
          </span>
        </template>
      <!-- <template #status="{item}">
          <span
            :class="{
              'bg-green-200 text-green-800': status == 'active',
              ' bg-red-500 text-red-400': status == 'inactive',
            }"
            class="text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template> -->
    </cornie-table>
  </div>
  <view-modal v-model="showViewProvider"/>
  <dependant-modal v-model="showDependant"/>
  <member-modal v-model="showMember"/>
  <org-modal v-model="showOrgModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/deactivate.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import { Watch } from "vue-property-decorator";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";

import FamilyIcon from "../icons/family.vue";
import DependantModal from "./dependants.vue";
import MemberModal from "./memberModal.vue";
import OrgModal from "../exisitingOrg.vue";


const location = namespace("location");
const dropdown = namespace("dropdown");

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
    FamilyIcon,
    DependantModal,
    MemberModal,
    OrgModal,
  },
})
export default class OrganizationLinkedAccount extends Vue {
  showColumnFilter = false;
  showMemeberList = false;
  query = "";
  showDependant = false;
  showMember = false;
  showOrgModal = false;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  getKeyValue = getTableKeyValue;

  refreshing = false;
  showViewProvider = false;

  dropdowns = {} as IIndexableObject;

  rawHeaders = [
    { title: "DATE ADDED", key: "date", show: true,  noOrder:true },
    { title: "ORGANISATION ID", key: "mrn", show: true, noOrder:true },
    {
      title: "name",
      key: "name",
      show: true,
        noOrder:true
    },
    {
      title: "PHONE NUMBER",
      key: "phone",
      show: true,
        noOrder:true
    },
    {
      title: "RELATIONSHIP",
      key: "gender",
      show: true,
    noOrder:true
    },
    {
      title: "HMO/POLICY #",
      key: "hmo",
      show: true,
      noOrder:true
    },
     {
      title: "Status",
      key: "status",
      show: true,
    },

  ];

   get items() {
    return [{
        ...location,
        index: '1',
        date: '23-11-2022',
        mrn: '0899233445',
        name: 'Emma Ibeh Account Owner',
        phone: '09023467599',
        dob: '05-09-1987',
        gender: 'Member',
        hmo: 'AVON 12778943',
      }];
  }

//   get items() {
//     const locations = this.locations.map((location) => {
//       return {
//         ...location,
//         name: 'Kessigton Hospital',
//         type: 'Hospital/Clinic',
//         address: '5. Avenue Road, Surulere ',
//         contactnumber: '09083445488',
//         emailaddress: 'Info@kessignton.com',
//       };
//     });
//     if (!this.query) return locations;
//     return search.searchObjectArray(locations, this.query);
//   }


  
//   get sortLocations() {
//     return this.items.slice().sort(function (a, b) {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     });
//   }


  async created() {

  }
}
</script>
