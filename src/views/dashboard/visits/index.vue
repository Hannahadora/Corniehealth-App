<template>
  <div class="w-full my-2 h-screen">
      <div class="container-fluid bg-white sm:p-6 h-full">
        <div class="w-full border-b-2 curved flex py-2 mt-4">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Active Visits</h2>
            </div>
        </div>


        <div class="w-full">
             <div class="w-full curved flex py-2 justify-end my-6">
                <div class=".w-full flex font-semibold text-xl py-2 justify-end pb-4">
                    <Button :loading="false">
                        <router-link :to="{ name: 'Patient Experience Management' }" style="background: #FE4D3C" class="text-base bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-semibold py-3 px-8 rounded-full">
                            Go To Appointments 
                        </router-link>
                    </Button>
                </div>
            </div>

            <div class="w-full">
                <TimeLine />
            </div>

            <div class="w-full pb-7 mb-8">
                <cornie-table :columns="headers" v-model="items">
                
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
                
                <column-filter
                :columns="rawHeaders"
                v-model:preferred="preferredHeaders"
                v-model:visible="showColumnFilter"
                />
                <side-modal :visible="false" :header="'Check-Out'" @closesidemodal="() => showActorsPane = false">
                    <CheckOut />
                </side-modal>

                <side-modal :visible="false" :header="'Check-In'" @closesidemodal="closeEditPane">
                <!-- <side-modal :visible="showEditPane" :header="'Edit Slot'" @closesidemodal="closeEditPane"> -->
                    <CheckIn  />
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

            <div style="height: 50px">

            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import EmptyState from './empty-state.vue'

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

import SideModal from '../schedules/components/side-modal.vue';
import CheckIn from './components/checkin.vue'
import CheckOut from './components/checkout.vue'
// import ViewDetails from './components/view-details.vue'
// import ViewPlan from './components/view-planning.vue'
// import ViewBreaks from './components/view-breaks.vue'
// import AllActors from './components/all-actors.vue'
// import AdvancedFilter from './components/advanced-filter.vue'
import CornieTable from "@/components/cornie-table/CornieTable.vue";
// import Actors from './components/actors.vue'
// import AddActors from './components/add-actor.vue'
import IPractitioner from "@/types/IPractitioner";
import TimeLine from './components/timeline-table.vue'

const shifts = namespace("shifts");
const schedulesStore = namespace("schedules");
const contacts = namespace('practitioner');

@Options({
  components: {
    // Table,
    // AddActors,
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
    // ViewDetails,
    // ViewPlan,
    // ViewBreaks,
    // AdvancedFilter,
    CornieTable,
    AddIcon,
    DeactivateIcon,
    EmptyState,
    CheckOut,
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
      title: "Identifier",
      key: "name",
      show: true,
    },
    {
      title: "Patient",
      key: "description",
      show: true,
    },
    {
      title: "Appointment Type",
      key: "specialty",
      show: true,
    },
    { title: "Slot", key: "days", show: true },
    {
      title: "Practitioner",
      key: "timing",
      show: true,
    },
    {
      title: "Participant Status",
      key: "practitioners",
      show: true,
    },
    {
      title: "Location",
      key: "status",
      show: true,
    },
    
  ];

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
        timing: `${i.startTime} - ${i.endTime}`
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
