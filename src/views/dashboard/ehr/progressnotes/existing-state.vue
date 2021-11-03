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
       <!-- <template #clinicalStatus="{ item: { status: status } }">
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
        </template> -->
         <template #actions="{ item }">
          <div
            @click="viewCondition(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>


<div class="flex items-center hover:bg-gray-100 p-3  cursor-pointer" @click="showStatus(item.id, item.status, item.conditionId)">
                      <update-icon class="text-purple-800 fill-current" />
                      <span class="ml-8 text-xs">Update Status</span>
                  </div>

                  <div
            @click="updateStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status2 </span>
          </div>

          <!-- <div
            @click="updateStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div> -->
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
        <template #status="{ item }">
                <div class="flex items-center">
                  <p class="text-xs bg-gray-300 p-1 rounded" v-if="item.status == 'planned'">{{item.status}}</p>
                  <p class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded" v-if="item.status == 'arrived'">{{item.status}}</p>
                  <p class="text-xs bg-green-200 text-green-500 p-1 rounded" v-if="item.status == 'recurrence'">{{item.status}}</p>
                  <p class="text-xs bg-purple-300 text-purple-600 p-1 rounded" v-if="item.status == 'in-progress'">{{item.status}}</p>
                  <p class="text-xs bg-green-200 text-green-500 p-1 rounded" v-if="item.status == 'finished'">{{item.status}}</p>
                  <p class="text-xs bg-red-300 text-red-600 p-1 rounded" v-if="item.status == 'Cancelled'">{{item.status}}</p>
                  <!-- <p class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded" v-if="item.status == 'No show'">{{item.status}}</p> -->
                  <p class="text-xs bg-purple-300 text-purple-600 p-1 rounded" v-if="item.status == 'Entered-in-Error'">{{item.status}}</p>
                  <p class="text-xs bg-green-200 text-green-500 p-1 rounded" v-if="item.status == 'Checked-in'">{{item.status}}</p>
                  <p class="text-xs bg-blue-300 text-blue-600 p-1 rounded" v-if="item.status == 'unknown'">{{item.status}}</p>
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
     <status-modal
        :patientId='patientId'
        :conditionId='conditionId'
        :id="requestId"
        :updatedBy="updatedBy"
        :currentStatus="currentStatus"
        :dateUpdated="update"
        v-model="showStatusModal"/>
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
// import { cornieClient } from "@/plugins/http";
import StatusModal from "./status.vue";

// import { Prop, PropSync, Watch } from "vue-property-decorator";
// import { namespace } from "vuex-class";
// import { IPatient } from "@/types/IPatient";
import  IProgressnote  from "@/types/IProgressnote";

import { cornieClient } from "@/plugins/http";
import { Codeable } from "@/types/misc";
import { ICondition } from "@/types/ICondition";
import { getDropdown } from "@/plugins/definitions";
import IAppointment from "@/types/IAppointment";

import IPractitioner from "@/types/IPractitioner";

import { printPractitioner } from "@/plugins/utils";







const patients = namespace("patients");
const appointment = namespace("appointment");
const practitioner = namespace("practitioner");







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
    AddProgressNote,
    StatusModal
  },
})
export default class ExistingState extends Vue {
  // @Prop({ type: String, default: "" })
  // patientId!: string;

  // @Prop({ type: Array })
  // items!: [];

  // patient = {} as IPatient;

  // patientProgressNotes: any;

//  @patients.Action
//   findPatient!: (patientId: string) => Promise<IPatient>;

 @practitioner.Action
  getPractitionerById!: (id: string) => Promise<IPractitioner>;


  @patients.State
  patients!: IPatient[];

  @appointment.State
  patientappointments!:IAppointment[];

  @appointment.State
  appointments!:IAppointment[];

  addingProgressnote = false;
  addingCondition = false;
  addingOccurence = false;
  updatingStatus = false;
  addingNotes = false;
  recordingAbatement = false;
  viewingCondition = false;
  currentStatus="";
  requestId="";
  showStatusModal=false;
  conditionId="";

