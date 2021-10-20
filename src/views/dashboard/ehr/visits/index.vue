<template>
  <div class="w-full my-2 h-screen">
      <div class="containr-fluid" v-if="items && items.length === 0 && filterByStatus.length === 0 && filterByType.length === 0 && !selectedStatus">
        <EmptyState />
      </div>
      <div v-else class="container-fluid bg-white sm:p-6 h-full">
        <div class="w-full border-b-2 curved flex py-2 mt-4">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Active Visits</h2>
            </div>
        </div>


        <div class="w-full mt-6">
             <!-- <div class="w-full flex my-6">
                <div class=".w-full shadow-md w-2/12 p-4 rounded-lg cursor-pointer" :class="{'light-grey-bg': selectedStatus === 0}"
                  @click="() => selectedStatus = 0"
                >
                    <span class="flex flex-col uppercase">
                      <span class="text-primary font-normal text-sm">All Visits</span>
                      <span class="text-primary font-semibold">{{ patientVisits.length }}</span>
                    </span>
                </div>
                <div class=".w-full shadow-md w-2/12 p-4 rounded-lg mx-4 cursor-pointer" :class="{'light-grey-bg': selectedStatus === 2}"
                  @click="() => selectedStatus = 2"
                >
                    <span class="flex flex-col uppercase">
                      <span class="text-warning font-normal text-sm">In-Progress</span>
                      <span class="text-warning font-semibold ">{{ patientVisits.filter((i) => i.status?.toLowerCase() === "in-progress" || i.status?.toLowerCase() === "active").length }}</span>
                    </span>
                </div>
                <div class=".w-full shadow-md w-2/12 p-4 rounded-lg cursor-pointer" :class="{'light-grey-bg': selectedStatus === 3}"
                  @click="() => selectedStatus = 3"
                >
                    <span class="flex flex-col uppercase">
                      <span class="text-danger font-normal text-sm text-success">Completed</span>
                      <span class="text-danger font-semibold text-success">{{ patientVisits.filter((i) => i.status?.toLowerCase() !== "in-progress" && i.status?.toLowerCase() !== "queue" && i.status?.toLowerCase() !== "active").length }}</span>
                    </span>
                </div>
            </div> -->

             <div class="w-full curved flex py-2 justify-end my-6">
                <div class=".w-full flex font-semibold text-xl py-2 justify-end pb-4">
                    <Button :loading="false">
                        <router-link :to="{ name: 'Appointment' }" style="background: #FE4D3C" class="text-base bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-semibold py-3 px-8 rounded-full">
                            Go To Appointments 
                        </router-link>
                    </Button>
                </div>
            </div>

            <div class="w-full pb-7 mb-8 bg-white">
                <cornie-table :columns="rawHeaders" v-model="items">
                <!-- <template #appointmentType="{ item }">
                    <p>{{ item.appointmentId ? getAppointment(item.appointmentId).appointmentType : '' }}</p>
                </template> -->
                <template #status="{ item }">
                    <div class="container">
                    <span class="rounded-full" :class="{ 'status-inactive': item.status === 'inactive', 'status-active': item.status === 'active' }">{{ item.status }}</span>
                    </div>
                </template>
                <template #practitioners="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                    <span class="rounded-full">
                        <Actors :items="item.practitioners" />
                    </span>
                    </div>
                </template>
                <template #actions="{ item }">
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <eye-icon class="mt-1" />
                    <span class="ml-3 text-xs" @click="showTimeline(item.id)">View timeline</span>
                    </div>
                    <!-- <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <ArrowRight />
                    <span class="ml-3 text-xs" @click="showCheckinPane(item.id)">Check-in</span>
                    </div> -->
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="start(item.id)">
                    <EncounterIcon class="mr-3 mt-1"  />
                    <span class="ml-3 text-xs" >Start Encounter</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="destroy(item.id)">
                      <CancelIcon />
                      <span class="ml-3 text-xs"
                      >Cancel Visit</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <AddIcon />
                      <span class="ml-3 text-xs">Add Vitals</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <ArrowRight />
                      <span class="ml-3 text-xs"
                      >Refer Patient</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <ManageBillIcon />
                      <span class="ml-3 text-xs"
                      >Manage Bill</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <AddIcon />
                      <span class="ml-3 text-xs"
                      >Admit Patient</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="markAsNoShow(item.id)">
                      <NoshowIcon />
                      <span class="ml-3 text-xs"
                      >No Show</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCheckoutPane(item.id)">
                      <CheckoutIcon />
                      <span class="ml-3 text-xs"
                      >Check-out</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCheckoutPane(item.id)">
                      <UpdateIcon />
                      <span class="ml-3 text-xs"
                      >Update Status</span>
                    </div>
                </template>
                </cornie-table>
                
                <column-filter
                :columns="rawHeaders"
                v-model:preferred="preferredHeaders"
                v-model:visible="showColumnFilter"
                />
                <side-modal :visible="showCheckout" :header="'Check-Out'" @closesidemodal="() => showCheckout = false">
                    <CheckOut :item="currentVisit" @close="() => showCheckout = false" />
                </side-modal>

                <!-- <side-modal :visible="showCheckin" :header="'Check-In'" @closesidemodal="() => showCheckin = false">
                    <CheckIn :item="appointments[0]" @close="() => showCheckin = false"  />
                </side-modal> -->

                <side-modal :visible="showCheckNoapp" :header="'Check-In'" @closesidemodal="() => showCheckNoapp = false">
                    <CheckinNoapp :patientId="patients[0]?.id" :item="appointments[0]"  @close="() => showCheckNoapp = false" />
                </side-modal>

                <side-modal :visible="false">
                <AdvancedFilter />
                </side-modal>

                <side-modal :visible="showViewPane" :header="'View Stot'">
                <div class="w-full my-3">
                    <ViewDetails :schedule="selectedSchedule" />
                </div>
                <div class="w-full my-3">
                    <ViewPlan :schedule="selectedSchedule" />
                </div>
                <div class="w-full my-3">
                    <ViewBreaks :schedule="selectedSchedule" />
                </div>
                </side-modal>

            </div>

            <div style="height: 400px">

            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import Actors from "@/views/dashboard/schedules/components/actors.vue"
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
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from '@/components/icons/edit.vue'
import AddIcon from '@/components/icons/add.vue'
import DeactivateIcon from '@/components/icons/deactivate.vue'
import Button from '@/components/globals/corniebtn.vue'

