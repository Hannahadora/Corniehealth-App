<template>
  <div class="w-full my-2 h-screen">
      <div class="containr-fluid" v-if="dummyData && dummyData.length === 0">
        <EmptyState />
      </div>
      <div v-else class="container-fluid bg-white sm:p-6 h-full">
        <div class="w-full border-b-2 curved flex py-2 mt-4">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Active Visits</h2>
            </div>
        </div>


        <div class="w-full">
             <div class="w-full curved flex py-2 justify-end my-6">
                <div class=".w-full flex font-semibold text-xl py-2 justify-end pb-4">
                    <Button :loading="false">
                        <router-link :to="{ name: 'Appointment' }" style="background: #FE4D3C" class="text-base bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-semibold py-3 px-8 rounded-full">
                            Go To Appointments 
                        </router-link>
                    </Button>
                </div>
            </div>

            <div class="w-full" v-if="false">
                <TimeLine />
            </div>

            <div class="w-full pb-7 mb-8">
                <cornie-table :columns="rawHeaders" v-model="dummyData">
                
                <template #appointmentType-header="{  }">
                    <p class="cursor-pointer md" style="font-weight: 600" @click="() => selectType = !selectType">Appointment Type</p>
                    <div class="absolute md" v-if="selectType">
                      <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1 md" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a class="md text-gray-700 block px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                            v-for="(day, index) in types" :key="index"
                        >
                            <span><input type="checkbox" class="h-4 w-4 md" name="" id="" :value="day"></span>
                            <span class="mx-2 text-xs md">{{ day }}</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </template>
                
                <template #status-header="{  }">
                    <p class="cursor-pointer md" style="font-weight: 600" @click="() => filterStatus = !filterStatus">Participant Status</p>
                    <div class="absolute md" v-if="filterStatus">
                      <div style="max-height: 280px;overflow-y: scroll;width: 200px" class="md origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1 md" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a class="md text-gray-700 block px-4 py-2 text-sm flex items-center" role="menuitem" tabindex="-1" id="menu-item-0"
                            v-for="(day, index) in statuses" :key="index"
                        >
                            <span><input type="checkbox" class="h-4 w-4 md" name="" id="" :value="day"></span>
                            <span class="mx-2 text-xs md">{{ day }}</span>
                        </a>
                        </div>
                    </div>
                    </div>
                </template>
                
                <template #name="{ item }">
                    <p>{{ item ? '' : '' }}XXXXXX</p>
                </template>
                <template #patient="{ item }">
                    <p>{{ item.patient }}</p>
                </template>
                <template #days="{ item }">
                    <p>{{ item.days.map(i => i.substring(0, 3)).join(', ') }}</p>
                </template>
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
                    <eye-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="
                            $router.push({ name: 'Patient Experience Management', params: { scheduleId: item.id} })">View</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <ArrowRight />
                    <span class="ml-3 text-xs" @click="() => showCheckin = true">Check-in</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <EncounterIcon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" >Start Encounter</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <EditIcon />
                      <span class="ml-3 text-xs">Add Vitals</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                      <ArrowRight />
                      <span class="ml-3 text-xs"
                      >Refer Patient</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="() => showCheckout = true">
                      <CheckoutIcon />
                      <span class="ml-3 text-xs"
                      >Check-out</span>
                    </div>
                </template>
                </cornie-table>
                
                <column-filter
                :columns="rawHeaders"
                v-model:preferred="preferredHeaders"
                v-model:visible="showColumnFilter"
                />
                <side-modal :visible="showCheckout" :header="'Check-Out'" @closesidemodal="() => showCheckout = false">
                    <CheckOut />
                </side-modal>

                <side-modal :visible="showCheckin" :header="'Check-In'" @closesidemodal="() => showCheckin = false">
                <!-- <side-modal :visible="showEditPane" :header="'Edit Slot'" @closesidemodal="closeEditPane"> -->
                    <CheckIn  />
                </side-modal>

                <side-modal :visible="showCheckNoapp" :header="'Check-In'" @closesidemodal="() => showCheckNoapp = false">
                <!-- <side-modal :visible="showEditPane" :header="'Edit Slot'" @closesidemodal="closeEditPane"> -->
                    <CheckinNoapp  />
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

                <modal :visible="true">
                  <template #title>
                    <p class="flex items-center justify-between px-2" style="width: 440px">
                      <span class="font-lignt text-primary p-2 text-xl">Timeline</span> 
                      <span class="text-danger cursor-pointer">
                        See all
                      </span>
                    </p>
                  </template>
                  <div class="w-4/12 px-4" style="width: 440px">
                    <div class="w-full">
                      <div class="w-full">
                        <p class="font-weight-light">Check In</p>
                        <p class="font-weight-light italic text-xs text-gray-400">April 10, 2020. 8:00 AM</p>
                        <p class="font-weight-light text-lg" style="color: #114FF5">Open</p>
                        <p class="font-weight-light text-xs text-gray-400 italic ">Check Out: 8:20 AM</p>
                      </div>
                      <div class="w-full my-2" style="height: 50px;border-left: 1px dashed #878E99;">

                      </div>
                      
                    </div>
                  </div>

                  <div class="w-4/12 px-4 my-2" style="width: 440px">
                    <div class="w-full">
                      <div class="w-full">
                        <p class="font-weight-light textlf">Add Vitals</p>
                        <p class="font-weight-light italic text-xs text-gray-400">April 10, 2020. 8:00 AM</p>
                        <p class="font-weight-light text-lg" style="color: #114FF5">Open</p>
                        <p class="font-weight-light text-xs text-gray-400 italic ">Check Out: 8:20 AM</p>
                      </div>
                      <div class="w-full" style="height: 50px;border-left: 1px dashed #878E99;">

                      </div>
                      
                    </div>
                  </div>

                </modal>

                <modal :visible="false">
                  <template #title>
                    <p class="flex items-center justify-between px-2" style="width: 440px">
                      <span class="font-bold text-danger p-2 text-xl">Mike Dean</span> 
                      <span class="bg-danger">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="white"/>
                        <path d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#FF0000"/>
                        </svg>
                      </span>
                    </p>
                  </template>
                  <div class="w-4/12 px-4" style="width: 440px">
                    <div class="w-full flex">
                      <div class="w-6/12">
                        <div class="w-full">
                          <div class="w-11/12">
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">MRN No:</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">D.O.B:</span> 
                              <span class="ml-2">12 April, 1989</span> 
                            </div>
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">Policy Expiry:</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                            <div class="w-full py-2">
                              <span class="font-semibold text-primary">Policy No:</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-6/12">
                        <div class="w-full">
                          <div class="w-11/12">
                            <div class="py-2 w-full">
                              <span class="font-semibold text-primary">Gender:</span> 
                              <span class="ml-2">Male</span> 
                            </div>
                            <div class="py-2 w-full">
                              <span class="font-semibold text-primary">Profile Type</span> 
                              <span class="ml-2">XXXX</span> 
                            </div>
                            <div class="py-2w-full">
                              <span class="font-semibold text-primary">Payor</span> 
                              <span class="ml-2">XXXXXX</span> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full pt-3 pb-6">
                      <p class="text-center font-normal text-large text-primary">View Policy Coverage</p>
                    </div>
                  </div>

                </modal>

            </div>

            <div style="height: 50px">

            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import Actors from '../schedules/components/actors.vue'
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

