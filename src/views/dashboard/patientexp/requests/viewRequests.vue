<template>
  <div class="w-full">
    <div class="mb-8">
      <span class="flex justify-end w-full">
        <button
          @click="share"
          type="button"
          class="outline-primary rounded-full text-primary mt-5 mr-3 flex py-2 pr-10 pl-10 px-3 focus:outline-none hover:bg-primary hover:text-white"
        >
          <share-icon class="mr-3" />
          Share
        </button>
        <button
          @click="print"
          type="button"
          class="bg-danger rounded-full text-white mt-5 pr-14 pl-14 focus:outline-none hover:opacity-90"
        >
          Print
        </button>
      </span>
    </div>
    <div id="printMe" class="printMe">
      <p class="text-primary mt-5 mb-8 font-bold">View Request</p>
      <div
        class="mt-5 pb-76 mb-44 bg-white w-full h-full shadow-md p-4 rounded"
      >
        <div class="mt-3">
          <div class="flex space-x-8">
            <avatar class="mr-2 w-16 h-16" :src="img.placeholder" />
            <!--   <avatar class="mr-2" v-else :src="img.placeholder" />-->
            <div>
              <p class="text-lg mb-3 text-primary font-bold">CornieHealth</p>
              <p class="text-sm text-gray font-medium">XXXXXX</p>
            </div>
          </div>
          <div>
            <span
              class="flex border-b-2 border-dark-100 w-full text-lg text-dark py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
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
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Status</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestInfo.statusReason }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Requisition ID</label
                >
                <div class="text-sm text-black">{{ basedOn }}</div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Authored On</label
                >
                <div class="text-sm text-black">{{ basedOn }}</div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Encounter</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestDetails.encounter }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Priority</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestInfo.priority }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Reason Ref</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestDetails.reasonReference }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Reason Code</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestDetails.reasonCode }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Intent</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestInfo.intent }}
                </div>
              </div>

              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Performer</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.medicationAdministration.performer }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Based On</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestDetails.basedOn }}
                </div>
              </div>

              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Do Not Perform</label
                >
                <div class="text-sm text-black">
                  {{ requestModel.requestInfo.doNotPerform }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <span
              class="flex border-b-2 border-dark-100 w-full text-lg text-dark py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
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
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPatientData.name }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">MRN Number:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPatientData.mrn }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Gender:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPatientData.gender }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Age:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPatientData.dob }}
                  </p>
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
                  <p class="text-sm text-gray-400 font-light">
                    Payment Option:
                  </p>
                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                </div>
              </div>
              <div class="bg-white shadow-md p-3">
                <p class="text-lg text-primary font-bold">Requester</p>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">
                    Practitioner Name:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPractionerData.name }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">
                    Practitioner ID:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ requestModel.medicationAdministration.performer }}
                  </p>
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
                <p class="text-lg text-primary font-bold">Dispenser</p>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">
                    Performer Type:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ requestModel.medicationAdministration.performerType }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Performer</p>
                  <p class="text-sm font-bold text-primary">
                    {{ requestModel.medicationAdministration.performer }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">
                    Corniehealth ID:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ requestModel.userId }}
                  </p>
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
                  <p class="text-sm text-gray-400 font-light">
                    Dispenser Type:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ requestModel.performer.dispenserType }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Dispenser:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ requestModel.performer.dispenser }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <span
              class="flex border-b-2 border-dark-100 w-full text-lg text-dark py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
            >
              Medication
            </span>
            <cornie-table :columns="rawHeaders" v-model="items">
              <template #actions="{ item }">
                <div
                  class="flex items-center hover:bg-gray-50 p-3 cursor-pointer"
                  @click="
                    $router.push(
                      `/dashboard/experience/edit-request/${item.id}`
                    )
                  "
                >
                  <newview-icon class="text-yellow-500 fill-current" />
                  <span class="ml-3 text-xs">View</span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-50 p-3 cursor-pointer"
                >
                  <update-icon />
                  <span class="ml-3 text-xs">Update</span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-50 p-3 cursor-pointer"
                >
                  <plus-icon class="text-primary fill-current" />
                  <span class="ml-3 text-xs">Add Appointment</span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-50 p-3 cursor-pointer"
                >
                  <plus-icon class="text-green-500 fill-current" />
                  <span class="ml-3 text-xs">Add Task</span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-50 p-3 cursor-pointer"
                  @click="makeNotes(item.id)"
                >
                  <note-icon class="text-purple-700 fill-current" />
                  <span class="ml-3 text-xs">Make Notes</span>
                </div>
                <div
                  class="flex items-center hover:bg-gray-50 p-3 cursor-pointer"
                  @click="deleteItem(item.id)"
                >
                  <message-icon class="text-blue-700 fill-current" />
                  <span class="ml-3 text-xs">Message</span>
                </div>
              </template>
            </cornie-table>
            <div class="flex space-x-4 mt-8">
              <div class="flex space-x-2">
                <input
                  checked
                  type="checkbox"
                  class="bg-danger focus-within:bg-danger px-6 shadow"
                />
                <p class="text-xs mt-1">Refill</p>
              </div>
              <div class="flex space-x-2">
                <input
                  checked
                  type="checkbox"
                  class="bg-danger focus-within:bg-danger px-6 shadow"
                />
                <p class="text-xs mt-1">Substitution Allowed</p>
              </div>
            </div>
          </div>

          <div>
            <span
              class="flex border-b-2 border-dark-100 w-full text-lg text-dark py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
            >
              Other Info
            </span>
            <span
              class="flex border-b-2 border-dark-100 w-full text-sm text-gray-500 py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
            >
              Known Medication Allergies
            </span>
            <div class="w-full">
              <div class="w-full grid grid-cols-3 gap-4 mt-5">
                <div class="border-r-2">
                  <div class="mb-8 p-2">
                    <p class="text-sm text-black">Aspirin</p>
                  </div>
                  <div class="p-2">
                    <p class="text-sm text-black">Codeine</p>
                  </div>
                </div>
                <div class="border-r-2">
                  <div class="mb-8 p-2">
                    <p class="text-sm text-black">Penicillin</p>
                  </div>
                  <div class="p-2">
                    <p class="text-sm text-black">Aspirin</p>
                  </div>
                </div>
                <div>
                  <div class="mb-8 p-2">
                    <p class="text-sm text-black">Codeine</p>
                  </div>
                  <div class="p-2">
                    <p class="text-sm text-black">Penicillin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <span
              class="flex border-b-2 border-dark-100 w-full text-sm text-gray-500 py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
            >
              Other Known Health Conditions
            </span>
            <div class="w-full">
              <div class="w-full grid grid-cols-3 gap-4 mt-5">
                <div class="border-r-2">
                  <div class="mb-8 p-2">
                    <p class="text-sm text-black">Depression</p>
                  </div>
                  <div class="p-2">
                    <p class="text-sm text-black">Asthma</p>
                  </div>
                </div>
                <div class="border-r-2">
                  <div class="mb-8 p-2">
                    <p class="text-sm text-black">Depression</p>
                  </div>
                  <div class="p-2">
                    <p class="text-sm text-black">Diabetes</p>
                  </div>
                </div>
                <div>
                  <div class="mb-8 p-2">
                    <p class="text-sm text-black">Seizures</p>
                  </div>
                  <div class="p-2">
                    <p class="text-sm text-black">Diabetes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full grid grid-cols-3 gap-4">
            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
              <label class="block text-gray-500 mb-1 text-xs font-light"
                >Affix Label?</label
              >
              <div class="text-sm text-black">
                {{ requestModel.fufillment.affixLabel }}
              </div>
            </div>
            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
              <label class="block text-gray-500 mb-1 text-xs font-light"
                >Substituion Permitted?</label
              >
              <div class="text-sm text-black">
                {{ requestModel.fufillment.nonSafetyCapRequest }}
              </div>
            </div>
            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
              <label class="block text-gray-500 mb-1 text-xs font-light"
                >Non-Safety Cap Request?
              </label>
              <div class="text-sm text-black">
                {{ requestModel.fufillment.nonSafetyCapRequest }}
              </div>
            </div>
            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
              <label class="block text-gray-500 mb-1 text-xs font-light"
                >Priority Shipping?</label
              >
              <div class="text-sm text-black">
                {{ requestModel.fufillment.priorityShipping }}
              </div>
            </div>
            <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
              <label class="block text-gray-500 mb-1 text-xs font-light"
                >Prior Medication</label
              >
              <div class="text-sm text-black">{{ basedOn }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { first, getTableKeyValue } from "@/plugins/utils";
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
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import IRequest from "@/types/IRequest";
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

const request = namespace("request");


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
export default class ViewRequest extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  // @Prop({ type: Object, required: false, default: { ...emptyRequest} })
  // request!: IRequest;

  @request.State
  requests!: any[];

  @request.Action
  fetchRequests!: () => Promise<void>;

  requestModel = { } as IRequest;

  @request.Action
  getRequestById!: (id: string) => IRequest;

  // @Watch("request")
  // requestUpdated(request: IRequest) {
  //   this.requestModel = JSON.parse(JSON.stringify({ ...request }));
  // }

  @request.Mutation
  updatedRequests!: any;

  loading = false;
  expand = false;
  selected = 1;
  isVisible = "";
  query = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  checked = false;
  tabstatus = false;
  tabsubject = false;
  tabparticipants = false;
  tabbg = false;
  tabmed = false;
  tabhealth = false;
  tabother = false;
  img = setup(() => useHandleImage());

  Practitioners = [];
  Devices = [];
  Patients: any[] = [];
  roles = [];

  newPractitioners = [];
  newDevices = [];
  newPatients = [];
  newRoles = [];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  participantitem = "";
  selectedPatient: any = {};
  selectedPractitioner: any = {};
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auust",
    "September",
    "October",
    "November",
    "December",
  ];

  patients = [];
  practitioners = [];
  patientName = "";
  performername = "";

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "medication code", key: "code", show: true },
    {
      title: "Medication Name",
      key: "name",
      show: true,
    },
    {
      title: "strength",
      key: "strength",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "dosage (daily)",
      key: "dosage",
      show: true,
    },
    {
      title: "duration",
      key: "duration",
      show: true,
    },
    {
      title: "course of therapy",
      key: "course",
      show: true,
    },
    {
      title: "substitution?",
      key: "substitution",
      show: false,
    },
    {
      title: "reason code",
      key: "reasoncode",
      show: false,
    },
    {
      title: "refill?",
      key: "refill",
      show: false,
    },
    {
      title: "dispense interval",
      key: "interval",
      show: false,
    },
    {
      title: "validity period",
      key: "period",
      show: false,
    },
    {
      title: "no of refill",
      key: "refillno",
      show: false,
    },
    {
      title: "quantity",
      key: "qunatity",
      show: false,
    },
    {
      title: "supply duration",
      key: "duration",
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

  get Medications() {
    return this.requests.map((c) => c.Medications[0]);
  }
  get items() {
    const requests = this.Medications.map((request) => {
      (request as any).createdAt = new Date(
        (request as any).createdAt
      ).toLocaleDateString("en-US");
      (request as any).medicationDetails.duration.start = new Date(
        (request as any).medicationDetails.duration.start
      ).toLocaleDateString("en-US");
      (request as any).medicationDetails.duration.end = new Date(
        (request as any).medicationDetails.duration.end
      ).toLocaleDateString("en-US");
      return {
        ...request,
        code: request.medicationDetails.medicationCode,
        name: request.medicationDetails.medicationReference,
        strength: "xxxxxx",
        quantity: request.medicationDetails.quantity,
        course: request.medicationDetails.courseOfTherapyType,
        reasoncode: request.substitutionAllowed.code,
        interval: request.refillInfo.dispenseInterval,
        period: request.medicationDetails.createdAt,
        refillno: request.refillInfo.quantity,
        duration:
          request.medicationDetails.duration.start +
          "-" +
          request.medicationDetails.duration.end,
        dosage: request.medicationDetails.dosageInstruction,

        //  action: request.id,
        //  keydisplay: "XXXXXXX",
        //  Participants: singleParticipantlength
      };
    });
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }
  // get PatientName() {
  //   const id = this.requestModel.subject.subject;
  //   const pt = this.patients.find((i: any) => i.id === id);
  //   this.selectedPatient = pt ? pt : {};

  //   return pt;
  // }
  // get PractitionerName() {
  //   const id = this.requestModel.medicationAdministration.performer;
  //   const pt = this.practitioners.find((i: any) => i.id === id);
  //   this.selectedPractitioner = pt ? pt : {};
  //   return pt;
  // }
  get selectedPatientData() {
    const data = this.selectedPatient;
    return {
      gender: data.gender,
      name: data.firstname + " " + data.lastname,
      dob: Math.floor(
        (Date.now() - new Date(data.dateOfBirth).getTime()) / 3.15576e10
      ),
      mrn: data.mrn,
    };
  }
  get selectedPractionerData() {
    const data = this.selectedPractitioner;
    return {
      name: data.firstName + " " + data.lastName,
    };
  }

  @Watch("id")
  idChanged() {
    this.setRequest();
  }

  async print() {
    // Pass the element id here
    window.print();
  }

  async setRequest() {
    const request = await this.getRequestById(this.id);
    if (!request) return;
    this.requestModel = { ...request };
  //  this.requestModel.Medications = request.Medications;
  }

  async fetchPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patients = response[0].data;
  }
  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioners = response[0].data;
  }
  async created() {
    this.setRequest();
    this.fetchPatients();
    this.fetchPractitioner();
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
  background-color: #fe4d3c;
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
  border: 1px solid #fe4d3c;
}
</style>
