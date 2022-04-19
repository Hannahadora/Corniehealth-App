<template>
  <div class="w-full">
    <span class="flex justify-end w-full">
      <button
        class="bg-danger rounded-lg text-sm text-white mt-5 py-2  px-5 focus:outline-none hover:opacity-90"
        @click="showCareTeam = true"
         >
        Create a Care Team
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`add-careteam/${item.id}`)"
        >
          <edit-icon class="mr-3 text-primary fill-current" />
          <span class="ml-3 text-xs">Edit & View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="handleUpdateStatus(item.id)"
        >
          <update-status-icon class="mr-3" />
          <span class="ml-3 text-xs">Update Status</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <span class="mr-3 text-2xl bold text-green-400">+</span>
          <span class="ml-3 text-xs">Add Member </span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deactivateCareteam(item.id)"
        >
          <deactivate-icon class="mr-3" />
          <span class="ml-3 text-xs">Deactivate</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <delete-red class="text-danger fill-current mr-3" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>

    <column-filter
      :columns="rawHeaders"
      v-model:preferred="preferredHeaders"
      v-model:visible="showColumnFilter"
    />

    <update-status
      v-if="showUpdateStatusDiag"
      :show="showUpdateStatusDiag"
      :teamStatus="teamStatus"
      @close-status-diag="showUpdateStatusDiag = false"
      @update-status="updateStatus"
    />
  </div>
  <careteam-modal v-model="showCareTeam"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import ICareteam from "@/types/ICareteam";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/cancel.vue";
import EditIcon from "@/components/icons/edit.vue";
import UpdateStatusIcon from "@/components/icons/update-status.vue";
import DeleteRed from "@/components/icons/delete-red.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";

import UpdateStatus from "./status.vue";
import CareteamModal from "./teamDialog.vue";

const careteam = namespace("careteam");

@Options({
  components: {
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    CornieTable,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EditIcon,
    EyeIcon,
    CloseIcon,
    CancelIcon,
    CareteamModal,
    UpdateStatusIcon,
    UpdateStatus,
    DeleteRed,
    DeactivateIcon,
  },
})
export default class CareteamExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  showCareTeam = false;
  query = "";

  @careteam.State
  careteams!: ICareteam[];

  @careteam.Action
  deleteCareteam!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identfier", key: "identifier", show: true, noOrder: true },
    {
      title: "Name",
      key: "name",
      show: true,
      noOrder: true,
    },
    {
      title: "ON Behalf Of",
      key: "onBehalfOf",
      show: true,
      noOrder: true,
    },
    {
      title: "Category Type",
      key: "category",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
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
    let careteams = this.careteams.map((careteam) => {
      let participants = careteam.participants[0];
      return {
        ...careteam,
        onBehalfOf: participants?.onBehalfOf || "",
        action: careteam.id,
      };
    });
    if (!this.query) return careteams;
    return search.searchObjectArray(careteams, this.query);
  }

  teamToUpdate = "" as String;
  showUpdateStatusDiag = false;
  teamStatus = "" as String;

  async handleUpdateStatus(id: string) {
    this.teamToUpdate = id;
    this.showUpdateStatusDiag = true;
    let team = this.careteams.find((item: any) => item.id === id);

    this.teamStatus = team?.status || "";
  }

  async updateStatus(status: string) {
    if (!this.teamToUpdate) return;

    let team = this.careteams.find(
      (item: any) => item.id === this.teamToUpdate
    );

    if (team) {
      team.status = status;

      try {
        const response = await cornieClient().post(
          `/api/v1/care-teams/deactivate/${this.teamToUpdate}`,
          team
        );
        if (response.success) {
          window.notify({ msg: "Care team status updated", status: "success" });
          this.teamToUpdate = "";
          this.showUpdateStatusDiag = false;
        }
      } catch (err) {
        window.notify({ msg: "Care team status not updated", status: "error" });
      }
    }
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message:
        "Are you sure you want to delete this care team? This action cannot be undone.",
      title: "Delete Care Team",
    });
    if (!confirmed) return;

    if (await this.deleteCareteam(id))
      window.notify({ msg: "Care team deleted", status: "success" });
    else window.notify({ msg: "Care team not deleted", status: "error" });
  }

  async deactivateCareteam(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to deactivate this care team",
      title: "Deactivate Care Team",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().post(
          `/api/v1/care-teams/deactivate/${id}`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Care team deactivated", status: "success" });
        }
      } catch (error) {
        window.notify({ msg: "Care team not deactivated", status: "error" });
      }
    }
  }
  async activateCareteam(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to activate this care team",
      title: "Activate Care Team",
    });
    if (!confirmed) {
      return;
    } else {
      try {
        const response = await cornieClient().post(
          `/api/v1/care-teams/activate/${id}`,
          {}
        );
        if (response.success) {
          window.notify({ msg: "Care team activated", status: "success" });
        }
      } catch (error) {
        window.notify({ msg: "Care team not activated", status: "error" });
        console.error(error);
      }
    }
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
