<template>
  <div class="w-full pb-7">
      <span class="justify-end w-full mb-3 hidden md:flex">
        <button
            @click="showMember = true"
            class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
        >
            Book Appointment
        </button>
        </span>
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
           @click="showViewModal = true"
        >
          <eye-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">View Visit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
         
        >
          <vital-icon />
          <span class="ml-3 text-xs">Vitals</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showShareModal = true"
        >
          <diagnostic-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Diagnostics</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showPaybill = true"
        >
          <prescibe-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Prescription</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <refferal-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Referral</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showTimeLineModal = true"
        >
          <timeline-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Timeline</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showBillModal = true"
        >
          <bill-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">View Bill</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showValidateModal = true"
        >
          <check-icon class="text-green-600 fill-current" />
          <span class="ml-3 text-xs">Validate Claim</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <cancel-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Cancel Visit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showCheckOutModal = true"
        >
          <check-out class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Check Out</span>
        </div>
      </template>
       <template #status>
          <span
            class="bg-green-200 text-green-400 text-center rounded-md p-1 bg-opacity-20"
          >
            Waitlisted
          </span>
        </template>
         <!-- <template #status="{item}">
          <span
            :class="{
              'bg-yellow-100 text-yellow-400': item.status == 'On-time-late',
              ' bg-purple-100 text-purple-600': item.status == 'Queued',
              ' bg-green-100 text-green-400': item.status == 'Waitlisted',
              ' bg-green-100 text-green-400': item.status == 'Consultation Completed',
              ' bg-green-100 text-green-400': item.status == 'Diagnostics Completed',
              ' bg-green-100 text-green-400': item.status == 'Medication Dispensed',
              ' bg-green-100 text-green-400': item.status == 'Discharged',
              ' bg-purple-100 text-purple-600': item.status == 'Vital Acquired',
              ' bg-purple-100 text-purple-600': item.status == 'Referred',
              ' bg-yellow-100 text-yellow-400': item.status == 'In-Progress',
             ' bg-red-100 text-red-400': item.status == 'Visit Ended',
             ' bg-red-100 text-red-400': item.status == 'Cancelled',
             ' bg-gray-100 text-gray-400': item.status == 'Checked-Out',
             ' bg-blue-100 text-blue-600': item.status == 'Bill Processing',

             
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
          <span class="flex justify-end w-full mb-3">
        <button
            @click="showMember = true"
            class="bg-danger items-center flex space-x-4 justify-between rounded-md text-white font-semibold text-sm mt-5 py-3 px-8 focus:outline-none hover:opacity-90"
        >
            Book Appointment
        </button>
        </span>
        <div class="mb-5">
            <search-section :placeholder="'Search Table'"/>
        </div>
        <div class="bg-white shadow-lg py-2 px-8 w-full rounded-lg h-full">
            <div class="justify-between flex mb-5 border-b-2 py-2 border-gray-200">
                <p class="text-primary">#</p>
                <p>1</p>
            </div>
            <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">check-in time</p>
                <p>08:30AM</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">visit id</p>
                <p>A1XCD45</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">visit type</p>
                <p>XXXXXXX</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">specialty</p>
                <p>XXXXXX</p>
            </div>
             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">participant(s)</p>
                <p>XXXXXX</p>
            </div>

             <div class="justify-between flex mb-5 py-2 border-b-2 border-gray-200">
                <p class="text-primary uppercase font-bold text-sm">period</p>
                <p>09:00 - 09:50 AM</p>
            </div>
            <div class="justify-between flex mb-5 border-b-2 border-gray-200">
                <p class="text-primary">status</p>
                <p class="bg-green-100 text-green-500 rounded py-1 text-sm px-2">Waitlisted</p>
            </div>
            <div class="flex w-full justify-center py-2">
                    <DotsHorizontalIcon/>
            </div>


        </div>

    </div>
  </div>
  <view-modal  v-model="showViewModal"/>
  <checkout-modal v-model="showCheckOutModal"/>
  <viewbill-modal v-model="showBillModal"/>
  <validate-modal v-model="showValidateModal" />
  <share-modal v-model="showShareModal"/>
  <pay-modal v-model="showPaybill"/>
  <time-line v-model="showTimeLineModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import { Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IPatientAssociation } from "@/types/IPatientAssociation";

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
import CancelIcon from "@/components/icons/cancel.vue"
import LocationIcon from "@/components/icons/location.vue";
import EyeIcon from "@/components/icons/newview.vue";
import EditIcon from "@/components/icons/edit.vue";
import CheckIn from "@/components/icons/checkin.vue";
import SearchSection from "@/components/search-input.vue";
import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
import CheckIcon from "@/components/icons/check-green-bg.vue";
import CheckOut from "@/components/icons/arrowleft.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";