  updatedBy= "";
  update="";
  // dateUpdated: any = "";




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
      show: true,
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
//  printRecorded(progress: any) {
//     const dateString = progress.createdAt;
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   }

 @Prop({ type: String, default: "" })
  patientId!: string;

  patient = {} as IPatient;

  patientProgressNotes = [] as IProgressnote[];

  lastElement1: any = {};


  


 @patients.Action
  findPatient!: (patientId: string) => Promise<IPatient>;

  categories: Codeable[] = [];

 isEmpty= false;

  printRecorded(progress: any) {
    const dateString = progress.createdAt;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

   printCondition(condition : ICondition) {
    const cat = condition.category?.replaceAll('"', "");
    return this.categories.find((s) => (s.code = cat))?.display;
  }

 

  // printPractitioner(condition.practitioner!!)

  printStatus(condition : ICondition) {
    const cat = condition.clinicalStatus?.replaceAll('"', "");
    return cat;
  }

  // printPracName

   getPatientName(id: string) {
            const pt = this.patients.find((i: any) => i.id === id);
            return pt ? `${pt.firstname} ${pt.lastname}` : '';
    }

    get getLastAppointment(){
        this.lastElement1 = this.patientProgressNotes.slice(-1);
        // console.log(this.lastElement1);
        const last =  new Date(this.lastElement1[0].updatedAt).toLocaleDateString("en-US");
        return last;
    }

// get currentStatus(){
//   return this.items?.status;
// }
async showStatus(value:string, value2:string, value3:string){
  // return console.log("vcvcvc", this.getLastAppointment);
    this.showStatusModal = true;
    this.requestId = value;
    this.currentStatus = value2;
    this.conditionId = value3;
    this.updatedBy = this.getPatientName(this.patientId);
    this.update = this.getLastAppointment

    //   const dateString = progress.createdAt;
    // const date = new Date(dateString);
    // return date.toLocaleDateString();
  }
 printPractitioner(condition: ICondition) {
    return condition.practitioner?.firstName
  }
  get items() {
    const items = this.patientProgressNotes?.map((progress: any) => ({
      // (progress as any).createdAt = new Date(
      //   (progress as any).createdAt 
      //  ).toDateString();
      //   (progress as any).updatedAt = new Date(
      //     (request as any).updatedAt 
      //  ).toDateString();
      // this.updatedBy = this.getPatientName(this.patientId as string);
      // this.currentStatus = request.status;
      // this.update= progress.updatedAt
      ...progress,
      original: progress,
      identifier: "XXXXX",
      recorded: this.printRecorded(progress),
      condition: this.printCondition(progress.condition),
      status: this.printStatus(progress.condition),
      participant: this.printPractitioner(progress.condition)
      // participant: this.printPracName(progress.practitionerId)
      // currentStatus: this.printStatus(progress.condition),
      // status:history.basicInfo.status
      // code: this.printCode(condition.code),
      // severity: this.printSeverity(condition.severity),
      // clinicalStatus: this.stripQuote(condition.clinicalStatus),
      // recorder: {
      //   name: printPractitioner(condition.practitioner!!),
      //   department: condition.practitioner!!.department,
      // },
    }));
    return items;
  }


  async fetchProgressnotes() {
    console.log('progresssssfff1' , this.patientId);
    try {
      const { data } = await cornieClient().get(
        `/api/v1/progress-notes/${this.patientId}`
      );
      this.patientProgressNotes = data;
      console.log('progresssssfff2', this.patientProgressNotes );
    } catch (error) {
      window.notify({
        msg: "There was an error when fetching patient's progress notes",
        status: "error",
      });
    }
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

  // async fetchProgressnotes() {
  //   console.log('progresssssfff1' , this.patientId);
  //   try {
  //     const { data } = await cornieClient().get(
  //       `/api/v1/progress-notes/${this.patientId}`
  //     );
  //     this.patientProgressNotes = data;
  //     console.log('progresssssfff2', data);
  //   } catch (error) {
  //     window.notify({
  //       msg: "There was an error when fetching patient's progress notes",
  //       status: "error",
  //     });
  //   }
  // }  


   async created() {
     await this.fetchProgressnotes();
    console.log('zzz',  this.patientProgressNotes);
    this.categories = await getDropdown(
      "http://hl7.org/fhir/ValueSet/condition-category"
    );
    await this.getPractitionerById("D4249dec-F3ab-444f-867d-5710e3c6891a");
  }

  // async created() {
  //   this.fetchProgressnotes();


  // }
}
</script>
