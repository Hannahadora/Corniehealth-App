<template>
 <div>
        <div class="w-full h-2/3 mt-12 flex flex-col justify-center items-center" v-if="empty">
                <img src="@/assets/rafiki.svg" class="mb-2" />
                  <h4 class="text-black text-center">There are no rooms on record.</h4>
                  <cornie-btn
                  class="bg-danger py-1 px-5 rounded-full text-white m-5"
                  @click="editingFunction = true"
                >
                  Add New
                </cornie-btn>
            </div>
    <div class="w-full pb-7" v-else>
    
      <span class="flex justify-end">
        <cornie-btn
          class="bg-danger py-1 px-5 rounded-full text-white m-5"
          @click="editingFunction = true"
        >
          Add New
        </cornie-btn>
      </span>
      <cornie-table :columns="rawHeaders" v-model="items">
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
    </div>
 </div>
      <add-function v-model="editingFunction" :edit="roomToEdit" />
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
import search from "@/plugins/search";
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import ArrowLeftIcon from "../components/arrowleft.vue";
import ArrowRightIcon from "../components/arrow-right.vue";
import IAppointmentRoom from "@/types/IAppointmentRoom";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import ITask from "@/types/ITask";
import { first, getTableKeyValue } from "@/plugins/utils";



const orgFunctions = namespace("OrgFunctions");
const patients = namespace("patients");
const location = namespace("location");
const AppointmentRoom = namespace("AppointmentRoom");
const task = namespace("task");



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
    ArrowRightIcon,
  },
})
export default class apponitmentRooms extends Vue {
  query = "";

  @Prop({ type: Array, default: [], required: true })
  functions!: IFunction[];

  @Prop({ type: Array, default: [], required: true })
  appointmentrooms!: IAppointmentRoom[];

  // functionToEdit = {} as IFunction;
  // editingFunction = false;
  @task.State
  tasks!: ITask[];

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
      key: "location",
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
  get empty() {
    return  this.tasks.length < 1;
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  
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
    const tasks = this.tasks.map((task) => {
         (task as any).createdAt= new Date(
         (task as any).createdAt
       ).toLocaleDateString("en-US");
        return {
        ...task,
         action: task.id,
         keydisplay: "XXXXXXX",
             roomName:  "-----",
      roomNumber:  "-----",
      location: "-----",
      supervisor:"-----",
      status:  "Active",
        };
    });
    if (!this.query) return tasks;
    return search.searchObjectArray(tasks, this.query);
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
    //console.log('states', this.locations);
   // if (!this.locations?.length) this.fetchLocations();
  }
}
</script>
