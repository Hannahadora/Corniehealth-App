<template>
  <div class="w-full pb-80">
    <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
      <li class="nav-item cursor-pointer">
        <a
          class="nav-link"
          @click="select(1)"
          :class="{ active: selected === 1 }"
          :aria-selected="selected === 1"
          >Location</a
        >
      </li>
      <li class="nav-item cursor-pointer">
        <a
          class="nav-link"
          @click="select(2)"
          :class="{ active: selected === 2 }"
          :aria-selected="selected === 2"
          >Tax</a
        >
      </li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane"
        v-if="selected == 1"
        :class="{ active: selected === 1 }"
        id="medications"
      >
        <div>
          <span class="flex justify-end w-full mb-8">
            <button
              class="bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
              @click="$router.push('add-location')"
            >
              Add New
            </button>
          </span>
          <cornie-table :columns="rawHeaders" v-model="Upcoming">
            <template #actions="{ item }">
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push(`/dashboard/experience/add-task/${item.id}`)
                "
              >
                <newview-icon class="text-yellow-500 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push(`/dashboard/experience/add-task/${item.id}`)
                "
              >
                <update-icon />
                <span class="ml-3 text-xs">Update</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <timeline-icon />
                <span class="ml-3 text-xs">View Timeline</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push('/dashboard/provider/experience/add-appointment')
                "
              >
                <plus-icon class="text-green-400 fill-current" />
                <span class="ml-3 text-xs">Add Appointment</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="makeNotes(item.id)"
              >
                <note-icon class="text-yellow-600 fill-current" />
                <span class="ml-3 text-xs">Make Notes</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <message-icon class="text-green-500 fill-current" />
                <span class="ml-3 text-xs">Messages</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="deleteItem(item.id)"
              >
                <danger-icon />
                <span class="ml-3 text-xs">Cancel</span>
              </div>
            </template>
            <template #excecutionPeriod="{ item }">
              <div class="flex items-center">
                <span
                  >{{ item.excecutionPeriod.start }} -
                  {{ item.excecutionPeriod.end }}
                </span>
              </div>
            </template>
            <template #status="{ item }">
              <div class="container">
                <span
                  class="p-2 px-3 rounded-full text-black"
                  :class="{
                    'text-red-300 bg-red-50':
                      item.status === 'Cancelled' ||
                      'Stopped' ||
                      'Failed' ||
                      'Entered in Error' ||
                      'Rejected',
                    'text-green-300 bg-green-50':
                      item.status === 'Ready' ||
                      'Completed' ||
                      'Requested' ||
                      'Received' ||
                      'Accepted',
                    'text-yellow-300 bg-yellow-50':
                      item.status === 'Draft' || 'In Progress' || 'On Hold',
                  }"
                  >{{ item.status }}</span
                >
              </div>
            </template>
          </cornie-table>
        </div>
      </div>
      <div
        class="tab-pane"
        v-if="selected == 2"
        :class="{ active: selected === 2 }"
        id="diagnotics"
      >
        <div
          class="w-full flex flex-col justify-center items-center h-96"
          v-if="sortTasks.length < 0"
        >
          <img src="@/assets/img/task.svg" />
          <h3 class="text-center mt-5">
            There’s currently no active task!<br />
            Adding a task...
          </h3>
          <span class="flex justify-center w-full">
            <button
              @click="$router.push('/dashboard/provider/experience/schedules')"
              type="button"
              class="outline-primary rounded-full text-black mt-5 mr-3 py-2 pr-14 pl-14 px-3 focus:outline-none hover:bg-primary hover:text-white"
            >
              My Slots
            </button>
            <button
              class="bg-danger rounded-full text-white mt-5 py-2 px-3 pl-12 pr-12 font-semibold focus:outline-none hover:opacity-90"
              @click="$router.push('/dashboard/provider/experience/add-task')"
            >
              New Tasks
            </button>
          </span>
        </div>
        <div>
          <span class="flex justify-end w-full mb-8">
            <button
              class="bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
              @click="$router.push('/dashboard/provider/medications/add-tax')"
            >
              Add New
            </button>
          </span>
          <cornie-table :columns="rawHeaders2" v-model="sortTasks">
            <template #actions="{ item }">
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push(`/dashboard/experience/add-task/${item.id}`)
                "
              >
                <newview-icon class="text-yellow-500 fill-current" />
                <span class="ml-3 text-xs">View</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push(`/dashboard/experience/add-task/${item.id}`)
                "
              >
                <update-icon />
                <span class="ml-3 text-xs">Update</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <timeline-icon />
                <span class="ml-3 text-xs">View Timeline</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="
                  $router.push('/dashboard/provider/experience/add-appointment')
                "
              >
                <plus-icon class="text-green-400 fill-current" />
                <span class="ml-3 text-xs">Add Appointment</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="makeNotes(item.id)"
              >
                <note-icon class="text-yellow-600 fill-current" />
                <span class="ml-3 text-xs">Make Notes</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              >
                <message-icon class="text-green-500 fill-current" />
                <span class="ml-3 text-xs">Messages</span>
              </div>
              <div
                class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                @click="deleteItem(item.id)"
              >
                <danger-icon />
                <span class="ml-3 text-xs">Cancel</span>
              </div>
            </template>
            <template #excecutionPeriod="{ item }">
              <div class="flex items-center">
                <span
                  >{{ item.excecutionPeriod.start }} -
                  {{ item.excecutionPeriod.end }}
                </span>
              </div>
            </template>
            <template #status="{ item }">
              <div class="container">
                <span
                  class="p-2 px-3 rounded-full text-black"
                  :class="{
                    'text-red-300 bg-red-50':
                      item.status === 'Cancelled' ||
                      'Stopped' ||
                      'Failed' ||
                      'Entered in Error' ||
                      'Rejected',
                    'text-green-300 bg-green-50':
                      item.status === 'Ready' ||
                      'Completed' ||
                      'Requested' ||
                      'Received' ||
                      'Accepted',
                    'text-yellow-300 bg-yellow-50':
                      item.status === 'Draft' || 'In Progress' || 'On Hold',
                  }"
                  >{{ item.status }}</span
                >
              </div>
            </template>
          </cornie-table>
        </div>
      </div>
    </div>
    <notes-add :tasknotes="tasknotes" :taskId="taskId" v-model="showNotes" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
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
import ITask from "@/types/ITask";
//import NotesAdd from "./notes.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const task = namespace("task");