import SideModal from "@/views/dashboard/schedules/components/side-modal.vue"
import CheckIn from './components/checkin.vue'
import CheckOut from './components/checkout.vue'
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Modal from '@/components/modal.vue';
//import Close from '@/components/icons/close.vue'
import CheckinNoapp from './components/checkin-noappointment.vue'
import ArrowRight from '@/components/icons/arrow-right.vue'
import EncounterIcon from '@/components/icons/encounter.vue'
import MultiSelect from "@/views/dashboard/schedules/components/apply-to.vue"
import CheckoutIcon from '@/components/icons/checkout.vue'

import EmptyState from './empty-state.vue'
import CancelIcon from './components/cancel.vue'
import UpdateIcon from './components/update.vue'
import NoshowIcon from './components/no-show.vue'
import ManageBillIcon from './components/manage-bill.vue'
import ActionLog from './components/timeline-component.vue'
import { IPatient } from "@/types/IPatient";

const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    ActionLog,
    MultiSelect,
    CancelIcon,
    //Close,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    EditIcon,
    Button,
    SideModal,
    CheckIn,
    CornieTable,
    AddIcon,
    DeactivateIcon,
    EmptyState,
    CheckOut,
    Modal,
    Actors,
    CheckinNoapp,
    ArrowRight,
    EncounterIcon,
    CheckoutIcon,
    UpdateIcon,
    NoshowIcon,
    ManageBillIcon,
  },
})
export default class PractitionerExistingState extends Vue {
  showColumnFilter = false;
  show = false;
  query = "";
  search = "";

