<template>
  <div class="w-full my-2">
      <div class="container-fluid " v-if="items && items.length === 0 && filterByStatus.length === 0 && !selectedStatus">
        <EmptyState />
      </div>
      <div v-else class="container-fluid bg-white sm:p-6">
       <span
        class="
          flex
          flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-10
          text-xl text-primary
          py-2
        "
      >
       Request
      </span>
        <div class="w-full mt-6">  
             <div class="w-full pb-7 mb-8">
                <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
                    <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Medications</a></li>    
                    <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Diagnostics</a></li>
                    <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(3)"  :class="{'active' :  selected === 3  }" :aria-selected="selected === 3">Referrals</a></li>
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(4)"  :class="{'active' :  selected === 4  }" :aria-selected="selected === 4">Other Requests</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="medications">   
                        <span class="flex justify-end w-full mb-8">
                            <button
                            class="
                                bg-danger
                                rounded-full
                                text-white
                                mt-5
                                py-2
                                pr-5
                                pl-5
                                px-3
                                mb-5
                                font-semibold
                                focus:outline-none
                                hover:opacity-90
                            "
                            @click="$router.push('/dashboard/provider/experience/add-request')"
                            >
                            New Request
                            </button>        
                        </span>
                          <cornie-table :columns="rawHeaders" v-model="items">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/view-request/${item.id}`)">
                                <newview-icon  class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">View</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <newview-icon  class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">View & Edit</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <update-icon />
                                <span class="ml-3 text-xs">Update</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-appointment')">
                                <plus-icon class="text-primary fill-current"/>
                                <span class="ml-3 text-xs">Add Appointment</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-task')">
                                <plus-icon class="text-red-500 fill-current"/>
                                <span class="ml-3 text-xs">Add Task</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                                <note-icon class="text-green-600 fill-current"/>
                                <span class="ml-3 text-xs">Add Notes</span>
                                </div>
                                 <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                                    <danger-icon/>
                                    <span class="ml-3 text-xs">Cancel</span>
                                </div>
                            </template>
                             <template #status-header="{  }">
                                <p class="cursor-pointer md text-xs uppercase" @click="() => filterStatus = !filterStatus">Status</p>
                                <div class="absolute md" v-if="filterStatus">
                                <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1 md" role="none">
                                    <a class="md text-gray-700  px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                                        v-for="(day, index) in statuses" :key="index"
                                    >
                                        <span><input type="checkbox" class="h-4 w-4 md" name="" id="" v-model="filterByStatus" :value="day"></span>
                                        <span class="mx-2 text-xs md">{{ day }}</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </template>
                            <template #patient="{ item }">
                                <p class="cursor-pointer" @click="showPatientDetails(onePatientId)">{{ item.patientsubject }}</p>
                            </template>
                             <template #requester="{ item }">
                                <p class="cursor-pointer">{{ item.patientrequester }}</p>
                            </template>
                             <template #dispenser="{ item }">
                                <p class="cursor-pointer">{{ item.practitionerdispenser }}</p>
                            </template>
                            <template #performer="{ item }">
                                <p class="cursor-pointer">{{ item.practitionerperformer }}</p>
                            </template>
                        </cornie-table>
                    </div>
                    <div class="tab-pane" v-if="selected == 2"  :class="{'active' :  selected === 2  }" id="diagnotics">
                      <span class="flex justify-end w-full mb-8">
                          <button
                          class="
                              bg-danger
                              rounded-full
                              text-white
                              mt-5
                              py-2
                              pr-5
                              pl-5
                              px-3
                              mb-5
                              font-semibold
                              focus:outline-none
                              hover:opacity-90
                          "
                          @click="$router.push('/dashboard/provider/experience/add-other-requests')"
                          >
                          New Request
                          </button>
                          
                      </span>
                    <cornie-table :columns="rawHeadersothers" v-model="itemsothers">
                        <template #actions="{ item }">
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/view-other-request/${item.id}`)">
                            <newview-icon  class="text-yellow-500 fill-current"/>
                            <span class="ml-3 text-xs">View</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-other-request/${item.id}`)">
                            <newview-icon  class="text-yellow-500 fill-current"/>
                            <span class="ml-3 text-xs">View & Edit</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-other-request/${item.id}`)">
                            <update-icon />
                            <span class="ml-3 text-xs">Update</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"   @click="$router.push('/dashboard/provider/experience/add-appointment')">
                            <plus-icon class="text-primary fill-current"/>
                            <span class="ml-3 text-xs">Add Appointment</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push('/dashboard/provider/experience/add-task')">
                            <plus-icon class="text-red-500 fill-current"/>
                            <span class="ml-3 text-xs">Add Task</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeothersNotes(item.id)">
                            <note-icon class="text-green-600 fill-current"/>
                            <span class="ml-3 text-xs">Add Notes</span>
                            </div>
                        </template>
                         <template #status-header="{  }">
                                <p class="cursor-pointer md text-xs uppercase" @click="() => filterStatus = !filterStatus">Status</p>
                                <div class="absolute md" v-if="filterStatus">
                                <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1 md" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a class="md text-gray-700  px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                                        v-for="(day, index) in statuses" :key="index"
                                    >
                                        <span><input type="checkbox" class="h-4 w-4 md" name="" id="" v-model="filterByStatus" :value="day"></span>
                                        <span class="mx-2 text-xs md">{{ day }}</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </template>
                            <template #patient="{ item }">
                                <p class="cursor-pointer" @click="showPatientDetails(onePatientId)">{{ item.patientsubject }}</p>
                            </template>
                             <template #requester="{ item }">
                                <p class="cursor-pointer">{{ item.patientrequester }}</p>
                            </template>
                            <template #performer="{ item }">
                                <p class="cursor-pointer">{{ item.practitionerperformer }}</p>
                            </template>
                    </cornie-table>
                    </div>
                    <div class="tab-pane" v-if="selected == 3"  :class="{'active' :  selected === 3  }" id="referrals">
                       <span class="flex justify-end w-full mb-8">
                            <button
                            class="
                                bg-danger
                                rounded-full
                                text-white
                                mt-5
                                py-2
                                pr-5
                                pl-5
                                px-3
                                mb-5
                                font-semibold
                                focus:outline-none
                                hover:opacity-90
                            "
                            @click="$router.push('/dashboard/provider/experience/add-request')"
                            >
                            New Request
                            </button>
                            
                        </span>
                         <cornie-table :columns="rawHeaders" v-model="items">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/view-request/${item.id}`)">
                                <newview-icon  class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">View</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <newview-icon  class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">View & Edit</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <update-icon />
                                <span class="ml-3 text-xs">Update</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-appointment')">
                                <plus-icon class="text-primary fill-current"/>
                                <span class="ml-3 text-xs">Add Appointment</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"  @click="$router.push('/dashboard/provider/experience/add-task')">
                                <plus-icon class="text-red-500 fill-current"/>
                                <span class="ml-3 text-xs">Add Task</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                                <note-icon class="text-green-600 fill-current"/>
                                <span class="ml-3 text-xs">Add Notes</span>
                                </div>
                                 <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                                    <danger-icon/>
                                    <span class="ml-3 text-xs">Cancel</span>
                                </div>
                            </template>
                             <template #status-header="{  }">
                                <p class="cursor-pointer md text-xs uppercase" @click="() => filterStatus = !filterStatus">Status</p>
                                <div class="absolute md" v-if="filterStatus">
                                <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1 md" role="none">
                                    <a class="md text-gray-700  px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                                        v-for="(day, index) in statuses" :key="index"
                                    >
                                        <span><input type="checkbox" class="h-4 w-4 md" name="" id="" v-model="filterByStatus" :value="day"></span>
                                        <span class="mx-2 text-xs md">{{ day }}</span>
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </template>
                            <template #patient="{ item }">
                                <p class="cursor-pointer" @click="showPatientDetails(onePatientId)">{{ item.patientsubject }}</p>
                            </template>
                             <template #requester="{ item }">
                                <p class="cursor-pointer">{{ item.patientrequester }}</p>
                            </template>
                             <template #dispenser="{ item }">
                                <p class="cursor-pointer">{{ item.practitionerdispenser }}</p>
                            </template>
                            <template #performer="{ item }">
                                <p class="cursor-pointer">{{ item.practitionerperformer }}</p>
                            </template>
                        </cornie-table>
                    </div>
                    <div class="tab-pane" v-if="selected == 4"  :class="{'active' :  selected === 4  }" id="requests">
                      <span class="flex justify-end w-full mb-8">
                          <button
                          class="
                              bg-danger
                              rounded-full
                              text-white
                              mt-5
                              py-2
                              pr-5
                              pl-5
                              px-3
                              mb-5
                              font-semibold
                              focus:outline-none
                              hover:opacity-90
                          "
                          @click="$router.push('/dashboard/provider/experience/add-other-requests')"
                          >
                          New Request
                          </button>    
                      </span>
                      <cornie-table :columns="rawHeadersothers" v-model="itemsothers">
                          <template #actions="{ item }">
                              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/view-other-request/${item.id}`)">
                              <newview-icon  class="text-yellow-500 fill-current"/>
                              <span class="ml-3 text-xs">View</span>
                              </div>
                              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-other-request/${item.id}`)">
                              <newview-icon  class="text-yellow-500 fill-current"/>
                              <span class="ml-3 text-xs">View & Edit</span>
                              </div>
                              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-other-request/${item.id}`)">
                              <update-icon />
                              <span class="ml-3 text-xs">Update</span>
                              </div>
                              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"   @click="$router.push('/dashboard/provider/experience/add-appointment')">
                              <plus-icon class="text-primary fill-current"/>
                              <span class="ml-3 text-xs">Add Appointment</span>
                              </div>
                              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push('/dashboard/provider/experience/add-task')">
                              <plus-icon class="text-red-500 fill-current"/>
                              <span class="ml-3 text-xs">Add Task</span>
                              </div>
                              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                              <note-icon class="text-green-600 fill-current"/>
                              <span class="ml-3 text-xs">Add Notes</span>
                              </div>
                          </template>
                          <template #status-header="{  }">
                                  <p class="cursor-pointer md text-xs uppercase" @click="() => filterStatus = !filterStatus">Status</p>
                                  <div class="absolute md" v-if="filterStatus">
                                  <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                      <div class="py-1 md" role="none">
                                      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                      <a class="md text-gray-700  px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                                          v-for="(day, index) in statuses" :key="index"
                                      >
                                          <span><input type="checkbox" class="h-4 w-4 md" name="" id="" v-model="filterByStatus" :value="day"></span>
                                          <span class="mx-2 text-xs md">{{ day }}</span>
                                      </a>
                                      </div>
                                  </div>
                                  </div>
                              </template>
                              <template #patient="{ item }">
                                  <p class="cursor-pointer" @click="showPatientDetails(onePatientId)">{{ item.patientsubject }}</p>
                              </template>
                              <template #requester="{ item }">
                                  <p class="cursor-pointer">{{ item.patientrequester }}</p>
                              </template>
                              <template #performer="{ item }">
                                  <p class="cursor-pointer">{{ item.practitionerperformer }}</p>
                              </template>
                      </cornie-table>
                      </div>
                </div>
            </div>

            <div style="height: 400px">

            </div>
        </div>
      </div>
       <notes-add
       :requestnotes="requestnotes"
          :requestId="requestId"
      v-model="showNotes"
    />
     <other-notes-add
       :otherrequestnotes="otherrequestnotes"
          :requestId="requestId"
      v-model="showOthersNotes"
    />
     <medication-modal 
     :requestId="requestId"  
        :columns="practitioner"
          @update:preferred="showMedication"
          v-model="showMedicationModal"/>
       <edit-medication-modal 
     :requestId="requestId"  
        :columns="practitioner"
          @update:preferred="showEditMedication"
          v-model="showEditMedicationModal"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
