<template>
  <div class="w-full">
    <form  @submit.prevent="submit">
           <div class="mb-8">
            <span class="flex justify-end w-full">
                <button
                    @click="$router.push('/dashboard/provider/experience/appointments')"
                    type="button"
                    class="
                    outline-primary
                    rounded-full
                    text-primary
                    mt-5
                    mr-3
                    flex
                    py-2
                    pr-10
                    pl-10
                    px-3
                    focus:outline-none
                    hover:bg-primary
                    hover:text-white
                    "
                >
                <share-icon class="mr-3"/>
                    Share
                </button>
                 <cornie-btn
                :loading="loading"
                type="submit"
                class="
                  bg-danger
                  rounded-full
                  text-white
                  mt-5
                  pr-14
                  pl-14
                  focus:outline-none
                  hover:opacity-90
                "
              >
                Print
              </cornie-btn>
            </span>
       </div>
       <p class="text-primary mt-5 mb-8 font-bold">View Request</p>
        <div class="mt-5 pb-76 mb-44 bg-white w-full h-full shadow-md p-4 rounded" >  
            <div class="mt-3"> 
              <div class="flex space-x-8">
                <avatar class="mr-2 w-16 h-16" :src="img.placeholder" />
                <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
                <div>
                  <p class="text-lg mb-3 text-primary font-bold">
                    CornieHealth
                  </p>
                  <p class="text-sm text-gray font-medium">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>     
                    <div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                            Request Info
                        </span>
                        <div class="w-full flex space-x-2">
                             <input
                             checked
                              type="checkbox"
                              class="bg-danger focus-within:bg-danger px-6 shadow"
                            />
                            <p class="text-xs mt-1">Virtual</p>
                        </div>
                        <div class="grid grid-cols-3 gap-4 mt-5">
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Status</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                             <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Requisition ID</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                             <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Authored On</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Priority</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Precondition Code</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Reason Reference</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Category</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Intent</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>

                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Replaces</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Do Not Perform</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>

                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Activity Definition</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Based On</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Encounter</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Precondition</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                             <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Reason Code</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                             <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                <label class="block text-gray-500 mb-1 text-xs font-light">Supporting Info</label>
                                <div class="text-sm text-black">{{ basedOn }}</div>
                            </div>
                        </div>
                    </div>

                      <div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                            Participants
                        </span>
                        <div class="w-full flex space-x-2">
                             <input
                             checked
                              type="checkbox"
                              class="bg-danger focus-within:bg-danger px-6 shadow"
                            />
                            <p class="text-xs mt-1">In-Patient</p>
                        </div>
                        <div class="grid grid-cols-4 gap-4 mt-8">
                            <div class="bg-white shadow-md p-3">
                                <p class="text-lg text-primary font-bold">Patient</p>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Patient Name:</p>
                                  <p class="text-sm font-bold text-primary">James Dean</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">MRN Number::</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Gender:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Age:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Address:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Email:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                 <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Mobile:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                 <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Payment Option:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>


                            </div>
                            <div class="bg-white shadow-md p-3">
                                <p class="text-lg text-primary font-bold">Requester</p>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Practitioner Name:</p>
                                  <p class="text-sm font-bold text-primary">James Dean</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Practitioner ID:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Facility Name:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Address:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Email:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                 <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Mobile:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                            </div>
                            <div class="bg-white shadow-md p-3">
                                <p class="text-lg text-primary font-bold">Performer</p>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Performer Type:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Performer</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Corniehealth ID:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Address:</p>
                                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Email:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                                 <div class="flex space-x-4 mt-5">
                                  <p class="text-sm text-gray-400 font-light">Mobile:</p>
                                   <p class="text-sm font-bold text-primary">xxxxxx</p>
                                </div>
                            </div>
                         
                        </div>
                    </div>
                   
                    <div class="mt-10">
                         <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Medication
                        </span>
                        <cornie-table :columns="rawHeaders" v-model="items">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <newview-icon  class="text-yellow-500 fill-current"/>
                                <span class="ml-3 text-xs">View</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer">
                                <update-icon />
                                <span class="ml-3 text-xs">Update</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer">
                                <plus-icon class="text-primary fill-current"/>
                                <span class="ml-3 text-xs">Add Appointment</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer">
                                <plus-icon class="text-green-500 fill-current"/>
                                <span class="ml-3 text-xs">Add Task</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer" @click="makeNotes(item.id)">
                                <note-icon class="text-purple-700 fill-current"/>
                                <span class="ml-3 text-xs">Make Notes</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer" @click="deleteItem(item.id)">
                                <message-icon class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">Message</span>
                                </div>
                            </template>
                            <template #Participants="{ item }">
                                <div class="flex items-center">
                                <span class="text-xs">{{item.Participants}}</span>
                                <eye-icon class="cursor-pointer ml-3 " @click="displayParticipants(item.id)"/>
                                </div>
                            </template>
                        </cornie-table>
                    </div> 
    
                    <div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Other Info
                        </span> 
                     
                      <div class="w-full grid grid-cols-3 gap-4">
                        <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                  <label class="block text-gray-500 mb-1 text-xs font-light">Comments</label>
                                  <div class="text-sm text-black">{{ basedOn }}</div>
                          </div>
                          <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                  <label class="block text-gray-500 mb-1 text-xs font-light">Link Form</label>
                                  <div class="text-sm text-black">{{ basedOn }}</div>
                          </div>
                          <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                  <label class="block text-gray-500 mb-1 text-xs font-light">History </label>
                                  <div class="text-sm text-black">{{ basedOn }}</div>
                          </div>
                          <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                                  <label class="block text-gray-500 mb-1 text-xs font-light">Patient Instruction</label>
                                  <div class="text-sm text-black">{{ basedOn }}</div>
                          </div>
                      </div>
                    </div>
                  
            </div>
        </div>
  
    </form>
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IAppointment, {ParticipantDetail}  from "@/types/IAppointment";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { first } from "@/plugins/utils";
import { string } from "yup";
import search from "@/plugins/search";
import { Prop, Watch } from "vue-property-decorator";
import PractitionersFilter from "@/components/practitioner.vue";
import PatientsFilter from "@/components/patient.vue";
import DevicesFilter from "@/components/device.vue";
import RolesFilter from "@/components/roles.vue";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import EditIcon from "@/components/icons/orangeedit.vue";
import ShareIcon from "@/components/icons/share.vue";
import SaveIcon from "@/components/icons/save.vue";
import SingleDatePicker from "@/components/datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
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
import DeleteIcon from "@/components/icons/delete.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
//import CloseIcon from "@/components/icons/CloseIcon.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import { useHandleImage } from "@/composables/useHandleImage";

