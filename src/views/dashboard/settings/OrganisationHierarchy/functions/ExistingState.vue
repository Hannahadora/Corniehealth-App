<template>
  <div class="w-full pb-7">
    <span class="flex justify-end w-full mb-5">
      <cornie-btn class="bg-danger py-2 text-white m-5">
        <plus-icon class="mr-2 fill-current text-white" />
        New Function
      </cornie-btn>
      <cornie-btn class="text-primary border py-1 border-primary m-5">
        View Org. Structure
      </cornie-btn>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items" :check="false">
    </cornie-table>
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
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/eye.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import PlusIcon from "@/components/icons/add.vue";

@Options({
  components: {
    CornieTable,
    SortIcon,
    ThreeDotIcon,
    SearchIcon,
    PrintIcon,
    CornieBtn,
    TableRefreshIcon,
    FilterIcon,
    PlusIcon,
    IconInput,
    DeleteIcon,
    EyeIcon,
    ColumnFilter,
    TableOptions,
  },
})
export default class CarePartnersExistingState extends Vue {
  rawHeaders = [
    {
      title: "Function Name",
      value: "functionName",
      show: true,
    },
    {
      title: "Hierarchy",
      value: "hierarchy",
      show: true,
    },
    {
      title: "Supervisory Function",
      value: "supervisoryFunction",
      show: true,
    },
  ];

  items = [];
}
</script>
