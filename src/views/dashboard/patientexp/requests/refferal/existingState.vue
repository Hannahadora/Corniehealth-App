<template>
  <div class="w-full pb-80">
   
 
    <notes-add
      :appointmentId="appointmentId"
      @update:preferred="makeNotes"
      v-model:visible="showNotes"
    />
    <all-participants
      :appointmentId="appointmentId"
      :columns="singleParticipant"
      @update:preferred="displayParticipants"
      v-model:visible="showPartcipants"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
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
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { Prop } from "vue-property-decorator";
import IAppointment from "@/types/IAppointment";
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
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const appointment = namespace("appointment");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    NoteIcon,
    ThreeDotIcon,
    PlusIcon,
    SearchIcon,
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
  },
})
export default class RefferalTable extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  appointmentId = "";
  showPartcipants = false;
  singleParticipant = [];
  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Date Requested", key: "createdAt", show: true },
    {
      title: "Subject",
      key: "subject",
      show: false,
    },
    {
      title: "Requester",
      key: "requester",
      show: true,
    },
    {
      title: "Dispenser",
      key: "dispenser",
      show: true,
    },
    {
      title: "Performer",
      key: "performer",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }

  get items() {
    const appointments = this.appointments.map((appointment) => {
      const singleParticipantlength =
        appointment.Practitioners.length +
        appointment.Devices.length +
        appointment.Patients.length;
      (appointment as any).createdAt = new Date(
        (appointment as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...appointment,
        action: appointment.id,
        keydisplay: "XXXXXXX",
        Participants: singleParticipantlength,
      };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

  select(i: number) {
    this.selected = i;
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
    } catch (error) {
      this.loading = false;
      console.error(error);
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