@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    NoteIcon,
    ThreeDotIcon,
    DangerIcon,
    PlusIcon,
    SearchIcon,
    //  NotesAdd,
    //  CloseIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class TaskExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  taskId = "";
  tasknotes = [];

  @task.State
  tasks!: ITask[];

  @task.Action
  deleteTask!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "location name", key: "location", show: true },
    {
      title: "address",
      key: "address",
      show: true,
    },
    {
      title: "country",
      key: "country",
      show: true,
    },
    {
      title: "state",
      key: "state",
      show: true,
    },
    {
      title: "hours of operation",
      key: "hours",
      show: true,
    },
  ];
  rawHeaders2 = [
    { title: "identifier", key: "keydisplay", show: true },
    {
      title: "authority",
      key: "authority",
      show: true,
    },
    {
      title: "code",
      key: "code",
      show: true,
    },
    {
      title: "tin",
      key: "tin",
      show: true,
    },
    {
      title: "locations",
      key: "locations",
      show: true,
    },
    {
      title: "TAX",
      key: "tax",
      show: true,
    },
    {
      title: "TOTAL TAX rate",
      key: "rate",
      show: true,
    },
    {
      title: "status",
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
    const tasks = this.tasks.map((task) => {
      (task as any).excecutionPeriod.start = new Date(
        (task as any).excecutionPeriod.start
      ).toLocaleDateString("en-US");
      (task as any).excecutionPeriod.end = new Date(
        (task as any).excecutionPeriod.end
      ).toLocaleDateString("en-US");
      (task as any).createdAt = new Date(
        (task as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...task,
        action: task.id,
        keydisplay: "XXXXXXX",
        location: "General  Hospital",
        address: "12, Idowu Martin  Street, Victoria Island, Lagos",
        country: "Nigeria",
        state: "Abuja",
        hours: "hours of operation",
        authority: "Federal Inland Revenue Service",
        code: "FIRS",
        tax: "VAT",
        rate: "7.5%",
        locations: "2",
      };
    });
    if (!this.query) return tasks;
    return search.searchObjectArray(tasks, this.query);
  }
  async makeNotes(id: string) {
    this.taskId = id;
    this.showNotes = true;
    this.fetchNotes();
  }
  select(i: number) {
    this.selected = i;
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this task",
      title: "Delete task",
    });
    if (!confirmed) return;

    if (await this.deleteTask(id))
      window.notify({ msg: "Task cancelled", status: "success" });
    else window.notify({ msg: "Task not cancelled", status: "error" });
  }

  get sortTasks() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  get History() {
    const history = this.items.filter(
      (c) =>
        new Date(c.endDateTime).toLocaleDateString() <
        new Date().toLocaleDateString()
    );
    return history;
  }
  get Upcoming() {
    const history = this.items.filter(
      (c) =>
        new Date(c.endDateTime).toLocaleDateString() >
        new Date().toLocaleDateString()
    );
    return history;
  }
  async fetchNotes() {
    const id = this.taskId;
    const AllNotes = cornieClient().get(`/api/v1/task/getNotesByTaskId/${id}`);
    const response = await Promise.all([AllNotes]);
    this.tasknotes = response[0].data;
  }

  async created() {
    this.History;
    this.fetchNotes();
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.status-accepted {
  background: #f3fcf8;
  color: #35ba83;
}
.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}
.status-warning {
  background: #fefaf0;
  color: #f7b538;
}
</style>
