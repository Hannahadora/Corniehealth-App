<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          @click="addCondition = true"
          class="
            bg-danger
            rounded-full
            text-white
            mt-5
            py-2
            pr-12
            pl-12
            px-3
            mb-5
            font-semibold
            focus:outline-none
            hover:opacity-90
          "
        >
          New Condition
        </button>
      </span>
      <cornie-table :columns="headers" v-model="items">
        <template #actions>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <edit-icon class="text-purple-800 fill-current" />
            <span class="ml-3 text-xs"> Record Abatement </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Add Note </span>
          </div>
          <div
            @click="addingOccurence = true"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Add Occurence </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <history-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> View History </span>
          </div>
        </template>
      </cornie-table>
    </div>
    <add-condition v-model="addingCondition" />
    <add-occurence v-model="addingOccurence" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import HistoryIcon from "@/components/icons/history.vue";
import AddCondition from "./add-condition.vue";
import PlusIcon from "@/components/icons/plus.vue";
import AddOccurence from "./add-occurence.vue";

@Options({
  name: "ConditionExistingState",
  components: {
    CornieTable,
    AddCondition,
    AddOccurence,
    EditIcon,
    NewViewIcon,
    UpdateIcon,
    PlusIcon,
    HistoryIcon,
  },
})
export default class ExistingState extends Vue {
  addingCondition = false;
  addingOccurence = false;
  headers = [
    {
      title: "identifier",
      key: "id",
      show: true,
      noOrder: true,
    },
    {
      title: "recorded",
      key: "recorded",
      show: true,
    },
    {
      title: "category",
      key: "category",
      show: true,
    },
    {
      title: "severity",
      key: "severity",
      show: true,
    },
    {
      title: "recorder",
      key: "recorder",
      show: true,
    },
    {
      title: "asserter",
      key: "asserter",
      show: true,
    },
    {
      title: "Clinical Status",
      key: "clinicalStatus",
      show: true,
    },
  ];

  items = [
    {
      clinicalStatus: "XXXXX",
      asserter: "XXXX",
      recorder: "XXXX",
      severity: "XXXX",
      category: "XXXX",
      recorded: "XXXX",
      id: "XXXX",
    },
  ];
}
</script>