// import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from '@/components/icons/edit.vue'
import AddIcon from '@/components/icons/add.vue'
import DeactivateIcon from '@/components/icons/deactivate.vue'
import Button from '@/components/globals/corniebtn.vue'
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from '@/components/modal.vue';
import PlusIcon from "@/components/icons/plus.vue";
import MedicationModal from "./medication.vue";
import EditMedicationModal from "./updateMedication.vue";
import DangerIcon from "@/components/icons/danger.vue";
import NotesAdd from "./notes.vue";
import OtherNotesAdd from "./othernote.vue";
import ArrowRight from '@/components/icons/arrow-right.vue'
import EncounterIcon from '@/components/icons/encounter.vue'
import CheckoutIcon from '@/components/icons/checkout.vue'
import IOtherrequest from "@/types/IOtherrequest";
import EmptyState from './emptyState.vue'
import IRequest from "@/types/IRequest";
import search from "@/plugins/search";

const request = namespace("request");
const otherrequest = namespace("otherrequest");

const emptyOtherrequest: IOtherrequest = {
  basicInfo: {},
  requestInfo: {},
  subject: {},
  performer: {},
  forms: {},
  request: {
      range: [20,50]
  },
};
const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  medications: [],


};


@Options({
  components: {
    //Close,
    SortIcon,
    ThreeDotIcon,
    OtherNotesAdd,
    SearchIcon,
    NotesAdd,
    PrintIcon,
    PlusIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    MedicationModal,
    EditMedicationModal,
    CancelIcon,
    DangerIcon,
    TableOptions,
    EditIcon,
    Button,
    NoteIcon,
    CornieTable,
    CheckinIcon,
    UpdateIcon,
    AddIcon,
    NewviewIcon,
    DeactivateIcon,
    EmptyState,
    Modal,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
  },
})
export default class RequestExistingState extends Vue {
  showColumnFilter = false;
  showMedicationModal= false;
  showEditMedicationModal= false;
  show = false;
   selected = 1;
requestId = "";
showPartcipants = false;
  query = "";
  search = "";

