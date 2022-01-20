<template>
  <cornie-dialog v-model="show" right class="w-8/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            View Request
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="grid grid-cols-3 gap-4 border-b border-dashed">
          <div class="w-full">
            <avatar :src="authPractitioner.image" />
          </div>
          <div>
            <p class="text-primary font-semibold">
              Dr.
              {{ authPractitioner.firstName + " " + authPractitioner.lastName }}
            </p>
            <p>
              <span class="font-weight-bold">ID: </span>
              {{ authPractitioner.id }}
            </p>
            <p>{{ authPractitioner.jobDesignation }}</p>
          </div>
          <div>
            <p class="text-primary font-semibold">
              Dr.
              {{ authPractitioner.firstName + " " + authPractitioner.lastName }}
            </p>
            <p>
              <span class="font-weight-bold">Address: </span>
              {{ authPractitioner.address }}
            </p>
            <p>
              <span class="font-weight-bold">Email: </span>
              {{ authPractitioner.email }}
            </p>
            <p>
              <span class="font-weight-bold">Phone: </span>
              {{
                authPractitioner.phone.dialCode + authPractitioner.phone.number
              }}
            </p>
          </div>
        </div>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
          >
            {{ newaction }} Request
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import NoteIcon from "@/components/icons/graynote.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import RangeSlider from "@/components/range.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import DatePicker from "@/components/daterangepicker.vue";
import { string } from "yup";
import Avatar from "@/components/avatar.vue";
import IRequest from "@/types/IRequest";
import DateTimePicker from "./components/datetime-picker.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
const userStore = namespace("user");

const request = namespace("request");
const dropdown = namespace("dropdown");
const patients = namespace("patients");

@Options({
  name: "requestDialog",
  components: {
    ...CornieCard,
    CornieIconBtn,
    NoteIcon,
    ArrowLeftIcon,
    DatePicker,
    CDelete,
    RangeSlider,
    Avatar,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    DateTimePicker,
    SearchIcon,
    AccordionComponent,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
  },
})
export default class Medication extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;
  @userStore.Action
  updatePractitionerAuthStatus!: () => Promise<void>;

  @request.State
  requests!: any[];

  @request.State
  practitioners!: any[];

  @request.State
  patients!: any[];

  @request.Action
  deleteRequest!: (id: string) => Promise<boolean>;

  @request.Action
  getPatients!: () => Promise<void>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  @request.Action
  fetchRequests!: () => Promise<void>;

  @patients.Action
  fetchPatients!: () => Promise<void>;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @request.Mutation
  updatedRequests!: any;

  checked = false;
  checked2 = false;
  checked3 = false;
  step = 1;
  width_percent = 33.33;
  width = 33.33;

  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
  enddate = "";
  selected = 1;
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  openedM = false;
  showMedicationModal = false;
  localSrc = require("../../../../assets/img/placeholder.png");

  patient = [];
  practitioner = [];

  dispenser = "";
  subject = "";
  requester = "";
  performer = "";

  preferredHeaders = [];
  items = ["Patient", "Practitioner", "Practitioner Role", "Device"];

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
  @request.Action
  getRequestById!: (id: string) => IRequest;

  get PatientName() {
    const id = this.$route.params.id;
    const pt = this.patients.find((i: any) => i.id === id);
    return {
      ...pt,
    };
  }

  select(i: number) {
    this.selected = i;
  }
  async next() {
    this.step = this.step + 1;
    this.width += this.width_percent;
  }

  async back() {
    this.step >= 0 && (this.step -= 1);
    this.width -= this.width_percent;
  }

  requestModel = {} as IRequest;

  async setRequest() {
    const request = await this.getRequestById(this.id);
    if (!request) return;
    this.requestModel = request;
    //   this.requestModel.medications = request.medications;
  }
  get newaction() {
    return this.id ? "Update" : "Create New";
  }

  get allaction() {
    return this.id ? "Edit" : "New";
  }
  get allPerformer() {
    if (!this.practitioner || this.practitioner.length === 0) return [];
    return this.practitioner.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName + " " + i.lastName,
      };
    });
  }
  get allRequester() {
    if (!this.patient || this.patient.length === 0) return [];
    return this.patient.map((i: any) => {
      return {
        code: i.id,
        display: i.firstname + " " + i.lastname,
      };
    });
  }

  async fetchAllPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
  async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  async created() {
    this.setRequest();
    //  this.setRequestModel();
    this.fetchPatients();
    this.fetchAllPatients();
    this.fetchPractitioner();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
  }
}
</script>

<style>
.bg-gray {
  background-color: #f6f8f9;
}
.icon-wrap {
  content: counter(step);
  counter-increment: step;
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -54em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap2 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: -7.5em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap3 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: -1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 52em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-wrap4 {
  background: #fff;
  border-radius: 50%;
  top: -0.3em;
  z-index: 1;
  color: #fff;
  border: 2px solid #fe4d3c;
  display: block;
  height: 1.4em;
  margin: 0 auto -0.6em;
  left: 42em;
  right: 0;
  position: absolute;
  width: 1.4em;
}
.icon-check-mark {
  top: 1.3em;
  z-index: 1;
  left: 5em;
  right: 0;
  position: absolute;
}
.icon-check-mark2 {
  top: 1.3em;
  z-index: 1;
  left: 23em;
  right: 0;
  position: absolute;
}
.icon-check-mark3 {
  top: 1.3em;
  z-index: 1;
  left: 45.5em;
  right: 0;
  position: absolute;
}
.bg-danger-100 {
  background-color: #fe4d3c;
}
</style>
