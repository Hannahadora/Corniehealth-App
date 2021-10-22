<template>
  <div class="w-full pb-80">
   <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Appointments</a></li>    
        <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Visits</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="Appointments">   
          <span class="flex justify-end w-full mb-8">
            <button
                        class="
                        bg-danger
                        rounded-full
                        text-white
                        mt-5
                        py-3
                        px-3
                        pl-7
                        pr-7
                        font-semibold
                        focus:outline-none
                        hover:opacity-90
                        "
                        @click="showAppointment('false')"
                    >
                   New Appointment
                    </button>
            
          </span>
          <cornie-table :columns="rawHeaders" v-model="sortAppointments">
              <template #actions="{ item }">
                 <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" >
                  <newview-icon  class="text-blue-300 fill-current"/>
                  <span class="ml-3 text-xs">View</span>
                </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"   @click="showAppointment(item.id)">
                  <newview-icon  class="text-blue-300 fill-current"/>
                  <span class="ml-3 text-xs">Edit</span>
                </div>
                <div
                    @click="showStatus(item.id)"
                    class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                  >
                    <update-icon class="text-danger fill-current" />
                    <span class="ml-3 text-xs"> Update Status </span>
                  </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="showCheckinPane(item.id)">
                        <checkin-icon />
                        <span class="ml-3 text-xs">Check-In</span>
                        </div>
                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                  <note-icon class="text-green-600 fill-current"/>
                  <span class="ml-3 text-xs">Make Notes</span>
                </div>
                 <div
                        class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
                        @click="deleteItem(item.id)"
                        >
                        <cancel-icon/>
                        <span class="ml-3 text-xs">Cancel</span>
                        </div>
              </template>
              <template #Participants="{ item }">
                <div class="flex items-center">
                  <span class="text-xs">{{item.Participants}}</span>
                  <eye-icon class="cursor-pointer ml-3 " @click="displayParticipants(item.id)"/>
                </div>
              </template>
                <template #status="{ item }">
                <div class="flex items-center">
                  <p class="text-xs bg-gray-300 p-1 rounded" v-if="item.status == 'Proposed'">{{item.status}}</p>
                  <p class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded" v-if="item.status == 'Pending'">{{item.status}}</p>
                  <p class="text-xs bg-green-200 text-green-500 p-1 rounded" v-if="item.status == 'Booked'">{{item.status}}</p>
                  <p class="text-xs bg-purple-300 text-purple-600 p-1 rounded" v-if="item.status == 'Arrived'">{{item.status}}</p>
                  <p class="text-xs bg-green-200 text-green-500 p-1 rounded" v-if="item.status == 'Fullfiled'">{{item.status}}</p>
                  <p class="text-xs bg-red-300 text-red-600 p-1 rounded" v-if="item.status == 'Cancelled'">{{item.status}}</p>
                  <p class="text-xs bg-yellow-200 text-yellow-500 p-1 rounded" v-if="item.status == 'No show'">{{item.status}}</p>
                  <p class="text-xs bg-purple-300 text-purple-600 p-1 rounded" v-if="item.status == 'Entered-in-Error'">{{item.status}}</p>
                   <p class="text-xs bg-green-200 text-green-500 p-1 rounded" v-if="item.status == 'Checked-in'">{{item.status}}</p>
                    <p class="text-xs bg-blue-300 text-blue-600 p-1 rounded" v-if="item.status == 'Waitlist'">{{item.status}}</p>
                </div>
              </template>
          </cornie-table>
        </div>
        <div class="tab-pane" v-if="selected == 2"  :class="{'active' :  selected === 2  }" id="Visits">
        </div>
       
       
    </div>
      <notes-add
          :appointmentNotes="appointmentNotes"
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
          <appointment-modal   
           v-if="appointmentId == 'false'" 
            @appointment-added="appointmentAdded"
               @show:modal="showAppointment"
          v-model="showAppointmentModal"/>
           <appointment-modal   
          v-else
            :id="appointmentId" 
            @appointment-added="appointmentAdded"
               @show:modal="showAppointment"
          v-model="showAppointmentModal"/>

              
        <status-modal
            :id="appointmentId" 
           :updatedBy="updatedBy" 
        :currentStatus="currentStatus" 
        :dateUpdated="update"
            @appointment-added="appointmentAdded"
          v-model="showStatusModal"/>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
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
import { Prop } from "vue-property-decorator";
import IAppointment from "@/types/IAppointment";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import AllParticipants from "./participants.vue";
import NotesAdd from "./notes.vue";
import StatusModal from "./status-update.vue";
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
import AppointmentModal from "./appointmentDialog.vue";
import { IPatient } from "@/types/IPatient";