  selectedStatus = 0;
  filterByStatus: any = [ ]
  completeStatus: any = [  ]
  currentVisitId = '';
  onePatientId= "";
  showNotes = false;
  taskId="";
  activeTab = 0;
  showOthersNotes=false;
  showEditPane = false;
  showViewPane = false;
  showAllActors = false;
  showActorsPane = false;
  showAddActorsPane = false;
  showCheckin = false;
  showCheckNoapp = false;
  selectType = false;
  filterStatus = false;
  showCheckout = false;
  timeLineVissible = false;
  viewDetails = false;
requestnotes=[];
otherrequestnotes=[];
  selectedSchedule: any = { };
singleParticipant = [];
  selectedVisit : any = { };
  selectedPatient : any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]

 request: IRequest = emptyRequest;

 @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;

 @otherrequest.Action
  deleteOtherrequest!: (id: string) => Promise<boolean>;

  @request.State
  patients!: any[];

  @request.State
  practitioners!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  select(i:number) {
      this.selected = i;
    }
 

  @request.State
  requests!: any[];

  @otherrequest.State
  otherrequests!: any[];

  @request.Action
  fetchRequests!: () => Promise<void>;

  @otherrequest.Action
  fetchOtherrequests!: () => Promise<void>;

getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
     {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "Date Requested", key: "createdAt", show: true },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
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
      key: "completeStatus",
      show: true,
    },
  ];
 
  types = ['All', 'Emergency', 'Walk-In', 'Follow-Up', 'Routine']
  statuses = ['Show All', 'On-Hold', 'Cancelled', 'Completed','Stopped']
  availableSlots: any = [ ]

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    if (!this.requests || this.requests.length === 0 ) return [];
    const filtered = this.requests.filter((i: any) => {
        if (this.filterByStatus.length === 0) {
            return i;
      } else {
          if (this.filterByStatus.includes('Show All')) return true;
        const indexInStatuses = this.filterByStatus.findIndex((j: any) => j.toLowerCase() === i.status.toLowerCase());
        if (indexInStatuses >= 0) return true;
      }
    })

    const requests = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completeStatus = "Completed";
      } else if (i.status === "On-Hold") {
        i.completeStatus = "On-Hold";
      } else {
        i.completeStatus = "Stopped";
      }
         (i as any).createdAt = new Date(
         (i as any).createdAt 
       ).toDateString();

        this.onePatientId =  i.subject.subject;
       
      return {
        ...i,
        action: i.id,
        patientsubject: this.getPatientName(i.subject.subject),
        patientrequester: this.getPatientName(i.requestDetails.requester),
        practitionerdispenser: this.getPractitionerName(i.performer.dispenser),
        practitionerperformer: this.getPractitionerName(i.medicationAdministration.performer),
        status: i.status,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1) return requests.filter((i: any) => i.completeStatus === "On-Hold");
    if (this.selectedStatus === 2) return requests.filter((i) => i.status === "Stopped");
    if (this.selectedStatus === 3) return requests.filter((i) => i.status !== "Stopped" && i.status !== "On-Hold");

    return requests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }
