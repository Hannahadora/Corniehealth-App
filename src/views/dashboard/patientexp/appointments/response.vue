<template>
  <div class="flex justify-center pb-96 bg-white shadow-md p-3 mt-2 mb-2 rounded w-full">
    <div class="w-full p-2 pb-96">
      <div class="w-full   py-2 flex justify-between space-x-2 pb-3 border-b-2">
        <span class="font-bold text-lg text-primary">Appointment Response</span>
        <span class="float-right text-sm text-black font-medium">Good Morning, Dr. Joseph</span>
      </div>
        <span class="w-full">
            <div class="w-full mt-5 mb-8">
             <!-- <div class="dropdown  inline-block relative border-none float-right w-32">
                <p class="cursor-pointer">Today</p>
               <ul class="dropdown-menu absolute
              shadow
              bg-white
              top-100
              z-40
              w-44
              p-3
              hidden
              right-10
              rounded
              max-h-select
              overflow-y-auto
              px-1 py-5
              mt-2
              svelte-5uyqqj">
                  <li class="cursor-pointer mb-3 px-6 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                    <span>Today</span>
                  </li>
                  <li class="cursor-pointer mb-3 px-6 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                    <span>A week Ago</span>
                  </li>
                  <li class="cursor-pointer mb-3  px-6 w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                    <span>This year</span>
                  </li>
                </ul>
              </div>-->
                <cornie-select class="border-none float-right w-32" @change="onChange($event)" v-model="date" :items="['Today','A week Ago','This year']">
              </cornie-select>
                <response-chart v-if="loaded" :chartData="chartdata" :chartLabels="chartLabels"/>
            </div>
            <div class="w-full h-screen">
                 <cornie-table :columns="rawHeaders" v-model="items">
                <template #actions="{ item }">
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/add-response/${item.id}`)">
                    <newview-icon class="text-yellow-500 fill-current"/>
                    <span class="ml-3 text-xs">View</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/provider/experience/edit-response/${item.id}`)">
                    <update-icon  class="text-yellow-300 fill-current" />
                    <span class="ml-3 text-xs">Update</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                    <checkin-icon />
                    <span class="ml-3 text-xs">Start Visit</span>
                    </div>
                     <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/provider/experience/add-appointment`)">
                    <update-icon class="text-green-300 fill-current" />
                    <span class="ml-3 text-xs">New Appointment</span>
                    </div>
                    <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                    <note-icon class="text-danger fill-current"/>
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
                 <template #Patients="{ item }">
                  <div class="flex items-center">
                    <span class="text-xs cursor-pointer"  @click="displayPatients(item.id)">Darlington Onyemere</span>
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
                      <patient-details   v-model:visible="showPatientModal"
      :patients="patient"/>
            </div>
        </span>
    </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
//import CardText from "@/components/card-text.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import CornieSelect from "@/components/cornieselect.vue";
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
import PatientDetails from "./policy.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
//import CloseIcon from "@/components/icons/close.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/update.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import NotesAdd from "./notes.vue";
import AllParticipants from "./participants.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import ResponseChart from "./ResponseChart.vue"
import moment from 'moment'
const appointment = namespace("appointment");

@Options({
  components: {
    Table,
    ResponseChart,
    CornieSelect,
    PatientDetails,
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
   // CloseIcon,
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
    CornieDialog
  },
  
})
export default class AppointmentExistingState extends Vue {
   @Prop({ type: String, default: "" })
  id!: string;
  showColumnFilter = false;
  showModal = false;
  patient=[];
  loading = false;
  loaded = false;
  query = "";
  showNotes = false;
  showPatientModal= false;
appointmentId="";
 date = "";
showPartcipants= false;
singleParticipant= [];

  chartdata = [];
  chartLabels=[];
  chartFullfilled=[];

  @appointment.State
  appointments!: IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @appointment.Action
  fetchAppointments!: () => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", key: "keydisplay", show: true },
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
      title: "Participant Status",
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

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }
  
appointmentsResponse = [];

  get items() {
    const appointments = this.appointments.map((appointment) => {
     // const responses = appointment.
      const singleParticipantlength = appointment.Practitioners.length + appointment.Devices.length + appointment.Patients.length;
   //   (appointment as any).period = new Date((appointment as any).peroid.start.toLocaleDateString("en-US");
       const start=   (appointment as any).period.start = new Date(
         (appointment as any).period.start 
       ).toLocaleDateString("en-US");
       const end = (appointment as any).period.end = new Date(
         (appointment as any).period.end 
       ).toLocaleDateString("en-US");
        return {
        ...appointment,
         action: appointment.id,
         keydisplay: "XXXXXXX",
          newperiod: start +'-'+ end ,
         Participants: singleParticipantlength, 
        };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

  onChange(event:any){
        console.log(event.target.value);
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
  async singleResponse(){
    const aResponse = cornieClient().get(`/api/v1/appointment/response/getByAppointmentId/${this.id}`);
    const response = await Promise.all([aResponse]);
    this.loaded = true;
       const values = response[0].data.map(function (e:any) {
         return e.createdAt;
      });
      console.log( values );
      let results = values.map((date : any)=> moment(date).format('dddd,DD'));
       this.chartdata = results;
        const count =   response[0].data.map((e : any)=> e.status.length)
        this.chartLabels = count;
   
  }
  async displayPatients(){
    this.showPatientModal = true;
  }
  async fetchPatients() {
        const AllPateints = cornieClient().get("/api/v1/patient");
        const response = await Promise.all([AllPateints]);
        this.patient = response[0].data;
      }
      get sortAppointments (){
        return this.items.slice().sort(function(a, b){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
     async created() {
      this.fetchAppointments();
      this.singleResponse();
      this.fetchPatients();
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
.dropdown:focus-within .dropdown:hover .dropdown-menu {
  visibility: visible;
  opacity: 1;
  display: block;
}
</style>
