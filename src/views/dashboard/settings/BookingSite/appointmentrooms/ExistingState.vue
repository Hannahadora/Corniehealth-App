<template>
  <div class="w-full pb-7">
    <div class="flex justify-end">
      <cornie-btn
        class="bg-danger py-2 text-white m-5"
        @click="editingFunction = true"
      >
        <plus-icon class="mr-2 fill-current text-white" />
        Add New
      </cornie-btn>
    </div>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="editAppointmentRoom(item.id)"
        >
          <edit-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="remove(item.id)"
        >
          <delete-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs">Delete</span>
        </div>
      </template>
    </cornie-table>
    <div class="flex justify-between m-3">
      <div class="flex justify-around">
        <p class="text-sm">show</p>
        <input type="number" class="w-12 mr-2 ml-2 outline-none border border-blue-lighter rounded-r">
        <p class="text-sm">per page</p>
      </div>
      <div class="flex justify-around">
        <p class="text-xs mr-3 mt-1">1-3 of 10 items</p>
        <div class="text-xs mr-3 mt-1" style="fontsize:6px;">
                  <arrow-left-icon />
                  </div>

        <!-- <delete-icon class="text-danger fill-current text-xs mr-2" /> -->
        <p class="text-sm mr-3 text-xs">1  2  3 ...  10 </p>
        <div class="text-xs mt-1" style="fontsize:5px;">
         <arrow-right-icon />
        </div>
        <!-- <delete-icon class="text-danger fill-current" /> -->
      </div>
    </div>
    <add-function v-model="editingFunction" :edit="roomToEdit" />
  </div>
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
import { namespace } from "vuex-class";
import TableOptions from "@/components/table-options.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";
import IFunction from "@/types/IFunction";
import { Prop } from "vue-property-decorator";
import AddFunction from "./add-function.vue";

import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import ArrowLeftIcon from "../components/arrowleft.vue";
import ArrowRightIcon from "../components/arrow-right.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";
import ILocation, { HoursOfOperation } from "@/types/ILocation";





const orgFunctions = namespace("OrgFunctions");
const patients = namespace("patients");
const location = namespace("location");
const AppointmentRoom = namespace("AppointmentRoom");




@Options({
  components: {
    CornieTable,
    SortIcon,
    AddFunction,
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

    ArrowLeftIcon,
    ArrowRightIcon
  },
})
export default class CarePartnersExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  functions!: IFunction[];

  @Prop({ type: Array, default: [], required: true })
  appointmentrooms!: IAppointmentRoom[];

  // functionToEdit = {} as IFunction;
  // editingFunction = false;

  roomToEdit = {} as IAppointmentRoom;
  editingFunction = false;

  @orgFunctions.Action
  removeFunction!: (id: string) => Promise<void>;

  @AppointmentRoom.Action
  deleteAppointmentroom!: (id: string) => Promise<void>;  

  @location.State
  locations!: ILocation[];

  @location.Action
  fetchLocations!: () => Promise<void>;


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
      key: "Location",
      show: true,
    },
    {
      title: "CUSTODIAN",
      key: "supervisor",
      show: true,
    },
    {
      title: "STATUS",
      key: "Status",
      show: true,
    },
  ];

  getLocationAddress(id: string) {
            const pt = this.locations.find((i: any) => i.id === id);
            return pt;
    }

    etLocationAddress(id: string) {
            const pt = "-----";
            return pt;
    }

    // getLocationAddress(id: string) {
    //         const pt = this.locations.find((i: any) => i.id === id);
    //         return pt ? pt.address : 'N/A';
    // }

  get items2() {
    return this.functions.map((f) => ({
      ...f,
      hierarchy: f.hierarchy || "N/A",
      supervisor: f.reportsTo?.name || "N/A",
    }));
  }


  get items() {
    return this.appointmentrooms.map((f) => ({
      ...f,
      roomName: f.roomName || "N/A",
      roomNumber: f.roomNumber || "N/A",
      // Location: f.locationId || "N/A",
      location: this.getLocationAddress(f.locationId)?.address || "N/A",
      Status: f.status || "N/A",
    }));
  }

  // async remove(id: string) {
  //   await this.removeFunction(id);
  // }

  async remove(id: string) {
    await this.deleteAppointmentroom(id);
  }

  // editFunction(id: string) {
  //   const func = this.functions.find((f) => f.id == id);
  //   if (!func) return;
  //   this.functionToEdit = func;
  //   this.editingFunction = true;
  // }

  editAppointmentRoom(id: string) {
    const func = this.appointmentrooms.find((f: any) => f.id == id);
    if (!func) return;
    this.roomToEdit = func;
    this.editingFunction = true;
  }
  

  created() {
    console.log('states', this.locations);
    if (!this.locations?.length) this.fetchLocations();
  }
}
</script>
