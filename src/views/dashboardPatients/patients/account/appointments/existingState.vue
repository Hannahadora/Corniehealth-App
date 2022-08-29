<template>
  <div class="w-full pb-80">
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-lg text-white mt-5 py-3 px-6 pl-7 pr-7 font-semibold focus:outline-none hover:opacity-90"
        @click="$emit('openModal')"
      >
        Book Appointment
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="sortAppointments">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <newview-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showAppointment(item.id)"
        >
          <newview-icon class="text-blue-300 fill-current" />
          <span class="ml-3 text-xs">Edit</span>
        </div>
        <div
          @click="showStatus(item.id)"
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
        >
          <update-icon class="text-danger fill-current" />
          <span class="ml-3 text-xs"> Update Status </span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showCheckinPane(item.id)"
        >
          <checkin-icon />
          <span class="ml-3 text-xs">Check-In</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="makeNotes(item.id)"
        >
          <note-icon class="text-green-600 fill-current" />
          <span class="ml-3 text-xs">Make Notes</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="deleteItem(item.id)"
        >
          <cancel-icon />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
      <!-- <template #Participants="{ item }">
        <div class="flex items-center">
          <span class="text-xs">{{ item.Participants }}</span>
          <eye-icon
            class="cursor-pointer ml-3"
            @click="displayParticipants(item.id)"
          />
        </div>
      </template> -->
      <template #Participants="{ item }">
        <actors-section
          :items="item.Participants"
          class="cursor-pointer"
          @click="displayParticipants(item.id)"
        />
      </template>
      <template #status="{ item }">
        <div class="flex items-center">
          <p
            class="text-xs bg-gray-300 p-1 rounded"
            v-if="item.status == 'No-Show'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded"
            v-if="item.status == 'Tentative' || item.status == 'Draft'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-purple-300 text-purple-600 p-1 rounded"
            v-if="item.status == 'Needs-Action' || item.status == 'Checked-In'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-green-200 text-green-500 p-1 rounded"
            v-if="item.status == 'Fullfiled' || item.status == 'Confirmed'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-red-300 text-red-600 p-1 rounded"
            v-if="item.status == 'Cancelled' || item.status == 'Declined'"
          >
            {{ item.status }}
          </p>
          <p
            class="text-xs bg-blue-300 text-blue-600 p-1 rounded"
            v-if="item.status == 'Rescheduled'"
          >
            {{ item.status }}
          </p>
        </div>
      </template>
    </cornie-table>

    <notes-add
      :appointmentNotes="appointmentNotes"
      :appointmentId="appointmentId"
      @update:preferred="makeNotes"
      v-model:visible="showNotes"
    />
    <all-participants
      v-model="showPartcipants"
      :appointmentId="appointmentId"
    />
    <appointment-modal
      v-if="appointmentId == 'false'"
      @appointment-added="appointmentAdded"
      @show:modal="showAppointment"
      v-model="showAppointmentModal"
    />
    <appointment-modal
      v-else
      :id="appointmentId"
      @appointment-added="appointmentAdded"
      @show:modal="showAppointment"
      v-model="showAppointmentModal"
    />

    <status-modal
      :id="appointmentId"
      :updatedBy="updatedBy"
      :currentStatus="currentStatus"
      :dateUpdated="update"
      @appointment-added="appointmentAdded"
      v-model="showStatusModal"
    />

    <side-modal
      :visible="showCheckin"
      :header="'Check-In'"
      :width="990"
      @closesidemodal="() => (showCheckin = false)"
    >
      <checkin-component
        :appointmentId="checkinAppointment"
        @closesidemodal="() => (showCheckin = false)"
      />
    </side-modal>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import search from "@/plugins/search";

import { IPatient } from "@/types/IPatient";
import IAppointment from "@/types/IAppointment";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
//import CloseIcon from "@/components/icons/CloseIcon.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import EHRVisits from "@/views/dashboard/ehr/visits/index.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import CheckinComponent from "@/views/dashboard/ehr/visits/components/patient-checkin.vue";

// import AppointmentModal from "./appointmentDialog.vue";
// import AllParticipants from "./allParticipants.vue";
// import NotesAdd from "./notes.vue";
// import StatusModal from "./status-update.vue";
// import ActorsSection from "./actors.vue";

const appointment = namespace("appointment");
const patients = namespace("patients");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    // AppointmentModal,
    NoteIcon,
    // StatusModal,
    ThreeDotIcon,
    // NotesAdd,
    PlusIcon,
    // ActorsSection,
    SearchIcon,
    // AllParticipants,
    //  CloseIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
    EHRVisits,
    SideModal,
    CheckinComponent,
  },
})
export default class AppointmentExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  appointmentId = "";
  showPartcipants = false;
  singleParticipant = [];
  showStatusModal = false;
  updatedBy = "";
  currentStatus = "";
  update = "";
  onePatientId = "";
  onePractitionerId = "";
  newslot: any;
  appointmentNotes = [];
  availableSlots = [];
  create = "";

  @patients.State
  patients!: IPatient[];

  // @Prop({ type: Array, default: [] })
  //   appointments!: IAppointment[];

  @appointment.State
  patientappointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "request date", key: "requestDate", show: true },
    { title: "appointment id", key: "appointmentId", show: true },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    {
      title: "specialty",
      key: "specialty",
      show: true,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "appt Date Time",
      key: "appointmentDateTime",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  showCheckin = false;
  checkinAppointment = "";
  showCheckinPane(id: string) {
    this.checkinAppointment = id;
    this.showCheckin = true;
  }

  showAppointmentModal = false;
  async showAppointment(value: string) {
    this.showAppointmentModal = true;
    this.appointmentId = value;
  }
  async showStatus(value: string) {
    this.showStatusModal = true;
    this.appointmentId = value;
  }

  appointmentAdded() {
    this.fetchByIdAppointments(this.$route.params.id.toString());
  }
  get patientId() {
    return this.$route.params.id;
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const filteritems = this.patientappointments.filter((c) => c !== null);
    const patientappointments = filteritems.map((patientappointment: any) => {
      (patientappointment as any).createdAt = new Date(
        (patientappointment as any).createdAt
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const pateintId = patientappointment.Patients.map((patient: any) => {
        this.onePatientId = patient.patientId;
      });
      const practitionerId = patientappointment.Practitioners.map(
        (Practitioner: any) => {
          this.onePractitionerId = Practitioner.practitionerId;
        }
      );
      this.updatedBy = this.getPatientName(this.onePatientId);
      this.currentStatus = patientappointment.status;
      this.update = (patientappointment as any).updatedAt = new Date(
        (patientappointment as any).updatedAt
      ).toLocaleDateString("en-US");
      const patientNewId = this.onePatientId;

      return {
        ...patientappointment,
        action: patientappointment.id,
        patient: this.getPatientName(this.onePatientId),
      };
    });
    return patientappointments;
  }
  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);
    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

}
</script>
<style scoped>
.outline-primary {
  border: 2px solid #080056;
}
</style>
