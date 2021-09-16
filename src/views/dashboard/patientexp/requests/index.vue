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
                            New Requests
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
                                <p class="cursor-pointer" @click="showPatientDetails(onePatientId)">{{ item.patient }}</p>
                            </template>
                             <template #requester="{ item }">
                                <p class="cursor-pointer">{{ item.requestDetails.requester }}</p>
                            </template>
                             <template #dispenser="{ item }">
                                <p class="cursor-pointer">{{ item.performer.dispenser }}</p>
                            </template>
                            <template #performer="{ item }">
                                <p class="cursor-pointer">{{ item.medicationAdministration.performer }}</p>
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
                        @click="$router.push('/dashboard/provider/experience/add-request-reffer')"
                        >
                        New Requests
                        </button>
                        
                    </span>
                    <cornie-table :columns="rawHeaders" v-model="items">
                        <template #actions="{ item }">
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/view-refferal/${item.id}`)">
                            <newview-icon  class="text-yellow-500 fill-current"/>
                            <span class="ml-3 text-xs">View</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-refferal/${item.id}`)">
                            <newview-icon  class="text-yellow-500 fill-current"/>
                            <span class="ml-3 text-xs">View & Edit</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                            <update-icon />
                            <span class="ml-3 text-xs">Update</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                            <plus-icon class="text-primary fill-current"/>
                            <span class="ml-3 text-xs">Add Appointment</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                            <plus-icon class="text-red-500 fill-current"/>
                            <span class="ml-3 text-xs">Add Task</span>
                            </div>
                            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                            <note-icon class="text-green-600 fill-current"/>
                            <span class="ml-3 text-xs">Add Notes</span>
                            </div>
                        </template>
                        <template #Participants="{ item }">
                            <div class="flex items-center">
                            <span class="text-xs">{{item.Participants}}</span>
                            <eye-icon class="cursor-pointer ml-3 " @click="displayParticipants(item.id)"/>
                            </div>
                        </template>
                    </cornie-table>
                    </div>
                    <div class="tab-pane" v-if="selected == 3"  :class="{'active' :  selected === 3  }" id="referrals">
                    </div>
                    <div class="tab-pane" v-if="selected == 4"  :class="{'active' :  selected === 4  }" id="requests">

                    </div>
                </div>
            </div>

            <div style="height: 400px">

            </div>
        </div>
      </div>
       <notes-add
          :taskId="taskId"
      v-model="showNotes"
    />
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
//import Close from '@/components/icons/close.vue'
import NotesAdd from "./notes.vue";
import ArrowRight from '@/components/icons/arrow-right.vue'
import EncounterIcon from '@/components/icons/encounter.vue'
import CheckoutIcon from '@/components/icons/checkout.vue'

import EmptyState from './emptyState.vue'
import IRequest from "@/types/IRequest";


const request = namespace("request");

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
    CancelIcon,
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

  selectedSchedule: any = { };
singleParticipant = [];
  selectedVisit : any = { };
  selectedPatient : any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]

 request: IRequest = emptyRequest;

 @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;

  @request.State
  patients!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  select(i:number) {
      this.selected = i;
    }
 

  @request.State
  requests!: any[];

  @request.Action
  fetchRequests!: () => Promise<void>;

getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
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
       ).toLocaleDateString("en-US");

        this.onePatientId =  i.subject.subject;
       
      return {
        ...i,
        action: i.id,
        patient: this.getPatientName(i.subject.subject),
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
 async makeNotes(id: string) {
    this.taskId = id;
    this.showNotes = true;
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

  async created() {
    if (!this.patients || this.patients.length === 0) await this.getPatients();
    if (!this.requests || this.requests.length === 0) await this.fetchRequests();
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
