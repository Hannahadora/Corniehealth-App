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
           @click="showVisit(item)"
        >
          <eye-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">View Visit</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
         
        >
          <vital-icon />
          <span class="ml-3 text-xs">Vitals</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="shareVisitModal(item.encounterId)"
        >
          <bill-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Share Bill</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showBillVisitModal(item.encounterId)"
        >
          <bill-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Pay Bill</span>
        </div>
        <!-- <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <refferal-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Referral</span>
        </div> -->
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showTimeline(item)"
        >
          <timeline-icon class="text-blue-600 fill-current" />
          <span class="ml-3 text-xs">Timeline</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showVisitBillModal(item.encounterId)"
        >
          <bill-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">View Bill</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showVisitValidateClaim(item.encounterId)"
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
        v-if="item?.appointmentId"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showCheckOut(item)"
        >
          <check-out class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Check Out</span>
        </div>
      </template>
       <template #period="{item }">
          <span>
            {{ item?.checkInTime +' - ' + new Date(item?.checkOutTime).toLocaleTimeString('en-US')}}
          </span>
        </template>
         <template #status="{item}">
          <span
            :class="{
              'bg-yellow-100 text-yellow-400': item.status == 'On-time-late',
              'bg-purple-300 text-purple-600': item.status == 'queued'||
              item.status == 'vitalAcquired'
              ||
              item.status == 'referred',
              'bg-green-100 text-green-400': item.status == 'waitlisted' 
              || item.status == 'consultationCompleted'
              || item.status == 'diagnosticsCompleted'
              || item.status == 'nedicationDispensed'
              || item.status == 'discharged'
              || item.status == 'checked-in'
              || item.status == 'completed'
              ,
              ' bg-yellow-100 text-yellow-400': item.status == 'in-Progress',
             ' bg-red-100 text-red-400': item.status == 'visitEnded' || item.status == 'cancelled',
             ' bg-gray-100 text-gray-400': item.status == 'checked-out',
             ' bg-blue-100 text-blue-600': item.status == 'billProcessing',

             
            }"
            class="text-center rounded-lg p-1 bg-opacity-20"
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
  <view-modal  v-model="showViewModal" :selectedItem="selectedItem"/>
  <checkout-modal v-model="showCheckOutModal" :selectedItem="selectedItem"/>
  <viewbill-modal v-model="showBillModal"/>
  <validate-modal v-model="showValidateModal" />
  <share-modal v-model="showShareModal"/>
  <pay-modal v-model="showPaybill" :patientvisitbill="patientvisitbill"/>
  <time-line v-model="showTimeLineModal" :timeline="selectedItem"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { getTableKeyValue } from "@/plugins/utils";
import { Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import moment from "moment";

import  IPatientvisit  from "@/types/IPatientvisit";

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


const practitioner = namespace("practitioner");
const location = namespace("location");
const dropdown = namespace("dropdown");
const patientvisit = namespace("patientvisit");

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
  selectedItem = {};

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  getKeyValue = getTableKeyValue;

  refreshing = false;
  showViewProvider = false;
  showMember = false;
  familyId = "";

  dropdowns = {} as IIndexableObject;

   
  @patientvisit.State
  patientvisits!: IPatientvisit[];

  @patientvisit.Action
  fetchPatientvisits!: () => Promise<void>;

    @patientvisit.State
    patientvisitbill!: IPatientvisit;

  @patientvisit.Action
  getPatientVisitsBill!: (encounterId: string) => Promise<void>;

  @practitioner.State
  practitioners!: any[];


  @practitioner.Action
  getPractitioners!: () => Promise<void>;




  rawHeaders = [
    { title: "CHECK-IN TIME", key: "checkInTime", show: true, noOrder:true },
    { title: "VISIT ID", key: "id", show: true , noOrder:true},
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
      key: "period",
      show: true,
       noOrder:true
    },
     {
      title: "Status",
      key: "status",
      show: true,
    },

  ];


//  get items() {
//     return [{
//         date: "22/01/20",
//         referralId: "A1XCD45",
//         type: "Counselling",
//         specialty: "XXXXXX",
//         requester: "XXXXXX",
//         performer: "XXXXXX",
//     }]
//   }

  get items() {
    const patientvisits = this.patientvisits?.map((patientvisit) => {
         (patientvisit as any).checkInTime = new Date(
        (patientvisit as any).checkInTime
      ).toLocaleTimeString('en-US');
      return {
        ...patientvisit,
        type: 'XXXXXX',
        specialty: 'XXXXXX',
       // checkInTime: new Date(patientvisit.checkInTime).toLocaleDateString("en-US"),
      };
    });
    if (!this.query) return patientvisits;
    return search.searchObjectArray(patientvisits, this.query);
  }

  
  get sortAssocaitons() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  getPractitionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.organizationId === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : "";
  }

  showMemberModal(value:string){
    this.showMember = true;
    this.familyId = value;
  }
  showTimeline(value:any){
    this.showTimeLineModal = true;
    this.selectedItem = value.timelines;
  }
  showCheckOut(value:any){
    this.selectedItem = value;
    this.showCheckOutModal = true
  }
  showVisit(value:any){
    this.showViewModal = true;
    this.selectedItem = value;
  }
  async showBillVisitModal(encounterId:string){
    this.showPaybill = true;
    await this.getPatientVisitsBill(encounterId);

  }
  async shareVisitModal(encounterId:string){
    this.showShareModal = true;
    await this.getPatientVisitsBill(encounterId);
  }

  async showVisitValidateClaim(encounterId:string){
    this.showValidateModal = true;
    await this.getPatientVisitsBill(encounterId);
  }

  async showVisitBillModal(encounterId: string){
    this.showBillModal = true;
    await this.getPatientVisitsBill(encounterId);
  }
  getTimecheckedOut(time:string){
    const newtime = new Date(time).toISOString();
   return moment(newtime).format('LTS');
  }
  getTimecheckedIn(time:Date){
    const newtime2 = new Date(time).toLocaleTimeString('en-US');
    return newtime2;
  }

async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "Confirm you want to cancel this visit.",
      title: "Cancel Visit",
      submessage:"*Terms and conditions apply"
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().post(
          `/api/v1/patient-portal/visit/cancel/${id}/`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Cancelled Successfully", status: "success" });
          await this.fetchPatientvisits();
        }
      } catch (error) {
        window.notify({ msg: "Not Cancelled", status: "error" });
      }
    }
  }
  async created() {
    await this.fetchPatientvisits();
  }
}
</script>
