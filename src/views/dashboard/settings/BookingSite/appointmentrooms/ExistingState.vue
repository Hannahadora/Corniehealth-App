<template>
  <div>
    <div
      class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
      v-if="empty"
    >
      <img src="@/assets/rafiki.svg" class="mb-2" />
      <h4 class="text-black text-center">There are no rooms on record.</h4>
      <cornie-btn
        class="bg-danger px- rounded-lg text-white m-5"
        @click="showRoom = true"
      >
        Add New
      </cornie-btn>
    </div>
    <div class="w-full pb-7" v-else>
      <span class="flex justify-end">
        <cornie-btn
          class="bg-danger px-4 rounded-lf text-white m-5"
          @click="showRoom = true"
        >
          Add New
        </cornie-btn>
      </span>
      <cornie-table :columns="rawHeaders" v-model="items"  :showPagination="true"
        @pagechanged="fetchAppointmentrooms"
        :pageInfo="pageInfo">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAppointmentRoom(item.id)"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Update</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <delete-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Delete</span>
          </div>
           <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
       
          >
            <deactivate-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
          </div>
        </template>
      </cornie-table>
      
    </div>
  </div>
  <room-dialog v-model="showRoom" :id="roomId" @room-added="roomAdded" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { first, getTableKeyValue } from "@/plugins/utils";


import IPageInfo from "@/types/IPageInfo";
import IAppointmentRoom from "@/types/IAppointmentRoom";

import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";
import search from "@/plugins/search";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";

import ArrowLeftIcon from "../components/arrowleft.vue";
import RoomDialog from "./appoitmentRoomDialog.vue";
import ArrowRightIcon from "../components/arrow-right.vue";



const location = namespace("location");
const appointmentRoom = namespace("appointmentRoom");

@Options({
  components: {
    CornieTable,
    SortIcon,
    RoomDialog,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    CornieBtn,
    TableRefreshIcon,
    FilterIcon,
    PlusIcon,
    IconInput,
    DeleteIcon,
    EditIcon,
    ColumnFilter,
    TableOptions,
    DeactivateIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    UpdateIcon,
  },
})
export default class apponitmentRooms extends Vue {
  query = "";
  roomId = "";
  showRoom = false;
  practitioner = [] as any;
  location = [] as any;
  updatedBy = "";
  currentStatus = "";
  showStatusModal = false;

  @appointmentRoom.State
  appointmentrooms!: IAppointmentRoom[];

  @appointmentRoom.Action
  deleteAppointmentroom!: (id: string) => Promise<boolean>;

  @appointmentRoom.Action
  fetchAppointmentrooms!: () => Promise<void>;

  @appointmentRoom.State
  pageInfo!: IPageInfo;

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;

  showAppointmentRoom(value: string) {
    this.showRoom = true;
    this.roomId = value;
  }

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "ROOM NAME",
      key: "roomName",
      show: true,
    },
    {
      title: "ROOM NUMBER",
      key: "roomNumber",
      show: true,
    },
    {
      title: "LOCATION",
      key: "locationName",
      show: true,
    },
    {
      title: "CUSTODIAN",
      key: "custodianName",
      show: true,
    },
    {
      title: "STATUS",
      key: "status",
      show: true,
    },
  ];
  get empty() {
    return this.appointmentrooms.length < 1;
  }
  roomAdded() {
    this.fetchAppointmentrooms();
  }
  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const appointmentrooms = this.appointmentrooms.map((appointmentroom) => {
      (appointmentroom as any).createdAt = new Date(
        (appointmentroom as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...appointmentroom,
        action: appointmentroom.id,
      };
    });
    if (!this.query) return appointmentrooms;
    return search.searchObjectArray(appointmentrooms, this.query);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this appointment room",
      title: "Delete request",
    });
    if (!confirmed) return;

    if (await this.deleteAppointmentroom(id))
      window.notify({ msg: "Appoinment room not deleted", status: "error" });
    else window.notify({ msg: "Appoinment room deleted", status: "success" });
  }

  async fetchLocation() {
    const AllLocation = cornieClient().get(
      "/api/v1/location/myOrg/getMyOrgLocations"
    );
    const response = await Promise.all([AllLocation]);
    this.location = response[0].data;
  }

  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  async created() {
    await this.fetchAppointmentrooms();
    await this.fetchLocation();
    await this.fetchPractitioner();
    if (this.appointmentrooms.length < 1) this.fetchAppointmentrooms();
  }
}
</script>
