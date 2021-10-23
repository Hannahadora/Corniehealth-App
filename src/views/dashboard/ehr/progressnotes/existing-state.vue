<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          @click="addingProgressnote = true"
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
          New Progress Note
        </button>
      </span>
      <cornie-table :columns="headers" v-model="items">
        <template #actions>
          <div
            @click="viewingCondition = true"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            @click="updatingStatus = true"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
          <div
            @click="recordingAbatement = true"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-purple-800 fill-current" />
            <span class="ml-3 text-xs"> Record Abatement </span>
          </div>
          <div
            @click="addingNotes = true"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
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
    <add-progress-note v-model="addingProgressnote" :patient='patient' :patientId='patientId' />
    <add-occurence v-model="addingOccurence" />
    <status-update v-model="updatingStatus" />
    <add-notes v-model="addingNotes" />
    <record-abatement v-model="recordingAbatement" />
    <view-condition v-model="viewingCondition" />
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


import CornieTextArea from "@/components/textarea.vue";
import AddProgressNote from "./add-progressnote.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IPatient } from "@/types/IPatient";


const patients = namespace("patients");




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

    CornieTextArea,
    AddProgressNote
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: String, default: "" })
  patientId!: string;

  patient = {} as IPatient;

 @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  addingProgressnote = false;
  addingCondition = false;
  addingOccurence = false;
  updatingStatus = false;
  addingNotes = false;
  recordingAbatement = false;
  viewingCondition = false;

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
      title: "primary encounter",
      key: "primaryencounter",
      show: true,
    },
    {
      title: "condition",
      key: "condition",
      show: true,
    },
    {
      title: "participant",
      key: "participant",
      show: true,
    },
    {
      title: "billing account",
      key: "billingaccount",
      show: true,
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
  ];

  // items = [
  //   {
  //     identifier: "XXXXX",
  //     recorded: "XXXX",
  //     primaryencounter: "XXXX",
  //     condition: "XXXX",
  //     participant: "XXXX",
  //     billingaccount: "XXXX",
  //     status: "XXXX",
  //     id: "XXXX",
  //   },
  // ];
}
</script>