//Other request
rawHeadersothers = [
   {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "Date Requested", key: "createdAt", show: true },
    {
      title: "Patient",
      key: "patient",
      show: true,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: true,
    },
    {
      title: "Status",
      key: "completeStatus",
      show: true,
    },
  ];
  get headersothers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeadersothers;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }
   get itemsothers() {
    if (!this.otherrequests || this.otherrequests.length === 0 ) return [];
    const filtered = this.otherrequests.filter((i: any) => {
        if (this.filterByStatus.length === 0) {
            return i;
      } else {
          if (this.filterByStatus.includes('Show All')) return true;
        const indexInStatuses = this.filterByStatus.findIndex((j: any) => j.toLowerCase() === i.status.toLowerCase());
        if (indexInStatuses >= 0) return true;
      }
    })

    const otherrequests = filtered.map((i: any) => {
      if (i.status === "cancelled" || i.status === "no-show") {
        i.completeStatus = "Completed";
      } else if (i.status === "On-Hold") {
        i.completeStatus = "On-Hold";
      } else {
        i.completeStatus = "Stopped";
      }
         (i as any).createdAt = new Date(
         (i as any).createdAt 
       ).toDateString();

        this.onePatientId =  i.subject.subject;
       
      return {
        ...i,
        action: i.id,
        patientsubject: this.getPatientName(i.subject.subject),
        patientrequester: this.getPatientName(i.requestInfo.requester),
        practitionerperformer: this.getPractitionerName(i.performer.performer),
        status: i.status,
        // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
      };
    });
    if (this.selectedStatus === 1) return otherrequests.filter((i: any) => i.completeStatus === "On-Hold");
    if (this.selectedStatus === 2) return otherrequests.filter((i) => i.status === "Stopped");
    if (this.selectedStatus === 3) return otherrequests.filter((i) => i.status !== "Stopped" && i.status !== "On-Hold");

    return otherrequests;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

//Other request end
//Medications
rawHeadersRequest = [
   {
      title: "identifier",
      key: "id",
      show: true,
    },
    { title: "medication code", key: "code", show: true },
    {
      title: "Medication Name",
      key: "name",
      show: true,
    },
    {
      title: "strength",
      key: "strength",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "dosage (daily)",
      key: "dosage",
      show: true,
    },
    {
      title: "duration",
      key: "duration",
      show: true,
    },
    {
      title: "course of therapy",
      key: "course",
      show: true,
    },
     {
      title: "substitution?",
      key: "substitution",
      show: false,
    },
     {
      title: "reason code",
      key: "reasoncode",
      show: false,
    },
     {
      title: "refill?",
      key: "refill",
      show: false,
    },
     {
      title: "dispense interval",
      key: "interval",
      show: false,
    },
     {
      title: "validity period",
      key: "period",
      show: false,
    },
     {
      title: "no of refill",
      key: "refillno",
      show: false,
    },
     {
      title: "quantity",
      key: "qunatity",
      show: false,
    },
     {
      title: "supply duration",
      key: "duration",
      show: false,
    },
   
  ];

  get headersrequest() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeadersRequest;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }


  get itemsrequest() {
    const requests = this.requests[0].Medications.map((request:any) => {
       (request as any).createdAt = new Date(
         (request as any).createdAt 
       ).toLocaleDateString("en-US");
        (request as any).medicationDetails.duration.start = new Date(
         (request as any).medicationDetails.duration.start 
       ).toLocaleDateString("en-US");
        (request as any).medicationDetails.duration.end = new Date(
         (request as any).medicationDetails.duration.end 
       ).toLocaleDateString("en-US");
        return {
        ...request,
        code:request.medicationDetails.medicationCode,
        name: request.medicationDetails.medicationReference,
        strength: "xxxxxx",
        quantity: request.medicationDetails.quantity,
        course: request.medicationDetails.courseOfTherapyType,
        reasoncode: request.substitutionAllowed.code,
        interval: request.refillInfo.dispenseInterval,
        period: request.medicationDetails.createdAt,
        refillno: request.refillInfo.quantity,
        duration:request.medicationDetails.duration.start +'-'+ request.medicationDetails.duration.end,
        dosage:request.medicationDetails.dosageInstruction,



        //  action: request.id,
        //  keydisplay: "XXXXXXX",
        //  Participants: singleParticipantlength 
        };
    });
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }
//medication end