import SideModal from '../schedules/components/side-modal.vue';
import CheckIn from './components/checkin.vue'
import CheckOut from './components/checkout.vue'
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import TimeLine from './components/timeline-table.vue'
import Modal from '@/components/modal.vue';
import Close from '@/components/icons/close.vue'
import CheckinNoapp from './components/checkin-noappointment.vue'
import ArrowRight from '@/components/icons/arrow-right.vue'
import EncounterIcon from '@/components/icons/encounter.vue'
import MultiSelect from '../schedules/components/apply-to.vue'
import CheckoutIcon from '@/components/icons/checkout.vue'

import EmptyState from './empty-state.vue'

const visitsStore = namespace("visits");
const appointment = namespace("appointment");

@Options({
  components: {
    MultiSelect,
    Close,
    TimeLine,
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
  },
})
export default class PractitionerExistingState extends Vue {
  showColumnFilter = false;
  show = false;
  query = "";
  search = "";

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

  selectedSchedule: any = { };

  @visitsStore.State
  visits!: any[];

  @visitsStore.Action
  getVisits!: () => Promise<void>;

  @visitsStore.Action
  createSlot!: (body: any) => Promise<any>;

  @visitsStore.Action
  schedulesByPractitioner!: () => Promise<any>;

  @visitsStore.Action
  checkin!: (body: any) => Promise<any>;

