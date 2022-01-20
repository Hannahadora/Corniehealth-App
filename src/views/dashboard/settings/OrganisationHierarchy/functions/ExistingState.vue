<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-5 mt-5">
      <cornie-btn
        class="bg-danger text-white text-sm font-semibold px-0 py-1 rounded-full mr-3"
        @click="editingFunction = true"
      >
        <plus-icon class="mr-2 fill-current text-white" />
        New Function
      </cornie-btn>
      <cornie-btn class="text-primary border-2 text-sm font-semibold py-1 border-primary px-0 rounded-full">
        View Org. Structure
      </cornie-btn>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="editFunction(item.id)"
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
    <add-function v-model="editingFunction" :edit="functionToEdit" />
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

const orgFunctions = namespace("OrgFunctions");

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
  },
})
export default class CarePartnersExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  functions!: IFunction[];

  functionToEdit = {} as IFunction;
  editingFunction = false;

  @orgFunctions.Action
  removeFunction!: (id: string) => Promise<void>;

  rawHeaders = [
    {
      title: "Function Name",
      key: "name",
      show: true,
    },
    {
      title: "Hierarchy",
      key: "hierarchy",
      show: true,
    },
    {
      title: "Supervisory Function",
      key: "supervisor",
      show: true,
    },
  ];

  get items() {
    return this.functions.map((f) => ({
      ...f,
      hierarchy: f.hierarchy || "N/A",
      supervisor: f.reportsTo?.name || "N/A",
    }));
  }

  async remove(id: string) {
    await this.removeFunction(id);
  }

  editFunction(id: string) {
    const func = this.functions.find((f) => f.id == id);
    if (!func) return;
    this.functionToEdit = func;
    this.editingFunction = true;
  }
}
</script>
