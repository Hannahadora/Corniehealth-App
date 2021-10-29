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
      <p>ghghgh</p>
      {{items}}
      <cornie-table :columns="headers" v-model="items">
       
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
import { cornieClient } from "@/plugins/http";



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

  @Prop({ type: Array })
  items!: [];

  patient = {} as IPatient;

  patientProgressNotes: any;

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
      title: "condition",
      key: "condition",
      show: true,
    },
    {
      title: "status",
      key: "status",
      show: true,
    },
    {
      title: "primary encounter",
      key: "primaryencounter",
      show: false,
    },
    
    {
      title: "participant",
      key: "participant",
      show: false,
    },
    {
      title: "billing account",
      key: "billingaccount",
      show: false,
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
 printRecorded(progress: any) {
    const dateString = progress.createdAt;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  // get items() {
  //   const items = this.patientProgressNotes.map((progress: any) => ({
  //     ...progress,
  //     original: progress,
  //     identifier: "XXXXX",
  //     recorded: this.printRecorded(progress),
  //     condition: progress.condition.category,
  //     status: progress.clinicalStatus,
  //     // code: this.printCode(condition.code),
  //     // severity: this.printSeverity(condition.severity),
  //     // clinicalStatus: this.stripQuote(condition.clinicalStatus),
  //     // recorder: {
  //     //   name: printPractitioner(condition.practitioner!!),
  //     //   department: condition.practitioner!!.department,
  //     // },
  //   }));
  //   return items;
  // }

  async fetchProgressnotes() {
    console.log('progresssssfff1' , this.patientId);
    try {
      const { data } = await cornieClient().get(
        `/api/v1/progress-notes/${this.patientId}`
      );
      this.patientProgressNotes = data;
      console.log('progresssssfff2', data);
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching patient's progress notes",
        status: "error",
      });
    }
  }  
  async created() {
    this.fetchProgressnotes();


  }
}
</script>
