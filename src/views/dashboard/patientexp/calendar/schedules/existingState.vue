<template>
  <div class="w-full pb-7">
    <span class="flex justify-end float-right w-86">
        <date-picker class="w-full mt-3 mr-4"/>
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-2.5 px-8 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showScheduleModal = true"
      >
        Create
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false" :menu="false">
      <template #actions>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <eye-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <settings-icon class="text-purple-800 fill-current" />
          <span class="ml-3 text-xs">Manage</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <plus-icon class="text-green-400 fill-current" />
          <span class="ml-3 text-xs">Add Actor</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <share-icon class="text-blue-800 fill-current" />
          <span class="ml-3 text-xs">Share</span>
        </div>
         <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <cancel-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div> 
      </template>
      <template #Schedule>
          <p class="text-sm">Night_Gynaecology
          </p>
            <span class="text-xs text-gray-400"> xxxxxxxx</span> 
      </template>
       <template #actors>
         <actors-section :items="practitioners"/>
      </template>
       <template #status>
         <span class="text-green-600 bg-green-50 rounded-full py-2 px-6 text-xs">Active</span>
      </template>
    </cornie-table>
  </div>
  <schedule-modal
    v-model="showScheduleModal"
  />
  <invitation-modal  v-model="showInviteModal"/>
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

const practitioner = namespace("practitioner");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    CancelIcon,
    SettingsIcon,
    SearchIcon,
    DatePicker,
    ScheduleModal,
    ActorsSection,
    PrintIcon,
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
export default class SchedulesExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showLocationModal = false;
  showInviteModal = false;
  locationId = "";
  showScheduleModal= false;

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  deletePractitioner!: (id: string) => Promise<boolean>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  rawHeaders = [
    {
      title: "Schedule id",
      key: "Schedule",
      show: true,
      noOrder: true
    },
    {
      title: "Name",
      key: "name",
      show: true,
       noOrder: true
    },
    { title: "start date/time", key: "start", show: true,  noOrder: true },
    { title: "end date/time", key: "end", show: true,  noOrder: true },
    {
      title: "DAYS included",
      key: "days",
      show: true,
      noOrder: true
    },
    {
      title: "ACTORS",
      key: "actors",
      show: true,
      noOrder: true
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  get items() {
    const practitioners = this.practitioners.map((practitioner) => {
      return {
        ...practitioner,
        action: practitioner.id,
        name: `${practitioner.firstName} ${practitioner.lastName}`,
        Schedule: "",
        start: "15 days",
        days: "Mon, Tue, Wed, Thur",
        end:"09:00-14:00"
      };
    });
    if (!this.query) return practitioners;
    return search.searchObjectArray(practitioners, this.query);
  }

  stringifyOperationHours(opHours: HoursOfOperation[]) {
    const [opHour, ...rest] = opHours;
    if (!opHour) return "All Day";
    return `${opHour.openTime} - ${opHour.closeTime}`;
  }

  async remove(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this practitioner",
    });
    if (!confirmed) return;
    if (await this.deletePractitioner(id))
      window.notify({ msg: "Practitioner deleted", status: "success" });
    else window.notify({ msg: "Practitioner not deleted", status: "error" });
  }
  async updateLocation() {
    await this.fetchPractitioners();
  }

  showModal(value: string) {
    this.showLocationModal = true;
    this.locationId = value;
  }
}
</script>
