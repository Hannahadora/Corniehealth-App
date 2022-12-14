<template>
  <div class="w-full pb-7">
    <span class="flex justify-end float-right w-86">
        <date-picker class="w-full mt-3 mr-4"/>
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-2.5 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showSlotsModal = true"
      >
        Create
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false" :menu="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showEventModal(item.id)">
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showEventModal(item.id)">
          <settings-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Manage</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="remove(item.id)">
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Cancel</span>
        </div> 
      </template>
       <template #actors>
         <actors-section :items="participatingPractitioners"/>
      </template>
       <template #status>
         <span class="text-green-600 bg-green-50 rounded-full py-2 px-6 text-xs">Active</span>
      </template>
    </cornie-table>
  </div>
  <slots-modal
    v-model="showSlotsModal"
    :id="slotId"
    @event-added="eventadded"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import search from "@/plugins/search";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import EyeIcon from "@/components/icons/newview.vue";
import ShareIcon from "@/components/icons/share.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import DatePicker from "@/components/daterangecalendar.vue";
import ActorsSection from "@/views/dashboard/schedules/components/actors.vue";
import SlotsModal from "../blockedslots/addBlockSlots.vue";

import {Slot} from '@/types/ISchedule';

const schedulesStore = namespace("schedules");
const user = namespace("user");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    CancelIcon,
    SettingsIcon,
    SearchIcon,
    DatePicker,
    ActorsSection,
    PrintIcon,
    SlotsModal,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    ShareIcon,
    PlusIcon,
  },
})
export default class SlotsExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showLocationModal = false;
  showInviteModal = false;
  locationId = "";
  showSlotsModal = false;
  slotId = "";

  // @practitioner.State
  // practitioners!: IPractitioner[];

   @schedulesStore.Action
   deleteSlot!: (id: string) => Promise<boolean>;

  // @practitioner.Action
  // fetchPractitioners!: () => Promise<void>;

   
  @schedulesStore.State
  slots!: Slot[];

  @schedulesStore.Action
  singlePractitonerSlot!: (locationId: string) => Promise<void>;

   @user.State
   currentLocation!: string;

  rawHeaders = [
    {
      title: "identifier",
      key: "id",
      show: true,
      noOrder: true
    },
    {
      title: "name",
      key: "name",
      show: true,
       noOrder: true
    },
    {
      title: "description",
      key: "description",
      show: true,
       noOrder: true
    },
    { title: "date", key: "date", show: true,  noOrder: true },
    { title: "time", key: "startTime", show: true,  noOrder: true },
    //  { title: "Booking cutoff", key: "booking", show: true,  noOrder: true },
    // {
    //     title: "participants",
    //   key: "actors",
    //   show: true,
    //   noOrder: true
    // },
    {
      title: "status",
      key: "private",
      show: true,
    },
  ];


  get items() {
    const slots = this.slots.map((slot) => {
      return {
        ...slot,
        action: slot.id,

      };
    });
    if (!this.query) return slots;
    return search.searchObjectArray(slots, this.query);
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this event",
    });
    if (!confirmed) return;
    if (await this.deleteSlot(id))
      window.notify({ msg: "Event deleted", status: "success" });
    else window.notify({ msg: "Event not deleted", status: "error" });
  }
  async updateLocation() {
    if (this.currentLocation) await this.singlePractitonerSlot(this.currentLocation);
  }

  showEventModal(value:string){
    this.showSlotsModal = true;
    this.slotId = value;
  }

  showModal(value: string) {
    this.showLocationModal = true;
    this.locationId = value;
  }
  async eventadded(){
    if (this.currentLocation) await this.singlePractitonerSlot(this.currentLocation);
  }
  async created(){
    if (this.currentLocation) await this.singlePractitonerSlot(this.currentLocation);
  }
}
</script>
