<template>
  <div class="w-full pb-7">
    <span class="flex justify-end float-right w-86">
      <date-picker class="w-full mt-3 mr-4" />
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-2.5 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showScheduleModal = true"
      >
        Create
      </button>
    </span>
    <cornie-table
      :columns="rawHeaders"
      v-model="sortSchedules"
      :check="false"
      :menu="false"
    >
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showAvailableModal(item.id)"
        >
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showAvailableModal(item.id)"
        >
          <settings-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Manage</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showActorModal(item.id)"
        >
          <plus-icon class="text-green-400 fill-current" />
          <span class="ml-3 text-xs">Add Actor</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <share-icon class="text-blue-800 fill-current" />
          <span class="ml-3 text-xs">Share</span>
        </div>
        <div
          v-if="item.status == 'active'"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deactivate(item.id)"
        >
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
        <div
          v-else
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="activate(item.id)"
        >
          <approve-icon class="text-green-500 fill-current" />
          <span class="ml-3 text-xs">Activate</span>
        </div>
      </template>

      <template #actors="{ item }">
        <actors-section :items="item.practitioners" />
      </template>
      <template #status="{ item }">
        <span
          v-if="item.status == 'active'"
          class="text-green-600 bg-green-50 rounded-full py-2 px-6 text-xs"
          >Active</span
        >
        <span
          v-if="item.status == 'confirmed'"
          class="text-green-600 bg-green-50 rounded-full py-2 px-6 text-xs"
          >Confirmed</span
        >
        <span
          v-if="item.status == 'checked-in'"
          class="text-green-600 bg-green-50 rounded-full py-2 px-6 text-xs"
          >Checked-in</span
        >
        <span
          v-if="item.status == 'fullfilled'"
          class="text-green-600 bg-green-50 rounded-full py-2 px-6 text-xs"
          >Fullfilled</span
        >
        <span
          v-if="item.status == 'declined'"
          class="text-red-600 bg-red-50 rounded-full py-2 px-6 text-xs"
          >Declined</span
        >
        <span
          v-if="item.status == 'inactive'"
          class="text-red-600 bg-red-50 rounded-full py-2 px-6 text-xs"
          >Inactive</span
        >
        <span
          v-if="item.status == 'cancelled'"
          class="text-red-600 bg-red-50 rounded-full py-2 px-6 text-xs"
          >Cancelled</span
        >
        <span
          v-if="item.status == 'needs-action'"
          class="text-yellow-600 bg-yellow-50 rounded-full py-2 px-6 text-xs"
          >Needs-Action</span
        >
        <span
          v-if="item.status == 'tentative'"
          class="text-blue-600 bg-blue-50 rounded-full py-2 px-6 text-xs"
          >Tentative</span
        >
        <span
          v-if="item.status == 'no Show'"
          class="text-gray-600 bg-gray-50 rounded-full py-2 px-6 text-xs"
          >No Show</span
        >
      </template>
    </cornie-table>
    <pagination :items="items" :itemsPerPage="20" :pagedItems="items" />
  </div>

  <schedule-modal
    :id="scheduleId"
    v-model="showScheduleModal"
    @schedule-added="scheduleadded"
  />
  <actor-modal
    v-model="showActor"
    @schedule-added="scheduleadded"
    :id="scheduleId"
    :practitionerId="practitionerId"
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
import ScheduleModal from "../availability/addScheduleModal.vue";
import ActorModal from "../availability/actors.vue";
import ISchedule, { Break, Repeat } from "@/types/ISchedule";
import ApproveIcon from "@/components/icons/approval.vue";

import Pagination from "@/components/paginator.vue";

const practitioner = namespace("practitioner");
const schedulesStore = namespace("schedules");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    CancelIcon,
    SettingsIcon,
    SearchIcon,
    DatePicker,
    ActorModal,
    ScheduleModal,
    ActorsSection,
    ApproveIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    EyeIcon,
    ColumnFilter,
    TableOptions,
    ShareIcon,
    PlusIcon,
    Pagination,
  },
})
export default class SchedulesExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showLocationModal = false;
  showInviteModal = false;
  scheduleId = "";
  showScheduleModal = false;
  showActor = false;

  @schedulesStore.State
  schedules!: ISchedule[];

  @schedulesStore.Action
  getSchedules!: () => Promise<void>;

  @schedulesStore.Action
  deleteSchedule!: (id: string) => Promise<boolean>;

  @schedulesStore.Action
  deactivateSchedule!: (id: string) => Promise<boolean>;

  @schedulesStore.Action
  activateSchedule!: (id: string) => Promise<boolean>;

  // @practitioner.State
  // practitioners!: IPractitioner[];

  // @practitioner.Action
  // deletePractitioner!: (id: string) => Promise<boolean>;

  // @practitioner.Action
  // fetchPractitioners!: () => Promise<void>;

  rawHeaders = [
    {
      title: "Schedule id",
      key: "identifier",
      show: true,
      noOrder: true,
    },
    {
      title: "Name",
      key: "name",
      show: true,
      noOrder: true,
    },
    { title: "start date/time", key: "start", show: true, noOrder: true },
    { title: "end date/time", key: "end", show: true, noOrder: true },
    {
      title: "DAYS included",
      key: "days",
      show: true,
      noOrder: true,
    },
    {
      title: "ACTORS",
      key: "actors",
      show: true,
      noOrder: true,
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const schedules = this.schedules.map((schedule) => {
      return {
        ...schedule,
        action: schedule.id,
        name: `${schedule.name}`,
        schedule: schedule.id,
        start: schedule.startTime,
        days: schedule?.repeat?.days.join(" , "),
        end: schedule.endTime,
      };
    });
    if (!this.query) return schedules;
    return search.searchObjectArray(schedules, this.query);
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this Schedule",
    });
    if (!confirmed) return;
    if (await this.deleteSchedule(id))
      window.notify({ msg: "Schedule deleted", status: "success" });
    else window.notify({ msg: "Schedule not deleted", status: "error" });
  }
  async updateSchedules() {
    await this.getSchedules();
  }
  async deactivate(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to deactivate this schedule",
    });
    if (!confirmed) return;
    if (await this.deactivateSchedule(id))
      window.notify({ msg: "Schedule deactivated", status: "success" });
    else window.notify({ msg: "Schedule not deactivate", status: "error" });
  }

  async activate(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to activate this schedule",
    });
    if (!confirmed) return;
    if (await this.deleteSchedule(id))
      window.notify({ msg: "Schedule activate", status: "success" });
    else window.notify({ msg: "Schedule not activates", status: "error" });
  }

  showAvailableModal(value: string) {
    this.showScheduleModal = true;
    this.scheduleId = value;
  }

  showActorModal(value: string) {
    this.showActor = true;
    this.scheduleId = value;
  }
  get sortSchedules() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async scheduleadded() {
    await this.getSchedules();
  }
  async created() {
    await this.getSchedules();
  }
}
</script>
