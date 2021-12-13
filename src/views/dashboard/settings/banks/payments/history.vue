<template>
  <div class="bg-white rounded mb-56 p-5 mt-5">
    <div class="">
      <h3 class="text-primary font-bold border-b-2 border-gray-200 pb-4">
        Transaction History
      </h3>
      <div>
        <cornie-table :columns="rawHeaders" v-model="items">
          <template #actions="{ item }">
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <newview-icon class="text-yellow-500 fill-current" />
              <span class="ml-3 text-xs">View History</span>
            </div>
            <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
              <close-icon />
              <span class="ml-3 text-xs">Deactivate </span>
            </div>
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              @click="deleteItem(item.id)"
            >
              <delete-icon />
              <span class="ml-3 text-xs">Delete Account</span>
            </div>
          </template>
          <template #createdAtcustom>
            <div class="items-center block">
              <span class="text-black text-sm">September 10, 2021 </span>
              <p class="text-danger font-medium text-xs">9:00am</p>
            </div>
          </template>
        </cornie-table>
      </div>
    </div>
  </div>
  <nuban-modal v-model="showNubanModal" :displayNubanTable="true" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";
import CornieSelect from "@/components/cornieselect.vue";
import InfoIcon from "@/components/icons/info.vue";
import Select from "@/components/newautocomplete.vue";
import { Prop, Watch, PropSync } from "vue-property-decorator";
import NubanModal from "./nubanmodal.vue";
import search from "@/plugins/search";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import ITask from "@/types/ITask";

const task = namespace("task");

@Options({
  components: {
    InfoIcon,
    Select,
    CornieRadio,
    CornieCheckbox,
    CornieInput,
    CornieSelect,
    AccordionComponent,
    NubanModal,
    CloseIcon,
    CornieTable,
    CardText,
  },
})
export default class Transactionhistory extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  showNubanModal = false;
  selected = 1;
  query = "";

  @task.State
  tasks!: ITask[];

  @task.Action
  deleteTask!: (id: string) => Promise<boolean>;

  @task.Action
  fetchTasks!: () => Promise<void>;

  select(i: number) {
    this.selected = i;
  }
  showModal() {
    this.showNubanModal = true;
  }
  rawHeaders = [
    { title: "Date & Time", key: "createdAtcustom", show: true },
    {
      title: "Type",
      key: "type",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Amount",
      key: "amount",
      show: true,
    },
    {
      title: "Account Balance",
      key: "balance",
      show: true,
    },
  ];

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
        type: "Credit",
        description: "OPEX",
        status: "Success",
        amount: "N38,000,000",
        balance: "N38,000,000",
      };
    });
    if (!this.query) return tasks;
    return search.searchObjectArray(tasks, this.query);
  }
  created() {
    this.fetchTasks();
    if (this.tasks.length < 1) this.fetchTasks();
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
:focus-visible {
  outline: none;
}
::placeholder {
  color: #000;
}
.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 9px;
  border-radius: 4px;
  width: 150px;
  bottom: 100%;
  opacity: 0;
  transition: opacity 1s;
  position: absolute;
  z-index: 1;
  background-color: #080056;
}
</style>