import VitalIcon from "./icons/vitals.vue";
import DiagnosticIcon from "./icons/diagnostics.vue";
import PrescibeIcon from "./icons/prescribe.vue";
import RefferalIcon from "./icons/refferal.vue";
import TimelineIcon from "./icons/timeline.vue";
import BillIcon from "./icons/bill.vue";

import ViewModal from "./components/viewVisit.vue";
import CheckoutModal from "./components/checkout.vue";
import ViewbillModal from "./components/viewBill.vue";
import ValidateModal from "./components/validateClaim.vue";
import ShareModal from "./components/shareBill.vue";
import PayModal from "./components/payBill.vue";

import TimeLine from "./components/viewTimeLine.vue";




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
    CancelIcon,
    CheckIn,
    SearchSection,
    DotsHorizontalIcon,
    VitalIcon,
    DiagnosticIcon,
    PrescibeIcon,
    RefferalIcon,
    TimelineIcon,
    BillIcon,
    CheckIcon,
    CheckOut,
    ViewModal,
    CheckoutModal,
    ViewbillModal,
    ValidateModal,
    ShareModal,
    PayModal,
    TimeLine
  },

})
export default class PatientVisit extends Vue {

  showViewModal = false;
  showCheckOutModal = false;
  showBillModal = false;
  showValidateModal = false;
  showShareModal = false;
  showPaybill = false;
  showTimeLineModal = false;
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
    { title: "CHECK-IN TIME", key: "date", show: true, noOrder:true },
    { title: "VISIT ID", key: "referralId", show: true , noOrder:true},
    {
      title: "visit type",
      key: "type",
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
      title: "practitioner(s)",
      key: "requester",
      show: true,
       noOrder:true
    },
    {
      title: "period",
      key: "performer",
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
        date: "22/01/20",
        referralId: "A1XCD45",
        type: "Counselling",
        specialty: "XXXXXX",
        requester: "XXXXXX",
        performer: "XXXXXX",
    }]
  }

//   get items() {
//     const familyassociations = this.familyassociations.map((familyassociation) => {
//          (familyassociation as any).dateAdded = new Date(
//         (familyassociation as any).dateAdded
//       ).toLocaleDateString("en-US");
//       return {
//         ...familyassociation,
//       };
//     });
//     if (!this.query) return familyassociations;
//     return search.searchObjectArray(familyassociations, this.query);
//   }
  
//   get sortAssocaitons() {
//     return this.items.slice().sort(function (a, b) {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     });
//   }

  showMemberModal(value:string){
    this.showMember = true;
    this.familyId = value;
  }

async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "Confirm you want to cancel this visit.",
      title: "Cancel Visit",
      submessage:"*Terms and conditions apply"
    });
    if (!confirmed) return;

    // if (await this.deleteAllergy(id))
    //   window.notify({ msg: "Allergy cancelled", status: "success" });
    // else window.notify({ msg: "Allergy not cancelled", status: "error" });
  }
  async created() {
    await this.fetchFamilyAssociations();
  }
}
</script>
