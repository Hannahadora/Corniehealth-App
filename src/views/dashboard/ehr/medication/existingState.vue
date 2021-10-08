<template>
  <div class="w-full pb-80">
       <div>
            <span class="flex justify-end w-full mb-8">
              <button
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  py-2
                  pr-12
                  pl-12
                  px-3
                  mb-5
                  font-semibold
                  focus:outline-none
                  hover:opacity-90
                "
                @click="showMedication('false')"
              >
               New Request
              </button>
              
            </span>
            <cornie-table :columns="rawHeaders" v-model="sortMedications">
                 <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3  cursor-pointer" @click="showViewMedication(item.id)">
                      <eye-icon class="text-blue-300 fill-current" />
                      <span class="ml-8 text-xs">View</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3  cursor-pointer" @click="showMedication(item.id)">
                      <edit-icon class="text-blue-300 fill-current" />
                      <span class="ml-8 text-xs">Edit</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3  cursor-pointer" @click="showStatus(item.id)">
                      <update-icon class="text-purple-800 fill-current" />
                      <span class="ml-8 text-xs">Update Status</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-appointment')">
                      <calender-icon  />
                      <span class="ml-8 text-xs">Add Appointment</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showDiagnostic(item.id)">
                      <checkin-icon class="text-yellow-600 fill-current" />
                      <span class="ml-8 text-xs">Check In</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCheckoutPane(item.id)">
                      <checkout-icon class="text-red-600 fill-current" />
                      <span class="ml-8 text-xs">Check Out</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <send-icon class="text-purple-800 fill-current" />
                      <span class="ml-8 text-xs">Report</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"   @click="$router.push('/dashboard/provider/experience/add-task')">
                      <plus-icon class="text-green-400 fill-current" />
                      <span class="ml-8 text-xs">Add Task</span>
                  </div>
                   <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                      <message-icon class="text-blue-600 fill-current" />
                      <span class="ml-8 text-xs">Message</span>
                  </div>
                </template>
                 <template #asserter="{ item }">
                          <p class="cursor-pointer">{{ item.asserter }}</p>
                </template>
                 <template #recorder="{ item }">
                        <p class="cursor-pointer">{{ item.asserter }}</p>
                </template>
            </cornie-table>
    </div>
    
      <medication-modal 
       v-if="requestId == 'false'"
        :columns="practitioner"
           @medication-added="medicationAdded"
          @update:preferred="showMedication"
          v-model="showMedicationModal"/>

     <medication-modal
        v-else 
        :id="requestId" 
          @update:preferred="showMedication"
          v-model="showMedicationModal"/>

            <view-modal
        :id="requestId" 
          @medication-added="medicationAdded"
          @update:preferred="showViewMedication"
          v-model="showViewMedicationModal"/>
        
           <status-modal
            :id="requestId" 
           :updatedBy="updatedBy" 
        :currentStatus="currentStatus" 
        :dateUpdated="update"
          @update:preferred="showStatus"
          v-model="showStatusModal"/>


        
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ShareIcon from "@/components/icons/share.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import MedicationModal from "./medicationdialog.vue";
import ViewModal from "./viewRequest.vue";
import StatusModal from "./status.vue";
import { namespace } from "vuex-class";
import SendIcon from "@/components/icons/send.vue";
import CheckoutIcon from "@/components/icons/newcheckout.vue";
import CalenderIcon from "@/components/icons/newcalender.vue";
import User from "@/types/user";

const request = namespace("request");
const userStore = namespace("user");

@Options({
  components: {
    Table,
    CancelIcon,
    CheckoutIcon,
    SortIcon,
    CheckinIcon,
    SendIcon,
    MedicationModal,
    ViewModal,
    CalenderIcon,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    ThreeDotIcon,
    DangerIcon,
    PlusIcon,
    StatusModal,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog
  },
  
})
export default class AllergyExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showMedicationModal= false;
  showViewMedicationModal=false;
  requestId="";
  tasknotes=[];
onePatientId ="";
showStatusModal=false;
updatedBy= "";
currentStatus="";
update="";


  @userStore.State
  user!: User;

  @userStore.State
  practitionerAuthenticated!: User;

  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @request.State
  requests!: any[];

  @request.State
  practitioners!: any[];

    @request.State
  patients!: any[];

  @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;

 @request.Action
  getPatients!: () => Promise<void>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  @request.Action
  fetchRequests!: () => Promise<void>;

 getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Date", key: "createdAt", show: true },
    {
      title: "rEQUISITION id",
      key: "id",
      show: true,
    },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Requester",
      key: "requester",
      show: false,
    },
    {
      title: "Dispenser",
      key: "dispenser",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  
  get items() {
    const requests = this.requests.map((request) => {
         (request as any).createdAt = new Date(
         (request as any).createdAt 
       ).toDateString();
        (request as any).updatedAt = new Date(
         (request as any).updatedAt 
       ).toDateString();
      this.updatedBy = this.getPatientName(request.requestDetails.requester);
      this.currentStatus = request.status;
      this.update= request.updatedAt
        return {
        ...request,
         action: request.id,
         patient: this.getPatientName(request.subject.subject),
       requester: this.getPatientName(request.requestDetails.requester),
        dispenser: this.getPractitionerName(request.performer.dispenser),
        performer: this.getPractitionerName(request.medicationAdministration.performer),
        };
        
    });
    
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }
// getPractitionerName(id: string){
//    const pt = this.practitioners.find((i: any) => i.id === id);
//     return pt ? `${pt.firstName} ${pt.lastName}` : '';
// }
  async showMedication(value:string){
      this.showMedicationModal = true;
      this.requestId = value;
  }
  async showViewMedication(value:string){
      this.showViewMedicationModal = true;
      this.requestId = value;
  }

  async showStatus(value:string){
    this.showStatusModal = true;
    this.requestId = value;
  }

  medicationAdded() {
  this.fetchRequests();
  }
        getPatientName(id: string) {
            const pt = this.patients.find((i: any) => i.id === id);
            return pt ? `${pt.firstname} ${pt.lastname}` : '';
        }
        getPractitionerName(id: string){
        const pt = this.practitioners.find((i: any) => i.id === id);
            return pt ? `${pt.firstName} ${pt.lastName}` : '';
        }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this allergy",
      title: "Delete allergy"
    });
    if (!confirmed) return;

    if (await this.deleteRequest(id)) window.notify({ msg: "Allergy cancelled", status: "success" });
    else window.notify({ msg: "Allergy not cancelled", status: "error" });
  }
 
      get sortMedications (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
   
     async created() {
          this.getPractitioners();
          this.getPatients();
          this.sortMedications;
          this.fetchRequests();
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
.status-accepted {
      background: #F3FCF8;
      color: #35BA83;    
  }
.status-inactive {
      background: #FFF1F0;
      color: #FE4D3C;
}
.status-warning{
  background: #FEFAF0;
  color: #F7B538;
}
</style>