  @appointment.State
  appointments!: any[];

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Identifier",
      key: "name",
      show: true,
    },
    {
      title: "Patient",
      key: "patient",
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

  types = ['All', 'Emergency', 'Walk In', 'Follow Up', 'Routine']
  statuses = ['All', 'Completed', 'Queue', 'In Progress']
  availableSlots: any = [ ]


  dummyData = [
    { id: 1, patient: 'Patient', appointmentType:'Type', slot: '1pm -2pm', practitioners: [{ firstName: 'Firstname', lastName: 'Lastname'}], status: 'inactive', location: 'Market' },
    { id: 2, patient: 'Patient', appointmentType:'Type', slot: '1pm -2pm', practitioners: [{ firstName: 'Firstname', lastName: 'Lastname'}], status: 'active', location: 'Market' },
    { id: 3, patient: 'Patient', appointmentType:'Type', slot: '1pm -2pm', practitioners: [{ firstName: 'Firstname', lastName: 'Lastname'}], status: 'inactive', location: 'Market' },
    { id: 4, patient: 'Patient', appointmentType:'Type', slot: '1pm -2pm', practitioners: [{ firstName: 'Firstname', lastName: 'Lastname'}], status: 'active', location: 'Market' },
  ]


  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", key: "action", image: true }];
  }

  get items() {
    // if (this.shifts.length === 0 ) return this.shifs;
    const shifts = this.visits.map((i: any) => {
      return {
        ...i,
        action: i.id,
        status: i.status,
        schedule: i.scheduleType,
        timing: `${i.startTime} - ${i.endTime}`
      };
    });
    return shifts;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  // async remove(id: string) {
  //   const confirmed = await window.confirmAction({
  //     message: "Are you sure you want to deactivate this shift?",
  //     // message: "Are you sure you want to deactivate this shift? This action cannot be undone.",
  //   });
  //   if (!confirmed) return;

  //   try {
  //       const response = await this.deleteShift(id);
  //       if (response) window.notify({ msg: "Shift eactivated", status: "success" });
  //       this.getShifts()
  //   } catch (error) {
  //       window.notify({ msg: "Shift could not deactivated", status: "error" });
  //       console.log(error)
  //   }
  // }

  // async activate(id: string) {
  //   const confirmed = await window.confirmAction({
  //     message: "Are you sure you want to activate this Schedule?",
  //   });
  //   if (!confirmed) return;

  //   try {
  //       const response = await this.activateSchedule(id);
  //       if (response) window.notify({ msg: "Schedule activated", status: "success" });
  //   } catch (error) {
  //       window.notify({ msg: "Schedule could not activated", status: "error" });
  //       console.log(error)
  //   }
  // }


  viewSchedule(id: string) {
    // const schedule = this.schedules.find((i: any) => i.id === id);
    // if (schedule) this.selectedSchedule = schedule;
    // console.log(this.selectedSchedule);
    // this.showActorsPane = true;
    // this.showViewPane = true;
  }


  closeEditPane() {
    this.showEditPane = false
  }

  async created() {
    if (!this.appointments || this.appointments.length === 0) await this.fetchAppointments();
    console.log(this.appointments, "appos");
    
    if (!this.visits || this.visits.length === 0) await this.getVisits();
    console.log(this.visits, "visits");
    window.addEventListener('click', (e: any) => {
      if (!e.target.classList.contains('md')) {
        this.selectType = false;
        this.filterStatus = false;
      }
    })

    let body = {
      "scheduleId": "f74e7d51-e022-4c2d-a9e8-891c06904f10",
      "startTime": "01:40",
      "endTime": "00:10",
      "description": "string",
      "status": "active",
      "active": true,
      "capacity": 0,
      "hasWaitList": true,
      "comments": "string",
      "repeat": {
        "year": 0,
        "month": 0,
        "week": 0,
        "everyDayOfSchedule": true
      }
    }
    let pat = {
      "mrn": "string",
      "firstname": "string1",
      "middlename": "string2",
      "lastname": "string3",
      "dateOfBirth": "2021-08-26",
      "gender": "male",
      "maritalStatus": "string",
      "multipleBirths": false,
      "multipleBirthInteger": 0,
      "guarantor": {
        firstname: "emergency-contact",
        lastname: "emergency-contact"
      },
      "accountType": "individual",
      "vip": true,
      "emergencyContacts": [
        {firstname: "emergency-contact",
        lastname: "emergency-contact"}
      ],
    }
    let req = {
      "appointmentId": "2600b457-6ee5-452b-b85a-a134be1a9ca4",
      // "orgId": "0eb0c710-665a-449c-ab27-42014d25c676",
      "patient": "520af5c1-1a8d-4f6b-a6d4-498148d8b249",
      "type": "Follow-up",
      "status": "active",
      "roomId": "d25cc910-0830-40cf-a0c8-7c303f381b29",
      // "checkInTime": "01:26",
      // "checkOutTime": "01:30",
      "notes": "true",
      "slotId": "6f72aece-ddb2-4908-aedb-cb1b961e814f",
      // practitioners: [ "87e846a3-bac0-43b9-a4db-0b2605426c42" ],
      // startTime: "00:25"
    }

    this.createSlot(pat).then((res: any) => {
      console.log(res, "SLOTSERR");
      
    })
    .catch((err: any) => {
      console.log(err, "PATERR");
      
    })

    this.checkin(req).then((res: any) => {
      console.log(res, "VISIT");
      
    })


    this.schedulesByPractitioner().then((res: any) => {
      console.log(res, "KKKK");
      
      const allSlots: any = [ ]
      res.forEach((i: any) => {
        if (i.slots && i.slots.length > 0) {
          i.slots.forEach((j: any) => {
            allSlots.push(j);
          });
        }
      });

      this.availableSlots = allSlots.map((i: any) => {
        return {
          code: i.id,
          display: `${i.startTime} - ${i.endTime}, ${new Date(i.startDate).toLocaleDateString()}`
        }
      })
      
    })
    .catch((err: any) => {
      console.log(err, "ERR");
      
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
</style>
