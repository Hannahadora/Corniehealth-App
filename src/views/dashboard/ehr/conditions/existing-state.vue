<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          @click="addingCondition = true"
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
        <template #code="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.code.display }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.code.code }}
            </span>
          </div>
        </template>
        <template #recorder="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.recorder.name }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.recorder.department }}
            </span>
          </div>
        </template>
        <template #clinicalStatus="{ item: { clinicalStatus: status } }">
          <span
            :class="{
              'bg-success text-success': status == 'active',
              ' bg-danger text-danger': status == 'inactive',
              ' bg-warning text-warning': status == 'recurrence',
              ' bg-blue-yonder text-blue-yonder': status == 'relapse',
              ' bg-blue-800 text-blue-800': status == 'remission',
              ' bg-gray-800 text-gray-800': status == 'resolved',
            }"
            class="block text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template>
        <template #actions="{ item }">
          <div
            @click="viewingCondition = true"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            @click="updateStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
          <div
            @click="recordAbatement(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-purple-800 fill-current" />
            <span class="ml-3 text-xs"> Record Abatement </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Add Note </span>
          </div>
          <div
            @click="addOccurence(item)"
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
    <add-condition :condition="currentCondition" v-model="addingCondition" />
    <add-occurence :condition="currentCondition" v-model="addingOccurence" />
    <status-update :condition="currentCondition" v-model="updatingStatus" />
    <add-notes :condition="currentCondition" v-model="addingNotes" />
    <record-abatement
      :condition="currentCondition"
      v-model="recordingAbatement"
    />
    <view-condition :condition="currentCondition" v-model="viewingCondition" />
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
import StatusUpdate from "./status-update.vue";
import AddNotes from "./add-notes.vue";
import RecordAbatement from "./record-abatement.vue";
import ViewCondition from "./view-condition.vue";
import { namespace } from "vuex-class";
import { ICondition } from "@/types/ICondition";

const condition = namespace("condition");

import { categories, codes, severities } from "./drop-downs";
import { Codeable } from "@/types/misc";
import { printPractitioner } from "@/plugins/utils";

function copy(data: any) {
  return JSON.parse(JSON.stringify(data));
}

interface MutantCondition extends ICondition {
  original: ICondition;
}
@Options({
  name: "ConditionExistingState",
  components: {
    CornieTable,
    AddNotes,
    ViewCondition,
    RecordAbatement,
    AddCondition,
    StatusUpdate,
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
  updatingStatus = false;
  addingNotes = false;
  recordingAbatement = false;
  viewingCondition = false;
  currentCondition!: ICondition;
  current!: ICondition;

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  @condition.State
  conditions!: { [state: string]: ICondition[] };

  get patientId() {
    return this.$route.params.id as string;
  }

  get patientConditions() {
    return this.conditions[this.patientId] || [];
  }

  updateStatus(condition: MutantCondition) {
    this.currentCondition = copy(condition.original);
    this.updatingStatus = true;
  }

  recordAbatement(condition: MutantCondition) {
    this.currentCondition = copy(condition.original);
    this.recordingAbatement = true;
  }

  addNote(condition: MutantCondition) {
    this.currentCondition = condition.original;
    this.addingNotes = true;
  }

  addOccurence(condition: MutantCondition) {
    this.currentCondition = condition.original;
    this.addingOccurence = true;
  }

  headers = [
    {
      title: "identifier",
      key: "identifier",
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
      title: "Code",
      key: "code",
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
      title: "Clinical Status",
      key: "clinicalStatus",
      show: true,
    },
  ];

  _categories = [] as Codeable[];
  printCategory(category: string) {
    return this._categories.find((cat) => cat.code == category)?.display || "";
  }

  printCode(code: string) {
    return codes.find((c) => c.code == code);
  }

  printRecorded(condition: any) {
    const dateString = condition.createdAt;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  printSeverity(severity: string) {
    return severities.find((s) => s.code == severity)?.display || "";
  }

  get items() {
    const items = this.patientConditions.map((condition) => ({
      ...condition,
      original: condition,
      identifier: "XXXXX",
      recorded: this.printRecorded(condition),
      category: this.printCategory(condition.category),
      code: this.printCode(condition.code),
      severity: this.printSeverity(condition.severity),
      clinicalStatus: this.stripQuote(condition.clinicalStatus),
      recorder: {
        name: printPractitioner(condition.practitioner!!),
        department: condition.practitioner!!.department,
      },
    }));
    return items;
  }

  stripQuote(val: string) {
    return val.replaceAll('"', "");
  }

  async created() {
    if (Object.keys(this.conditions).length < 1)
      this.fetchPatientConditions(this.patientId);
    this._categories = await categories();
  }
}
</script>
