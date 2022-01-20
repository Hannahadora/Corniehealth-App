<template>
  <div class="container">
    <div class="w-full">
      <div class="container-fluid">
        <cornie-table
          :columns="headers"
          v-model="items"
          @filter="showFilterPane"
        >
          <template #actions="{}">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              style="width: 200px"
            >
              <add-icon class="mr-3 mt-1" />
              <span class="ml-3 text-xs" @click="goToCreateSlot()"
                >Create slot</span
              >
            </div>
          </template>
        </cornie-table>
      </div>

      <side-modal
        :visible="showFilter"
        @closesidemodal="() => (showFilter = false)"
      >
        <advanced-filter @applyfilter="applyFilter" />
      </side-modal>
    </div>
  </div>
</template>

<script lang="ts">
import utilservice from "../helper/util";
import dateHelper from "../helper/date-helper";
import AddIcon from "@/components/icons/add.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import slotService from "../../visits/helper/slot-service";
import AdvancedFilter from "./advanced-filter.vue";
import SideModal from "../components/side-modal.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import ISchedule from "@/types/ISchedule";

const practitionersStore = namespace("practitioner");
const schedulesStore = namespace("schedules");

@Options({
  components: {
    AddIcon,
    CornieTable,
    SideModal,
    AdvancedFilter,
    CornieSelect,
    SelectedPractitioner,
    SelectedLocation,
  },
})
export default class Availability extends Vue {
  @schedulesStore.Action
  schedules!: ISchedule[];

  @schedulesStore.State
  getSchedules!: () => Promise<void>;

  rawHeaders = [
    {
      title: "Identifier",
      key: "id",
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
    { title: "Time", key: "time", show: true },

    {
      title: "Booking CutOff",
      key: "bookingCutOff",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  async created() {
    if (!this.schedules) await this.getSchedules();
  }
}
</script>

<style scoped>
.book-bg {
  background-color: #fff0f1 !important;
}

.selected {
  background-color: lightgreen !important;
}
</style>
