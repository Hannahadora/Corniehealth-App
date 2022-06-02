<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          @click="addingCondition = true"
          class="bg-danger rounded-lg text-white mt-5 py-2  px-6 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          New Condition
        </button>
      </span>
      <cornie-table :columns="headers" v-model="sortConditions">
        <template #code="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.code.display }}
            </span>
            <!-- <span class="text-xs text-gray-400">
              {{ item.code.code }}
            </span> -->
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
            class=" text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template>
         <template #status="{ item: { verificationStatus: status } }">
          <span
            :class="{
              'bg-success text-success': status == 'confirmed',
              ' bg-danger text-danger': status == 'cancelled',
              ' bg-warning text-warning': status == 'unconfirmed',
              ' bg-yellow-500 text-yellow-500': status == 'differential',
              ' bg-blue-yonder text-blue-yonder': status == 'refuted',
              ' bg-blue-800 text-blue-800': status == 'provisional',
              ' bg-purple-800 text-purple-800': status == 'entered-in-error',
            }"
            class="text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template>
        <template #actions="{ item }">
        <div
            @click="editCondition(item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <Edit-icon class="text-blue-800 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
          <div
            @click="viewCondition(item, item.id)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            @click="updateStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-yellow-400 fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" 
          @click="assetAction(item.id, item.asserterId)"

          >
            <check-icon class="text-green-400 fill-current" />
            <span class="ml-3 text-xs">Assert</span>
          </div>
          <div @click="recordAbatement(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-purple-700 fill-current" />
            <span class="ml-3 text-xs"> Record Abatement </span>
          </div>
           <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <cancel-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs">Cancel</span>
          </div>
          <!-- <div
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
          </div> -->
        </template>
      </cornie-table>
    </div>
    <add-condition :id="conditionId" :condition="currentCondition" @conditionAdded="conditionAdded" v-model="addingCondition" />
    <add-occurence :condition="currentCondition" v-model="addingOccurence" />
    <status-update :condition="currentCondition" @conditionAdded="conditionAdded" v-model="updatingStatus" />
    <add-notes :condition="currentCondition" v-model="addingNotes" />
    <record-abatement
      :condition="currentCondition"
      v-model="recordingAbatement"
      @conditionAdded="conditionAdded"
    />
    <view-condition :condition="currentCondition" :id="conditionId" v-model="viewingCondition" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { categories, codes, severities } from "./drop-downs";
import { Codeable } from "@/types/misc";
import { printPractitioner } from "@/plugins/utils";
import { mapDisplay } from "@/plugins/definitions";
import { cornieClient } from "@/plugins/http";

import { ICondition } from "@/types/ICondition";


import CornieTable from "@/components/cornie-table/CornieTable.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewViewIcon from "@/components/icons/newview.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import HistoryIcon from "@/components/icons/history.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CheckIcon from "@/components/icons/checkdynamic.vue";
import CancelIcon from "@/components/icons/cancel.vue";

import AddCondition from "./add-condition.vue";
import AddOccurence from "./add-occurence.vue";
import StatusUpdate from "./status-update.vue";
import AddNotes from "./add-notes.vue";
import RecordAbatement from "./record-abatement.vue";
import ViewCondition from "./components/viewModal.vue";


const condition = namespace("condition");

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
    CheckIcon,
    CancelIcon
  },
})
export default class ExistingState extends Vue {
  typeMapper = (code: string) => "";

  addingCondition = false;
  addingOccurence = false;
  updatingStatus = false;
  addingNotes = false;
  recordingAbatement = false;
  viewingCondition = false;
  currentCondition!: ICondition;
  current!: ICondition;

  conditionId = "";

  @condition.Action
  fetchPatientConditions!: (patientId: string) => Promise<void>;

  
  @condition.State
  conditions!: ICondition[];

  @condition.Action
  deleteCondition!: (id: string) => Promise<boolean>;


  get patientId() {
    return this.$route.params.id as string;
  }

  get patientConditions() {
    return this.conditions || [];
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

  viewCondition(condition: MutantCondition, value:string) {
    this.currentCondition = condition.original;
    this.viewingCondition = true;
    this.conditionId = value;
  }
  editCondition(value:string){
    this.addingCondition = true;
    this.conditionId = value;
  }

   async createMapper() {
    this.typeMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-stage-type"
    );
  }


  headers = [
    {
      title: "identifier",
      key: "identifier",
      show: true,
      noOrder: true,
    },
    {
      title: "Date Recorded",
      key: "recorded",
      show: true,
    },
      {
        title: "Code",
        key: "code",
        show: true,
      },
    {
      title: "stage",
      key: "type",
      show: true,
    },
    {
      title: "severity",
      key: "severity",
      show: true,
    },
    {
      title: "Clinical Status",
      key: "clinicalStatus",
      show: true,
    },
        {
      title: "verification status",
      key: "status",
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

  printType(type: string){
    return this._categories.find((cat) => cat.code == type)?.display || "";
  }

  printAssesment(value: any){
    return value.map((c:any) => c.reference)
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
      type: this.typeMapper(condition.type),
      recorder: {
        name: printPractitioner(condition.practitioner!!),
        department: condition.practitioner!!.department,
      },
      reference: this.printAssesment(condition.assessment)
    }));
    return items;
  }
  get sortConditions() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  stripQuote(val: string) {
    return val.replaceAll('"', "");
  }
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to cancel this condition",
      title: "Cancel condition",
    });
    if (!confirmed) return;

    if (await this.deleteCondition(id))
      window.notify({ msg: "Condition cancelled", status: "success" });
    else window.notify({ msg: "Condition not cancelled", status: "error" });
  }

   async assetAction(id: string, assertId: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to assert this condtion",
      title: "Assert condition",
    });
    if (!confirmed) return;
     try {
      const { data } = await cornieClient().patch(
        `/api/v1/condition/${id}/assert`,
        {asserterId: assertId}
      );
      this.conditionAdded();
      window.notify({ status: "success", msg: "Condition Asserted" });
    } catch (error) {
      window.notify({ status: "error", msg: "Condition not Asserted" });
    }
  }

  async conditionAdded(){
    await  this.fetchPatientConditions(this.patientId);
  }

  async created() {
     await this.createMapper();
      await this.fetchPatientConditions(this.patientId);
    if (Object.keys(this.conditions).length < 1)
    this._categories = await categories();
  }
}
</script>
