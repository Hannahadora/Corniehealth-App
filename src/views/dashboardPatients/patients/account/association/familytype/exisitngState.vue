<template>
<div
    class="flex justify-center h-screen bg-white shadow-md  p-3 mt-2 mb-2 rounded w-full"
  >
    <div class="w-full">
      <span
        class="flex space-x-4 w-full border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
      <cornie-icon-btn @click="$router.push({ name: 'Private Profile & Settings' })" class="pt-2">
         <arrow-left-icon />
       </cornie-icon-btn>
       <span class="border-l-2 border-gray-100 pl-3">
        Family Members
       </span>
      </span>

      <span class="w-full h-screen">
        <div class="w-full pb-7">
          <span class="flex justify-end w-full mb-3">
            <button
              @click="showMember = true"
              class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
            >
              Add Dependant
            </button>
          </span>
          <cornie-table
            :columns="rawHeaders"
            v-model="sortAssocaitons"
            :check="false"
            :fixeHeight="true"
          >
            <template #actions="{ item }">
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="showMemberModal(item)">
                <eye-icon class="text-yellow-400 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="showMemberModal(item)"
              >
                <edit-icon />
                <span class="ml-3 text-xs">Update</span>
              </div>
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <money-icon class="text-danger fill-current" />
                <span class="ml-3 text-xs">Payment Account</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="declineFamilyMember(item.associationId, item.patientName)"
              >
                <cancel-icon class="text-blue-600 fill-current" />
                <span class="ml-3 text-xs">Deactivate</span>
              </div>
            </template>
            <template #status="{ item }">
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
            <template #familyId="{ item }">
              <span class="text-blue-500">{{ item.familyId }}</span>
            </template>
            <template #patientName="{ item }">
              <span class="text-blue-500">{{ item.patientName }}</span>
            </template>
          </cornie-table>
        </div>
      </span>
    </div>
  </div>
  <view-modal v-model="showViewProvider" />
  <existing-patient-modal v-model="showPatientModal" />
  <member-modal v-model="showMember" :familyId="id" :selectedPatient="selectedItem" :id="memberId" @family-added="familyadded"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { IPatientAssociation } from "@/types/IPatientAssociation";
import { Prop, PropSync, Watch } from "vue-property-decorator";

import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CancelIcon from "@/components/icons/cancel-red-bg.vue"

import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DeleteIcon from "@/components/icons/deactivate.vue";
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";
import ExistingPatientModal from "../existingPatient.vue";
import MoneyIcon from "../icons/money.vue";

import MemberModal from "./memberModal.vue";

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
    MoneyIcon,
    ArrowLeftIcon,
    CancelIcon,
  },
})
export default class FamilyAsscoationExisitngState extends Vue {
  showColumnFilter = false;
  showMemeberList = false;
  showPatientModal = false;
  query = "";
  memberId = "";

  @Prop({ type: String, default: "" })
  id!: string;

  refreshing = false;
  showViewProvider = false;
  showMember = false;
  selectedItem  = {} as any;

  dropdowns = {} as IIndexableObject;

  @patientassociation.State
  familymembers!: IPatientAssociation[];

  @patientassociation.Action
  fetchFamilyMember!: (familyId: string) => Promise<void>;

  rawHeaders = [
    { title: "DATE ADDED", key: "dateAdded", show: true, noOrder: true },
    { title: "MRN #", key: "familyId", show: true, noOrder: true },
    {
      title: "name",
      key: "patientName",
      show: true,
      noOrder: true,
    },
    {
      title: "RELATIONSHIP",
      key: "relationship",
      show: true,
      noOrder: true,
    },
    {
      title: "ROLE",
      key: "role",
      show: true,
      noOrder: true,
    },
    {
      title: "Payment Account",
      key: "payment",
      show: true,
      noOrder: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
      noOrder: true,
    },
  ];

  get items() {
    const familyassociations = this.familymembers.map((familyassociation) => {
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

  showMemberModal(value: any) {
    this.memberId = value.associationId;
    this.selectedItem = value;
    this.showMember = true;
  }

  async deleteFamilyMember(id: string) {
    const confirmed = await window.confirmAction({
      message:
        "You have opted to revoke membership of Ibeh’s family account. Click below to confirm",
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
          window.notify({
            msg: "Membership revoked successfully",
            status: "success",
          });
          await this.fetchFamilyMember(this.id);
        }
      } catch (error) {
        window.notify({
          msg: "Membership revoked unsuccessfully",
          status: "error",
        });
      }
    }
  }

  async declineFamilyMember(id: string, name: string) {
    console.log({id})
    const confirmed = await window.confirmAction({
      message: `You have been added to ${name} family account. Click below to deactivate`,
      title: "Deactivate",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().delete(
          `/api/v1/patient-portal/family/member/${id}/revoke`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Deactivated Successfully", status: "success" });
          await this.fetchFamilyMember(this.id);
        }
      } catch (error) {
        window.notify({ msg: "Deactivation not Successfull", status: "error" });
      }
    }
  }
  async acceptFamilyMember(id: string, name: string) {
    const confirmed = await window.confirmAction({
      message: `You have been added to ${name} family account. Click below to accept`,
      title: "Accept",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().patch(
          `/api/v1/patient-portal/family/member/${id}/accept`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Accepted Successfully", status: "success" });
          await this.fetchFamilyMember(this.id);
        }
      } catch (error) {
        window.notify({ msg: "Not Accepted", status: "error" });
      }
    }
  }

  async familyadded(){
    await this.fetchFamilyMember(this.id);
  }

  async created() {
    this.fetchFamilyMember(this.id);
  }
}
</script>
