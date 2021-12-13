<template>
  <div class="w-full">
    <span class="flex justify-end w-full mb-8">
      <button
        class="bg-danger rounded-full text-white mt-5 py-2 pr-5 pl-5 px-3 mb-5 focus:outline-none hover:opacity-90"
        @click="$router.push('/dashboard/provider/experience/add-appointment')"
      >
        Create Appointment
      </button>
    </span>
    <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="
            $router.push(`/dashboard/experience/add-appointment/${item.id}`)
          "
        >
          <newview-icon class="text-yellow-500 fill-current" />
          <span class="ml-3 text-xs">View</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="$router.push(`/dashboard/experience/add-response/${item.id}`)"
        >
          <update-icon class="text-yellow-300 fill-current" />
          <span class="ml-3 text-xs">Update</span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="showCheckinPane(item.id)"
        >
          <checkin-icon />
          <span class="ml-3 text-xs">Check-In </span>
        </div>
        <div
          class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          @click="makeNotes(item.id)"
        >
          <note-icon class="text-green-300 fill-current" />
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
      <template #Participants="{ item }">
        <div class="flex items-center">
          <span class="text-xs">{{ item.Participants }}</span>
          <eye-icon
            class="cursor-pointer ml-3"
            @click="displayParticipants(item.id)"
          />
        </div>
      </template>
      <template #Patients="{ item }">
        <div class="flex items-center">
          <span class="text-xs cursor-pointer" @click="displayPatients(item.id)"
            >Darlington Onyemere</span
          >
        </div>
      </template>
    </cornie-table>

    <notes-add
      :appointmentId="appointmentId"
      @update:preferred="makeNotes"
      v-model:visible="showNotes"
    />
    <SideModal
      :visible="true"
      :header="'Check-In'"
      @closesidemodal="() => (showCheckin = false)"
    >
      <Checkin :item="appment" />
    </SideModal>
    <all-participants
      :appointmentId="appointmentId"
      :columns="singleParticipant"
      @update:preferred="displayParticipants"
      v-model:visible="showPartcipants"
    />
    <patient-details v-model:visible="showPatientModal" :patients="patient" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
//import CardText from "@/components/card-text.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import IAppointment from "@/types/IAppointment";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/update.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import NotesAdd from "./notes.vue";
import AllParticipants from "./participants.vue";
import PatientDetails from "./policy.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import Checkin from "../../visits/components/checkin.vue";
import SideModal from "../../schedules/components/side-modal.vue";

const appointment = namespace("appointment");
const visitsStore = namespace("visits");

