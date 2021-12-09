<template>
  <div class="w-full">
    <form @submit.prevent="submit">
      <div class="mb-8">
        <span class="flex justify-end w-full">
          <button
            @click="$router.push('/dashboard/provider/experience/appointments')"
            type="button"
            class="outline-primary rounded-full text-primary mt-5 mr-3 flex py-2 pr-10 pl-10 px-3 focus:outline-none hover:bg-primary hover:text-white"
          >
            <share-icon class="mr-3" />
            Share
          </button>
          <cornie-btn
            @click="print"
            type="button"
            class="bg-danger rounded-full text-white mt-5 pr-14 pl-14 focus:outline-none hover:opacity-90"
          >
            Print
          </cornie-btn>
        </span>
      </div>
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
              <p class="text-sm text-gray font-medium">Lagos, Nigeria</p>
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
                <div class="text-sm text-black">{{ basedOn }}</div>
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
                  >Priority</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.priority }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Precondition Code</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.performer.preconditionCode }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Reason Reference</label
                >
                <div class="text-sm text-black">{{ basedOn }}</div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Category</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.category }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Intent</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.intent }}
                </div>
              </div>

              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Replaces</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.replaces }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Do Not Perform</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.doNotPerform }}
                </div>
              </div>

              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Activity Definition</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.activityDefinition }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Based On</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.basicInfo.basedOn }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Encounter</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.requestInfo.encounter }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Precondition</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.request.preCondition }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Reason Code</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.request.reasonCode }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Supporting Info</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.request.supportingInfo }}
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
                  <p class="text-sm text-gray-400 font-light">MRN Number::</p>
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
                    {{ selectedPractionerData.id }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Facility Name:</p>
                  <p class="text-sm font-bold text-primary">xxxxxx</p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Address:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPractionerData.address }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Email:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPractionerData.email }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Mobile:</p>
                  <p class="text-sm font-bold text-primary">
                    {{ selectedPractionerData.mobile }}
                  </p>
                </div>
              </div>
              <div class="bg-white shadow-md p-3">
                <p class="text-lg text-primary font-bold">Performer</p>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">
                    Performer Type:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ otherrequestModel.performer.performerType }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">Performer</p>
                  <p class="text-sm font-bold text-primary">
                    {{ otherrequestModel.performer.performer }}
                  </p>
                </div>
                <div class="flex space-x-4 mt-5">
                  <p class="text-sm text-gray-400 font-light">
                    Corniehealth ID:
                  </p>
                  <p class="text-sm font-bold text-primary">
                    {{ otherrequestModel.userId }}
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
              <template #Participants="{ item }">
                <div class="flex items-center">
                  <span class="text-xs">{{ item.Participants }}</span>
                  <eye-icon
                    class="cursor-pointer ml-3"
                    @click="displayParticipants(item.id)"
                  />
                </div>
              </template>
            </cornie-table>
          </div>

          <div>
            <span
              class="flex border-b-2 border-dark-100 w-full text-lg text-dark py-2 mx-auto font-semibold col-span-full mb-4 mt-5"
            >
              Other Info
            </span>

            <div class="w-full grid grid-cols-3 gap-4">
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Comments</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.request.note }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Link Form</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.forms.linkForms }}
                </div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >History
                </label>
                <div class="text-sm text-black">{{ basedOn }}</div>
              </div>
              <div class="border-gray-100 border-2 py-3 px-2 mt-3 rounded-md">
                <label class="block text-gray-500 mb-1 text-xs font-light"
                  >Patient Instruction</label
                >
                <div class="text-sm text-black">
                  {{ otherrequestModel.request.patientInstructions }}
                </div>
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
import IOtherrequest from "@/types/IOtherrequest";
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

const otherrequest = namespace("otherrequest");
const dropdown = namespace("dropdown");

