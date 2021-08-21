<template>
  <div class="w-full">
    <span class="flex justify-end w-full mb-8">
      <button
        class="
          bg-danger
          rounded-full
          text-white
          mt-5
          py-2
          pr-5
          pl-5
          px-3
          mb-5
          focus:outline-none
          hover:opacity-90
        "
         @click="$router.push('/dashboard/provider/experience/add-appointment')"
      >
         Create Appointment
      </button>
      
    </span>
   <cornie-table :columns="rawHeaders" v-model="items">
      <template #actions="{ item }">
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/add-appointment/${item.index}`)">
          <newview-icon />
          <span class="ml-3 text-xs">View</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/add-appointment/${item.index}`)">
          <update-icon />
          <span class="ml-3 text-xs">Update</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
          <checkin-icon />
          <span class="ml-3 text-xs">Check-In</span>
        </div>
         <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
          <note-icon />
          <span class="ml-3 text-xs">Make Notes</span>
        </div>
        <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
          <cancel-icon />
          <span class="ml-3 text-xs">Cancel</span>
        </div>
      </template>
      <template #Participants="{ item }">
        <div class="flex items-center">
          <span class="text-xs">{{item.Participants}}</span>
          <eye-icon class="cursor-pointer ml-3 " @click="displayParticipants(item.id)"/>
        </div>
      </template>
    </cornie-table>

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
import CardText from "@/components/card-text.vue";
import CornieDialog from "@/components/Dialog.vue";
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
import { Prop } from "vue-property-decorator";
import IAppointment from "@/types/IAppointment";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CloseIcon from "@/components/icons/close.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/update.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import NotesAdd from "./notes.vue";
import AllParticipants from "./participants.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const appointment = namespace("appointment");

@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NotesAdd,
    NewviewIcon,
    AllParticipants,
    UpdateIcon,
    NoteIcon,
    ThreeDotIcon,
    SearchIcon,
    CloseIcon,
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
    CornieDialog
  },
  
})
export default class AppointmentExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  showNotes = false;
appointmentId="";
showPartcipants= false;
singleParticipant= [];
  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", key: "keydisplay", show: true },
    {
      title: "Patient",
      key: "patients",
      show: false,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      orderBy: (a: IAppointment, b: IAppointment) => a.appointmentType < b.appointmentType ? -1 : 1,
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
      key: "period",
      show: true,
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
      const singleParticipantlength = appointment.Practitioners.length + appointment.Devices.length + appointment.Patients.length
        console.log(singleParticipantlength);
       (appointment as any).period = new Date(
         (appointment as any).period 
       ).toLocaleDateString("en-US");
        return {
        ...appointment,
         action: appointment.id,
         keydisplay: "XXXXXXX",
         Participants: singleParticipantlength 
        };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

 
  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to cancel this appointment",
      title: "Cancel appointment"
    });
    if (!confirmed) return;

    if (await this.deleteAppointment(id)) window.notify({ msg: "Appointment canceled", status: "success" });
    else window.notify({ msg: "Appointment not canceled", status: "error" });
  }
  async makeNotes(id:string){
    this.appointmentId = id;
    this.showNotes = true;
  }
  async displayParticipants(value:string){
    this.appointmentId = value;
    this.showPartcipants = true;
     try {
       const response = await cornieClient().get(
          `/api/v1/appointment/${value}`
        );
        if (response.success) {
        this.singleParticipant = response.data
        }
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
  }
      get sortAppointments (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
     async created() {
      console.log(this.items);
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>