// async createMedication() {
//         this.payload.requestId = this.requestId;
      
//       try {
//         const response = await cornieClient().post("/api/v1/requests/medications", this.payload);
//         if (response.success) {
//             window.notify({ msg: "Medication Added Successfully", status: "success" });
//             this.loading = false;
//             this.show = false;
//         }
//         } catch (error) {
//         window.notify({ msg: error, status: "error" });
//                   this.loading = false;
//          this.show = false;
//         }
//   }

 async makeNotes(id: string) {
    this.requestId = id;
    this.showNotes = true;
    this.fetchNotes();
  }

  async makeothersNotes(id:string){
    this.requestId = id;
    this.showOthersNotes = true;
    this.fetchOtherNotes();
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to cancel this request",
      title: "Cancel request",
    });
    if (!confirmed) return;

    if (await this.deleteRequest(id))
      window.notify({ msg: "Request canceled", status: "success" });
    else window.notify({ msg: "Request not canceled", status: "error" });
  }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : '';
  }
getPractitionerName(id: string){
   const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ${pt.lastName}` : '';
}
  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : { };
  }

  

  getRequest(id: string) {
    const pt = this.requests.find((i: any) => i.id === id);
    return pt ? pt : { };
  }

  get selectedPatientData() {
    if (!this.selectedPatient || !this.selectedPatient.id) return { };
    const data = this.selectedPatient;
    return {
      gender: data.gender,
      dob: `${new Date(data.dateOfBirth).getDate()} ${this.months[new Date(data.dateOfBirth).getMonth()]}, ${new Date(data.dateOfBirth).getFullYear()}`,
      mrn: data.mrn
    }
  }

  showPatientDetails(id: string) {
    this.setSelectedPatient(id)
    this.viewDetails = true;
  }
   async fetchNotes() {
    const id = this.requestId;
      const AllNotes = cornieClient().get(`/api/v1/requests/getNotesByRequestId/${id}`);
      const response = await Promise.all([AllNotes]);
      this.requestnotes = response[0].data;
    }

 async fetchOtherNotes() {
    const id = this.requestId;
      const AllNotes = cornieClient().get(`/api/v1/other-requests/getNotesByOtherRequestId/${id}`);
      const response = await Promise.all([AllNotes]);
      this.otherrequestnotes = response[0].data;
    }

  async showMedication(value:string){
    this.requestId = value;
    this.showMedicationModal = true;
  }

  async showEditMedication(value:string){
     this.requestId = value;
    this.showEditMedicationModal = true;
  }

  async created() {
    //this.fetchNotes();
   // this.fetchOtherNotes();
   this.getPractitioners();
 // if (!this.practitioners || this.practitioners.length === 0) await this.getPractitioners();
    if (!this.patients || this.patients.length === 0) await this.getPatients();
    if (!this.requests || this.requests.length === 0) await this.fetchRequests();
     if (!this.otherrequests || this.otherrequests.length === 0) await this.fetchOtherrequests();
    if (!this.requests || this.requests.length === 0) await this.getPatients();
    window.addEventListener('click', (e: any) => {
      if (!e.target.classList.contains('md')) {
        this.filterStatus = false;
      }
    })


  }

}
</script>

<style scoped>
    .active-tab {
        border-bottom-width: 4px;
        margin-bottom: -0.22rem;
    }

    .active-color {
        border-color: #FE4D3C;
    }

    .status-active {
      background: #F3FCF8;
      color: #35BA83;
      
    }

    .status-inactive {
      background: #FFF1F0;
      color: #FE4D3C;
    }

    .border-b-4 {
      border-bottom: 4px solid #F0F4FE;
    }

    .h-screen {
      height: 100vh;
      overflow: scroll;
      padding-bottom: 40px;
      padding-bottom: 24px;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .h-screen::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .h-screen {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    .file-picker {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .light-grey-bg {
      background: #F0F4FE;
    }
    /* Large checkboxes */

input[type="checkbox"] {
    height: 22px;
    width: 22px;
}

input[type="checkbox"]:before {
    width: 24px;
    border: hidden;
    height: 20px;
}

input[type="checkbox"]:after {
    top: -20px;
    width: 22px;
    height: 22px;
}

input[type="checkbox"].md:checked:after {
   background-image: url("../../../../assets/tick.svg");
    background-color: #FE4D3C;
}
input[type="checkbox"].md:after {
    position: relative;
    display: block;
    left: 0px;
    content: "";
    background: white;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 3px;
    text-align: center;
    border: 1px solid #FE4D3C;
}
</style>