const emptyOtherrequest: IOtherrequest = {
  basicInfo: {},
  requestInfo: {},
  subject: {},
  performer: {},
  forms: {},
  request: {
    range: [20, 50],
  },
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

  @Prop({ type: Object, required: false, default: { ...emptyOtherrequest } })
  otherrequest!: IOtherrequest;

  //otherrequestModel = {} as IOtherrequest;

  @otherrequest.Action
  getOtherrequestById!: (id: string) => IOtherrequest;

  otherrequestModel = { ...emptyOtherrequest } as IOtherrequest;

  @otherrequest.Action
  getRequestById!: (id: string) => IOtherrequest;

  @otherrequest.State
  otherrequests!: any[];

  @otherrequest.Action
  fetchOtherequests!: () => Promise<void>;

  @otherrequest.Mutation
  updatedRequests!: any;
  @otherrequest.State
  patients!: any[];

  @otherrequest.State
  practitioners!: any[];

  @otherrequest.Action
  getPatients!: () => Promise<void>;

  @otherrequest.Action
  getPractitioners!: () => Promise<void>;

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
  checked = false;
  tabstatus = false;
  tabsubject = false;
  tabparticipants = false;
  tabbg = false;
  tabmed = false;
  tabhealth = false;
  tabother = false;
  img = setup(() => useHandleImage());

  actor = "";
  type = "";

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

  Practitioners = [];
  Devices = [];
  Patients: any[] = [];
  roles = [];
  basedOn = "xxxxxx";
  newPractitioners = [];
  newDevices = [];
  newPatients = [];

  practitioner = [];
  device = [];
  patient = [];
  role = [];

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
    this.setRequest();
  }
  query = "";
  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "request code", key: "code", show: true },
    {
      title: "Order Detail",
      key: "order",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "Ratio",
      key: "ratio",
      show: true,
    },
    {
      title: "Range",
      key: "range",
      show: true,
    },
    {
      title: "Specimen",
      key: "specimen",
      show: true,
    },
    {
      title: "Body Site",
      key: "body",
      show: true,
    },
    {
      title: "Required Date",
      key: "required",
      show: false,
    },
    {
      title: "Period",
      key: "period",
      show: false,
    },
    {
      title: "Timing",
      key: "timing",
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
    const requests = this.otherrequests.map((request: any) => {
      (request as any).createdAt = new Date(
        (request as any).createdAt
      ).toLocaleDateString("en-US");
      (request as any).request.occurenceDate = new Date(
        (request as any).request.occurenceDate
      ).toLocaleDateString("en-US");

      (request as any).request.occurencePeriod.start = new Date(
        (request as any).request.occurencePeriod.start
      ).toLocaleDateString("en-US");
      (request as any).request.occurencePeriod.end = new Date(
        (request as any).request.occurencePeriod.end
      ).toLocaleDateString("en-US");
      return {
        ...request,
        code: request.request.requestCode,
        order: request.request.orderDetail,
        strength: "xxxxxx",
        quantity: request.request.quantity,
        ratio: request.request.ratio,
        range: request.request.range,
        specimen: request.request.specimen,
        body: request.request.bodySite,
        required: request.request.occurenceDate,
        period:
          request.request.occurencePeriod.start +
          "-" +
          request.request.occurencePeriod.end,
        timing: request.request.occurenceTiming,
        action: request.id,
        //  keydisplay: "XXXXXXX",
        //  Participants: singleParticipantlength
      };
    });
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }

  get allaction() {
    return this.id ? "Edit" : "New";
  }

  select(i: number) {
    this.selected = i;
  }

  get PatientName() {
    const id = this.otherrequestModel.subject.subject;
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : {};

    return pt;
  }
  get PractitionerName() {
    const id = this.otherrequestModel.performer.performer;
    const pt = this.practitioners.find((i: any) => i.id === id);
    this.selectedPractitioner = pt ? pt : {};
    return pt;
  }
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
      id: data.id,
      address: data.address,
      email: data.email,
      mobile: "xxxxxx",
    };
  }
  async print() {
    // Pass the element id here
    window.print();
  }

  async setRequest() {
    const request = await this.getOtherrequestById(this.id);
    if (!request) return;
    this.otherrequestModel = { ...request };
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
    this.getPractitioners();
    this.getPatients();
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
