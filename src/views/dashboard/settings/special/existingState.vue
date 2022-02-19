<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-lg text-white mt-5 mb-5 py-3 px-5 text-sm font-semibold focus:outline-none hover:opacity-90"
        @click="showSpecialModal = true"
      >
       Add New Specialty
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showManagePractitioner = true">
          <pract-icon class="text-primary fill-current" />
          <span class="ml-3 text-xs">Manage Practitioners</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showModal(item.id)"
        >
          <location-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Manage Locations</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="remove(item.id)"
        >
          <deactivate-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
      </template>
    </cornie-table>
  </div>
  <special-modal
    v-model="showSpecialModal"
    :id="locationId"
  />
  <manage-practitioner v-model="showManagePractitioner"/>
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
import DeactivateIcon from "@/components/icons/deactivate.vue";
import PractIcon from "@/components/icons/practicon.vue";
import LocationIcon from "@/components/icons/locicon.vue";
import SpecialModal from './newspecial.vue';
import managePractitioner from './practitioner.vue';


const practitioner = namespace("practitioner");

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    SpecialModal,
    managePractitioner,
    IconInput,
    DeactivateIcon,
    PractIcon,
    ColumnFilter,
    TableOptions,
    LocationIcon,
  },
})
export default class SpecialExistingState extends Vue {
  showColumnFilter = false;
  query = "";
  showSpecialModal = false;
  showManagePractitioner = false;
  locationId = "";

  @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  deletePractitioner!: (id: string) => Promise<boolean>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  rawHeaders = [
    {
      title: "code",
      key: "identifier",
      show: true,
       noOrder: true
    },
    {
      title: "specialty",
      key: "name",
      show: true,
       noOrder: true
    },
    { title: "locations", key: "department", show: true, noOrder: true },
    {
      title: "practitioners",
      key: "activeState",
      show: true,
       noOrder: true
    },
    {
      title: "STATUS",
      key: "qualificationIssuer",
      show: true,
    },

  ];

  get items() {
    const practitioners = this.practitioners.map((practitioner) => {
      const opHours = this.stringifyOperationHours(
        practitioner.hoursOfOperation
      );
      return {
        ...practitioner,
        action: practitioner.id,
        hoursOfOperation: opHours,
        name: `${practitioner.firstName} ${practitioner.lastName}`,
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
    this.locationId = value;
  }
}
</script>