@Options({
  components: {
    Table,
    SideModal,
    Checkin,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NotesAdd,
    PatientDetails,
    NewviewIcon,
    AllParticipants,
    UpdateIcon,
    NoteIcon,
    ThreeDotIcon,
    SearchIcon,
    //CloseIcon,
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
    // CardText,
    CornieDialog,
  },
})
export default class AppointmentExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  patientName = "";
  patient = [];
  filterByType: any = [];
  filterByStatus: any = [];

  showPatientModal = false;
  query = "";
  showNotes = false;
  filterStatus = false;
  appointmentId = "";
  showPartcipants = false;
  singleParticipant = [];
  showCheckin = false;

  statuses = ["All", "Completed", "Queue", "In-Progress"];
  types = ["All", "Emergency", "Walk-In", "Follow-Up", "Routine"];

  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @visitsStore.State
  patients!: any[];

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", key: "id", show: true },
    {
      title: "Patient",
      key: "Patients",
      show: true,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "Slot",
      key: "slot",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Code",
      key: "reasonCode",
      show: false,
    },
    {
      title: "Reason Reference",
      key: "reasonRef",
      show: false,
    },
    {
      title: "Period",
      key: "newperiod",
      show: false,
    },
    {
      title: "Priority",
      key: "priority",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Consultation Medium",
      kwy: "consultationMedium",
      show: false,
    },
  ];
  currentAppId = "";
  showCheckinPane(id: string) {
    alert("cliked");
    this.currentAppId = id;
    this.showCheckin = true;
  }

  get appment() {
    if (!this.currentAppId) return {};
    const pt = this.appointments.find((i: any) => i.id === this.currentAppId);
    return pt ? pt : {};
  }

  getAppointment(id: string) {
    const pt = this.appointments.find((i: any) => i.id === id);

    return pt ? pt : {};
  }
  getPatientName(id: string) {
    const pt = this.patients.find((i: any) => i.id === id);

    return pt ? `${pt.firstname} ${pt.lastname}` : "";
  }

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  async fetchPatients() {
    try {
      const response = await cornieClient().get(`/api/v1/patient/`);
      ;
    } catch (error) {
      window.notify({ msg: "Failed to get patients", status: "error" });
    }
    return [];
  }

  // get items() {
  //   if (!this.appointments || this.appointments.length === 0 ) return [];
  //   const filtered = this.appointments.filter((i: any) => {
  //     if (this.filterByType.length === 0 && this.filterByStatus.length === 0) {
  //       return i;
  //     } else {
  //       if (this.filterByStatus.includes('All') || this.filterByType.includes('All')) return true;
  //     //  const indexInTypes = this.filterByType.findIndex((j: any) => j.toLowerCase() === this.getAppointment(i.appointmentId).appointmentType.toLowerCase());
  //       const indexInStatuses = this.filterByStatus.findIndex((j: any) => j.toLowerCase() === i.status.toLowerCase());

  //     //  if (indexInTypes >= 0 || indexInStatuses >= 0) return true;
  //     }

  //   })

  //   const appointments = filtered.map((i: any) => {
  //     return {
  //       ...i,
  //       action: i.id,
  //       patient: this.getPatientName(i.patientId),
  //       location: i.room.name,
  //       status: i.status,
  //       slot: ` `,
  //       // slot: `${i.startTime ? i.startTime : ''} ${i.endTime ? i.endTime : ''}`,
  //       practitioners: this.getActors(i.appointmentId)
  //     };
  //   });
  //   return appointments;
  //   // if (!this.query) return shifts;
  //   // return search.searchObjectArray(shifts, this.query);
  // }

  get items() {
    const appointments = this.appointments.map((appointment) => {
      const singleParticipantlength =
        appointment.Practitioners.length +
        appointment.Devices.length +
        appointment.Patients.length;
      (appointment as any).period = new Date(
        (appointment as any).period
      ).toLocaleDateString("en-US");
      const start = ((appointment as any).participantDetail.period.start =
        new Date(
          (appointment as any).participantDetail.period.start
        ).toLocaleDateString("en-US"));
      const end = ((appointment as any).participantDetail.period.end = new Date(
        (appointment as any).participantDetail.period.end
      ).toLocaleDateString("en-US"));
      return {
        ...appointment,
        action: appointment.id,
        keydisplay: "XXXXXXX",
        newperiod: start + "-" + end,
        Participants: singleParticipantlength,
      };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to cancel this appointment",
      title: "Cancel appointment",
    });
    if (!confirmed) return;

    if (await this.deleteAppointment(id))
      window.notify({ msg: "Appointment canceled", status: "success" });
    else window.notify({ msg: "Appointment not canceled", status: "error" });
  }
  async displayPatients() {
    this.showPatientModal = true;
  }
  async makeNotes(id: string) {
    this.appointmentId = id;
    this.showNotes = true;
  }
  closeModal() {
    this.showPartcipants = false;
  }
  async displayParticipants(value: string) {
    this.appointmentId = value;
    this.showPartcipants = true;
    try {
      const response = await cornieClient().get(`/api/v1/appointment/${value}`);
      if (response.success) {
        this.singleParticipant = response.data;
      }
    } catch (e) {
      ;
    }
  }
  get sortAppointments() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  async created() {}
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
