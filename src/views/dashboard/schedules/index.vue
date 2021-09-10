<template>
  <div class="w-full my-2 h-screen">
      <div class="container-fluid bg-white sm:p-6 h-full">
        <div class="w-full border-b-2 curved flex py-2 mt-4">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Schedules & Slots</h2>
            </div>
        </div>


        <div class="w-full border-b-4 curved flex my-8">
            <div class="container-fluid flex font-semibold text-xl">
                <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color text-dark': activeTab === 0, 'text-gray-500': activeTab !== 0 }"
                  @click="() => activeTab = 0"
                >Schedule</a>
                <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color': activeTab === 1, 'text-gray-500': activeTab !== 1 }"
                  @click="() => activeTab = 1"
                >Availability</a>
                <a class="px-4 py-2 active-tab cursor-pointer" :class="{ 'active-color': activeTab === 2, 'text-gray-500': activeTab !== 2 }"
                  @click="() => activeTab = 2"
                >Fixed Slot</a>
            </div>
          </div>
          

        <div class="w-full" v-if="activeTab === 2">
          <Slots />
        </div>
          
          <div class="w-full">
            <Overlay :show="show">
              <Modal :bigger="true">
                <template v-slot:header>
                  <h3 class="text-xl flex justify-between leading-6 font-medium text-gray-900 mb-5 capitalize modal_titlee cursor-pointer" id="modal-title">
                      <span>Night Shift_DT</span>
                      <span @click="() => show = false" class="lowercase pb-1 cursor-pointer font-normal bg-primary text-white flex items-center justify-center" style="width: 20px;height:20px;border-radius:50%">×</span>
                  </h3>
                </template>

                <template v-slot:body>
                  <div class="w-full">
                    <span class="flex items-center w-full">
                      <icon-input
                      :width="'w-full'"
                      class="border border-gray-600 rounded-full focus:outline-none"
                      type="search"
                      v-model="search"
                      >
                      <template v-slot:prepend>
                          <search-icon />
                      </template>
                      </icon-input>
                    </span>
                  </div>
                  <p class="text-base text-gray-500 my-3">
                    Practitioners assigned to this shift
                  </p>
                  <div class="w-full">
                    <div class="container flex flex-col" style="max-height: 400px;overflow-y:scroll">
                      <div class="w-full flex items-center">
                        <div class="w-2/12">
                          <img src="https://via.placeholder.com/30x30" class="rounded-full border" alt="Image">
                        </div>
                        <div class="w-10/12 ml-3">
                          <span class="text-base text-gray-500">W. E Somebod</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </Modal>
          </Overlay>

          <div class="w-full curved flex py-2 justify-end my-6" v-if="activeTab === 0">
              <div class=".w-full flex font-semibold text-lg py-2 justify-end pb-4">
                  <Button :loading="false">
                      <router-link :to="{ name: 'Patient Experience - New Schedule' }" style="background: #FE4D3C" class="text-lg bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                          New Schedule
                      </router-link>
                  </Button>
              </div>
          </div>
            <div class="w-full pb-7 mb-8">
              <cornie-table :columns="headers" v-model="items" v-if="activeTab === 0">
                
                <template #name="{ item }">
                  <p>{{ item.name }}</p>
                </template>
                <template #days="{ item }">
                  <p>{{ item.days.map(i => i.substring(0, 3)).join(', ') }}</p>
                </template>
                <template #status="{ item }">
                  <div class="container">
                    <span class="p-2 px-3 rounded-full" :class="{ 'status-inactive': item.status === 'inactive', 'status-active': item.status === 'active' }">{{ item.status }}</span>
                  </div>
                </template>
                <template #practitioners="{ item }">
                  <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                    <span class="p-2 px-3 rounded-full">
                      <Actors :items="item.practitioners" />
                    </span>
                  </div>
                </template>

                <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <eye-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="
                      $router.push({ name: 'Patient Experience Management', params: { scheduleId: item.id} })">View Details</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <EditIcon />
                    <span class="ml-3 text-xs" @click="$router.push({ name: 'Patient Experience Management', params: { scheduleId: item.id} })">Edit Schedule</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="addActor(item.id)">
                    <AddIcon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" >Add Actor/Practitioner</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <EditIcon />
                    <span class="ml-3 text-xs" @click="$router.push({ name: 'Patient Experience Management', params: { scheduleId: item.id} })">Edit Slot</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" v-if="!isActive(item.id)">
                    <EditIcon />
                    <span class="ml-3 text-xs"
                      @click="activate(item.id)"
                    >Acivate</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" v-if="isActive(item.id)">
                    <DeactivateIcon />
                    <span class="ml-3 text-xs"
                      @click="deactivate(item.id)"
                    >Deacivate</span>
                  </div>
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <delete-icon />
                    <span class="ml-3 text-xs"
                      @click="destory(item.id)"
                    >Delete</span>
                  </div>
                </template>
              </cornie-table>
              <!-- Test Availability -->
              <div class="w-full" v-if="activeTab === 1">
                  <cornie-table :columns="availabilityHeaders" v-model="availabilityItems">
                <template #actions="{ item }">
                  <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                    <eye-icon class="mr-3 mt-1" />
                    <span class="ml-3 text-xs" @click="goToCreateSlot(item.id)">Create slot</span>
                  </div>
                  
                </template>

                  <template #time="{ item }">

                    <!-- <p class="text-xs">{{ new Date(item.startTime).toTimeString().substring(0, 5) }} - {{ new Date(item.endTime).toTimeString().substring(0, 5)}}</p> -->
                    <p class="text-xs">{{ item }}</p>
                  </template>
                  <template #0="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[0], item.split('-')[0].trim()),
                          constructDate(availabilityDates[0], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[0], item.split('-')[0].trim()),
                          constructDate(availabilityDates[0], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span class=" 16" v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #1="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[1], item.split('-')[0].trim()),
                          constructDate(availabilityDates[1], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[1], item.split('-')[0].trim()),
                          constructDate(availabilityDates[1], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #2="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[2], item.split('-')[0].trim()),
                          constructDate(availabilityDates[2], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[2], item.split('-')[0].trim()),
                          constructDate(availabilityDates[2], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #3="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[3], item.split('-')[0].trim()),
                          constructDate(availabilityDates[3], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[3], item.split('-')[0].trim()),
                          constructDate(availabilityDates[3], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #4="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[4], item.split('-')[0].trim()),
                          constructDate(availabilityDates[4], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[4], item.split('-')[0].trim()),
                          constructDate(availabilityDates[4], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #5="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="getActorsForSchedule(
                          constructDate(availabilityDates[5], item.split('-')[0].trim()),
                          constructDate(availabilityDates[5], item.split('-')[1].trim())
                        ).length > 0">
                      <Actors :items="getActorsForSchedule(
                          constructDate(availabilityDates[5], item.split('-')[0].trim()),
                          constructDate(availabilityDates[5], item.split('-')[1].trim())
                        )" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <!-- <template #1="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                                            {{ getActorsForSchedule(constructDate(availabilityDates[0], item.split('-')[0].trim()), constructDate(availabilityDates[1], item.split('-')[1].trim())) }} jdjdj

                      <span v-if="theSameDate(item.startDate, availabilityDates[1])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                      {{ getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[1]) }}
                    </span>
                    </div>
                  </template>
                  <template #3="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                                            {{ getActorsForSchedule(constructDate(availabilityDates[0], item.split('-')[0].trim()), constructDate(availabilityDates[2], item.split('-')[1].trim())) }} jdjdj

                      <span v-if="theSameDate(item.startDate, availabilityDates[2])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                      {{ getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[2]) }}
                    </span>
                    </div>
                  </template>
                  <template #3="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                                            {{ getActorsForSchedule(constructDate(availabilityDates[3], item.split('-')[0].trim()), constructDate(availabilityDates[0], item.split('-')[1].trim())) }} jdjdj

                    {{ getActorsForSchedule(constructDate(availabilityDates[0], item.split('-')[0].trim()), constructDate(availabilityDates[0], item.split('-')[1].trim())) }} jdjdj
                      <span v-if="theSameDate(item.startDate, availabilityDates[3])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                      {{ getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[3]) }}
                    </span>
                    </div>
                  </template>
                  <template #4="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                                            {{ getActorsForSchedule(constructDate(availabilityDates[0], item.split('-')[0].trim()), constructDate(availabilityDates[4], item.split('-')[1].trim())) }} jdjdj

                      <span v-if="theSameDate(item.startDate, availabilityDates[4])">
                      <Actors :items="getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[4]) " />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #5="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[5])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                      {{ getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[5]) }}
                    </span>
                    </div>
                  </template>
                  <template #6="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[6])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                      {{ getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[5]) }}
                    </span>
                    </div>
                  </template>
                  <template #7="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[7])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                      {{ getPractitioners(new Date(item.startTime).toTimeString().substring(0, 5), availabilityDates[5]) }}
                    </span>
                    </div>
                  </template> -->
              </cornie-table>
              </div>
              
              <column-filter
              :columns="rawHeaders"
              v-model:preferred="preferredHeaders"
              v-model:visible="showColumnFilter"
              />
              <side-modal :visible="showActorsPane" :header="'All Actors'" @closesidemodal="() => showActorsPane = false">
                <AllActors :schedule="selectedSchedule" />
              </side-modal>

              <side-modal :visible="showEditPane" :header="'Edit Slot'" @closesidemodal="closeEditPane">
                <EditSchedule  />
              </side-modal>

              <side-modal :visible="showAddActorsPane" :header="'Add Actor/Practitioner'" @closesidemodal="() => showAddActorsPane = false">
                <AddActors :schedule="selectedSchedule" :actors="allPractitioners" @actoradded="actorAdded" @close="() =>  showAddActorsPane = false" />
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
        </div>

        <div style="height: 50px">

        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
// import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import EditIcon from '@/components/icons/edit.vue'
import AddIcon from '@/components/icons/add.vue'
import DeactivateIcon from '@/components/icons/deactivate.vue'
import Button from '@/components/globals/corniebtn.vue'
import Modal1 from "@/components/modal.vue";

import Overlay from '../settings/rolesprivileges/components/overlay.vue'
import Modal from '../settings/rolesprivileges/components/modal.vue'

import SideModal from './components/side-modal.vue';
import EditSchedule from './components/edit-schedule.vue'
import ViewDetails from './components/view-details.vue'
import ViewPlan from './components/view-planning.vue'
import ViewBreaks from './components/view-breaks.vue'
import AllActors from './components/all-actors.vue'
import AdvancedFilter from './components/advanced-filter.vue'
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Actors from './components/actors.vue'
import AddActors from './components/add-actor.vue'
import IPractitioner from "@/types/IPractitioner";

import Slots from './components/slots.vue'
import utilservice from './helper/util'
import dateHelper from './helper/date-helper'
import edit from './edit-slot.vue'


const shifts = namespace("shifts");
const schedulesStore = namespace("schedules");
const contacts = namespace('practitioner');

@Options({
  components: {
    // Table,
    edit,
    Slots,
    AddActors,
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
    Overlay,
    Modal,
    Modal1,
    SideModal,
    EditSchedule,
    ViewDetails,
    ViewPlan,
    ViewBreaks,
    AllActors,
    AdvancedFilter,
    CornieTable,
    Actors,
    AddIcon,
    DeactivateIcon,
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

  selectedSchedule: any = { };


  @shifts.State
  shifts!: any[];

  @contacts.State
  practitioners!: IPractitioner[];

  @contacts.Action
  fetchPractitioners!:() => Promise<boolean>;

  @shifts.Action
  getShifts!: () => Promise<void>;

  @shifts.Action
  deleteShift!: (id: string) => Promise<boolean>;

  @shifts.Action
  activateShift!: (id: string) => Promise<boolean>;

  @shifts.Action
  destroyShift!: (id: string) => Promise<boolean>;

  @schedulesStore.State
  schedules!: any[];

  @schedulesStore.Action
  getSchedules!: () => Promise<void>;

  @schedulesStore.Action
  deleteSchedule!: (id: string) => Promise<boolean>;

  @schedulesStore.Action
  activateSchedule!: (id: string) => Promise<boolean>;

  @schedulesStore.Action
  deactivateSchedule!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name | Identifier",
      key: "name",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
    },
    {
      title: "Specialty",
      key: "specialty",
      show: true,
    },
    { title: "Days", key: "days", show: true },
    {
      title: "Timing",
      key: "timing",
      show: true,
    },
    {
      title: "Participants",
      key: "practitioners",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    
  ];
  testHeaders = [
    {
      title: "Name | Identifier",
      key: "name",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
    },
    {
      title: "Specialty",
      key: "specialty",
      show: true,
    },
    { title: "Days", key: "days", show: true },
    {
      title: "Timing",
      key: "timing",
      show: true,
    },
    {
      title: "Actors",
      key: "practitioners",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    
  ];

  goToCreateSlot(id: string) {
    
  }

  get availabilityHeaders() {
    if (!this.availabilityDates) return [ ];
    let arr =  this.availabilityDates.map((i: any, index: number) => {
      return {
        title: i,
        key: index.toString(),
        show: true
        // show: index > 4 ? false : true
      }
    })
    arr.unshift({ title: 'Time', key: 'time', show: true});
    return arr;
  }

  getActorsForSchedule(startDate: string | Date, endDate: string | Date) {
    return dateHelper.getPractitionersForSlot(this.schedules, startDate, endDate);
  }

  get availabilityDates() {
    let arr = [ ];
    for (let i = 1; i <= 7; i++) {
      let sunday = new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 6))
      arr.push(new Date(sunday.setDate(sunday.getDate() + i)).toDateString());
    }
    return arr;
  }

  get availabilityItems() {
    if (!this.schedules) return [ ]
    console.log(utilservice.slots(), "ALL SLOTS");
    
    return utilservice.slots();
    // return utilservice.getSlots().map(i => {
    //   return {
    //     startTime: i.start,
    //     endTime: i.end,
    //     timing: new Date(i.start),
    //     practitioners: dateHelper.getPractitionersForSlot(this.schedules, new Date(i.start), new Date(i.end))
    //   }
    // })

    
    // return this.schedules.map((i: any) => {
      
    //   return {
    //     time: `${i.startTime } - ${i.endtime}`,
    //     practitioners: i.practitioners,
    //     0: '',
    //     1: '',
    //     2: '',
    //     3: '',
    //     4: '',
    //     5: '',
    //     6: '',
    //   }
    // })
  }

  constructDate(date: string, time: string) {
    return dateHelper.constructDateFromDateAndTime(date, time);
  }

  getPractitioners(time: any, date: any) {
    // const fullDate = new Date(new Date(`${new Date(date).toLocaleDateString()} ${time}`));
    // console.log(fullDate, "Fulldate");
    
    // const practioners = this.schedules.filter(i => {
    //   const scheduleStart = new Date(new Date(`${new Date(i.startDate).toLocaleDateString()} ${i.startTime}`));
    //   console.log(scheduleStart, "sstart");
      
    //   const scheduleEnd = new Date(new Date(`${new Date(i.endDate).toLocaleDateString()} ${i.endTime}`));
    //   console.log(scheduleEnd, "sesnd");
    //   return scheduleStart >= fullDate && scheduleEnd <= fullDate;
    // })
    const arr: any = [ ];
    // practioners.forEach(i => {
    //   if (i.practitioners) {
    //     i.practitioners.forEach((j: any) => {
    //       if (arr.findIndex((m: any) => m.id === j.id) < 0) arr.push(j);
    //     });
    //   }
    // })

    return arr;
  }

  isWithinRange(slot: any, day: string, time: string) {
    return utilservice.isWithinRange(slot, new Date(new Date(`${new Date(day).toLocaleDateString()} ${time}`)).toISOString());
  }

  theSameDate(date: string, header: string) {
    return new Date(date).getFullYear() === new Date(header).getFullYear() &&
          new Date(date).getDate() === new Date(header).getDate() &&
          new Date(date).getMonth() === new Date(header).getMonth();
  }

  get allPractitioners() {
    if (!this.practitioners || this.practitioners.length === 0) return [ ];
    return this.practitioners
    .filter(i => this.selectedSchedule && this.selectedSchedule.id && this.selectedSchedule.practitioners.findIndex((j: any) => j.id === i.id) < 0)
    .map(i => {
      console.log(i, "i");
      
      return {
        code: i.id,
        display: `${i.firstName} ${i.lastName}`,
        image: i.image
      }
    })
  }

  get bookedSlots() {
    const slots: any = [ ]
    this.schedules.forEach(i => {
      if (i.slots && i.slots.length > 0) {
        i.slots.forEach((j: any) => {
          slots.push({
            startTime: new Date(new Date(`${new Date(i.startDate).toLocaleDateString()} ${j.startTime}`)),
            endTime: new Date(new Date(`${new Date(i.endDate).toLocaleDateString()} ${j.endTime}`)),
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
          })
        });
      }
    })
    console.log(slots, "LOOP SLOTS");
    return slots;
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
    // if (this.shifts.length === 0 ) return this.shifs;
    const shifts = this.schedules.map((i: any) => {
      return {
        ...i,
        action: i.id,
        status: i.status,
        schedule: i.scheduleType,
        timing: `${i.startTime} - ${i.endTime}`
      };
    });
    return shifts;
    
  }

  actorAdded(actor: any) {
    const index = this.schedules.findIndex(i => i.id === actor.scheduleId);
    this.schedules[index].practitioners.unshift(actor)
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to deactivate this shift?",
    });
    if (!confirmed) return;

    try {
        const response = await this.deleteShift(id);
        if (response) window.notify({ msg: "Shift eactivated", status: "success" });
        this.getShifts()
    } catch (error) {
        window.notify({ msg: "Shift could not deactivated", status: "error" });
        console.log(error)
    }
  }

  async activate(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to activate this Schedule?",
    });
    if (!confirmed) return;

    try {
        const response = await this.activateSchedule(id);
        if (response) window.notify({ msg: "Schedule activated", status: "success" });
    } catch (error) {
        window.notify({ msg: "Schedule could not activated", status: "error" });
        console.log(error)
    }
  }

  async deactivate(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to deactivate this Schedule?",
    });
    if (!confirmed) return;

    try {
        const response = await this.deactivateSchedule(id);
        if (response) window.notify({ msg: "Schedule deactivated", status: "success" });
    } catch (error) {
        window.notify({ msg: "Schedule could not deactivated", status: "error" });
        console.log(error)
    }
  }

  async destory(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to delete this schedule? This action cannot be undone.",
    });
    if (!confirmed) return;

    try {
        const deleted = await this.deleteSchedule(id);
        if (deleted) {
          notify({
            msg: "Schedule deleted successfully",
            status: "success",
          });
        }
    } catch (error) {
        window.notify({ msg: "Schedule could not deleted", status: "error" });
        console.log(error)
    }
  }

  viewSchedule(id: string) {
    const schedule = this.schedules.find((i: any) => i.id === id);
    if (schedule) this.selectedSchedule = schedule;
    console.log(this.selectedSchedule);
    this.showActorsPane = true;
    // this.showViewPane = true;
  }

  addActor(id: string) {
    const schedule = this.schedules.find((i: any) => i.id === id);
    if (schedule) this.selectedSchedule = schedule;
    console.log(schedule, "selected");
    
    this.showAddActorsPane = true;
  }

  isActive(id: string) {
    const schedule = this.schedules.find((i: any) => i.id === id);
    if (!schedule) return false;
    return schedule.status === 'active' ? true : false;
  }

  closeEditPane() {
    this.showEditPane = false
  }

  async created() {
    if (!this.schedules || this.schedules.length === 0) await this.getSchedules();
    if (!this.practitioners || this.practitioners.length === 0) await this.fetchPractitioners();
    console.log(this.schedules, "schs");
    
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
