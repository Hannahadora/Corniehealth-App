<template>
  <div class="w-full my-2 h-full overflow-y-auto">
      <div class="container-fluid bg-white p-4 sm:p-2 h-full">
        <div class="w-full border-b-2 curved flex py-2">
            <div class="container-fluid flex font-semibold text-xl py-2">
                <h2>Schedules (Shifts | Availability | Slots)</h2>
            </div>
        </div>

<!-- 
        <div class="w-full border-b-4 curved flex my-6">
            <div class="container-fluid flex font-semibold text-xl">
                <a class="px-4 py-2 active-tab " :class="{ 'active-color text-dark': activeTab === 0, 'text-gray-500': activeTab !== 0 }">Schedule</a>
                <a class="px-4 py-2 active-tab " :class="{ 'active-color': activeTab === 1, 'text-gray-500': activeTab !== 1 }">Slot</a>
            </div>
        </div> -->

        <Modal1 :visible="false">
            <h1>Hello</h1>
        </Modal1>

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

        <side-modal :visible="showEditPane" :header="'Edit Slot'" @closesidemodal="closeEditPane">
          <EditSchedule />
        </side-modal>

        <side-modal :visible="showActorsPane" @closesidemodal="() => showActorsPane = false">
          <AllActors :schedule="selectedSchedule" />
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

        <div class="w-full curved flex py-2 justify-end my-6">
            <div class=".w-full flex font-semibold text-xl py-2 justify-end pb-4">
                <Button :loading="false">
                    <router-link :to="{ name: 'Patient Experience Management' }" style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        New Schedule
                    </router-link>
                </Button>
            </div>
        </div>
          <div class="w-full pb-7">
            <div class="flex w-full justify-between mt-5 items-center">
            <span class="flex items-center">
                <sort-icon class="mr-5" />
                <icon-input
                class="border border-gray-600 rounded-full focus:outline-none"
                type="search"
                v-model="query"
                >
                <template v-slot:prepend>
                    <search-icon />
                </template>
                </icon-input>
            </span>
            <span class="flex justify-between items-center">
                <print-icon class="mr-7" />
                <table-refresh-icon class="mr-7" />
                <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
            </span>
            </div>
            <!-- <Table :headers="headers" :items="items" class="tableu rounded-xl mt-5 primary-bg">
            <template v-slot:item="{ item }">
                <span v-if="getKeyValue(item).key == 'action'">
                <table-options>
                    <li
                    @click="
                        $router.push({ name: 'Patient Experience Management', params: { scheduleId: getKeyValue(item).value} })
                    "
                    class="
                        list-none
                        items-center
                        flex
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                        my-1
                        py-3
                    "
                    >
                    <eye-icon class="mr-3 mt-1" />
                    View
                    </li>
                    <li
                    @click="
                        viewSchedule(getKeyValue(item).value)
                    "
                    class="
                        list-none
                        items-center
                        flex
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                        my-1
                        py-3
                    "
                    >
                    <eye-icon class="mr-3 mt-1" />
                    View Actors
                    </li>
                    <li
                    @click="
                        $router.push({ name: 'New Shift' })
                    "
                    class="
                        list-none
                        items-center
                        flex
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                        my-1
                        py-3
                    "
                    >
                    <edit-icon class="mr-3 mt-1" />
                    Create Schedule
                    </li>
                    <li
                    @click="
                        $router.push({ name: 'Patient Experience Management', params: { scheduleId: getKeyValue(item).value } })
                    "
                    class="
                        list-none
                        items-center
                        flex
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                        my-1
                        py-3
                    "
                    >
                    <edit-icon class="mr-3 mt-1" />
                    Edit Schedule
                    </li>
                    <li
                    @click="
                        () => showEditPane = true
                    "
                    class="
                        list-none
                        items-center
                        flex
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                        my-1
                        py-3
                    "
                    >
                    <edit-icon class="mr-3 mt-1" />
                    Edit Slot
                    </li>
                    <li
                    v-if="isActive(getKeyValue(item).value)"
                    @click="deactivate(getKeyValue(item).value)"
                    class="
                        list-none
                        flex
                        my-1
                        py-3
                        items-center
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                    "
                    >
                    <delete-icon class="mr-3" /> Deactivate
                    </li>
                    <li
                    v-if="!isActive(getKeyValue(item).value)"
                    @click="activate(getKeyValue(item).value)"
                    class="
                        list-none
                        flex
                        my-1
                        py-3
                        items-center
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                    "
                    >
                    <delete-icon class="mr-3" /> Activate
                    </li>
                    <li
                    @click="destory(getKeyValue(item).value)"
                    class="
                        list-none
                        flex
                        my-1
                        py-3
                        items-center
                        text-xs
                        font-semibold
                        text-gray-700
                        hover:bg-gray-100
                        hover:text-gray-900
                        cursor-pointer
                    "
                    >
                    <delete-icon class="mr-3" /> Delete
                    </li>
                </table-options>
                </span>
                <span v-else> {{ getKeyValue(item).value }} </span>
            </template>
            </Table> -->
            
            <cornie-table :columns="rawHeaders" v-model="items">
              <template #actions="{ item }">
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" style="width:200px">
                  <eye-icon class="mr-3 mt-1" />
                  <span class="ml-3 text-xs" @click="
                        $router.push({ name: 'Patient Experience Management', params: { scheduleId: item.id} })">View</span>
                </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                  <edit-icon class="mr-3 mt-1" />
                  <span class="ml-3 text-xs" @click="
                        $router.push({ name: 'Patient Experience Management' })
                    ">Create Schedule</span>
                                      
                </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                  <delete-icon />
                  <span class="ml-3 text-xs" @click="$router.push({ name: 'Patient Experience Management', params: { scheduleId: item.id} })">Edit Schedule</span>
                </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                  <delete-icon />
                  <span class="ml-3 text-xs"
                    v-if="isActive(item.id)"
                    @click="activate(item.id)"
                  >Acivate</span>
                </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                  <delete-icon />
                  <span class="ml-3 text-xs"
                    v-if="isActive(item.id)"
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
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Table from "@scelloo/cloudenly-ui/src/components/table";
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

const shifts = namespace("shifts");
const schedulesStore = namespace("schedules");

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
    Table,
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

  selectedSchedule: any = { };

  @shifts.State
  shifts!: any[];

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
      title: "Name",
      value: "name",
      show: true,
    },
    { title: "No. of Days", value: "numberOfDays", show: true },
    { title: "Time Zone", value: "timeZone", show: true },
    {
      title: "TIming",
      value: "timing",
      show: true,
    },
    {
      title: "Status",
      value: "status",
      show: false,
    },
    // {
    //   title: "Members",
    //   value: "practitioners",
    //   show: true,
    // },
    // {
    //   title: "Access Role",
    //   value: "accessRole",
    //   show: false,
    // },
    // {
    //   title: "Gender",
    //   value: "gender",
    //   show: false,
    // },
    {
      title: "Description",
      value: "description",
      show: false,
    },
    // {
    //   title: "Physical Type",
    //   value: "physicalType",
    //   show: false,
    // },
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
    // if (this.shifts.length === 0 ) return this.shifs;
    const shifts = this.schedules.map((i: any) => {
      return {
        ...i,
        action: i.id,
        practitioners: i.practitioners.length,
        numberOfDays: i.days.length,
        status: i.status,
        schedule: i.scheduleType,
        timing: `${i.startTime} - ${i.endTime}`
      };
    });
    return shifts;
    // if (!this.query) return shifts;
    // return search.searchObjectArray(shifts, this.query);
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
</style>
