<template>
  <div class="w-full pb-7">
    <cornie-table
      :columns="rawHeaders"
      v-model="sortAssocaitons"
      :check="false"
      :fixeHeight="true"
    >
      <template #actions="{item}">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
           @click="$router.push(`/family-members/${item.familyId}`)"
        >
          <eye-icon class="text-yellow-400 fill-current" />
          <span class="ml-3 text-xs">View Members</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="acceptFamilyMember(item.associationId, item.patientName)"
        >
          <accept-icon />
          <span class="ml-3 text-xs">Accept</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="declineFamilyMember(item.associationId, item.patientName)"
        >
          <delete-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Decline</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteFamilyMember(item.associationId)"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Revoke</span>
        </div>
      </template>
      <template #status="{item}">
          <span
            :class="{
              'bg-green-200 text-green-800': item.status == 'Active',
              ' bg-red-500 text-red-400': item.status == 'Inactive',
            }"
            class="text-center rounded-md p-1 bg-opacity-20"
          >
            {{ item.status }}
          </span>
        </template>
        <template #familyId="{item}">
         <span class="text-blue-500">{{ item.familyId}}</span>
        </template>
         <template #patientName="{item}">
         <span class="text-blue-500">{{ item.patientName}}</span>
        </template>
    </cornie-table>
  </div>
  <view-modal v-model="showViewProvider"/>
   <existing-patient-modal v-model="showPatientModal"/>
   <member-modal v-model="showMember" :familyId="familyId"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import { Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import {IPatientAssociation} from "@/types/IPatientAssociation";

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

import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import ExistingPatientModal from "../existingPatient.vue";

import MemberModal from "./memberModal.vue";
import AcceptIcon from "../icons/accept.vue";

const location = namespace("location");
const dropdown = namespace("dropdown");
const patientassociation = namespace("patientassociation");

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
    ExistingPatientModal,
    MemberModal,
    AcceptIcon,
    CancelIcon
  },
})
export default class FamilyAsscoation extends Vue {
  showColumnFilter = false;
  showMemeberList = false;
  showPatientModal = false;
  query = "";

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  getKeyValue = getTableKeyValue;

  refreshing = false;
  showViewProvider = false;
  showMember = false;
  familyId = "";

  dropdowns = {} as IIndexableObject;

   
  @patientassociation.State
  familyassociations!: IPatientAssociation[];

  @patientassociation.Action
  fetchFamilyAssociations!: () => Promise<void>;

//   @patientassociation.Action
//   deleteFamilyMember!: (id: string) => Promise<boolean>;

//   @patientassociation.Action
//   acceptFamilyMember!: (id: string) => Promise<boolean>;

//   @patientassociation.Action
//   declineFamilyMember!: (id: string) => Promise<boolean>;




  rawHeaders = [
    { title: "DATE ADDED", key: "dateAdded", show: true, noOrder:true },
    { title: "FAMILY ID #", key: "familyId", show: true , noOrder:true},
    {
      title: "name",
      key: "patientName",
      show: true,
       noOrder:true
    },
    {
      title: "RELATIONSHIP",
      key: "relationship",
      show: true,
       noOrder:true
    },
    {
      title: "ROLE",
      key: "role",
      show: true,
       noOrder:true
    },
    {
      title: "Payment Account",
      key: "payment",
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



  get items() {
    const familyassociations = this.familyassociations.map((familyassociation) => {
         (familyassociation as any).dateAdded = new Date(
        (familyassociation as any).dateAdded
      ).toLocaleDateString("en-US");
      return {
        ...familyassociation,
      };
    });
    if (!this.query) return familyassociations;
    return search.searchObjectArray(familyassociations, this.query);
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

   async deleteFamilyMember(id:string){
      const confirmed = await window.confirmAction({
      message: "You have opted to revoke membership of Ibeh’s family account. Click below to confirm",
      title: "Revoke",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().delete(
          `/api/v1/patient-portal/family/member/${id}/revoke`
        );
        if (response.success) {
          window.notify({ msg: "Membership revoked successfully", status: "success" });
          await this.fetchFamilyAssociations();
        }
      } catch (error) {
        window.notify({ msg: "Membership revoked unsuccessfully", status: "error" });
      }
    }
  }

    async declineFamilyMember(id:string, name:string){
      const confirmed = await window.confirmAction({
      message: `You have been added to ${name} family account. Click below to decline`,
      title: "Decline",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/family/member/${id}/decline`,{}
        );
        if (response.success) {
          window.notify({ msg: "Declined Successfully", status: "success" });
          await this.fetchFamilyAssociations();
        }
      } catch (error) {
        window.notify({ msg: "Declined Unsuccessfull", status: "error" });
      }
    }
  }
  async acceptFamilyMember(id:string, name:string){
      const confirmed = await window.confirmAction({
      message: `You have been added to ${name} family account. Click below to accept`,
      title: "Accept",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/family/member/${id}/accept`,{}
        );
        if (response.success) {
          window.notify({ msg: "Accepted Successfully", status: "success" });
          await this.fetchFamilyAssociations();
        }
      } catch (error) {
        window.notify({ msg: "Not Accepted", status: "error" });
      }
    }
  }

  async created() {
    await this.fetchFamilyAssociations();
  }
}
</script>
