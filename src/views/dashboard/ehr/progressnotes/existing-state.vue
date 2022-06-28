<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <div
          @click="newProgressNote"
          class="bg-danger p-2 rounded-xl text-white font-bold px-8 py-3 mx-2 cursor-pointer"
        >
          Add Progress Note
        </div>
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
        <!-- <template #physician="{ item }">
          <div>{{ getP(item.physician).then((d) => d.firstName) }}</div>
        </template> -->
        <template #actions="{ item }">
          <div
            @click="viewCondition(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>

          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showStatus(item.id, item.status, item.conditionId)"
          >
            <update-icon class="text-purple-800 fill-current" />
            <span class="ml-8 text-xs">Update Status</span>
          </div>

          <div
            @click="updateStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <!-- <update-icon class="text-danger fill-current" />
            <span class="ml-3 text-xs"> Update Status2 </span> -->
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
            <p
              class="text-xs bg-gray-300 p-1 rounded"
              v-if="item.status == 'planned'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
              v-if="item.status == 'arrived'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-200 text-green-500 p-1 rounded"
              v-if="item.status == 'recurrence'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'in-progress'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-200 text-green-500 p-1 rounded"
              v-if="item.status == 'finished'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-red-300 text-red-600 p-1 rounded"
              v-if="item.status == 'Cancelled'"
            >
              {{ item.status }}
            </p>
            <!-- <p class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded" v-if="item.status == 'No show'">{{item.status}}</p> -->
            <p
              class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
              v-if="item.status == 'Entered-in-Error'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-green-200 text-green-500 p-1 rounded"
              v-if="item.status == 'Checked-in'"
            >
              {{ item.status }}
            </p>
            <p
              class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
              v-if="item.status == 'unknown'"
            >
              {{ item.status }}
            </p>
          </div>
        </template>
      </cornie-table>
    </div>
    <add-progress-note
      v-model="addingProgressnote"
      :patient="patient"
      :patientId="patientId"
    />
    <add-occurence v-model="addingOccurence" />
    <status-update v-model="updatingStatus" />
    <add-notes v-model="addingNotes" />
    <record-abatement v-model="recordingAbatement" />
    <view-condition v-model="viewingCondition" />
    <status-modal
      :patientId="patientId"
      :conditionId="conditionId"
      :id="requestId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      v-model="showStatusModal"
    />
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import HistoryIcon from "@/components/icons/history.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import NewViewIcon from "@/components/icons/newview.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import CornieTextArea from "@/components/textarea.vue";
  import { getDropdown } from "@/plugins/definitions";
  import { cornieClient } from "@/plugins/http";
  import IAppointment from "@/types/IAppointment";
  import { ICondition } from "@/types/ICondition";
  import { IPatient } from "@/types/IPatient";
  import IPractitioner from "@/types/IPractitioner";
  import { Codeable } from "@/types/misc";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import AddCondition from "./add-condition.vue";
  import AddNotes from "./add-notes.vue";
  import AddOccurence from "./add-occurence.vue";
  import AddProgressNote from "./add-progressnote.vue";
  import RecordAbatement from "./record-abatement.vue";
  import StatusUpdate from "./status-update.vue";
  // import { cornieClient } from "@/plugins/http";
  import StatusModal from "./status.vue";
  import ViewCondition from "./view-condition.vue";

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
      StatusModal,
    },
    emits: ["progress_note"],
  })
  export default class ExistingState extends Vue {
    @practitioner.Action
    getPractitionerById!: (id: string) => IPractitioner;

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    @patients.State
    patients!: IPatient[];

    @appointment.State
    patientappointments!: IAppointment[];

    @appointment.State
    appointments!: IAppointment[];

    addingProgressnote = false;
    addingCondition = false;
    addingOccurence = false;
    updatingStatus = false;
    addingNotes = false;
    recordingAbatement = false;
    viewingCondition = false;
    currentStatus = "";
    requestId = "";
    showStatusModal = false;
    conditionId = "";

    updatedBy = "";
    update = "";
    items: any = [];
    // dateUpdated: any = "";

    headers = [
      {
        title: "Progress note id",
        key: "identifier",
        show: true,
        noOrder: true,
      },
      {
        title: "recorded",
        key: "recordDate",
        show: true,
      },
      // {
      //   title: "condition",
      //   key: "condition",
      //   show: true,
      // },
      // {
      //   title: "Further diagnosis",
      //   key: "primaryencounter",
      //   show: true,
      // },

      {
        title: "Attending Physician",
        key: "physician",
        show: true,
      },
      {
        title: "billing status",
        key: "billing",
        show: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
      },
    ];

    newProgressNote() {
      console.log("jhere");
      this.$emit("progress_note");
    }

    @Prop({ type: String, default: "" })
    patientId!: string;

    patient = {} as IPatient;

    patientProgressNotes = [] as any[];

    lastElement1: any = {};

    @patients.Action
    findPatient!: (patientId: string) => Promise<IPatient>;

    categories: Codeable[] = [];

    isEmpty = false;

    printRecorded(progress: any) {
      const dateString = progress.createdAt;
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }

    printCondition(condition: ICondition) {
      const cat = condition.category?.replaceAll('"', "");
      return this.categories.find((s) => (s.code = cat))?.display;
    }

    // printPractitioner(condition.practitioner!!)

    printStatus(condition: ICondition) {
      const cat = condition.clinicalStatus?.replaceAll('"', "");
      return cat;
    }

    // printPracName

    getPatientName(id: string) {
      const pt = this.patients.find((i: any) => i.id === id);
      return pt ? `${pt.firstname} ${pt.lastname}` : "";
    }

    get getLastAppointment() {
      this.lastElement1 = this.patientProgressNotes.slice(-1);
      // ;
      const last = new Date(this.lastElement1[0].updatedAt).toLocaleDateString(
        "en-US"
      );
      return last;
    }

    // get currentStatus(){
    //   return this.items?.status;
    // }
    async showStatus(value: string, value2: string, value3: string) {
      // return ;
      this.showStatusModal = true;
      this.requestId = value;
      this.currentStatus = value2;
      this.conditionId = value3;
      this.updatedBy = this.getPatientName(this.patientId);
      this.update = this.getLastAppointment;
    }
    printPractitioner(condition: ICondition) {
      return condition.practitioner?.firstName;
    }

    async getP(p: any) {
      return await this.getPractitionerById(p);
    }
    async fetchProgressnotes() {
      try {
        const { data } = await cornieClient().get(
          `/api/v1/progress-notes/${this.patientId}`
        );
        this.patientProgressNotes = data;
        console.log("progress", this.patientProgressNotes);
      } catch (error) {
        window.notify({
          msg: "There was an error when fetching patient's progress notes",
          status: "error",
        });
      }
    }

    async created() {
      await this.fetchProgressnotes();
      await this.fetchPractitioners();
      this.categories = await getDropdown(
        "http://hl7.org/fhir/ValueSet/condition-category"
      );
      // await this.getPractitionerById("D4249dec-F3ab-444f-867d-5710e3c6891a");
      this.patientProgressNotes?.map(async (p) => {
        let g = {
          identifier: p.identifier,
          recordDate: this.printRecorded(p),
          physician:
            (await (
              await this.getPractitionerById(p.practitionerId)
            ).firstName) +
            " " +
            (await (
              await this.getPractitionerById(p.practitionerId)
            ).lastName),
          billing: p.billing || "---",
          status: p.status || "---",
        };
        this.items.push(g);
        // return g;
      });
      console.log("item", this.items);
    }

    // async created() {
    //   this.fetchProgressnotes();

    // }
  }
</script>