  selectedStatus = 0;
  filterByType: any = [ ]
  filterByStatus: any = [ ]
  completedStatus: any = [  ]
  currentVisitId = '';


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
  selectedVisit : any = { };
  selectedPatient : any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]

  // @visitsStore.State
  // visits!: any[];

  @visitsStore.Action
  getPatientVisits!: (patientId: string) => Promise<void>;

  @visitsStore.State
  patientVisits!: any[];

  @visitsStore.State
  patients!: any[];

  @visitsStore.Action
  getPatients!: () => Promise<void>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  @visitsStore.Action
  schedulesByPractitioner!: () => Promise<any>;

  @visitsStore.Action
  checkin!: (body: any) => Promise<boolean>;

  @visitsStore.Action
  startEncounter!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  cancel!: (id: string) => Promise<boolean>;

  @visitsStore.Action
  noShow!: (id: string) => Promise<boolean>;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Recorded",
      key: "recorded",
      show: true,
    },
    {
      title: "Identifier",
      key: "identifier",
      show: true,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    { title: "Slot", key: "slot", show: true },
    {
      title: "Practitioner",
      key: "practitioners",
      show: true,
    },
    {
      title: "Participant Status",
      key: "status",
      show: true,
    },
    {
      title: "Location",
      key: "location",
      show: true,
    },
    
    
  ];

  types = ['All', 'Emergency', 'Walk-In', 'Follow-Up', 'Routine']
  statuses = ['All', 'Completed', 'Queue', 'In-Progress']
  availableSlots: any = [ ]

  get currentVisit() {
    if (!this.currentVisitId) return { }
    return this.patientVisits.find((i: any) => i.id === this.currentVisitId);
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    if (this.patientVisits?.length === 0) return [ ];
    return this.patientVisits.map((visit: any) => {
      return {
        recorded: new Date(visit.createdAt).toLocaleDateString(),
        identifier: "XXXXX",
        appointmentType: this.getAppointment(visit.appointmentId).appointmentType,
        slot: `${visit.checkInTime.substring(11, 16)} ${new Date(new Date(visit.checkInTime).getMinutes() + 60).toLocaleTimeString().substring(0, 5)}`,
        status: visit.status,
        location: visit?.room?.name,
        practitioners: [
          {
            "id": "91197e0d-4425-4bcf-ba84-366010fc29cf",
            "firstName": "Darlington",
            "email": "anselem16m@outlook.com",
            "middleName": "",
            "lastName": "Onyemere",
            "organizationId": "0eb0c710-665a-449c-ab27-42014d25c676",
            "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
            "accountType": "Provider",
            "roleId": null,
            "phone": {
              "number": "08122463202",
              "dialCode": "+1264"
            },
            "createdAt": "2021-07-23T12:20:34.591Z",
            "updatedAt": "2021-07-23T12:20:34.591Z",
            "OrganizationId": null
        },
          {
            "id": "91197e0d-4425-4bcf-ba84-366010fc29cf",
            "firstName": "Darlington",
            "email": "anselem16m@outlook.com",
            "middleName": "",
            "lastName": "Onyemere",
            "organizationId": "0eb0c710-665a-449c-ab27-42014d25c676",
            "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
            "accountType": "Provider",
            "roleId": null,
            "phone": {
              "number": "08122463202",
              "dialCode": "+1264"
            },
            "createdAt": "2021-07-23T12:20:34.591Z",
            "updatedAt": "2021-07-23T12:20:34.591Z",
            "OrganizationId": null
        },
          {
            "id": "91197e0d-4425-4bcf-ba84-366010fc29cf",
            "firstName": "Darlington",
            "email": "anselem16m@outlook.com",
            "middleName": "",
            "lastName": "Onyemere",
            "organizationId": "0eb0c710-665a-449c-ab27-42014d25c676",
            "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
            "accountType": "Provider",
            "roleId": null,
            "phone": {
              "number": "08122463202",
              "dialCode": "+1264"
            },
            "createdAt": "2021-07-23T12:20:34.591Z",
            "updatedAt": "2021-07-23T12:20:34.591Z",
            "OrganizationId": null
        },
          {
            "id": "91197e0d-4425-4bcf-ba84-366010fc29cf",
            "firstName": "Darlington",
            "email": "anselem16m@outlook.com",
            "middleName": "",
            "lastName": "Onyemere",
            "organizationId": "0eb0c710-665a-449c-ab27-42014d25c676",
            "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
            "accountType": "Provider",
            "roleId": null,
            "phone": {
              "number": "08122463202",
              "dialCode": "+1264"
            },
            "createdAt": "2021-07-23T12:20:34.591Z",
            "updatedAt": "2021-07-23T12:20:34.591Z",
            "OrganizationId": null
        },
          {
            "id": "91197e0d-4425-4bcf-ba84-366010fc29cf",
            "firstName": "Darlington",
            "email": "anselem16m@outlook.com",
            "middleName": "",
            "lastName": "Onyemere",
            "organizationId": "0eb0c710-665a-449c-ab27-42014d25c676",
            "image": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/corniehealth/1627042636794-golden-boy.png",
            "accountType": "Provider",
            "roleId": null,
            "phone": {
              "number": "08122463202",
              "dialCode": "+1264"
            },
            "createdAt": "2021-07-23T12:20:34.591Z",
            "updatedAt": "2021-07-23T12:20:34.591Z",
            "OrganizationId": null
        },
      ]
      }
    })
  }

  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    console.log(pt, id);
    
    return pt ? `${pt.firstname} ${pt.lastname}` : '';
  }

  setSelectedVisit(id: string) {
    const pt = this.patientVisits.find((i: any) => i.id === id);
    console.log(pt, "PTTT");
    this.selectedVisit = pt ? pt : { };
  }

  setSelectedPatient(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    console.log(pt, "PTTTPPPP");
    this.selectedPatient = pt ? pt : { };
  }

  getActors(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);
    
    return pt ? pt.Practitioners : [ ];
  }

  getAppointment(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);
    
    return pt ? pt : { };
  }

  async start(id: string) {
    await this.startEncounter(id).then((res: any) => {
        window.notify({ msg: "Visit Started", status: "success" });
    })
  }

  async destroy(id: string) {
    const cancelled = await this.cancel(id);
    console.log(cancelled ,"cancelled");
    
    if (cancelled) {
      window.notify({ msg: "Visit Cancelled", status: "success" });
    }
  }

  async markAsNoShow(id: string) {
    const marked = await this.noShow(id);
    if (marked) {
      window.notify({ msg: "Visit marked as no-show", status: "success" });
    }
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


  viewSchedule(id: string) {
    // const schedule = this.schedules.find((i: any) => i.id === id);
    // if (schedule) this.selectedSchedule = schedule;
    // console.log(this.selectedSchedule);
    // this.showActorsPane = true;
    // this.showViewPane = true;
  }

  showCheckoutPane(id: string) {
    this.setSelectedVisit(id)
    this.currentVisitId = id;
    this.showCheckout = true;
  }

  showPatientDetails(id: string) {
    this.setSelectedPatient(id)
    this.viewDetails = true;
  }

  showTimeline(id: string) {
    this.setSelectedVisit(id)
     this.currentVisitId = id;
    this.timeLineVissible = true;
  }

  showCheckinPane(id: string) {
    this.setSelectedVisit(id)
    this.showCheckin = true;
  }


  closeEditPane() {
    this.showEditPane = false
  }

  async created() {
    if (!this.patients || this.patients.length === 0) await this.getPatients();
    if (!this.appointments || this.appointments.length === 0) await this.fetchAppointments();
    console.log(this.appointments, "appos");
    
    if (!this.patientVisits || this.patientVisits.length === 0) await this.getPatientVisits(this.$route.params.id.toString());
    console.log(this.patientVisits, "visits");
    window.addEventListener('click', (e: any) => {
      if (!e.target.classList.contains('md')) {
        this.selectType = false;
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
</style>