const appointment = namespace("appointment");
const dropdown = namespace("dropdown");

const emptyParticipant: ParticipantDetail = {
  period: {} as Period,
  required: "",
  consultationMedium: "",
  
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    SaveIcon,
    EditIcon,
    CornieTable,
    PractitionersFilter,
    SingleDatePicker,
    Availability,
    Textarea,
    CornieRadio,
    CornieDialog,
    CardText,
    DeleteorangeIcon,
    DEdit,
    CDelete,
    Avatar,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    ShareIcon,
    UpdateIcon,
    NoteIcon,
    ThreeDotIcon,
    PlusIcon,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
  },
})
export default class AddAppointment extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;


  @appointment.Action
  getAppointmentById!: (id: string) => IAppointment;

@appointment.State
  appointments!: IAppointment[];

  loading = false;
  expand = false;
  selected = 1;
  isVisible = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  checked= false;
 tabstatus = false;
 tabsubject = false;
 tabparticipants = false;
 tabbg = false;
 tabmed = false;
 tabhealth= false;
 tabother = false;
 img = setup(() => useHandleImage());

actor = "";
  type = "";

  serviceCategory = "";
  locationId = null;
  deviceId = null;
  serviceType = "";
  specialty = "";
  appointmentType = "";
  reasonCode = "";
  reasonRef = "";
  priority = "";
  description = "";
  supportingInfo ="";
  slot = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  basedOn = "xxxxxx";
  duration = "";
  comments = "";
  patientInstruction = "";
  period = {} as Period;
  participantDetail = {...emptyParticipant}
  
  Practitioners = [];
  Devices = [];
  Patients: any[] = [];
  roles = [];

  newPractitioners =[];
  newDevices = [];
  newPatients =[];
  newRoles = [];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  participantitem = "";

  practitioner = [];
  device  = [];
  patient = [];
  role = [];
 
  availability: any[] = [];
  availabilities = Array();
 

 

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];
  required = string().required();
  dropdowns = {} as IIndexableObject;
  dropdowns2 = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setAppointment();
  }
   query = "";

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

  async setAppointment() {
    const appointment = await this.getAppointmentById(this.id);
    if (!appointment) return;
    this.serviceCategory = appointment.serviceCategory;
    this.locationId = appointment.locationId;
    this.deviceId = appointment.deviceId;
    this.serviceType = appointment.serviceType;
    this.specialty = appointment.specialty;
    this.supportingInfo = appointment.supportingInfo;
    this.appointmentType = appointment.appointmentType;
    this.reasonCode = appointment.reasonCode;
    this.reasonRef = appointment.reasonRef;
    this.priority = appointment.priority;
    this.description = appointment.description;
    this.slot = appointment.slot;
    this.basedOn = appointment.basedOn;
    this.duration = appointment.duration;
    this.comments = appointment.comments;
    this.patientInstruction = appointment.patientInstruction;
    this.period = appointment.period;
    this.Practitioners = appointment.Practitioners;
    this.Devices = appointment.Devices;
    this.Patients = appointment.Patients;
    this.participantDetail = appointment.participantDetail;

  }
  get payload() {
    const payload =  {
      serviceCategory: this.serviceCategory,
      locationId: this.locationId,
      deviceId: this.deviceId,
      serviceType: this.serviceType,
      specialty: this.specialty,
      appointmentType: this.appointmentType,
      reasonCode: this.reasonCode,
      supportingInfo: this.supportingInfo,
      reasonRef: this.reasonRef,
      priority: this.priority,
      description: this.description,
      slot: this.slot,
      basedOn: this.basedOn,
      duration: this.duration,
      comments: this.comments,
      patientInstruction: this.patientInstruction,
      participantDetail: this.participantDetail,
      period: this.period,
    } as any
    if(this.Devices.length > 0){
      payload.Devices = this.Devices;
    }
    if(this.Patients.length > 0){
      payload.Patients = this.Patients;
    }
    if(this.Practitioners.length > 0){
      payload.Practitioners = this.Practitioners;
    }
    return payload
  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }
 
  get selectedItem() {
    return this.participantitem;
  }
   select(i:number) {
      this.selected = i;
    }
  async addPractitioner(value: any,id:any) {
    //this.practitioner.push({ ...this.practitioners });
    this.newPractitioners = value;
    this.Practitioners = id;
    this.practitionerFilter = false;
  }
  removePractitioner(index: number) {
    this.newPractitioners.splice(index, 1);
  }
  removeRole(index: number){
    this.newRoles.splice(index, 1);
  }
   removeDevice(index: number){
    this.newDevices.splice(index, 1);
  }
  showAvailable() {
    this.availableFilter = true;
  }
  async addPatients(value: any,id:any) {
    this.newPatients = value;
    this.Patients = id;
    this.patientFilter = false;
  }
  async addDevices(value:any, id:any){
     this.newDevices = value;
     this.Devices = id;
    this.deviceFilter = false;
  }
  async addRoles(value: any,id:any){
   // this.role.push(value);
    this.newRoles = value;
    this.roles = id;
    this.roleFilter = false;
  }
   get setValue() {
    if (this.type == "Practitioner") {
      this.practitionerFilter = true;
    } else if (this.type == "Patient") {
      this.patientFilter = true;
    }else if(this.type == 'Device'){
       this.deviceFilter = true;
    }else if(this.type == 'Practitioner Role'){
        this.roleFilter = true;
    }
    return this.type;
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateAppointment();
    else await this.createAppointment();
    this.loading = false;
  }
  async createAppointment() {
    //const period = this.period;
   //this.payload.period.start = new Date(this.period).toISOString();
    //this.payload.period.end = new Date(this.period.end).toISOString();
    this.actor = this.type
    try {
      const response = await cornieClient().post("/api/v1/appointment", this.payload);
      if (response.success) {
          window.notify({ msg: "Appointment created", status: "success" });
          this.$router.push("/dashboard/provider/experience/appointments");
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Appointment not created", status: "error" });
     // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }
    changeChecked(valueitem:string){
        this.checked = true
        console.log("value");
         console.log(valueitem);
    }
  async updateAppointment() {
    const url = `/api/v1/appointment/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Appointment updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/appointments");
      }
    } catch (error) {
      window.notify({ msg: "Appointment not updated", status: "error" });
    }
  }
  async fetchPractitioners() {
    const AllPractitioners = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioners]);
    this.practitioner = response[0].data;
  }
  async fetchDevices() {
    const AllDevices = cornieClient().get("/api/v1/devices");
    const response = await Promise.all([AllDevices]);
    this.device = response[0].data;
  }
  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }
   async fetchPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
  async created() {
    this.setAppointment();
    this.fetchPractitioners();
    this.fetchDevices();
    this.fetchRoles();
    this.fetchPatients();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
.outline-primary {
  border: 2px solid #080056;
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
/* Large checkboxes */

input[type="checkbox"] {
    height: 22px;
    width: 22px;
}

input[type="checkbox"]:before {
    width: 24px;
    border: hidden;
    height: 20px;
}

input[type="checkbox"]:after {
    top: -20px;
    width: 22px;
    height: 22px;
}

input[type="checkbox"]:checked:after {
   background-image: url("../../../../assets/tick.svg");
    background-color: #FE4D3C;
}
input[type="checkbox"]:after {
    position: relative;
    display: block;
    left: 0px;
    content: "";
    background: white;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 3px;
    text-align: center;
    border: 1px solid #FE4D3C;
}
</style>