const appointment = namespace("appointment");
const patients = namespace("patients");

@Options({
  components: {
    Table,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    AppointmentModal,
    NoteIcon,
    StatusModal,
    ThreeDotIcon,
    NotesAdd,
    PlusIcon,
    SearchIcon,
    AllParticipants,
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
    CornieDialog
  },
  
})
export default class AppointmentExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
appointmentId="";
showPartcipants= false;
singleParticipant= [];
showStatusModal=false;
  updatedBy= "";
currentStatus="";
update ="";
onePatientId="";
onePractitionerId="";
newslot: any;
appointmentNotes=[];
availableSlots=[];
create="";
   @patients.State
  patients!: IPatient[];

// @Prop({ type: Array, default: [] })
//   appointments!: IAppointment[];

  @appointment.State
  patientappointments!:IAppointment[];

  @appointment.Action
  deleteAppointment!: (id: string) => Promise<boolean>;

  @appointment.Action
  fetchByIdAppointments!: (patientId: string) => Promise<void>;

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "Recorded", key: "createdAt", show: true },
      { title: "Identifier", key: "id", show: true },
       {
      title: "Appointment Type",
      key: "appointmentType",
      show: true,
    },
    {
      title: "Patient",
      key: "patient",
      show: false,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "Slot",
      key: "newslot",
      show: true,
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

  showAppointmentModal= false;
 async showAppointment(value:string){
      this.showAppointmentModal = true;
      this.appointmentId = value;
  }
  async showStatus(value:string){
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
          console.log(this.patientappointments);
       const filteritems =  this.patientappointments.filter((c) => c !== null);
    const patientappointments = filteritems.map((patientappointment:any) => {
          (patientappointment as any).createdAt= new Date(
         (patientappointment as any).createdAt
       ).toLocaleDateString("en-US",{ day: 'numeric', month: 'long', year: 'numeric' });

        
     const singleParticipantlength =
        patientappointment.Practitioners.length +
        patientappointment.Devices.length +
        patientappointment.Patients.length + patientappointment.Location.length + patientappointment.HealthCare.length;

            const pateintId = patientappointment.Patients.map((patient:any) =>{
            this.onePatientId =  patient.patientId;
       
      });
       const practitionerId = patientappointment.Practitioners.map((Practitioner:any) =>{
            this.onePractitionerId =  Practitioner.practitionerId;
       
      });
        this.updatedBy = this.getPatientName(this.onePatientId);
      this.currentStatus =patientappointment.status;
        this.update =  (patientappointment as any).updatedAt= new Date(
         (patientappointment as any).updatedAt
       ).toLocaleDateString("en-US");
      const patientNewId = this.onePatientId;
      return {
        ...patientappointment,
       action: patientappointment.id,
        patient: this.getPatientName(this.onePatientId),
       newslot:this.showSlots(patientappointment.slot),
        Participants: singleParticipantlength,
      };
    });  
     return patientappointments;
  }
    getPatientName(id: string) {
            const pt = this.patients.find((i: any) => i.id === id);
            return pt ? `${pt.firstname} ${pt.lastname}` : '';
    }
     showSlots(id:string){
        const pt = this.availableSlots.find((i: any) => i.id === id);
          this.newslot = pt;
           return pt ? `${this.newslot.startTime} - ${this.newslot.endTime}` : '';
      // return  `${this.newslot.startTime} ${this.newslot.startTime}`;
  }
    async getSlot(){
        const AllSlots = cornieClient().get(`/api/v1/slot/practitioner/${this.onePractitionerId}`);
        const response = await Promise.all([AllSlots]);
        this.availableSlots = response[0].data;
    }
 select(i:number) {
      this.selected = i;
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
      this.fetchNotes();
  }
  closeModal(){
    this.showPartcipants = false;
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
        return this.items.slice().sort(function(a:any, b:any){
          return (a.createdAt < b.createdAt) ? 1 : -1;
        });
      }
        async fetchNotes() {
    const id = this.appointmentId;
      const AllNotes = cornieClient().get(`/api/v1/appointment/notes/getAllNotesForAppointment/${id}`);
      const response = await Promise.all([AllNotes]);
      this.appointmentNotes = response[0].data;
    }

     async created() {
        await this.fetchByIdAppointments(this.$route.params.id.toString());
        this.getSlot();
      
    }

}
</script>
<style>
.outline-primary{
    border: 2px solid #080056;
}
</style>
