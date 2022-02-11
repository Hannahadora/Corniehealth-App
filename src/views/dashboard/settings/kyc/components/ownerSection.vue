<template>
  <div class="w-full">
   <accordion-component
            :title="'Beneficial Owners'"
            :opened="true"
            @add="showDirector = true"
            :height="480"
            :add="true"
            :showAddExisting="true"
          >
          <cornie-table :columns="rawHeaders" v-model="items" :listmenu="true" :check="false">
            <template #actions="{ item }">
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                <update-icon />
                <span class="ml-3 text-xs">Edit</span>
              </div>
              <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                <danger-icon />
                <span class="ml-3 text-xs">Delete</span>
              </div>
            </template>
          </cornie-table>
   </accordion-component>
    <notes-add :tasknotes="tasknotes" :taskId="taskId" v-model="showNotes" />
    <director-modal v-model="showDirector" @director-data="directorData"/>
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
import AccordionComponent from "@/components/form-accordion.vue";
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

import DirectorModal from "./directorModal.vue";

const task = namespace("task");

@Options({
  components: {
    Table,
    CancelIcon,
    AccordionComponent,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    NoteIcon,
    ThreeDotIcon,
    DangerIcon,
    DirectorModal,
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

export default class DirectorState extends Vue {
 @Prop({ type: Array, default: [] })
  owners!: [];

  @task.State
  tasks!: ITask[];

  @task.Action
  deleteTask!: (id: string) => Promise<boolean>;

  query = "";
  showDirector = false;
  particularOfDirectors = [] as any;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    {
      title: "Name",
      key: "name",
      show: true,
      noOrder: true
    },
    {
      title: "ownership equity (%)",
      key: "equity",
      show: true,
      noOrder: true
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
    const directors = this.owners?.map((director: any) => {
      return {
        ...director,
        action: director?.id,
        name: director?.fullName,
        date: Date.now()

      };
    });
   return directors; 
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

//   get sortTasks() {
//     return this.items.slice().sort(function (a, b) {
//       return a.createdAt < b.createdAt ? 1 : -1;
//     });
//   }

  directorData(value:any){
    this.particularOfDirectors = value;
  }

  async created() {
  
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
