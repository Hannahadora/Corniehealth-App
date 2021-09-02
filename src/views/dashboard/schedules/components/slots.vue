<template>
    <div class="container-fluid">
        <div class="w-full pb-7 mb-8">
              <cornie-table :columns="headers" v-model="items" v-if="activeTab === 0 || activeTab === 2">
                
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
                  <cornie-table :columns="availabilityHeaders" v-model="items">
                  
                  <template #time="{ item }">
                    <p class="text-xs">{{ item.startTime }} - {{ item.endTime }}</p>
                  </template>
                  <template #0="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[0])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #1="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[1])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #2="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[2])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #3="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[3])">
                      <Actors :items="item.practitioners" />
                    </span> 
                    <span v-else>
                      --
                    </span>
                    </div>
                  </template>
                  <template #4="{ item }">
                    <div class="container cursor-pointer" @click="viewSchedule(item.id)">
                      <span v-if="theSameDate(item.startDate, availabilityDates[4])">
                      <Actors :items="item.practitioners" />
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
                    </span>
                    </div>
                  </template>
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

import Overlay from '../../settings/rolesprivileges/components/overlay.vue'
import Modal from '../../settings/rolesprivileges/components/modal.vue'

import SideModal from './side-modal.vue';
import EditSchedule from './edit-schedule.vue'
import ViewDetails from './view-details.vue'
import ViewPlan from './view-planning.vue'
import ViewBreaks from './view-breaks.vue'
import AllActors from './all-actors.vue'
import AdvancedFilter from './advanced-filter.vue'
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Actors from './actors.vue'
import AddActors from './add-actor.vue'
import IPractitioner from "@/types/IPractitioner";

const shifts = namespace("shifts");
const schedulesStore = namespace("schedules");
const contacts = namespace('practitioner');


interface IRole {
  name: string,
  description: string,
  isDefault: boolean,
  isSuperAdmin: boolean,
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

@Options({
  components: {
    // Table,
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
export default class SlotsComponent extends Vue {
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
      title: "Date",
      key: "date",
      show: true,
    },
    {
      title: "Time",
      key: "time",
      show: true,
    },
    {
      title: "Booking Cutoff",
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

  get availabilityHeaders() {
    if (!this.availabilityDates) return [ ];
    let arr =  this.availabilityDates.map((i: any, index: number) => {
      return {
        title: i,
        key: index.toString(),
        show: index > 4 ? false : true
      }
    })
    arr.unshift({ title: 'Time', key: 'time', show: true});
    return arr;
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
    return this.schedules.map((i: any) => {
      return {
        time: `${i.startTime } - ${i.endtime}`,
        practitioners: i.practitioners,
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
      }
    })
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
        time: `${i.days.join(', ')} | ${i.startTime} - ${i.endTime}`,
        date: `${new Date(i.startDate).toDateString().substring(4, 10) } - ${new Date(i.endDate).toDateString().substring(4, 10) }`
      };
    });
    return shifts;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
  }

  actorAdded(actor: any) {
    const index = this.schedules.findIndex(i => i.id === actor.scheduleId);
    this.schedules[index].practitioners.unshift(actor)
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to deactivate this shift?",
      // message: "Are you sure you want to deactivate this shift? This action cannot be undone.",
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
